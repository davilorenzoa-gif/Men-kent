'use client'

import * as React from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { Badge } from '@/components/ui/badge'
import { STATUS_LABELS, type MarginStatus } from '@/lib/pricing/engine'
import { cn } from '@/lib/utils'

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: React.ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-[26px] font-semibold leading-tight tracking-[-0.025em] sm:text-[28px]">{title}</h1>
        {description ? <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-muted">{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
    </div>
  )
}

/** Número com contagem animada curta (respeita "reduzir movimento"). */
export function AnimatedNumber({ value, format, className }: { value: number; format: (n: number) => string; className?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const prev = React.useRef<number | null>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el || !inView) return
    if (reduce || !Number.isFinite(value)) {
      el.textContent = format(value)
      prev.current = value
      return
    }
    const from = prev.current ?? 0
    prev.current = value
    const controls = animate(from, value, {
      duration: from === 0 ? 0.7 : 0.35,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = format(v)
      },
    })
    return () => controls.stop()
  }, [value, inView, reduce, format])

  return (
    <span ref={ref} className={cn('tabular', className)}>
      {format(value)}
    </span>
  )
}

const TONE: Record<MarginStatus, 'good' | 'warn' | 'critical' | 'bad'> = {
  healthy: 'good',
  attention: 'warn',
  critical: 'critical',
  loss: 'bad',
}

export function StatusBadge({ status }: { status: MarginStatus | null }) {
  if (!status) return <Badge tone="neutral">Sem preço atual</Badge>
  return (
    <Badge tone={TONE[status]}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {STATUS_LABELS[status]}
    </Badge>
  )
}

export const STATUS_COLOR: Record<MarginStatus, string> = {
  healthy: '#27D99A',
  attention: '#F2B84B',
  critical: '#F28A4B',
  loss: '#F2555A',
}

export function EmptyState({ icon: Icon, title, children, action }: { icon: React.ElementType; title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-line-strong bg-bg-2/60 px-6 py-14 text-center">
      <span className="flex size-11 items-center justify-center rounded-lg border border-line-strong bg-surface">
        <Icon className="size-5 text-accent" aria-hidden />
      </span>
      <h2 className="mt-4 text-base font-semibold">{title}</h2>
      <div className="mt-1.5 max-w-md text-sm leading-relaxed text-muted">{children}</div>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  )
}

export function Field({ label, htmlFor, hint, children, className }: { label: string; htmlFor?: string; hint?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <div className="flex items-center gap-1">
        <label htmlFor={htmlFor} className="text-[13px] font-medium text-muted">
          {label}
        </label>
        {hint}
      </div>
      {children}
    </div>
  )
}

export function Row({ label, value, strong, tone }: { label: React.ReactNode; value: React.ReactNode; strong?: boolean; tone?: 'good' | 'bad' | 'warn' }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5">
      <dt className={cn('text-sm', strong ? 'font-medium text-fg' : 'text-muted')}>{label}</dt>
      <dd
        className={cn(
          'tabular text-right text-sm',
          strong ? 'font-semibold text-fg' : 'text-fg',
          tone === 'good' && 'text-accent',
          tone === 'bad' && 'text-[#ff7b7f]',
          tone === 'warn' && 'text-warn',
        )}
      >
        {value}
      </dd>
    </div>
  )
}
