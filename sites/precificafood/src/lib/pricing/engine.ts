import { D, ZERO, dec, pct, toCents, ceilCents, type Dec, type Num } from './money'

/* ------------------------------------------------------------------ */
/* Tipos de entrada                                                    */
/* ------------------------------------------------------------------ */

export interface IngredientLine {
  name: string
  quantity: Num
  unitCost: Num
}

/** Custos variáveis unitários (R$ por unidade vendida). */
export interface VariableCosts {
  ingredients: IngredientLine[]
  packaging: Num
  labor: Num
  other: Num
  /** Taxa fixa em R$ cobrada pelo marketplace por pedido (ex.: taxa de serviço fixa). */
  perOrderFee: Num
}

/**
 * Taxas percentuais que incidem sobre o preço de venda, em percentual humano
 * (12 = 12%). Cada uma é somada em `t` na fórmula.
 */
export interface PercentRates {
  commission: Num
  paymentFee: Num
  deliveryCommission: Num
  otherFees: Num
  taxes: Num
  /** Desconto médio financiado pelo restaurante (cupons, campanhas) em % do preço. */
  fundedDiscount: Num
}

export type RateKey = keyof PercentRates

export const RATE_LABELS: Record<RateKey, string> = {
  commission: 'Comissão do marketplace',
  paymentFee: 'Taxa de pagamento',
  deliveryCommission: 'Comissão de entrega',
  otherFees: 'Taxas adicionais',
  taxes: 'Impostos',
  fundedDiscount: 'Descontos financiados',
}

export interface PricingInput {
  costs: VariableCosts
  rates: PercentRates
  /** F: custos fixos rateados por pedido, em R$. */
  fixedPerOrder: Num
  /** m: margem de contribuição desejada sobre a receita bruta, em % (25 = 25%). */
  targetMargin: Num
}

/* ------------------------------------------------------------------ */
/* Validação                                                           */
/* ------------------------------------------------------------------ */

export type PricingErrorCode =
  | 'NEGATIVE_VALUE'
  | 'RATE_OUT_OF_RANGE'
  | 'RATES_AT_OR_ABOVE_100'
  | 'RATES_PLUS_MARGIN_AT_OR_ABOVE_100'
  | 'NO_COSTS'
  | 'INVALID_ORDERS'

export interface PricingIssue {
  code: PricingErrorCode
  message: string
  field?: string
}

const VALUE_FIELDS: Array<[keyof Omit<VariableCosts, 'ingredients'>, string]> = [
  ['packaging', 'Embalagem'],
  ['labor', 'Mão de obra'],
  ['other', 'Outros custos'],
  ['perOrderFee', 'Taxa fixa por pedido'],
]

export function validatePricingInput(input: PricingInput): PricingIssue[] {
  const issues: PricingIssue[] = []

  input.costs.ingredients.forEach((ing, i) => {
    if (dec(ing.quantity).isNegative() || dec(ing.unitCost).isNegative()) {
      issues.push({
        code: 'NEGATIVE_VALUE',
        field: `ingredients.${i}`,
        message: `O ingrediente "${ing.name || `#${i + 1}`}" tem quantidade ou custo negativo.`,
      })
    }
  })
  for (const [key, label] of VALUE_FIELDS) {
    if (dec(input.costs[key]).isNegative()) {
      issues.push({ code: 'NEGATIVE_VALUE', field: key, message: `${label} não pode ser negativo.` })
    }
  }
  if (dec(input.fixedPerOrder).isNegative()) {
    issues.push({ code: 'NEGATIVE_VALUE', field: 'fixedPerOrder', message: 'Custos fixos rateados não podem ser negativos.' })
  }

  for (const key of Object.keys(RATE_LABELS) as RateKey[]) {
    const v = dec(input.rates[key])
    if (v.isNegative() || v.gte(100)) {
      issues.push({
        code: 'RATE_OUT_OF_RANGE',
        field: `rates.${key}`,
        message: `${RATE_LABELS[key]} precisa ficar entre 0% e 99,99%.`,
      })
    }
  }
  const m = dec(input.targetMargin)
  if (m.isNegative() || m.gte(100)) {
    issues.push({ code: 'RATE_OUT_OF_RANGE', field: 'targetMargin', message: 'A margem desejada precisa ficar entre 0% e 99,99%.' })
  }

  const t = totalRate(input.rates)
  if (t.gte(1)) {
    issues.push({
      code: 'RATES_AT_OR_ABOVE_100',
      message: 'A soma das taxas e impostos chega a 100% ou mais do preço. Nenhum preço cobre isso.',
    })
  } else if (t.plus(pct(input.targetMargin)).gte(1)) {
    issues.push({
      code: 'RATES_PLUS_MARGIN_AT_OR_ABOVE_100',
      message: 'Taxas + margem desejada somam 100% ou mais. Reduza a margem ou revise as taxas.',
    })
  }

  return issues
}

/* ------------------------------------------------------------------ */
/* Blocos da fórmula                                                   */
/* ------------------------------------------------------------------ */

export function ingredientLineCost(line: IngredientLine): Dec {
  return dec(line.quantity).times(dec(line.unitCost))
}

export function ingredientsCost(lines: IngredientLine[]): Dec {
  return lines.reduce((acc, l) => acc.plus(ingredientLineCost(l)), ZERO)
}

/** C: soma dos custos variáveis unitários. */
export function variableCost(c: VariableCosts): Dec {
  return ingredientsCost(c.ingredients)
    .plus(dec(c.packaging))
    .plus(dec(c.labor))
    .plus(dec(c.other))
    .plus(dec(c.perOrderFee))
}

/** t: soma das taxas percentuais (fração). */
export function totalRate(r: PercentRates): Dec {
  return (Object.keys(RATE_LABELS) as RateKey[]).reduce((acc, k) => acc.plus(pct(r[k])), ZERO)
}

/**
 * F: custos fixos mensais (inclui a mensalidade do marketplace) divididos pelos
 * pedidos estimados no mês. Mensalidade é custo fixo, nunca taxa percentual.
 */
export function fixedCostPerOrder(params: {
  monthlyFixedCosts: Num
  marketplaceMonthlyFee: Num
  estimatedMonthlyOrders: Num
}): { ok: true; value: Dec } | { ok: false; issue: PricingIssue } {
  const orders = dec(params.estimatedMonthlyOrders)
  const fixed = dec(params.monthlyFixedCosts).plus(dec(params.marketplaceMonthlyFee))
  if (dec(params.monthlyFixedCosts).isNegative() || dec(params.marketplaceMonthlyFee).isNegative()) {
    return { ok: false, issue: { code: 'NEGATIVE_VALUE', message: 'Custos fixos não podem ser negativos.' } }
  }
  if (fixed.isZero()) return { ok: true, value: ZERO }
  if (!orders.gt(0)) {
    return {
      ok: false,
      issue: { code: 'INVALID_ORDERS', message: 'Informe quantos pedidos você espera por mês para ratear os custos fixos.' },
    }
  }
  return { ok: true, value: fixed.div(orders) }
}

/* ------------------------------------------------------------------ */
/* Análise de um preço                                                 */
/* ------------------------------------------------------------------ */

export interface PriceAnalysis {
  price: Dec
  variableCost: Dec
  fixedPerOrder: Dec
  /** C + F */
  totalCost: Dec
  /** Valor de cada taxa em R$ */
  fees: Record<RateKey, Dec>
  totalFees: Dec
  totalRate: Dec
  /** Valor que sobra por venda: P − taxas − C − F */
  contribution: Dec
  /** Margem de contribuição sobre a receita bruta (fração) */
  contributionMargin: Dec
  /** (C + F) / P */
  costShare: Dec
  /** Ingredientes / P (CMV) */
  foodCostShare: Dec
  ingredientsCost: Dec
  /** Preço que zera a margem de contribuição: (C + F) / (1 − t) */
  breakEvenPrice: Dec | null
}

export function analyzePrice(params: {
  price: Num
  costs: VariableCosts
  rates: PercentRates
  fixedPerOrder: Num
}): PriceAnalysis {
  const P = dec(params.price)
  const C = variableCost(params.costs)
  const F = dec(params.fixedPerOrder)
  const t = totalRate(params.rates)
  const fees = {} as Record<RateKey, Dec>
  for (const k of Object.keys(RATE_LABELS) as RateKey[]) fees[k] = P.times(pct(params.rates[k]))
  const totalFees = P.times(t)
  const contribution = P.minus(totalFees).minus(C).minus(F)
  const ing = ingredientsCost(params.costs.ingredients)
  return {
    price: P,
    variableCost: C,
    fixedPerOrder: F,
    totalCost: C.plus(F),
    fees,
    totalFees,
    totalRate: t,
    contribution,
    contributionMargin: P.isZero() ? ZERO : contribution.div(P),
    costShare: P.isZero() ? ZERO : C.plus(F).div(P),
    foodCostShare: P.isZero() ? ZERO : ing.div(P),
    ingredientsCost: ing,
    breakEvenPrice: t.gte(1) ? null : C.plus(F).div(new D(1).minus(t)),
  }
}

/* ------------------------------------------------------------------ */
/* Preço recomendado                                                   */
/* ------------------------------------------------------------------ */

export type PricingResult =
  | {
      ok: true
      /** Preço exato da fórmula, sem arredondar. */
      exactPrice: Dec
      /** Preço exato arredondado a centavos para exibição. */
      price: Dec
      analysis: PriceAnalysis
      breakEvenPrice: Dec
      issues: PricingIssue[]
    }
  | { ok: false; issues: PricingIssue[] }

/**
 * PREÇO = (C + F) / (1 − t − m)
 * O resultado é analisado no preço exato (sem arredondar) para que a margem
 * apresentada seja exatamente a desejada; a apresentação arredonda depois.
 */
export function calculatePrice(input: PricingInput): PricingResult {
  const issues = validatePricingInput(input)
  if (issues.length > 0) return { ok: false, issues }

  const C = variableCost(input.costs)
  const F = dec(input.fixedPerOrder)
  const t = totalRate(input.rates)
  const m = pct(input.targetMargin)
  const denominator = new D(1).minus(t).minus(m)
  // Redundante com a validação, mas impede divisão por zero em qualquer caso.
  if (!denominator.gt(0)) {
    return { ok: false, issues: [{ code: 'RATES_PLUS_MARGIN_AT_OR_ABOVE_100', message: 'Taxas + margem somam 100% ou mais.' }] }
  }
  if (C.plus(F).isZero()) {
    return { ok: false, issues: [{ code: 'NO_COSTS', message: 'Informe ao menos um custo para calcular o preço.' }] }
  }
  const exactPrice = C.plus(F).div(denominator)
  const analysis = analyzePrice({ price: exactPrice, costs: input.costs, rates: input.rates, fixedPerOrder: F })
  return {
    ok: true,
    exactPrice,
    price: toCents(exactPrice),
    analysis,
    breakEvenPrice: C.plus(F).div(new D(1).minus(t)),
    issues: [],
  }
}

/* ------------------------------------------------------------------ */
/* Preço comercial                                                     */
/* ------------------------------------------------------------------ */

export type RoundingRule = 'none' | 'end_90' | 'end_99' | 'end_50' | 'whole'

export const ROUNDING_LABELS: Record<RoundingRule, string> = {
  none: 'Sem arredondamento (centavo acima)',
  end_90: 'Terminar em ,90',
  end_99: 'Terminar em ,99',
  end_50: 'Múltiplos de R$ 0,50',
  whole: 'Reais inteiros',
}

/**
 * Sugere um preço "de cardápio" sempre igual ou acima do preço matemático,
 * para que o arredondamento nunca coma a margem desejada.
 */
export function commercialPrice(exact: Num, rule: RoundingRule): Dec {
  const p = ceilCents(exact)
  if (p.lte(0)) return p
  switch (rule) {
    case 'none':
      return p
    case 'whole':
      return p.toDecimalPlaces(0, D.ROUND_CEIL)
    case 'end_50':
      return p.times(2).toDecimalPlaces(0, D.ROUND_CEIL).div(2)
    case 'end_90':
    case 'end_99': {
      const ending = new D(rule === 'end_90' ? '0.90' : '0.99')
      let candidate = p.floor().plus(ending)
      if (candidate.lt(p)) candidate = candidate.plus(1)
      return candidate
    }
  }
}

/* ------------------------------------------------------------------ */
/* Classificação                                                       */
/* ------------------------------------------------------------------ */

export type MarginStatus = 'healthy' | 'attention' | 'critical' | 'loss'

export const STATUS_LABELS: Record<MarginStatus, string> = {
  healthy: 'Saudável',
  attention: 'Atenção',
  critical: 'Crítica',
  loss: 'Prejuízo',
}

/**
 * Regra (documentada no README):
 * - Prejuízo: margem de contribuição < 0
 * - Crítica: entre 0 e metade da meta
 * - Atenção: entre metade da meta e a meta
 * - Saudável: igual ou acima da meta
 */
export function classifyMargin(contributionMargin: Num, targetMarginPct: Num): MarginStatus {
  // 8 casas: evita que dízimas (24,99999…%) virem "abaixo da meta" no preço exato.
  const m = dec(contributionMargin).toDecimalPlaces(8)
  const target = pct(targetMarginPct)
  if (m.isNegative()) return 'loss'
  if (m.gte(target)) return 'healthy'
  if (m.gte(target.div(2))) return 'attention'
  return 'critical'
}

/** Quanto o custo (C + F) precisaria cair para atingir a meta no preço atual. */
export function costReductionToTarget(analysis: PriceAnalysis, targetMarginPct: Num): Dec {
  const allowed = analysis.price.times(new D(1).minus(analysis.totalRate).minus(pct(targetMarginPct)))
  const gap = analysis.totalCost.minus(allowed)
  return gap.gt(0) ? gap : ZERO
}

export { toCents, ceilCents }
