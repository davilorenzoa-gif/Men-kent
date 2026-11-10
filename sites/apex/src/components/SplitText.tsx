import { motion, useReducedMotion } from 'motion/react'
import { EASE_EXPO } from '../lib/motion'

type SplitTextProps = {
  text: string
  /** Split into characters (headlines) or words (sentences). */
  by?: 'char' | 'word'
  className?: string
  delay?: number
  stagger?: number
  duration?: number
  /** Controlled mode: animate when this turns true. Omit to animate on scroll into view. */
  play?: boolean
}

/**
 * Masked rise: each unit sits in an overflow-hidden slot and slides up into
 * place. Screen readers get the plain sentence; the pieces are aria-hidden.
 * With reduced motion the units simply fade.
 */
export function SplitText({ text, by = 'word', className, delay = 0, stagger, duration = 1.1, play }: SplitTextProps) {
  const reduced = useReducedMotion()
  const words = text.split(' ')
  const step = stagger ?? (by === 'char' ? 0.028 : 0.06)

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: reduced ? 0 : step, delayChildren: delay } },
  }
  const unit = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } }
    : {
        hidden: { y: '112%' },
        visible: { y: '0%', transition: { duration, ease: EASE_EXPO } },
      }

  const controlled = play !== undefined
  return (
    <motion.span
      className={className}
      aria-label={text}
      role="text"
      variants={container}
      initial="hidden"
      {...(controlled
        ? { animate: play ? 'visible' : 'hidden' }
        : { whileInView: 'visible', viewport: { once: true, amount: 0.6 } })}
    >
      {words.map((word, wi) => (
        <span key={wi} aria-hidden className="inline-flex overflow-hidden pt-[0.06em] pb-[0.04em] -mb-[0.04em] align-bottom">
          {by === 'char' ? (
            Array.from(word).map((char, ci) => (
              <motion.span key={ci} variants={unit} className="inline-block will-change-transform">
                {char}
              </motion.span>
            ))
          ) : (
            <motion.span variants={unit} className="inline-block will-change-transform">
              {word}
            </motion.span>
          )}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  )
}
