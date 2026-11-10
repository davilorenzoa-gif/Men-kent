import { motion, useReducedMotion } from 'motion/react'
import { ExternalLink } from 'lucide-react'
import { AnimatedNumber } from '../AnimatedNumber'
import { DOWNFORCE_POINTS, PILLARS, type Pillar } from '../../data/engineering'
import { VEHICLES } from '../../data/vehicles'
import { EASE_EXPO } from '../../lib/motion'
import { formatNumber } from '../../lib/format'

/** Four engineering chapters, each with one published number and one drawing. */
export function Pillars() {
  return (
    <div className="mt-[clamp(4rem,9vw,8rem)]">
      <h3 className="display text-[clamp(2.5rem,4.4vw,4.5rem)] text-paper">Under the skin</h3>
      <div className="mt-8 grid border-t border-l border-line lg:grid-cols-2">
        {PILLARS.map((pillar) => (
          <PillarCell key={pillar.id} pillar={pillar} />
        ))}
      </div>
    </div>
  )
}

function PillarCell({ pillar }: { pillar: Pillar }) {
  const reduced = useReducedMotion()
  return (
    <motion.article
      className="relative border-r border-b border-line bg-graphite/60 p-6 sm:p-9 lg:p-11"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reduced ? 0.3 : 0.9 }}
    >
      <header className="flex items-baseline justify-between gap-4">
        <h4 className="wide text-[0.8125rem] text-paper">{pillar.title}</h4>
        <p className="data text-right text-steel">{pillar.subject}</p>
      </header>

      <div className="mt-7 h-48 sm:h-60">
        {pillar.id === 'aero' && <AeroDiagram />}
        {pillar.id === 'engine' && <EngineDiagram />}
        {pillar.id === 'transmission' && <GearDiagram />}
        {pillar.id === 'chassis' && <WeightDiagram />}
      </div>

      <p className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="figure text-[clamp(3.5rem,7vw,6rem)] text-paper">
          <AnimatedNumber value={pillar.value} decimals={pillar.decimals} />
        </span>
        <span className="data text-silver">{pillar.unit}</span>
        <span className="basis-full data text-steel sm:basis-auto">{pillar.caption}</span>
      </p>

      <p className="mt-5 max-w-[34rem] text-[0.9375rem] leading-relaxed text-silver">{pillar.body}</p>

      <dl className="mt-6 border-t border-line">
        {pillar.facts.map((fact) => (
          <div key={fact.label} className="flex items-baseline justify-between gap-6 border-b border-line py-3">
            <dt className="data text-steel">{fact.label}</dt>
            <dd className="text-right text-[0.875rem] text-paper">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <a
        href={pillar.source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 data text-steel underline decoration-line underline-offset-4 transition-colors hover:text-paper hover:decoration-apex"
      >
        Source: {pillar.source.label}
        <ExternalLink aria-hidden className="size-3" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </motion.article>
  )
}

/* ───────────────────────── Drawings ───────────────────────── */

const draw = (delay = 0, duration = 1.6) => ({
  initial: { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  viewport: { once: true, amount: 0.6 },
  transition: { pathLength: { duration, ease: EASE_EXPO, delay }, opacity: { duration: 0.2, delay } },
})

const label = { fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.06em', fill: 'var(--color-steel)' } as const

/** Downforce against speed. The two dots are Porsche's published values; the line is a v² reference through them. */
function AeroDiagram() {
  const L = 44
  const R = 300
  const T = 30
  const B = 150
  const sx = (kmh: number) => L + (kmh / 300) * (R - L)
  const sy = (kg: number) => B - (kg / 900) * (B - T)
  // Least-squares v² fit through the origin for the two published points.
  const k = DOWNFORCE_POINTS.reduce((s, p) => s + p.kmh ** 2 * p.kg, 0) / DOWNFORCE_POINTS.reduce((s, p) => s + p.kmh ** 4, 0)
  const curve = Array.from({ length: 59 }, (_, i) => i * 5)
    .filter((v) => v <= 290)
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${sx(v).toFixed(1)} ${sy(k * v * v).toFixed(1)}`)
    .join(' ')

  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" role="img" aria-label="Chart: downforce of the 911 GT3 RS rises from 409 kilograms at 200 km/h to 860 kilograms at 285 km/h">
      {[300, 600, 900].map((kg) => (
        <g key={kg}>
          <line x1={L} x2={R} y1={sy(kg)} y2={sy(kg)} stroke="var(--color-line)" strokeWidth={1} />
          <text x={L - 7} y={sy(kg) + 3} textAnchor="end" style={label}>
            {kg}
          </text>
        </g>
      ))}
      {[100, 200, 300].map((v) => (
        <text key={v} x={sx(v)} y={B + 14} textAnchor="middle" style={label}>
          {v}
        </text>
      ))}
      <line x1={L} x2={R} y1={B} y2={B} stroke="var(--color-gunmetal)" strokeWidth={1} />
      <text x={R} y={B + 27} textAnchor="end" style={label}>
        KM/H
      </text>
      <text x={L - 7} y={T - 14} textAnchor="end" style={label}>
        KG
      </text>

      <motion.path d={curve} fill="none" stroke="var(--color-silver)" strokeWidth={1.25} {...draw(0.1, 1.8)} />

      {DOWNFORCE_POINTS.map((p, i) => (
        <motion.g
          key={p.kmh}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.9 + i * 0.35 }}
        >
          <line x1={sx(p.kmh)} x2={sx(p.kmh)} y1={sy(p.kg)} y2={B} stroke="var(--color-gunmetal)" strokeWidth={1} strokeDasharray="2 3" />
          <circle cx={sx(p.kmh)} cy={sy(p.kg)} r={4} fill={i === 1 ? 'var(--color-apex)' : 'var(--color-paper)'} />
          <text x={sx(p.kmh) - 10} y={sy(p.kg) - 6} textAnchor="end" style={{ ...label, fill: 'var(--color-paper)', fontSize: 10 }}>
            {formatNumber(p.kg)} kg
          </text>
        </motion.g>
      ))}
    </svg>
  )
}

/** Cross-section of a 120° vee with both turbochargers sitting inside it. */
function EngineDiagram() {
  const cx = 160
  const cy = 122
  const bank = (angle: number, delay: number) => (
    <g transform={`rotate(${angle} ${cx} ${cy})`}>
      <motion.rect x={cx - 17} y={cy - 110} width={34} height={84} rx={3} fill="none" stroke="var(--color-silver)" strokeWidth={1.25} {...draw(delay)} />
      <motion.rect x={cx - 10} y={cy - 84} width={20} height={24} fill="none" stroke="var(--color-gunmetal)" strokeWidth={1} {...draw(delay + 0.3, 0.9)} />
      <motion.line x1={cx} y1={cy - 60} x2={cx} y2={cy - 10} stroke="var(--color-gunmetal)" strokeWidth={1} {...draw(delay + 0.2, 0.6)} />
    </g>
  )
  // Arc between the two bank centre lines
  const r = 26
  const a0 = [cx - r * Math.sin(Math.PI / 3), cy - r * Math.cos(Math.PI / 3)] as const
  const a1 = [cx + r * Math.sin(Math.PI / 3), cy - r * Math.cos(Math.PI / 3)] as const
  const turboY = cy - 66

  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" role="img" aria-label="Diagram: two cylinder banks 120 degrees apart with both turbochargers between them">
      {bank(-60, 0)}
      {bank(60, 0.15)}
      <motion.circle cx={cx} cy={cy} r={10} fill="none" stroke="var(--color-silver)" strokeWidth={1.25} {...draw(0.3, 0.8)} />
      <circle cx={cx} cy={cy} r={2.2} fill="var(--color-silver)" />

      <motion.path d={`M ${a0[0]} ${a0[1]} A ${r} ${r} 0 0 1 ${a1[0]} ${a1[1]}`} fill="none" stroke="var(--color-apex)" strokeWidth={1.5} {...draw(0.7, 1)} />
      <motion.text
        x={cx}
        y={cy + 34}
        textAnchor="middle"
        style={{ ...label, fill: 'var(--color-paper)', fontSize: 12 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.3 }}
      >
        120°
      </motion.text>
      <text x={cx} y={cy + 48} textAnchor="middle" style={label}>
        BANK ANGLE
      </text>

      {/* Turbochargers seated in the valley of the vee */}
      {[-1, 1].map((side) => {
        const tx = cx + side * 21
        return (
          <motion.g
            key={side}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: EASE_EXPO, delay: 1.1 + (side > 0 ? 0.12 : 0) }}
            style={{ transformOrigin: `${tx}px ${turboY}px` }}
          >
            <circle cx={tx} cy={turboY} r={16} fill="var(--color-graphite)" stroke="var(--color-paper)" strokeWidth={1.25} />
            <circle cx={tx} cy={turboY} r={5} fill="none" stroke="var(--color-steel)" strokeWidth={1} />
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <line
                key={deg}
                x1={tx + 6 * Math.cos((deg * Math.PI) / 180)}
                y1={turboY + 6 * Math.sin((deg * Math.PI) / 180)}
                x2={tx + 13 * Math.cos(((deg + 28) * Math.PI) / 180)}
                y2={turboY + 13 * Math.sin(((deg + 28) * Math.PI) / 180)}
                stroke="var(--color-steel)"
                strokeWidth={1}
              />
            ))}
          </motion.g>
        )
      })}
      <text x={cx} y={turboY - 26} textAnchor="middle" style={label}>
        TURBOCHARGERS
      </text>
    </svg>
  )
}

/** Number of forward ratios per car, straight from the vehicle data. */
function GearDiagram() {
  const reduced = useReducedMotion()
  const rows = [...VEHICLES].sort((a, b) => a.gears - b.gears)
  const most = Math.max(...rows.map((r) => r.gears))
  return (
    <ul className="flex h-full flex-col justify-between" aria-label="Forward ratios per car">
      {rows.map((v, row) => (
        <li key={v.slug} className="grid grid-cols-[minmax(0,7.5rem)_minmax(0,1fr)_1rem] items-center gap-4 sm:grid-cols-[minmax(0,9.5rem)_minmax(0,1fr)_1rem]">
          <span className="truncate data text-steel">{v.model}</span>
          <span className="flex h-3 items-stretch gap-1.5" aria-hidden>
            {Array.from({ length: most }, (_, i) => (
              <motion.span
                key={i}
                className={`flex-1 origin-bottom ${i < v.gears ? (v.gears === most ? 'bg-paper' : 'bg-gunmetal') : 'bg-line/60'}`}
                initial={reduced ? false : { scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.6, ease: EASE_EXPO, delay: row * 0.08 + i * 0.04 }}
              />
            ))}
          </span>
          <span className={`figure text-lg ${v.gears === most ? 'text-apex' : 'text-silver'}`}>{v.gears}</span>
        </li>
      ))}
    </ul>
  )
}

/** Lightest dry weight of the two mid-engined cars, as their makers quote it. */
function WeightDiagram() {
  const reduced = useReducedMotion()
  const rows = [
    { name: 'McLaren 750S', kg: 1277, ratio: '1.70 kg per PS', highlight: true },
    { name: 'Ferrari 296 GTB', kg: 1470, ratio: '1.77 kg per cv', highlight: false },
  ]
  const scale = 1600
  return (
    <div className="flex h-full flex-col justify-center gap-8" role="img" aria-label="Dry weight: McLaren 750S 1,277 kilograms, Ferrari 296 GTB 1,470 kilograms">
      {rows.map((row, i) => (
        <div key={row.name}>
          <div className="flex items-baseline justify-between gap-4">
            <span className="data text-steel">{row.name}</span>
            <span className="data text-silver">{row.ratio}</span>
          </div>
          <div className="relative mt-3 h-[3px] bg-line">
            <motion.span
              className={`absolute inset-y-0 left-0 w-full origin-left ${row.highlight ? 'bg-paper' : 'bg-gunmetal'}`}
              initial={reduced ? false : { scaleX: 0 }}
              whileInView={{ scaleX: row.kg / scale }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 1.3, ease: EASE_EXPO, delay: i * 0.15 }}
            />
            {row.highlight && <span aria-hidden className="absolute top-1/2 size-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-apex" style={{ left: `${(row.kg / scale) * 100}%` }} />}
          </div>
          <p className="mt-3 text-right">
            <span className="figure text-2xl text-paper">{formatNumber(row.kg)}</span>
            <span className="ml-1.5 data text-steel">kg dry</span>
          </p>
        </div>
      ))}
    </div>
  )
}
