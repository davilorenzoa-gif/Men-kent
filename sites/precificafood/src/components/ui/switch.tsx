'use client'
import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '@/lib/utils'

export function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        'peer inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full border border-line-strong bg-bg-2 p-0.5 transition-colors duration-150 data-[state=checked]:border-accent data-[state=checked]:bg-accent disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className="block size-4.5 rounded-full bg-fg shadow transition-transform duration-200 ease-[var(--ease-out-expo)] data-[state=checked]:translate-x-4 data-[state=checked]:bg-accent-ink" />
    </SwitchPrimitive.Root>
  )
}
