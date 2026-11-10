'use client'
import * as React from 'react'
import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu'
import { cn } from '@/lib/utils'

export const Dropdown = DropdownPrimitive.Root
export const DropdownTrigger = DropdownPrimitive.Trigger

export function DropdownContent({ children, align = 'end' }: { children: React.ReactNode; align?: 'start' | 'end' }) {
  return (
    <DropdownPrimitive.Portal>
      <DropdownPrimitive.Content
        align={align}
        sideOffset={6}
        className="z-50 min-w-44 rounded-lg border border-line-strong bg-surface-2 p-1 shadow-pop data-[state=open]:animate-[pop-in_160ms_var(--ease-out-expo)]"
      >
        {children}
      </DropdownPrimitive.Content>
    </DropdownPrimitive.Portal>
  )
}

export function DropdownItem({ className, danger, ...props }: React.ComponentProps<typeof DropdownPrimitive.Item> & { danger?: boolean }) {
  return (
    <DropdownPrimitive.Item
      className={cn(
        'flex cursor-pointer select-none items-center gap-2.5 rounded-md px-2.5 py-2 text-sm outline-none [&_svg]:size-4',
        danger ? 'text-[#ff7b7f] data-[highlighted]:bg-danger/10' : 'text-fg data-[highlighted]:bg-[#2a3345] [&_svg]:text-muted',
        className,
      )}
      {...props}
    />
  )
}

export const DropdownSeparator = () => <DropdownPrimitive.Separator className="my-1 h-px bg-line-strong" />
