import { useRef, type PointerEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { Plus } from 'lucide-react'
import { Picture } from '../components/Picture'
import { SectionHeading } from '../components/SectionHeading'
import { METRICS, VEHICLES, type Metric, type Vehicle } from '../data/vehicles'
import { useFinePointer, useIsDesktop } from '../hooks/useMediaQuery'
import { EASE_EXPO } from '../lib/motion'
import { formatNumber } from '../lib/format'

/**
 * Layout rhythm: a wide column and a narrow one, mirrored on every row. Each
 * frame keeps the proportions of its photograph (nothing is cropped to fit a
 * template), the second frame of a pair sits lower and drifts at its own
 * speed on scroll, so the grid never reads as a row of identical cards.
 */
const LAYOUT = [
  { span: 'lg:col-span-7', aspect: 'aspect-[3/2]', sizes: '(min-width: 1024px) 56vw, 100vw', drift: 0 },
  { span: 'lg:col-span-5 lg:mt-40', aspect: 'aspect-[4/3]', sizes: '(min-width: 1024px) 40vw, 100vw', drift: -70 },
  { span: 'lg:col-span-5', aspect: 'aspect-[3/2]', sizes: '(min-width: 1024px) 40vw, 100vw', drift: -30 },
  { span: 'lg:col-span-7 lg:mt-32', aspect: 'aspect-[16/9] sm:aspect-[2/1]', sizes: '(min-width: 1024px) 56vw, 100vw', drift: -80 },
  { span: 'lg:col-span-7', aspect: 'aspect-[16/9] sm:aspect-[2/1]', sizes: '(min-width: 1024px) 56vw, 100vw', drift: 0 },
  { span: 'lg:col-span-5 lg:mt-32', aspect: 'aspect-[3/2]', sizes: '(min-width: 1024px) 40vw, 100vw', drift: -70 },
] as const

export function Garage({ onOpen }: { onOpen: (slug: string) => void }) {
  return (
    <section id="collection" aria-labelledby="collection-title" className="relative z-10 bg-ink gutter pt-[clamp(4rem,9vw,8rem)] pb-[clamp(5rem,12vw,11rem)]">
      <SectionHeading id="collection-title" title="The Collection">
        Six cars, photographed on the show floor and described with the figures their makers publish.
      </SectionHeading>

      <ul className="mt-[clamp(3rem,6vw,5.5rem)] grid gap-x-[clamp(1.5rem,3.2vw,3.5rem)] gap-y-16 lg:grid-cols-12 lg:gap-y-20">
        {VEHICLES.map((vehicle, i) => (
          <VehicleCard key={vehicle.slug} vehicle={vehicle} layout={LAYOUT[i % LAYOUT.length]!} onOpen={onOpen} />
        ))}
      </ul>

      <p className="mt-16 max-w-[44rem] data leading-relaxed text-steel lg:mt-24">
        Manufacturer figures for the version named on each car. PS is metric horsepower. “Limited” marks an
        electronically governed top speed.
      </p>
    </section>
  )
}

function VehicleCard({ vehicle, layout, onOpen }: { vehicle: Vehicle; layout: (typeof LAYOUT)[number]; onOpen: (slug: string) => void }) {
  const ref = useRef<HTMLLIElement>(null)
  const reduced = useReducedMotion()
  const desktop = useIsDesktop()
  const fine = useFinePointer()

  /* Column drift on scroll (desktop only) */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const drift = useTransform(scrollYProgress, [0, 1], [0, desktop && !reduced ? layout.drift : 0])

  /* The photo shifts a few pixels against the pointer: the frame feels like a window */
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 90, damping: 20, mass: 0.5 })
  const sy = useSpring(my, { stiffness: 90, damping: 20, mass: 0.5 })
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!fine || reduced) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width - 0.5) * -22)
    my.set(((e.clientY - r.top) / r.height - 0.5) * -16)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  const name = `${vehicle.maker} ${vehicle.model}`

  return (
    <motion.li
      ref={ref}
      className={`group relative ${layout.span}`}
      style={{ y: drift }}
      // The in-view trigger lives on the card, not on the clipped photo: a fully
      // clipped element has no visible area, so it would never report as in view.
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Photograph: curtain reveal, then zoom on hover */}
      <motion.div
        className={`relative overflow-hidden bg-graphite ${layout.aspect}`}
        data-cursor="Explore"
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        variants={
          reduced
            ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } }
            : {
                hidden: { clipPath: 'inset(0% 0% 100% 0%)' },
                visible: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.3, ease: EASE_EXPO } },
              }
        }
      >
        <motion.div className="absolute -inset-[5%]" style={{ x: sx, y: sy }}>
          <motion.div
            className="h-full w-full"
            variants={{
              hidden: { scale: reduced ? 1 : 1.22 },
              visible: { scale: 1, transition: { duration: 1.8, ease: EASE_EXPO } },
            }}
          >
            <Picture
              id={vehicle.image}
              sizes={layout.sizes}
              imgClassName="h-full w-full object-cover transition-transform duration-[1600ms] ease-expo group-hover:scale-[1.07] group-focus-within:scale-[1.07]"
            />
          </motion.div>
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/25 transition-opacity duration-700 group-hover:opacity-40" />
        <p className="absolute top-4 left-4 data text-paper/90 sm:top-5 sm:left-5">{vehicle.country}</p>
      </motion.div>

      {/* Name + action */}
      <div className="mt-5 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="data text-steel">{vehicle.maker}</p>
          <h3 className="mt-1.5 display text-[clamp(2.5rem,4.6vw,4.75rem)] text-paper">{vehicle.model}</h3>
        </div>
        {/* The ::after stretches this button over the whole card */}
        <button
          type="button"
          onClick={() => onOpen(vehicle.slug)}
          aria-label={`Explore the ${name}`}
          className="mb-1 shrink-0 after:absolute after:inset-0 after:content-['']"
        >
          <span className="relative inline-flex items-center gap-3 overflow-hidden border border-paper/30 px-4 py-3 text-[0.625rem] wide text-paper transition-[border-color,color] duration-500 ease-expo group-hover:border-apex sm:px-5">
            <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 bg-apex transition-transform duration-500 ease-expo group-hover:scale-y-100" />
            <span className="relative">Explore</span>
            <Plus aria-hidden strokeWidth={1.75} className="relative size-3.5 transition-transform duration-500 ease-expo group-hover:rotate-90" />
          </span>
        </button>
      </div>

      {/* Hairline turns red from the left on hover */}
      <div className="relative mt-5 h-px bg-line">
        <span aria-hidden className="absolute inset-0 origin-left scale-x-0 bg-apex transition-transform duration-700 ease-expo group-hover:scale-x-100" />
      </div>

      <dl className="mt-5 grid grid-cols-4 gap-3 sm:gap-5">
        {METRICS.map((metric) => (
          <Spec key={metric.key} metric={metric} vehicle={vehicle} />
        ))}
      </dl>
    </motion.li>
  )
}

function Spec({ metric, vehicle }: { metric: Metric; vehicle: Vehicle }) {
  const value = metric.value(vehicle)
  const limited = metric.key === 'topSpeed' && vehicle.topSpeedNote?.startsWith('limited')
  const over = metric.key === 'topSpeed' && vehicle.topSpeedNote === 'over'
  return (
    <div>
      <dt className="data text-steel">{metric.short}</dt>
      <dd className="mt-2 flex flex-wrap items-baseline gap-x-1.5">
        <span className="figure text-[clamp(1.5rem,2.3vw,2.25rem)] text-paper">
          {over && <span aria-label="over ">&gt;</span>}
          {formatNumber(value, metric.decimals)}
        </span>
        <span className="data text-steel">{metric.unit}</span>
        {limited && <span className="basis-full data text-[0.5625rem] text-apex">Limited</span>}
      </dd>
    </div>
  )
}
