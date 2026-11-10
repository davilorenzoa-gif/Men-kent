import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { Picture } from '../components/Picture'
import { SplitText } from '../components/SplitText'
import { IMAGES, type ImageId } from '../data/images.generated'
import { useIsDesktop } from '../hooks/useMediaQuery'

/** The strip: photographs of different heights, hung at different levels. */
const FRAMES: { image: ImageId; caption: string; car: string; shape: string; hang: string }[] = [
  { image: 'frame-1', caption: 'Cockpit', car: 'McLaren 750S', shape: 'h-[54vh] aspect-[5/4]', hang: 'self-start' },
  { image: 'frame-2', caption: 'Arrival', car: 'Ferrari 296 GTB', shape: 'h-[68vh] aspect-[3/2]', hang: 'self-end' },
  { image: 'frame-3', caption: 'Unsprung', car: 'Porsche 911 GT3 RS', shape: 'h-[52vh] aspect-square', hang: 'self-center' },
  { image: 'frame-4', caption: 'Departure', car: 'Ferrari 296 GTB', shape: 'h-[64vh] aspect-[5/4]', hang: 'self-start' },
  { image: 'frame-5', caption: 'At the wheel', car: 'Audi RS 6 Avant', shape: 'h-[54vh] aspect-[4/3]', hang: 'self-end' },
  { image: 'frame-6', caption: 'Long roof', car: 'Audi RS 6 Avant', shape: 'h-[62vh] aspect-[16/10]', hang: 'self-center' },
]

/**
 * A filmstrip. On desktop the section pins and vertical scroll drives the
 * strip sideways; on touch screens it is a native horizontal scroller with
 * snap points, which is smoother than any scripted pin on a phone.
 */
export function Frames() {
  const desktop = useIsDesktop()
  const reduced = useReducedMotion()
  const pinned = desktop && !reduced

  const outer = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [travel, setTravel] = useState(0)

  /* How far the strip has to move = its overflow beyond the viewport. */
  useEffect(() => {
    if (!pinned) return
    const el = track.current
    if (!el) return
    let width = -1
    const measure = () => {
      if (window.innerWidth === width) return
      width = window.innerWidth
      setTravel(Math.max(0, el.scrollWidth - window.innerWidth))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [pinned])

  const { scrollYProgress } = useScroll({ target: outer, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel])

  return (
    <section id="frames" aria-labelledby="frames-title" className="relative z-10 bg-ink">
      <div ref={outer} style={pinned ? { height: `calc(100vh + ${travel}px)` } : undefined}>
        <div className={pinned ? 'sticky top-0 flex h-screen flex-col justify-center overflow-hidden' : 'py-[clamp(4rem,10vw,7rem)]'}>
          <motion.div
            ref={track}
            style={pinned ? { x } : undefined}
            className={
              pinned
                ? 'flex h-[78vh] w-max items-stretch gap-[5vw] gutter will-change-transform'
                : 'no-scrollbar gutter-snap flex snap-x snap-mandatory items-center gap-5 overflow-x-auto gutter pb-2'
            }
          >
            {/* Title card */}
            <div className={`flex shrink-0 flex-col justify-center ${pinned ? 'w-[34vw] pr-[2vw]' : 'w-[78vw] snap-start sm:w-[50vw]'}`}>
              <h2 id="frames-title" className="display text-[clamp(4rem,11vw,12rem)] text-paper">
                <SplitText text="Frames" by="char" />
              </h2>
              <p className="mt-6 max-w-[24rem] text-[1.0625rem] leading-relaxed text-silver">
                The parts you only notice when you stop walking: a seat, a caliper, a tail light in the dark.
              </p>
              <p className="mt-8 data text-steel">{pinned ? 'Keep scrolling' : 'Swipe sideways'}</p>
            </div>

            {FRAMES.map((frame, i) => (
              <Frame key={frame.image} frame={frame} index={i} pinned={pinned} progress={scrollYProgress} />
            ))}

            {pinned && <div aria-hidden className="w-[4vw] shrink-0" />}
          </motion.div>

          {/* Strip progress */}
          {pinned && (
            <div aria-hidden className="absolute inset-x-0 bottom-8 gutter">
              <div className="relative h-px bg-line">
                <motion.div className="absolute inset-0 origin-left bg-paper" style={{ scaleX: scrollYProgress }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function Frame({ frame, index, pinned, progress }: { frame: (typeof FRAMES)[number]; index: number; pinned: boolean; progress: MotionValue<number> }) {
  const credit = IMAGES[frame.image].credit
  /* Each photo slides inside its frame as the strip passes: a window, not a sticker. */
  const shift = useTransform(progress, [0, 1], ['6%', '-6%'])
  return (
    <figure className={`flex shrink-0 flex-col ${pinned ? frame.hang : 'w-[82vw] snap-center sm:w-[56vw]'}`}>
      <div className={`relative overflow-hidden bg-graphite ${pinned ? frame.shape : 'aspect-[5/4]'}`}>
        <motion.div className="absolute inset-y-0 -inset-x-[8%]" style={pinned ? { x: shift } : undefined}>
          <Picture id={frame.image} sizes={pinned ? '50vw' : '82vw'} />
        </motion.div>
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between gap-4">
        <span className="wide text-[0.6875rem] text-paper">
          <span className="mr-3 text-apex" aria-hidden>
            {String(index + 1).padStart(2, '0')}
          </span>
          {frame.caption}
        </span>
        <span className="truncate data text-[0.5625rem] text-steel">
          {frame.car}, photo {credit.author}
        </span>
      </figcaption>
    </figure>
  )
}
