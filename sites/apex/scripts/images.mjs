#!/usr/bin/env node
/**
 * Image pipeline.
 *
 *   npm run images            build every image listed in images.config.json
 *   npm run images -- hero    build only the named ids
 *
 * For each entry it:
 *   1. downloads the source photograph from Wikimedia Commons into
 *      .image-cache/ (git-ignored) unless it is already there,
 *   2. applies the crop and the colour grade from the config,
 *   3. writes responsive AVIF + WebP files to public/img/,
 *   4. regenerates src/data/images.generated.ts (sizes, blur-up placeholder,
 *      alt text and the credit line every licence requires).
 *
 * Downloads are sequential and honour Retry-After: Commons rate-limits
 * anonymous clients, so a first run can take a while.
 */
import { mkdir, readFile, writeFile, access } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const cacheDir = join(root, '.image-cache')
const outDir = join(root, 'public', 'img')
const manifestPath = join(root, 'src', 'data', 'images.generated.ts')
const config = JSON.parse(await readFile(join(root, 'scripts', 'images.config.json'), 'utf8'))

const USER_AGENT = 'site-image-pipeline/1.0 (generic client)'
const DEFAULT_WIDTHS = [640, 960, 1440, 1920]
const only = process.argv.slice(2)

const exists = (p) => access(p).then(() => true, () => false)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/** Commons original URL → URL of a pre-scaled rendition (standard widths only). */
function renditionUrl(original, width, originalWidth) {
  if (!width || width >= originalWidth) return original
  const m = original.match(/^(https:\/\/upload\.wikimedia\.org\/wikipedia\/commons)\/(\w\/\w\w)\/(.+)$/)
  if (!m) return original
  return `${m[1]}/thumb/${m[2]}/${m[3]}/${width}px-${m[3]}`
}

async function download(url, dest) {
  for (let attempt = 0; attempt < 30; attempt++) {
    const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } })
    if (res.ok) {
      await writeFile(dest, Buffer.from(await res.arrayBuffer()))
      return
    }
    if (res.status === 429) {
      const wait = Number(res.headers.get('retry-after') ?? 30) + 4
      console.log(`  rate limited, waiting ${wait}s`)
      await sleep(wait * 1000)
      continue
    }
    throw new Error(`${res.status} for ${url}`)
  }
  throw new Error(`gave up on ${url}`)
}


/**
 * Darkroom "burn": darkens a region so a distraction in the background (a
 * sign, a passer-by, a second car) falls away into shadow.
 *   rect | poly   region in 0–1 coordinates of the uncropped photo
 *   strength      1 = black
 *   feather       edge softness, as a fraction of the image width
 *   protect       optional saturation threshold: pixels more saturated than
 *                 this are left alone, so coloured bodywork crossing the
 *                 region keeps its paint
 */
async function applyBurn(data, info, burn) {
  const { width, height, channels } = info
  const pts = burn.poly ?? [
    [burn.rect[0], burn.rect[1]],
    [burn.rect[2], burn.rect[1]],
    [burn.rect[2], burn.rect[3]],
    [burn.rect[0], burn.rect[3]],
  ]
  const points = pts.map(([x, y]) => `${(x * width).toFixed(1)},${(y * height).toFixed(1)}`).join(' ')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="#000"/><polygon points="${points}" fill="#fff"/></svg>`
  const sigma = Math.max(0.5, (burn.feather ?? 0.008) * width)
  const mask = await sharp(Buffer.from(svg)).blur(sigma).extractChannel(0).raw().toBuffer()
  const protect = burn.protect
  for (let i = 0, p = 0; i < mask.length; i++, p += channels) {
    let amount = (mask[i] / 255) * burn.strength
    if (amount < 0.004) continue
    if (protect !== undefined) {
      const r = data[p], g = data[p + 1], b = data[p + 2]
      const max = Math.max(r, g, b)
      const saturation = max === 0 ? 0 : (max - Math.min(r, g, b)) / max
      // Soft shoulder around the threshold avoids hard edges on the paintwork.
      amount *= Math.min(1, Math.max(0, (protect + 0.12 - saturation) / 0.12))
    }
    const keep = 1 - amount
    data[p] *= keep
    data[p + 1] *= keep
    data[p + 2] *= keep
  }
}

await mkdir(cacheDir, { recursive: true })
await mkdir(outDir, { recursive: true })

const manifest = {}

for (const [id, entry] of Object.entries(config.images)) {
  const cached = join(cacheDir, `${id}.jpg`)
  if (!(await exists(cached))) {
    console.log(`${id}: downloading`)
    await download(renditionUrl(entry.source, entry.fetchWidth, entry.sourceWidth), cached)
    await sleep(4000)
  }

  // Work on raw pixels so retouches ("burns") can be applied before the crop.
  const { data, info } = await sharp(cached).rotate().removeAlpha().toColourspace('srgb').raw().toBuffer({ resolveWithObject: true })
  for (const burn of entry.burn ?? []) await applyBurn(data, info, burn)

  let pipeline = sharp(data, { raw: info })
  let width = info.width
  let height = info.height

  if (entry.crop) {
    const [x, y, w, h] = entry.crop
    const region = {
      left: Math.round(x * width),
      top: Math.round(y * height),
      width: Math.min(width - Math.round(x * width), Math.round(w * width)),
      height: Math.min(height - Math.round(y * height), Math.round(h * height)),
    }
    pipeline = pipeline.extract(region)
    width = region.width
    height = region.height
  }

  const grade = { ...config.grade, ...entry.grade }
  pipeline = pipeline.modulate({ brightness: grade.brightness, saturation: grade.saturation })
  if (grade.contrast !== 1) pipeline = pipeline.linear(grade.contrast, 128 * (1 - grade.contrast))
  const graded = await pipeline.png({ compressionLevel: 1 }).toBuffer()

  const widths = (entry.widths ?? DEFAULT_WIDTHS).filter((w) => w <= width)
  if (widths.length === 0) widths.push(width)

  if (only.length === 0 || only.includes(id)) {
    for (const w of widths) {
      const base = sharp(graded).resize({ width: w })
      await base.clone().avif({ quality: entry.quality ?? 50, effort: 5 }).toFile(join(outDir, `${id}-${w}.avif`))
      await base.clone().webp({ quality: (entry.quality ?? 50) + 24 }).toFile(join(outDir, `${id}-${w}.webp`))
    }
    console.log(`${id}: ${widths.join(', ')}`)
  }

  const lqip = await sharp(graded).resize({ width: 24 }).blur(1.2).webp({ quality: 40 }).toBuffer()

  manifest[id] = {
    width,
    height,
    widths,
    focus: entry.focus ?? '50% 50%',
    lqip: `data:image/webp;base64,${lqip.toString('base64')}`,
    alt: entry.alt,
    credit: {
      title: entry.title,
      author: entry.author,
      license: entry.license,
      licenseUrl: entry.licenseUrl,
      source: entry.page,
      changes: [entry.crop && 'cropped', 'colour graded', entry.burn && 'retouched']
        .filter(Boolean)
        .join(', ')
        .replace(/^./, (c) => c.toUpperCase()),
    },
  }
}

const body = `// GENERATED by scripts/images.mjs. Do not edit by hand: change
// scripts/images.config.json and run \`npm run images\`.

export type ImageAsset = {
  width: number
  height: number
  /** Widths available in /public/img as <id>-<width>.avif and .webp */
  widths: number[]
  /** CSS object-position that keeps the subject in frame when cropped */
  focus: string
  /** Tiny blurred preview shown while the real file loads */
  lqip: string
  alt: string
  credit: {
    title: string
    author: string
    license: string
    licenseUrl: string
    source: string
    changes: string
  }
}

export const IMAGES = ${JSON.stringify(manifest, null, 2)} as const satisfies Record<string, ImageAsset>

export type ImageId = keyof typeof IMAGES
`
await writeFile(manifestPath, body)
console.log(`manifest: ${Object.keys(manifest).length} images`)
