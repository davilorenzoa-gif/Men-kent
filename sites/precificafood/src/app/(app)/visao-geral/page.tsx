import type { Metadata } from 'next'
import { DashboardView } from '@/components/app/dashboard-view'
import { getSnapshots, getWorkspace } from '@/lib/data'

export const metadata: Metadata = { title: 'Visão geral' }

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams
  const ws = await getWorkspace()
  const snapshots = await getSnapshots(ws.restaurant.id)
  return <DashboardView restaurant={ws.restaurant} profiles={ws.profiles} products={ws.products} ingredients={ws.ingredients} snapshots={snapshots} welcome={sp['bem-vindo'] === '1'} />
}
