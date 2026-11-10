import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowUp } from 'lucide-react'
import { FitText } from '../components/FitText'
import { LogoMark } from '../components/Logo'
import { SECTIONS } from '../data/navigation'
import { useSmoothScroll } from '../hooks/useSmoothScroll'

const GUDEV_WHATSAPP =
  'https://wa.me/5511964650141?text=' +
  encodeURIComponent('Oi! Vi o site conceito APEX e quero um site assim pro meu negócio.')

/**
 * Closing frame. The wordmark is set as wide as the page and rises into view
 * with the last scroll. Everything here does something: section links, the
 * photo credits, the way back up.
 */
export function Footer({ onCredits }: { onCredits: () => void }) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollTo } = useSmoothScroll()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const wordmarkY = useTransform(scrollYProgress, [0.3, 1], reduced ? ['0%', '0%'] : ['38%', '0%'])

  return (
    <footer ref={ref} className="relative z-10 overflow-hidden border-t border-line bg-ink">
      <div className="gutter pt-[clamp(4rem,8vw,7rem)]">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <LogoMark className="size-9 text-paper" />
            <p className="mt-6 max-w-[24rem] text-[1.375rem] leading-snug font-light text-paper">
              Engineering emotions.
              <br />
              Defining performance.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3 lg:col-start-7">
            <h2 className="data text-steel">Explore</h2>
            <ul className="mt-5 space-y-3">
              {SECTIONS.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollTo(`#${section.id}`)
                    }}
                    className="group inline-flex items-center gap-3 text-[1.0625rem] text-silver transition-colors duration-300 hover:text-paper"
                  >
                    <span aria-hidden className="h-px w-0 bg-apex transition-[width] duration-500 ease-expo group-hover:w-5" />
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="data text-steel">About this site</h2>
            <ul className="mt-5 space-y-3 text-[1.0625rem]">
              <li>
                <button type="button" onClick={onCredits} className="group inline-flex items-center gap-3 text-silver transition-colors duration-300 hover:text-paper">
                  <span aria-hidden className="h-px w-0 bg-apex transition-[width] duration-500 ease-expo group-hover:w-5" />
                  Photo credits and licences
                </button>
              </li>
              <li>
                <a
                  href={GUDEV_WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-silver transition-colors duration-300 hover:text-paper"
                >
                  <span aria-hidden className="h-px w-0 bg-apex transition-[width] duration-500 ease-expo group-hover:w-5" />
                  Concept and build by GuDev
                  <span className="sr-only">(opens WhatsApp in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-[clamp(3rem,6vw,5rem)] flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:items-start sm:justify-between">
          <p className="max-w-[46rem] data leading-relaxed text-steel">
            APEX Automotive is a concept project, not a dealership. Vehicle names and trademarks belong to their
            manufacturers, who are not affiliated with this site. Figures are manufacturer data for the versions stated.
          </p>
          <button
            type="button"
            onClick={() => scrollTo('#top')}
            className="group inline-flex shrink-0 items-center gap-3 self-start data text-paper"
          >
            Back to top
            <span className="grid size-10 place-items-center rounded-full border border-paper/30 transition-[border-color,background-color] duration-300 group-hover:border-apex group-hover:bg-apex">
              <ArrowUp aria-hidden strokeWidth={1.5} className="size-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5" />
            </span>
          </button>
        </div>
      </div>

      {/* Wordmark, as wide as the page */}
      <div aria-hidden className="mt-8 overflow-hidden gutter">
        <motion.div className="wide leading-[0.74] font-black tracking-[-0.02em] text-paper" style={{ y: wordmarkY }}>
          <FitText className="!tracking-[-0.02em]">APEX</FitText>
        </motion.div>
      </div>
    </footer>
  )
}
