import { useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ExternalLink, X } from 'lucide-react'
import { IMAGES, type ImageAsset } from '../data/images.generated'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { useScrollLock } from '../hooks/useSmoothScroll'
import { EASE_EXPO } from '../lib/motion'

const base = import.meta.env.BASE_URL

/** Every photograph, who made it and under which licence. Required by the licences, and fair. */
export function Credits({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <AnimatePresence>{open && <Panel onClose={onClose} />}</AnimatePresence>
}

function Panel({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  useScrollLock(true)
  useFocusTrap(ref, true, onClose)
  const entries = Object.entries(IMAGES) as [string, ImageAsset][]

  return (
    <motion.div className="fixed inset-0 z-[85]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      <button type="button" aria-label="Close credits" tabIndex={-1} onClick={onClose} className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm" />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="credits-title"
        tabIndex={-1}
        data-lenis-prevent
        className="absolute inset-y-0 right-0 w-full max-w-[40rem] overflow-y-auto overscroll-contain border-l border-line bg-graphite px-6 pt-8 pb-12 outline-none sm:px-10"
        initial={reduced ? { opacity: 0 } : { x: '100%' }}
        animate={reduced ? { opacity: 1 } : { x: '0%' }}
        exit={reduced ? { opacity: 0 } : { x: '100%' }}
        transition={{ duration: reduced ? 0.2 : 0.8, ease: EASE_EXPO }}
      >
        <div className="flex items-start justify-between gap-6">
          <h2 id="credits-title" className="display text-[clamp(2.75rem,7vw,4.5rem)] text-paper">
            Photo credits
          </h2>
          <button
            type="button"
            data-autofocus
            onClick={onClose}
            aria-label="Close"
            className="group grid size-11 shrink-0 place-items-center rounded-full border border-paper/25 text-paper transition-colors duration-300 hover:border-apex hover:bg-apex"
          >
            <X aria-hidden strokeWidth={1.5} className="size-5 transition-transform duration-500 ease-expo group-hover:rotate-90" />
          </button>
        </div>
        <p className="mt-5 text-[0.9375rem] leading-relaxed text-silver">
          All photographs come from Wikimedia Commons and are used under the licences listed. Each one was cropped,
          colour graded or retouched for this site; where a licence is share-alike, the edited version is offered
          under the same licence.
        </p>

        <ul className="mt-8 border-t border-line">
          {entries.map(([id, asset]) => (
            <li key={id} className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-4 border-b border-line py-4">
              <img
                src={`${base}img/${id}-${asset.widths[0]}.webp`}
                alt=""
                width={asset.width}
                height={asset.height}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
                style={{ objectPosition: asset.focus }}
              />
              <div className="min-w-0">
                <p className="truncate text-[0.9375rem] text-paper">{asset.credit.title}</p>
                <p className="mt-1 text-[0.8125rem] text-silver">{asset.credit.author}</p>
                <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 data text-steel">
                  <a href={asset.credit.licenseUrl} target="_blank" rel="noopener noreferrer license" className="underline decoration-line underline-offset-4 hover:text-paper hover:decoration-apex">
                    {asset.credit.license}
                  </a>
                  <a href={asset.credit.source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 underline decoration-line underline-offset-4 hover:text-paper hover:decoration-apex">
                    Original
                    <ExternalLink aria-hidden className="size-3" />
                  </a>
                  <span>{asset.credit.changes}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}
