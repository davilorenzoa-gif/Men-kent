'use client'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto max-w-md py-20 text-center">
      <AlertTriangle className="mx-auto size-8 text-warn" aria-hidden />
      <h1 className="mt-4 text-lg font-semibold">Algo deu errado ao carregar esta tela</h1>
      <p className="mt-2 text-sm text-muted">{error.message || 'Erro inesperado.'} Seus dados salvos não foram afetados.</p>
      <Button className="mt-6" onClick={reset}>
        Tentar de novo
      </Button>
    </div>
  )
}
