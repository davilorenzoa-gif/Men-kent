import { useEffect, useRef } from 'react'
import { gsap, img, srcSet, reducedMotion } from '../lib/gsap'

/**
 * Editorial close-ups of the GT3 RS. Each image is revealed by a mask that opens from a slit
 * (the shape of the car's rear light bar) while the photo inside eases back from a zoom.
 */
export function Details() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reducedMotion()) return
    const el = root.current!
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((box) => {
        const inner = box.querySelector('img')
        const from = box.dataset.reveal === 'side' ? 'inset(0% 100% 0% 0%)' : 'inset(48% 0% 48% 0%)'
        gsap
          .timeline({ scrollTrigger: { trigger: box, start: 'top 85%', end: 'top 25%', scrub: 0.8 } })
          .fromTo(box, { clipPath: from }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut' }, 0)
          .fromTo(inner, { scale: 1.35 }, { scale: 1, ease: 'power2.out' }, 0)
      })
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((n) => {
        gsap.fromTo(
          n,
          { yPercent: Number(n.dataset.parallax) },
          { yPercent: -Number(n.dataset.parallax), ease: 'none', scrollTrigger: { trigger: n, start: 'top bottom', end: 'bottom top', scrub: true } },
        )
      })
      gsap.utils.toArray<HTMLElement>('[data-words]').forEach((p) => {
        gsap.fromTo(
          p.querySelectorAll('[data-w]'),
          { opacity: 0.12 },
          { opacity: 1, stagger: 0.08, ease: 'none', scrollTrigger: { trigger: p, start: 'top 80%', end: 'bottom 45%', scrub: true } },
        )
      })
    }, el)
    return () => ctx.revert()
  }, [])

  const words = (s: string) =>
    s.split(' ').map((w, i) => (
      <span key={i} data-w className="inline-block">
        {w}&nbsp;
      </span>
    ))

  return (
    <section ref={root} aria-label="Details of the 911 GT3 RS" className="gutter relative bg-ink pb-28 md:pb-44">
      <p data-words className="display max-w-[16ch] text-[clamp(40px,10.5vw,64px)] leading-[0.9] md:text-[clamp(56px,6.2vw,112px)]">
        {words('Every surface answers to the air.')}
      </p>

      <div className="mt-14 grid grid-cols-1 gap-y-16 md:mt-24 md:grid-cols-12 md:gap-x-8">
        <figure className="md:col-span-7">
          <div data-reveal className="relative aspect-[1080/806] overflow-hidden bg-graphite">
            <img
              src={img('wing', 1080)}
              srcSet={srcSet('wing', [640, 1080])}
              sizes="(max-width: 767px) 100vw, 58vw"
              width={1080}
              height={806}
              loading="lazy"
              decoding="async"
              alt="Close-up of the GT3 RS swan-neck rear wing: red upper element, carbon end plates and the DRS actuator"
              className="h-full w-full object-cover"
            />
          </div>
          <figcaption className="mt-5 grid grid-cols-[auto_1fr] gap-x-5 gap-y-1">
            <span className="font-mono text-[11px] text-signal-hot">A</span>
            <span className="eyebrow text-ice">Swan-neck wing with DRS</span>
            <span />
            <span className="max-w-[44ch] text-[15px] leading-relaxed text-ice/65">
              The upper element flattens at the push of a button for the straights, then stands back up under braking as an air brake. Total downforce: 860 kg at 285 km/h.
            </span>
          </figcaption>
        </figure>

        <figure className="md:col-span-5 md:mt-48" data-parallax="8">
          <div data-reveal="side" className="relative aspect-[4/5] overflow-hidden bg-graphite">
            <img
              src={img('gt3-front', 960)}
              srcSet={srcSet('gt3-front', [960, 1440])}
              sizes="(max-width: 767px) 100vw, 40vw"
              width={1440}
              height={850}
              loading="lazy"
              decoding="async"
              alt="Front of a satin-black GT3 RS: carbon bonnet with the large vents over the central radiator"
              className="h-full w-full object-cover object-[58%_50%]"
            />
          </div>
          <figcaption className="mt-5 grid grid-cols-[auto_1fr] gap-x-5 gap-y-1">
            <span className="font-mono text-[11px] text-signal-hot">B</span>
            <span className="eyebrow text-ice">Central radiator</span>
            <span />
            <span className="max-w-[44ch] text-[15px] leading-relaxed text-ice/65">
              One large radiator moved to the nose, where the luggage space used to be. The hot air leaves through the vents in the carbon bonnet.
            </span>
          </figcaption>
        </figure>

        <figure className="md:col-span-12">
          <div data-reveal className="relative aspect-[16/10] overflow-hidden bg-[#050507] md:aspect-[21/8]">
            <img
              src={img('gt3-glow', 1080)}
              srcSet={srcSet('gt3-glow', [640, 1080])}
              sizes="100vw"
              width={1080}
              height={700}
              loading="lazy"
              decoding="async"
              alt="Rear of a white GT3 RS in the dark, the full-width light bar glowing red"
              className="h-full w-full object-cover object-[50%_45%]"
            />
            <p className="display absolute bottom-4 left-4 text-[clamp(28px,7vw,40px)] md:bottom-8 md:left-8 md:text-[clamp(40px,4vw,72px)]">
              1,450 kg.
              <span className="block text-ice/45">All of it working.</span>
            </p>
          </div>
        </figure>
      </div>
    </section>
  )
}
