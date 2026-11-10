import { useEffect, useState } from 'react'
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { Plus } from 'lucide-react'
import { Button } from '../components/Button'
import { FitText } from '../components/FitText'
import { Magnetic } from '../components/Magnetic'
import { Picture } from '../components/Picture'
import { SplitText } from '../components/SplitText'
import { HERO_CAR } from '../data/engineering'
import { useFinePointer } from '../hooks/useMediaQuery'
import { useSmoothScroll } from '../hooks/useSmoothScroll'
import { EASE_CINE, EASE_EXPO, clamp } from '../lib/motion'

export const HERO_SIZES = '(max-width: 767px) 240vw, 115vw'

/**
 * Opening frame. The photograph is the whole composition: it settles out of
 * a slow push-in, drifts a few pixels against the pointer, and sinks into the
 * dark as the next section slides over it (the section is sticky).
 */
export function Hero({ ready }: { ready: boolean }) {
  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const { scrollTo } = useSmoothScroll()
  const motionOn = !reduced

  /* Scroll: 0 at the top of the page → 1 when the hero is fully covered. */
  const { scrollY } = useScroll()
  const progress = useTransform(scrollY, (y) => clamp(y / Math.max(1, window.innerHeight)))
  const imageScale = useTransform(progress, [0, 1], [1, motionOn ? 1.14 : 1])
  const shade = useTransform(progress, [0, 1], [0, 0.82])
  const copyY = useTransform(progress, [0, 1], ['0%', motionOn ? '-28%' : '0%'])
  const copyOpacity = useTransform(progress, [0, 0.7], [1, 0])
  const [covered, setCovered] = useState(false)
  useMotionValueEvent(progress, 'change', (v) => setCovered(v >= 1))

  /* Pointer: image and type move in opposite directions → depth. */
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 60, damping: 18, mass: 0.6 })
  const sy = useSpring(py, { stiffness: 60, damping: 18, mass: 0.6 })
  const imageX = useTransform(sx, (v) => v * -26)
  const imageY = useTransform(sy, (v) => v * -16)
  const typeX = useTransform(sx, (v) => v * 12)
  const typeY = useTransform(sy, (v) => v * 7)

  useEffect(() => {
    if (!fine || reduced) return
    const onMove = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth - 0.5)
      py.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [fine, reduced, px, py])

  return (
    <section
      id="top"
      aria-label="The art of performance"
      className="grain sticky top-0 h-[100svh] min-h-[600px] overflow-hidden bg-ink"
      style={{ visibility: covered ? 'hidden' : 'visible' }}
    >
      {/* ── Photograph ── */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[70%] overflow-hidden md:h-full"
        style={{ scale: imageScale }}
        initial={false}
      >
        <motion.div
          className="absolute -inset-[3%]"
          style={{ x: imageX, y: imageY }}
          initial={reduced ? { opacity: 0 } : { scale: 1.28, opacity: 0.4 }}
          animate={ready ? { scale: 1, opacity: 1 } : undefined}
          transition={{ duration: reduced ? 0.6 : 2.6, ease: EASE_EXPO }}
        >
          <div className={`h-full w-full ${ready && !covered ? 'animate-kenburns' : ''}`}>
            <Picture id="hero" sizes={HERO_SIZES} priority />
          </div>
        </motion.div>

        {/* Studio light crossing the bodywork, once */}
        {motionOn && (
          <motion.div
            aria-hidden
            className="absolute inset-y-0 -left-1/2 w-[70%]"
            style={{ background: 'linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.11) 50%, transparent 70%)' }}
            initial={{ x: '-60%' }}
            animate={ready ? { x: '330%' } : undefined}
            transition={{ duration: 2.4, ease: EASE_CINE, delay: 0.5 }}
          />
        )}

        {/* Grading: nav legibility on top, type legibility below, vignette on the sides */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-[38%] bg-gradient-to-b from-ink/85 via-ink/35 to-transparent" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-ink via-ink/70 to-transparent md:h-[58%]" />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: 'radial-gradient(120% 90% at 55% 45%, transparent 45%, rgba(8,8,8,0.72) 100%)' }}
        />
      </motion.div>

      {/* Scroll-out shade */}
      <motion.div aria-hidden className="absolute inset-0 bg-ink" style={{ opacity: shade }} />

      {/* ── Copy ── */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end gutter pb-6 sm:pb-8"
        style={{ y: copyY, opacity: copyOpacity }}
      >
        <motion.div style={{ x: typeX, y: typeY }}>
          <div className="mb-5 flex flex-col gap-6 md:mb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="max-w-[19rem] text-[1.0625rem] leading-snug font-light text-silver sm:max-w-none sm:text-xl">
                <SplitText text="Engineering emotions. Defining performance." play={ready} delay={1.25} stagger={0.05} duration={0.9} />
              </p>
              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: reduced ? 0 : 14 }}
                animate={ready ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.9, ease: EASE_EXPO, delay: reduced ? 0.2 : 1.7 }}
              >
                <Magnetic>
                  <Button variant="solid" icon={<Plus strokeWidth={1.75} />} onClick={() => scrollTo('#collection')}>
                    Explore the collection
                  </Button>
                </Magnetic>
              </motion.div>
            </div>

            {/* What is in the frame: real car, real figures */}
            <motion.dl
              className="hidden text-right md:block"
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : undefined}
              transition={{ duration: 1.2, delay: reduced ? 0.2 : 1.9 }}
            >
              <dt className="data text-steel">In frame</dt>
              <dd className="mt-1.5 text-[0.9375rem] text-paper">
                {HERO_CAR.name}, {HERO_CAR.version.toLowerCase()}
              </dd>
              <dd className="mt-1 flex justify-end gap-5 data text-silver">
                {HERO_CAR.facts.map((fact) => (
                  <span key={fact}>{fact}</span>
                ))}
              </dd>
            </motion.dl>
          </div>

          <motion.div
            aria-hidden
            className="mb-4 h-px origin-left bg-paper/25 sm:mb-5"
            initial={{ scaleX: 0 }}
            animate={ready ? { scaleX: 1 } : undefined}
            transition={{ duration: reduced ? 0.3 : 1.6, ease: EASE_EXPO, delay: reduced ? 0 : 0.7 }}
          />

          {/* Monumental title: one line on wide screens, a justified two-line block on phones */}
          <h1 className="display text-paper">
            <span className="hidden md:block">
              <FitText>
                <SplitText text="THE ART OF PERFORMANCE" by="char" play={ready} delay={0.55} stagger={0.03} duration={1.25} />
              </FitText>
            </span>
            <span className="block md:hidden">
              <span className="block">
                <FitText>
                  <SplitText text="THE ART OF" by="char" play={ready} delay={0.55} stagger={0.035} duration={1.2} />
                </FitText>
              </span>
              <span className="block">
                <FitText>
                  <SplitText text="PERFORMANCE" by="char" play={ready} delay={0.8} stagger={0.035} duration={1.2} />
                </FitText>
              </span>
            </span>
          </h1>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        className="absolute top-1/2 right-[clamp(1.25rem,4.2vw,4.5rem)] hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex xl:hidden"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <span className="data text-silver [writing-mode:vertical-rl]">Scroll</span>
        <span className="relative block h-16 w-px overflow-hidden bg-paper/20">
          <span className="animate-scroll-cue absolute inset-0 bg-paper" />
        </span>
      </motion.div>
    </section>
  )
}
