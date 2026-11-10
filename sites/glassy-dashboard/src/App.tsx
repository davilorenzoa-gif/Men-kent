import { CalendarDays, LogIn } from 'lucide-react'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { GraficoReceita, OrigemReceita } from './components/Graficos'
import { AcoesRapidas, Avisos, Meta } from './components/Lateral'
import { Metricas } from './components/Metricas'
import { TabelaPedidos } from './components/Pedidos'
import { Gaveta, Sidebar, type Vista } from './components/Sidebar'
import { NovoPedido, TelaClientes, TelaConfig, TelaProdutos, type Prefs } from './components/Telas'
import { Topbar } from './components/Topbar'
import {
  HOJE,
  NOTIFICACOES_INICIAIS,
  PEDIDOS_INICIAIS,
  PRODUTOS_INICIAIS,
  SERIE,
  STATUS_INFO,
  type Periodo,
  type Status,
} from './lib/data'
import { moeda, moedaCurta } from './lib/format'
import { lerPref, salvarPref, Toasts, type Toast } from './lib/ui'

const PADRAO: Prefs = { tema: 'dark', blur: 'medio', movimento: true, resumoDiario: true }
const VISTAS: Vista[] = ['visao', 'pedidos', 'clientes', 'produtos', 'config']

function lerURL() {
  const q = new URLSearchParams(location.search)
  const p = Number(q.get('periodo'))
  const v = q.get('vista') as Vista | null
  return {
    periodo: ([7, 30, 90] as const).includes(p as Periodo) ? (p as Periodo) : null,
    vista: v && VISTAS.includes(v) ? v : null,
  }
}

export default function App() {
  const url = useRef(lerURL()).current
  const [vista, setVista] = useState<Vista>(url.vista ?? 'visao')
  const [periodo, setPeriodo] = useState<Periodo>(url.periodo ?? lerPref<Periodo>('vitra.periodo', 30))
  const [prefs, setPrefs] = useState<Prefs>(() => ({ ...PADRAO, ...lerPref<Partial<Prefs>>('vitra.prefs', {}) }))
  const [meta, setMetaState] = useState(() => lerPref('vitra.meta', 260000))
  const [pedidos, setPedidos] = useState(PEDIDOS_INICIAIS)
  const [produtos, setProdutos] = useState(PRODUTOS_INICIAIS)
  const [notificacoes, setNotificacoes] = useState(NOTIFICACOES_INICIAIS)
  const [termo, setTermo] = useState('')
  const [toasts, setToasts] = useState<Toast[]>([])
  const [modal, setModal] = useState(false)
  const [gaveta, setGaveta] = useState(false)
  const [saiu, setSaiu] = useState(false)

  // aplica tema antes da pintura (os gráficos leem os tokens depois, no useEffect deles)
  useLayoutEffect(() => {
    const el = document.documentElement
    el.dataset.theme = prefs.tema
    el.dataset.blur = prefs.blur
    el.dataset.motion = prefs.movimento ? 'on' : 'off'
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', prefs.tema === 'dark' ? '#070a14' : '#eef1f8')
    salvarPref('vitra.prefs', prefs)
  }, [prefs])

  useEffect(() => salvarPref('vitra.periodo', periodo), [periodo])

  const avisar = useCallback((texto: string, tipo: Toast['tipo'] = 'ok') => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t.slice(-2), { id, texto, tipo }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3800)
  }, [])

  // resumo do dia ao abrir
  useEffect(() => {
    if (!prefs.resumoDiario) return
    const hoje = SERIE[SERIE.length - 1]
    const t = setTimeout(() => avisar(`Hoje até agora: ${hoje.pedidos} pedidos, ${moedaCurta(hoje.receita)}`, 'info'), 900)
    return () => clearTimeout(t)
    // só na abertura
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const ir = useCallback((v: Vista) => {
    setVista(v)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const mudarStatus = (id: string, s: Status) => {
    setPedidos((ps) => ps.map((p) => (p.id === id ? { ...p, status: s } : p)))
    avisar(`Pedido ${id} agora está ${STATUS_INFO[s].rotulo.toLowerCase()}`)
  }

  const repor = (sku: string) => {
    const p = produtos.find((x) => x.sku === sku)!
    const novo = Math.max(p.estoque, p.minimo * 2)
    setProdutos((ps) => ps.map((x) => (x.sku === sku ? { ...x, estoque: novo } : x)))
    setNotificacoes((ns) => ns.map((n) => (n.tipo === 'estoque' && n.texto.startsWith(p.nome) ? { ...n, lida: true } : n)))
    avisar(`Pedido de reposição enviado: ${p.nome} (+${novo - p.estoque})`)
  }

  const copiarLink = async () => {
    const u = new URL(location.href)
    u.search = `?vista=${vista}&periodo=${periodo}`
    try {
      await navigator.clipboard.writeText(u.toString())
      avisar('Link do relatório copiado')
    } catch {
      avisar('Não deu pra copiar automaticamente neste navegador', 'info')
    }
  }

  const pendentes = pedidos.filter((p) => p.status === 'pendente').length

  const realizadoMes = useMemo(() => {
    const base = SERIE.filter((d) => d.data.getMonth() === HOJE.getMonth() && d.data.getFullYear() === HOJE.getFullYear()).reduce(
      (s, d) => s + d.receita,
      0,
    )
    // pedidos lançados aqui também contam pra meta
    const extras = pedidos.filter((p) => p.id.startsWith('#49') && p.status !== 'cancelado').reduce((s, p) => s + p.valor, 0)
    return base + extras
  }, [pedidos])

  const setMeta = (v: number) => {
    setMetaState(v)
    salvarPref('vitra.meta', v)
    avisar(`Meta atualizada para ${moedaCurta(v)}`)
  }

  const prox = useRef(4901)
  const criarPedido: React.ComponentProps<typeof NovoPedido>['criar'] = (p) => {
    const agora = new Date()
    const id = `#${prox.current++}`
    setPedidos((ps) => [{ ...p, id, dia: 0, hora: agora.toTimeString().slice(0, 5) }, ...ps])
    avisar(`Pedido ${id} lançado · ${moeda(p.valor)}`)
  }

  const verPedidosDe = (t: string) => {
    setTermo(t)
    ir('pedidos')
  }

  if (saiu) {
    return (
      <div className="relative grid min-h-dvh place-items-center p-4">
        <div className="ambient" aria-hidden>
          <i />
          <i />
          <i />
        </div>
        <div className="glass rise relative w-full max-w-sm p-6 text-center">
          <h1 className="text-lg font-semibold tracking-tight">Você saiu do painel</h1>
          <p className="mt-2 text-sm text-[var(--ink-3)]">É uma demonstração, então dá pra entrar de novo sem senha.</p>
          <button className="btn btn-primary mt-5 w-full" onClick={() => setSaiu(false)}>
            <LogIn size={16} /> Entrar de novo
          </button>
        </div>
      </div>
    )
  }

  const periodoSeg = (
    <div className="seg" role="group" aria-label="Período">
      {([7, 30, 90] as Periodo[]).map((p) => (
        <button key={p} aria-pressed={periodo === p} onClick={() => setPeriodo(p)}>
          {p} dias
        </button>
      ))}
    </div>
  )

  return (
    <div className="relative min-h-dvh">
      <div className="ambient" aria-hidden>
        <i />
        <i />
        <i />
      </div>

      <Sidebar vista={vista} ir={ir} pendentes={pendentes} />
      <Gaveta aberta={gaveta} fechar={() => setGaveta(false)} vista={vista} ir={ir} pendentes={pendentes} />

      <div className="relative z-10 px-4 pb-10 sm:px-6 md:pr-3 md:pl-[96px] lg:pl-[272px]">
        <div className="mx-auto max-w-[1360px]">
          <Topbar
            vista={vista}
            ir={ir}
            abrirMenu={() => setGaveta(true)}
            pedidos={pedidos}
            produtos={produtos}
            notificacoes={notificacoes}
            lerNotificacao={(id) => setNotificacoes((ns) => ns.map((n) => (n.id === id ? { ...n, lida: true } : n)))}
            lerTodas={() => setNotificacoes((ns) => ns.map((n) => ({ ...n, lida: true })))}
            tema={prefs.tema}
            alternarTema={() => setPrefs((p) => ({ ...p, tema: p.tema === 'dark' ? 'light' : 'dark' }))}
            buscarPedidos={setTermo}
            sair={() => setSaiu(true)}
          />

          <main key={vista} className="flex flex-col gap-4">
            {vista === 'visao' && (
              <>
                <section className="rise flex flex-col gap-4 pt-1 pb-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="flex items-center gap-1.5 text-[13px] text-[var(--ink-3)]">
                      <CalendarDays size={14} />
                      {HOJE.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </p>
                    <h2 className="mt-1.5 text-[26px] leading-tight font-semibold tracking-[-0.02em] sm:text-[32px]">Bom dia, Marina.</h2>
                    <p className="mt-1 max-w-[52ch] text-sm text-[var(--ink-2)]">
                      {pendentes > 0 ? (
                        <>
                          Tem{' '}
                          <button className="font-medium text-[var(--accent)] hover:underline" onClick={() => ir('pedidos')}>
                            {pendentes} {pendentes === 1 ? 'pedido pendente' : 'pedidos pendentes'}
                          </button>{' '}
                          esperando você. O resto está andando bem.
                        </>
                      ) : (
                        'Nenhum pedido pendente. Tudo andando.'
                      )}
                    </p>
                  </div>
                  {periodoSeg}
                </section>

                <Metricas periodo={periodo} />

                <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[repeat(3,minmax(0,1fr))]">
                  <GraficoReceita periodo={periodo} tema={prefs.tema} />
                  <OrigemReceita periodo={periodo} tema={prefs.tema} />
                </div>

                <div className="grid grid-cols-[minmax(0,1fr)] gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                  <TabelaPedidos
                    pedidos={pedidos}
                    mudarStatus={mudarStatus}
                    termo=""
                    setTermo={verPedidosDe}
                    compacta
                    verTodos={() => ir('pedidos')}
                    avisar={avisar}
                  />
                  <div className="grid grid-cols-[minmax(0,1fr)] content-start gap-4 md:grid-cols-[repeat(2,minmax(0,1fr))] xl:grid-cols-[minmax(0,1fr)]">
                    <AcoesRapidas
                      novoPedido={() => setModal(true)}
                      copiarLink={copiarLink}
                      irPendentes={() => ir('pedidos')}
                      pendentes={pendentes}
                    />
                    <Meta realizado={realizadoMes} meta={meta} setMeta={setMeta} />
                    <div className="md:col-span-2 xl:col-span-1">
                      <Avisos produtos={produtos} pedidos={pedidos} repor={repor} irPedidos={() => ir('pedidos')} />
                    </div>
                  </div>
                </div>
              </>
            )}

            {vista === 'pedidos' && (
              <>
                <section className="rise flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-[var(--ink-2)]">Mude o status pelo menu de cada linha. Exporta exatamente o que está filtrado.</p>
                  <button className="btn btn-primary" onClick={() => setModal(true)}>
                    Novo pedido
                  </button>
                </section>
                <TabelaPedidos pedidos={pedidos} mudarStatus={mudarStatus} termo={termo} setTermo={setTermo} avisar={avisar} />
              </>
            )}

            {vista === 'clientes' && <TelaClientes pedidos={pedidos} verPedidos={verPedidosDe} />}

            {vista === 'produtos' && <TelaProdutos produtos={produtos} repor={repor} />}

            {vista === 'config' && (
              <TelaConfig
                prefs={prefs}
                mudar={(p) => setPrefs((x) => ({ ...x, ...p }))}
                resetar={() => {
                  setPrefs(PADRAO)
                  setMetaState(260000)
                  salvarPref('vitra.meta', 260000)
                  avisar('Preferências restauradas')
                }}
              />
            )}
          </main>

          <footer className="mt-10 flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--ink-3)]">
            <span>Vitra · painel de demonstração com dados fictícios</span>
            <span>Feito pela GuDev</span>
          </footer>
        </div>
      </div>

      <NovoPedido aberto={modal} fechar={() => setModal(false)} criar={criarPedido} produtos={produtos} />
      <Toasts itens={toasts} remover={(id) => setToasts((t) => t.filter((x) => x.id !== id))} />
    </div>
  )
}
