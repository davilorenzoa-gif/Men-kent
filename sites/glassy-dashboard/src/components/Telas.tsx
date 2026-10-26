import { Minus, Plus, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { CANAIS, type Canal, type Pagamento, type Pedido, type Produto, type Status } from '../lib/data'
import { iniciais, inteiro, moeda, moedaCurta } from '../lib/format'
import { Modal } from '../lib/ui'

/* ---------- Novo pedido ---------- */
export function NovoPedido({
  aberto,
  fechar,
  criar,
  produtos,
}: {
  aberto: boolean
  fechar: () => void
  criar: (p: Omit<Pedido, 'id' | 'dia' | 'hora'>) => void
  produtos: Produto[]
}) {
  const [cliente, setCliente] = useState('')
  const [cidade, setCidade] = useState('São Paulo')
  const [sku, setSku] = useState(produtos[0].sku)
  const [qtd, setQtd] = useState(1)
  const [canal, setCanal] = useState<Canal>('WhatsApp')
  const [pagamento, setPagamento] = useState<Pagamento>('Pix')
  const [status, setStatus] = useState<Status>('pago')
  const [erro, setErro] = useState('')

  const prod = produtos.find((p) => p.sku === sku)!
  const unit = prod.receita / prod.vendidos
  const total = Math.round(unit * qtd * 100) / 100

  const enviar = (e: React.FormEvent) => {
    e.preventDefault()
    if (cliente.trim().length < 3) {
      setErro('Coloque o nome do cliente.')
      return
    }
    criar({ cliente: cliente.trim(), cidade, canal, pagamento, itens: qtd, valor: total, status })
    setCliente('')
    setQtd(1)
    setErro('')
    fechar()
  }

  const rot = 'mb-1.5 block text-xs text-[var(--ink-3)]'
  return (
    <Modal aberto={aberto} fechar={fechar} titulo="Novo pedido">
      <form onSubmit={enviar} className="grid grid-cols-[repeat(2,minmax(0,1fr))] gap-3.5" noValidate>
        <div className="col-span-2">
          <label className={rot} htmlFor="np-cliente">
            Cliente
          </label>
          <input
            id="np-cliente"
            className="field"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            placeholder="Nome e sobrenome"
            aria-invalid={!!erro}
            aria-describedby={erro ? 'np-erro' : undefined}
            autoComplete="off"
          />
          {erro && (
            <p id="np-erro" className="mt-1.5 text-xs" style={{ color: 'var(--bad)' }}>
              {erro}
            </p>
          )}
        </div>
        <div className="col-span-2">
          <label className={rot} htmlFor="np-prod">
            Produto
          </label>
          <select id="np-prod" className="field" value={sku} onChange={(e) => setSku(e.target.value)}>
            {produtos.map((p) => (
              <option key={p.sku} value={p.sku}>
                {p.nome}
              </option>
            ))}
          </select>
        </div>
        <div>
          <span className={rot}>Quantidade</span>
          <div className="flex h-11 items-center justify-between rounded-[12px] border border-[var(--line-strong)] bg-[var(--glass-1)] px-1">
            <button type="button" className="icon-btn !h-9 !w-9" onClick={() => setQtd(Math.max(1, qtd - 1))} aria-label="Diminuir">
              <Minus size={16} />
            </button>
            <span className="num" aria-live="polite">
              {qtd}
            </span>
            <button type="button" className="icon-btn !h-9 !w-9" onClick={() => setQtd(Math.min(20, qtd + 1))} aria-label="Aumentar">
              <Plus size={16} />
            </button>
          </div>
        </div>
        <div>
          <label className={rot} htmlFor="np-cidade">
            Cidade
          </label>
          <input id="np-cidade" className="field" value={cidade} onChange={(e) => setCidade(e.target.value)} />
        </div>
        <div>
          <label className={rot} htmlFor="np-canal">
            Canal
          </label>
          <select id="np-canal" className="field" value={canal} onChange={(e) => setCanal(e.target.value as Canal)}>
            {CANAIS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={rot} htmlFor="np-pag">
            Pagamento
          </label>
          <select id="np-pag" className="field" value={pagamento} onChange={(e) => setPagamento(e.target.value as Pagamento)}>
            <option>Pix</option>
            <option>Cartão</option>
            <option>Boleto</option>
          </select>
        </div>
        <div className="col-span-2">
          <span className={rot}>Status</span>
          <div className="seg w-full" role="group" aria-label="Status do pedido">
            {(['pago', 'pendente'] as Status[]).map((s) => (
              <button key={s} type="button" className="flex-1" aria-pressed={status === s} onClick={() => setStatus(s)}>
                {s === 'pago' ? 'Já pago' : 'Aguardando pagamento'}
              </button>
            ))}
          </div>
        </div>
        <div className="glass-inset col-span-2 flex items-center justify-between p-3.5">
          <span className="text-sm text-[var(--ink-2)]">Total</span>
          <span className="num text-xl font-medium">{moeda(total)}</span>
        </div>
        <div className="col-span-2 flex gap-2 pt-1">
          <button type="button" className="btn flex-1" onClick={fechar}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary flex-[2]">
            Lançar pedido
          </button>
        </div>
      </form>
    </Modal>
  )
}

/* ---------- Clientes ---------- */
export function TelaClientes({ pedidos, verPedidos }: { pedidos: Pedido[]; verPedidos: (nome: string) => void }) {
  const [busca, setBusca] = useState('')
  const lista = useMemo(() => {
    const m = new Map<string, { nome: string; cidade: string; total: number; qtd: number; ultimo: number }>()
    pedidos
      .filter((p) => p.status !== 'cancelado')
      .forEach((p) => {
        const c = m.get(p.cliente) ?? { nome: p.cliente, cidade: p.cidade, total: 0, qtd: 0, ultimo: p.dia }
        c.total += p.valor
        c.qtd++
        c.ultimo = Math.min(c.ultimo, p.dia)
        m.set(p.cliente, c)
      })
    const t = busca.trim().toLowerCase()
    return [...m.values()].filter((c) => !t || c.nome.toLowerCase().includes(t)).sort((a, b) => b.total - a.total)
  }, [pedidos, busca])
  const max = lista[0]?.total ?? 1

  return (
    <article className="glass rise p-4 sm:p-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-semibold tracking-tight">Clientes que mais compram</h2>
          <p className="mt-0.5 text-[13px] text-[var(--ink-3)]">{lista.length} clientes com pedidos recentes</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search size={16} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[var(--ink-3)]" />
          <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar cliente" aria-label="Buscar cliente" className="field !h-10 pl-9" />
        </div>
      </header>
      <ul className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-2 lg:grid-cols-[repeat(2,minmax(0,1fr))]">
        {lista.map((c, i) => (
          <li key={c.nome}>
            <button onClick={() => verPedidos(c.nome)} className="glass-inset lift flex w-full items-center gap-3 p-3 text-left hover:bg-[var(--glass-2)]">
              <span className="num w-5 shrink-0 text-xs text-[var(--ink-3)]">{i + 1}</span>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--glass-2)] text-xs font-medium">{iniciais(c.nome)}</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">{c.nome}</span>
                <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-[var(--line)]">
                  <span className="block h-full rounded-full bg-[var(--accent)]" style={{ width: `${(c.total / max) * 100}%` }} />
                </span>
              </span>
              <span className="shrink-0 text-right">
                <span className="num block text-sm">{moedaCurta(c.total)}</span>
                <span className="block text-xs text-[var(--ink-3)]">
                  {c.qtd} {c.qtd === 1 ? 'pedido' : 'pedidos'}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      {!lista.length && <p className="py-10 text-center text-sm text-[var(--ink-3)]">Nenhum cliente encontrado.</p>}
    </article>
  )
}

/* ---------- Produtos ---------- */
export function TelaProdutos({ produtos, repor }: { produtos: Produto[]; repor: (sku: string) => void }) {
  const [ordem, setOrdem] = useState<'receita' | 'vendidos' | 'estoque'>('receita')
  const lista = [...produtos].sort((a, b) => (ordem === 'estoque' ? a.estoque / a.minimo - b.estoque / b.minimo : b[ordem] - a[ordem]))
  return (
    <article className="glass rise p-4 sm:p-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-semibold tracking-tight">Produtos</h2>
          <p className="mt-0.5 text-[13px] text-[var(--ink-3)]">Últimos 90 dias</p>
        </div>
        <div className="seg" role="group" aria-label="Ordenar produtos">
          {(
            [
              ['receita', 'Receita'],
              ['vendidos', 'Vendidos'],
              ['estoque', 'Estoque'],
            ] as const
          ).map(([id, r]) => (
            <button key={id} aria-pressed={ordem === id} onClick={() => setOrdem(id)}>
              {r}
            </button>
          ))}
        </div>
      </header>
      <ul className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-2 md:grid-cols-[repeat(2,minmax(0,1fr))] xl:grid-cols-[repeat(3,minmax(0,1fr))]">
        {lista.map((p) => {
          const baixo = p.estoque < p.minimo
          const nivel = Math.min(1, p.estoque / (p.minimo * 2.5))
          return (
            <li key={p.sku} className="glass-inset lift flex flex-col gap-3 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{p.nome}</div>
                  <div className="text-xs text-[var(--ink-3)]">
                    <span className="num">{p.sku}</span> · {p.categoria}
                  </div>
                </div>
                {baixo && (
                  <span className="pill shrink-0" style={{ ['--c' as string]: 'var(--warn)' }}>
                    Baixo
                  </span>
                )}
              </div>
              <div className="grid grid-cols-[repeat(3,minmax(0,1fr))] gap-2 text-xs text-[var(--ink-3)]">
                <div>
                  Receita
                  <div className="num mt-0.5 text-sm text-[var(--ink)]">{moedaCurta(p.receita)}</div>
                </div>
                <div>
                  Vendidos
                  <div className="num mt-0.5 text-sm text-[var(--ink)]">{inteiro(p.vendidos)}</div>
                </div>
                <div>
                  Estoque
                  <div className="num mt-0.5 text-sm text-[var(--ink)]">{p.estoque}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--line)]">
                  <span
                    className="block h-full rounded-full transition-[width] duration-700"
                    style={{ width: `${nivel * 100}%`, background: baixo ? 'var(--warn)' : 'var(--teal)' }}
                  />
                </span>
                <button className="btn !h-8 !px-3 text-xs" onClick={() => repor(p.sku)}>
                  Repor
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </article>
  )
}

/* ---------- Configurações ---------- */
export interface Prefs {
  tema: 'dark' | 'light'
  blur: 'sutil' | 'medio' | 'forte'
  movimento: boolean
  resumoDiario: boolean
}

function Linha({ titulo, desc, children }: { titulo: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 border-b border-[var(--line)] py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="text-sm font-medium">{titulo}</div>
        <div className="text-[13px] text-[var(--ink-3)]">{desc}</div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

function Chave({ ligada, mudar, rotulo }: { ligada: boolean; mudar: (v: boolean) => void; rotulo: string }) {
  return (
    <button
      role="switch"
      aria-checked={ligada}
      aria-label={rotulo}
      onClick={() => mudar(!ligada)}
      className={`relative h-7 w-12 rounded-full border transition-colors ${
        ligada ? 'border-transparent bg-[var(--accent)]' : 'border-[var(--line-strong)] bg-[var(--glass-2)]'
      }`}
    >
      <span
        className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow transition-[left] duration-200 ${ligada ? 'left-[24px]' : 'left-[3px]'}`}
      />
    </button>
  )
}

export function TelaConfig({ prefs, mudar, resetar }: { prefs: Prefs; mudar: (p: Partial<Prefs>) => void; resetar: () => void }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <article className="glass rise px-4 sm:px-5">
        <h2 className="pt-4 text-[15px] font-semibold tracking-tight sm:pt-5">Aparência</h2>
        <Linha titulo="Tema" desc="Vidro escuro ou vidro fosco claro.">
          <div className="seg" role="group" aria-label="Tema">
            <button aria-pressed={prefs.tema === 'dark'} onClick={() => mudar({ tema: 'dark' })}>
              Escuro
            </button>
            <button aria-pressed={prefs.tema === 'light'} onClick={() => mudar({ tema: 'light' })}>
              Claro
            </button>
          </div>
        </Linha>
        <Linha titulo="Intensidade do vidro" desc="Quanto o fundo fica desfocado atrás dos painéis.">
          <div className="seg" role="group" aria-label="Intensidade do vidro">
            {(
              [
                ['sutil', 'Sutil'],
                ['medio', 'Médio'],
                ['forte', 'Forte'],
              ] as const
            ).map(([id, r]) => (
              <button key={id} aria-pressed={prefs.blur === id} onClick={() => mudar({ blur: id })}>
                {r}
              </button>
            ))}
          </div>
        </Linha>
        <Linha titulo="Animações" desc="Desligue se preferir uma tela mais parada.">
          <Chave ligada={prefs.movimento} mudar={(v) => mudar({ movimento: v })} rotulo="Animações" />
        </Linha>
        <Linha titulo="Resumo diário" desc="Mostrar um aviso com o resumo do dia ao abrir o painel.">
          <Chave ligada={prefs.resumoDiario} mudar={(v) => mudar({ resumoDiario: v })} rotulo="Resumo diário" />
        </Linha>
      </article>
      <article className="glass rise h-fit p-4 sm:p-5" style={{ ['--i' as string]: 1 }}>
        <h2 className="text-[15px] font-semibold tracking-tight">Perfil</h2>
        <div className="mt-4 flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-[14px] bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] text-sm font-semibold text-[var(--accent-ink)]">
            MA
          </span>
          <div>
            <div className="text-sm font-medium">Marina Alves</div>
            <div className="text-[13px] text-[var(--ink-3)]">Gerente · Casa Aurora</div>
          </div>
        </div>
        <p className="mt-4 text-[13px] leading-relaxed text-[var(--ink-3)]">
          As preferências ficam salvas só neste navegador. Os pedidos que você lança ou muda voltam ao original quando a página recarrega.
        </p>
        <button className="btn mt-4 w-full" onClick={resetar}>
          Restaurar padrão
        </button>
      </article>
    </div>
  )
}
