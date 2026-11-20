import { useEffect, useRef } from 'react'
import { gsap, img, srcSet, reducedMotion } from '../lib/gsap'

const LINE_1 = 'Some machines are built to move.'
const LINE_2 = 'Others are built to move you.'

/**
 * Full-screen moment. The garage photo opens from the thin red line of the GT3 RS light bar,
 * the camera eases back, the light bar flares, and the two lines arrive one after the other.
 */
export function Story() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = root.current!
    const q = gsap.utils.selector(el)
    if (reducedMotion()) {
      gsap.set(q('[data-frame]'), { clipPath: 'inset(0% 0% 0% 0%)' })
      gsap.set(q('[data-slit]'), { opacity: 0 })
      gsap.set(q('[data-flare]'), { opacity: 1 })
      return
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: q('[data-stage]')[0], start: 'top top', end: '+=260%', pin: true, scrub: 0.8, anticipatePin: 1 },
      })
      tl.fromTo(q('[data-slit]'), { scaleX: 0 }, { scaleX: 1, duration: 0.18, ease: 'power2.inOut' })
        .fromTo(q('[data-frame]'), { clipPath: 'inset(49.6% 0% 49.6% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.42, ease: 'power2.inOut' }, 0.16)
        .fromTo(q('[data-frame] img'), { scale: 1.45 }, { scale: 1.05, duration: 0.9, ease: 'power1.out' }, 0.16)
        .to(q('[data-slit]'), { opacity: 0, duration: 0.1 }, 0.3)
        .fromTo(q('[data-flare]'), { opacity: 0, scaleX: 0.6 }, { opacity: 1, scaleX: 1, duration: 0.25, ease: 'power2.out' }, 0.42)
        .fromTo(q('[data-l1] [data-word]'), { opacity: 0, yPercent: 60, filter: 'blur(10px)' }, { opacity: 1, yPercent: 0, filter: 'blur(0px)', stagger: 0.03, duration: 0.18 }, 0.5)
        .fromTo(q('[data-l2] [data-word]'), { opacity: 0, yPercent: 60, filter: 'blur(10px)' }, { opacity: 1, yPercent: 0, filter: 'blur(0px)', stagger: 0.03, duration: 0.18 }, 0.78)
        .to(q('[data-l1]'), { opacity: 0.6, duration: 0.15 }, 0.82)
        .to({}, { duration: 0.15 })
    }, el)
    return () => ctx.revert()
  }, [])

  const words = (s: string) =>
    s.split(' ').map((w, i) => (
      <span key={i} data-word className="inline-block will-change-transform">
        {w}
        {' '}
      </span>
    ))

  return (
    <section ref={root} id="story" aria-label="Story" className="relative bg-ink">
      <div data-stage className="relative h-[100svh] overflow-hidden">
        <div data-slit aria-hidden="true" className="absolute left-[10%] right-[10%] top-1/2 z-10 h-[2px] origin-center bg-signal-hot shadow-[0_0_30px_6px_rgba(224,48,61,0.55)]" />

        <div data-frame className="absolute inset-0 overflow-hidden" style={{ clipPath: 'inset(49.6% 0% 49.6% 0%)' }}>
          {/* Cover box that keeps the photo's own proportions, so the flare can sit on the real light bar */}
          <div className="absolute left-1/2 top-1/2 aspect-[1080/602] w-[max(100vw,179.4svh)] -translate-x-1/2 -translate-y-1/2">
            <img
              src={img('gt3-garage', 1080)}
              srcSet={srcSet('gt3-garage', [640, 1080])}
              sizes="100vw"
              width={1080}
              height={602}
              loading="lazy"
              decoding="async"
              alt="A GT3 RS seen from behind in a dark garage, its red light bar on, shutters lit from the side"
              className="h-full w-full object-cover"
            />
            <div
              data-flare
              aria-hidden="true"
              className="absolute left-[28%] top-[53.5%] h-[7%] w-[44%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,60,70,0.85),rgba(183,25,37,0.35)_55%,transparent)] opacity-0 mix-blend-screen blur-md"
            />
          </div>
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,transparent_35%,rgba(8,8,8,0.85)_100%)]" />
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-ink from-25% via-ink/75 to-transparent" />
          <div aria-hidden="true" className="grain absolute inset-0 overflow-hidden" />
        </div>

        <blockquote className="gutter absolute inset-x-0 top-[13svh] z-20 text-center md:top-[11svh]">
          <p data-l1 className="font-serif text-[clamp(30px,8.4vw,44px)] font-light italic leading-[1.05] text-ice md:text-[clamp(40px,4.6vw,84px)]">
            {words(LINE_1)}
          </p>
          <p data-l2 className="mt-2 font-serif text-[clamp(30px,8.4vw,44px)] font-light italic leading-[1.05] text-ice md:mt-3 md:text-[clamp(40px,4.6vw,84px)]">
            {words(LINE_2)}
          </p>
        </blockquote>

        <p className="eyebrow gutter absolute bottom-[max(20px,env(safe-area-inset-bottom))] left-0 z-20 flex items-center gap-3">
          <span className="text-signal">03</span>
          <span className="h-px w-8 bg-ice/25" />
          The Story
        </p>
      </div>
    </section>
  )
}
