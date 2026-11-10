'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { getWorkspace } from '@/lib/data'
import { evaluateProduct, type Product, type ProductIngredient } from '@/lib/domain'
import { productSchema, firstError, type ProductPayload } from '@/lib/validation'
import { toCents } from '@/lib/pricing/money'
import type { ActionResult } from './types'

async function editableWorkspace() {
  const ws = await getWorkspace()
  if (ws.role === 'viewer') throw new Error('Seu acesso é só de leitura.')
  return ws
}

/** Recalcula no servidor (não confia em preço vindo do navegador) e grava tudo numa transação. */
export async function saveProduct(payload: ProductPayload): Promise<ActionResult<{ id: string }>> {
  const parsed = productSchema.safeParse(payload)
  if (!parsed.success) return { ok: false, error: firstError(parsed.error) }
  let ws
  try {
    ws = await editableWorkspace()
  } catch (e) {
    return { ok: false, error: (e as Error).message }
  }
  const p = parsed.data
  if (p.fee_profile_id && !ws.profiles.some((f) => f.id === p.fee_profile_id)) {
    return { ok: false, error: 'Perfil de taxas inválido.' }
  }
  if (p.id && !ws.products.some((x) => x.id === p.id)) return { ok: false, error: 'Produto não encontrado.' }

  const now = new Date().toISOString()
  const asProduct: Product = {
    ...p,
    id: p.id ?? 'novo',
    restaurant_id: ws.restaurant.id,
    created_at: now,
    updated_at: now,
  }
  const asIngredients: ProductIngredient[] = p.ingredients.map((i, idx) => ({
    ...i,
    id: String(idx),
    product_id: asProduct.id,
    restaurant_id: ws.restaurant.id,
    position: idx,
  }))
  const ev = evaluateProduct(asProduct, asIngredients, ws.restaurant, ws.profiles)
  const snapshot = {
    recommended_price: ev.recommended.ok ? ev.recommended.price.toFixed(2) : null,
    commercial_price: ev.commercial ? ev.commercial.toFixed(2) : null,
    current_price: p.current_price === null ? null : toCents(p.current_price).toFixed(2),
    variable_cost: ev.recommended.ok ? ev.recommended.analysis.variableCost.toFixed(4) : '0',
    contribution_margin: ev.current ? ev.current.contributionMargin.toFixed(6) : ev.commercialAnalysis?.contributionMargin.toFixed(6) ?? null,
  }

  const supabase = await createClient()
  const { ingredients, ...product } = p
  const { data, error } = await supabase.rpc('save_product', {
    p_product: { ...product, restaurant_id: ws.restaurant.id },
    p_ingredients: ingredients,
    p_snapshot: snapshot,
  })
  if (error) return { ok: false, error: 'Não foi possível salvar o produto. Verifique os valores e tente de novo.' }
  revalidatePath('/', 'layout')
  return { ok: true, data: { id: data as string } }
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  try {
    const ws = await editableWorkspace()
    if (!ws.products.some((p) => p.id === id)) return { ok: false, error: 'Produto não encontrado.' }
    const supabase = await createClient()
    const { error } = await supabase.from('products').delete().eq('id', id).eq('restaurant_id', ws.restaurant.id)
    if (error) return { ok: false, error: 'Não foi possível excluir.' }
    revalidatePath('/', 'layout')
    return { ok: true }
  } catch (e) {
    return { ok: false, error: (e as Error).message }
  }
}

export async function duplicateProduct(id: string): Promise<ActionResult<{ id: string }>> {
  const ws = await getWorkspace()
  const src = ws.products.find((p) => p.id === id)
  if (!src) return { ok: false, error: 'Produto não encontrado.' }
  const ing = ws.ingredients.filter((i) => i.product_id === id).sort((a, b) => a.position - b.position)
  const num = (v: unknown) => (v === null || v === undefined ? null : Number(v))
  return saveProduct({
    id: null,
    fee_profile_id: src.fee_profile_id,
    name: `${src.name} (cópia)`.slice(0, 120),
    category: src.category,
    description: src.description,
    packaging_cost: Number(src.packaging_cost),
    labor_cost: Number(src.labor_cost),
    other_cost: Number(src.other_cost),
    current_price: num(src.current_price),
    tax_pct: num(src.tax_pct),
    target_margin_pct: num(src.target_margin_pct),
    funded_discount_pct: num(src.funded_discount_pct),
    fixed_cost_per_order: num(src.fixed_cost_per_order),
    ingredients: ing.map((i) => ({ name: i.name, quantity: Number(i.quantity), unit: i.unit, unit_cost: Number(i.unit_cost) })),
  })
}

/** Aplica um novo preço atual (usado no simulador de aumento e no comparador). */
export async function applyCurrentPrice(id: string, price: number): Promise<ActionResult> {
  if (!Number.isFinite(price) || price < 0 || price > 1_000_000) return { ok: false, error: 'Preço inválido.' }
  const ws = await getWorkspace()
  const src = ws.products.find((p) => p.id === id)
  if (!src) return { ok: false, error: 'Produto não encontrado.' }
  const ing = ws.ingredients.filter((i) => i.product_id === id).sort((a, b) => a.position - b.position)
  const num = (v: unknown) => (v === null || v === undefined ? null : Number(v))
  const r = await saveProduct({
    id: src.id,
    fee_profile_id: src.fee_profile_id,
    name: src.name,
    category: src.category,
    description: src.description,
    packaging_cost: Number(src.packaging_cost),
    labor_cost: Number(src.labor_cost),
    other_cost: Number(src.other_cost),
    current_price: Math.round(price * 100) / 100,
    tax_pct: num(src.tax_pct),
    target_margin_pct: num(src.target_margin_pct),
    funded_discount_pct: num(src.funded_discount_pct),
    fixed_cost_per_order: num(src.fixed_cost_per_order),
    ingredients: ing.map((i) => ({ name: i.name, quantity: Number(i.quantity), unit: i.unit, unit_cost: Number(i.unit_cost) })),
  })
  return r.ok ? { ok: true } : r
}
