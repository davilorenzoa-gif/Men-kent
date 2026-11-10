import { AppShell } from '@/components/app/shell'
import { getUser, getWorkspace } from '@/lib/data'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const [ws, user] = await Promise.all([getWorkspace(), getUser()])
  return (
    <AppShell restaurantName={ws.restaurant.name} logoUrl={ws.restaurant.logo_url} email={user?.email ?? ''}>
      {children}
    </AppShell>
  )
}
