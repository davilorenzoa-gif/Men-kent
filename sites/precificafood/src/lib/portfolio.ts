import type { ProductEvaluation } from './domain'
import type { PriceAnalysis } from './pricing/engine'
import { ZERO, dec, type Dec } from './pricing/money'

export interface RefRow {
  ev: ProductEvaluation
  /** análise no preço de referência: atual se houver, senão o comercial sugerido */
  ref: PriceAnalysis
  simulated: boolean
}

export function referenceRows(evals: ProductEvaluation[]): RefRow[] {
  const out: RefRow[] = []
  for (const ev of evals) {
    if (ev.current) out.push({ ev, ref: ev.current, simulated: false })
    else if (ev.commercialAnalysis) out.push({ ev, ref: ev.commercialAnalysis, simulated: true })
  }
  return out
}

export function portfolioSummary(rows: RefRow[]) {
  const n = rows.length
  const sum = (f: (r: RefRow) => Dec) => rows.reduce((a, r) => a.plus(f(r)), ZERO)
  const revenue = sum((r) => r.ref.price)
  const contribution = sum((r) => r.ref.contribution)
  return {
    count: n,
    simulatedCount: rows.filter((r) => r.simulated).length,
    avgPrice: n ? revenue.div(n) : ZERO,
    avgContribution: n ? contribution.div(n) : ZERO,
    /** margem média ponderada pelo preço (1 venda de cada produto) */
    weightedMargin: revenue.isZero() ? ZERO : contribution.div(revenue),
    simpleMargin: n ? sum((r) => r.ref.contributionMargin).div(n) : ZERO,
    totals: {
      ingredients: sum((r) => r.ref.ingredientsCost),
      otherVariable: sum((r) => r.ref.variableCost.minus(r.ref.ingredientsCost)),
      fixed: sum((r) => r.ref.fixedPerOrder),
      fees: sum((r) => r.ref.totalFees),
      contribution: sum((r) => (r.ref.contribution.gt(0) ? r.ref.contribution : ZERO)),
      revenue,
    },
  }
}

export function belowTarget(r: RefRow) {
  return r.ref.contributionMargin.toDecimalPlaces(8).lt(dec(r.ev.targetMargin).div(100))
}
