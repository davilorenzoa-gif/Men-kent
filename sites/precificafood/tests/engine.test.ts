import { describe, expect, it } from 'vitest'
import {
  analyzePrice,
  calculatePrice,
  classifyMargin,
  commercialPrice,
  costReductionToTarget,
  fixedCostPerOrder,
  validatePricingInput,
  type PercentRates,
  type PricingInput,
} from '@/lib/pricing/engine'
import { formatBRL, parseBR, toCents } from '@/lib/pricing/money'

const noRates: PercentRates = { commission: 0, paymentFee: 0, deliveryCommission: 0, otherFees: 0, taxes: 0, fundedDiscount: 0 }

function input(over: Partial<PricingInput> = {}): PricingInput {
  return {
    costs: { ingredients: [{ name: 'Ingredientes', quantity: 1, unitCost: 12 }], packaging: 2, labor: 0, other: 1, perOrderFee: 0 },
    rates: { ...noRates, commission: 20 },
    fixedPerOrder: 1,
    targetMargin: 25,
    ...over,
  }
}

describe('calculatePrice — exemplo do enunciado', () => {
  it('R$ 16,00 / (1 − 0,20 − 0,25) = R$ 29,09', () => {
    const r = calculatePrice(input())
    expect(r.ok).toBe(true)
    if (!r.ok) return
    expect(r.price.toFixed(2)).toBe('29.09')
    expect(r.analysis.totalCost.toFixed(2)).toBe('16.00')
    expect(toCents(r.analysis.totalFees).toFixed(2)).toBe('5.82')
    expect(toCents(r.analysis.contribution).toFixed(2)).toBe('7.27')
    // margem exata na análise do preço não arredondado
    expect(r.analysis.contributionMargin.toFixed(10)).toBe('0.2500000000')
    expect(toCents(r.breakEvenPrice).toFixed(2)).toBe('20.00')
  })

  it('soma ingredientes com quantidade × custo unitário', () => {
    const r = calculatePrice(
      input({
        costs: {
          ingredients: [
            { name: 'Pão', quantity: 1, unitCost: '1.80' },
            { name: 'Blend 150 g', quantity: '0.150', unitCost: '42.00' },
            { name: 'Queijo', quantity: 2, unitCost: '0.95' },
          ],
          packaging: '1.50',
          labor: '0.70',
          other: 0,
          perOrderFee: 0,
        },
        fixedPerOrder: 0,
      }),
    )
    expect(r.ok).toBe(true)
    if (!r.ok) return
    // 1,80 + 6,30 + 1,90 + 1,50 + 0,70 = 12,20
    expect(r.analysis.variableCost.toFixed(2)).toBe('12.20')
    expect(r.price.toFixed(2)).toBe((12.2 / 0.55).toFixed(2))
  })

  it('não sofre com erro de ponto flutuante (0,1 + 0,2)', () => {
    const r = calculatePrice(
      input({
        costs: { ingredients: [{ name: 'a', quantity: 1, unitCost: 0.1 }, { name: 'b', quantity: 1, unitCost: 0.2 }], packaging: 0, labor: 0, other: 0, perOrderFee: 0 },
        rates: noRates,
        fixedPerOrder: 0,
        targetMargin: 0,
      }),
    )
    expect(r.ok && r.exactPrice.toString()).toBe('0.3')
  })
})

describe('sensibilidade', () => {
  it('aumentar uma taxa aumenta o preço recomendado', () => {
    const a = calculatePrice(input())
    const b = calculatePrice(input({ rates: { ...noRates, commission: 20, paymentFee: 3.2 } }))
    expect(a.ok && b.ok).toBe(true)
    if (a.ok && b.ok) expect(b.price.gt(a.price)).toBe(true)
  })

  it('aumentar a margem desejada aumenta o preço', () => {
    const a = calculatePrice(input({ targetMargin: 20 }))
    const b = calculatePrice(input({ targetMargin: 30 }))
    if (!a.ok || !b.ok) throw new Error('esperava ok')
    expect(a.price.toFixed(2)).toBe('26.67') // 16 / 0,60
    expect(b.price.toFixed(2)).toBe('32.00') // 16 / 0,50
  })

  it('todas as taxas entram em t', () => {
    const r = calculatePrice(
      input({ rates: { commission: 12, paymentFee: 3.2, deliveryCommission: 0, otherFees: 0.8, taxes: 6, fundedDiscount: 3 }, targetMargin: 20 }),
    )
    if (!r.ok) throw new Error('esperava ok')
    expect(r.analysis.totalRate.toFixed(3)).toBe('0.250')
    expect(r.price.toFixed(2)).toBe('29.09') // 16 / 0,55
  })
})

describe('validações', () => {
  it('bloqueia taxas iguais ou acima de 100%', () => {
    const r = calculatePrice(input({ rates: { ...noRates, commission: 60, taxes: 40 } }))
    expect(r.ok).toBe(false)
    if (!r.ok) expect(r.issues.map((i) => i.code)).toContain('RATES_AT_OR_ABOVE_100')
  })

  it('bloqueia taxas + margem ≥ 100% (sem divisão por zero)', () => {
    const r = calculatePrice(input({ rates: { ...noRates, commission: 75 }, targetMargin: 25 }))
    expect(r.ok).toBe(false)
    if (!r.ok) expect(r.issues[0]?.code).toBe('RATES_PLUS_MARGIN_AT_OR_ABOVE_100')
  })

  it('bloqueia uma taxa isolada de 100%', () => {
    const issues = validatePricingInput(input({ rates: { ...noRates, commission: 100 } }))
    expect(issues.some((i) => i.code === 'RATE_OUT_OF_RANGE')).toBe(true)
  })

  it('bloqueia valores negativos', () => {
    const issues = validatePricingInput(
      input({ costs: { ingredients: [{ name: 'X', quantity: 1, unitCost: -2 }], packaging: -1, labor: 0, other: 0, perOrderFee: 0 } }),
    )
    expect(issues.filter((i) => i.code === 'NEGATIVE_VALUE')).toHaveLength(2)
  })

  it('exige algum custo', () => {
    const r = calculatePrice(input({ costs: { ingredients: [], packaging: 0, labor: 0, other: 0, perOrderFee: 0 }, fixedPerOrder: 0 }))
    expect(r.ok).toBe(false)
    if (!r.ok) expect(r.issues[0]?.code).toBe('NO_COSTS')
  })
})

describe('custos fixos', () => {
  it('rateia fixos + mensalidade pelo número de pedidos', () => {
    const r = fixedCostPerOrder({ monthlyFixedCosts: 4500, marketplaceMonthlyFee: 150, estimatedMonthlyOrders: 1500 })
    expect(r.ok && r.value.toFixed(2)).toBe('3.10')
  })
  it('não divide por zero pedidos', () => {
    const r = fixedCostPerOrder({ monthlyFixedCosts: 1000, marketplaceMonthlyFee: 0, estimatedMonthlyOrders: 0 })
    expect(r.ok).toBe(false)
  })
  it('sem custo fixo, zero pedidos não é erro', () => {
    const r = fixedCostPerOrder({ monthlyFixedCosts: 0, marketplaceMonthlyFee: 0, estimatedMonthlyOrders: 0 })
    expect(r.ok && r.value.isZero()).toBe(true)
  })
})

describe('preço comercial', () => {
  it('sobe para ,90', () => {
    expect(commercialPrice('29.0909', 'end_90').toFixed(2)).toBe('29.90')
    expect(commercialPrice('29.95', 'end_90').toFixed(2)).toBe('30.90')
    expect(commercialPrice('29.90', 'end_90').toFixed(2)).toBe('29.90')
  })
  it(',99, ,50, inteiro e nenhum', () => {
    expect(commercialPrice('29.0909', 'end_99').toFixed(2)).toBe('29.99')
    expect(commercialPrice('29.0909', 'end_50').toFixed(2)).toBe('29.50')
    expect(commercialPrice('29.51', 'end_50').toFixed(2)).toBe('30.00')
    expect(commercialPrice('29.0909', 'whole').toFixed(2)).toBe('30.00')
    expect(commercialPrice('29.0901', 'none').toFixed(2)).toBe('29.10')
  })
  it('nunca fica abaixo do preço matemático e recalcula a margem', () => {
    const r = calculatePrice(input())
    if (!r.ok) throw new Error('ok')
    const c = commercialPrice(r.exactPrice, 'end_90')
    const a = analyzePrice({ price: c, costs: input().costs, rates: input().rates, fixedPerOrder: 1 })
    expect(c.gte(r.exactPrice)).toBe(true)
    // 29,90 − 20% − 16 = 7,92 → 26,49%
    expect(toCents(a.contribution).toFixed(2)).toBe('7.92')
    expect(a.contributionMargin.times(100).toFixed(2)).toBe('26.49')
  })
})

describe('classificação e redução de custo', () => {
  it('classifica pela meta', () => {
    expect(classifyMargin(-0.01, 25)).toBe('loss')
    expect(classifyMargin(0.05, 25)).toBe('critical')
    expect(classifyMargin(0.125, 25)).toBe('attention')
    expect(classifyMargin(0.2, 25)).toBe('attention')
    expect(classifyMargin(0.25, 25)).toBe('healthy')
  })
  it('calcula quanto cortar de custo para bater a meta', () => {
    const a = analyzePrice({ price: 25, costs: input().costs, rates: input().rates, fixedPerOrder: 1 })
    // permitido = 25 × (1 − 0,2 − 0,25) = 13,75 → cortar 2,25
    expect(costReductionToTarget(a, 25).toFixed(2)).toBe('2.25')
  })
})

describe('formatação BR', () => {
  it('formata real', () => {
    expect(formatBRL(1234.5).replace(/\s/g, ' ')).toBe('R$ 1.234,50')
  })
  it('lê número digitado', () => {
    expect(parseBR('1.234,56')).toBe(1234.56)
    expect(parseBR('12,5')).toBe(12.5)
    expect(parseBR('12.5')).toBe(12.5)
    expect(parseBR('R$ 3,20')).toBe(3.2)
    expect(parseBR('')).toBeNull()
    expect(parseBR('abc')).toBeNull()
  })
})

describe('dízima no preço exato', () => {
  it('margem no preço exato conta como dentro da meta', () => {
    const r = calculatePrice(input({ rates: { ...noRates, commission: 12, paymentFee: 3.2, taxes: 6 }, fixedPerOrder: 3 }))
    if (!r.ok) throw new Error('ok')
    expect(r.price.toFixed(2)).toBe('33.46') // 18 / 0,538
    expect(classifyMargin(r.analysis.contributionMargin, 25)).toBe('healthy')
  })
})
