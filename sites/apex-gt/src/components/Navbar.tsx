import { useEffect, useRef, useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { Logo } from './Logo'
import { gsap, getLenis, scrollToTarget, reducedMotion } from '../lib/gsap'

export const NAV = [
  { id: 'machine', label: 'The Machine' },
  { id: 'collection', label: 'Collection' },
  { id: 'story', label: 'Story' },
  { id: 'contact', label: 'Contact' },
] as const

export function Navbar() {
  const bar = useRef<HTMLElement>(null)
  const sheet = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('')
  const [solid, setSolid] = useState(false)

  // Hide on scroll down, show on scroll up; darken once past the hero.
  useEffect(() => {
    let lastY = window.scrollY
    let hidden = false
    const onScroll = () => {
      const y = window.scrollY
      setSolid(y > window.innerHeight * 0.6)
      const down = y > lastY + 4
      const up = y < lastY - 4
      if (down && y > 200 && !hidden) {
        hidden = true
        gsap.to(bar.current, { yPercent: -110, duration: 0.5, ease: 'power3.out' })
      } else if ((up || y < 200) && hidden) {
        hidden = false
        gsap.to(bar.current, { yPercent: 0, duration: 0.5, ease: 'power3.out' })
      }
      if (down || up) lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section
  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Mobile sheet: lock scroll, Esc closes, focus first link
  useEffect(() => {
    const lenis = getLenis()
    if (open) {
      lenis?.stop()
      document.body.style.overflow = 'hidden'
      const links = sheet.current?.querySelectorAll<HTMLElement>('[data-sheet-item]')
      if (links && !reducedMotion()) {
        gsap.fromTo(links, { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.06, ease: 'expo.out' })
      }
      sheet.current?.querySelector<HTMLElement>('a')?.focus()
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
      window.addEventListener('keydown', onKey)
      return () => window.removeEventListener('keydown', onKey)
    }
    lenis?.start()
    document.body.style.overflow = ''
  }, [open])

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    setOpen(false)
    // wait a frame so Lenis is running again before the jump
    requestAnimationFrame(() => scrollToTarget(`#${id}`))
  }

  return (
    <>
      <header
        ref={bar}
        data-intro="nav"
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
          solid ? 'border-b border-white/5 bg-ink/70 backdrop-blur-md' : 'border-b border-transparent'
        }`}
      >
        <nav className="gutter flex h-16 items-center justify-between md:h-[72px]" aria-label="Main">
          <a href="#top" onClick={(e) => go(e, 'top')} className="text-ice" aria-label="APEX, back to top">
            <Logo />
          </a>
          <ul className="hidden items-center gap-9 md:flex">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={(e) => go(e, n.id)}
                  aria-current={active === n.id ? 'true' : undefined}
                  className="group relative py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ice/70 transition-colors hover:text-ice aria-[current]:text-ice"
                >
                  {n.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-500 ease-out-expo group-hover:scale-x-100 group-aria-[current]:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#collection"
            onClick={(e) => go(e, 'collection')}
            className="hidden items-center gap-2 border border-ice/25 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors hover:border-signal hover:bg-signal md:inline-flex"
          >
            Explore <ArrowUpRight size={14} strokeWidth={1.5} />
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="-mr-2 grid size-11 place-items-center md:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </nav>
      </header>

      <div
        id="mobile-menu"
        ref={sheet}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="gutter fixed inset-0 z-[60] flex flex-col bg-ink pb-[max(24px,env(safe-area-inset-bottom))] md:hidden"
      >
        <div className="flex h-16 items-center justify-between">
          <Logo />
          <button type="button" onClick={() => setOpen(false)} className="-mr-2 grid size-11 place-items-center" aria-label="Close menu">
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>
        <ul className="mt-10 flex flex-col gap-1">
          {NAV.map((n, i) => (
            <li key={n.id} className="overflow-hidden">
              <a href={`#${n.id}`} onClick={(e) => go(e, n.id)} data-sheet-item className="flex items-baseline gap-4 py-2">
                <span className="font-mono text-[11px] text-signal">0{i + 1}</span>
                <span className="display text-[17vw]">{n.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="eyebrow mt-auto">Beyond the limits</p>
      </div>
    </>
  )
}
