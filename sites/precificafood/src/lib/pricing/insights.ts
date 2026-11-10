import { RATE_LABELS, costReductionToTarget, ingredientLineCost, type PriceAnalysis, type PricingInput, type RateKey } from './engine'
import { ZERO, dec, formatBRL, formatPctFraction, formatPct, type Dec } from './money'

export interface CostDriver {
  label: string
  kind: 'ingredient' | 'packaging' | 'labor' | 'other' | 'fee' | 'fixed'
  value: Dec
  /** fração do preço analisado */
  share: Dec
}

/** Lista tudo que sai do preço, do maior para o menor. Só usa dados cadastrados. */
export function costDrivers(input: PricingInput, analysis: PriceAnalysis): CostDriver[] {
  const P = analysis.price
  const share = (v: Dec) => (P.isZero() ? ZERO : v.div(P))
  const list: CostDriver[] = []
  for (const ing of input.costs.ingredients) {
    const v = ingredientLineCost(ing)
    if (v.gt(0)) list.push({ label: ing.name || 'Ingrediente sem nome', kind: 'ingredient', value: v, share: share(v) })
  }
  const simple: Array<[CostDriver['kind'], string, Dec]> = [
    ['packaging', 'Embalagem', dec(input.costs.packaging)],
    ['labor', 'Mão de obra', dec(input.costs.labor)],
    ['other', 'Outros custos', dec(input.costs.other)],
    ['other', 'Taxa fixa por pedido', dec(input.costs.perOrderFee)],
    ['fixed', 'Custos fixos rateados', analysis.fixedPerOrder],
  ]
  for (const [kind, label, v] of simple) if (v.gt(0)) list.push({ label, kind, value: v, share: share(v) })
  for (const k of Object.keys(RATE_LABELS) as RateKey[]) {
    const v = analysis.fees[k]
    if (v.gt(0)) list.push({ label: RATE_LABELS[k], kind: 'fee', value: v, share: share(v) })
  }
  return list.sort((a, b) => b.value.comparedTo(a.value))
}

export interface Insight {
  tone: 'good' | 'warn' | 'bad' | 'info'
  title: string
  detail: string
}

/**
 * Explicação em linguagem simples, montada só a partir dos números cadastrados.
 * Não sugere nada que não dê para calcular.
 */
export function explain(params: {
  input: PricingInput
  analysis: PriceAnalysis
  targetMarginPct: Dec
  recommendedPrice: Dec | null
  foodCostAlertPct: Dec
  priceLabel: string
}): Insight[] {
  const { input, analysis, targetMarginPct, recommendedPrice, foodCostAlertPct, priceLabel } = params
  const out: Insight[] = []
  const target = targetMarginPct.div(100)
  const margin = analysis.contributionMargin.toDecimalPlaces(8)

  if (analysis.contribution.isNegative()) {
    out.push({
      tone: 'bad',
      title: `Cada venda tira ${formatBRL(analysis.contribution.abs())} do caixa`,
      detail: `No ${priceLabel} de ${formatBRL(analysis.price)}, taxas (${formatBRL(analysis.totalFees)}) e custos (${formatBRL(analysis.totalCost)}) passam do preço. O preço mínimo para não perder dinheiro é ${analysis.breakEvenPrice ? formatBRL(analysis.breakEvenPrice) : 'inalcançável com essas taxas'}.`,
    })
  } else if (margin.lt(target)) {
    out.push({
      tone: 'warn',
      title: `Margem de ${formatPctFraction(margin)}, abaixo da meta de ${formatPct(targetMarginPct, 0)}`,
      detail: `Sobram ${formatBRL(analysis.contribution)} por venda.${recommendedPrice ? ` Para chegar à meta, o preço precisa ser ${formatBRL(recommendedPrice)}.` : ''}`,
    })
  } else {
    out.push({
      tone: 'good',
      title: `Margem de ${formatPctFraction(margin)}, dentro da meta`,
      detail: `Sobram ${formatBRL(analysis.contribution)} por venda depois de taxas e custos.`,
    })
  }

  const drivers = costDrivers(input, analysis)
  const top = drivers.slice(0, 3)
  if (top.length > 0) {
    out.push({
      tone: 'info',
      title: 'O que mais pesa no preço',
      detail: top.map((d) => `${d.label}: ${formatBRL(d.value)} (${formatPctFraction(d.share)})`).join(' · '),
    })
  }

  if (analysis.totalRate.gt(0) && analysis.totalFees.gt(analysis.variableCost)) {
    out.push({
      tone: 'info',
      title: 'Taxas pesam mais que o custo de produção',
      detail: `Taxas e impostos somam ${formatPctFraction(analysis.totalRate)} do preço (${formatBRL(analysis.totalFees)}), mais do que os ${formatBRL(analysis.variableCost)} de custo variável.`,
    })
  }

  if (analysis.foodCostShare.gt(foodCostAlertPct.div(100))) {
    out.push({
      tone: 'warn',
      title: `Ingredientes custam ${formatPctFraction(analysis.foodCostShare)} do preço`,
      detail: `Acima do limite de ${formatPct(foodCostAlertPct, 0)} definido nas configurações.`,
    })
  }

  const reduction = costReductionToTarget(analysis, targetMarginPct)
  if (reduction.gt(0) && analysis.price.gt(0)) {
    out.push({
      tone: 'info',
      title: 'Sem mexer no preço',
      detail: `Seria preciso reduzir ${formatBRL(reduction)} nos custos (de ${formatBRL(analysis.totalCost)} para ${formatBRL(analysis.totalCost.minus(reduction))}) para bater a meta mantendo ${formatBRL(analysis.price)}.`,
    })
  }

  return out
}
