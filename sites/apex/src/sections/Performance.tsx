import { useCallback, useRef, type PointerEvent } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { SectionHeading } from '../components/SectionHeading'
import { FieldChart } from '../components/performance/FieldChart'
import { Gauge } from '../components/performance/Gauge'
import { Pillars } from '../components/performance/Pillars'
import { METRICS, VEHICLES, type MetricKey, type Vehicle } from '../data/vehicles'
import { useFinePointer } from '../hooks/useMediaQuery'

type PerformanceProps = {
  selected: Vehicle
  onSelect: (slug: string) => void
  metric: MetricKey
  onMetric: (key: MetricKey) => void
}

/**
 * The engineering chapter. Graphite instead of black, a blueprint grid that
 * lights up around the pointer, and every number driven by the same data file
 * as the cards above.
 */
export function Performance({ selected, onSelect, metric, onMetric }: PerformanceProps) {
  const ref = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const fine = useFinePointer()
  const reduced = useReducedMotion()

  /* Transition in: a band of outlined type slides across as the section arrives */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] })
  const bandX = useTransform(scrollYProgress, [0, 1], reduced ? ['-4%', '-4%'] : ['6%', '-22%'])

  const onMove = useCallback(
    (e: PointerEvent<HTMLElement>) => {
      const grid = gridRef.current
      if (!fine || !grid) return
      const r = grid.getBoundingClientRect()
      grid.style.setProperty('--mx', `${e.clientX - r.left}px`)
      grid.style.setProperty('--my', `${e.clientY - r.top}px`)
    },
    [fine],
  )

  return (
    <section
      ref={ref}
      id="performance"
      aria-labelledby="performance-title"
      onPointerMove={onMove}
      className="relative z-10 overflow-hidden bg-graphite pb-[clamp(5rem,11vw,10rem)]"
    >
      <div ref={gridRef} aria-hidden className="blueprint pointer-events-none absolute inset-0" />

      {/* Speed band */}
      <div aria-hidden className="relative overflow-hidden border-y border-line py-5 sm:py-7">
        <motion.p
          className="display whitespace-nowrap text-[clamp(3.5rem,11vw,10rem)] text-transparent"
          style={{ x: bandX, WebkitTextStroke: '1px var(--color-gunmetal)' }}
        >
          Power&ensp;Torque&ensp;Acceleration&ensp;Aerodynamics&ensp;Engine&ensp;Transmission&ensp;Chassis
        </motion.p>
      </div>

      <div className="relative gutter pt-[clamp(4rem,9vw,8rem)]">
        <SectionHeading id="performance-title" title="Measured">
          Pick a car and read it like an instrument cluster. The scales stay fixed, so the needles can be compared.
        </SectionHeading>

        {/* ── Car selector ── */}
        <div
          role="tablist"
          aria-label="Choose a car"
          className="no-scrollbar -mx-[clamp(1.25rem,4.2vw,4.5rem)] mt-10 flex gap-2 overflow-x-auto gutter pb-1 lg:mt-14"
        >
          {VEHICLES.map((vehicle) => {
            const active = vehicle.slug === selected.slug
            return (
              <button
                key={vehicle.slug}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls="telemetry"
                onClick={() => onSelect(vehicle.slug)}
                className={`relative shrink-0 border px-4 py-3 text-[0.625rem] wide transition-[color,border-color,background-color] duration-300 sm:px-5 ${
                  active ? 'border-paper bg-paper text-ink' : 'border-line text-silver hover:border-steel hover:text-paper'
                }`}
              >
                {vehicle.model}
              </button>
            )
          })}
        </div>

        {/* ── Telemetry ── */}
        <div id="telemetry" role="tabpanel" aria-label={`${selected.maker} ${selected.model}`} className="mt-8 lg:mt-12">
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
            {METRICS.map((m) => (
              <Gauge key={m.key} metric={m} vehicle={selected} />
            ))}
          </div>

          <div className="mt-10 grid gap-x-10 gap-y-3 border-t border-line pt-6 sm:grid-cols-3">
            {[
              ['Engine', `${selected.engine}, ${(selected.displacementCc / 1000).toFixed(1)} l`],
              ['Transmission', selected.transmission],
              ['Drive', selected.drive],
            ].map(([label, value]) => (
              <p key={label} className="text-[0.9375rem] text-paper">
                <span className="mb-1 block data text-steel">{label}</span>
                {value}
              </p>
            ))}
          </div>
        </div>

        {/* ── The field ── */}
        <FieldChart metric={metric} onMetric={onMetric} selected={selected} onSelect={onSelect} />

        {/* ── Four engineering chapters ── */}
        <Pillars />
      </div>
    </section>
  )
}
