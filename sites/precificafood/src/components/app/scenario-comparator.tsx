'use client'

import * as React from 'react'
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { NumberField } from '@/components/ui/number-field'
import { Field } from './common'
import { analyzePrice } from '@/lib/pricing/engine'
import { simulatePromotion } from '@/lib/pricing/promotion'
import { promoRatesFrom, type FeeProfile, type ProductEvaluation } from '@/lib/domain'
import { dec, formatBRL, formatPctFraction, type Dec } from '@/lib/pricing/money'
import { cn } from '@/lib/utils'

interface Scenario {
  key: string
  title: string
  customerPays: Dec
  revenue: Dec
  fees: Dec
  contribution: Dec
  margin: Dec
}

/** Diferencial B: atual × recomendado × promocional, lado a lado. */
export function ScenarioComparator({
  currentPrice,
  recommendedPrice,
  evaluation,
  profile,
}: {
  currentPrice: number | null
  recommendedPrice: number
  evaluation: ProductEvaluation
  profile: FeeProfile | null
}) {
  const [discount, setDiscount] = React.useState<number | null>(15)
  const [share, setShare] = React.useState<number | null>(100)
  const { input } = evaluation

  const base = currentPrice && currentPrice > 0 ? currentPrice : recommendedPrice
  const scenarios: Scenario[] = []
  const fromAnalysis = (key: string, title: string, price: number): Scenario => {
    const a = analyzePrice({ price, costs: input.costs, rates: input.rates, fixedPerOrder: input.fixedPerOrder })
    return { key, title, customerPays: a.price, revenue: a.price, fees: a.totalFees, contribution: a.contribution, margin: a.contributionMargin }
  }
  if (currentPrice && currentPrice > 0) scenarios.push(fromAnalysis('cur', 'Preço atual', currentPrice))
  scenarios.push(fromAnalysis('rec', 'Preço recomendado', recommendedPrice))
  const promo = simulatePromotion({
    price: base,
    discountPct: discount ?? 0,
    restaurantSharePct: share ?? 0,
    variableCost: evaluation.recommended.ok ? evaluation.recommended.analysis.variableCost : 0,
    fixedPerOrder: input.fixedPerOrder,
    rates: promoRatesFrom(input.rates, profile),
  })
  scenarios.push({
    key: 'promo',
    title: `Promoção de ${discount ?? 0}%`,
    customerPays: promo.promo.customerPays,
    revenue: promo.promo.restaurantRevenue,
    fees: promo.promo.totalFees,
    contribution: promo.promo.contribution,
    margin: promo.promo.contributionMargin,
  })
  const max = scenarios.reduce((m, s) => (s.contribution.abs().gt(m) ? s.contribution.abs() : m), dec(0.01))

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Comparador de cenários</CardTitle>
          <CardDescription>
            Promoção calculada sobre o {currentPrice ? 'preço atual' : 'preço recomendado'} ({formatBRL(base)}). Na promoção, o desconto simulado substitui o desconto médio financiado.
          </CardDescription>
        </div>
      </CardHeader>
      <CardBody className="space-y-5">
        <div className="grid grid-cols-2 gap-3 sm:max-w-sm">
          <Field label="Desconto" htmlFor="sc-disc">
            <NumberField id="sc-disc" suffix="%" value={discount} onChange={setDiscount} max={100} decimals={0} />
          </Field>
          <Field label="Restaurante banca" htmlFor="sc-share">
            <NumberField id="sc-share" suffix="%" value={share} onChange={setShare} max={100} decimals={0} />
          </Field>
        </div>
        <div className={cn('grid gap-3', scenarios.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2')}>
          {scenarios.map((s) => {
            const negative = s.contribution.isNegative()
            const width = s.contribution.abs().div(max).times(100).toNumber()
            return (
              <div key={s.key} className="rounded-lg border border-line bg-bg-2/60 p-4">
                <p className="text-[13px] font-medium text-muted">{s.title}</p>
                <p className="tabular mt-1 text-xl font-semibold">{formatBRL(s.customerPays)}</p>
                <p className="text-xs text-subtle">cliente paga</p>
                <dl className="mt-3 space-y-1 text-[13px]">
                  <div className="flex justify-between">
                    <dt className="text-subtle">Receita</dt>
                    <dd className="tabular">{formatBRL(s.revenue)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-subtle">Taxas</dt>
                    <dd className="tabular">{formatBRL(s.fees)}</dd>
                  </div>
                  <div className="flex justify-between font-medium">
                    <dt className="text-fg">Sobra</dt>
                    <dd className={cn('tabular', negative ? 'text-[#ff7b7f]' : 'text-accent')}>{formatBRL(s.contribution)}</dd>
                  </div>
                </dl>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-bg">
                  <div className={cn('h-full rounded-full transition-[width] duration-300', negative ? 'bg-danger' : 'bg-accent')} style={{ width: `${width}%` }} />
                </div>
                <p className={cn('tabular mt-1.5 text-xs', negative ? 'text-[#ff7b7f]' : 'text-muted')}>{formatPctFraction(s.margin)} de margem</p>
              </div>
            )
          })}
        </div>
      </CardBody>
    </Card>
  )
}
