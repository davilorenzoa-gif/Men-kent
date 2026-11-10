import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { AnimatedNumber } from '../components/AnimatedNumber'
import { COLLECTION } from '../data/vehicles'

const STATEMENT = 'Six machines. Six answers to one question: how should speed feel?'

const FACTS = [
  { value: COLLECTION.count, decimals: 0, unit: '', label: 'Cars in the collection' },
  { value: COLLECTION.combinedPowerPs, decimals: 0, unit: 'PS', label: 'Combined output' },
  { value: COLLECTION.quickestSprint, decimals: 1, unit: 's', label: 'Quickest to 100 km/h' },
  { value: COLLECTION.highestTopSpeed, decimals: 0, unit: 'km/h', label: 'Highest top speed' },
]

/**
 * The statement lights up word by word as it crosses the viewport. This is
 * the page's quiet moment between the hero and the cars.
 */
export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.5'] })
  const words = STATEMENT.split(' ')

  return (
    <section aria-label="Introduction" className="relative z-10 bg-ink gutter pt-[clamp(5rem,13vw,11rem)] pb-[clamp(4rem,9vw,8rem)]">
      <p ref={ref} className="display text-[clamp(2.9rem,9.3vw,10.5rem)] text-paper" aria-label={STATEMENT}>
        {words.map((word, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} still={!!reduced}>
            {word}
          </Word>
        ))}
      </p>

      <div className="mt-[clamp(3rem,7vw,6rem)] grid gap-10 lg:grid-cols-12">
        <p className="max-w-[34rem] text-[1.0625rem] leading-relaxed text-silver lg:col-span-5 lg:col-start-1">
          APEX is a private garage, curated car by car. Every figure on these pages is the manufacturer’s own, for the
          exact version named. Nothing rounded up, nothing assumed.
        </p>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 sm:grid-cols-4 lg:col-span-7 lg:col-start-6 lg:border-t-0 lg:pt-0">
          {FACTS.map((fact) => (
            <div key={fact.label} className="lg:border-l lg:border-line lg:pl-5">
              <dd className="figure text-[clamp(2.4rem,4.4vw,4rem)] text-paper">
                <AnimatedNumber value={fact.value} decimals={fact.decimals} />
                {fact.unit && <span className="ml-1.5 data text-steel">{fact.unit}</span>}
              </dd>
              <dt className="mt-3 data text-steel">{fact.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Word({ children, progress, range, still }: { children: string; progress: MotionValue<number>; range: [number, number]; still: boolean }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return (
    <motion.span aria-hidden className="mr-[0.22em] inline-block" style={{ opacity: still ? 1 : opacity }}>
      {children}
    </motion.span>
  )
}
