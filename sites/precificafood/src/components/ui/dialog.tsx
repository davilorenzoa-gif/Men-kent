'use client'
import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as AlertPrimitive from '@radix-ui/react-alert-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'

const overlay =
  'fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px] data-[state=open]:animate-[fade-in_160ms_ease-out] data-[state=closed]:animate-[fade-out_120ms_ease-in]'
const panel =
  'fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-line-strong bg-surface p-6 shadow-pop data-[state=open]:animate-[pop-in_200ms_var(--ease-out-expo)] data-[state=closed]:animate-[fade-out_120ms_ease-in]'

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogClose = DialogPrimitive.Close

export function DialogContent({ className, children, title, description }: { className?: string; children: React.ReactNode; title: string; description?: string }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={overlay} />
      <DialogPrimitive.Content className={cn(panel, className)}>
        <DialogPrimitive.Title className="text-base font-semibold text-fg">{title}</DialogPrimitive.Title>
        {description ? <DialogPrimitive.Description className="mt-1.5 text-sm leading-relaxed text-muted">{description}</DialogPrimitive.Description> : <DialogPrimitive.Description className="sr-only">{title}</DialogPrimitive.Description>}
        <div className="mt-5">{children}</div>
        <DialogPrimitive.Close asChild>
          <Button variant="ghost" size="icon-sm" className="absolute right-3 top-3" aria-label="Fechar">
            <X />
          </Button>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  onConfirm,
  loading,
  tone = 'danger',
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  title: string
  description: string
  confirmLabel: string
  onConfirm: () => void
  loading?: boolean
  tone?: 'danger' | 'primary'
}) {
  return (
    <AlertPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AlertPrimitive.Portal>
        <AlertPrimitive.Overlay className={overlay} />
        <AlertPrimitive.Content className={panel}>
          <AlertPrimitive.Title className="text-base font-semibold text-fg">{title}</AlertPrimitive.Title>
          <AlertPrimitive.Description className="mt-1.5 text-sm leading-relaxed text-muted">{description}</AlertPrimitive.Description>
          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <AlertPrimitive.Cancel asChild>
              <Button variant="secondary">Cancelar</Button>
            </AlertPrimitive.Cancel>
            <Button
              variant={tone === 'danger' ? 'danger' : 'primary'}
              loading={loading}
              onClick={(e) => {
                e.preventDefault()
                onConfirm()
              }}
            >
              {confirmLabel}
            </Button>
          </div>
        </AlertPrimitive.Content>
      </AlertPrimitive.Portal>
    </AlertPrimitive.Root>
  )
}
