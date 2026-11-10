import type { Metadata } from 'next'
import { SettingsView } from '@/components/app/settings-view'
import { getWorkspace } from '@/lib/data'

export const metadata: Metadata = { title: 'Configurações' }

export default async function Page() {
  const ws = await getWorkspace()
  return <SettingsView key={ws.restaurant.updated_at} restaurant={ws.restaurant} profiles={ws.profiles} isOwner={ws.role === 'owner'} canEdit={ws.role !== 'viewer'} />
}
