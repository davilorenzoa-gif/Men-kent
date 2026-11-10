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
    let lastX = -1
    let lastY = -1
    const read = (el: Element | null) => {
      const host = el?.closest?.('[data-cursor]')
      const next = host ? host.getAttribute('data-cursor') : null
      setLabel((prev) => (prev === next ? prev : next))
    }
    const onMove = (e: PointerEvent) => {
      lastX = e.clientX
      lastY = e.clientY
      x.set(lastX)
      y.set(lastY)
      read(e.target as Element | null)
    }
    const onLeave = () => {
      lastX = -1
      setLabel(null)
    }
    // What sits under a resting pointer can change without the pointer moving
    // (a poster fades into a playing film, play turns into pause): look again
    // a few times a second while the pointer is over the page.
    const timer = window.setInterval(() => {
      if (lastX >= 0) read(document.elementFromPoint(lastX, lastY))
    }, 300)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.clearInterval(timer)
      window.removeEventListener('pointermove', onMove)
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
