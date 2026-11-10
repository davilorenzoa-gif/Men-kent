import { createContext, useContext, useEffect, useMemo, useRef, type ReactNode } from 'react'
import Lenis from 'lenis'
import { useReducedMotion } from 'motion/react'
import { useFinePointer } from './useMediaQuery'

type ScrollTarget = string | HTMLElement | number

type ScrollApi = {
  /** Scroll to a selector, element or pixel offset. Smooth unless `immediate`. */
  scrollTo: (target: ScrollTarget, options?: { immediate?: boolean; offset?: number }) => void
  /** Reference-counted page scroll lock for overlays. */
  lock: () => void
  unlock: () => void
}

const ScrollContext = createContext<ScrollApi | null>(null)

/**
 * Lenis drives the scroll on mouse/trackpad devices only. Touch devices keep
 * native momentum scrolling, and reduced-motion users keep the native wheel.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const finePointer = useFinePointer()
  const reducedMotion = useReducedMotion()
  const lenisRef = useRef<Lenis | null>(null)
  const locks = useRef(0)

  useEffect(() => {
    if (!finePointer || reducedMotion) return
    const lenis = new Lenis({ autoRaf: true, lerp: 0.105, wheelMultiplier: 0.95 })
    lenisRef.current = lenis
    if (locks.current > 0) lenis.stop()
    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [finePointer, reducedMotion])

  const api = useMemo<ScrollApi>(
    () => ({
      scrollTo(target, options) {
        const offset = options?.offset ?? 0
        // The hero is position: sticky, so its measured offset moves with the page.
        // "Top" always means the very start of the document.
        const resolved =
          target === '#top' ? 0 : typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
        if (resolved === null) return
        const lenis = lenisRef.current
        if (lenis) {
          lenis.scrollTo(resolved, {
            offset,
            immediate: options?.immediate,
            duration: 1.5,
            easing: (t) => 1 - Math.pow(1 - t, 4),
            force: true,
          })
          return
        }
        const top =
          typeof resolved === 'number' ? resolved : resolved.getBoundingClientRect().top + window.scrollY + offset
        window.scrollTo({ top, behavior: options?.immediate || reducedMotion ? 'auto' : 'smooth' })
      },
      lock() {
        locks.current += 1
        if (locks.current === 1) {
          lenisRef.current?.stop()
          document.documentElement.classList.add('scroll-locked')
        }
      },
      unlock() {
        locks.current = Math.max(0, locks.current - 1)
        if (locks.current === 0) {
          lenisRef.current?.start()
          document.documentElement.classList.remove('scroll-locked')
        }
      },
    }),
    [reducedMotion],
  )

  return <ScrollContext.Provider value={api}>{children}</ScrollContext.Provider>
}

export function useSmoothScroll(): ScrollApi {
  const ctx = useContext(ScrollContext)
  if (!ctx) throw new Error('useSmoothScroll must be used inside <SmoothScrollProvider>')
  return ctx
}

/** Locks page scroll while `active` is true (dialogs, menu, loader). */
export function useScrollLock(active: boolean) {
  const { lock, unlock } = useSmoothScroll()
  useEffect(() => {
    if (!active) return
    lock()
    return unlock
  }, [active, lock, unlock])
}
