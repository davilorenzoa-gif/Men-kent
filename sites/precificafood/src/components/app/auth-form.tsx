'use client'

import * as React from 'react'
import { useActionState } from 'react'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { ActionResult } from '@/app/actions/types'

export interface Field {
  name: string
  label: string
  type?: string
  autoComplete?: string
  placeholder?: string
  defaultValue?: string
}

export function AuthForm({
  action,
  fields,
  submit,
  hidden,
  footer,
}: {
  action: (prev: ActionResult | null, form: FormData) => Promise<ActionResult>
  fields: Field[]
  submit: string
  hidden?: Record<string, string>
  footer?: React.ReactNode
}) {
  const [state, formAction, pending] = useActionState(action, null)
  if (state?.ok && state.message) {
    return (
      <div className="rounded-lg border border-accent/25 bg-accent/5 p-4 text-sm leading-relaxed text-fg" role="status">
        <CheckCircle2 className="mb-2 size-5 text-accent" aria-hidden />
        {state.message}
      </div>
    )
  }
  return (
    <form action={formAction} className="space-y-4" noValidate>
      {hidden ? Object.entries(hidden).map(([k, v]) => <input key={k} type="hidden" name={k} value={v} />) : null}
      {fields.map((f) => (
        <div key={f.name} className="space-y-1.5">
          <Label htmlFor={f.name}>{f.label}</Label>
          <Input id={f.name} name={f.name} type={f.type ?? 'text'} autoComplete={f.autoComplete} placeholder={f.placeholder} defaultValue={f.defaultValue} required className="h-11" />
        </div>
      ))}
      {state && !state.ok ? (
        <p className="flex items-start gap-2 rounded-md border border-danger/30 bg-danger/10 px-3 py-2.5 text-sm text-[#ff9a9d]" role="alert">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          {state.error}
        </p>
      ) : null}
      <Button type="submit" size="lg" className="w-full" loading={pending}>
        {submit}
      </Button>
      {footer}
    </form>
  )
}
