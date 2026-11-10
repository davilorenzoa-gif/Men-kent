import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badge = cva('inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap', {
  variants: {
    tone: {
      neutral: 'border-line-strong bg-surface-2 text-muted',
      good: 'border-accent/25 bg-accent/10 text-accent',
      warn: 'border-warn/25 bg-warn/10 text-warn',
      bad: 'border-danger/30 bg-danger/10 text-[#ff7b7f]',
      critical: 'border-[#f28a4b]/30 bg-[#f28a4b]/10 text-[#f6a36f]',
      info: 'border-info/25 bg-info/10 text-info',
    },
  },
  defaultVariants: { tone: 'neutral' },
})

export function Badge({ className, tone, ...props }: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badge>) {
  return <span className={cn(badge({ tone }), className)} {...props} />
}
