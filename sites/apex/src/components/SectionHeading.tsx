import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { EASE_EXPO } from '../lib/motion'
import { SplitText } from './SplitText'

/**
 * Section opener: a headline that rises out of a mask, a hairline that draws
 * across, and a short line of context on the right.
 */
export function SectionHeading({ title, children, id }: { title: string; children?: ReactNode; id?: string }) {
  const reduced = useReducedMotion()
  return (
    <header className="grid items-end gap-6 lg:grid-cols-12">
      <h2 id={id} className="display text-[clamp(3.25rem,10.5vw,11rem)] text-paper lg:col-span-8">
        <SplitText text={title} by="char" stagger={0.022} />
      </h2>
      {children && (
        <motion.p
          className="max-w-[26rem] text-[1.0625rem] leading-relaxed text-silver lg:col-span-4 lg:justify-self-end lg:pb-3"
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1, ease: EASE_EXPO, delay: 0.15 }}
        >
          {children}
        </motion.p>
      )}
      <motion.div
        aria-hidden
        className="h-px origin-left bg-line lg:col-span-12"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: reduced ? 0.3 : 1.4, ease: EASE_EXPO }}
      />
    </header>
  )
}
