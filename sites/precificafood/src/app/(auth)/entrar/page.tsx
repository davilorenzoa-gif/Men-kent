import Link from 'next/link'
import type { Metadata } from 'next'
import { AuthForm } from '@/components/app/auth-form'
import { signIn } from '@/app/actions/auth'

export const metadata: Metadata = { title: 'Entrar' }

export default async function Page({ searchParams }: { searchParams: Promise<{ next?: string; erro?: string }> }) {
  const { next, erro } = await searchParams
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-[-0.02em]">Entrar</h1>
      <p className="mb-8 mt-2 text-sm text-muted">Acesse o painel do seu restaurante.</p>
      {erro ? <p className="mb-4 rounded-md border border-warn/30 bg-warn/10 px-3 py-2.5 text-sm text-warn">O link expirou ou já foi usado. Peça um novo.</p> : null}
      <AuthForm
        action={signIn}
        hidden={{ next: next ?? '/visao-geral' }}
        submit="Entrar"
        fields={[
          { name: 'email', label: 'E-mail', type: 'email', autoComplete: 'email', placeholder: 'voce@restaurante.com.br' },
          { name: 'password', label: 'Senha', type: 'password', autoComplete: 'current-password' },
        ]}
        footer={
          <div className="flex items-center justify-between pt-2 text-sm">
            <Link href="/recuperar-senha" className="text-muted hover:text-fg hover:underline">
              Esqueci a senha
            </Link>
            <Link href="/cadastro" className="font-medium text-accent hover:underline">
              Criar conta
            </Link>
          </div>
        }
      />
    </>
  )
}
