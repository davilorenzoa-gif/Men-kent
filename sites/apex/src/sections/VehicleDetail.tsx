import { useCallback, useEffect, useRef, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowRight, ExternalLink, X } from 'lucide-react'
import { Button } from '../components/Button'
import { Picture } from '../components/Picture'
import { IMAGES, type ImageAsset } from '../data/images.generated'
import { VEHICLES, type Vehicle } from '../data/vehicles'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { useScrollLock } from '../hooks/useSmoothScroll'
import { EASE_CINE, EASE_EXPO } from '../lib/motion'
import { formatNumber } from '../lib/format'

type VehicleDetailProps = {
  vehicle: Vehicle | null
  onClose: () => void
  onNavigate: (slug: string) => void
  onCompare: (slug: string) => void
}

/** Full-screen sheet for one car: the photograph on one side, the data on the other. */
export function VehicleDetail({ vehicle, onClose, onNavigate, onCompare }: VehicleDetailProps) {
  return <AnimatePresence>{vehicle && <Sheet vehicle={vehicle} onClose={onClose} onNavigate={onNavigate} onCompare={onCompare} />}</AnimatePresence>
}

function Sheet({ vehicle, onClose, onNavigate, onCompare }: Omit<VehicleDetailProps, 'vehicle'> & { vehicle: Vehicle }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  useScrollLock(true)
  useFocusTrap(ref, true, onClose)

  const index = VEHICLES.findIndex((v) => v.slug === vehicle.slug)
  const previous = VEHICLES[(index - 1 + VEHICLES.length) % VEHICLES.length]!
  const next = VEHICLES[(index + 1) % VEHICLES.length]!

  const step = useCallback((slug: string) => onNavigate(slug), [onNavigate])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(next.slug)
      if (e.key === 'ArrowLeft') step(previous.slug)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [next.slug, previous.slug, step])

  const photo: ImageAsset = IMAGES[vehicle.image]
  const rows: [string, string][] = [
    ['Power', `${formatNumber(vehicle.powerPs)} PS (${formatNumber(vehicle.powerKw)} kW)`],
    ['Torque', `${formatNumber(vehicle.torqueNm)} Nm`],
    ['0 to 100 km/h', `${formatNumber(vehicle.sprint, 1)} s`],
    [
      'Top speed',
      vehicle.topSpeedNote === 'over'
        ? `Over ${formatNumber(vehicle.topSpeedKmh)} km/h`
        : `${formatNumber(vehicle.topSpeedKmh)} km/h${vehicle.topSpeedNote ? ` (${vehicle.topSpeedNote})` : ''}`,
    ],
    ['Engine', vehicle.engine],
    ['Displacement', `${formatNumber(vehicle.displacementCc)} cm³`],
    ['Transmission', vehicle.transmission],
    ['Drive', vehicle.drive],
  ]

  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-labelledby="vehicle-title"
      tabIndex={-1}
      className="fixed inset-0 z-[80] bg-ink outline-none"
      initial={reduced ? { opacity: 0 } : { clipPath: 'inset(100% 0% 0% 0%)' }}
      animate={reduced ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={reduced ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
      transition={{ duration: reduced ? 0.25 : 0.95, ease: EASE_CINE }}
    >
      <div data-lenis-prevent className="h-full overflow-y-auto overscroll-contain lg:grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:overflow-hidden">
        {/* ── Photograph: shown whole, at its own proportions ── */}
        <div className="relative flex flex-col justify-center bg-black lg:h-full lg:px-[clamp(1.5rem,3vw,3.5rem)]">
          <figure>
            <div className="relative overflow-hidden bg-graphite" style={{ aspectRatio: `${photo.width} / ${photo.height}` }}>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={vehicle.slug}
                  className="absolute inset-0"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0.3 : 1.4, ease: EASE_EXPO }}
                >
                  <Picture id={vehicle.image} sizes="(min-width: 1024px) 56vw, 100vw" priority />
                </motion.div>
              </AnimatePresence>
            </div>
            <figcaption className="flex items-baseline justify-between gap-6 gutter py-3 data text-steel lg:px-0">
              <span className="truncate">{photo.credit.title}</span>
              <span className="shrink-0">
                Photo {photo.credit.author}, {photo.credit.license}
              </span>
            </figcaption>
          </figure>
        </div>

        {/* ── Data ── */}
        <div data-lenis-prevent className="relative flex flex-col gutter pt-8 pb-10 lg:h-full lg:overflow-y-auto lg:overscroll-contain lg:px-[clamp(2rem,3.4vw,4rem)] lg:pt-24 lg:pb-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={vehicle.slug}
              initial={{ opacity: 0, y: reduced ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE_EXPO }}
            >
              <p className="data text-steel">
                {vehicle.maker}, {vehicle.country}
              </p>
              <h2 id="vehicle-title" className="mt-3 display text-[clamp(3.5rem,7vw,7rem)] text-paper">
                {vehicle.model}
              </h2>
              <p className="mt-3 data text-silver">{vehicle.version}</p>
              <p className="mt-7 max-w-[30rem] text-[1.0625rem] leading-relaxed text-silver">{vehicle.summary}</p>

              <dl className="mt-9 border-t border-line">
                {rows.map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[8.5rem_minmax(0,1fr)] gap-4 border-b border-line py-3.5 sm:grid-cols-[10rem_minmax(0,1fr)]">
                    <dt className="data pt-0.5 text-steel">{label}</dt>
                    <dd className="text-[0.9375rem] text-paper">{value}</dd>
                  </div>
                ))}
              </dl>

              <a
                href={vehicle.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 data text-steel underline decoration-line underline-offset-4 transition-colors hover:text-paper hover:decoration-apex"
              >
                Figures: {vehicle.source.label}
                <ExternalLink aria-hidden className="size-3" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-5 lg:mt-auto lg:pt-10">
            <Button onClick={() => onCompare(vehicle.slug)}>Compare in Performance</Button>
            <div className="flex items-center gap-2">
              <IconButton label={`Previous: ${previous.maker} ${previous.model}`} onClick={() => step(previous.slug)}>
                <ArrowLeft aria-hidden strokeWidth={1.5} className="size-4" />
              </IconButton>
              <span className="data w-12 text-center text-steel" aria-label={`Car ${index + 1} of ${VEHICLES.length}`}>
                {index + 1} / {VEHICLES.length}
              </span>
              <IconButton label={`Next: ${next.maker} ${next.model}`} onClick={() => step(next.slug)}>
                <ArrowRight aria-hidden strokeWidth={1.5} className="size-4" />
              </IconButton>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        data-autofocus
        onClick={onClose}
        aria-label="Close"
        className="group absolute top-4 right-4 z-10 grid size-12 place-items-center rounded-full border border-paper/25 bg-ink/60 text-paper backdrop-blur-sm transition-colors duration-300 hover:border-apex hover:bg-apex lg:top-6 lg:right-8"
      >
        <X aria-hidden strokeWidth={1.5} className="size-5 transition-transform duration-500 ease-expo group-hover:rotate-90" />
      </button>
    </motion.div>
  )
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-12 place-items-center border border-paper/25 text-paper transition-[border-color,background-color,transform] duration-300 hover:border-apex hover:bg-apex active:scale-95"
    >
      {children}
    </button>
  )
}
