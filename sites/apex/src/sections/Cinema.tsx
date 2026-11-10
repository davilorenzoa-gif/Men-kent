import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Player, kindLabel } from '../components/cinema/Player'
import { Picture } from '../components/Picture'
import { SectionHeading } from '../components/SectionHeading'
import { FILMS } from '../data/films'

/**
 * CINEMATIC GARAGE. The screen opens like a theatre curtain as the section
 * scrolls in, then behaves like a small cinema: one wide stage, a programme
 * underneath. Films are configured in data/films.ts.
 */
export function Cinema() {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState(false)
  const film = FILMS[index]!
  const reduced = useReducedMotion()

  const stage = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: stage, offset: ['start end', 'start 0.3'] })
  const inset = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [14, 0])
  const clipPath = useTransform(inset, (v) => `inset(${v}% ${v * 0.75}% ${v}% ${v * 0.75}%)`)
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1.08, 1])

  return (
    <section id="cinema" aria-labelledby="cinema-title" className="relative z-10 bg-black pt-[clamp(5rem,11vw,10rem)] pb-[clamp(5rem,10vw,9rem)]">
      <div className="gutter">
        <SectionHeading id="cinema-title" title="Cinematic Garage">
          Lights down. A wide screen for the cars in motion, with a programme you can change.
        </SectionHeading>
      </div>

      <motion.div ref={stage} className="mt-[clamp(2.5rem,5vw,4.5rem)] md:px-[clamp(1.25rem,4.2vw,4.5rem)]" style={{ clipPath }}>
        <motion.div style={{ scale }}>
          <Player key={film.id} film={film} autoPlay={picked} />
        </motion.div>
      </motion.div>

      {/* Programme */}
      <div className="mt-8 gutter">
        <ul className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3" aria-label="Programme">
          {FILMS.map((item, i) => {
            const active = i === index
            return (
              <li key={item.id}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setIndex(i)
                    setPicked(true)
                  }}
                  className={`group flex h-full w-full items-center gap-4 p-4 text-left transition-colors duration-500 sm:p-5 ${
                    active ? 'bg-carbon' : 'bg-black hover:bg-graphite'
                  }`}
                >
                  <span className="relative block aspect-video w-24 shrink-0 overflow-hidden bg-graphite sm:w-28">
                    <Picture
                      id={item.poster}
                      sizes="112px"
                      alt=""
                      imgClassName={`h-full w-full object-cover transition-[transform,filter] duration-700 ease-expo group-hover:scale-110 ${active ? '' : 'grayscale'}`}
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-2 data text-steel">
                      <span aria-hidden className={`size-1.5 rounded-full ${active ? 'bg-apex' : 'bg-gunmetal'}`} />
                      {active ? 'Now showing' : kindLabel(item)}
                    </span>
                    <span className="mt-2 block truncate wide text-[0.75rem] text-paper">{item.title}</span>
                    <span className="mt-1 block truncate text-[0.8125rem] text-steel">{item.note}</span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
