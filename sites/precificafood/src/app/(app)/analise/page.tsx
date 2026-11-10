import type { Metadata } from 'next'
import { AnalysisView } from '@/components/app/analysis-view'
import { getWorkspace } from '@/lib/data'

export const metadata: Metadata = { title: 'Análise de lucratividade' }

export default async function Page() {
  const ws = await getWorkspace()
  return <AnalysisView restaurant={ws.restaurant} profiles={ws.profiles} products={ws.products} ingredients={ws.ingredients} canEdit={ws.role !== 'viewer'} />
}
