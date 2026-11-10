import type { Metadata } from 'next'
import { PageHeader } from '@/components/app/common'
import { PricingEditor } from '@/components/app/pricing-editor'
import { getWorkspace } from '@/lib/data'

export const metadata: Metadata = { title: 'Precificador' }

export default async function Page() {
  const ws = await getWorkspace()
  const categories = [...new Set(ws.products.map((p) => p.category))].sort()
  return (
    <>
      <PageHeader title="Precificador" description="Monte o custo do produto e veja na hora o preço que cobre taxas, custos e a margem que você quer." />
      <PricingEditor restaurant={ws.restaurant} profiles={ws.profiles} product={null} ingredients={[]} categories={categories} canEdit={ws.role !== 'viewer'} />
    </>
  )
}
