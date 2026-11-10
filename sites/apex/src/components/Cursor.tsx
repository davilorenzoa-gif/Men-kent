import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useFinePointer } from '../hooks/useMediaQuery'

/**
 * A label that follows the pointer over media, e.g. "Explore" on a car or
 * "Play" on the film. The system cursor is never hidden, so nothing about
 * pointing or clicking changes. Any element can opt in with data-cursor="…".
 */
export function Cursor() {
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: 0.35 })
  const [label, setLabel] = useState<string | null>(null)

  useEffect(() => {
    if (!fine) return
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const host = (e.target as Element | null)?.closest?.('[data-cursor]')
      setLabel(host ? host.getAttribute('data-cursor') : null)
    }
    const onLeave = () => setLabel(null)
    // A click can swap what is under a resting pointer (poster → player): look again.
    let timer = 0
    const onClick = (e: MouseEvent) => {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        const host = document.elementFromPoint(e.clientX, e.clientY)?.closest('[data-cursor]')
        setLabel(host ? host.getAttribute('data-cursor') : null)
      }, 120)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('click', onClick)
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('click', onClick)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [fine, x, y])

  if (!fine) return null

  return (
    <motion.div aria-hidden className="pointer-events-none fixed top-0 left-0 z-[90]" style={{ x: sx, y: sy }}>
      <motion.div
        className="grid size-[5.25rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper text-ink"
        initial={false}
        animate={{ scale: label ? 1 : 0, opacity: label ? 1 : 0 }}
        transition={reduced ? { duration: 0.15 } : { type: 'spring', stiffness: 320, damping: 26 }}
      >
        <span className="wide text-[0.5625rem] tracking-[0.16em]">{label}</span>
      </motion.div>
    </motion.div>
  )
}
