import { AlertTriangle, Check, Link2, Pencil, Plus, ReceiptText, Target, Truck } from 'lucide-react'
import { useState } from 'react'
import type { Pedido, Produto } from '../lib/data'
import { moeda, moedaCurta } from '../lib/format'

export function AcoesRapidas({
  novoPedido,
  copiarLink,
  irPendentes,
  pendentes,
}: {
  novoPedido: () => void
  copiarLink: () => void
  irPendentes: () => void
  pendentes: number
}) {
  const acoes = [
    { rotulo: 'Novo pedido', sub: 'Lançar venda manual', Icone: Plus, onClick: novoPedido, destaque: true },
    { rotulo: 'Pendentes', sub: `${pendentes} aguardando`, Icone: ReceiptText, onClick: irPendentes },
    { rotulo: 'Copiar link', sub: 'Deste relatório', Icone: Link2, onClick: copiarLink },
  ]
  return (
    <article className="glass rise p-4 sm:p-5" style={{ ['--i' as string]: 8 }}>
      <h2 className="text-[15px] font-semibold tracking-tight">Ações rápidas</h2>
      <div className="mt-4 grid grid-cols-[repeat(3,minmax(0,1fr))] gap-2">
        {acoes.map((a) => (
          <button
            key={a.rotulo}
            onClick={a.onClick}
            className={`group flex flex-col items-start gap-2.5 rounded-[14px] border p-3 text-left transition-colors ${
              a.destaque
                ? 'border-transparent bg-[color-mix(in_srgb,var(--accent)_16%,transparent)] hover:bg-[color-mix(in_srgb,var(--accent)_24%,transparent)]'
                : 'border-[var(--line)] bg-[var(--glass-1)] hover:bg-[var(--glass-2)]'
            }`}
          >
            <span
              className={`grid h-8 w-8 place-items-center rounded-[10px] ${
                a.destaque ? 'bg-[var(--accent)] text-[var(--accent-ink)]' : 'bg-[var(--glass-2)] text-[var(--ink-2)]'
              }`}
            >
              <a.Icone size={16} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[13px] font-medium">{a.rotulo}</span>
              <span className="block truncate text-[11px] text-[var(--ink-3)]">{a.sub}</span>
            </span>
          </button>
        ))}
      </div>
    </article>
  )
}

export function Meta({ realizado, meta, setMeta }: { realizado: number; meta: number; setMeta: (v: number) => void }) {
  const [editando, setEditando] = useState(false)
  const [rascunho, setRascunho] = useState(String(meta))
  const parte = Math.min(1, realizado / meta)
  const R = 46
  const C = 2 * Math.PI * R
  const salvar = () => {
    const v = Number(rascunho.replace(/\D/g, ''))
    if (v > 0) setMeta(v)
    setEditando(false)
  }
  return (
    <article className="glass rise p-4 sm:p-5" style={{ ['--i' as string]: 9 }}>
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-[15px] font-semibold tracking-tight">
          <Target size={16} style={{ color: 'var(--accent-2)' }} /> Meta de outubro
        </h2>
        {!editando && (
          <button
            className="icon-btn !h-8 !w-8"
            onClick={() => {
              setRascunho(String(meta))
              setEditando(true)
            }}
            aria-label="Editar meta"
          >
            <Pencil size={15} />
          </button>
        )}
      </div>
      <div className="mt-4 flex items-center gap-5">
        <div className="relative h-[112px] w-[112px] shrink-0">
          <svg viewBox="0 0 112 112" className="-rotate-90" aria-hidden>
            <circle cx="56" cy="56" r={R} fill="none" strokeWidth="10" style={{ stroke: 'var(--line)' }} />
            <circle
              cx="56"
              cy="56"
              r={R}
              fill="none"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - parte)}
              style={{ stroke: 'var(--accent-2)', transition: 'stroke-dashoffset .8s cubic-bezier(.2,.7,.2,1)' }}
            />
          </svg>
          <div className="num absolute inset-0 grid place-items-center text-xl font-medium">{Math.round(parte * 100)}%</div>
        </div>
        <div className="min-w-0 flex-1">
          {editando ? (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                salvar()
              }}
              className="flex flex-col gap-2"
            >
              <label className="text-xs text-[var(--ink-3)]" htmlFor="meta">
                Nova meta (R$)
              </label>
              <input id="meta" inputMode="numeric" className="field !h-10" value={rascunho} onChange={(e) => setRascunho(e.target.value)} />
              <div className="flex gap-2">
                <button type="submit" className="btn btn-primary !h-9 flex-1">
                  <Check size={15} /> Salvar
                </button>
                <button type="button" className="btn !h-9" onClick={() => setEditando(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="num text-lg font-medium">{moedaCurta(realizado)}</div>
              <div className="text-[13px] text-[var(--ink-3)]">de {moedaCurta(meta)}</div>
              <div className="mt-3 text-[13px] text-[var(--ink-2)]">
                {realizado >= meta ? 'Meta batida. Bora subir?' : <>Faltam <span className="num">{moedaCurta(meta - realizado)}</span> em 5 dias.</>}
              </div>
            </>
          )}
        </div>
      </div>
    </article>
  )
}

export function Avisos({
  produtos,
  pedidos,
  repor,
  irPedidos,
}: {
  produtos: Produto[]
  pedidos: Pedido[]
  repor: (sku: string) => void
  irPedidos: () => void
}) {
  const baixos = produtos.filter((p) => p.estoque < p.minimo)
  const atrasados = pedidos.filter((p) => p.status === 'pago' && p.dia >= 1)
  return (
    <article className="glass rise p-4 sm:p-5" style={{ ['--i' as string]: 10 }}>
      <h2 className="text-[15px] font-semibold tracking-tight">Precisa de atenção</h2>
      <ul className="mt-3 flex flex-col gap-2">
        {baixos.map((p) => (
          <li key={p.sku} className="glass-inset flex items-center gap-3 p-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px]" style={{ background: 'color-mix(in srgb, var(--warn) 16%, transparent)', color: 'var(--warn)' }}>
              <AlertTriangle size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-medium">{p.nome}</div>
              <div className="text-xs text-[var(--ink-3)]">
                <span className="num">{p.estoque}</span> em estoque · mínimo <span className="num">{p.minimo}</span>
              </div>
            </div>
            <button className="btn !h-8 !px-3 text-xs" onClick={() => repor(p.sku)}>
              Repor
            </button>
          </li>
        ))}
        {atrasados.length > 0 && (
          <li className="glass-inset flex items-center gap-3 p-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px]" style={{ background: 'color-mix(in srgb, var(--info) 16%, transparent)', color: 'var(--info)' }}>
              <Truck size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-medium">
                <span className="num">{atrasados.length}</span> {atrasados.length === 1 ? 'pedido pago' : 'pedidos pagos'} sem envio
              </div>
              <div className="text-xs text-[var(--ink-3)]">
                Somam <span className="num">{moeda(atrasados.reduce((s, p) => s + p.valor, 0))}</span>
              </div>
            </div>
            <button className="btn !h-8 !px-3 text-xs" onClick={irPedidos}>
              Ver
            </button>
          </li>
        )}
        {!baixos.length && !atrasados.length && (
          <li className="py-6 text-center text-sm text-[var(--ink-3)]">Tudo em dia por aqui.</li>
        )}
      </ul>
    </article>
  )
}
