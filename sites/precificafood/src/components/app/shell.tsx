'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { LogOut, Menu, PanelLeftClose, PanelLeftOpen, X } from 'lucide-react'
import { NAV } from './nav'
import { LogoMark, Wordmark } from './logo'
import { cn } from '@/lib/utils'
import { signOut } from '@/app/actions/auth'

interface Props {
  restaurantName: string
  logoUrl: string | null
  email: string
  children: React.ReactNode
}

function isActive(path: string, href: string) {
  return path === href || path.startsWith(`${href}/`)
}

function RestaurantChip({ name, logoUrl, compact }: { name: string; logoUrl: string | null; compact?: boolean }) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('')
  return (
    <div className={cn('flex min-w-0 items-center gap-2.5', compact && 'justify-center')}>
      {logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logoUrl} alt="" className="size-8 shrink-0 rounded-md border border-line-strong object-cover" />
      ) : (
        <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-line-strong bg-surface-2 text-xs font-semibold text-muted">
          {initials || 'R'}
        </span>
      )}
      {!compact ? <span className="truncate text-sm font-medium text-fg">{name}</span> : null}
    </div>
  )
}

function NavList({ collapsed, onNavigate }: { collapsed?: boolean; onNavigate?: () => void }) {
  const path = usePathname()
  return (
    <nav aria-label="Principal" className="flex flex-col gap-0.5">
      {NAV.map((item) => {
        const active = isActive(path, item.href)
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? 'page' : undefined}
            title={collapsed ? item.label : undefined}
            className={cn(
              'group relative flex h-10 items-center gap-3 rounded-md px-3 text-sm transition-colors duration-150',
              active ? 'text-fg' : 'text-muted hover:bg-surface hover:text-fg',
              collapsed && 'justify-center px-0',
            )}
          >
            {active ? (
              <motion.span
                layoutId={onNavigate ? 'nav-active-mobile' : 'nav-active'}
                className="absolute inset-0 rounded-md border border-line-strong bg-surface"
                transition={{ type: 'spring', stiffness: 500, damping: 40 }}
              />
            ) : null}
            <Icon className={cn('relative size-[18px] shrink-0', active ? 'text-accent' : 'text-subtle group-hover:text-fg')} aria-hidden />
            {!collapsed ? <span className="relative truncate">{item.label}</span> : <span className="sr-only">{item.label}</span>}
          </Link>
        )
      })}
    </nav>
  )
}

export function AppShell({ restaurantName, logoUrl, email, children }: Props) {
  const [collapsed, setCollapsed] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const path = usePathname()

  React.useEffect(() => {
    try {
      setCollapsed(localStorage.getItem('pf:sidebar') === '1')
    } catch {}
  }, [])
  React.useEffect(() => setOpen(false), [path])
  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const toggle = () => {
    setCollapsed((c) => {
      try {
        localStorage.setItem('pf:sidebar', c ? '0' : '1')
      } catch {}
      return !c
    })
  }

  const current = NAV.find((n) => isActive(path, n.href))

  return (
    <div className="min-h-dvh bg-bg">
      {/* Desktop */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-30 hidden flex-col border-r border-line bg-bg-2 transition-[width] duration-200 ease-[var(--ease-out-expo)] lg:flex',
          collapsed ? 'w-[68px]' : 'w-64',
        )}
      >
        <div className={cn('flex h-16 items-center border-b border-line px-4', collapsed ? 'justify-center' : 'justify-between')}>
          <Link href="/visao-geral" aria-label="PrecificaFood, visão geral">
            {collapsed ? <LogoMark /> : <Wordmark />}
          </Link>
          {!collapsed ? (
            <button onClick={toggle} className="rounded-md p-1.5 text-subtle hover:bg-surface hover:text-fg" aria-label="Recolher menu">
              <PanelLeftClose className="size-4" />
            </button>
          ) : null}
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <NavList collapsed={collapsed} />
        </div>
        <div className="border-t border-line p-3">
          {collapsed ? (
            <button onClick={toggle} className="mb-2 flex h-10 w-full items-center justify-center rounded-md text-subtle hover:bg-surface hover:text-fg" aria-label="Expandir menu">
              <PanelLeftOpen className="size-4" />
            </button>
          ) : null}
          <div className={cn('flex items-center gap-2 rounded-md p-1.5', collapsed && 'flex-col')}>
            <div className="min-w-0 flex-1">
              <RestaurantChip name={restaurantName} logoUrl={logoUrl} compact={collapsed} />
              {!collapsed ? <p className="mt-1 truncate pl-[42px] text-xs text-subtle">{email}</p> : null}
            </div>
            <form action={signOut}>
              <button className="rounded-md p-2 text-subtle hover:bg-surface hover:text-fg" aria-label="Sair" title="Sair">
                <LogOut className="size-4" />
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Mobile */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-bg/90 px-4 backdrop-blur-md lg:hidden">
        <Link href="/visao-geral" aria-label="PrecificaFood, visão geral">
          <Wordmark />
        </Link>
        <div className="flex items-center gap-1">
          <span className="max-w-[9rem] truncate text-[13px] text-muted">{current?.label}</span>
          <button onClick={() => setOpen(true)} className="flex size-11 items-center justify-center rounded-md text-fg hover:bg-surface" aria-label="Abrir menu" aria-expanded={open}>
            <Menu className="size-5" />
          </button>
        </div>
      </header>
      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-y-0 right-0 z-50 flex w-[min(20rem,86vw)] flex-col border-l border-line bg-bg-2 shadow-pop lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.28 }}
            >
              <div className="flex h-14 items-center justify-between border-b border-line px-4">
                <RestaurantChip name={restaurantName} logoUrl={logoUrl} />
                <button onClick={() => setOpen(false)} className="flex size-11 items-center justify-center rounded-md text-muted hover:text-fg" aria-label="Fechar menu">
                  <X className="size-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-3">
                <NavList onNavigate={() => setOpen(false)} />
              </div>
              <div className="border-t border-line p-3">
                <p className="truncate px-3 pb-2 text-xs text-subtle">{email}</p>
                <form action={signOut}>
                  <button className="flex h-11 w-full items-center gap-3 rounded-md px-3 text-sm text-muted hover:bg-surface hover:text-fg">
                    <LogOut className="size-4" /> Sair
                  </button>
                </form>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>

      <main className={cn('transition-[padding] duration-200 ease-[var(--ease-out-expo)]', collapsed ? 'lg:pl-[68px]' : 'lg:pl-64')}>
        <div className="mx-auto w-full max-w-[1280px] px-4 pb-16 pt-6 sm:px-6 lg:px-10 lg:pt-10">{children}</div>
      </main>
    </div>
  )
}
