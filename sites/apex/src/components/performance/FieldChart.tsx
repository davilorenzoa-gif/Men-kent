import { LayoutGroup, motion, useReducedMotion } from 'motion/react'
import { METRICS, VEHICLES, metricByKey, type MetricKey, type Vehicle } from '../../data/vehicles'
import { EASE_EXPO } from '../../lib/motion'
import { formatNumber } from '../../lib/format'

type FieldChartProps = {
  metric: MetricKey
  onMetric: (key: MetricKey) => void
  selected: Vehicle
  onSelect: (slug: string) => void
}

/**
 * All six cars on one metric, best first. Bars are drawn relative to the best
 * value in the field; rows reorder when the metric changes. A row is also a
 * button: it selects that car for the dials above.
 */
export function FieldChart({ metric: metricKey, onMetric, selected, onSelect }: FieldChartProps) {
  const reduced = useReducedMotion()
  const metric = metricByKey(metricKey)
  const values = VEHICLES.map((v) => metric.value(v))
  const best = metric.lowerIsBetter ? Math.min(...values) : Math.max(...values)
  const ranked = [...VEHICLES].sort((a, b) => (metric.lowerIsBetter ? metric.value(a) - metric.value(b) : metric.value(b) - metric.value(a)))

  return (
    <div className="mt-[clamp(4rem,8vw,7rem)] grid gap-x-10 gap-y-8 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <h3 className="display text-[clamp(2.5rem,4.4vw,4.5rem)] text-paper">The field</h3>
        <p className="mt-4 max-w-[22rem] text-[0.9375rem] leading-relaxed text-silver">
          Six cars on one measure, best first. Choose the measure; select a row to send that car to the dials.
        </p>
        <div role="group" aria-label="Measure" className="mt-7 flex flex-wrap gap-2">
          {METRICS.map((m) => {
            const active = m.key === metricKey
            return (
              <button
                key={m.key}
                type="button"
                aria-pressed={active}
                onClick={() => onMetric(m.key)}
                className={`border px-3.5 py-2.5 data transition-[color,border-color] duration-300 ${
                  active ? 'border-apex text-paper' : 'border-line text-steel hover:border-steel hover:text-paper'
                }`}
              >
                {m.short}
              </button>
            )
          })}
        </div>
      </div>

      <LayoutGroup>
        <ol className="border-t border-line lg:col-span-8" aria-label={`Cars ranked by ${metric.label}`}>
          {ranked.map((vehicle, rank) => {
            const value = metric.value(vehicle)
            const share = metric.lowerIsBetter ? best / value : value / best
            const active = vehicle.slug === selected.slug
            return (
              <motion.li key={vehicle.slug} layout={!reduced} transition={{ duration: 0.8, ease: EASE_EXPO }} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => onSelect(vehicle.slug)}
                  aria-pressed={active}
                  className="group grid w-full grid-cols-[1.5rem_minmax(0,1fr)_auto] items-center gap-x-4 py-4 text-left sm:grid-cols-[1.5rem_11rem_minmax(0,1fr)_6.5rem]"
                >
                  <span className={`data ${active ? 'text-apex' : 'text-gunmetal'}`}>{rank + 1}</span>
                  <span className={`truncate text-[0.9375rem] transition-colors duration-300 ${active ? 'text-paper' : 'text-silver group-hover:text-paper'}`}>
                    <span className="mr-2 hidden data text-steel sm:inline">{vehicle.maker}</span>
                    <span className="sm:block">{vehicle.model}</span>
                  </span>
                  <span className="order-last col-span-3 mt-3 block sm:order-none sm:col-span-1 sm:mt-0">
                    <span className="relative block h-[3px] bg-line">
                      <motion.span
                        className={`absolute inset-y-0 left-0 w-full origin-left ${active ? 'bg-paper' : 'bg-gunmetal group-hover:bg-steel'}`}
                        initial={false}
                        animate={{ scaleX: share }}
                        transition={{ duration: reduced ? 0 : 1.1, ease: EASE_EXPO }}
                      />
                      <motion.span
                        aria-hidden
                        className={`absolute top-1/2 size-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full ${active ? 'bg-apex' : 'bg-transparent'}`}
                        initial={false}
                        animate={{ left: `${share * 100}%` }}
                        transition={{ duration: reduced ? 0 : 1.1, ease: EASE_EXPO }}
                      />
                    </span>
                  </span>
                  <span className="text-right">
                    <span className={`figure text-2xl ${active ? 'text-paper' : 'text-silver'}`}>{formatNumber(value, metric.decimals)}</span>
                    <span className="ml-1.5 data text-steel">{metric.unit}</span>
                  </span>
                </button>
              </motion.li>
            )
          })}
        </ol>
      </LayoutGroup>
    </div>
  )
}
