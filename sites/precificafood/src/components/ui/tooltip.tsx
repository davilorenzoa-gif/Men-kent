'use client'
import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { Info } from 'lucide-react'

export function Hint({ children, label = 'Saiba mais' }: { children: React.ReactNode; label?: string }) {
  return (
    <TooltipPrimitive.Root delayDuration={150}>
      <TooltipPrimitive.Trigger asChild>
        <button type="button" aria-label={label} className="inline-flex size-5 items-center justify-center rounded text-subtle hover:text-fg">
          <Info className="size-3.5" aria-hidden />
        </button>
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          sideOffset={6}
          className="z-50 max-w-72 rounded-md border border-line-strong bg-surface-2 px-3 py-2 text-[13px] leading-relaxed text-fg shadow-pop data-[state=delayed-open]:animate-in"
        >
          {children}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}

export const TooltipProvider = TooltipPrimitive.Provider
