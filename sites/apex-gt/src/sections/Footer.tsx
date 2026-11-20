import { useEffect, useRef } from 'react'
import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { NAV } from '../components/Navbar'
import { Mark } from '../components/Logo'
import { credits } from '../data/credits'
import { gsap, scrollToTarget, reducedMotion } from '../lib/gsap'

// Fictional brand accounts (APEX is a concept). Each opens the platform's search for the handle.
const SOCIAL = [
  { name: 'Instagram', handle: '@apex.beyond', href: 'https://www.instagram.com/explore/search/keyword/?q=apex.beyond' },
  { name: 'YouTube', handle: 'APEX Films', href: 'https://www.youtube.com/results?search_query=apex+beyond+the+limits' },
  { name: 'X', handle: '@apexbeyond', href: 'https://x.com/search?q=apexbeyond' },
]

export function Footer() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-word-mark] span',
        { yPercent: 100 },
        { yPercent: 0, stagger: 0.06, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: '[data-word-mark]', start: 'top 92%', once: true } },
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <footer ref={root} id="contact" className="relative overflow-hidden bg-ink pt-24 md:pt-36">
      <div className="gutter grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow flex items-center gap-3">
            <span className="text-signal">04</span>
            <span className="h-px w-8 bg-ice/25" />
            Contact
          </p>
          <p className="display mt-5 text-[clamp(44px,12vw,64px)] md:text-[clamp(56px,5vw,96px)]">
            Beyond
            <br />
            the limits.
          </p>
          <a
            href="mailto:hello@apex.example"
            className="group mt-8 inline-flex items-center gap-3 border-b border-ice/25 pb-2 font-mono text-[13px] uppercase tracking-[0.14em] transition-colors hover:border-signal-hot"
          >
            hello@apex.example
            <ArrowUpRight size={16} strokeWidth={1.5} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
          <p className="eyebrow">Navigate</p>
          <ul className="mt-5 space-y-2">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToTarget(`#${n.id}`)
                  }}
                  className="text-lg text-ice/75 transition-colors hover:text-ice"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="eyebrow">Follow</p>
          <ul className="mt-5 space-y-2">
            {SOCIAL.map((s) => (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="group flex items-baseline justify-between gap-4 text-lg text-ice/75 transition-colors hover:text-ice">
                  {s.name}
                  <span className="font-mono text-[11px] text-mute group-hover:text-signal-hot">{s.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="gutter mt-16 md:mt-24" aria-hidden="true">
        <p data-word-mark className="h-[0.64em] overflow-hidden whitespace-nowrap text-[45vw] leading-[0.8]">
          {['A', 'P', 'E', 'X'].map((l) => (
            <span key={l} className="display inline-block align-top leading-[0.8] text-transparent [-webkit-text-stroke:1px_rgba(243,243,240,0.16)]">
              {l}
            </span>
          ))}
        </p>
      </div>

      <div className="gutter border-t border-ice/10 py-6 md:py-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-3">
            <Mark className="h-4 w-auto text-ice" />
            <p className="font-mono text-[11px] text-mute">© 2026 APEX. Concept project, not affiliated with Porsche, Ferrari, McLaren, Mercedes-AMG or Lamborghini.</p>
          </div>
          <button
            type="button"
            onClick={() => scrollToTarget(0)}
            className="inline-flex items-center gap-2 self-start font-mono text-[11px] uppercase tracking-[0.16em] text-ice/75 transition-colors hover:text-ice"
          >
            Back to top <ArrowUp size={14} strokeWidth={1.5} />
          </button>
        </div>
        <details className="mt-5 font-mono text-[10px] leading-relaxed text-mute">
          <summary className="cursor-pointer select-none text-ice/60 hover:text-ice">Photo credits</summary>
          <ul className="mt-3 space-y-1">
            {credits.map((c) => (
              <li key={c.what}>
                {c.what}: {c.author}, {c.license}
                {c.url && (
                  <>
                    {' · '}
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ice">
                      source
                    </a>
                  </>
                )}
                {c.url && ' (cropped and colour graded)'}
              </li>
            ))}
          </ul>
        </details>
      </div>
    </footer>
  )
}
