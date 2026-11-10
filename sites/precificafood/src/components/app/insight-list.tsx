import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react'
import type { Insight } from '@/lib/pricing/insights'
import { cn } from '@/lib/utils'

const ICON = { good: CheckCircle2, warn: AlertTriangle, bad: XCircle, info: Info }
const COLOR = { good: 'text-accent', warn: 'text-warn', bad: 'text-danger', info: 'text-info' }

export function InsightList({ items }: { items: Insight[] }) {
  return (
    <ul className="space-y-3.5">
      {items.map((it, i) => {
        const Icon = ICON[it.tone]
        return (
          <li key={i} className="flex gap-3">
            <Icon className={cn('mt-0.5 size-4 shrink-0', COLOR[it.tone])} aria-hidden />
            <div className="min-w-0">
              <p className="text-sm font-medium text-fg">{it.title}</p>
              <p className="mt-0.5 text-[13px] leading-relaxed text-muted">{it.detail}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
