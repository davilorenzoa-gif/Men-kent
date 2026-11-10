import { ArrowDownUp, ChevronLeft, ChevronRight, Download, MoreHorizontal, Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { STATUS_INFO, type Pedido, type Status } from '../lib/data'
import { iniciais, moeda, quando } from '../lib/format'
import { usePopover } from '../lib/ui'

type Filtro = 'todos' | Status
type Ordem = 'recentes' | 'maior' | 'menor'

const FILTROS: { id: Filtro; rotulo: string }[] = [
  { id: 'todos', rotulo: 'Todos' },
  { id: 'pendente', rotulo: 'Pendentes' },
  { id: 'pago', rotulo: 'Pagos' },
  { id: 'enviado', rotulo: 'Enviados' },
  { id: 'cancelado', rotulo: 'Cancelados' },
]

function StatusPill({ s }: { s: Status }) {
  return (
    <span className="pill" style={{ ['--c' as string]: STATUS_INFO[s].cor }}>
      {STATUS_INFO[s].rotulo}
    </span>
  )
}

function Acoes({ p, mudar }: { p: Pedido; mudar: (id: string, s: Status) => void }) {
  const pop = usePopover()
  const opcoes: { s: Status; rotulo: string }[] = [
    { s: 'pago', rotulo: 'Marcar como pago' },
    { s: 'enviado', rotulo: 'Marcar como enviado' },
    { s: 'pendente', rotulo: 'Voltar para pendente' },
    { s: 'cancelado', rotulo: 'Cancelar pedido' },
  ]
  return (
    <div className="relative">
      <button ref={pop.btn} className="icon-btn !h-9 !w-9" onClick={pop.toggle} aria-expanded={pop.open} aria-label={`Ações do pedido ${p.id}`}>
        <MoreHorizontal size={18} />
      </button>
      {pop.open && (
        <div ref={pop.panel} className="glass-pop pop-in absolute top-[calc(100%+6px)] right-0 z-30 w-52 p-1.5">
          {opcoes
            .filter((o) => o.s !== p.status)
            .map((o) => (
              <button
                key={o.s}
                onClick={() => {
                  mudar(p.id, o.s)
                  pop.close()
                }}
                className={`flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2 text-left text-sm hover:bg-[var(--glass-3)] ${
                  o.s === 'cancelado' ? 'text-[var(--bad)]' : ''
                }`}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: STATUS_INFO[o.s].cor }} />
                {o.rotulo}
              </button>
            ))}
        </div>
      )}
    </div>
  )
}

function exportarCSV(linhas: Pedido[]) {
  const cab = ['Pedido', 'Cliente', 'Cidade', 'Canal', 'Pagamento', 'Itens', 'Valor', 'Status', 'Quando']
  const esc = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`
  const corpo = linhas.map((p) =>
    [p.id, p.cliente, p.cidade, p.canal, p.pagamento, p.itens, p.valor.toFixed(2).replace('.', ','), STATUS_INFO[p.status].rotulo, quando(p.dia, p.hora)]
      .map(esc)
      .join(';'),
  )
  const blob = new Blob(['﻿' + [cab.map(esc).join(';'), ...corpo].join('\n')], { type: 'text/csv;charset=utf-8' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'pedidos-vitra.csv'
  a.click()
  setTimeout(() => URL.revokeObjectURL(a.href), 1000)
}

export function TabelaPedidos({
  pedidos,
  mudarStatus,
  termo,
  setTermo,
  compacta,
  verTodos,
  avisar,
}: {
  pedidos: Pedido[]
  mudarStatus: (id: string, s: Status) => void
  termo: string
  setTermo: (t: string) => void
  compacta?: boolean
  verTodos?: () => void
  avisar: (t: string) => void
}) {
  const [filtro, setFiltro] = useState<Filtro>('todos')
  const [ordem, setOrdem] = useState<Ordem>('recentes')
  const [pagina, setPagina] = useState(0)
  const porPagina = compacta ? 8 : 10

  const contagem = useMemo(() => {
    const c: Record<Filtro, number> = { todos: pedidos.length, pago: 0, pendente: 0, enviado: 0, cancelado: 0 }
    pedidos.forEach((p) => c[p.status]++)
    return c
  }, [pedidos])

  const linhas = useMemo(() => {
    const t = termo.trim().toLowerCase()
    let l = pedidos.filter((p) => (filtro === 'todos' || p.status === filtro) && (!t || p.id.includes(t) || p.cliente.toLowerCase().includes(t)))
    if (ordem === 'maior') l = [...l].sort((a, b) => b.valor - a.valor)
    if (ordem === 'menor') l = [...l].sort((a, b) => a.valor - b.valor)
    return l
  }, [pedidos, filtro, ordem, termo])

  const paginas = Math.max(1, Math.ceil(linhas.length / porPagina))
  const pag = Math.min(pagina, paginas - 1)
  const visiveis = linhas.slice(pag * porPagina, pag * porPagina + porPagina)
  const proxOrdem: Record<Ordem, Ordem> = { recentes: 'maior', maior: 'menor', menor: 'recentes' }
  const rotuloOrdem: Record<Ordem, string> = { recentes: 'Mais recentes', maior: 'Maior valor', menor: 'Menor valor' }

  return (
    <article className="glass rise flex min-w-0 flex-col focus-within:z-20" style={{ ['--i' as string]: 7 }}>
      <header className="flex flex-col gap-3 p-4 pb-3 sm:p-5 sm:pb-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-[15px] font-semibold tracking-tight">{compacta ? 'Atividade recente' : 'Todos os pedidos'}</h2>
            <p className="mt-0.5 text-[13px] text-[var(--ink-3)]">
              {linhas.length} {linhas.length === 1 ? 'pedido' : 'pedidos'}
              {termo && <> para “{termo}”</>}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {!compacta && (
              <div className="relative hidden sm:block">
                <Search size={16} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[var(--ink-3)]" />
                <input
                  value={termo}
                  onChange={(e) => {
                    setTermo(e.target.value)
                    setPagina(0)
                  }}
                  placeholder="Filtrar por cliente ou nº"
                  aria-label="Filtrar pedidos"
                  className="field !h-10 w-56 pl-9"
                />
              </div>
            )}
            <button className="btn" onClick={() => setOrdem(proxOrdem[ordem])} title="Mudar ordenação">
              <ArrowDownUp size={16} /> <span className="hidden sm:inline">{rotuloOrdem[ordem]}</span>
            </button>
            <button
              className="btn"
              onClick={() => {
                exportarCSV(linhas)
                avisar(`${linhas.length} pedidos exportados em CSV`)
              }}
            >
              <Download size={16} /> <span className="hidden sm:inline">CSV</span>
            </button>
          </div>
        </div>
        {termo && (
          <button onClick={() => setTermo('')} className="pill self-start !h-7 !pr-1.5" style={{ ['--c' as string]: 'var(--accent)' }}>
            Busca: {termo} <X size={14} />
          </button>
        )}
        <div className="scroll-thin -mx-1 overflow-x-auto px-1 pb-1">
          <div className="seg" role="group" aria-label="Filtrar por status">
            {FILTROS.map((f) => (
              <button
                key={f.id}
                aria-pressed={filtro === f.id}
                onClick={() => {
                  setFiltro(f.id)
                  setPagina(0)
                }}
              >
                {f.rotulo} <span className="num ml-1 text-[var(--ink-3)]">{contagem[f.id]}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* desktop / tablet: tabela */}
      <div className="hidden md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-y border-[var(--line)] text-left text-xs text-[var(--ink-3)]">
              <th className="py-2.5 pl-5 font-medium">Pedido</th>
              <th className="py-2.5 font-medium">Cliente</th>
              <th className="hidden py-2.5 font-medium xl:table-cell">Canal</th>
              <th className="hidden py-2.5 font-medium lg:table-cell">Pagamento</th>
              <th className="py-2.5 font-medium">Status</th>
              <th className="py-2.5 text-right font-medium">Valor</th>
              <th className="py-2.5 pr-3 pl-2" aria-label="Ações" />
            </tr>
          </thead>
          <tbody>
            {visiveis.map((p) => (
              <tr key={p.id} className="border-b border-[var(--line)] transition-colors last:border-0 hover:bg-[var(--glass-1)]">
                <td className="py-3 pl-5">
                  <div className="num font-medium">{p.id}</div>
                  <div className="text-xs text-[var(--ink-3)]">{quando(p.dia, p.hora)}</div>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2.5">
                    <span className="glass-inset grid h-8 w-8 shrink-0 place-items-center !rounded-full text-[11px] font-medium text-[var(--ink-2)]">
                      {iniciais(p.cliente)}
                    </span>
                    <div className="min-w-0">
                      <div className="truncate">{p.cliente}</div>
                      <div className="text-xs text-[var(--ink-3)]">{p.cidade}</div>
                    </div>
                  </div>
                </td>
                <td className="hidden py-3 text-[var(--ink-2)] xl:table-cell">{p.canal}</td>
                <td className="hidden py-3 text-[var(--ink-2)] lg:table-cell">{p.pagamento}</td>
                <td className="py-3">
                  <StatusPill s={p.status} />
                </td>
                <td className="num py-3 text-right">{moeda(p.valor)}</td>
                <td className="py-3 pr-3 pl-2 text-right">
                  <Acoes p={p} mudar={mudarStatus} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* celular: cartões */}
      <ul className="flex flex-col gap-2 px-3 md:hidden">
        {visiveis.map((p) => (
          <li key={p.id} className="glass-inset flex items-center gap-3 p-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="num text-sm font-medium">{p.id}</span>
                <StatusPill s={p.status} />
              </div>
              <div className="mt-1 truncate text-sm text-[var(--ink-2)]">{p.cliente}</div>
              <div className="text-xs text-[var(--ink-3)]">
                {quando(p.dia, p.hora)} · {p.pagamento}
              </div>
            </div>
            <div className="num shrink-0 text-right text-sm">{moeda(p.valor)}</div>
            <Acoes p={p} mudar={mudarStatus} />
          </li>
        ))}
      </ul>

      {!visiveis.length && <p className="px-5 py-10 text-center text-sm text-[var(--ink-3)]">Nenhum pedido com esse filtro.</p>}

      <footer className="flex items-center justify-between gap-3 p-4 pt-3 sm:px-5">
        {compacta && verTodos ? (
          <button onClick={verTodos} className="text-sm font-medium text-[var(--accent)] hover:underline">
            Ver todos os pedidos
          </button>
        ) : (
          <span className="text-xs text-[var(--ink-3)]">
            Página {pag + 1} de {paginas}
          </span>
        )}
        <div className="flex items-center gap-1">
          <button className="icon-btn disabled:opacity-30" disabled={pag === 0} onClick={() => setPagina(pag - 1)} aria-label="Página anterior">
            <ChevronLeft size={18} />
          </button>
          <button
            className="icon-btn disabled:opacity-30"
            disabled={pag >= paginas - 1}
            onClick={() => setPagina(pag + 1)}
            aria-label="Próxima página"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </footer>
    </article>
  )
}
