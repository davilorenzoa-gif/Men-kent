import { Bell, Boxes, CheckCheck, LogOut, Menu, Moon, ReceiptText, Search, Settings, Sun, User, Users } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import type { Notificacao, Pedido, Produto } from '../lib/data'
import { moeda } from '../lib/format'
import { useDismiss, usePopover } from '../lib/ui'
import type { Vista } from './Sidebar'

const TITULOS: Record<Vista, string> = {
  visao: 'Visão geral',
  pedidos: 'Pedidos',
  clientes: 'Clientes',
  produtos: 'Produtos',
  config: 'Configurações',
}

const COR_NOTIF: Record<Notificacao['tipo'], string> = {
  estoque: 'var(--warn)',
  pedido: 'var(--info)',
  pagamento: 'var(--ok)',
  meta: 'var(--accent-2)',
}

interface Props {
  vista: Vista
  ir: (v: Vista) => void
  abrirMenu: () => void
  pedidos: Pedido[]
  produtos: Produto[]
  notificacoes: Notificacao[]
  lerNotificacao: (id: string) => void
  lerTodas: () => void
  tema: 'dark' | 'light'
  alternarTema: () => void
  buscarPedidos: (termo: string) => void
  sair: () => void
}

export function Topbar(p: Props) {
  return (
    <header className="sticky top-0 z-40 -mx-4 mb-5 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 md:pt-3">
      <div className="glass flex h-16 items-center gap-2 px-2.5 sm:gap-3 sm:px-3">
        <button className="icon-btn md:hidden" onClick={p.abrirMenu} aria-label="Abrir menu">
          <Menu size={20} />
        </button>
        <h1 className="truncate pl-1 text-[15px] font-semibold tracking-tight sm:text-base">{TITULOS[p.vista]}</h1>
        <div className="flex-1" />
        <Busca {...p} />
        <button
          className="icon-btn hidden sm:inline-grid"
          onClick={p.alternarTema}
          aria-label={p.tema === 'dark' ? 'Usar tema claro' : 'Usar tema escuro'}
        >
          {p.tema === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
        </button>
        <Notificacoes {...p} />
        <Perfil {...p} />
      </div>
    </header>
  )
}

function Busca({ pedidos, produtos, ir, buscarPedidos }: Props) {
  const [termo, setTermo] = useState('')
  const [aberta, setAberta] = useState(false)
  const [mobile, setMobile] = useState(false)
  const caixa = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const refs = useRef([caixa]).current
  useDismiss(aberta || mobile, () => {
    setAberta(false)
    setMobile(false)
  }, refs)

  const t = termo.trim().toLowerCase()
  const res = useMemo(() => {
    if (!t) return null
    const ped = pedidos.filter((x) => x.id.includes(t) || x.cliente.toLowerCase().includes(t)).slice(0, 4)
    const nomes = [...new Set(pedidos.map((x) => x.cliente))].filter((n) => n.toLowerCase().includes(t)).slice(0, 3)
    const prod = produtos.filter((x) => x.nome.toLowerCase().includes(t) || x.sku.toLowerCase().includes(t)).slice(0, 3)
    return { ped, nomes, prod }
  }, [t, pedidos, produtos])

  const abrirPedidos = (q: string) => {
    buscarPedidos(q)
    ir('pedidos')
    setTermo('')
    setAberta(false)
    setMobile(false)
  }
  const vazio = res && !res.ped.length && !res.nomes.length && !res.prod.length

  return (
    <div
      ref={caixa}
      className={
        mobile
          ? 'absolute inset-x-1.5 top-1/2 z-10 -translate-y-1/2 rounded-[14px] bg-[var(--bg)] p-1 sm:relative sm:inset-auto sm:translate-y-0 sm:bg-transparent sm:p-0'
          : 'relative'
      }
    >
      {!mobile && (
        <button
          className="icon-btn sm:hidden"
          aria-label="Buscar"
          onClick={() => {
            setMobile(true)
            setTimeout(() => input.current?.focus(), 0)
          }}
        >
          <Search size={19} />
        </button>
      )}
      <form
        role="search"
        className={`${mobile ? 'flex' : 'hidden sm:flex'} relative items-center`}
        onSubmit={(e) => {
          e.preventDefault()
          if (t) abrirPedidos(termo.trim())
        }}
      >
        <Search size={17} className="pointer-events-none absolute left-3 text-[var(--ink-3)]" aria-hidden />
        <input
          ref={input}
          value={termo}
          onChange={(e) => {
            setTermo(e.target.value)
            setAberta(true)
          }}
          onFocus={() => setAberta(true)}
          placeholder="Buscar pedido ou cliente"
          aria-label="Buscar pedido, cliente ou produto"
          className="field !h-10 !rounded-[12px] pl-9 sm:w-[260px] lg:w-[320px]"
        />
      </form>

      {aberta && res && (
        <div className="glass-pop pop-in absolute top-[calc(100%+10px)] right-0 left-0 z-50 overflow-hidden p-1.5 sm:left-auto sm:w-[360px]">
          {vazio && <p className="px-3 py-4 text-sm text-[var(--ink-3)]">Nada encontrado para “{termo}”.</p>}
          {!!res.ped.length && (
            <Grupo titulo="Pedidos">
              {res.ped.map((x) => (
                <Linha key={x.id} onClick={() => abrirPedidos(x.id)} Icone={ReceiptText}>
                  <span className="num">{x.id}</span> · {x.cliente}
                  <span className="num ml-auto text-[var(--ink-3)]">{moeda(x.valor)}</span>
                </Linha>
              ))}
            </Grupo>
          )}
          {!!res.nomes.length && (
            <Grupo titulo="Clientes">
              {res.nomes.map((n) => (
                <Linha key={n} onClick={() => abrirPedidos(n)} Icone={Users}>
                  {n}
                  <span className="ml-auto text-xs text-[var(--ink-3)]">ver pedidos</span>
                </Linha>
              ))}
            </Grupo>
          )}
          {!!res.prod.length && (
            <Grupo titulo="Produtos">
              {res.prod.map((x) => (
                <Linha
                  key={x.sku}
                  onClick={() => {
                    ir('produtos')
                    setAberta(false)
                    setMobile(false)
                  }}
                  Icone={Boxes}
                >
                  {x.nome}
                  <span className="num ml-auto text-xs text-[var(--ink-3)]">{x.sku}</span>
                </Linha>
              ))}
            </Grupo>
          )}
        </div>
      )}
    </div>
  )
}

function Grupo({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="py-1">
      <div className="eyebrow px-3 pt-1.5 pb-1">{titulo}</div>
      {children}
    </div>
  )
}
function Linha({
  onClick,
  Icone,
  children,
}: {
  onClick: () => void
  Icone: React.ComponentType<{ size?: number; className?: string }>
  children: React.ReactNode
}) {
  return (
    <button onClick={onClick} className="flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2 text-left text-sm hover:bg-[var(--glass-3)]">
      <Icone size={16} className="shrink-0 text-[var(--ink-3)]" />
      {children}
    </button>
  )
}

function Notificacoes({ notificacoes, lerNotificacao, lerTodas }: Props) {
  const pop = usePopover()
  const naoLidas = notificacoes.filter((n) => !n.lida).length
  return (
    <div className="relative">
      <button
        ref={pop.btn}
        className="icon-btn relative"
        onClick={pop.toggle}
        aria-expanded={pop.open}
        aria-label={`Notificações${naoLidas ? `, ${naoLidas} não lidas` : ''}`}
      >
        <Bell size={19} />
        {naoLidas > 0 && (
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[var(--bad)] ring-2 ring-[var(--bg)]" aria-hidden />
        )}
      </button>
      {pop.open && (
        <div
          ref={pop.panel}
          className="glass-pop pop-in fixed top-[calc(env(safe-area-inset-top)+84px)] right-3 left-3 z-50 p-1.5 sm:absolute sm:top-[calc(100%+14px)] sm:right-0 sm:left-auto sm:w-[360px]"
        >
          <div className="flex items-center justify-between px-3 pt-2 pb-1.5">
            <span className="text-sm font-semibold">Notificações</span>
            <button
              onClick={lerTodas}
              disabled={!naoLidas}
              className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-[var(--accent)] hover:bg-[var(--glass-3)] disabled:opacity-40"
            >
              <CheckCheck size={14} /> Marcar todas como lidas
            </button>
          </div>
          <ul>
            {notificacoes.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => lerNotificacao(n.id)}
                  className="flex w-full gap-3 rounded-[10px] px-3 py-2.5 text-left hover:bg-[var(--glass-3)]"
                >
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ background: n.lida ? 'transparent' : COR_NOTIF[n.tipo] }} />
                  <span className="min-w-0 flex-1">
                    <span className={`block text-sm ${n.lida ? 'text-[var(--ink-2)]' : 'font-medium'}`}>{n.titulo}</span>
                    <span className="block text-[13px] leading-snug text-[var(--ink-3)]">{n.texto}</span>
                  </span>
                  <span className="shrink-0 text-xs text-[var(--ink-3)]">{n.quando}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function Perfil({ ir, tema, alternarTema, sair }: Props) {
  const pop = usePopover()
  const opc = 'flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2 text-left text-sm hover:bg-[var(--glass-3)]'
  return (
    <div className="relative">
      <button
        ref={pop.btn}
        onClick={pop.toggle}
        aria-expanded={pop.open}
        aria-label="Menu do perfil"
        className="flex h-10 items-center gap-2.5 rounded-[12px] pr-1 pl-1 hover:bg-[var(--glass-2)] lg:pr-3"
      >
        <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] text-xs font-semibold text-[var(--accent-ink)]">
          MA
        </span>
        <span className="hidden text-left leading-tight lg:block">
          <span className="block text-sm font-medium">Marina Alves</span>
          <span className="block text-xs text-[var(--ink-3)]">Gerente</span>
        </span>
      </button>
      {pop.open && (
        <div ref={pop.panel} className="glass-pop pop-in absolute top-[calc(100%+14px)] right-0 z-50 w-56 p-1.5">
          <div className="px-3 pt-2 pb-2.5">
            <div className="text-sm font-medium">Marina Alves</div>
            <div className="text-xs text-[var(--ink-3)]">marina@casaaurora.demo</div>
          </div>
          <div className="my-1 h-px bg-[var(--line)]" />
          <button
            className={opc}
            onClick={() => {
              ir('config')
              pop.close()
            }}
          >
            <User size={16} /> Meu perfil
          </button>
          <button
            className={opc}
            onClick={() => {
              ir('config')
              pop.close()
            }}
          >
            <Settings size={16} /> Configurações
          </button>
          <button className={opc} onClick={alternarTema}>
            {tema === 'dark' ? <Sun size={16} /> : <Moon size={16} />} Tema {tema === 'dark' ? 'claro' : 'escuro'}
          </button>
          <div className="my-1 h-px bg-[var(--line)]" />
          <button
            className={`${opc} text-[var(--bad)]`}
            onClick={() => {
              pop.close()
              sair()
            }}
          >
            <LogOut size={16} /> Sair
          </button>
        </div>
      )}
    </div>
  )
}
