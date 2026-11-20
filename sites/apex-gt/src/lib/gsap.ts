import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)
gsap.defaults({ ease: 'expo.out' })

export { gsap, ScrollTrigger }

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const finePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

/** One Lenis instance for the whole page, driven by GSAP's ticker so ScrollTrigger stays in sync. */
let lenis: Lenis | null = null

export function startLenis() {
  if (lenis || reducedMotion()) return lenis
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9 })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis?.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export const getLenis = () => lenis

/** Smooth jump to an anchor that also works without Lenis (reduced motion). */
export function scrollToTarget(target: string | number) {
  if (lenis) {
    lenis.scrollTo(target as string, { duration: 1.6, offset: 0 })
    return
  }
  if (typeof target === 'number') window.scrollTo({ top: target })
  else document.querySelector(target)?.scrollIntoView()
}

// The single-file preview injects every photo as a data URI in window.__APEX_IMG (one size per photo).
const embedded = typeof window !== 'undefined' ? (window as unknown as { __APEX_IMG?: Record<string, string> }).__APEX_IMG : undefined
export const img = (name: string, w: number) => embedded?.[name] ?? `${import.meta.env.BASE_URL}img/${name}-${w}.webp`
export const srcSet = (name: string, widths: number[]) =>
  embedded ? undefined : widths.map((w) => `${img(name, w)} ${w}w`).join(', ')
