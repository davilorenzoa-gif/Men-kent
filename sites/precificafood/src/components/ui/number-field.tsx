'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { inputClass } from './input'
import { parseBR } from '@/lib/pricing/money'

const fmt = (v: number | null, decimals: number) =>
  v === null ? '' : new Intl.NumberFormat('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: Math.max(decimals, 4) }).format(v)

/**
 * Campo numérico no padrão brasileiro. Aceita "12,5", "1.234,56" ou "12.5".
 * Guarda número (ou null) e formata ao sair do campo.
 */
export function NumberField({
  value,
  onChange,
  prefix,
  suffix,
  decimals = 2,
  min = 0,
  max,
  id,
  placeholder,
  className,
  invalid,
  'aria-label': ariaLabel,
  'aria-describedby': describedBy,
  allowEmpty = false,
}: {
  value: number | null
  onChange: (v: number | null) => void
  prefix?: string
  suffix?: string
  decimals?: number
  min?: number
  max?: number
  id?: string
  placeholder?: string
  className?: string
  invalid?: boolean
  'aria-label'?: string
  'aria-describedby'?: string
  allowEmpty?: boolean
}) {
  const [text, setText] = React.useState(() => fmt(value, decimals))
  const [focused, setFocused] = React.useState(false)

  React.useEffect(() => {
    if (!focused) setText(fmt(value, decimals))
  }, [value, decimals, focused])

  const outOfRange = value !== null && ((min !== undefined && value < min) || (max !== undefined && value > max))

  return (
    <div className={cn('relative', className)}>
      {prefix ? <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-subtle">{prefix}</span> : null}
      <input
        id={id}
        type="text"
        inputMode="decimal"
        autoComplete="off"
        aria-label={ariaLabel}
        aria-describedby={describedBy}
        aria-invalid={invalid || outOfRange || undefined}
        placeholder={placeholder ?? (allowEmpty ? 'Padrão' : '0')}
        className={cn(inputClass, 'tabular text-right', prefix && 'pl-10', suffix && 'pr-8')}
        value={text}
        onFocus={(e) => {
          setFocused(true)
          requestAnimationFrame(() => e.target.select())
        }}
        onChange={(e) => {
          const raw = e.target.value
          if (!/^[\d.,\-\s]*$/.test(raw)) return
          setText(raw)
          const n = parseBR(raw)
          onChange(n === null ? (allowEmpty ? null : 0) : n)
        }}
        onBlur={() => {
          setFocused(false)
          setText(fmt(value, decimals))
        }}
      />
      {suffix ? <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-subtle">{suffix}</span> : null}
    </div>
  )
}
