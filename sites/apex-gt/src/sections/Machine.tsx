import { useEffect, useMemo, useRef } from 'react'
import { gsap, ScrollTrigger, reducedMotion } from '../lib/gsap'
import { CHART, curvePath, powerAt, torqueAt, xOf, yOf } from '../lib/dyno'
import { gt3 } from '../data/cars'

const LEDS = 10
const fmt = (n: number) => n.toLocaleString('en-US')

export function Machine() {
  const root = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const powerD = useMemo(() => curvePath(powerAt), [])
  const torqueD = useMemo(() => curvePath(torqueAt), [])

  useEffect(() => {
    const el = root.current!
    const q = gsap.utils.selector(el)
    const rpmText = q('[data-rpm]')[0] as HTMLElement
    const clip = q('[data-clip]')[0] as unknown as SVGRectElement
    const cursor = q('[data-cursor-line]')[0] as unknown as SVGLineElement
    const dotP = q('[data-dot-power]')[0] as unknown as SVGCircleElement
    const dotT = q('[data-dot-torque]')[0] as unknown as SVGCircleElement
    const leds = q('[data-led]') as HTMLElement[]
    const peakT = q('[data-peak="torque"]')[0] as HTMLElement
    const peakP = q('[data-peak="power"]')[0] as unknown as SVGGElement
    const peakT2 = q('[data-peak-svg="torque"]')[0] as unknown as SVGGElement
    const peakP2 = q('[data-peak="power-card"]')[0] as HTMLElement
    const lightsBox = q('[data-lights]')[0] as HTMLElement

    const draw = (rpm: number) => {
      rpmText.textContent = fmt(Math.round(rpm / 10) * 10)
      const x = xOf(rpm)
      clip.setAttribute('width', String(Math.max(0, x - CHART.l)))
      cursor.setAttribute('x1', String(x))
      cursor.setAttribute('x2', String(x))
      dotP.setAttribute('cx', String(x))
      dotP.setAttribute('cy', String(yOf(powerAt(rpm))))
      dotT.setAttribute('cx', String(x))
      dotT.setAttribute('cy', String(yOf(torqueAt(rpm))))
      const lit = Math.round(gsap.utils.clamp(0, LEDS, ((rpm - 4800) / (8800 - 4800)) * LEDS))
      leds.forEach((l, i) => l.toggleAttribute('data-on', i < lit))
      lightsBox.toggleAttribute('data-limit', rpm >= 8900)
      const t = rpm >= gt3.torquePeakRpm
      const p = rpm >= gt3.powerPeakRpm
      peakT.toggleAttribute('data-hit', t)
      peakT2.toggleAttribute('data-hit', t)
      peakP.toggleAttribute('data-hit', p)
      peakP2.toggleAttribute('data-hit', p)
    }

    const ctx = gsap.context(() => {
      const state = { rpm: 1000 }
      if (reducedMotion()) {
        draw(gt3.redline)
        return
      }
      draw(1000)
      const mm = gsap.matchMedia()
      mm.add({ desk: '(min-width: 768px)', mob: '(max-width: 767px)' }, (c) => {
        const desk = c.conditions?.desk
        gsap
          .timeline({
            scrollTrigger: {
              trigger: stage.current,
              start: 'top top',
              end: desk ? '+=220%' : '+=160%',
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
            },
          })
          .fromTo(q('[data-stage-in]'), { opacity: 0.25, y: 30 }, { opacity: 1, y: 0, duration: 0.12, stagger: 0.02, ease: 'power2.out' }, 0)
          .to(state, { rpm: gt3.redline, duration: 1, ease: 'power1.in', onUpdate: () => draw(state.rpm) }, 0.04)
          .to({}, { duration: 0.12 })
      })

      // Spec strip: numbers count once when it enters
      q('[data-count]').forEach((node) => {
        const elc = node as HTMLElement
        const to = Number(elc.dataset.count)
        const dec = Number(elc.dataset.dec ?? 0)
        const o = { v: 0 }
        gsap.to(o, {
          v: to,
          duration: 1.8,
          ease: 'expo.out',
          scrollTrigger: { trigger: elc, start: 'top 88%', once: true },
          onUpdate: () => {
            elc.textContent = dec ? o.v.toFixed(dec) : fmt(Math.round(o.v))
          },
        })
      })
      gsap.from(q('[data-spec]'), {
        opacity: 0,
        y: 24,
        duration: 1.1,
        stagger: 0.07,
        scrollTrigger: { trigger: q('[data-specs]')[0], start: 'top 85%', once: true },
      })
      ScrollTrigger.refresh()
    }, el)
    return () => ctx.revert()
  }, [])

  const gridRpm = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000]
  const gridY = [0, 100, 200, 300, 400, 500, 600]

  return (
    <section ref={root} id="machine" aria-labelledby="machine-title" className="relative bg-ink">
      <div ref={stage} className="gutter relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-6 pt-20 md:pb-10 md:pt-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-[10vw] top-1/2 h-[70vh] w-[60vw] -translate-y-1/2 rounded-full bg-signal/10 blur-[120px]" />

        <div className="relative grid grid-cols-1 gap-y-5 md:grid-cols-12 md:gap-x-8 md:gap-y-8">
          {/* Left: identity and live readout */}
          <div className="md:col-span-5 md:flex md:flex-col md:justify-between">
            <div data-stage-in>
              <p className="eyebrow flex items-center gap-3">
                <span className="text-signal">01</span>
                <span className="h-px w-8 bg-ice/25" />
                The Machine
              </p>
              <h2 id="machine-title" className="display mt-3 text-[clamp(56px,15vw,84px)] md:mt-5 md:text-[clamp(80px,9vw,168px)]">
                911
                <br className="hidden md:block" />
                <span className="text-signal md:text-ice"> GT3 RS</span>
              </h2>
              <p className="mt-4 hidden max-w-[40ch] text-[15px] leading-relaxed text-ice/70 md:block">
                A 4.0-litre flat-six with no turbos, revving to 9,000 rpm, in a car shaped by the wind tunnel. Scroll to take it to the limiter.
              </p>
            </div>

            <div data-stage-in className="mt-1 flex items-end justify-between gap-6 md:mt-10 md:block">
              <div>
                <p className="eyebrow">Engine speed</p>
                <p className="mt-1 flex items-baseline gap-2 font-mono tabular-nums">
                  <span data-rpm className="text-[44px] font-light leading-none tracking-tight md:text-[clamp(56px,6vw,96px)]">
                    1,000
                  </span>
                  <span className="text-[12px] text-mute">rpm</span>
                </p>
              </div>
              <div
                data-lights
                role="img"
                aria-label="Shift lights"
                className="group/l flex gap-[5px] pb-2 md:mt-5 md:gap-2"
              >
                {Array.from({ length: LEDS }, (_, i) => (
                  <span
                    key={i}
                    data-led
                    className={`block h-2.5 w-2.5 rounded-full bg-ice/10 transition-[background-color,box-shadow] duration-100 md:h-3.5 md:w-3.5 ${
                      i < 6
                        ? 'data-[on]:bg-ice data-[on]:shadow-[0_0_10px_rgba(243,243,240,.7)]'
                        : 'data-[on]:bg-signal-hot data-[on]:shadow-[0_0_12px_rgba(224,48,61,.9)]'
                    } group-data-[limit]/l:animate-[limiter_.16s_steps(2)_infinite]`}
                  />
                ))}
              </div>
            </div>

            <div data-stage-in className="mt-3 hidden gap-3 md:mt-8 md:grid md:grid-cols-2">
              <div data-peak="torque" className="group/p border-t border-ice/15 pt-3 transition-colors data-[hit]:border-ice">
                <p className="eyebrow">Peak torque</p>
                <p className="mt-1 font-mono text-[15px] text-ice/35 transition-colors group-data-[hit]/p:text-ice">
                  465 Nm <span className="opacity-60">@ 6,300 rpm</span>
                </p>
              </div>
              <div data-peak="power-card" className="group/p border-t border-ice/15 pt-3 transition-colors data-[hit]:border-signal-hot">
                <p className="eyebrow">Peak power</p>
                <p className="mt-1 font-mono text-[15px] text-ice/35 transition-colors group-data-[hit]/p:text-ice">
                  525 PS <span className="opacity-60">@ 8,500 rpm</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right: dyno sheet */}
          <figure data-stage-in className="relative md:col-span-7">
            <div className="relative border border-ice/10 bg-graphite/80 p-2 md:p-4">
              <div className="mb-1 flex items-center justify-between px-1 font-mono text-[10px] uppercase tracking-[0.16em] text-mute md:mb-2">
                <span>Dyno · full load</span>
                <span className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <i className="block h-0.5 w-4 bg-signal-hot" /> PS
                  </span>
                  <span className="flex items-center gap-1.5">
                    <i className="block h-0.5 w-4 bg-ice" /> Nm
                  </span>
                </span>
              </div>
              <svg viewBox={`0 0 ${CHART.w} ${CHART.h}`} className="block h-auto w-full" role="img" aria-label="Power and torque against engine speed. Peaks: 465 Nm at 6,300 rpm and 525 PS at 8,500 rpm.">
                <defs>
                  <clipPath id="dyno-clip">
                    <rect data-clip x={CHART.l} y="0" width="0" height={CHART.h} />
                  </clipPath>
                  <linearGradient id="dyno-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#b71925" stopOpacity="0.35" />
                    <stop offset="1" stopColor="#b71925" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {gridY.map((v) => (
                  <g key={v}>
                    <line x1={CHART.l} x2={CHART.w - CHART.r} y1={yOf(v)} y2={yOf(v)} stroke="rgba(243,243,240,0.07)" />
                    <text x={CHART.l - 10} y={yOf(v) + 3} textAnchor="end" className="fill-mute font-mono text-[10px]">
                      {v}
                    </text>
                  </g>
                ))}
                {gridRpm.map((r) => (
                  <g key={r}>
                    <line x1={xOf(r)} x2={xOf(r)} y1={CHART.t} y2={CHART.h - CHART.b} stroke="rgba(243,243,240,0.05)" />
                    <text x={xOf(r)} y={CHART.h - CHART.b + 18} textAnchor="middle" className="fill-mute font-mono text-[10px]">
                      {r / 1000}k
                    </text>
                  </g>
                ))}
                <rect x={xOf(8800)} y={CHART.t} width={xOf(9000) - xOf(8800)} height={CHART.h - CHART.t - CHART.b} fill="rgba(183,25,37,0.12)" />
                <text x={xOf(9000) - 4} y={CHART.t + 12} textAnchor="end" className="fill-signal-hot font-mono text-[9px] uppercase">
                  limiter
                </text>

                <g clipPath="url(#dyno-clip)">
                  <path d={`${powerD}L${xOf(9000)} ${yOf(0)}L${xOf(1000)} ${yOf(0)}Z`} fill="url(#dyno-fill)" />
                  <path d={powerD} fill="none" stroke="#e0303d" strokeWidth="2.25" />
                  <path d={torqueD} fill="none" stroke="#f3f3f0" strokeWidth="1.5" />
                </g>

                <g data-peak-svg="torque" className="opacity-0 transition-opacity duration-300 data-[hit]:opacity-100">
                  <circle cx={xOf(6300)} cy={yOf(465)} r="4" fill="#080808" stroke="#f3f3f0" strokeWidth="1.5" />
                  <text x={xOf(6300)} y={yOf(465) - 12} textAnchor="middle" className="fill-ice font-mono text-[11px]">
                    465 Nm
                  </text>
                </g>
                <g data-peak="power" className="opacity-0 transition-opacity duration-300 data-[hit]:opacity-100">
                  <circle cx={xOf(8500)} cy={yOf(525)} r="4.5" fill="#080808" stroke="#e0303d" strokeWidth="2" />
                  <text x={xOf(8500) - 8} y={yOf(525) - 12} textAnchor="end" className="fill-signal-hot font-mono text-[11px]">
                    525 PS
                  </text>
                </g>

                <line data-cursor-line x1={CHART.l} x2={CHART.l} y1={CHART.t} y2={CHART.h - CHART.b} stroke="rgba(243,243,240,0.5)" strokeDasharray="2 4" />
                <circle data-dot-power r="3.5" fill="#e0303d" cx={CHART.l} cy={yOf(0)} />
                <circle data-dot-torque r="3" fill="#f3f3f0" cx={CHART.l} cy={yOf(0)} />
              </svg>
            </div>
            <figcaption className="mt-2 font-mono text-[10px] leading-relaxed text-mute">
              Peak values: Porsche AG. Curve shape between them is illustrative.
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Spec strip */}
      <div data-specs className="gutter relative pb-24 pt-10 md:pb-36 md:pt-16">
        <div className="hairline mb-8 md:mb-12" />
        <dl className="grid grid-cols-2 gap-x-6 gap-y-9 md:grid-cols-5">
          <Spec label="Power" unit="PS" value={gt3.power} sub={`${gt3.powerKw} kW @ 8,500 rpm`} />
          <Spec label="Torque" unit="Nm" value={gt3.torque} sub="@ 6,300 rpm" />
          <Spec label="Engine" unit="L" value={gt3.displacement} dec={1} sub="Flat-six, naturally aspirated" />
          <Spec label="0–100 km/h" unit="s" value={gt3.zeroToHundred} dec={1} sub="With PDK" />
          <Spec label="Top speed" unit="km/h" value={gt3.topSpeed} sub={`${fmt(gt3.weight)} kg (DIN)`} className="col-span-2 md:col-span-1" />
        </dl>
      </div>
    </section>
  )
}

function Spec({
  label,
  unit,
  value,
  dec = 0,
  sub,
  className = '',
}: {
  label: string
  unit: string
  value: number
  dec?: number
  sub: string
  className?: string
}) {
  const shown = dec ? value.toFixed(dec) : fmt(value)
  return (
    <div data-spec className={className}>
      <dt className="eyebrow">{label}</dt>
      <dd className="mt-3">
        <span className="display text-[clamp(64px,17vw,80px)] leading-none md:text-[clamp(64px,6.4vw,120px)]">
          <span data-count={value} data-dec={dec} aria-hidden="true">
            {shown}
          </span>
          <span className="sr-only">{shown}</span>
        </span>
        <span className="ml-1.5 font-mono text-sm text-signal-hot">{unit}</span>
        <span className="mt-2 block font-mono text-[11px] leading-snug text-mute">{sub}</span>
      </dd>
    </div>
  )
}
