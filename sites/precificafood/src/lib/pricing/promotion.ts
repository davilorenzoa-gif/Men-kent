import { D, ZERO, dec, pct, type Dec, type Num } from './money'
import type { PricingIssue } from './engine'

/**
 * Sobre qual valor cada taxa incide numa venda com desconto.
 * - list: preço cheio do cardápio (antes do desconto)
 * - customer: valor efetivamente pago pelo cliente
 * - restaurant: receita do restaurante (preço cheio − parte do desconto que o restaurante banca)
 * Cada contrato/modalidade pode usar uma base diferente, por isso é configurável.
 */
export type FeeBase = 'list' | 'customer' | 'restaurant'

export const FEE_BASE_LABELS: Record<FeeBase, string> = {
  list: 'Preço cheio',
  customer: 'Valor pago pelo cliente',
  restaurant: 'Receita do restaurante',
}

export interface PromoRate {
  key: 'commission' | 'paymentFee' | 'deliveryCommission' | 'otherFees' | 'taxes'
  label: string
  /** percentual humano */
  rate: Num
  base: FeeBase
}

export interface PromotionInput {
  /** Preço original no cardápio */
  price: Num
  /** Desconto ao cliente, em % */
  discountPct: Num
  /** Parte do desconto bancada pelo restaurante, em % do desconto (0 a 100). O resto é do marketplace. */
  restaurantSharePct: Num
  /** Custo de produção unitário (C) */
  variableCost: Num
  /** Custos fixos rateados por pedido (F) */
  fixedPerOrder: Num
  rates: PromoRate[]
}

export interface PromotionScenario {
  listPrice: Dec
  customerPays: Dec
  discountValue: Dec
  restaurantFunded: Dec
  marketplaceFunded: Dec
  /** Receita bruta do restaurante = preço cheio − desconto bancado pelo restaurante */
  restaurantRevenue: Dec
  fees: Array<{ key: PromoRate['key']; label: string; base: FeeBase; baseValue: Dec; value: Dec }>
  totalFees: Dec
  /** Receita efetiva = receita bruta − taxas */
  netRevenue: Dec
  contribution: Dec
  /** Sobre a receita bruta do restaurante */
  contributionMargin: Dec
}

export interface PromotionResult {
  ok: boolean
  issues: PricingIssue[]
  normal: PromotionScenario
  promo: PromotionScenario
  contributionDelta: Dec
  /** Quantas vendas promocionais são necessárias para igualar a contribuição de 1 venda normal */
  salesNeededToMatch: Dec | null
}

function scenario(input: PromotionInput, discountPct: Num): PromotionScenario {
  const P = dec(input.price)
  const discount = P.times(pct(discountPct))
  const share = pct(input.restaurantSharePct)
  const restaurantFunded = discount.times(share)
  const marketplaceFunded = discount.minus(restaurantFunded)
  const customerPays = P.minus(discount)
  const restaurantRevenue = P.minus(restaurantFunded)
  const baseValueOf = (b: FeeBase): Dec => (b === 'list' ? P : b === 'customer' ? customerPays : restaurantRevenue)

  const fees = input.rates.map((r) => {
    const baseValue = baseValueOf(r.base)
    return { key: r.key, label: r.label, base: r.base, baseValue, value: baseValue.times(pct(r.rate)) }
  })
  const totalFees = fees.reduce((a, f) => a.plus(f.value), ZERO)
  const netRevenue = restaurantRevenue.minus(totalFees)
  const contribution = netRevenue.minus(dec(input.variableCost)).minus(dec(input.fixedPerOrder))
  return {
    listPrice: P,
    customerPays,
    discountValue: discount,
    restaurantFunded,
    marketplaceFunded,
    restaurantRevenue,
    fees,
    totalFees,
    netRevenue,
    contribution,
    contributionMargin: restaurantRevenue.isZero() ? ZERO : contribution.div(restaurantRevenue),
  }
}

export function validatePromotion(input: PromotionInput): PricingIssue[] {
  const issues: PricingIssue[] = []
  if (!dec(input.price).gt(0)) issues.push({ code: 'NEGATIVE_VALUE', field: 'price', message: 'Informe um preço original maior que zero.' })
  const d = dec(input.discountPct)
  if (d.isNegative() || d.gt(100)) issues.push({ code: 'RATE_OUT_OF_RANGE', field: 'discountPct', message: 'O desconto precisa ficar entre 0% e 100%.' })
  const s = dec(input.restaurantSharePct)
  if (s.isNegative() || s.gt(100)) issues.push({ code: 'RATE_OUT_OF_RANGE', field: 'restaurantSharePct', message: 'A parte do restaurante precisa ficar entre 0% e 100%.' })
  if (dec(input.variableCost).isNegative() || dec(input.fixedPerOrder).isNegative()) {
    issues.push({ code: 'NEGATIVE_VALUE', field: 'variableCost', message: 'Custos não podem ser negativos.' })
  }
  for (const r of input.rates) {
    const v = dec(r.rate)
    if (v.isNegative() || v.gte(100)) issues.push({ code: 'RATE_OUT_OF_RANGE', field: r.key, message: `${r.label} precisa ficar entre 0% e 99,99%.` })
  }
  return issues
}

export function simulatePromotion(input: PromotionInput): PromotionResult {
  const issues = validatePromotion(input)
  const normal = scenario(input, 0)
  const promo = scenario(input, input.discountPct)
  const delta = promo.contribution.minus(normal.contribution)
  let salesNeededToMatch: Dec | null = null
  if (promo.contribution.gt(0) && normal.contribution.gt(0)) {
    salesNeededToMatch = normal.contribution.div(promo.contribution)
  }
  return { ok: issues.length === 0, issues, normal, promo, contributionDelta: delta, salesNeededToMatch }
}

export { D }
