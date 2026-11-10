'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'
import { toast } from 'sonner'
import { AlertTriangle, ArrowDown, ArrowUp, Check, GripVertical, Plus, Save, Settings2, Sparkles, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input, Textarea } from '@/components/ui/input'
import { NumberField } from '@/components/ui/number-field'
import { Select } from '@/components/ui/select'
import { Hint } from '@/components/ui/tooltip'
import { AnimatedNumber, Field, Row, StatusBadge } from './common'
import { PriceComposition } from './price-composition'
import { InsightList } from './insight-list'
import { ScenarioComparator } from './scenario-comparator'
import { saveProduct } from '@/app/actions/products'
import { CHANNEL_LABELS, defaultFixedPerOrder, evaluateProduct, resolveFeeProfile, type FeeProfile, type Product, type ProductIngredient, type Restaurant } from '@/lib/domain'
import { ROUNDING_LABELS, ingredientLineCost } from '@/lib/pricing/engine'
import { explain } from '@/lib/pricing/insights'
import { dec, formatBRL, formatNumber, formatPct, formatPctFraction } from '@/lib/pricing/money'
import { cn } from '@/lib/utils'

interface IngredientDraft {
  key: string
  name: string
  quantity: number | null
  unit: string
  unit_cost: number | null
}

interface Draft {
  name: string
  category: string
  description: string
  fee_profile_id: string | null
  packaging_cost: number | null
  labor_cost: number | null
  other_cost: number | null
  current_price: number | null
  tax_pct: number | null
  target_margin_pct: number | null
  funded_discount_pct: number | null
  fixed_cost_per_order: number | null
  ingredients: IngredientDraft[]
}

const UNITS = ['un', 'g', 'kg', 'ml', 'L', 'fatia', 'porção']
const n = (v: unknown): number | null => (v === null || v === undefined || v === '' ? null : Number(v))
let keySeq = 0
const newKey = () => `i${Date.now().toString(36)}${(keySeq++).toString(36)}`

function toDraft(p: Product | null, ings: ProductIngredient[]): Draft {
  return {
    name: p?.name ?? '',
    category: p?.category ?? '',
    description: p?.description ?? '',
    fee_profile_id: p?.fee_profile_id ?? null,
    packaging_cost: n(p?.packaging_cost) ?? 0,
    labor_cost: n(p?.labor_cost) ?? 0,
    other_cost: n(p?.other_cost) ?? 0,
    current_price: n(p?.current_price),
    tax_pct: n(p?.tax_pct),
    target_margin_pct: n(p?.target_margin_pct),
    funded_discount_pct: n(p?.funded_discount_pct),
    fixed_cost_per_order: n(p?.fixed_cost_per_order),
    ingredients:
      ings.length > 0
        ? ings
            .slice()
            .sort((a, b) => a.position - b.position)
            .map((i) => ({ key: i.id, name: i.name, quantity: n(i.quantity), unit: i.unit, unit_cost: n(i.unit_cost) }))
        : [{ key: newKey(), name: '', quantity: 1, unit: 'un', unit_cost: null }],
  }
}

export function PricingEditor({
  restaurant,
  profiles,
  product,
  ingredients,
  categories,
  canEdit,
}: {
  restaurant: Restaurant
  profiles: FeeProfile[]
  product: Product | null
  ingredients: ProductIngredient[]
  categories: string[]
  canEdit: boolean
}) {
  const router = useRouter()
  const [draft, setDraft] = React.useState<Draft>(() => toDraft(product, ingredients))
  const [saving, setSaving] = React.useState(false)
  const [savedAt, setSavedAt] = React.useState<number | null>(null)
  const [dirty, setDirty] = React.useState(false)
  const [nameError, setNameError] = React.useState(false)

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft((d) => ({ ...d, [key]: value }))
    setDirty(true)
  }
  const setIng = (key: string, patch: Partial<IngredientDraft>) => {
    setDraft((d) => ({ ...d, ingredients: d.ingredients.map((i) => (i.key === key ? { ...i, ...patch } : i)) }))
    setDirty(true)
  }
  const moveIng = (idx: number, dir: -1 | 1) => {
    setDraft((d) => {
      const list = d.ingredients.slice()
      const j = idx + dir
      if (j < 0 || j >= list.length) return d
      ;[list[idx], list[j]] = [list[j]!, list[idx]!]
      return { ...d, ingredients: list }
    })
    setDirty(true)
  }

  React.useEffect(() => {
    if (!dirty) return
    const h = (e: BeforeUnloadEvent) => e.preventDefault()
    window.addEventListener('beforeunload', h)
    return () => window.removeEventListener('beforeunload', h)
  }, [dirty])

  const profile = resolveFeeProfile({ fee_profile_id: draft.fee_profile_id }, profiles)
  const fixedDefault = defaultFixedPerOrder(restaurant, profile)

  // Produto "virtual" para o motor: recalcula a cada tecla.
  const ev = React.useMemo(() => {
    const now = ''
    const virtual: Product = {
      id: product?.id ?? 'novo',
      restaurant_id: restaurant.id,
      fee_profile_id: draft.fee_profile_id,
      name: draft.name,
      category: draft.category,
      description: draft.description,
      packaging_cost: draft.packaging_cost ?? 0,
      labor_cost: draft.labor_cost ?? 0,
      other_cost: draft.other_cost ?? 0,
      current_price: draft.current_price,
      tax_pct: draft.tax_pct,
      target_margin_pct: draft.target_margin_pct,
      funded_discount_pct: draft.funded_discount_pct,
      fixed_cost_per_order: draft.fixed_cost_per_order,
      created_at: now,
      updated_at: now,
    }
    const ings: ProductIngredient[] = draft.ingredients
      .filter((i) => i.name.trim() || (i.unit_cost ?? 0) > 0)
      .map((i, idx) => ({
        id: i.key,
        product_id: virtual.id,
        restaurant_id: restaurant.id,
        position: idx,
        name: i.name.trim() || `Ingrediente ${idx + 1}`,
        quantity: i.quantity ?? 0,
        unit: i.unit,
        unit_cost: i.unit_cost ?? 0,
      }))
    return evaluateProduct(virtual, ings, restaurant, profiles)
  }, [draft, product?.id, restaurant, profiles])

  const rec = ev.recommended
  const ingredientsTotal = draft.ingredients.reduce((a, i) => a.plus(ingredientLineCost({ name: '', quantity: i.quantity ?? 0, unitCost: i.unit_cost ?? 0 })), dec(0))

  const insights = React.useMemo(() => {
    const analysis = ev.current ?? (rec.ok ? rec.analysis : null)
    if (!analysis) return []
    return explain({
      input: ev.input,
      analysis,
      targetMarginPct: ev.targetMargin,
      recommendedPrice: rec.ok ? rec.price : null,
      foodCostAlertPct: dec(restaurant.food_cost_alert_pct),
      priceLabel: ev.current ? 'preço atual' : 'preço recomendado',
    })
  }, [ev, rec, restaurant.food_cost_alert_pct])

  async function onSave() {
    if (!draft.name.trim()) {
      setNameError(true)
      toast.error('Dê um nome ao produto antes de salvar.')
      document.getElementById('p-name')?.focus()
      return
    }
    const badIng = draft.ingredients.find((i) => !i.name.trim() && (i.unit_cost ?? 0) > 0)
    if (badIng) {
      toast.error('Há um ingrediente com custo e sem nome.')
      return
    }
    setSaving(true)
    const res = await saveProduct({
      id: product?.id ?? null,
      fee_profile_id: draft.fee_profile_id,
      name: draft.name.trim(),
      category: draft.category.trim() || 'Geral',
      description: draft.description.trim() || null,
      packaging_cost: draft.packaging_cost ?? 0,
      labor_cost: draft.labor_cost ?? 0,
      other_cost: draft.other_cost ?? 0,
      current_price: draft.current_price,
      tax_pct: draft.tax_pct,
      target_margin_pct: draft.target_margin_pct,
      funded_discount_pct: draft.funded_discount_pct,
      fixed_cost_per_order: draft.fixed_cost_per_order,
      ingredients: draft.ingredients
        .filter((i) => i.name.trim())
        .map((i) => ({ name: i.name.trim(), quantity: i.quantity ?? 0, unit: i.unit, unit_cost: i.unit_cost ?? 0 })),
    })
    setSaving(false)
    if (!res.ok) {
      toast.error(res.error)
      return
    }
    setDirty(false)
    setSavedAt(Date.now())
    toast.success(product ? 'Produto atualizado' : 'Produto salvo', { description: draft.name.trim() })
    if (!product && res.data) router.replace(`/precificador/${res.data.id}`)
    else router.refresh()
  }

  const profileOptions = profiles.map((p) => ({ value: p.id, label: `${p.name}${p.plan_name ? ` · ${p.plan_name}` : ''}` }))
  const ratesTotal = rec.ok ? rec.analysis.totalRate : null
  const blocking = !rec.ok ? rec.issues : []

  return (
    <div className="grid gap-6 pb-24 lg:grid-cols-[minmax(0,1fr)_400px] lg:pb-0 xl:grid-cols-[minmax(0,1fr)_440px]">
      {/* ENTRADAS */}
      <div className="min-w-0 space-y-5">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Produto</CardTitle>
              <CardDescription>Como aparece no seu cardápio.</CardDescription>
            </div>
          </CardHeader>
          <CardBody className="grid gap-4 sm:grid-cols-2">
            <Field label="Nome do produto" htmlFor="p-name" className="sm:col-span-2">
              <Input
                id="p-name"
                value={draft.name}
                aria-invalid={nameError || undefined}
                onChange={(e) => {
                  setNameError(false)
                  set('name', e.target.value)
                }}
                placeholder="Ex.: X-Bacon artesanal"
                maxLength={120}
                disabled={!canEdit}
              />
            </Field>
            <Field label="Categoria" htmlFor="p-cat">
              <Input id="p-cat" list="p-cat-list" value={draft.category} onChange={(e) => set('category', e.target.value)} placeholder="Ex.: Lanches" maxLength={60} disabled={!canEdit} />
              <datalist id="p-cat-list">
                {categories.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </Field>
            <Field
              label="Preço atual no iFood"
              htmlFor="p-current"
              hint={<Hint>Quanto você cobra hoje. Usado para mostrar a margem real e a situação do produto. Deixe vazio se ainda não vende.</Hint>}
            >
              <NumberField id="p-current" prefix="R$" value={draft.current_price} onChange={(v) => set('current_price', v)} allowEmpty placeholder="Não vende ainda" />
            </Field>
            <Field label="Descrição" htmlFor="p-desc" className="sm:col-span-2">
              <Textarea id="p-desc" value={draft.description} onChange={(e) => set('description', e.target.value)} rows={2} maxLength={1000} placeholder="Opcional" disabled={!canEdit} />
            </Field>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Ingredientes</CardTitle>
              <CardDescription>Quantidade usada na receita × custo por unidade de compra.</CardDescription>
            </div>
            <span className="tabular shrink-0 text-sm font-medium text-fg">{formatBRL(ingredientsTotal)}</span>
          </CardHeader>
          <CardBody className="@container space-y-2">
            <div className="hidden grid-cols-[16px_minmax(0,1fr)_84px_88px_112px_88px_40px] gap-2 px-1 text-xs text-subtle @3xl:grid">
              <span />
              <span>Ingrediente</span>
              <span className="text-right">Qtd.</span>
              <span>Unidade</span>
              <span className="text-right">Custo / unid.</span>
              <span className="text-right">Subtotal</span>
              <span />
            </div>
            <AnimatePresence initial={false}>
              {draft.ingredients.map((ing, idx) => {
                const sub = ingredientLineCost({ name: '', quantity: ing.quantity ?? 0, unitCost: ing.unit_cost ?? 0 })
                return (
                  <motion.div
                    key={ing.key}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-2 gap-2 rounded-lg border border-line bg-bg-2/60 p-3 @lg:grid-cols-[84px_88px_minmax(0,1fr)_88px_40px] @lg:items-center @3xl:grid-cols-[16px_minmax(0,1fr)_84px_88px_112px_88px_40px] @3xl:border-0 @3xl:bg-transparent @3xl:p-1">
                      <div className="hidden flex-col @3xl:flex">
                        <button type="button" onClick={() => moveIng(idx, -1)} disabled={idx === 0} className="text-subtle hover:text-fg disabled:opacity-30" aria-label={`Subir ${ing.name || 'ingrediente'}`}>
                          <ArrowUp className="size-3" />
                        </button>
                        <GripVertical className="size-3 text-line-strong" aria-hidden />
                        <button type="button" onClick={() => moveIng(idx, 1)} disabled={idx === draft.ingredients.length - 1} className="text-subtle hover:text-fg disabled:opacity-30" aria-label={`Descer ${ing.name || 'ingrediente'}`}>
                          <ArrowDown className="size-3" />
                        </button>
                      </div>
                      <Input
                        aria-label={`Nome do ingrediente ${idx + 1}`}
                        value={ing.name}
                        onChange={(e) => setIng(ing.key, { name: e.target.value })}
                        placeholder="Ex.: Blend bovino"
                        className="col-span-2 @lg:col-span-5 @3xl:col-span-1"
                        maxLength={120}
                      />
                      <NumberField aria-label={`Quantidade de ${ing.name || `ingrediente ${idx + 1}`}`} value={ing.quantity} onChange={(v) => setIng(ing.key, { quantity: v })} decimals={0} />
                      <Select aria-label="Unidade" value={UNITS.includes(ing.unit) ? ing.unit : 'un'} onValueChange={(v) => setIng(ing.key, { unit: v })} options={UNITS.map((u) => ({ value: u, label: u }))} />
                      <NumberField aria-label={`Custo por unidade de ${ing.name || `ingrediente ${idx + 1}`}`} prefix="R$" value={ing.unit_cost} onChange={(v) => setIng(ing.key, { unit_cost: v })} decimals={2} />
                      <div className="tabular flex items-center justify-between text-sm @lg:justify-end">
                        <span className="text-xs text-subtle @lg:hidden">Subtotal</span>
                        {formatBRL(sub)}
                      </div>
                      <Button
                        variant="danger-ghost"
                        size="icon"
                        type="button"
                        className="col-span-2 w-full @lg:col-span-1 @lg:w-10"
                        aria-label={`Remover ${ing.name || 'ingrediente'}`}
                        onClick={() => {
                          setDraft((d) => ({ ...d, ingredients: d.ingredients.filter((i) => i.key !== ing.key) }))
                          setDirty(true)
                        }}
                      >
                        <Trash2 />
                        <span className="@lg:hidden">Remover</span>
                      </Button>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
            {draft.ingredients.length === 0 ? <p className="py-3 text-center text-sm text-muted">Nenhum ingrediente. Adicione o primeiro.</p> : null}
            <Button
              variant="secondary"
              type="button"
              className="mt-2 w-full sm:w-auto"
              onClick={() => {
                setDraft((d) => ({ ...d, ingredients: [...d.ingredients, { key: newKey(), name: '', quantity: 1, unit: 'un', unit_cost: null }] }))
                setDirty(true)
                requestAnimationFrame(() => {
                  const inputs = document.querySelectorAll<HTMLInputElement>('input[aria-label^="Nome do ingrediente"]')
                  inputs[inputs.length - 1]?.focus()
                })
              }}
            >
              <Plus /> Adicionar ingrediente
            </Button>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Outros custos por unidade</CardTitle>
              <CardDescription>Custos que acontecem a cada venda.</CardDescription>
            </div>
          </CardHeader>
          <CardBody className="grid gap-4 sm:grid-cols-3">
            <Field label="Embalagem" htmlFor="c-pack">
              <NumberField id="c-pack" prefix="R$" value={draft.packaging_cost} onChange={(v) => set('packaging_cost', v)} />
            </Field>
            <Field label="Mão de obra variável" htmlFor="c-labor" hint={<Hint>Só o que muda com a venda (ex.: comissão por item do chapeiro). Salário fixo entra nos custos fixos.</Hint>}>
              <NumberField id="c-labor" prefix="R$" value={draft.labor_cost} onChange={(v) => set('labor_cost', v)} />
            </Field>
            <Field label="Outros custos variáveis" htmlFor="c-other" hint={<Hint>Gás, sachês, guardanapo, brinde… o que sai a cada pedido.</Hint>}>
              <NumberField id="c-other" prefix="R$" value={draft.other_cost} onChange={(v) => set('other_cost', v)} />
            </Field>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Taxas, impostos e margem</CardTitle>
              <CardDescription>Campos vazios usam o padrão das configurações.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/configuracoes#taxas">
                <Settings2 /> Taxas
              </Link>
            </Button>
          </CardHeader>
          <CardBody className="space-y-5">
            <Field label="Perfil de taxas (canal de venda)" htmlFor="p-profile">
              {profiles.length > 0 ? (
                <Select id="p-profile" value={profile?.id ?? ''} onValueChange={(v) => set('fee_profile_id', v)} options={profileOptions} />
              ) : (
                <p className="text-sm text-warn">Nenhum perfil de taxas. Crie um em Configurações.</p>
              )}
            </Field>
            {profile ? (
              <div className="rounded-lg border border-line bg-bg-2/60 p-3">
                <div className="mb-2 flex items-center justify-between text-xs text-subtle">
                  <span>
                    {CHANNEL_LABELS[profile.channel]}
                    {profile.plan_name ? ` · ${profile.plan_name}` : ''}
                  </span>
                  <Link href="/configuracoes#taxas" className="text-accent hover:underline">
                    Editar
                  </Link>
                </div>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[13px] sm:grid-cols-3">
                  {[
                    ['Comissão', formatPct(profile.commission_pct, 2)],
                    ['Pagamento', formatPct(profile.payment_fee_pct, 2)],
                    ['Entrega', profile.apply_delivery_commission ? formatPct(profile.delivery_commission_pct, 2) : 'não se aplica'],
                    ['Adicionais', formatPct(profile.other_fees_pct, 2)],
                    ['Fixa / pedido', formatBRL(profile.per_order_fee)],
                    ['Mensalidade', `${formatBRL(profile.monthly_fee)}/mês`],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-2 sm:block">
                      <dt className="text-subtle">{k}</dt>
                      <dd className="tabular text-fg">{v}</dd>
                    </div>
                  ))}
                </dl>
                {dec(profile.commission_pct).isZero() && dec(profile.payment_fee_pct).isZero() ? (
                  <p className="mt-3 flex items-start gap-2 text-[13px] text-warn">
                    <AlertTriangle className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                    As taxas deste perfil estão zeradas. Preencha com os valores do seu contrato para o preço ficar certo.
                  </p>
                ) : null}
              </div>
            ) : null}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Impostos" htmlFor="r-tax" hint={<Hint>Percentual sobre a venda (ex.: alíquota do Simples Nacional). Vazio = {formatPct(restaurant.default_tax_pct, 2)} das configurações.</Hint>}>
                <NumberField id="r-tax" suffix="%" value={draft.tax_pct} onChange={(v) => set('tax_pct', v)} allowEmpty placeholder={`Padrão ${formatNumber(restaurant.default_tax_pct)}`} max={99.99} />
              </Field>
              <Field
                label="Descontos financiados"
                htmlFor="r-disc"
                hint={<Hint>Média do preço que você abre mão em cupons e campanhas que você paga. Vazio = {formatPct(profile?.campaign_discount_pct ?? 0, 2)} do perfil de taxas.</Hint>}
              >
                <NumberField id="r-disc" suffix="%" value={draft.funded_discount_pct} onChange={(v) => set('funded_discount_pct', v)} allowEmpty placeholder={`Padrão ${formatNumber(profile?.campaign_discount_pct ?? 0)}`} max={99.99} />
              </Field>
              <Field label="Margem de contribuição desejada" htmlFor="r-margin" hint={<Hint>Quanto deve sobrar de cada venda, em % do preço, depois de taxas, custos e fixos rateados. Vazio = meta de {formatPct(restaurant.target_margin_pct, 0)}.</Hint>}>
                <NumberField id="r-margin" suffix="%" value={draft.target_margin_pct} onChange={(v) => set('target_margin_pct', v)} allowEmpty placeholder={`Meta ${formatNumber(restaurant.target_margin_pct, 0)}`} max={99.99} />
              </Field>
              <Field
                label="Custos fixos rateados"
                htmlFor="r-fixed"
                hint={
                  <Hint>
                    Parte do aluguel, salários, energia e mensalidade do marketplace que cada pedido precisa pagar. Vazio = ({formatBRL(restaurant.fixed_monthly_costs)} + {formatBRL(profile?.monthly_fee ?? 0)}) ÷{' '}
                    {formatNumber(restaurant.estimated_monthly_orders, 0)} pedidos = {formatBRL(fixedDefault.value)}.
                  </Hint>
                }
              >
                <NumberField id="r-fixed" prefix="R$" value={draft.fixed_cost_per_order} onChange={(v) => set('fixed_cost_per_order', v)} allowEmpty placeholder={`Padrão ${formatNumber(fixedDefault.value)}`} />
              </Field>
            </div>
            {ev.fixedIssue ? (
              <p className="flex items-start gap-2 text-[13px] text-warn">
                <AlertTriangle className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                {ev.fixedIssue.message}{' '}
                <Link href="/configuracoes" className="underline">
                  Configurar
                </Link>
              </p>
            ) : null}
          </CardBody>
        </Card>

        {insights.length > 0 ? (
          <Card>
            <CardHeader>
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="size-4 text-accent" aria-hidden /> Assistente de precificação
                </CardTitle>
                <CardDescription>Explicação montada só com os números acima.</CardDescription>
              </div>
            </CardHeader>
            <CardBody>
              <InsightList items={insights} />
            </CardBody>
          </Card>
        ) : null}

        {rec.ok ? (
          <ScenarioComparator
            currentPrice={draft.current_price}
            recommendedPrice={Number(ev.commercial?.toFixed(2) ?? rec.price.toFixed(2))}
            evaluation={ev}
            profile={profile}
          />
        ) : null}
      </div>

      {/* RESULTADOS */}
      <div className="min-w-0">
        <div className="space-y-4 lg:sticky lg:top-8">
          <Card className="overflow-hidden">
            <div className="border-b border-line p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-[0.08em] text-muted">Preço recomendado</p>
                {ev.status ? <StatusBadge status={ev.status} /> : null}
              </div>
              {rec.ok ? (
                <>
                  <p className="mt-2 text-[44px] font-semibold leading-none tracking-[-0.035em] text-fg sm:text-5xl" aria-live="polite">
                    <AnimatedNumber value={rec.price.toNumber()} format={(v) => formatBRL(v)} />
                  </p>
                  <p className="mt-2 text-[13px] text-muted">
                    Para {formatPct(ev.targetMargin, 1)} de margem de contribuição com {ratesTotal ? formatPctFraction(ratesTotal) : '0%'} de taxas e impostos.
                  </p>
                </>
              ) : (
                <div className="mt-3 space-y-2" role="alert">
                  {blocking.map((i) => (
                    <p key={i.code + (i.field ?? '')} className="flex items-start gap-2 text-sm text-[#ff9a9d]">
                      <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden /> {i.message}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {rec.ok && ev.commercial && ev.commercialAnalysis ? (
              <div className="flex items-center justify-between gap-4 border-b border-line bg-accent/[0.04] px-5 py-4 sm:px-6">
                <div>
                  <p className="text-[13px] text-muted">Preço comercial sugerido</p>
                  <p className="tabular mt-0.5 text-2xl font-semibold text-accent">{formatBRL(ev.commercial)}</p>
                  <p className="mt-0.5 text-xs text-subtle">{ROUNDING_LABELS[restaurant.rounding_rule]}</p>
                </div>
                <div className="text-right text-[13px]">
                  <p className="tabular text-fg">+{formatBRL(ev.commercial.minus(rec.price).abs())}</p>
                  <p className="text-subtle">vs. preço matemático</p>
                  <p className="tabular mt-1 font-medium text-fg">{formatPctFraction(ev.commercialAnalysis.contributionMargin, 2)} margem real</p>
                </div>
              </div>
            ) : null}

            {rec.ok ? (
              <CardBody className="sm:px-6">
                <dl className="divide-y divide-line">
                  <Row label="Custo total (variável + fixo)" value={formatBRL(rec.analysis.totalCost)} />
                  <Row label="Taxas e impostos descontados" value={formatBRL(rec.analysis.totalFees)} />
                  <Row label="Valor que sobra por venda" value={formatBRL(rec.analysis.contribution)} strong tone="good" />
                  <Row
                    label={
                      <span className="inline-flex items-center gap-1">
                        Margem de contribuição
                        <Hint>Não é lucro líquido: despesas que não foram rateadas (ex.: pró-labore, investimentos) ainda saem daqui.</Hint>
                      </span>
                    }
                    value={formatPctFraction(rec.analysis.contributionMargin, 2)}
                  />
                  <Row label="Custos sobre o preço" value={formatPctFraction(rec.analysis.costShare)} />
                  <Row
                    label={
                      <span className="inline-flex items-center gap-1">
                        Preço mínimo
                        <Hint>Abaixo deste valor a margem de contribuição fica negativa: cada venda tira dinheiro do caixa.</Hint>
                      </span>
                    }
                    value={formatBRL(rec.breakEvenPrice)}
                    tone="warn"
                  />
                </dl>
                <div className="mt-5">
                  <p className="mb-3 text-[13px] font-medium text-muted">Composição do preço</p>
                  <PriceComposition analysis={rec.analysis} />
                </div>
                {ev.current ? (
                  <div className="mt-5 rounded-lg border border-line bg-bg-2/60 p-3.5 text-[13px]">
                    <p className="text-muted">
                      No preço atual de <span className="tabular text-fg">{formatBRL(ev.current.price)}</span> sobram{' '}
                      <span className={cn('tabular font-medium', ev.current.contribution.isNegative() ? 'text-[#ff7b7f]' : 'text-fg')}>{formatBRL(ev.current.contribution)}</span> por venda (
                      {formatPctFraction(ev.current.contributionMargin)}).
                    </p>
                  </div>
                ) : null}
              </CardBody>
            ) : null}
          </Card>
          <div className="hidden lg:block">
            <SaveButton onSave={onSave} saving={saving} savedAt={savedAt} dirty={dirty} disabled={!canEdit} isNew={!product} />
          </div>
        </div>
      </div>

      {/* Barra fixa no celular */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-bg/95 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] uppercase tracking-[0.08em] text-subtle">Recomendado</p>
            <p className="tabular truncate text-lg font-semibold">{rec.ok ? formatBRL(rec.price) : '—'}</p>
          </div>
          <SaveButton onSave={onSave} saving={saving} savedAt={savedAt} dirty={dirty} disabled={!canEdit} isNew={!product} compact />
        </div>
      </div>
    </div>
  )
}

function SaveButton({ onSave, saving, savedAt, dirty, disabled, isNew, compact }: { onSave: () => void; saving: boolean; savedAt: number | null; dirty: boolean; disabled: boolean; isNew: boolean; compact?: boolean }) {
  const justSaved = savedAt !== null && !dirty
  return (
    <Button size="lg" className={cn(compact ? 'px-5' : 'w-full')} onClick={onSave} loading={saving} disabled={disabled}>
      {!saving ? justSaved ? <Check /> : <Save /> : null}
      {justSaved ? 'Salvo' : isNew ? 'Salvar produto' : 'Salvar alterações'}
    </Button>
  )
}
