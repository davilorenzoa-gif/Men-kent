import { useEffect, useRef, useState } from 'react'
import { animate, motion, useReducedMotion } from 'motion/react'
import { EASE_CINE, EASE_EXPO } from '../lib/motion'
import { LogoMark } from './Logo'

const TICKS = 44
const REDLINE = Math.round(TICKS * 0.82)

type LoaderProps = {
  /** Resolves when the hero photograph and fonts are ready to show. */
  ready: Promise<unknown>
  onDone: () => void
}

/**
 * Opening sequence: a rev counter sweeps to the redline while the hero image
 * loads, then the two halves of the screen part like a shutter.
 * The sweep is tied to real loading: it holds near the redline until the
 * assets are in, and never runs for less than ~1.4 s or more than ~7 s.
 */
export function Loader({ ready, onDone }: LoaderProps) {
  const reduced = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const doneRef = useRef(onDone)
  doneRef.current = onDone

  useEffect(() => {
    let cancelled = false
    let current = 0
    const set = (v: number) => {
      current = v
      if (!cancelled) setProgress(v)
    }

    // Phase 1: run up to 86% on a timer…
    const ramp = animate(0, 0.86, { duration: reduced ? 0.4 : 1.45, ease: [0.3, 0, 0.2, 1], onUpdate: set })

    // …phase 2: finish once the assets are really there (or after a ceiling).
    const ceiling = new Promise((resolve) => setTimeout(resolve, 7000))
    const floor = new Promise((resolve) => setTimeout(resolve, reduced ? 400 : 1400))
    let finish: ReturnType<typeof animate> | undefined
    Promise.all([Promise.race([ready, ceiling]), floor]).then(() => {
      if (cancelled) return
      ramp.stop()
      finish = animate(current, 1, {
        duration: reduced ? 0.2 : 0.55,
        ease: EASE_EXPO,
        onUpdate: set,
        onComplete: () => {
          if (!cancelled) setLeaving(true)
        },
      })
    })

    return () => {
      cancelled = true
      ramp.stop()
      finish?.stop()
    }
  }, [ready, reduced])

  const lit = Math.round(progress * TICKS)
  const percent = Math.round(progress * 100)

  // Shutter: top half goes up, bottom half goes down.
  const half = (direction: -1 | 1) =>
    reduced
      ? { animate: { opacity: leaving ? 0 : 1 }, transition: { duration: 0.35 } }
      : {
          animate: { y: leaving ? `${direction * 101}%` : '0%' },
          transition: { duration: 1.05, ease: EASE_CINE, delay: 0.12 },
        }

  return (
    <div
      className="fixed inset-0 z-[100]"
      role="status"
      aria-live="polite"
      aria-label={leaving ? 'Loaded' : `Loading, ${percent} percent`}
    >
      <motion.div className="absolute inset-x-0 top-0 h-1/2 bg-ink" {...half(-1)} />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-ink"
        {...half(1)}
        onAnimationComplete={() => {
          if (leaving) doneRef.current()
        }}
      />

      <motion.div
        className="absolute inset-0 flex flex-col justify-between gutter py-8 sm:py-10"
        animate={{ opacity: leaving ? 0 : 1 }}
        transition={{ duration: 0.3, ease: 'linear' }}
      >
        <div className="flex items-center justify-between text-steel">
          <span className="inline-flex items-center gap-3 text-paper">
            <LogoMark className="size-6" />
            <span className="wide text-[0.8125rem] font-bold tracking-[0.32em]">APEX</span>
          </span>
          <span className="data">Automotive</span>
        </div>

        <div>
          <div className="flex items-end justify-between">
            <span className="figure text-[clamp(5rem,22vw,15rem)] text-paper" aria-hidden>
              {String(percent).padStart(3, '0')}
            </span>
            <span className="data mb-3 text-steel sm:mb-6" aria-hidden>
              {progress < 1 ? 'Warming up' : 'Ready'}
            </span>
          </div>

          {/* Rev counter */}
          <div className="mt-5 flex h-7 items-end gap-[3px] sm:gap-1.5" aria-hidden>
            {Array.from({ length: TICKS }, (_, i) => {
              const on = i < lit
              const red = i >= REDLINE
              return (
                <span
                  key={i}
                  className="flex-1 origin-bottom transition-[transform,background-color] duration-200 ease-out"
                  style={{
                    height: '100%',
                    transform: `scaleY(${on ? (i % 4 === 0 ? 1 : 0.62) : 0.28})`,
                    backgroundColor: on ? (red ? 'var(--color-apex)' : 'var(--color-paper)') : 'var(--color-line)',
                  }}
                />
              )
            })}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
