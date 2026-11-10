import Link from 'next/link'
import type { Metadata } from 'next'
import { AuthForm } from '@/components/app/auth-form'
import { signUp } from '@/app/actions/auth'

export const metadata: Metadata = { title: 'Criar conta' }

export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-[-0.02em]">Criar conta</h1>
      <p className="mb-8 mt-2 text-sm text-muted">Cadastre seu restaurante e calcule o primeiro preço em minutos.</p>
      <AuthForm
        action={signUp}
        submit="Criar conta"
        fields={[
          { name: 'restaurant', label: 'Nome do restaurante', autoComplete: 'organization', placeholder: 'Ex.: Hamburgueria da Esquina' },
          { name: 'email', label: 'E-mail', type: 'email', autoComplete: 'email', placeholder: 'voce@restaurante.com.br' },
          { name: 'password', label: 'Senha (mínimo 8 caracteres)', type: 'password', autoComplete: 'new-password' },
        ]}
        footer={
          <p className="pt-2 text-center text-sm text-muted">
            Já tem conta?{' '}
            <Link href="/entrar" className="font-medium text-accent hover:underline">
              Entrar
            </Link>
          </p>
        }
      />
    </>
  )
}
