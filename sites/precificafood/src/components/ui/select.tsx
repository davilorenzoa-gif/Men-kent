'use client'
import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Option<T extends string> {
  value: T
  label: string
}

export function Select<T extends string>({
  value,
  onValueChange,
  options,
  id,
  className,
  placeholder,
  'aria-label': ariaLabel,
}: {
  value: T
  onValueChange: (v: T) => void
  options: Option<T>[]
  id?: string
  className?: string
  placeholder?: string
  'aria-label'?: string
}) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={(v) => onValueChange(v as T)}>
      <SelectPrimitive.Trigger
        id={id}
        aria-label={ariaLabel}
        className={cn(
          'flex h-10 w-full items-center justify-between gap-2 rounded-md border border-line-strong bg-bg-2 px-3 text-left text-sm text-fg transition-colors hover:border-[#3d4860] focus-visible:outline-none focus-visible:border-accent focus-visible:ring-3 focus-visible:ring-accent/20 data-[placeholder]:text-subtle',
          className,
        )}
      >
        <span className="truncate">
          <SelectPrimitive.Value placeholder={placeholder} />
        </span>
        <SelectPrimitive.Icon>
          <ChevronDown className="size-4 text-subtle" aria-hidden />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={6}
          className="z-50 max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg border border-line-strong bg-surface-2 p-1 shadow-pop data-[state=open]:animate-[pop-in_160ms_var(--ease-out-expo)]"
        >
          <SelectPrimitive.Viewport>
            {options.map((o) => (
              <SelectPrimitive.Item
                key={o.value}
                value={o.value}
                className="relative flex cursor-pointer select-none items-center rounded-md py-2 pl-8 pr-3 text-sm text-fg outline-none data-[highlighted]:bg-[#2a3345]"
              >
                <SelectPrimitive.ItemIndicator className="absolute left-2.5">
                  <Check className="size-4 text-accent" aria-hidden />
                </SelectPrimitive.ItemIndicator>
                <SelectPrimitive.ItemText>{o.label}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}
