import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Play, RotateCcw, X } from 'lucide-react'
import { cars } from '../data/cars'
import { gsap, getLenis, img, srcSet, reducedMotion } from '../lib/gsap'

const fmt = (n: number) => n.toLocaleString('en-US')

type Props = {
  index: number | null
  onClose: () => void
  onNavigate: (i: number) => void
}

export function CarSheet({ index, onClose, onNavigate }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const visual = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState<number | null>(index)
  const closing = useRef(false)
  const open = index !== null

  // Keep content while the close animation plays
  useEffect(() => {
    if (index !== null) setShown(index)
  }, [index])

  // Open / close animation, scroll lock
  useLayoutEffect(() => {
    const el = root.current!
    const lenis = getLenis()
    if (open) {
      closing.current = false
      el.hidden = false
      lenis?.stop()
      document.body.style.overflow = 'hidden'
      if (!reducedMotion()) {
        gsap.fromTo(el, { clipPath: 'inset(50% 0% 50% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'expo.inOut' })
        gsap.fromTo(el.querySelectorAll('[data-in]'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.05, delay: 0.45, ease: 'expo.out' })
      }
      requestAnimationFrame(() => el.querySelector<HTMLElement>('[data-close]')?.focus())
    } else if (!el.hidden && !closing.current) {
      closing.current = true
      const done = () => {
        el.hidden = true
        lenis?.start()
        document.body.style.overflow = ''
        setShown(null)
      }
      if (reducedMotion()) done()
      else gsap.to(el, { clipPath: 'inset(50% 0% 50% 0%)', duration: 0.6, ease: 'expo.inOut', onComplete: done })
    }
  }, [open])

  // Swap animation when navigating between cars
  useEffect(() => {
    if (!open || reducedMotion() || !visual.current) return
    gsap.fromTo(visual.current.querySelector('img'), { scale: 1.12, opacity: 0.2 }, { scale: 1, opacity: 1, duration: 1.1, ease: 'expo.out' })
  }, [shown, open])

  // Keyboard: Esc closes, arrows navigate, Tab stays inside
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') onNavigate(((index ?? 0) + 1) % cars.length)
      else if (e.key === 'ArrowLeft') onNavigate(((index ?? 0) - 1 + cars.length) % cars.length)
      else if (e.key === 'Tab') {
        const f = root.current!.querySelectorAll<HTMLElement>('button, a[href]')
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, index, onClose, onNavigate])

  const current = index ?? shown
  const car = current !== null ? cars[current] : null
  const rival = car ? (car.id === 'gt3-rs' ? cars.find((c) => c.id === 'revuelto')! : cars[0]!) : null

  return (
    <div
      ref={root}
      hidden
      role="dialog"
      aria-modal="true"
      aria-label={car ? `${car.make} ${car.model}` : 'Vehicle'}
      className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain bg-graphite"
      data-lenis-prevent
    >
      {car && rival && (
        <div className="grid min-h-full grid-cols-1 lg:grid-cols-12">
          <div ref={visual} className="relative h-[46svh] overflow-hidden bg-ink lg:sticky lg:top-0 lg:col-span-7 lg:h-[100svh]">
            <img
              key={car.id}
              src={img(car.img, car.imgWidths[car.imgWidths.length - 1]!)}
              srcSet={srcSet(car.img, car.imgWidths)}
              sizes="(max-width: 1023px) 100vw, 58vw"
              alt={car.alt}
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-graphite via-transparent to-ink/40 lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-graphite" />
            <span aria-hidden="true" className="display absolute bottom-3 left-4 text-[22vw] text-ice/10 lg:bottom-6 lg:left-8 lg:text-[11vw]">
              {car.index}
            </span>
          </div>

          <div className="gutter relative flex flex-col pb-[max(32px,env(safe-area-inset-bottom))] pt-6 lg:col-span-5 lg:min-h-[100svh] lg:px-12 lg:pt-8">
            <div className="flex items-center justify-between">
              <p className="eyebrow">
                <span className="text-signal-hot">{car.index}</span> / 0{cars.length}
              </p>
              <div className="flex items-center gap-1">
                <IconBtn label="Previous vehicle" onClick={() => onNavigate((current! - 1 + cars.length) % cars.length)}>
                  <ArrowLeft size={18} strokeWidth={1.5} />
                </IconBtn>
                <IconBtn label="Next vehicle" onClick={() => onNavigate((current! + 1) % cars.length)}>
                  <ArrowRight size={18} strokeWidth={1.5} />
                </IconBtn>
                <span className="mx-1 h-6 w-px bg-ice/15" />
                <IconBtn label="Close" onClick={onClose} close>
                  <X size={20} strokeWidth={1.5} />
                </IconBtn>
              </div>
            </div>

            <div data-in className="mt-8 lg:mt-14">
              <p className="eyebrow">{car.make}</p>
              <h3 className="display mt-2 text-[clamp(56px,15vw,88px)] lg:text-[clamp(64px,5.6vw,112px)]">{car.model}</h3>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-signal-hot">{car.category}</p>
              <p className="mt-5 max-w-[42ch] text-[15px] leading-relaxed text-ice/70">{car.note}</p>
            </div>

            <dl data-in className="mt-8 grid grid-cols-2 border-t border-ice/10">
              <Row k="Engine" v={car.engine} wide />
              <Row k="Power" v={`${fmt(car.power)} PS`} />
              <Row k="Torque" v={`${fmt(car.torque)} Nm${car.torqueNote ? ` (${car.torqueNote})` : ''}`} />
              <Row k="0–100 km/h" v={`${car.zeroToHundred.toFixed(1)} s`} />
              <Row k="Top speed" v={`${car.topSpeedPlus ? 'Over ' : ''}${car.topSpeed} km/h`} />
              <Row k="Drivetrain" v={car.drivetrain} wide />
            </dl>

            <Duel key={`${car.id}-${rival.id}`} a={car} b={rival} />

            <p className="mt-auto pt-10 font-mono text-[10px] leading-relaxed text-mute">Manufacturer figures. APEX is a concept and is not affiliated with any of these brands.</p>
          </div>
        </div>
      )}
    </div>
  )
}

function IconBtn({ label, onClick, children, close }: { label: string; onClick: () => void; children: React.ReactNode; close?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      data-close={close ? '' : undefined}
      className="grid size-11 place-items-center rounded-full text-ice transition-colors hover:bg-ice/10"
    >
      {children}
    </button>
  )
}

function Row({ k, v, wide }: { k: string; v: string; wide?: boolean }) {
  return (
    <div className={`border-b border-ice/10 py-3.5 ${wide ? 'col-span-2' : ''}`}>
      <dt className="eyebrow text-[10px]">{k}</dt>
      <dd className="mt-1 font-mono text-[14px] text-ice">{v}</dd>
    </div>
  )
}

type DuelCar = (typeof cars)[number]

/** Real-time 0–100 km/h run: both bars take exactly their official time to fill. */
function Duel({ a, b }: { a: DuelCar; b: DuelCar }) {
  const box = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<'idle' | 'run' | 'done'>('idle')
  const tl = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => () => void tl.current?.kill(), [])

  const run = () => {
    const el = box.current!
    const q = gsap.utils.selector(el)
    tl.current?.kill()
    setState('run')
    const lanes = [a, b]
    const t = gsap.timeline({ onComplete: () => setState('done') })
    lanes.forEach((car, i) => {
      const bar = q(`[data-bar="${i}"]`)[0] as HTMLElement
      const clock = q(`[data-clock="${i}"]`)[0] as HTMLElement
      const o = { s: 0 }
      gsap.set(bar, { scaleX: 0 })
      clock.textContent = '0.00'
      // A real launch: hard at first, easing as the car gains speed.
      t.to(bar, { scaleX: 1, duration: car.zeroToHundred, ease: 'power1.out' }, 0.6)
      t.to(o, { s: car.zeroToHundred, duration: car.zeroToHundred, ease: 'none', onUpdate: () => (clock.textContent = o.s.toFixed(2)) }, 0.6)
    })
    // Start lights
    t.fromTo(q('[data-start]'), { opacity: 1, backgroundColor: '#e0303d' }, { backgroundColor: '#f3f3f0', duration: 0.01 }, 0.59)
    t.to(q('[data-start]'), { opacity: 0, duration: 0.4 }, 0.9)
    tl.current = t
  }

  const winner = a.zeroToHundred === b.zeroToHundred ? null : a.zeroToHundred < b.zeroToHundred ? 0 : 1
  const gap = Math.abs(a.zeroToHundred - b.zeroToHundred).toFixed(1)

  return (
    <div data-in ref={box} className="mt-10">
      <div className="flex items-center justify-between">
        <p className="eyebrow text-ice">0–100 km/h duel</p>
        <span data-start aria-hidden="true" className="size-2.5 rounded-full bg-ice/15" />
      </div>
      <div className="mt-4 space-y-4">
        {[a, b].map((c, i) => (
          <div key={c.id}>
            <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.12em]">
              <span className={i === 0 ? 'text-ice' : 'text-mute'}>
                {c.make} {c.model}
              </span>
              <span className="tabular-nums text-ice">
                <span data-clock={i}>{state === 'idle' ? '0.00' : c.zeroToHundred.toFixed(2)}</span> s
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden bg-ice/10">
              <div
                data-bar={i}
                className={`h-full origin-left ${i === 0 ? 'bg-signal-hot' : 'bg-ice/70'}`}
                style={{ transform: state === 'idle' ? 'scaleX(0)' : undefined }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={run}
          disabled={state === 'run'}
          className="inline-flex items-center gap-2.5 border border-ice/25 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors hover:border-signal hover:bg-signal disabled:opacity-40"
        >
          {state === 'done' ? <RotateCcw size={14} /> : <Play size={14} />}
          {state === 'done' ? 'Run again' : 'Launch'}
        </button>
        <p className="text-right font-mono text-[11px] text-mute" aria-live="polite">
          {state === 'done' &&
            (winner === null ? 'Dead heat.' : `${winner === 0 ? a.model : b.model} by ${gap} s`)}
        </p>
      </div>
    </div>
  )
}
