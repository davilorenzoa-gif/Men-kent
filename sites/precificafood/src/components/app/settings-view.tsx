'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'
import { toast } from 'sonner'
import { ChevronDown, ImagePlus, Plus, Star, Trash2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input, Textarea } from '@/components/ui/input'
import { NumberField } from '@/components/ui/number-field'
import { Select } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { ConfirmDialog } from '@/components/ui/dialog'
import { Hint } from '@/components/ui/tooltip'
import { Field, PageHeader } from './common'
import { deleteFeeProfile, saveFeeProfile, setDefaultFeeProfile, updateLogo, updateRestaurant } from '@/app/actions/settings'
import { CHANNEL_LABELS, defaultFixedPerOrder, type FeeBase, type FeeChannel, type FeeProfile, type Restaurant } from '@/lib/domain'
import { ROUNDING_LABELS, commercialPrice, type RoundingRule } from '@/lib/pricing/engine'
import { FEE_BASE_LABELS } from '@/lib/pricing/promotion'
import { formatBRL, formatPct } from '@/lib/pricing/money'
import type { FeeProfilePayload, RestaurantPayload } from '@/lib/validation'
import { cn } from '@/lib/utils'

const num = (v: unknown) => Number(v ?? 0)

export function SettingsView({ restaurant, profiles, isOwner, canEdit }: { restaurant: Restaurant; profiles: FeeProfile[]; isOwner: boolean; canEdit: boolean }) {
  return (
    <>
      <PageHeader title="Configurações" description="Padrões usados em todos os cálculos. Cada produto pode sobrescrever impostos, margem e custos fixos." />
      <div className="space-y-6">
        <RestaurantForm restaurant={restaurant} disabled={!isOwner} />
        <FeeProfiles restaurant={restaurant} profiles={profiles} disabled={!canEdit} />
      </div>
    </>
  )
}

/* ------------------------------------------------------------------ */

function RestaurantForm({ restaurant, disabled }: { restaurant: Restaurant; disabled: boolean }) {
  const router = useRouter()
  const initial = React.useMemo<RestaurantPayload>(
    () => ({
      name: restaurant.name,
      target_margin_pct: num(restaurant.target_margin_pct),
      default_tax_pct: num(restaurant.default_tax_pct),
      fixed_monthly_costs: num(restaurant.fixed_monthly_costs),
      estimated_monthly_orders: restaurant.estimated_monthly_orders,
      rounding_rule: restaurant.rounding_rule,
      food_cost_alert_pct: num(restaurant.food_cost_alert_pct),
      currency: 'BRL',
    }),
    [restaurant],
  )
  const [form, setForm] = React.useState(initial)
  const [saving, setSaving] = React.useState(false)
  const dirty = JSON.stringify(form) !== JSON.stringify(initial)
  const set = <K extends keyof RestaurantPayload>(k: K, v: RestaurantPayload[K]) => setForm((f) => ({ ...f, [k]: v }))

  async function save() {
    setSaving(true)
    const r = await updateRestaurant({ ...form, estimated_monthly_orders: Math.round(form.estimated_monthly_orders) })
    setSaving(false)
    if (!r.ok) return toast.error(r.error)
    toast.success('Configurações salvas', { description: 'Os preços recomendados já foram recalculados.' })
    router.refresh()
  }

  const fixedPreview = defaultFixedPerOrder({ ...restaurant, fixed_monthly_costs: form.fixed_monthly_costs, estimated_monthly_orders: form.estimated_monthly_orders }, null)

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Restaurante</CardTitle>
          <CardDescription>{disabled ? 'Só o dono pode alterar estes dados.' : 'Nome, logo e regras gerais de preço.'}</CardDescription>
        </div>
      </CardHeader>
      <CardBody className="space-y-6">
        <div className="grid gap-5 md:grid-cols-[auto_minmax(0,1fr)]">
          <LogoField restaurant={restaurant} disabled={disabled} />
          <Field label="Nome do restaurante" htmlFor="s-name">
            <Input id="s-name" value={form.name} onChange={(e) => set('name', e.target.value)} maxLength={120} disabled={disabled} />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Meta de margem de contribuição" htmlFor="s-margin" hint={<Hint>Abaixo dela o produto aparece como "Atenção"; abaixo da metade, "Crítica".</Hint>}>
            <NumberField id="s-margin" suffix="%" value={form.target_margin_pct} onChange={(v) => set('target_margin_pct', v ?? 0)} max={99.99} />
          </Field>
          <Field label="Impostos padrão" htmlFor="s-tax" hint={<Hint>Alíquota efetiva sobre a venda, ex.: faixa do Simples Nacional. Confirme com seu contador.</Hint>}>
            <NumberField id="s-tax" suffix="%" value={form.default_tax_pct} onChange={(v) => set('default_tax_pct', v ?? 0)} max={99.99} />
          </Field>
          <Field label="Limite de custo de ingredientes" htmlFor="s-food" hint={<Hint>Alerta quando os ingredientes passam deste percentual do preço.</Hint>}>
            <NumberField id="s-food" suffix="%" value={form.food_cost_alert_pct} onChange={(v) => set('food_cost_alert_pct', v ?? 0)} max={100} />
          </Field>
          <Field label="Custos fixos mensais" htmlFor="s-fixed" hint={<Hint>Aluguel, salários fixos, energia, contador, sistemas. A mensalidade do marketplace vai no perfil de taxas.</Hint>}>
            <NumberField id="s-fixed" prefix="R$" value={form.fixed_monthly_costs} onChange={(v) => set('fixed_monthly_costs', v ?? 0)} />
          </Field>
          <Field label="Pedidos estimados por mês" htmlFor="s-orders">
            <NumberField id="s-orders" value={form.estimated_monthly_orders} onChange={(v) => set('estimated_monthly_orders', Math.max(0, Math.round(v ?? 0)))} decimals={0} />
          </Field>
          <div className="rounded-lg border border-line bg-bg-2/60 px-3.5 py-3 text-[13px]">
            <p className="text-subtle">Rateio por pedido (sem mensalidade)</p>
            <p className="tabular mt-1 text-base font-medium">{fixedPreview.issue ? '—' : formatBRL(fixedPreview.value)}</p>
            {fixedPreview.issue ? <p className="text-warn">{fixedPreview.issue.message}</p> : null}
          </div>
          <Field label="Arredondamento do preço comercial" htmlFor="s-round" className="sm:col-span-2">
            <Select
              id="s-round"
              value={form.rounding_rule}
              onValueChange={(v) => set('rounding_rule', v as RoundingRule)}
              options={(Object.keys(ROUNDING_LABELS) as RoundingRule[]).map((k) => ({ value: k, label: `${ROUNDING_LABELS[k]} · ex.: R$ 29,09 → ${formatBRL(commercialPrice('29.0909', k))}` }))}
            />
          </Field>
          <Field label="Moeda" htmlFor="s-cur" hint={<Hint>Por enquanto só real. A estrutura já guarda a moeda para outros mercados no futuro.</Hint>}>
            <Select id="s-cur" value="BRL" onValueChange={() => {}} options={[{ value: 'BRL', label: 'Real brasileiro (R$)' }]} />
          </Field>
        </div>
        <div className="flex justify-end gap-2 border-t border-line pt-5">
          {dirty ? (
            <Button variant="ghost" onClick={() => setForm(initial)}>
              Descartar
            </Button>
          ) : null}
          <Button onClick={save} loading={saving} disabled={disabled || !dirty}>
            Salvar configurações
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}

function LogoField({ restaurant, disabled }: { restaurant: Restaurant; disabled: boolean }) {
  const router = useRouter()
  const ref = React.useRef<HTMLInputElement>(null)
  const [busy, setBusy] = React.useState(false)

  async function onFile(file: File) {
    if (!/^image\/(png|jpeg|webp)$/.test(file.type)) return toast.error('Use uma imagem PNG, JPG ou WEBP.')
    if (file.size > 8 * 1024 * 1024) return toast.error('Imagem acima de 8 MB.')
    setBusy(true)
    try {
      // Reduz para 256 px no navegador antes de enviar.
      const bmp = await createImageBitmap(file)
      const size = 256
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')!
      const s = Math.min(bmp.width, bmp.height)
      ctx.drawImage(bmp, (bmp.width - s) / 2, (bmp.height - s) / 2, s, s, 0, 0, size, size)
      let dataUrl = canvas.toDataURL('image/webp', 0.86)
      if (!dataUrl.startsWith('data:image/webp')) dataUrl = canvas.toDataURL('image/png')
      const r = await updateLogo(dataUrl)
      if (!r.ok) toast.error(r.error)
      else {
        toast.success('Logo atualizado')
        router.refresh()
      }
    } catch {
      toast.error('Não foi possível ler a imagem.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <div className="relative size-16 shrink-0 overflow-hidden rounded-lg border border-line-strong bg-bg-2">
        {restaurant.logo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={restaurant.logo_url} alt={`Logo de ${restaurant.name}`} className="size-full object-cover" />
        ) : (
          <span className="flex size-full items-center justify-center text-subtle">
            <ImagePlus className="size-5" aria-hidden />
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <input ref={ref} type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} aria-label="Enviar logo" />
        <Button variant="secondary" size="sm" onClick={() => ref.current?.click()} loading={busy} disabled={disabled}>
          {restaurant.logo_url ? 'Trocar logo' : 'Enviar logo'}
        </Button>
        {restaurant.logo_url ? (
          <Button
            variant="ghost"
            size="sm"
            disabled={disabled || busy}
            onClick={async () => {
              const r = await updateLogo(null)
              if (!r.ok) return toast.error(r.error)
              toast.success('Logo removido')
              router.refresh()
            }}
          >
            <X /> Remover
          </Button>
        ) : (
          <span className="text-xs text-subtle">PNG, JPG ou WEBP</span>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

const EMPTY_PROFILE: FeeProfilePayload = {
  id: null,
  name: '',
  channel: 'ifood',
  plan_name: null,
  commission_pct: 0,
  payment_fee_pct: 0,
  delivery_commission_pct: 0,
  apply_delivery_commission: false,
  other_fees_pct: 0,
  per_order_fee: 0,
  monthly_fee: 0,
  campaign_discount_pct: 0,
  commission_base: 'customer',
  payment_fee_base: 'customer',
  notes: null,
}

function toPayload(p: FeeProfile): FeeProfilePayload {
  return {
    id: p.id,
    name: p.name,
    channel: p.channel,
    plan_name: p.plan_name,
    commission_pct: num(p.commission_pct),
    payment_fee_pct: num(p.payment_fee_pct),
    delivery_commission_pct: num(p.delivery_commission_pct),
    apply_delivery_commission: p.apply_delivery_commission,
    other_fees_pct: num(p.other_fees_pct),
    per_order_fee: num(p.per_order_fee),
    monthly_fee: num(p.monthly_fee),
    campaign_discount_pct: num(p.campaign_discount_pct),
    commission_base: p.commission_base,
    payment_fee_base: p.payment_fee_base,
    notes: p.notes,
  }
}

function FeeProfiles({ restaurant, profiles, disabled }: { restaurant: Restaurant; profiles: FeeProfile[]; disabled: boolean }) {
  const [open, setOpen] = React.useState<string | null>(() => profiles.find((p) => p.is_default)?.id ?? null)
  const [creating, setCreating] = React.useState(false)
  return (
    <section id="taxas" className="scroll-mt-24">
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Taxas por canal de venda</CardTitle>
            <CardDescription>
              Nenhuma taxa vem preenchida: comissão, pagamento e mensalidade mudam conforme plano, região e contrato. Copie do seu contrato ou do extrato do iFood.
            </CardDescription>
          </div>
          {!disabled ? (
            <Button variant="secondary" size="sm" onClick={() => setCreating(true)} disabled={creating}>
              <Plus /> Novo perfil
            </Button>
          ) : null}
        </CardHeader>
        <CardBody className="space-y-3">
          {creating ? <ProfileEditor profile={null} restaurant={restaurant} onDone={() => setCreating(false)} disabled={disabled} /> : null}
          {profiles.map((p) => (
            <div key={p.id} className="overflow-hidden rounded-lg border border-line bg-bg-2/50">
              <button type="button" className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-surface-2/50" onClick={() => setOpen(open === p.id ? null : p.id)} aria-expanded={open === p.id}>
                <span className="min-w-0">
                  <span className="flex items-center gap-2">
                    <span className="truncate font-medium">{p.name}</span>
                    {p.is_default ? <Badge tone="good">Padrão</Badge> : null}
                  </span>
                  <span className="tabular mt-0.5 block text-[13px] text-muted">
                    {CHANNEL_LABELS[p.channel]}
                    {p.plan_name ? ` · ${p.plan_name}` : ''} · comissão {formatPct(p.commission_pct, 2)} · pagamento {formatPct(p.payment_fee_pct, 2)} · {formatBRL(p.monthly_fee)}/mês
                  </span>
                </span>
                <ChevronDown className={cn('size-4 shrink-0 text-subtle transition-transform duration-200', open === p.id && 'rotate-180')} aria-hidden />
              </button>
              <AnimatePresence initial={false}>
                {open === p.id ? (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                    <div className="border-t border-line p-4">
                      <ProfileEditor profile={p} restaurant={restaurant} onDone={() => {}} disabled={disabled} />
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          ))}
        </CardBody>
      </Card>
    </section>
  )
}

function ProfileEditor({ profile, restaurant, onDone, disabled }: { profile: FeeProfile | null; restaurant: Restaurant; onDone: () => void; disabled: boolean }) {
  const router = useRouter()
  const initial = React.useMemo(() => (profile ? toPayload(profile) : { ...EMPTY_PROFILE, name: 'Novo canal' }), [profile])
  const [f, setF] = React.useState<FeeProfilePayload>(initial)
  const [saving, setSaving] = React.useState(false)
  const [confirmDelete, setConfirmDelete] = React.useState(false)
  const set = <K extends keyof FeeProfilePayload>(k: K, v: FeeProfilePayload[K]) => setF((x) => ({ ...x, [k]: v }))
  const dirty = JSON.stringify(f) !== JSON.stringify(initial)
  const rateSum = f.commission_pct + f.payment_fee_pct + (f.apply_delivery_commission ? f.delivery_commission_pct : 0) + f.other_fees_pct + f.campaign_discount_pct + Number(restaurant.default_tax_pct)
  const id = profile?.id ?? 'new'

  async function save() {
    setSaving(true)
    const r = await saveFeeProfile(f)
    setSaving(false)
    if (!r.ok) return toast.error(r.error)
    toast.success(profile ? 'Taxas salvas' : 'Perfil criado', { description: 'Preços recalculados com as novas taxas.' })
    onDone()
    router.refresh()
  }

  const pct = (k: 'commission_pct' | 'payment_fee_pct' | 'delivery_commission_pct' | 'other_fees_pct' | 'campaign_discount_pct', label: string, hint?: string) => (
    <Field label={label} htmlFor={`${id}-${k}`} hint={hint ? <Hint>{hint}</Hint> : undefined}>
      <NumberField id={`${id}-${k}`} suffix="%" value={f[k]} onChange={(v) => set(k, v ?? 0)} max={99.99} />
    </Field>
  )
  const baseOptions = (Object.keys(FEE_BASE_LABELS) as FeeBase[]).map((b) => ({ value: b, label: FEE_BASE_LABELS[b] }))

  return (
    <div className={cn(!profile && 'rounded-lg border border-accent/30 bg-accent/[0.03] p-4')}>
      {!profile ? <p className="mb-4 text-sm font-medium">Novo perfil de taxas</p> : null}
      <fieldset disabled={disabled} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Nome do perfil" htmlFor={`${id}-name`}>
            <Input id={`${id}-name`} value={f.name} onChange={(e) => set('name', e.target.value)} maxLength={80} />
          </Field>
          <Field label="Canal" htmlFor={`${id}-channel`}>
            <Select id={`${id}-channel`} value={f.channel} onValueChange={(v) => set('channel', v as FeeChannel)} options={(Object.keys(CHANNEL_LABELS) as FeeChannel[]).map((c) => ({ value: c, label: CHANNEL_LABELS[c] }))} />
          </Field>
          <Field label="Plano contratado" htmlFor={`${id}-plan`} hint={<Hint>Nome do plano no seu contrato (ex.: entrega própria ou entrega parceira).</Hint>}>
            <Input id={`${id}-plan`} value={f.plan_name ?? ''} onChange={(e) => set('plan_name', e.target.value || null)} placeholder="Ex.: Plano Básico" maxLength={80} />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {pct('commission_pct', 'Comissão', 'Percentual que o marketplace fica de cada pedido.')}
          {pct('payment_fee_pct', 'Taxa de pagamento', 'Cobrada sobre pedidos pagos online.')}
          {pct('other_fees_pct', 'Taxas adicionais', 'Outras taxas percentuais do contrato.')}
          <Field label="Taxa fixa por pedido" htmlFor={`${id}-per`} hint={<Hint>Valor em reais cobrado por pedido, se houver. Entra como custo variável.</Hint>}>
            <NumberField id={`${id}-per`} prefix="R$" value={f.per_order_fee} onChange={(v) => set('per_order_fee', v ?? 0)} />
          </Field>
          <Field label="Mensalidade" htmlFor={`${id}-monthly`} hint={<Hint>Custo fixo: é dividido pelos pedidos estimados do mês, não vira percentual.</Hint>}>
            <NumberField id={`${id}-monthly`} prefix="R$" value={f.monthly_fee} onChange={(v) => set('monthly_fee', v ?? 0)} />
          </Field>
          {pct('campaign_discount_pct', 'Participação em campanhas', 'Média do preço que você banca em cupons e campanhas. Vira padrão de "descontos financiados".')}
        </div>
        <div className="rounded-lg border border-line bg-bg/40 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Comissão de entrega</p>
              <p className="text-[13px] text-muted">Ligue se a entrega é feita pelo marketplace e cobrada à parte.</p>
            </div>
            <Switch checked={f.apply_delivery_commission} onCheckedChange={(v) => set('apply_delivery_commission', v)} aria-label="Aplicar comissão de entrega" />
          </div>
          {f.apply_delivery_commission ? <div className="mt-4 sm:max-w-xs">{pct('delivery_commission_pct', 'Comissão de entrega')}</div> : null}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Comissão incide sobre (em promoções)" htmlFor={`${id}-cb`}>
            <Select id={`${id}-cb`} value={f.commission_base} onValueChange={(v) => set('commission_base', v as FeeBase)} options={baseOptions} />
          </Field>
          <Field label="Taxa de pagamento incide sobre" htmlFor={`${id}-pb`}>
            <Select id={`${id}-pb`} value={f.payment_fee_base} onValueChange={(v) => set('payment_fee_base', v as FeeBase)} options={baseOptions} />
          </Field>
        </div>
        <Field label="Observações" htmlFor={`${id}-notes`}>
          <Textarea id={`${id}-notes`} value={f.notes ?? ''} onChange={(e) => set('notes', e.target.value || null)} rows={2} maxLength={1000} placeholder="Ex.: taxas conferidas no contrato de março" />
        </Field>
      </fieldset>
      <p className={cn('tabular mt-4 text-[13px]', rateSum >= 100 ? 'text-[#ff9a9d]' : 'text-muted')}>
        Taxas percentuais + impostos padrão: {formatPct(rateSum, 2)} do preço{rateSum >= 100 ? ' — nenhum preço cobre isso.' : '.'}
      </p>
      <div className="mt-4 flex flex-col-reverse gap-2 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          {profile && !profile.is_default && !disabled ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={async () => {
                  const r = await setDefaultFeeProfile(profile.id)
                  if (!r.ok) return toast.error(r.error)
                  toast.success(`${profile.name} agora é o padrão`)
                  router.refresh()
                }}
              >
                <Star /> Tornar padrão
              </Button>
              <Button variant="danger-ghost" size="sm" onClick={() => setConfirmDelete(true)}>
                <Trash2 /> Excluir
              </Button>
            </>
          ) : null}
        </div>
        <div className="flex gap-2 sm:justify-end">
          {!profile ? (
            <Button variant="ghost" onClick={onDone}>
              Cancelar
            </Button>
          ) : dirty ? (
            <Button variant="ghost" onClick={() => setF(initial)}>
              Descartar
            </Button>
          ) : null}
          <Button onClick={save} loading={saving} disabled={disabled || (!dirty && !!profile)}>
            {profile ? 'Salvar taxas' : 'Criar perfil'}
          </Button>
        </div>
      </div>
      {profile ? (
        <ConfirmDialog
          open={confirmDelete}
          onOpenChange={setConfirmDelete}
          title={`Excluir o perfil "${profile.name}"?`}
          description="Produtos que usam este perfil passam a usar o perfil padrão."
          confirmLabel="Excluir perfil"
          onConfirm={async () => {
            const r = await deleteFeeProfile(profile.id)
            setConfirmDelete(false)
            if (!r.ok) return toast.error(r.error)
            toast.success('Perfil excluído')
            router.refresh()
          }}
        />
      ) : null}
    </div>
  )
}
