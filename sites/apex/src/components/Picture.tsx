import type { CSSProperties } from 'react'
import { IMAGES, type ImageAsset, type ImageId } from '../data/images.generated'

type PictureProps = {
  id: ImageId
  /** Rendered width hint, e.g. "(min-width: 1024px) 58vw, 100vw" */
  sizes: string
  className?: string
  imgClassName?: string
  /** Above-the-fold images: load eagerly with high priority. */
  priority?: boolean
  /** Override the manifest alt (pass "" when the image is decorative). */
  alt?: string
  style?: CSSProperties
}

const base = import.meta.env.BASE_URL

function srcSet(id: string, asset: ImageAsset, format: 'avif' | 'webp') {
  return asset.widths.map((w) => `${base}img/${id}-${w}.${format} ${w}w`).join(', ')
}

/**
 * Responsive photograph: AVIF with WebP fallback, explicit dimensions (no
 * layout shift) and a blurred placeholder painted behind the image until the
 * real file arrives.
 */
export function Picture({ id, sizes, className, imgClassName, priority = false, alt, style }: PictureProps) {
  const asset: ImageAsset = IMAGES[id]
  const largest = asset.widths[asset.widths.length - 1]
  return (
    <picture className={className ?? 'block h-full w-full'}>
      <source type="image/avif" srcSet={srcSet(id, asset, 'avif')} sizes={sizes} />
      <img
        src={`${base}img/${id}-${largest}.webp`}
        srcSet={srcSet(id, asset, 'webp')}
        sizes={sizes}
        width={asset.width}
        height={asset.height}
        alt={alt ?? asset.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        draggable={false}
        className={imgClassName ?? 'h-full w-full object-cover'}
        style={{
          objectPosition: asset.focus,
          backgroundImage: `url(${asset.lqip})`,
          backgroundSize: 'cover',
          backgroundPosition: asset.focus,
          ...style,
        }}
      />
    </picture>
  )
}

/** Resolves when the best candidate for the hero has been fetched and decoded. */
export function preloadImage(id: ImageId, sizes: string): Promise<void> {
  const asset: ImageAsset = IMAGES[id]
  return new Promise((resolve) => {
    const img = new Image()
    img.sizes = sizes
    img.srcset = srcSet(id, asset, 'webp')
    const done = () => resolve()
    img.onload = () => {
      if (typeof img.decode === 'function') img.decode().then(done, done)
      else done()
    }
    img.onerror = done
  })
}
