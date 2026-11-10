import type { Metadata } from 'next'
import { AccountView } from '@/components/app/account-view'
import { getUser, getWorkspace } from '@/lib/data'

export const metadata: Metadata = { title: 'Minha conta' }

export default async function Page() {
  const [ws, user] = await Promise.all([getWorkspace(), getUser()])
  return <AccountView email={user?.email ?? ''} createdAt={user?.created_at ?? new Date().toISOString()} role={ws.role} restaurantName={ws.restaurant.name} />
}
