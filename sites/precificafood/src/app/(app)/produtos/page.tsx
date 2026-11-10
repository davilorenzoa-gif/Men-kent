import type { Metadata } from 'next'
import { ProductsView } from '@/components/app/products-view'
import { getWorkspace } from '@/lib/data'

export const metadata: Metadata = { title: 'Meus produtos' }

export default async function Page() {
  const ws = await getWorkspace()
  return <ProductsView restaurant={ws.restaurant} profiles={ws.profiles} products={ws.products} ingredients={ws.ingredients} canEdit={ws.role !== 'viewer'} />
}
