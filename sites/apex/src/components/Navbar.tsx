import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { SECTIONS, TRACKED_IDS } from '../data/navigation'
import { useActiveSection } from '../hooks/useActiveSection'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { useScrollLock, useSmoothScroll } from '../hooks/useSmoothScroll'
import { EASE_CINE, EASE_EXPO } from '../lib/motion'
import { Logo } from './Logo'

/**
 * Minimal top bar. Transparent over the hero, a blurred strip once the page
 * has moved; it steps out of the way while scrolling down and returns on the
 * first scroll up. Below `lg` the links live in a full-screen menu.
 */
export function Navbar({ visible }: { visible: boolean }) {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(TRACKED_IDS)
  const { scrollTo } = useSmoothScroll()
  const reduced = useReducedMotion()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(latest > 40)
    if (latest > previous + 4 && latest > 500) setHidden(true)
    else if (latest < previous - 4 || latest <= 500) setHidden(false)
  })

  const go = useCallback(
    (id: string) => {
      setMenuOpen(false)
      scrollTo(`#${id}`)
    },
    [scrollTo],
  )

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={false}
        animate={{ y: visible && (!hidden || menuOpen) ? '0%' : '-110%' }}
        transition={{ duration: reduced ? 0.2 : 0.7, ease: EASE_EXPO }}
      >
        <div
          className={`absolute inset-0 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
            scrolled && !menuOpen ? 'border-line/80 bg-ink/70 backdrop-blur-md' : 'border-transparent bg-transparent'
          }`}
        />
        <div className="relative flex h-16 items-center justify-between gutter sm:h-20">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault()
              go('top')
            }}
            aria-label="APEX Automotive, back to top"
            className="relative z-10 text-paper"
          >
            <Logo />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-10">
              {SECTIONS.map((section) => {
                const current = active === section.id
                return (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        go(section.id)
                      }}
                      aria-current={current ? 'true' : undefined}
                      className={`group relative block py-2 text-[0.6875rem] wide transition-colors duration-300 ${
                        current ? 'text-paper' : 'text-silver hover:text-paper'
                      }`}
                    >
                      {section.label}
                      <span
                        aria-hidden
                        className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-apex transition-transform duration-500 ease-expo ${
                          current ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <button
            type="button"
            className="relative z-10 -mr-2 grid size-11 place-items-center lg:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="relative block h-3 w-7">
              <span
                className={`absolute left-0 h-px w-full bg-paper transition-transform duration-500 ease-expo ${
                  menuOpen ? 'top-1/2 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 h-px w-full bg-paper transition-transform duration-500 ease-expo ${
                  menuOpen ? 'top-1/2 -rotate-45' : 'top-full'
                }`}
              />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>{menuOpen && <MobileMenu active={active} onNavigate={go} onClose={() => setMenuOpen(false)} />}</AnimatePresence>
    </>
  )
}

function MobileMenu({ active, onNavigate, onClose }: { active: string | null; onNavigate: (id: string) => void; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  useScrollLock(true)
  useFocusTrap(ref, true, onClose)

  return (
    <motion.div
      ref={ref}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      tabIndex={-1}
      className="fixed inset-0 z-40 flex flex-col bg-ink gutter pt-28 pb-10 lg:hidden"
      initial={reduced ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
      animate={reduced ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
      exit={reduced ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: reduced ? 0.2 : 0.8, ease: EASE_CINE }}
    >
      <nav aria-label="Mobile">
        <ul className="border-t border-line">
          {SECTIONS.map((section, i) => (
            <li key={section.id} className="overflow-hidden border-b border-line">
              <motion.a
                href={`#${section.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  onNavigate(section.id)
                }}
                aria-current={active === section.id ? 'true' : undefined}
                className="flex items-baseline justify-between py-5 display text-[clamp(2.6rem,13vw,4.5rem)] text-paper"
                initial={reduced ? { opacity: 0 } : { y: '105%' }}
                animate={reduced ? { opacity: 1 } : { y: '0%' }}
                transition={{ duration: 0.9, ease: EASE_EXPO, delay: reduced ? 0 : 0.25 + i * 0.07 }}
              >
                {section.label}
                {active === section.id && <span aria-hidden className="size-2 rounded-full bg-apex" />}
              </motion.a>
            </li>
          ))}
        </ul>
      </nav>
      <motion.p
        className="mt-auto max-w-[22rem] text-[0.9375rem] text-steel"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduced ? 0 : 0.7, duration: 0.6 }}
      >
        Engineering emotions. Defining performance.
      </motion.p>
    </motion.div>
  )
}
