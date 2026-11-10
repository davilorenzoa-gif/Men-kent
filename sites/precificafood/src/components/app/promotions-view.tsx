'use client'

import * as React from 'react'
import { AlertTriangle, ArrowRight } from 'lucide-react'
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { NumberField } from '@/components/ui/number-field'
import { Select } from '@/components/ui/select'
import { Hint } from '@/components/ui/tooltip'
import { Field, PageHeader, Row } from './common'
import { evaluateAll } from '@/lib/evaluate-all'
import { promoRatesFrom, resolveFeeProfile, ratesFor, defaultFixedPerOrder, type FeeProfile, type Product, type ProductIngredient, type Restaurant, type FeeBase } from '@/lib/domain'
import { FEE_BASE_LABELS, simulatePromotion, type PromoRate } from '@/lib/pricing/promotion'
import { formatBRL, formatNumber, formatPctFraction } from '@/lib/pricing/money'
import { cn } from '@/lib/utils'

const BASE_OPTIONS = (Object.keys(FEE_BASE_LABELS) as FeeBase[]).map((b) => ({ value: b, label: FEE_BASE_LABELS[b] }))

type Financing = 'restaurant' | 'split' | 'marketplace' | 'custom'

export function PromotionsView({ restaurant, profiles, products, ingredients }: { restaurant: Restaurant; profiles: FeeProfile[]; products: Product[]; ingredients: ProductIngredient[] }) {
  const evals = React.useMemo(() => evaluateAll(restaurant, profiles, products, ingredients), [restaurant, profiles, products, ingredients])
  const defaultProfile = resolveFeeProfile({ fee_profile_id: null }, profiles)
  const manualRates = () => promoRatesFrom(ratesFor({ tax_pct: null, funded_discount_pct: null }, restaurant, defaultProfile), defaultProfile)

  const [productId, setProductId] = React.useState<string>('manual')
  const [price, setPrice] = React.useState<number | null>(null)
  const [cost, setCost] = React.useState<number | null>(null)
  const [fixed, setFixed] = React.useState<number | null>(() => Number(defaultFixedPerOrder(restaurant, defaultProfile).value.toFixed(2)))
  const [discount, setDiscount] = React.useState<number | null>(20)
  const [financing, setFinancing] = React.useState<Financing>('restaurant')
  const [share, setShare] = React.useState<number | null>(100)
  const [rates, setRates] = React.useState<PromoRate[]>(manualRates)

  function pickProduct(id: string) {
    setProductId(id)
    if (id === 'manual') {
      setRates(manualRates())
      return
    }
    const ev = evals.find((e) => e.product.id === id)
    if (!ev) return
    const p = ev.current?.price ?? ev.commercial
    setPrice(p ? Number(p.toFixed(2)) : null)
    setCost(ev.recommended.ok ? Number(ev.recommended.analysis.variableCost.toFixed(2)) : null)
    setFixed(Number(ev.input.fixedPerOrder.toString()))
    setRates(promoRatesFrom(ev.input.rates, ev.profile))
  }

  function pickFinancing(f: Financing) {
    setFinancing(f)
    if (f === 'restaurant') setShare(100)
    if (f === 'split') setShare(50)
    if (f === 'marketplace') setShare(0)
  }

  const result = simulatePromotion({ price: price ?? 0, discountPct: discount ?? 0, restaurantSharePct: share ?? 0, variableCost: cost ?? 0, fixedPerOrder: fixed ?? 0, rates })
  const ready = (price ?? 0) > 0
  const { normal, promo } = result

  return (
    <>
      <PageHeader title="Simulador de promoções" description="Veja quanto sobra de cada venda com desconto, considerando quem banca o desconto e sobre qual valor cada taxa é cobrada." />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="min-w-0 space-y-5">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Produto e preço</CardTitle>
                <CardDescription>Escolha um produto para puxar preço, custos e taxas, ou digite à mão.</CardDescription>
              </div>
            </CardHeader>
            <CardBody className="grid gap-4 sm:grid-cols-2">
              <Field label="Produto" htmlFor="pr-product" className="sm:col-span-2">
                <Select id="pr-product" value={productId} onValueChange={pickProduct} options={[{ value: 'manual', label: 'Valores manuais' }, ...products.map((p) => ({ value: p.id, label: p.name }))]} />
              </Field>
              <Field label="Preço original" htmlFor="pr-price">
                <NumberField id="pr-price" prefix="R$" value={price} onChange={setPrice} allowEmpty placeholder="0,00" />
              </Field>
              <Field label="Desconto ao cliente" htmlFor="pr-disc">
                <NumberField id="pr-disc" suffix="%" value={discount} onChange={setDiscount} max={100} decimals={0} />
              </Field>
              <Field label="Custo de produção" htmlFor="pr-cost" hint={<Hint>Custos variáveis por unidade: ingredientes, embalagem, mão de obra variável e outros.</Hint>}>
                <NumberField id="pr-cost" prefix="R$" value={cost} onChange={setCost} allowEmpty placeholder="0,00" />
              </Field>
              <Field label="Custos fixos rateados" htmlFor="pr-fixed">
                <NumberField id="pr-fixed" prefix="R$" value={fixed} onChange={setFixed} allowEmpty placeholder="0,00" />
              </Field>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <div>
                <CardTitle>Quem financia o desconto</CardTitle>
                <CardDescription>Em campanhas, o marketplace pode bancar parte do desconto.</CardDescription>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              <div role="radiogroup" aria-label="Quem financia" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {(
                  [
                    ['restaurant', 'Restaurante', '100% seu'],
                    ['split', 'Dividido', '50% / 50%'],
                    ['marketplace', 'Marketplace', '100% dele'],
                    ['custom', 'Outro', 'definir %'],
                  ] as const
                ).map(([key, label, sub]) => (
                  <button
                    key={key}
                    type="button"
                    role="radio"
                    aria-checked={financing === key}
                    onClick={() => pickFinancing(key)}
                    className={cn(
                      'rounded-lg border px-3 py-2.5 text-left transition-colors',
                      financing === key ? 'border-accent bg-accent/[0.08]' : 'border-line-strong bg-bg-2 hover:border-[#3d4860]',
                    )}
                  >
                    <span className="block text-sm font-medium">{label}</span>
                    <span className="block text-xs text-subtle">{sub}</span>
                  </button>
                ))}
              </div>
              {financing === 'custom' ? (
                <Field label="Parte bancada pelo restaurante" htmlFor="pr-share" className="sm:max-w-xs">
                  <NumberField id="pr-share" suffix="%" value={share} onChange={setShare} max={100} decimals={0} />
                </Field>
              ) : null}
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <div>
                <CardTitle>Taxas e base de cálculo</CardTitle>
                <CardDescription>A base muda conforme o contrato: confira no seu extrato sobre qual valor cada taxa é cobrada.</CardDescription>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                {rates.map((r, idx) => (
                  <div key={r.key} className="grid grid-cols-[minmax(0,1fr)_96px] items-center gap-2 sm:grid-cols-[minmax(0,1fr)_110px_220px]">
                    <span className="text-sm text-fg">{r.label}</span>
                    <NumberField
                      aria-label={`${r.label} (%)`}
                      suffix="%"
                      value={Number(r.rate)}
                      onChange={(v) => setRates((list) => list.map((x, i) => (i === idx ? { ...x, rate: v ?? 0 } : x)))}
                      max={99.99}
                    />
                    <Select
                      aria-label={`Base de ${r.label}`}
                      className="col-span-2 sm:col-span-1"
                      value={r.base}
                      onValueChange={(b) => setRates((list) => list.map((x, i) => (i === idx ? { ...x, base: b } : x)))}
                      options={BASE_OPTIONS}
                    />
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="min-w-0">
          <Card className="lg:sticky lg:top-8">
            {!ready ? (
              <CardBody className="py-12 text-center text-sm text-muted">Informe o preço original para simular.</CardBody>
            ) : (
              <>
                <div className="border-b border-line p-5 sm:p-6">
                  <p className="text-xs font-medium uppercase tracking-[0.08em] text-muted">Sobra por venda na promoção</p>
                  <p className={cn('tabular mt-2 text-[40px] font-semibold leading-none tracking-[-0.03em]', promo.contribution.isNegative() ? 'text-[#ff7b7f]' : 'text-fg')}>{formatBRL(promo.contribution)}</p>
                  <p className="tabular mt-2 flex flex-wrap items-center gap-1.5 text-[13px] text-muted">
                    {formatBRL(normal.contribution)} <ArrowRight className="size-3.5" aria-hidden /> {formatBRL(promo.contribution)}
                    <span className={cn('font-medium', result.contributionDelta.isNegative() ? 'text-[#ff7b7f]' : 'text-accent')}>
                      ({result.contributionDelta.isNegative() ? '' : '+'}
                      {formatBRL(result.contributionDelta)})
                    </span>
                  </p>
                </div>
                <CardBody className="sm:px-6">
                  {result.issues.length > 0 ? (
                    <div className="mb-3 space-y-1" role="alert">
                      {result.issues.map((i) => (
                        <p key={i.message} className="flex items-start gap-2 text-sm text-[#ff9a9d]">
                          <AlertTriangle className="mt-0.5 size-4 shrink-0" /> {i.message}
                        </p>
                      ))}
                    </div>
                  ) : null}
                  <dl className="divide-y divide-line">
                    <Row label="Preço promocional (cliente paga)" value={formatBRL(promo.customerPays)} strong />
                    <Row label="Valor do desconto" value={formatBRL(promo.discountValue)} />
                    <Row label="Bancado pelo restaurante" value={formatBRL(promo.restaurantFunded)} />
                    <Row label="Bancado pelo marketplace" value={formatBRL(promo.marketplaceFunded)} />
                    <Row label="Receita bruta do restaurante" value={formatBRL(promo.restaurantRevenue)} />
                    {promo.fees
                      .filter((f) => f.value.gt(0))
                      .map((f) => (
                        <Row key={f.key} label={<span className="pl-3 text-subtle">{f.label} · sobre {FEE_BASE_LABELS[f.base].toLowerCase()}</span>} value={`− ${formatBRL(f.value)}`} />
                      ))}
                    <Row label="Receita efetiva (após taxas)" value={formatBRL(promo.netRevenue)} strong />
                    <Row label="Margem de contribuição na promoção" value={formatPctFraction(promo.contributionMargin, 2)} tone={promo.contribution.isNegative() ? 'bad' : undefined} />
                  </dl>

                  <div className="mt-5 grid grid-cols-2 gap-2 text-[13px]">
                    {[
                      { t: 'Preço normal', s: normal },
                      { t: 'Com promoção', s: promo },
                    ].map(({ t, s }) => (
                      <div key={t} className="rounded-lg border border-line bg-bg-2/60 p-3">
                        <p className="text-subtle">{t}</p>
                        <p className="tabular mt-1 font-medium">{formatBRL(s.contribution)} por venda</p>
                        <p className="tabular text-muted">{formatPctFraction(s.contributionMargin)} de margem</p>
                      </div>
                    ))}
                  </div>
                  {result.salesNeededToMatch && result.salesNeededToMatch.gt(1) ? (
                    <p className="mt-4 text-[13px] leading-relaxed text-muted">
                      Cada venda normal rende o mesmo que <span className="tabular font-medium text-fg">{formatNumber(result.salesNeededToMatch, 2)}</span> vendas na promoção. Para a promoção valer a pena, ela precisa aumentar as vendas em pelo menos{' '}
                      <span className="tabular font-medium text-fg">{formatPctFraction(result.salesNeededToMatch.minus(1), 0)}</span>.
                    </p>
                  ) : null}
                  {promo.contribution.isNegative() ? <p className="mt-4 text-[13px] text-[#ff9a9d]">Nesta configuração cada pedido promocional dá prejuízo. Reduza o desconto ou negocie participação do marketplace.</p> : null}
                </CardBody>
              </>
            )}
          </Card>
        </div>
      </div>
    </>
  )
}
