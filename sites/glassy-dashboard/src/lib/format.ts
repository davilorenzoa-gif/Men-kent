const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const brl0 = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
const int = new Intl.NumberFormat('pt-BR')
const pct = new Intl.NumberFormat('pt-BR', { style: 'percent', maximumFractionDigits: 1, signDisplay: 'exceptZero' })

export const moeda = (v: number) => brl.format(v)
export const moedaCurta = (v: number) => brl0.format(v)
export const inteiro = (v: number) => int.format(Math.round(v))
export const variacao = (v: number) => pct.format(v)

/** R$ 12,4 mil / R$ 1,2 mi — para eixos de gráfico */
export function compacto(v: number) {
  if (v >= 1_000_000) return `R$ ${(v / 1_000_000).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} mi`
  if (v >= 1_000) return `R$ ${(v / 1_000).toLocaleString('pt-BR', { maximumFractionDigits: 0 })} mil`
  return `R$ ${Math.round(v)}`
}

export function quando(dia: number, hora: string) {
  if (dia === 0) return `Hoje, ${hora}`
  if (dia === 1) return `Ontem, ${hora}`
  return `${dia} dias atrás`
}

export const iniciais = (nome: string) =>
  nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()
