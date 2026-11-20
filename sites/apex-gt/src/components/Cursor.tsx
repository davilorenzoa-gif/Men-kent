import { useEffect, useRef } from 'react'
import { gsap, finePointer, reducedMotion } from '../lib/gsap'

/**
 * Mouse-only cursor: a dot that sticks to the pointer and a ring that follows with lag.
 * Over links/buttons the ring grows; over [data-cursor="label"] it shows that label.
 * Touch devices and reduced motion keep the system cursor.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!finePointer() || reducedMotion()) return
    const d = dot.current!
    const r = ring.current!
    document.documentElement.classList.add('has-cursor')
    gsap.set([d, r], { xPercent: -50, yPercent: -50, opacity: 0 })
    const dx = gsap.quickTo(d, 'x', { duration: 0.12, ease: 'power3' })
    const dy = gsap.quickTo(d, 'y', { duration: 0.12, ease: 'power3' })
    const rx = gsap.quickTo(r, 'x', { duration: 0.55, ease: 'power3' })
    const ry = gsap.quickTo(r, 'y', { duration: 0.55, ease: 'power3' })
    let shown = false
    let mode = ''

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      if (!shown) {
        shown = true
        gsap.set([d, r], { x: e.clientX, y: e.clientY })
        gsap.to([d, r], { opacity: 1, duration: 0.3 })
      }
      dx(e.clientX)
      dy(e.clientY)
      rx(e.clientX)
      ry(e.clientY)
      const t = (e.target as Element | null)?.closest?.('[data-cursor], a, button') as HTMLElement | null
      const next = t ? (t.dataset.cursor ?? 'link') : ''
      if (next !== mode) {
        mode = next
        if (mode && mode !== 'link') {
          label.current!.textContent = mode
          gsap.to(r, { width: 96, height: 96, backgroundColor: 'rgba(183,25,37,0.92)', borderColor: 'rgba(183,25,37,0)', duration: 0.45, ease: 'expo.out' })
          gsap.to(label.current, { opacity: 1, duration: 0.25 })
          gsap.to(d, { scale: 0, duration: 0.2 })
        } else if (mode === 'link') {
          gsap.to(r, { width: 52, height: 52, backgroundColor: 'rgba(243,243,240,0)', borderColor: 'rgba(243,243,240,0.7)', duration: 0.45, ease: 'expo.out' })
          gsap.to(label.current, { opacity: 0, duration: 0.15 })
          gsap.to(d, { scale: 1, duration: 0.2 })
        } else {
          gsap.to(r, { width: 32, height: 32, backgroundColor: 'rgba(243,243,240,0)', borderColor: 'rgba(243,243,240,0.35)', duration: 0.45, ease: 'expo.out' })
          gsap.to(label.current, { opacity: 0, duration: 0.15 })
          gsap.to(d, { scale: 1, duration: 0.2 })
        }
      }
    }
    const onLeave = () => {
      shown = false
      gsap.to([d, r], { opacity: 0, duration: 0.3 })
    }
    const onDown = () => gsap.to(r, { scale: 0.82, duration: 0.15 })
    const onUp = () => gsap.to(r, { scale: 1, duration: 0.4, ease: 'expo.out' })
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] hidden [@media(hover:hover)_and_(pointer:fine)]:block">
      <div ref={ring} className="absolute left-0 top-0 grid size-8 place-items-center rounded-full border border-ice/35 opacity-0">
        <span ref={label} className="font-mono text-[10px] uppercase tracking-[0.16em] text-ice opacity-0" />
      </div>
      <div ref={dot} className="absolute left-0 top-0 size-1.5 rounded-full bg-ice opacity-0 mix-blend-difference" />
    </div>
  )
}
