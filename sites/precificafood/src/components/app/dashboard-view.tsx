'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { AlertTriangle, ArrowRight, Calculator, Settings2, TrendingDown, UtensilsCrossed } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Button } from '@/components/ui/button'
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { Hint } from '@/components/ui/tooltip'
import { AnimatedNumber, EmptyState, PageHeader, STATUS_COLOR, StatusBadge } from './common'
import { AXIS, SEG } from './chart-colors'
import { evaluateAll } from '@/lib/evaluate-all'
import { belowTarget, portfolioSummary, referenceRows } from '@/lib/portfolio'
import type { FeeProfile, PriceSnapshot, Product, ProductIngredient, Restaurant } from '@/lib/domain'
import { classifyMargin } from '@/lib/pricing/engine'
import { dec, formatBRL, formatNumber, formatPct, formatPctFraction } from '@/lib/pricing/money'
import { cn } from '@/lib/utils'

const fmtBRL = (v: number) => formatBRL(v)
const fmtPct = (v: number) => formatPctFraction(v)
const fmtInt = (v: number) => formatNumber(v, 0)
const short = (s: string, n = 14) => (s.length > n ? `${s.slice(0, n - 1)}…` : s)

function ChartTooltip({ active, payload, label, money = true }: { active?: boolean; payload?: Array<{ name: string; value: number; color?: string; payload?: { fill?: string } }>; label?: string; money?: boolean }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-md border border-line-strong bg-surface-2 px-3 py-2 text-[13px] shadow-pop">
      {label ? <p className="mb-1 font-medium text-fg">{label}</p> : null}
      {payload.map((p) => (
        <p key={p.name} className="flex items-center gap-2 text-muted">
          <span className="size-2 rounded-[3px]" style={{ backgroundColor: p.color ?? p.payload?.fill }} />
          {p.name}: <span className="tabular text-fg">{money ? formatBRL(p.value) : formatPctFraction(p.value)}</span>
        </p>
      ))}
    </div>
  )
}

export function DashboardView({
  restaurant,
  profiles,
  products,
  ingredients,
  snapshots,
  welcome,
}: {
  restaurant: Restaurant
  profiles: FeeProfile[]
  products: Product[]
  ingredients: ProductIngredient[]
  snapshots: PriceSnapshot[]
  welcome: boolean
}) {
  const evals = React.useMemo(() => evaluateAll(restaurant, profiles, products, ingredients), [restaurant, profiles, products, ingredients])
  const rows = React.useMemo(() => referenceRows(evals), [evals])
  const s = React.useMemo(() => portfolioSummary(rows), [rows])
  const target = dec(restaurant.target_margin_pct)
  const below = rows.filter(belowTarget)
  const profile = profiles.find((p) => p.is_default) ?? profiles[0]
  const feesMissing = !profile || (dec(profile.commission_pct).isZero() && dec(profile.payment_fee_pct).isZero())
  const fixedMissing = dec(restaurant.fixed_monthly_costs).gt(0) && restaurant.estimated_monthly_orders === 0

  const [trendProduct, setTrendProduct] = React.useState<string>('')
  const productsWithHistory = React.useMemo(() => {
    const ids = new Set(snapshots.map((x) => x.product_id))
    return products.filter((p) => ids.has(p.id))
  }, [snapshots, products])
  const selectedTrend = trendProduct || productsWithHistory[0]?.id || ''
  const trend = snapshots
    .filter((x) => x.product_id === selectedTrend)
    .map((x) => ({
      date: new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' }).format(new Date(x.created_at)),
      Recomendado: x.recommended_price === null ? null : Number(x.recommended_price),
      Comercial: x.commercial_price === null ? null : Number(x.commercial_price),
      Atual: x.current_price === null ? null : Number(x.current_price),
    }))

  if (products.length === 0) {
    return (
      <>
        <PageHeader title={welcome ? `Bem-vindo, ${restaurant.name}` : 'Visão geral'} description="Sua visão do cardápio aparece aqui assim que o primeiro produto for salvo." />
        <div className="grid gap-4 lg:grid-cols-2">
          <SetupStep done={!feesMissing} icon={Settings2} title="1. Informe as taxas do seu contrato" href="/configuracoes#taxas" cta="Configurar taxas">
            Comissão, taxa de pagamento e mensalidade variam por plano e região. O PrecificaFood não presume nenhuma: use as do seu contrato com o iFood.
          </SetupStep>
          <SetupStep done={false} icon={Calculator} title="2. Precifique o primeiro produto" href="/precificador" cta="Abrir o precificador">
            Informe ingredientes, embalagem e a margem que você quer. O preço aparece na hora.
          </SetupStep>
        </div>
      </>
    )
  }

  const distribution = [
    { name: 'Ingredientes', value: s.totals.ingredients.toNumber(), fill: SEG.ingredients },
    { name: 'Embalagem e outros', value: s.totals.otherVariable.toNumber(), fill: SEG.packaging },
    { name: 'Fixos rateados', value: s.totals.fixed.toNumber(), fill: SEG.fixed },
    { name: 'Taxas e impostos', value: s.totals.fees.toNumber(), fill: SEG.fees },
    { name: 'Sobra (margem)', value: s.totals.contribution.toNumber(), fill: SEG.margin },
  ].filter((d) => d.value > 0)
  const distTotal = distribution.reduce((a, d) => a + d.value, 0)

  const costVsPrice = rows
    .slice()
    .sort((a, b) => b.ref.price.comparedTo(a.ref.price))
    .slice(0, 12)
    .map((r) => ({ name: short(r.ev.product.name), full: r.ev.product.name, Custo: r.ref.totalCost.plus(r.ref.totalFees).toNumber(), Preço: r.ref.price.toNumber() }))

  const marginBars = rows
    .slice()
    .sort((a, b) => a.ref.contributionMargin.comparedTo(b.ref.contributionMargin))
    .slice(0, 14)
    .map((r) => ({
      name: short(r.ev.product.name, 18),
      Margem: r.ref.contributionMargin.toNumber(),
      fill: STATUS_COLOR[classifyMargin(r.ref.contributionMargin, r.ev.targetMargin)],
    }))

  const attention = buildAttention(rows)
  const kpis = [
    { label: 'Produtos cadastrados', value: products.length, format: fmtInt, hint: `${products.length - rows.length > 0 ? `${products.length - rows.length} sem preço calculável. ` : ''}${s.simulatedCount} sem preço atual, avaliados no preço sugerido.` },
    { label: 'Sobra estimada por venda', value: s.avgContribution.toNumber(), format: fmtBRL, hint: 'Média da margem de contribuição em R$ (preço − taxas − custos − fixos rateados). Não é lucro líquido nem faturamento.' },
    { label: 'Margem média do cardápio', value: s.weightedMargin.toNumber(), format: fmtPct, hint: 'Ponderada pelo preço, considerando uma venda de cada produto.' },
    { label: 'Abaixo da meta', value: below.length, format: fmtInt, hint: `Meta de ${formatPct(target, 0)} de margem de contribuição.`, tone: below.length > 0 ? 'warn' : 'good' },
    { label: 'Preço médio de venda', value: s.avgPrice.toNumber(), format: fmtBRL, hint: 'Média dos preços atuais (ou sugeridos, quando não há preço atual).' },
  ] as const

  return (
    <>
      <PageHeader
        title="Visão geral"
        description={`Estimativas do cardápio de ${restaurant.name} a partir dos custos e preços cadastrados. Sem vendas integradas: nada aqui é faturamento real.`}
        actions={
          <Button asChild>
            <Link href="/precificador">
              <Calculator /> Precificar produto
            </Link>
          </Button>
        }
      />

      {feesMissing || fixedMissing ? (
        <div className="mb-6 flex flex-col gap-3 rounded-xl border border-warn/30 bg-warn/[0.07] p-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-2.5 text-fg">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warn" aria-hidden />
            {feesMissing ? 'As taxas do perfil iFood estão zeradas, então os preços abaixo não incluem comissão nem taxa de pagamento.' : 'Há custos fixos mensais, mas o número de pedidos por mês está em zero: o rateio não está sendo aplicado.'}
          </p>
          <Button variant="secondary" size="sm" asChild>
            <Link href="/configuracoes#taxas">Revisar configurações</Link>
          </Button>
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {kpis.map((k, i) => (
          <motion.div key={k.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04, duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className={cn(i === 0 && 'col-span-2 lg:col-span-1')}>
            <Card className="h-full p-4 sm:p-5">
              <div className="flex items-center gap-1">
                <p className="text-[13px] text-muted">{k.label}</p>
                <Hint>{k.hint}</Hint>
              </div>
              <p className={cn('mt-2 text-2xl font-semibold tracking-[-0.02em] sm:text-[26px]', 'tone' in k && k.tone === 'warn' && 'text-warn')}>
                <AnimatedNumber value={k.value} format={k.format} />
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-start">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Para onde vai o dinheiro</CardTitle>
              <CardDescription>Distribuição de custos somando uma venda de cada produto.</CardDescription>
            </div>
          </CardHeader>
          <CardBody className="flex flex-col items-center gap-5 sm:flex-row lg:flex-col xl:flex-row">
            <div className="relative h-48 w-48 shrink-0">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={distribution} dataKey="value" nameKey="name" innerRadius="66%" outerRadius="100%" stroke="#191F2B" strokeWidth={2} animationDuration={700} />
                  <Tooltip content={<ChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs text-subtle">Receita</span>
                <span className="tabular text-sm font-semibold">{formatBRL(s.totals.revenue)}</span>
              </div>
            </div>
            <ul className="w-full space-y-2 text-[13px]">
              {distribution.map((d) => (
                <li key={d.name} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-muted">
                    <span className="size-2 rounded-[3px]" style={{ backgroundColor: d.fill }} />
                    {d.name}
                  </span>
                  <span className="tabular">{formatPctFraction(distTotal ? d.value / distTotal : 0)}</span>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>

        <AttentionCard items={attention} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Custo × preço de venda</CardTitle>
              <CardDescription>Custo inclui taxas, impostos e fixos rateados.</CardDescription>
            </div>
          </CardHeader>
          <CardBody className="h-72 pl-1">
            <ResponsiveContainer>
              <BarChart data={costVsPrice} margin={{ top: 4, right: 8, bottom: 0, left: 0 }} barGap={2}>
                <CartesianGrid vertical={false} stroke={AXIS.grid} />
                <XAxis dataKey="name" tick={{ fill: AXIS.tick, fontSize: 11 }} axisLine={{ stroke: AXIS.stroke }} tickLine={false} interval={0} angle={-30} textAnchor="end" height={56} />
                <YAxis tick={{ fill: AXIS.tick, fontSize: 11 }} axisLine={false} tickLine={false} width={52} tickFormatter={(v) => `R$${v}`} />
                <Tooltip cursor={{ fill: 'rgb(255 255 255 / 0.03)' }} content={<ChartTooltip />} />
                <Bar dataKey="Custo" fill={SEG.fees} radius={[3, 3, 0, 0]} maxBarSize={22} animationDuration={700} />
                <Bar dataKey="Preço" fill={SEG.ingredients} radius={[3, 3, 0, 0]} maxBarSize={22} animationDuration={700} />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Margem por produto</CardTitle>
              <CardDescription>Linha tracejada: meta de {formatPct(target, 0)}.</CardDescription>
            </div>
          </CardHeader>
          <CardBody className="pl-1" style={{ height: Math.max(220, marginBars.length * 30 + 40) }}>
            <ResponsiveContainer>
              <BarChart data={marginBars} layout="vertical" margin={{ top: 4, right: 16, bottom: 0, left: 0 }}>
                <CartesianGrid horizontal={false} stroke={AXIS.grid} />
                <XAxis type="number" tick={{ fill: AXIS.tick, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${Math.round(v * 100)}%`} />
                <YAxis type="category" dataKey="name" tick={{ fill: AXIS.tick, fontSize: 11 }} axisLine={false} tickLine={false} width={118} />
                <ReferenceLine x={target.div(100).toNumber()} stroke="#F5F7FA" strokeOpacity={0.5} strokeDasharray="4 4" />
                <ReferenceLine x={0} stroke={AXIS.stroke} />
                <Tooltip cursor={{ fill: 'rgb(255 255 255 / 0.03)' }} content={<ChartTooltip money={false} />} />
                <Bar dataKey="Margem" radius={[0, 3, 3, 0]} maxBarSize={16} animationDuration={700}>
                  {marginBars.map((m, i) => (
                    <Cell key={i} fill={m.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader className="flex-col sm:flex-row">
          <div>
            <CardTitle>Evolução dos preços simulados</CardTitle>
            <CardDescription>Cada vez que um produto é salvo, o PrecificaFood guarda o preço calculado naquele momento.</CardDescription>
          </div>
          {productsWithHistory.length > 0 ? (
            <div className="w-full sm:w-64">
              <Select aria-label="Produto do histórico" value={selectedTrend} onValueChange={setTrendProduct} options={productsWithHistory.map((p) => ({ value: p.id, label: p.name }))} />
            </div>
          ) : null}
        </CardHeader>
        <CardBody className="h-72 pl-1">
          {trend.length > 0 ? (
            <ResponsiveContainer>
              <LineChart data={trend} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
                <CartesianGrid vertical={false} stroke={AXIS.grid} />
                <XAxis dataKey="date" tick={{ fill: AXIS.tick, fontSize: 11 }} axisLine={{ stroke: AXIS.stroke }} tickLine={false} minTickGap={24} />
                <YAxis tick={{ fill: AXIS.tick, fontSize: 11 }} axisLine={false} tickLine={false} width={56} tickFormatter={(v) => `R$${v}`} domain={['auto', 'auto']} />
                <Tooltip content={<ChartTooltip />} />
                <Line type="monotone" dataKey="Recomendado" stroke={SEG.margin} strokeWidth={2} dot={{ r: 3 }} connectNulls animationDuration={700} />
                <Line type="monotone" dataKey="Comercial" stroke={SEG.ingredients} strokeWidth={2} strokeDasharray="5 4" dot={false} connectNulls animationDuration={700} />
                <Line type="monotone" dataKey="Atual" stroke={SEG.labor} strokeWidth={2} dot={{ r: 3 }} connectNulls animationDuration={700} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="flex h-full items-center justify-center text-sm text-muted">Salve um produto para começar o histórico.</p>
          )}
        </CardBody>
      </Card>
    </>
  )
}

function SetupStep({ done, icon: Icon, title, href, cta, children }: { done: boolean; icon: React.ElementType; title: string; href: string; cta: string; children: React.ReactNode }) {
  return (
    <Card className="p-6">
      <span className="flex size-10 items-center justify-center rounded-lg border border-line-strong bg-bg-2">
        <Icon className={cn('size-5', done ? 'text-accent' : 'text-muted')} aria-hidden />
      </span>
      <h2 className="mt-4 text-base font-semibold">{title}</h2>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{children}</p>
      <Button className="mt-5" variant={done ? 'secondary' : 'primary'} asChild>
        <Link href={href}>
          {cta} <ArrowRight />
        </Link>
      </Button>
    </Card>
  )
}

interface AttentionItem {
  id: string
  name: string
  reason: string
  status: ReturnType<typeof classifyMargin>
}

function buildAttention(rows: ReturnType<typeof referenceRows>) {
  const groups: Array<{ key: string; title: string; items: AttentionItem[] }> = [
    { key: 'neg', title: 'Margem negativa', items: [] },
    { key: 'below', title: 'Abaixo da meta', items: [] },
    { key: 'cost', title: 'Ingredientes caros demais', items: [] },
    { key: 'review', title: 'Preço atual abaixo do recomendado', items: [] },
  ]
  for (const r of rows) {
    const status = classifyMargin(r.ref.contributionMargin, r.ev.targetMargin)
    const base = { id: r.ev.product.id, name: r.ev.product.name, status }
    if (r.ref.contribution.isNegative()) groups[0]!.items.push({ ...base, reason: `perde ${formatBRL(r.ref.contribution.abs())} por venda` })
    else if (status !== 'healthy') groups[1]!.items.push({ ...base, reason: `${formatPctFraction(r.ref.contributionMargin)} de margem` })
    if (r.ev.highFoodCost) groups[2]!.items.push({ ...base, reason: `ingredientes = ${formatPctFraction(r.ref.foodCostShare)} do preço` })
    if (!r.simulated && r.ev.recommended.ok && r.ref.price.lt(r.ev.recommended.price)) {
      groups[3]!.items.push({ ...base, reason: `${formatBRL(r.ref.price)} → ${formatBRL(r.ev.recommended.price)}` })
    }
  }
  return groups.filter((g) => g.items.length > 0)
}

function AttentionCard({ items }: { items: ReturnType<typeof buildAttention> }) {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="size-4 text-warn" aria-hidden /> Atenção ao seu cardápio
          </CardTitle>
          <CardDescription>Produtos que pedem revisão de preço ou de custo.</CardDescription>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/produtos">
            Ver todos <ArrowRight />
          </Link>
        </Button>
      </CardHeader>
      <CardBody>
        {items.length === 0 ? (
          <EmptyState icon={UtensilsCrossed} title="Tudo dentro da meta">
            Nenhum produto com margem negativa, abaixo da meta ou com ingredientes acima do limite.
          </EmptyState>
        ) : (
          <div className="space-y-5">
            {items.map((g) => (
              <section key={g.key}>
                <h3 className="mb-1.5 text-xs font-medium text-subtle">
                  {g.title} · {g.items.length}
                </h3>
                <ul className="divide-y divide-line">
                  {g.items.slice(0, 4).map((it) => (
                    <li key={g.key + it.id}>
                      <Link href={`/precificador/${it.id}`} className="-mx-2 flex items-center justify-between gap-3 rounded-md px-2 py-2.5 hover:bg-surface-2/60">
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium">{it.name}</span>
                          <span className="tabular text-xs text-muted">{it.reason}</span>
                        </span>
                        <StatusBadge status={it.status} />
                      </Link>
                    </li>
                  ))}
                </ul>
                {g.items.length > 4 ? <p className="mt-1 text-xs text-subtle">e mais {g.items.length - 4}</p> : null}
              </section>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  )
}
