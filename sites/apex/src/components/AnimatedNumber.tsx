import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { EASE_EXPO } from '../lib/motion'
import { formatNumber } from '../lib/format'

type AnimatedNumberProps = {
  value: number
  decimals?: number
  duration?: number
  className?: string
}

/**
 * Counts up the first time it scrolls into view, then glides between values
 * whenever `value` changes. Writes straight to the DOM (no re-render per
 * frame); the final value is always in the markup for assistive tech.
 */
export function AnimatedNumber({ value, decimals = 0, duration = 1.6, className }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduced = useReducedMotion()
  const current = useRef(0)

  useEffect(() => {
    const node = ref.current
    if (!node || !inView) return
    if (reduced) {
      current.current = value
      node.textContent = formatNumber(value, decimals)
      return
    }
    const controls = animate(current.current, value, {
      duration,
      ease: EASE_EXPO,
      onUpdate(latest) {
        current.current = latest
        node.textContent = formatNumber(latest, decimals)
      },
    })
    return () => controls.stop()
  }, [value, decimals, duration, inView, reduced])

  return (
    <span className={className}>
      <span ref={ref} aria-hidden className="tabular-nums">
        {formatNumber(0, decimals)}
      </span>
      <span className="sr-only">{formatNumber(value, decimals)}</span>
    </span>
  )
}
