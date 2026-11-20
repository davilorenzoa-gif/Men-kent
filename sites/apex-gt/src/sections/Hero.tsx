import { lazy, Suspense, useCallback, useEffect, useRef } from 'react'
import { ArrowDownRight } from 'lucide-react'
import type { Obstacle } from '../components/WindTunnel'

// Three.js arrives after the photo and the title: the hero never waits for WebGL.
const WindTunnel = lazy(() => import('../components/WindTunnel').then((m) => ({ default: m.WindTunnel })))
import { gsap, ScrollTrigger, img, srcSet, reducedMotion, finePointer, scrollToTarget } from '../lib/gsap'

// Car silhouette inside gt3-studio (normalised to the photo box)
const CAR = { cx: 0.488, cy: 0.515, a: 0.305, b: 0.2 }
const TITLE_TOP = 'BEYOND'
const TITLE_BOTTOM = 'THE LIMITS'

const chars = (s: string) =>
  s.split('').map((c, i) => (
    <span key={i} className="mask-line inline-block">
      <span data-char className="inline-block will-change-transform">
        {c === ' ' ? ' ' : c}
      </span>
    </span>
  ))

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const photo = useRef<HTMLDivElement>(null)
  const canvasBox = useRef<HTMLDivElement>(null)
  const intensity = useRef(0)
  const boost = useRef(0)

  const getObstacle = useCallback((): Obstacle | null => {
    const p = photo.current
    const c = canvasBox.current
    if (!p || !c) return null
    const pr = p.getBoundingClientRect()
    const cr = c.getBoundingClientRect()
    return {
      cx: pr.left - cr.left + CAR.cx * pr.width,
      cy: pr.top - cr.top + CAR.cy * pr.height,
      a: CAR.a * pr.width,
      b: CAR.b * pr.height,
    }
  }, [])

  useEffect(() => {
    const el = root.current!
    const q = gsap.utils.selector(el)
    const reduce = reducedMotion()

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(q('[data-char], [data-fade], [data-photo]'), { opacity: 1 })
        intensity.current = 0.6
        return
      }

      // --- Intro: the light bar draws, the studio lights come up, the title rises, the air starts moving.
      const tl = gsap.timeline({ delay: 0.15 })
      tl.fromTo(q('[data-lightbar]'), { scaleX: 0, opacity: 1 }, { scaleX: 1, duration: 1.1, ease: 'expo.inOut' })
        .fromTo(q('[data-photo]'), { opacity: 0, scale: 1.12 }, { opacity: 1, scale: 1, duration: 2.2, ease: 'expo.out' }, 0.75)
        .to(q('[data-lightbar]'), { opacity: 0, scaleY: 6, duration: 0.9, ease: 'power2.out' }, 1.05)
        .fromTo(q('[data-char]'), { yPercent: 115 }, { yPercent: 0, duration: 1.3, stagger: 0.035, ease: 'expo.out' }, 1.0)
        .fromTo(q('[data-fade]'), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: 'expo.out' }, 1.5)
        .fromTo(document.querySelector('[data-intro="nav"]'), { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 1, ease: 'expo.out' }, 1.5)
        .to(intensity, { current: 1, duration: 2.4, ease: 'power2.inOut' }, 1.3)

      // --- Scroll: the car settles back, the title climbs away, the smoke speeds up with velocity.
      gsap
        .timeline({ scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true } })
        .to(q('[data-photo-wrap]'), { yPercent: 14, scale: 1.08, ease: 'none' }, 0)
        .to(q('[data-title-top]'), { yPercent: -60, ease: 'none' }, 0)
        .to(q('[data-title-bottom]'), { yPercent: -20, ease: 'none' }, 0)
        .to(q('[data-bottom]'), { opacity: 0, y: -30, ease: 'none' }, 0)
        .to(q('[data-shade]'), { opacity: 0.85, ease: 'none' }, 0)

      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => {
          const v = Math.abs(self.getVelocity()) / 2200
          gsap.to(boost, { current: Math.min(2.5, v), duration: 0.6, overwrite: true })
        },
      })

      // --- Mouse depth: photo and title drift in opposite directions.
      if (finePointer()) {
        const px = gsap.quickTo(q('[data-photo]'), 'x', { duration: 1.2, ease: 'power3' })
        const py = gsap.quickTo(q('[data-photo]'), 'y', { duration: 1.2, ease: 'power3' })
        const tx = gsap.quickTo(q('[data-titles]'), 'x', { duration: 1.4, ease: 'power3' })
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5
          const ny = e.clientY / window.innerHeight - 0.5
          px(nx * -18)
          py(ny * -10)
          tx(nx * 14)
        }
        window.addEventListener('pointermove', onMove, { passive: true })
        return () => window.removeEventListener('pointermove', onMove)
      }
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="top" className="relative isolate h-[100svh] min-h-[600px] overflow-hidden bg-ink" aria-label="APEX, Beyond the limits">
      {/* Titles sit behind the photo: the photo is blended with "lighten", so the car passes in front of the letters. */}
      <div data-titles className="pointer-events-none absolute inset-0 z-0">
        <h1 className="sr-only">APEX: Beyond the limits</h1>
        <div
          data-title-top
          aria-hidden="true"
          className="display absolute left-0 right-0 top-[15svh] text-center text-[27vw] text-[#6b6b68] md:top-[11svh] md:text-[21.5vw]"
        >
          {chars(TITLE_TOP)}
        </div>
      </div>

      <div data-photo-wrap className="absolute inset-0 z-10 mix-blend-lighten">
        <div
          ref={photo}
          data-photo
          className="absolute left-1/2 top-[56%] aspect-[1080/715] w-[150vw] -translate-x-[47%] -translate-y-1/2 sm:w-[130vw] sm:-translate-x-1/2 md:top-[57%] md:w-[min(112vw,165svh)]"
          style={{
            maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 62%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 62%, transparent 100%)',
          }}
        >
          <img
            src={img('gt3-studio', 1080)}
            srcSet={srcSet('gt3-studio', [640, 1080])}
            sizes="(max-width: 767px) 150vw, 112vw"
            width={1080}
            height={715}
            alt="Porsche 911 GT3 RS in light grey with red wheels and headlights on, in a dark studio"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div ref={canvasBox} className="pointer-events-none absolute inset-0 z-20">
        <Suspense fallback={null}>
          <WindTunnel getObstacle={getObstacle} intensity={intensity} boost={boost} className="h-full w-full" />
        </Suspense>
      </div>

      <div data-lightbar aria-hidden="true" className="pointer-events-none absolute left-[8%] right-[8%] top-[57%] z-20 h-[2px] origin-center bg-signal-hot opacity-0 shadow-[0_0_24px_4px_rgba(224,48,61,0.6)]" />

      <div data-shade aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 bg-ink opacity-0" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[38%] bg-gradient-to-t from-ink via-ink/70 to-transparent" />
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 z-20 overflow-hidden" />

      {/* Foreground */}
      <div className="gutter absolute inset-x-0 bottom-0 z-30 pb-[max(22px,env(safe-area-inset-bottom))] md:pb-9">
        <div data-title-bottom aria-hidden="true" className="display mb-5 text-[19vw] text-ice md:mb-6 md:text-[10.4vw]">
          <span className="block md:inline">{chars('THE')}</span>
          <span className="hidden md:inline">{chars(' ')}</span>
          {chars('LIMITS')}
          <span className="sr-only">{TITLE_BOTTOM}</span>
        </div>

        <div data-bottom className="grid grid-cols-2 items-end gap-x-6 gap-y-5 md:grid-cols-12">
          <p data-fade className="col-span-2 max-w-[22ch] font-sans text-[17px] leading-snug text-ice/85 md:col-span-4 md:text-lg">
            Engineering emotion.
            <br />
            Defining performance.
          </p>

          <button
            data-fade
            type="button"
            onClick={() => scrollToTarget('#machine')}
            className="group flex items-center gap-3 justify-self-start md:col-span-4 md:col-start-6 md:justify-self-center"
            aria-label="Scroll to The Machine"
          >
            <span className="relative block h-11 w-px overflow-hidden bg-ice/15">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_1.8s_cubic-bezier(.7,0,.3,1)_infinite] bg-ice" />
            </span>
            <span className="eyebrow text-ice/70 transition-colors group-hover:text-ice">Scroll</span>
          </button>

          <a
            data-fade
            href="#machine"
            onClick={(e) => {
              e.preventDefault()
              scrollToTarget('#machine')
            }}
            className="group justify-self-end text-right md:col-span-3 md:col-start-10"
          >
            <span className="eyebrow block">Porsche · 992</span>
            <span className="mt-1 inline-flex items-center gap-1.5 font-mono text-[13px] uppercase tracking-[0.12em] text-ice">
              911 GT3 RS <ArrowDownRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </span>
            <span className="mt-1 block font-mono text-[11px] text-mute">525 PS · 9,000 rpm</span>
          </a>
        </div>
      </div>
    </section>
  )
}
