import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Toaster } from 'sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'PrecificaFood', template: '%s · PrecificaFood' },
  description: 'Precificação inteligente para restaurantes que vendem no iFood.',
}

export const viewport: Viewport = {
  themeColor: '#0B0D12',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            classNames: {
              toast: '!bg-surface-2 !border !border-line-strong !text-fg !shadow-pop !rounded-lg',
              description: '!text-muted',
            },
          }}
        />
      </body>
    </html>
  )
}
