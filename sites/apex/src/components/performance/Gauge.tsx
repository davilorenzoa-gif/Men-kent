import { useEffect } from 'react'
import { motion, useInView, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { useRef } from 'react'
import { AnimatedNumber } from '../AnimatedNumber'
import { metricRatio, type Metric, type Vehicle } from '../../data/vehicles'
import { formatNumber } from '../../lib/format'

/* Dial geometry: a 270° sweep, open at the bottom. */
const SIZE = 200
const C = SIZE / 2
const R = 84
const START = 135
const SWEEP = 270
const TICKS = 27

const polar = (deg: number, radius: number) => {
  const rad = (deg * Math.PI) / 180
  return [C + radius * Math.cos(rad), C + radius * Math.sin(rad)] as const
}

const arcPath = (() => {
  const [x0, y0] = polar(START, R)
  const [x1, y1] = polar(START + SWEEP, R)
  return `M ${x0} ${y0} A ${R} ${R} 0 1 1 ${x1} ${y1}`
})()

/**
 * One dial of the instrument cluster. The scale is fixed per metric, so when
 * the car changes the needle travels from the old reading to the new one.
 */
export function Gauge({ metric, vehicle }: { metric: Metric; vehicle: Vehicle }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const reduced = useReducedMotion()
  const value = metric.value(vehicle)
  const ratio = metricRatio(metric, value)

  const spring = useSpring(0, { stiffness: 46, damping: 15, mass: 1 })
  useEffect(() => {
    if (!inView) return
    if (reduced) spring.jump(ratio)
    else spring.set(ratio)
  }, [inView, ratio, reduced, spring])

  const needleX = useTransform(spring, (v) => polar(START + SWEEP * v, R)[0])
  const needleY = useTransform(spring, (v) => polar(START + SWEEP * v, R)[1])

  const scaleNote = metric.lowerIsBetter
    ? `Scale ${formatNumber(metric.max, 0)} to ${formatNumber(metric.min, 0)} ${metric.unit}`
    : `Scale 0 to ${formatNumber(metric.max, 0)} ${metric.unit}`

  return (
    <div ref={ref} className="relative">
      <div className="relative mx-auto aspect-square w-full max-w-[17rem]">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full overflow-visible" aria-hidden>
          {/* Tick ring */}
          {Array.from({ length: TICKS + 1 }, (_, i) => {
            const major = i % 3 === 0
            const [x0, y0] = polar(START + (SWEEP * i) / TICKS, R - (major ? 15 : 11))
            const [x1, y1] = polar(START + (SWEEP * i) / TICKS, R - 7)
            return <line key={i} x1={x0} y1={y0} x2={x1} y2={y1} stroke={major ? 'var(--color-steel)' : 'var(--color-gunmetal)'} strokeWidth={1} />
          })}
          {/* Track + reading */}
          <path d={arcPath} fill="none" stroke="var(--color-line)" strokeWidth={2} />
          <motion.path d={arcPath} fill="none" stroke="var(--color-paper)" strokeWidth={2} strokeLinecap="butt" style={{ pathLength: spring }} />
          <motion.circle r={4.5} fill="var(--color-apex)" cx={needleX} cy={needleY} />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pt-1 text-center">
          <span className="figure text-[clamp(2.4rem,5.2vw,4.25rem)] text-paper">
            <AnimatedNumber value={value} decimals={metric.decimals} duration={1.4} />
          </span>
          <span className="mt-1 data text-steel">{metric.unit}</span>
        </div>
      </div>

      <div className="mt-1 text-center">
        <p className="wide text-[0.6875rem] text-paper">{metric.label}</p>
        <p className="mt-1.5 data text-[0.5625rem] text-gunmetal">{scaleNote}</p>
      </div>
    </div>
  )
}
