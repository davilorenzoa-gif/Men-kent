import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { AuthForm } from '@/components/app/auth-form'
import { createRestaurant } from '@/app/actions/auth'
import { getUser } from '@/lib/data'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = { title: 'Seu restaurante' }

export default async function Page() {
  const user = await getUser()
  if (!user) redirect('/entrar')
  const supabase = await createClient()
  const { data } = await supabase.from('restaurants').select('id').limit(1).maybeSingle()
  if (data) redirect('/visao-geral')
  const suggested = typeof user.user_metadata?.restaurant_name === 'string' ? user.user_metadata.restaurant_name : ''
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-[-0.02em]">Seu restaurante</h1>
      <p className="mb-8 mt-2 text-sm text-muted">É o nome que aparece no painel e nos relatórios. Dá para mudar depois.</p>
      <AuthForm
        action={createRestaurant}
        submit="Começar"
        fields={[{ name: 'name', label: 'Nome do restaurante', autoComplete: 'organization', defaultValue: suggested }]}
      />
    </>
  )
}
