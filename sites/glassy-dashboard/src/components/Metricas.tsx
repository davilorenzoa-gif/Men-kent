import { ArrowDownRight, ArrowUpRight, ReceiptText, ShoppingBag, UserPlus, Wallet } from 'lucide-react'
import type { ComponentType } from 'react'
import { recorte, type Periodo } from '../lib/data'
import { inteiro, moeda, moedaCurta, variacao } from '../lib/format'

function Sparkline({ valores, cor }: { valores: number[]; cor: string }) {
  const w = 120
  const h = 36
  const min = Math.min(...valores)
  const max = Math.max(...valores)
  const pts = valores.map((v, i) => [(i / (valores.length - 1)) * w, h - 3 - ((v - min) / (max - min || 1)) * (h - 6)])
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join('')
  const id = `sp-${cor.replace(/[^a-z0-9]/gi, '')}`
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-9 w-full" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: cor, stopOpacity: 0.28 }} />
          <stop offset="1" style={{ stopColor: cor, stopOpacity: 0 }} />
        </linearGradient>
      </defs>
      <path d={`${d}L${w},${h}L0,${h}Z`} fill={`url(#${id})`} />
      <path d={d} fill="none" style={{ stroke: cor }} strokeWidth="1.6" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
    </svg>
  )
}

/** junta dias em ~14 pontos pra linha ficar legível */
function amostra(valores: number[]) {
  const n = 14
  const passo = Math.max(1, Math.floor(valores.length / n))
  const out: number[] = []
  for (let i = 0; i < valores.length; i += passo) out.push(valores.slice(i, i + passo).reduce((a, b) => a + b, 0) / passo)
  return out
}

interface Card {
  rotulo: string
  valor: string
  delta: number
  Icone: ComponentType<{ size?: number }>
  serie: number[]
  cor: string
}

export function Metricas({ periodo }: { periodo: Periodo }) {
  const r = recorte(periodo)
  const cards: Card[] = [
    { rotulo: 'Receita', valor: moedaCurta(r.receita.valor), delta: r.receita.delta, Icone: Wallet, serie: r.atual.map((d) => d.receita), cor: 'var(--accent)' },
    { rotulo: 'Pedidos', valor: inteiro(r.pedidos.valor), delta: r.pedidos.delta, Icone: ReceiptText, serie: r.atual.map((d) => d.pedidos), cor: 'var(--accent-2)' },
    { rotulo: 'Ticket médio', valor: moeda(r.ticket.valor), delta: r.ticket.delta, Icone: ShoppingBag, serie: r.atual.map((d) => d.receita / d.pedidos), cor: 'var(--teal)' },
    { rotulo: 'Clientes novos', valor: inteiro(r.novos.valor), delta: r.novos.delta, Icone: UserPlus, serie: r.atual.map((d) => d.novos), cor: 'var(--warn)' },
  ]
  return (
    <section aria-label="Indicadores" className="grid grid-cols-[repeat(2,minmax(0,1fr))] gap-3 sm:gap-4 xl:grid-cols-[repeat(4,minmax(0,1fr))]">
      {cards.map((c, i) => {
        const sobe = c.delta >= 0
        return (
          <article key={c.rotulo} className="glass lift rise flex flex-col gap-3 p-4 sm:p-5" style={{ ['--i' as string]: i }}>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[13px] text-[var(--ink-2)]">{c.rotulo}</span>
              <span className="glass-inset grid h-8 w-8 place-items-center !rounded-[10px]" style={{ color: c.cor }}>
                <c.Icone size={16} />
              </span>
            </div>
            <div className="num truncate text-[22px] font-medium tracking-tight sm:text-[28px]">{c.valor}</div>
            <div className="flex items-end justify-between gap-3">
              <span
                className="num inline-flex shrink-0 items-center gap-0.5 text-[12px] font-medium"
                style={{ color: sobe ? 'var(--ok)' : 'var(--bad)' }}
                title="Comparado ao período anterior"
              >
                {sobe ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {variacao(c.delta)}
                <span className="ml-1 hidden font-sans font-normal text-[var(--ink-3)] sm:inline">vs anterior</span>
              </span>
              <div className="w-[46%] max-w-[120px]">
                <Sparkline valores={amostra(c.serie)} cor={c.cor} />
              </div>
            </div>
          </article>
        )
      })}
    </section>
  )
}
