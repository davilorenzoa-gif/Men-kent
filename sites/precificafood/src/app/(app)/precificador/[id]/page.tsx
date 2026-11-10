import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { PageHeader } from '@/components/app/common'
import { PricingEditor } from '@/components/app/pricing-editor'
import { getWorkspace } from '@/lib/data'

export const metadata: Metadata = { title: 'Editar produto' }

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const ws = await getWorkspace()
  const product = ws.products.find((p) => p.id === id)
  if (!product) notFound()
  const categories = [...new Set(ws.products.map((p) => p.category))].sort()
  return (
    <>
      <Link href="/produtos" className="mb-3 inline-flex items-center gap-1 text-sm text-muted hover:text-fg">
        <ChevronLeft className="size-4" /> Meus produtos
      </Link>
      <PageHeader title={product.name} description={`${product.category} · edite os custos e salve para atualizar o histórico de preços.`} />
      <PricingEditor
        key={product.updated_at}
        restaurant={ws.restaurant}
        profiles={ws.profiles}
        product={product}
        ingredients={ws.ingredients.filter((i) => i.product_id === id)}
        categories={categories}
        canEdit={ws.role !== 'viewer'}
      />
    </>
  )
}
