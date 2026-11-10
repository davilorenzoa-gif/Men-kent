'use client'

import { useActionState } from 'react'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Field, PageHeader } from './common'
import { signOut, updatePassword } from '@/app/actions/auth'

const ROLE = { owner: 'Dono', editor: 'Editor', viewer: 'Leitura' } as const

export function AccountView({ email, createdAt, role, restaurantName }: { email: string; createdAt: string; role: keyof typeof ROLE; restaurantName: string }) {
  const [state, action, pending] = useActionState(updatePassword, null)
  return (
    <>
      <PageHeader title="Minha conta" description="Dados de acesso e segurança." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Acesso</CardTitle>
              <CardDescription>Conta criada em {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeZone: 'America/Sao_Paulo' }).format(new Date(createdAt))}.</CardDescription>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">E-mail</dt>
                <dd className="truncate">{email}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Restaurante</dt>
                <dd className="truncate">{restaurantName}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Permissão</dt>
                <dd>
                  <Badge tone="good">{ROLE[role]}</Badge>
                </dd>
              </div>
            </dl>
            <form action={signOut} className="border-t border-line pt-4">
              <Button variant="secondary">
                <LogOut /> Sair da conta
              </Button>
            </form>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Trocar senha</CardTitle>
              <CardDescription>Mínimo de 8 caracteres.</CardDescription>
            </div>
          </CardHeader>
          <CardBody>
            <form action={action} className="space-y-4">
              <Field label="Nova senha" htmlFor="a-pass">
                <Input id="a-pass" name="password" type="password" autoComplete="new-password" required minLength={8} />
              </Field>
              <Field label="Repita a nova senha" htmlFor="a-confirm">
                <Input id="a-confirm" name="confirm" type="password" autoComplete="new-password" required minLength={8} />
              </Field>
              {state ? <p className={state.ok ? 'text-sm text-accent' : 'text-sm text-[#ff9a9d]'} role="status">{state.ok ? state.message : state.error}</p> : null}
              <Button type="submit" loading={pending}>
                Atualizar senha
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  )
}
