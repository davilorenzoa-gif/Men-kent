import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { SECTIONS, TRACKED_IDS } from '../data/navigation'
import { useActiveSection } from '../hooks/useActiveSection'
import { useSmoothScroll } from '../hooks/useSmoothScroll'

const RAIL = [{ id: 'top', label: 'Opening' }, ...SECTIONS]

/**
 * Page progress, shown twice:
 *  • a hairline across the top that fills with the scroll position;
 *  • on wide screens, a rail on the right edge with one tick per section.
 *    The current section's tick grows; its name appears when the section
 *    changes and on hover or focus.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 })
  const active = useActiveSection(TRACKED_IDS)
  const { scrollTo } = useSmoothScroll()

  /* Announce a new section for a moment, then get out of the content's way */
  const [announced, setAnnounced] = useState<string | null>(null)
  useEffect(() => {
    if (!active) return
    setAnnounced(active)
    const timer = window.setTimeout(() => setAnnounced(null), 1800)
    return () => window.clearTimeout(timer)
  }, [active])

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-apex"
        style={{ scaleX }}
      />

      <nav aria-label="Page sections" className="fixed top-1/2 right-5 z-[60] hidden -translate-y-1/2 xl:block">
        <ol className="flex flex-col items-end gap-4">
          {RAIL.map((section) => {
            const current = active === section.id
            return (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => scrollTo(`#${section.id}`)}
                  aria-current={current ? 'true' : undefined}
                  className="group flex items-center gap-3 py-1 mix-blend-difference"
                >
                  <span
                    className={`data text-paper transition-[opacity,transform] duration-500 ease-expo ${
                      announced === section.id
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100'
                    }`}
                  >
                    {section.label}
                  </span>
                  <span
                    className={`block h-px transition-[width,background-color] duration-500 ease-expo ${
                      current ? 'w-9 bg-apex' : 'w-4 bg-paper/50 group-hover:w-6 group-hover:bg-paper'
                    }`}
                  />
                </button>
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
