'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { BarChart3, Check } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Button } from '@/components/ui/button'
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { NumberField } from '@/components/ui/number-field'
import { Select } from '@/components/ui/select'
import { EmptyState, Field, PageHeader, StatusBadge } from './common'
import { AXIS, SEG } from './chart-colors'
import { applyCurrentPrice } from '@/app/actions/products'
import { evaluateAll } from '@/lib/evaluate-all'
import { portfolioSummary, referenceRows, type RefRow } from '@/lib/portfolio'
import type { FeeProfile, Product, ProductIngredient, Restaurant } from '@/lib/domain'
import { analyzePrice, classifyMargin, commercialPrice, type MarginStatus } from '@/lib/pricing/engine'
import { D, ZERO, dec, formatBRL, formatPctFraction } from '@/lib/pricing/money'
import { cn } from '@/lib/utils'

const short = (s: string, n = 16) => (s.length > n ? `${s.slice(0, n - 1)}…` : s)

export function AnalysisView({ restaurant, profiles, products, ingredients, canEdit }: { restaurant: Restaurant; profiles: FeeProfile[]; products: Product[]; ingredients: ProductIngredient[]; canEdit: boolean }) {
  const router = useRouter()
  const evals = React.useMemo(() => evaluateAll(restaurant, profiles, products, ingredients), [restaurant, profiles, products, ingredients])
  const rows = React.useMemo(() => referenceRows(evals), [evals])
  const summary = React.useMemo(() => portfolioSummary(rows), [rows])
  const [increase, setIncrease] = React.useState<number | null>(5)
  const [scope, setScope] = React.useState('all')
  const [roundSim, setRoundSim] = React.useState<'yes' | 'no'>('yes')
  const [applying, setApplying] = React.useState<string | null>(null)

  if (rows.length === 0) {
    return (
      <>
        <PageHeader title="Análise de lucratividade" />
        <EmptyState
          icon={BarChart3}
          title="Ainda não há o que analisar"
          action={
            <Button asChild>
              <Link href="/precificador">Precificar um produto</Link>
            </Button>
          }
        >
          A análise compara produtos entre si. Cadastre ao menos um produto com custos.
        </EmptyState>
      </>
    )
  }

  const byContribution = rows.slice().sort((a, b) => b.ref.contribution.comparedTo(a.ref.contribution))
  const top = byContribution.slice(0, 5)
  const bottom = byContribution.slice(-5).reverse()

  const structure = rows
    .slice()
    .sort((a, b) => b.ref.price.comparedTo(a.ref.price))
    .slice(0, 12)
    .map((r) => {
      const share = (v: InstanceType<typeof D>) => (r.ref.price.isZero() ? 0 : v.div(r.ref.price).toNumber())
      return {
        name: short(r.ev.product.name),
        Ingredientes: share(r.ref.ingredientsCost),
        'Embalagem e outros': share(r.ref.variableCost.minus(r.ref.ingredientsCost)),
        'Fixos rateados': share(r.ref.fixedPerOrder),
        'Taxas e impostos': share(r.ref.totalFees),
        Sobra: Math.max(0, share(r.ref.contribution)),
      }
    })

  const withCurrent = rows.filter((r) => !r.simulated)
  const categories = [...new Set(rows.map((r) => r.ev.product.category))].sort()

  // Simulação de aumento
  const inc = dec(increase ?? 0).div(100)
  const simRows = withCurrent.map((r) => {
    const inScope = scope === 'all' || r.ev.product.category === scope
    const raw = r.ref.price.times(inScope ? new D(1).plus(inc) : 1)
    const newPrice = inScope && roundSim === 'yes' ? commercialPrice(raw, restaurant.rounding_rule) : raw.toDecimalPlaces(2)
    const a = analyzePrice({ price: newPrice, costs: r.ev.input.costs, rates: r.ev.input.rates, fixedPerOrder: r.ev.input.fixedPerOrder })
    return {
      r,
      inScope,
      newPrice,
      before: r.ref,
      after: a,
      statusBefore: classifyMargin(r.ref.contributionMargin, r.ev.targetMargin),
      statusAfter: classifyMargin(a.contributionMargin, r.ev.targetMargin),
    }
  })
  const sumBy = (list: typeof simRows, f: (x: (typeof simRows)[number]) => InstanceType<typeof D>) => list.reduce((acc, x) => acc.plus(f(x)), ZERO)
  const revBefore = sumBy(simRows, (x) => x.before.price)
  const revAfter = sumBy(simRows, (x) => x.after.price)
  const contBefore = sumBy(simRows, (x) => x.before.contribution)
  const contAfter = sumBy(simRows, (x) => x.after.contribution)
  const countStatus = (k: 'statusBefore' | 'statusAfter', s: MarginStatus) => simRows.filter((x) => x[k] === s).length

  async function apply(r: RefRow, price: number) {
    setApplying(r.ev.product.id)
    const res = await applyCurrentPrice(r.ev.product.id, price)
    setApplying(null)
    if (!res.ok) return toast.error(res.error)
    toast.success('Preço atual atualizado', { description: `${r.ev.product.name}: ${formatBRL(price)}` })
    router.refresh()
  }

  return (
    <>
      <PageHeader
        title="Análise de lucratividade"
        description={`Comparação entre os ${rows.length} produtos com custo cadastrado. ${summary.simulatedCount > 0 ? `${summary.simulatedCount} sem preço atual entram com o preço comercial sugerido.` : 'Todos com preço atual.'}`}
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <Card className="p-5">
          <p className="text-[13px] text-muted">Margem média ponderada</p>
          <p className="tabular mt-2 text-2xl font-semibold">{formatPctFraction(summary.weightedMargin)}</p>
          <p className="mt-1 text-xs text-subtle">meta de {formatPctFraction(dec(restaurant.target_margin_pct).div(100), 0)}</p>
        </Card>
        <Card className="p-5">
          <p className="text-[13px] text-muted">Margem média simples</p>
          <p className="tabular mt-2 text-2xl font-semibold">{formatPctFraction(summary.simpleMargin)}</p>
          <p className="mt-1 text-xs text-subtle">cada produto com o mesmo peso</p>
        </Card>
        <Card className="p-5">
          <p className="text-[13px] text-muted">Sobra média por venda</p>
          <p className="tabular mt-2 text-2xl font-semibold">{formatBRL(summary.avgContribution)}</p>
          <p className="mt-1 text-xs text-subtle">margem de contribuição em R$</p>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <RankCard title="Mais rentáveis" description="Maior sobra em reais por venda." rows={top} />
        <RankCard title="Menos rentáveis" description="Menor sobra em reais por venda." rows={bottom} />
      </div>

      <Card className="mt-4">
        <CardHeader>
          <div>
            <CardTitle>Distribuição dos custos por produto</CardTitle>
            <CardDescription>Cada barra é 100% do preço de referência do produto.</CardDescription>
          </div>
        </CardHeader>
        <CardBody className="pl-1" style={{ height: Math.max(240, structure.length * 32 + 60) }}>
          <ResponsiveContainer>
            <BarChart data={structure} layout="vertical" margin={{ top: 0, right: 12, bottom: 0, left: 0 }} stackOffset="expand">
              <CartesianGrid horizontal={false} stroke={AXIS.grid} />
              <XAxis type="number" tick={{ fill: AXIS.tick, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${Math.round(v * 100)}%`} />
              <YAxis type="category" dataKey="name" tick={{ fill: AXIS.tick, fontSize: 11 }} axisLine={false} tickLine={false} width={118} />
              <Tooltip
                cursor={{ fill: 'rgb(255 255 255 / 0.03)' }}
                content={({ active, payload, label }) =>
                  active && payload?.length ? (
                    <div className="rounded-md border border-line-strong bg-surface-2 px-3 py-2 text-[13px] shadow-pop">
                      <p className="mb-1 font-medium">{label}</p>
                      {payload.map((p) => (
                        <p key={String(p.name)} className="flex items-center gap-2 text-muted">
                          <span className="size-2 rounded-[3px]" style={{ backgroundColor: p.color }} />
                          {p.name}: <span className="tabular text-fg">{formatPctFraction(Number(p.value))}</span>
                        </p>
                      ))}
                    </div>
                  ) : null
                }
              />
              <Bar dataKey="Ingredientes" stackId="a" fill={SEG.ingredients} animationDuration={700} />
              <Bar dataKey="Embalagem e outros" stackId="a" fill={SEG.packaging} animationDuration={700} />
              <Bar dataKey="Fixos rateados" stackId="a" fill={SEG.fixed} animationDuration={700} />
              <Bar dataKey="Taxas e impostos" stackId="a" fill={SEG.fees} animationDuration={700} />
              <Bar dataKey="Sobra" stackId="a" fill={SEG.margin} animationDuration={700} />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
        <div className="flex flex-wrap gap-x-4 gap-y-1 px-5 pb-5 text-xs text-muted">
          {[
            ['Ingredientes', SEG.ingredients],
            ['Embalagem e outros', SEG.packaging],
            ['Fixos rateados', SEG.fixed],
            ['Taxas e impostos', SEG.fees],
            ['Sobra', SEG.margin],
          ].map(([l, c]) => (
            <span key={l} className="flex items-center gap-1.5">
              <span className="size-2 rounded-[3px]" style={{ backgroundColor: c }} /> {l}
            </span>
          ))}
        </div>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <div>
            <CardTitle>Preço atual × recomendado</CardTitle>
            <CardDescription>Só produtos com preço atual informado. "Aplicar" grava o preço comercial como preço atual.</CardDescription>
          </div>
        </CardHeader>
        {withCurrent.length === 0 ? (
          <CardBody className="text-sm text-muted">Nenhum produto tem preço atual. Informe no Precificador para comparar.</CardBody>
        ) : (
          <div className="relative overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-y border-line text-left text-xs text-subtle">
                  <th className="px-5 py-2.5 font-medium">Produto</th>
                  <th className="px-3 py-2.5 text-right font-medium">Atual</th>
                  <th className="px-3 py-2.5 text-right font-medium">Recomendado</th>
                  <th className="px-3 py-2.5 text-right font-medium">Comercial</th>
                  <th className="px-3 py-2.5 text-right font-medium">Diferença</th>
                  <th className="px-3 py-2.5 font-medium">Situação</th>
                  <th className="px-5 py-2.5" />
                </tr>
              </thead>
              <tbody>
                {withCurrent.map((r) => {
                  const rec = r.ev.recommended.ok ? r.ev.recommended.price : null
                  const com = r.ev.commercial
                  const diff = com ? com.minus(r.ref.price) : null
                  const same = diff?.isZero()
                  return (
                    <tr key={r.ev.product.id} className="border-b border-line last:border-0">
                      <td className="max-w-[240px] truncate px-5 py-3 font-medium">
                        <Link href={`/precificador/${r.ev.product.id}`} className="hover:underline">
                          {r.ev.product.name}
                        </Link>
                      </td>
                      <td className="tabular px-3 py-3 text-right">{formatBRL(r.ref.price)}</td>
                      <td className="tabular px-3 py-3 text-right text-muted">{rec ? formatBRL(rec) : '—'}</td>
                      <td className="tabular px-3 py-3 text-right">{com ? formatBRL(com) : '—'}</td>
                      <td className={cn('tabular px-3 py-3 text-right', diff && diff.gt(0) && 'text-warn', diff && diff.lt(0) && 'text-muted')}>
                        {diff ? `${diff.gt(0) ? '+' : ''}${formatBRL(diff)}` : '—'}
                      </td>
                      <td className="px-3 py-3">
                        <StatusBadge status={r.ev.status} />
                      </td>
                      <td className="px-5 py-3 text-right">
                        {canEdit && com && !same ? (
                          <Button variant="secondary" size="sm" loading={applying === r.ev.product.id} onClick={() => apply(r, com.toNumber())}>
                            Aplicar {formatBRL(com)}
                          </Button>
                        ) : same ? (
                          <span className="inline-flex items-center gap-1 text-xs text-accent">
                            <Check className="size-3.5" /> no preço
                          </span>
                        ) : null}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <div>
            <CardTitle>Simulação de aumento de preços</CardTitle>
            <CardDescription>Aplica um reajuste nos preços atuais e mostra o efeito na margem. Nada é gravado.</CardDescription>
          </div>
        </CardHeader>
        <CardBody>
          {withCurrent.length === 0 ? (
            <p className="text-sm text-muted">Informe o preço atual dos produtos para simular reajustes.</p>
          ) : (
            <>
              <div className="grid gap-3 sm:grid-cols-3">
                <Field label="Reajuste" htmlFor="sim-inc">
                  <NumberField id="sim-inc" suffix="%" value={increase} onChange={setIncrease} min={-50} max={200} decimals={1} />
                </Field>
                <Field label="Aplicar em" htmlFor="sim-scope">
                  <Select id="sim-scope" value={scope} onValueChange={setScope} options={[{ value: 'all', label: 'Todo o cardápio' }, ...categories.map((c) => ({ value: c, label: c }))]} />
                </Field>
                <Field label="Arredondar preço" htmlFor="sim-round">
                  <Select
                    id="sim-round"
                    value={roundSim}
                    onValueChange={setRoundSim}
                    options={[
                      { value: 'yes', label: 'Sim, pela regra das configurações' },
                      { value: 'no', label: 'Não, valor exato' },
                    ]}
                  />
                </Field>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <Delta label="Receita (1 venda de cada)" before={formatBRL(revBefore)} after={formatBRL(revAfter)} />
                <Delta label="Sobra total (1 venda de cada)" before={formatBRL(contBefore)} after={formatBRL(contAfter)} />
                <Delta
                  label="Margem ponderada"
                  before={formatPctFraction(revBefore.isZero() ? 0 : contBefore.div(revBefore))}
                  after={formatPctFraction(revAfter.isZero() ? 0 : contAfter.div(revAfter))}
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                {(['healthy', 'attention', 'critical', 'loss'] as MarginStatus[]).map((s) => (
                  <span key={s} className="inline-flex items-center gap-2 rounded-md border border-line bg-bg-2/60 px-2.5 py-1.5">
                    <StatusBadge status={s} />
                    <span className="tabular text-muted">
                      {countStatus('statusBefore', s)} → <span className="text-fg">{countStatus('statusAfter', s)}</span>
                    </span>
                  </span>
                ))}
              </div>
              <ul className="mt-4 divide-y divide-line text-sm">
                {simRows
                  .filter((x) => x.inScope)
                  .slice(0, 20)
                  .map((x) => (
                    <li key={x.r.ev.product.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5">
                      <span className="min-w-0 truncate">{x.r.ev.product.name}</span>
                      <span className="tabular flex items-center gap-3 text-[13px] text-muted">
                        {formatBRL(x.before.price)} → <span className="text-fg">{formatBRL(x.newPrice)}</span>
                        <span>
                          {formatPctFraction(x.before.contributionMargin)} → <span className="text-fg">{formatPctFraction(x.after.contributionMargin)}</span>
                        </span>
                      </span>
                    </li>
                  ))}
              </ul>
            </>
          )}
        </CardBody>
      </Card>
    </>
  )
}

function Delta({ label, before, after }: { label: string; before: string; after: string }) {
  return (
    <div className="rounded-lg border border-line bg-bg-2/60 p-3.5">
      <p className="text-xs text-subtle">{label}</p>
      <p className="tabular mt-1 text-[13px] text-muted">
        {before} → <span className="text-base font-semibold text-fg">{after}</span>
      </p>
    </div>
  )
}

function RankCard({ title, description, rows }: { title: string; description: string; rows: RefRow[] }) {
  const max = rows.reduce((m, r) => (r.ref.contribution.abs().gt(m) ? r.ref.contribution.abs() : m), dec(0.01))
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardBody>
        <ol className="space-y-3">
          {rows.map((r, i) => {
            const neg = r.ref.contribution.isNegative()
            return (
              <li key={r.ev.product.id}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <Link href={`/precificador/${r.ev.product.id}`} className="min-w-0 truncate hover:underline">
                    <span className="tabular mr-2 text-subtle">{i + 1}</span>
                    {r.ev.product.name}
                    {r.simulated ? <span className="ml-1.5 text-xs text-subtle">(sugerido)</span> : null}
                  </Link>
                  <span className={cn('tabular shrink-0 font-medium', neg ? 'text-[#ff7b7f]' : 'text-fg')}>
                    {formatBRL(r.ref.contribution)} <span className="font-normal text-subtle">· {formatPctFraction(r.ref.contributionMargin)}</span>
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-bg-2">
                  <div className={cn('h-full rounded-full', neg ? 'bg-danger' : 'bg-accent')} style={{ width: `${r.ref.contribution.abs().div(max).times(100).toNumber()}%` }} />
                </div>
              </li>
            )
          })}
        </ol>
      </CardBody>
    </Card>
  )
}
