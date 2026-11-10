'use client'

import { motion } from 'motion/react'
import type { PriceAnalysis } from '@/lib/pricing/engine'
import { ZERO, formatBRL, formatPctFraction, type Dec } from '@/lib/pricing/money'
import { SEG } from './chart-colors'

/** Barra empilhada: para onde vai cada real do preço. */
export function PriceComposition({ analysis }: { analysis: PriceAnalysis }) {
  const P = analysis.price
  const nonIng = analysis.variableCost.minus(analysis.ingredientsCost)
  const contribution = analysis.contribution.gt(0) ? analysis.contribution : ZERO
  const parts: Array<{ key: string; label: string; value: Dec; color: string }> = [
    { key: 'ing', label: 'Ingredientes', value: analysis.ingredientsCost, color: SEG.ingredients },
    { key: 'var', label: 'Embalagem e outros', value: nonIng, color: SEG.packaging },
    { key: 'fix', label: 'Fixos rateados', value: analysis.fixedPerOrder, color: SEG.fixed },
    { key: 'fee', label: 'Taxas e impostos', value: analysis.totalFees, color: SEG.fees },
    { key: 'mar', label: 'Sobra (margem)', value: contribution, color: SEG.margin },
  ].filter((p) => p.value.gt(0))
  const total = parts.reduce((a, p) => a.plus(p.value), ZERO)
  const share = (v: Dec) => (total.isZero() ? 0 : v.div(total).times(100).toNumber())

  return (
    <div>
      <div className="flex h-3 w-full gap-0.5 overflow-hidden rounded-full bg-bg-2" role="img" aria-label="Composição do preço">
        {parts.map((p) => (
          <motion.div
            key={p.key}
            className="h-full first:rounded-l-full last:rounded-r-full"
            style={{ backgroundColor: p.color }}
            initial={false}
            animate={{ width: `${share(p.value)}%` }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>
      <ul className="mt-3 grid grid-cols-1 gap-y-1.5 text-[13px]">
        {parts.map((p) => (
          <li key={p.key} className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-muted">
              <span className="size-2 rounded-[3px]" style={{ backgroundColor: p.color }} aria-hidden />
              {p.label}
            </span>
            <span className="tabular text-fg">
              {formatBRL(p.value)} <span className="text-subtle">· {P.isZero() ? '—' : formatPctFraction(p.value.div(P))}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
