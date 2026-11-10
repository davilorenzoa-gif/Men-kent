import type { Metadata } from 'next'
import { PromotionsView } from '@/components/app/promotions-view'
import { getWorkspace } from '@/lib/data'

export const metadata: Metadata = { title: 'Simulador de promoções' }

export default async function Page() {
  const ws = await getWorkspace()
  return <PromotionsView restaurant={ws.restaurant} profiles={ws.profiles} products={ws.products} ingredients={ws.ingredients} />
}
