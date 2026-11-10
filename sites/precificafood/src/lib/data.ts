import 'server-only'
import { cache } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { FeeProfile, PriceSnapshot, Product, ProductIngredient, Restaurant } from '@/lib/domain'

export type Role = 'owner' | 'editor' | 'viewer'

export const getUser = cache(async () => {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  return data.user
})

export interface Workspace {
  restaurant: Restaurant
  role: Role
  profiles: FeeProfile[]
  products: Product[]
  ingredients: ProductIngredient[]
}

/** Carrega o restaurante do usuário logado. RLS garante que só volta o que ele pode ver. */
export const getWorkspace = cache(async (): Promise<Workspace> => {
  const user = await getUser()
  if (!user) redirect('/entrar')
  const supabase = await createClient()

  const { data: restaurant, error } = await supabase.from('restaurants').select('*').order('created_at').limit(1).maybeSingle()
  if (error) throw new Error(`Não foi possível carregar o restaurante: ${error.message}`)
  if (!restaurant) redirect('/onboarding')

  const rid = (restaurant as Restaurant).id
  const [members, profiles, products, ingredients] = await Promise.all([
    supabase.from('restaurant_members').select('role').eq('restaurant_id', rid).eq('user_id', user.id).maybeSingle(),
    supabase.from('fee_profiles').select('*').eq('restaurant_id', rid).order('created_at'),
    supabase.from('products').select('*').eq('restaurant_id', rid).order('name'),
    supabase.from('product_ingredients').select('*').eq('restaurant_id', rid).order('position'),
  ])
  for (const r of [members, profiles, products, ingredients]) {
    if (r.error) throw new Error(`Erro ao carregar dados: ${r.error.message}`)
  }
  return {
    restaurant: restaurant as Restaurant,
    role: ((members.data as { role: Role } | null)?.role ?? 'viewer') as Role,
    profiles: (profiles.data ?? []) as FeeProfile[],
    products: (products.data ?? []) as Product[],
    ingredients: (ingredients.data ?? []) as ProductIngredient[],
  }
})

export async function getSnapshots(restaurantId: string): Promise<PriceSnapshot[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('price_snapshots')
    .select('*')
    .eq('restaurant_id', restaurantId)
    .order('created_at', { ascending: false })
    .limit(500)
  if (error) throw new Error(`Erro ao carregar histórico: ${error.message}`)
  return ((data ?? []) as PriceSnapshot[]).reverse()
}
