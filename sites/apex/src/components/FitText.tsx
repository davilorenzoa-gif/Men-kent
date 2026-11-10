import { useLayoutEffect, useRef, type ReactNode } from 'react'

/**
 * Scales its content so one line spans the full width of the parent.
 * Used for the monumental headlines, where the type is sized by the frame
 * rather than by a font-size token. Re-fits when the width changes or the
 * webfont arrives; height-only resizes (mobile browser bars) are ignored.
 */
export function FitText({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    const parent = el?.parentElement
    if (!el || !parent) return
    let lastWidth = -1
    const fit = (force = false) => {
      const available = parent.clientWidth
      if (!force && available === lastWidth) return
      lastWidth = available
      el.style.fontSize = '100px'
      const natural = el.getBoundingClientRect().width
      if (natural > 0) el.style.fontSize = `${(100 * available) / natural}px`
    }
    fit(true)
    document.fonts?.ready.then(() => fit(true))
    const observer = new ResizeObserver(() => fit())
    observer.observe(parent)
    return () => observer.disconnect()
  }, [])

  return (
    <span ref={ref} className={`inline-block whitespace-nowrap ${className}`} style={{ fontSize: '12vw' }}>
      {children}
    </span>
  )
}
