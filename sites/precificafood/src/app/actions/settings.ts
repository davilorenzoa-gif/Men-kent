'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { getWorkspace } from '@/lib/data'
import { feeProfileSchema, firstError, restaurantSchema, type FeeProfilePayload, type RestaurantPayload } from '@/lib/validation'
import type { ActionResult } from './types'

export async function updateRestaurant(payload: RestaurantPayload): Promise<ActionResult> {
  const parsed = restaurantSchema.safeParse(payload)
  if (!parsed.success) return { ok: false, error: firstError(parsed.error) }
  const ws = await getWorkspace()
  if (ws.role !== 'owner') return { ok: false, error: 'Só o dono pode alterar as configurações.' }
  const supabase = await createClient()
  const { error } = await supabase.from('restaurants').update(parsed.data).eq('id', ws.restaurant.id)
  if (error) return { ok: false, error: 'Não foi possível salvar as configurações.' }
  revalidatePath('/', 'layout')
  return { ok: true }
}

const LOGO_MAX = 280_000
export async function updateLogo(dataUrl: string | null): Promise<ActionResult> {
  if (dataUrl !== null) {
    if (!/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(dataUrl)) return { ok: false, error: 'Formato de imagem inválido. Use PNG, JPG ou WEBP.' }
    if (dataUrl.length > LOGO_MAX) return { ok: false, error: 'Imagem grande demais. Use uma de até ~200 KB.' }
  }
  const ws = await getWorkspace()
  if (ws.role !== 'owner') return { ok: false, error: 'Só o dono pode alterar o logo.' }
  const supabase = await createClient()
  const { error } = await supabase.from('restaurants').update({ logo_url: dataUrl }).eq('id', ws.restaurant.id)
  if (error) return { ok: false, error: 'Não foi possível salvar o logo.' }
  revalidatePath('/', 'layout')
  return { ok: true }
}

export async function saveFeeProfile(payload: FeeProfilePayload): Promise<ActionResult<{ id: string }>> {
  const parsed = feeProfileSchema.safeParse(payload)
  if (!parsed.success) return { ok: false, error: firstError(parsed.error) }
  const ws = await getWorkspace()
  if (ws.role === 'viewer') return { ok: false, error: 'Seu acesso é só de leitura.' }
  const supabase = await createClient()
  const { id, ...fields } = parsed.data
  if (id) {
    if (!ws.profiles.some((p) => p.id === id)) return { ok: false, error: 'Perfil não encontrado.' }
    const { error } = await supabase.from('fee_profiles').update(fields).eq('id', id).eq('restaurant_id', ws.restaurant.id)
    if (error) return { ok: false, error: 'Não foi possível salvar as taxas.' }
    revalidatePath('/', 'layout')
    return { ok: true, data: { id } }
  }
  const { data, error } = await supabase
    .from('fee_profiles')
    .insert({ ...fields, restaurant_id: ws.restaurant.id, is_default: ws.profiles.length === 0 })
    .select('id')
    .single()
  if (error || !data) return { ok: false, error: 'Não foi possível criar o perfil.' }
  revalidatePath('/', 'layout')
  return { ok: true, data: { id: (data as { id: string }).id } }
}

export async function deleteFeeProfile(id: string): Promise<ActionResult> {
  const ws = await getWorkspace()
  const p = ws.profiles.find((x) => x.id === id)
  if (!p) return { ok: false, error: 'Perfil não encontrado.' }
  if (p.is_default) return { ok: false, error: 'Defina outro perfil como padrão antes de excluir este.' }
  const supabase = await createClient()
  const { error } = await supabase.from('fee_profiles').delete().eq('id', id).eq('restaurant_id', ws.restaurant.id)
  if (error) return { ok: false, error: 'Não foi possível excluir o perfil.' }
  revalidatePath('/', 'layout')
  return { ok: true }
}

export async function setDefaultFeeProfile(id: string): Promise<ActionResult> {
  const ws = await getWorkspace()
  if (!ws.profiles.some((x) => x.id === id)) return { ok: false, error: 'Perfil não encontrado.' }
  const supabase = await createClient()
  const { error } = await supabase.rpc('set_default_fee_profile', { p_profile_id: id })
  if (error) return { ok: false, error: 'Não foi possível definir o padrão.' }
  revalidatePath('/', 'layout')
  return { ok: true }
}
