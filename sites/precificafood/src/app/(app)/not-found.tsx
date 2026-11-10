import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md py-20 text-center">
      <h1 className="text-lg font-semibold">Não encontramos isso</h1>
      <p className="mt-2 text-sm text-muted">O produto pode ter sido excluído ou o link está errado.</p>
      <Button className="mt-6" asChild>
        <Link href="/produtos">Ver meus produtos</Link>
      </Button>
    </div>
  )
}
