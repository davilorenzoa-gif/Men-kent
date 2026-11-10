import Decimal from 'decimal.js'

/**
 * Decimal isolado para dinheiro. Precisão alta e arredondamento "meio pra cima"
 * (padrão comercial no Brasil). Nunca usamos float nativo nos cálculos: o
 * arredondamento para centavos acontece só na apresentação ou no preço cobrado.
 */
export const D = Decimal.clone({ precision: 40, rounding: Decimal.ROUND_HALF_UP })
export type Dec = InstanceType<typeof D>
export type Num = Dec | number | string

export const ZERO = new D(0)
export const HUNDRED = new D(100)

export function dec(value: Num | null | undefined): Dec {
  if (value === null || value === undefined || value === '') return ZERO
  if (value instanceof D) return value
  const n = new D(typeof value === 'string' ? value.replace(',', '.') : value)
  if (!n.isFinite()) return ZERO
  return n
}

/** Percentual "humano" (12,5) para fração (0,125). */
export function pct(value: Num | null | undefined): Dec {
  return dec(value).div(HUNDRED)
}

/** Arredonda para centavos (meio pra cima). Use só na saída. */
export function toCents(value: Num): Dec {
  return dec(value).toDecimalPlaces(2, D.ROUND_HALF_UP)
}

/** Sobe para o próximo centavo: usado quando o preço não pode ficar abaixo do necessário. */
export function ceilCents(value: Num): Dec {
  return dec(value).toDecimalPlaces(2, D.ROUND_CEIL)
}

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const num2 = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const num1 = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
const int = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 })

export function formatBRL(value: Num | null | undefined): string {
  // Intl usa espaço não separável entre "R$" e o número; mantemos.
  return brl.format(toCents(dec(value)).toNumber())
}

export function formatNumber(value: Num | null | undefined, digits: 0 | 1 | 2 = 2): string {
  const n = dec(value)
  if (digits === 0) return int.format(n.toDecimalPlaces(0).toNumber())
  if (digits === 1) return num1.format(n.toDecimalPlaces(1).toNumber())
  return num2.format(n.toDecimalPlaces(2).toNumber())
}

/** Recebe fração (0,25) e devolve "25,0%". */
export function formatPctFraction(value: Num | null | undefined, digits: 0 | 1 | 2 = 1): string {
  return `${formatNumber(dec(value).times(HUNDRED), digits)}%`
}

/** Recebe percentual humano (25) e devolve "25,0%". */
export function formatPct(value: Num | null | undefined, digits: 0 | 1 | 2 = 1): string {
  return `${formatNumber(value, digits)}%`
}

/** Lê um número digitado no padrão brasileiro ("1.234,56", "12,5", "12.5"). */
export function parseBR(input: string): number | null {
  const raw = input.trim().replace(/\s|R\$|%/g, '')
  if (raw === '') return null
  let normalized = raw
  if (raw.includes(',')) normalized = raw.replace(/\./g, '').replace(',', '.')
  const n = Number(normalized)
  return Number.isFinite(n) ? n : null
}
