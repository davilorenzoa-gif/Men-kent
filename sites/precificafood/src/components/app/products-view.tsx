'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ArrowDownUp, Copy, Download, MoreHorizontal, Pencil, Plus, Search, Trash2, UtensilsCrossed } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { ConfirmDialog } from '@/components/ui/dialog'
import { Dropdown, DropdownContent, DropdownItem, DropdownSeparator, DropdownTrigger } from '@/components/ui/dropdown'
import { EmptyState, PageHeader, StatusBadge } from './common'
import { deleteProduct, duplicateProduct } from '@/app/actions/products'
import { evaluateAll, effectiveMargin } from '@/lib/evaluate-all'
import type { FeeProfile, Product, ProductIngredient, Restaurant } from '@/lib/domain'
import { formatBRL, formatPctFraction } from '@/lib/pricing/money'
import { STATUS_LABELS, type MarginStatus } from '@/lib/pricing/engine'
import { cn } from '@/lib/utils'

type Sort = 'margin_asc' | 'margin_desc' | 'name' | 'price_desc'

export function ProductsView({
  restaurant,
  profiles,
  products,
  ingredients,
  canEdit,
}: {
  restaurant: Restaurant
  profiles: FeeProfile[]
  products: Product[]
  ingredients: ProductIngredient[]
  canEdit: boolean
}) {
  const router = useRouter()
  const [q, setQ] = React.useState('')
  const [cat, setCat] = React.useState('all')
  const [status, setStatus] = React.useState<'all' | MarginStatus>('all')
  const [sort, setSort] = React.useState<Sort>('margin_asc')
  const [toDelete, setToDelete] = React.useState<Product | null>(null)
  const [busy, setBusy] = React.useState<string | null>(null)

  const evals = React.useMemo(() => evaluateAll(restaurant, profiles, products, ingredients), [restaurant, profiles, products, ingredients])
  const categories = React.useMemo(() => [...new Set(products.map((p) => p.category))].sort((a, b) => a.localeCompare(b, 'pt-BR')), [products])

  const rows = React.useMemo(() => {
    const term = q.trim().toLocaleLowerCase('pt-BR')
    const list = evals.filter(
      (e) =>
        (cat === 'all' || e.product.category === cat) &&
        (status === 'all' || e.status === status) &&
        (!term || e.product.name.toLocaleLowerCase('pt-BR').includes(term) || e.product.category.toLocaleLowerCase('pt-BR').includes(term)),
    )
    const m = (x: (typeof list)[number]) => effectiveMargin(x) ?? Number.POSITIVE_INFINITY
    return list.sort((a, b) => {
      if (sort === 'name') return a.product.name.localeCompare(b.product.name, 'pt-BR')
      if (sort === 'margin_asc') return m(a) - m(b)
      if (sort === 'margin_desc') return (effectiveMargin(b) ?? -Infinity) - (effectiveMargin(a) ?? -Infinity)
      return Number(b.product.current_price ?? 0) - Number(a.product.current_price ?? 0)
    })
  }, [evals, q, cat, status, sort])

  async function onDuplicate(p: Product) {
    setBusy(p.id)
    const r = await duplicateProduct(p.id)
    setBusy(null)
    if (!r.ok) return toast.error(r.error)
    toast.success('Produto duplicado', { description: `${p.name} (cópia)` })
    router.refresh()
  }
  async function onDelete() {
    if (!toDelete) return
    setBusy(toDelete.id)
    const r = await deleteProduct(toDelete.id)
    setBusy(null)
    if (!r.ok) return toast.error(r.error)
    toast.success('Produto excluído', { description: toDelete.name })
    setToDelete(null)
    router.refresh()
  }

  const actions = (
    <>
      <Button variant="secondary" asChild>
        <a href="/produtos/exportar" download>
          <Download /> Exportar CSV
        </a>
      </Button>
      {canEdit ? (
        <Button asChild>
          <Link href="/precificador">
            <Plus /> Novo produto
          </Link>
        </Button>
      ) : null}
    </>
  )

  if (products.length === 0) {
    return (
      <>
        <PageHeader title="Meus produtos" description="O cardápio com custo, preço e situação de cada item." />
        <EmptyState
          icon={UtensilsCrossed}
          title="Nenhum produto cadastrado"
          action={
            <Button asChild>
              <Link href="/precificador">
                <Plus /> Precificar o primeiro produto
              </Link>
            </Button>
          }
        >
          Cadastre um produto no Precificador: informe ingredientes e custos, e ele aparece aqui com preço recomendado e margem.
        </EmptyState>
      </>
    )
  }

  const Menu = ({ p }: { p: Product }) => (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button variant="ghost" size="icon-sm" aria-label={`Ações de ${p.name}`} disabled={busy === p.id}>
          <MoreHorizontal />
        </Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem onSelect={() => router.push(`/precificador/${p.id}`)}>
          <Pencil /> {canEdit ? 'Editar' : 'Ver detalhes'}
        </DropdownItem>
        {canEdit ? (
          <>
            <DropdownItem onSelect={() => onDuplicate(p)}>
              <Copy /> Duplicar
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem danger onSelect={() => setToDelete(p)}>
              <Trash2 /> Excluir
            </DropdownItem>
          </>
        ) : null}
      </DropdownContent>
    </Dropdown>
  )

  return (
    <>
      <PageHeader title="Meus produtos" description={`${products.length} ${products.length === 1 ? 'produto' : 'produtos'} no cardápio. Situação calculada no preço atual; sem preço atual, no preço comercial sugerido.`} actions={actions} />

      <div className="mb-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_200px_180px_220px]">
        <div className="relative sm:col-span-2 lg:col-span-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" aria-hidden />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar produto ou categoria" className="pl-9" aria-label="Buscar produtos" />
        </div>
        <Select aria-label="Filtrar por categoria" value={cat} onValueChange={setCat} options={[{ value: 'all', label: 'Todas as categorias' }, ...categories.map((c) => ({ value: c, label: c }))]} />
        <Select
          aria-label="Filtrar por situação"
          value={status}
          onValueChange={setStatus}
          options={[{ value: 'all', label: 'Todas as situações' }, ...(Object.keys(STATUS_LABELS) as MarginStatus[]).map((s) => ({ value: s, label: STATUS_LABELS[s] }))]}
        />
        <Select
          aria-label="Ordenar"
          value={sort}
          onValueChange={setSort}
          options={[
            { value: 'margin_asc', label: 'Menor margem primeiro' },
            { value: 'margin_desc', label: 'Maior margem primeiro' },
            { value: 'name', label: 'Nome (A–Z)' },
            { value: 'price_desc', label: 'Maior preço atual' },
          ]}
        />
      </div>

      {rows.length === 0 ? (
        <p className="rounded-xl border border-line bg-surface px-5 py-10 text-center text-sm text-muted">Nenhum produto com esses filtros.</p>
      ) : (
        <>
          {/* Tabela (tablet/desktop) */}
          <Card className="hidden overflow-hidden md:block">
            <div className="relative overflow-x-auto">
              <table className="w-full min-w-[820px] text-sm">
                <thead>
                  <tr className="border-b border-line text-left text-xs text-subtle">
                    <th className="px-5 py-3 font-medium">Produto</th>
                    <th className="px-3 py-3 font-medium">Categoria</th>
                    <th className="px-3 py-3 text-right font-medium">Custo de produção</th>
                    <th className="px-3 py-3 text-right font-medium">Preço atual</th>
                    <th className="px-3 py-3 text-right font-medium">Recomendado</th>
                    <th className="px-3 py-3 text-right font-medium">
                      <button className="inline-flex items-center gap-1 hover:text-fg" onClick={() => setSort(sort === 'margin_asc' ? 'margin_desc' : 'margin_asc')}>
                        Margem <ArrowDownUp className="size-3" aria-hidden />
                      </button>
                    </th>
                    <th className="px-3 py-3 font-medium">Situação</th>
                    <th className="w-12 px-3 py-3">
                      <span className="sr-only">Ações</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((e) => {
                    const m = effectiveMargin(e)
                    const rec = e.recommended.ok ? e.recommended : null
                    return (
                      <tr key={e.product.id} className="border-b border-line transition-colors last:border-0 hover:bg-surface-2/60">
                        <td className="max-w-[260px] px-5 py-3.5">
                          <Link href={`/precificador/${e.product.id}`} className="block truncate font-medium text-fg hover:underline">
                            {e.product.name}
                          </Link>
                          {e.highFoodCost ? <span className="text-xs text-warn">Ingredientes acima do limite</span> : null}
                        </td>
                        <td className="px-3 py-3.5 text-muted">{e.product.category}</td>
                        <td className="tabular px-3 py-3.5 text-right">{rec ? formatBRL(rec.analysis.variableCost) : '—'}</td>
                        <td className="tabular px-3 py-3.5 text-right">{e.product.current_price !== null ? formatBRL(e.product.current_price) : <span className="text-subtle">—</span>}</td>
                        <td className="tabular px-3 py-3.5 text-right">
                          {rec ? (
                            <>
                              {formatBRL(rec.price)}
                              <span className="block text-xs text-subtle">comercial {formatBRL(e.commercial)}</span>
                            </>
                          ) : (
                            <span className="text-xs text-warn">revisar taxas</span>
                          )}
                        </td>
                        <td className={cn('tabular px-3 py-3.5 text-right font-medium', m !== null && m < 0 && 'text-[#ff7b7f]')}>
                          {m !== null ? formatPctFraction(m) : '—'}
                          {!e.current && m !== null ? <span className="block text-xs font-normal text-subtle">no sugerido</span> : null}
                        </td>
                        <td className="px-3 py-3.5">
                          <StatusBadge status={e.status} />
                        </td>
                        <td className="px-3 py-3.5 text-right">
                          <Menu p={e.product} />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Lista (celular) */}
          <ul className="space-y-2.5 md:hidden">
            {rows.map((e) => {
              const m = effectiveMargin(e)
              const rec = e.recommended.ok ? e.recommended : null
              return (
                <li key={e.product.id} className="rounded-xl border border-line bg-surface p-4">
                  <div className="flex items-start justify-between gap-3">
                    <Link href={`/precificador/${e.product.id}`} className="min-w-0">
                      <p className="truncate font-medium">{e.product.name}</p>
                      <p className="text-xs text-subtle">{e.product.category}</p>
                    </Link>
                    <Menu p={e.product} />
                  </div>
                  <dl className="mt-3 grid grid-cols-3 gap-2 text-[13px]">
                    <div>
                      <dt className="text-subtle">Custo</dt>
                      <dd className="tabular">{rec ? formatBRL(rec.analysis.variableCost) : '—'}</dd>
                    </div>
                    <div>
                      <dt className="text-subtle">Atual</dt>
                      <dd className="tabular">{e.product.current_price !== null ? formatBRL(e.product.current_price) : '—'}</dd>
                    </div>
                    <div>
                      <dt className="text-subtle">Recomendado</dt>
                      <dd className="tabular">{rec ? formatBRL(rec.price) : '—'}</dd>
                    </div>
                  </dl>
                  <div className="mt-3 flex items-center justify-between">
                    <StatusBadge status={e.status} />
                    <span className={cn('tabular text-sm font-medium', m !== null && m < 0 && 'text-[#ff7b7f]')}>{m !== null ? `${formatPctFraction(m)} margem` : ''}</span>
                  </div>
                </li>
              )
            })}
          </ul>
        </>
      )}

      <ConfirmDialog
        open={toDelete !== null}
        onOpenChange={(v) => !v && setToDelete(null)}
        title={`Excluir "${toDelete?.name ?? ''}"?`}
        description="O produto, os ingredientes e o histórico de preços dele serão apagados. Não dá para desfazer."
        confirmLabel="Excluir produto"
        loading={busy === toDelete?.id}
        onConfirm={onDelete}
      />
    </>
  )
}
