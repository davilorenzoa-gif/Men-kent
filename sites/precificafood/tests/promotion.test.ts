import { describe, expect, it } from 'vitest'
import { simulatePromotion, type PromoRate } from '@/lib/pricing/promotion'
import { toCents } from '@/lib/pricing/money'

const rates = (commissionBase: PromoRate['base'], paymentBase: PromoRate['base'] = 'customer'): PromoRate[] => [
  { key: 'commission', label: 'Comissão', rate: 12, base: commissionBase },
  { key: 'paymentFee', label: 'Pagamento', rate: 3.2, base: paymentBase },
  { key: 'taxes', label: 'Impostos', rate: 6, base: 'restaurant' },
]

const c = (v: { toFixed: (n: number) => string }) => toCents(v.toFixed(10)).toFixed(2)

describe('simulador de promoções', () => {
  it('restaurante banca 100% do desconto, comissão sobre o valor pago', () => {
    const r = simulatePromotion({ price: 40, discountPct: 20, restaurantSharePct: 100, variableCost: 14, fixedPerOrder: 2, rates: rates('customer') })
    expect(r.ok).toBe(true)
    expect(c(r.promo.customerPays)).toBe('32.00')
    expect(c(r.promo.discountValue)).toBe('8.00')
    expect(c(r.promo.restaurantRevenue)).toBe('32.00')
    // comissão 12% × 32 = 3,84; pagamento 3,2% × 32 = 1,024; impostos 6% × 32 = 1,92
    expect(c(r.promo.totalFees)).toBe('6.78')
    expect(c(r.promo.contribution)).toBe((32 - 6.784 - 16).toFixed(2))
    // normal: 40 − (4,8 + 1,28 + 2,4) − 16 = 15,52
    expect(c(r.normal.contribution)).toBe('15.52')
  })

  it('marketplace banca metade: receita do restaurante cai só a metade do desconto', () => {
    const r = simulatePromotion({ price: 40, discountPct: 20, restaurantSharePct: 50, variableCost: 14, fixedPerOrder: 2, rates: rates('restaurant') })
    expect(c(r.promo.customerPays)).toBe('32.00')
    expect(c(r.promo.restaurantFunded)).toBe('4.00')
    expect(c(r.promo.marketplaceFunded)).toBe('4.00')
    expect(c(r.promo.restaurantRevenue)).toBe('36.00')
    // comissão 12% × 36 = 4,32; pagamento 3,2% × 32 = 1,024; impostos 6% × 36 = 2,16
    expect(c(r.promo.totalFees)).toBe('7.50')
  })

  it('a base da comissão muda o resultado', () => {
    const base = { price: 40, discountPct: 25, restaurantSharePct: 100, variableCost: 14, fixedPerOrder: 0 }
    const sobreCheio = simulatePromotion({ ...base, rates: rates('list') })
    const sobrePago = simulatePromotion({ ...base, rates: rates('customer') })
    expect(sobreCheio.promo.contribution.lt(sobrePago.promo.contribution)).toBe(true)
    // diferença = 12% × (40 − 30) = 1,20
    expect(c(sobrePago.promo.contribution.minus(sobreCheio.promo.contribution))).toBe('1.20')
  })

  it('marketplace banca tudo: restaurante recebe o preço cheio', () => {
    const r = simulatePromotion({ price: 30, discountPct: 30, restaurantSharePct: 0, variableCost: 10, fixedPerOrder: 0, rates: rates('restaurant', 'restaurant') })
    expect(c(r.promo.restaurantRevenue)).toBe('30.00')
    expect(c(r.contributionDelta)).toBe('0.00')
  })

  it('calcula quantas vendas na promo igualam uma venda normal', () => {
    const r = simulatePromotion({ price: 40, discountPct: 20, restaurantSharePct: 100, variableCost: 14, fixedPerOrder: 2, rates: rates('customer') })
    expect(r.salesNeededToMatch).not.toBeNull()
    expect(r.salesNeededToMatch!.gt(1)).toBe(true)
  })

  it('valida desconto e participação', () => {
    const r = simulatePromotion({ price: 40, discountPct: 120, restaurantSharePct: -5, variableCost: 14, fixedPerOrder: 0, rates: rates('customer') })
    expect(r.ok).toBe(false)
    expect(r.issues).toHaveLength(2)
  })
})
