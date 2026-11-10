import Link from 'next/link'
import type { Metadata } from 'next'
import { AuthForm } from '@/components/app/auth-form'
import { requestPasswordReset } from '@/app/actions/auth'

export const metadata: Metadata = { title: 'Recuperar senha' }

export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-[-0.02em]">Recuperar senha</h1>
      <p className="mb-8 mt-2 text-sm text-muted">Enviamos um link para você criar uma senha nova.</p>
      <AuthForm
        action={requestPasswordReset}
        submit="Enviar link"
        fields={[{ name: 'email', label: 'E-mail da conta', type: 'email', autoComplete: 'email' }]}
        footer={
          <p className="pt-2 text-center text-sm">
            <Link href="/entrar" className="text-muted hover:text-fg hover:underline">
              Voltar para o login
            </Link>
          </p>
        }
      />
    </>
  )
}
