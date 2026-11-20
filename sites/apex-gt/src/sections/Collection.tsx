import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { cars, type Car } from '../data/cars'
import { gsap, img, srcSet, finePointer, reducedMotion } from '../lib/gsap'
import { CarSheet } from '../components/CarSheet'

const fmt = (n: number) => n.toLocaleString('en-US')

export function Collection() {
  const root = useRef<HTMLElement>(null)
  const preview = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<number | null>(null)
  const [hover, setHover] = useState<number | null>(null)
  const lastTrigger = useRef<HTMLElement | null>(null)

  // Desktop: floating preview that follows the pointer and opens like a slit of light.
  useEffect(() => {
    if (!finePointer()) return
    const box = preview.current!
    gsap.set(box, { xPercent: -50, yPercent: -50, clipPath: 'inset(50% 0% 50% 0%)' })
    const x = gsap.quickTo(box, 'x', { duration: 0.7, ease: 'power3' })
    const y = gsap.quickTo(box, 'y', { duration: 0.7, ease: 'power3' })
    const rot = gsap.quickTo(box, 'rotation', { duration: 0.9, ease: 'power3' })
    let lastX = 0
    const onMove = (e: PointerEvent) => {
      const r = root.current!.getBoundingClientRect()
      x(e.clientX - r.left)
      y(e.clientY - r.top)
      rot(gsap.utils.clamp(-6, 6, (e.clientX - lastX) * 0.25))
      lastX = e.clientX
    }
    root.current!.addEventListener('pointermove', onMove)
    const node = root.current!
    return () => node.removeEventListener('pointermove', onMove)
  }, [])

  useEffect(() => {
    if (!finePointer()) return
    const box = preview.current!
    if (hover === null) {
      gsap.to(box, { clipPath: 'inset(50% 0% 50% 0%)', duration: 0.5, ease: 'expo.out' })
      return
    }
    gsap.to(box, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'expo.out' })
    const imgs = box.querySelectorAll('img')
    imgs.forEach((im, i) => {
      gsap.to(im, { opacity: i === hover ? 1 : 0, scale: i === hover ? 1 : 1.15, duration: 0.7, ease: 'expo.out' })
    })
  }, [hover])

  // Rows enter with a line that draws and text that rises
  useEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-row]').forEach((row) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 90%', once: true } })
        tl.fromTo(row.querySelector('[data-rule]'), { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: 'expo.inOut' })
          .fromTo(row.querySelectorAll('[data-rise]'), { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.05, ease: 'expo.out' }, 0.25)
          .fromTo(row.querySelectorAll('[data-fadein]'), { opacity: 0 }, { opacity: 1, duration: 0.8, stagger: 0.05 }, 0.5)
      })
      gsap.utils.toArray<HTMLElement>('[data-mobile-img]').forEach((m) => {
        gsap.fromTo(
          m,
          { clipPath: 'inset(45% 0% 45% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut', scrollTrigger: { trigger: m, start: 'top 92%', end: 'top 55%', scrub: 0.6 } },
        )
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const openCar = (i: number, e: React.MouseEvent<HTMLElement>) => {
    lastTrigger.current = e.currentTarget
    setOpen(i)
  }

  return (
    <section ref={root} id="collection" aria-labelledby="collection-title" className="relative bg-ink pb-28 pt-10 md:pb-44 md:pt-16">
      <div className="gutter">
        <p className="eyebrow flex items-center gap-3">
          <span className="text-signal">02</span>
          <span className="h-px w-8 bg-ice/25" />
          The Collection
        </p>
        <div className="mt-4 flex flex-col gap-5 md:mt-6 md:flex-row md:items-end md:justify-between">
          <h2 id="collection-title" className="display text-[clamp(52px,14vw,80px)] md:text-[clamp(80px,9vw,168px)]">
            Five machines.
            <span className="block text-ice/35">One obsession.</span>
          </h2>
          <p className="max-w-[36ch] text-[15px] leading-relaxed text-ice/65 md:pb-3">
            Five ways of answering the same question. Manufacturer figures only. Open any of them for the full sheet and a 0–100 duel against the GT3 RS.
          </p>
        </div>
      </div>

      {/* Desktop floating preview */}
      <div
        ref={preview}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-20 hidden aspect-[3/2] w-[min(34vw,520px)] overflow-hidden bg-graphite [@media(hover:hover)_and_(pointer:fine)]:block"
      >
        {cars.map((c) => (
          <img key={c.id} src={img(c.img, c.imgWidths[0]!)} srcSet={srcSet(c.img, c.imgWidths)} sizes="520px" alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-0" />
        ))}
      </div>

      <ol className="relative mt-14 md:mt-20" onPointerLeave={() => setHover(null)}>
        {cars.map((c, i) => (
          <Row key={c.id} car={c} i={i} dim={hover !== null && hover !== i} onHover={setHover} onOpen={openCar} />
        ))}
        <li className="gutter">
          <div className="hairline" />
        </li>
      </ol>

      <CarSheet
        index={open}
        onClose={() => {
          setOpen(null)
          requestAnimationFrame(() => lastTrigger.current?.focus())
        }}
        onNavigate={setOpen}
      />
    </section>
  )
}

function Row({
  car,
  i,
  dim,
  onHover,
  onOpen,
}: {
  car: Car
  i: number
  dim: boolean
  onHover: (i: number | null) => void
  onOpen: (i: number, e: React.MouseEvent<HTMLElement>) => void
}) {
  return (
    <li data-row className="gutter group relative" onPointerEnter={(e) => e.pointerType === 'mouse' && onHover(i)}>
      <div data-rule className="hairline origin-left" />
      <button
        type="button"
        data-cursor="Explore"
        onClick={(e) => onOpen(i, e)}
        className={`relative grid w-full grid-cols-12 items-center gap-x-4 py-6 text-left transition-opacity duration-500 md:py-8 ${dim ? 'md:opacity-30' : ''}`}
        aria-label={`Explore the ${car.make} ${car.model}`}
      >
        {/* Mobile image */}
        <div data-mobile-img className="col-span-12 mb-5 aspect-[16/10] overflow-hidden bg-graphite md:hidden">
          <img
            src={img(car.img, car.imgWidths[0]!)}
            srcSet={srcSet(car.img, car.imgWidths)}
            sizes="100vw"
            alt={car.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>

        <span className="col-span-2 self-start overflow-hidden pt-2 font-mono text-[11px] text-signal-hot md:col-span-1 md:pt-4">
          <span data-rise className="block">
            {car.index}
          </span>
        </span>

        <span className="col-span-10 md:col-span-6">
          <span className="mask-line">
            <span data-rise className="eyebrow block">
              {car.make}
            </span>
          </span>
          <span className="mask-line mt-1">
            <span
              data-rise
              className="display block text-[clamp(48px,13vw,76px)] transition-[color,transform] duration-700 ease-out-expo group-hover:translate-x-3 md:text-[clamp(64px,6.6vw,124px)] md:group-hover:text-signal-hot"
            >
              {car.model}
            </span>
          </span>
        </span>

        <span data-fadein className="col-span-12 mt-4 grid grid-cols-3 gap-4 md:col-span-4 md:mt-0 md:grid-cols-3">
          <Stat label="Power" value={`${fmt(car.power)}`} unit="PS" />
          <Stat label="0–100" value={car.zeroToHundred.toFixed(1)} unit="s" />
          <Stat label="Top" value={`${car.topSpeedPlus ? '>' : ''}${car.topSpeed}`} unit="km/h" />
          <span className="col-span-3 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">{car.category}</span>
        </span>

        <span data-fadein className="col-span-12 mt-5 flex justify-start md:col-span-1 md:mt-0 md:justify-end">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ice md:size-12 md:justify-center md:rounded-full md:border md:border-ice/20 md:transition-colors md:group-hover:border-signal md:group-hover:bg-signal">
            <span className="md:sr-only">Explore</span>
            <ArrowUpRight size={18} strokeWidth={1.5} />
          </span>
        </span>
      </button>
    </li>
  )
}

function Stat({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <span className="block">
      <span className="eyebrow block text-[10px]">{label}</span>
      <span className="mt-1 block font-mono text-[15px] text-ice md:text-base">
        {value}
        <span className="ml-1 text-[11px] text-mute">{unit}</span>
      </span>
    </span>
  )
}
