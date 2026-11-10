import type { Metadata } from 'next'
import { AuthForm } from '@/components/app/auth-form'
import { updatePassword } from '@/app/actions/auth'

export const metadata: Metadata = { title: 'Nova senha' }

export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-[-0.02em]">Criar nova senha</h1>
      <p className="mb-8 mt-2 text-sm text-muted">Escolha uma senha com pelo menos 8 caracteres.</p>
      <AuthForm
        action={updatePassword}
        hidden={{ redirect: '1' }}
        submit="Salvar nova senha"
        fields={[
          { name: 'password', label: 'Nova senha', type: 'password', autoComplete: 'new-password' },
          { name: 'confirm', label: 'Repita a senha', type: 'password', autoComplete: 'new-password' },
        ]}
      />
    </>
  )
}
