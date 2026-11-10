import {
  analyzePrice,
  calculatePrice,
  classifyMargin,
  commercialPrice,
  fixedCostPerOrder,
  ingredientLineCost,
  type MarginStatus,
  type PercentRates,
  type PriceAnalysis,
  type PricingInput,
  type PricingIssue,
  type RoundingRule,
} from './pricing/engine'
import { ZERO, dec, type Dec } from './pricing/money'
import type { PromoRate } from './pricing/promotion'

/* Linhas do banco (numeric chega como number ou string, conforme o cliente). */
type N = number | string

export interface Restaurant {
  id: string
  name: string
  logo_url: string | null
  target_margin_pct: N
  default_tax_pct: N
  fixed_monthly_costs: N
  estimated_monthly_orders: number
  rounding_rule: RoundingRule
  currency: 'BRL'
  food_cost_alert_pct: N
  created_at: string
  updated_at: string
}

export type FeeChannel = 'ifood' | 'proprio' | 'outro'
export type FeeBase = 'list' | 'customer' | 'restaurant'

export interface FeeProfile {
  id: string
  restaurant_id: string
  name: string
  channel: FeeChannel
  plan_name: string | null
  commission_pct: N
  payment_fee_pct: N
  delivery_commission_pct: N
  apply_delivery_commission: boolean
  other_fees_pct: N
  per_order_fee: N
  monthly_fee: N
  campaign_discount_pct: N
  commission_base: FeeBase
  payment_fee_base: FeeBase
  is_default: boolean
  notes: string | null
  created_at: string
}

export interface Product {
  id: string
  restaurant_id: string
  fee_profile_id: string | null
  name: string
  category: string
  description: string | null
  packaging_cost: N
  labor_cost: N
  other_cost: N
  current_price: N | null
  tax_pct: N | null
  target_margin_pct: N | null
  funded_discount_pct: N | null
  fixed_cost_per_order: N | null
  created_at: string
  updated_at: string
}

export interface ProductIngredient {
  id: string
  product_id: string
  restaurant_id: string
  position: number
  name: string
  quantity: N
  unit: string
  unit_cost: N
}

export interface PriceSnapshot {
  id: string
  restaurant_id: string
  product_id: string
  recommended_price: N | null
  commercial_price: N | null
  current_price: N | null
  variable_cost: N
  contribution_margin: N | null
  created_at: string
}

export const CHANNEL_LABELS: Record<FeeChannel, string> = {
  ifood: 'iFood',
  proprio: 'Canal próprio',
  outro: 'Outro marketplace',
}

/* ------------------------------------------------------------------ */

export function resolveFeeProfile(product: Pick<Product, 'fee_profile_id'>, profiles: FeeProfile[]): FeeProfile | null {
  return (
    profiles.find((p) => p.id === product.fee_profile_id) ?? profiles.find((p) => p.is_default) ?? profiles[0] ?? null
  )
}

/** Custo fixo rateado padrão do restaurante para um canal (fixos + mensalidade ÷ pedidos). */
export function defaultFixedPerOrder(r: Restaurant, profile: FeeProfile | null): { value: Dec; issue?: PricingIssue } {
  const res = fixedCostPerOrder({
    monthlyFixedCosts: r.fixed_monthly_costs,
    marketplaceMonthlyFee: profile?.monthly_fee ?? 0,
    estimatedMonthlyOrders: r.estimated_monthly_orders,
  })
  return res.ok ? { value: res.value } : { value: ZERO, issue: res.issue }
}

export function ratesFor(product: Pick<Product, 'tax_pct' | 'funded_discount_pct'>, r: Restaurant, profile: FeeProfile | null): PercentRates {
  return {
    commission: profile?.commission_pct ?? 0,
    paymentFee: profile?.payment_fee_pct ?? 0,
    deliveryCommission: profile?.apply_delivery_commission ? profile.delivery_commission_pct : 0,
    otherFees: profile?.other_fees_pct ?? 0,
    taxes: product.tax_pct ?? r.default_tax_pct,
    fundedDiscount: product.funded_discount_pct ?? profile?.campaign_discount_pct ?? 0,
  }
}

export interface ProductEvaluation {
  product: Product
  ingredients: ProductIngredient[]
  profile: FeeProfile | null
  input: PricingInput
  targetMargin: Dec
  /** Preço recomendado (fórmula) */
  recommended: ReturnType<typeof calculatePrice>
  commercial: Dec | null
  commercialAnalysis: PriceAnalysis | null
  /** Situação no preço atual (se informado) */
  current: PriceAnalysis | null
  status: MarginStatus | null
  highFoodCost: boolean
  fixedIssue?: PricingIssue
}

export function evaluateProduct(
  product: Product,
  ingredients: ProductIngredient[],
  restaurant: Restaurant,
  profiles: FeeProfile[],
): ProductEvaluation {
  const profile = resolveFeeProfile(product, profiles)
  const fixedDefault = defaultFixedPerOrder(restaurant, profile)
  const fixedPerOrder = product.fixed_cost_per_order ?? fixedDefault.value
  const targetMargin = dec(product.target_margin_pct ?? restaurant.target_margin_pct)
  const input: PricingInput = {
    costs: {
      ingredients: ingredients
        .slice()
        .sort((a, b) => a.position - b.position)
        .map((i) => ({ name: i.name, quantity: i.quantity, unitCost: i.unit_cost })),
      packaging: product.packaging_cost,
      labor: product.labor_cost,
      other: product.other_cost,
      perOrderFee: profile?.per_order_fee ?? 0,
    },
    rates: ratesFor(product, restaurant, profile),
    fixedPerOrder,
    targetMargin,
  }
  const recommended = calculatePrice(input)
  const commercial = recommended.ok ? commercialPrice(recommended.exactPrice, restaurant.rounding_rule) : null
  const commercialAnalysis = commercial
    ? analyzePrice({ price: commercial, costs: input.costs, rates: input.rates, fixedPerOrder })
    : null
  const hasCurrent = product.current_price !== null && dec(product.current_price).gt(0)
  const current = hasCurrent
    ? analyzePrice({ price: product.current_price as N, costs: input.costs, rates: input.rates, fixedPerOrder })
    : null
  const status = current ? classifyMargin(current.contributionMargin, targetMargin) : null
  const reference = current ?? commercialAnalysis
  const highFoodCost = reference ? reference.foodCostShare.gt(dec(restaurant.food_cost_alert_pct).div(100)) : false
  return {
    product,
    ingredients,
    profile,
    input,
    targetMargin,
    recommended,
    commercial,
    commercialAnalysis,
    current,
    status,
    highFoodCost,
    fixedIssue: product.fixed_cost_per_order === null ? fixedDefault.issue : undefined,
  }
}

export function lineCost(i: Pick<ProductIngredient, 'quantity' | 'unit_cost'>): Dec {
  return ingredientLineCost({ name: '', quantity: i.quantity, unitCost: i.unit_cost })
}

export function groupIngredients(rows: ProductIngredient[]): Map<string, ProductIngredient[]> {
  const map = new Map<string, ProductIngredient[]>()
  for (const r of rows) {
    const list = map.get(r.product_id) ?? []
    list.push(r)
    map.set(r.product_id, list)
  }
  return map
}

/* ------------------------------------------------------------------ */
/* Promoções                                                           */
/* ------------------------------------------------------------------ */


/**
 * Converte as taxas de um produto em taxas de promoção, cada uma com a base
 * de incidência configurada no perfil. O desconto médio financiado sai daqui:
 * na simulação, o desconto da promoção toma o lugar dele.
 */
export function promoRatesFrom(rates: PercentRates, profile: FeeProfile | null): PromoRate[] {
  const cb: FeeBase = profile?.commission_base ?? 'customer'
  const pb: FeeBase = profile?.payment_fee_base ?? 'customer'
  return [
    { key: 'commission', label: 'Comissão do marketplace', rate: rates.commission, base: cb },
    { key: 'paymentFee', label: 'Taxa de pagamento', rate: rates.paymentFee, base: pb },
    { key: 'deliveryCommission', label: 'Comissão de entrega', rate: rates.deliveryCommission, base: cb },
    { key: 'otherFees', label: 'Taxas adicionais', rate: rates.otherFees, base: cb },
    { key: 'taxes', label: 'Impostos', rate: rates.taxes, base: 'restaurant' },
  ]
}
