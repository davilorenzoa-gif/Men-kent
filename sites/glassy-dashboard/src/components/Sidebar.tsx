import { Boxes, LayoutDashboard, LifeBuoy, ReceiptText, Settings, Users, X } from 'lucide-react'
import { useId, type ComponentType } from 'react'

export type Vista = 'visao' | 'pedidos' | 'clientes' | 'produtos' | 'config'

const ITENS: { id: Vista; rotulo: string; Icone: ComponentType<{ size?: number }> }[] = [
  { id: 'visao', rotulo: 'Visão geral', Icone: LayoutDashboard },
  { id: 'pedidos', rotulo: 'Pedidos', Icone: ReceiptText },
  { id: 'clientes', rotulo: 'Clientes', Icone: Users },
  { id: 'produtos', rotulo: 'Produtos', Icone: Boxes },
]

function Marca({ compacta }: { compacta?: boolean }) {
  const id = useId()
  return (
    <div className="flex items-center gap-3 px-1">
      <span className="glass-inset grid h-10 w-10 shrink-0 place-items-center !rounded-[12px]">
        <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" style={{ stopColor: 'var(--accent)' }} />
              <stop offset="1" style={{ stopColor: 'var(--accent-2)' }} />
            </linearGradient>
          </defs>
          <path d="M8 9l8 15 8-15" fill="none" stroke={`url(#${id})`} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {!compacta && (
        <div className="leading-tight">
          <div className="text-[15px] font-semibold tracking-tight">Vitra</div>
          <div className="text-xs text-[var(--ink-3)]">Casa Aurora · demo</div>
        </div>
      )}
    </div>
  )
}

function Nav({
  vista,
  ir,
  pendentes,
  compacta,
}: {
  vista: Vista
  ir: (v: Vista) => void
  pendentes: number
  compacta?: boolean
}) {
  const item = (id: Vista, rotulo: string, Icone: ComponentType<{ size?: number }>, badge?: number) => {
    const ativo = vista === id
    return (
      <li key={id}>
        <button
          onClick={() => ir(id)}
          aria-current={ativo ? 'page' : undefined}
          title={compacta ? rotulo : undefined}
          className={`group relative flex h-11 w-full items-center gap-3 rounded-[12px] px-3 text-sm transition-colors ${
            compacta ? 'justify-center' : ''
          } ${
            ativo
              ? 'bg-[var(--glass-3)] text-[var(--ink)] shadow-[inset_0_1px_0_var(--glass-shine)]'
              : 'text-[var(--ink-2)] hover:bg-[var(--glass-2)] hover:text-[var(--ink)]'
          }`}
        >
          {ativo && <span className="absolute top-2.5 bottom-2.5 left-0 w-[3px] rounded-full bg-[var(--accent)]" aria-hidden />}
          <Icone size={19} />
          {!compacta && <span className="flex-1 text-left">{rotulo}</span>}
          {!!badge && (
            <span
              className={`num grid h-5 min-w-5 place-items-center rounded-full bg-[var(--accent)] px-1.5 text-[11px] font-medium text-[var(--accent-ink)] ${
                compacta ? 'absolute top-1 right-1 h-4 min-w-4 px-1 text-[10px]' : ''
              }`}
            >
              {badge}
            </span>
          )}
        </button>
      </li>
    )
  }

  return (
    <nav aria-label="Principal" className="flex flex-1 flex-col">
      {!compacta && <div className="eyebrow mb-2 px-3">Loja</div>}
      <ul className="flex flex-col gap-1">
        {ITENS.map((i) => item(i.id, i.rotulo, i.Icone, i.id === 'pedidos' ? pendentes : undefined))}
      </ul>
      <div className="mt-auto flex flex-col gap-1 pt-6">
        <ul className="flex flex-col gap-1">{item('config', 'Configurações', Settings)}</ul>
        {!compacta && (
          <div className="glass-inset mt-3 p-3.5">
            <div className="flex items-center gap-2 text-sm font-medium">
              <LifeBuoy size={16} style={{ color: 'var(--teal)' }} /> Painel de demonstração
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-[var(--ink-3)]">
              Loja e números fictícios. Tudo é clicável e nada sai do seu navegador.
            </p>
          </div>
        )}
      </div>
    </nav>
  )
}

export function Sidebar(props: { vista: Vista; ir: (v: Vista) => void; pendentes: number }) {
  return (
    <>
      {/* tablet: só ícones */}
      <aside className="glass fixed top-3 bottom-3 left-3 z-30 hidden w-[72px] flex-col gap-6 px-2.5 py-4 md:flex lg:hidden">
        <div className="flex justify-center">
          <Marca compacta />
        </div>
        <Nav {...props} compacta />
      </aside>
      {/* desktop: completa */}
      <aside className="glass fixed top-3 bottom-3 left-3 z-30 hidden w-[248px] flex-col gap-7 p-4 lg:flex">
        <Marca />
        <Nav {...props} />
      </aside>
    </>
  )
}

export function Gaveta({
  aberta,
  fechar,
  ...props
}: {
  aberta: boolean
  fechar: () => void
  vista: Vista
  ir: (v: Vista) => void
  pendentes: number
}) {
  if (!aberta) return null
  return (
    <div className="fixed inset-0 z-[60] md:hidden">
      <div className="fade-in absolute inset-0 bg-black/45" onClick={fechar} aria-hidden />
      <aside
        className="glass-pop pop-in absolute top-0 bottom-0 left-0 flex w-[min(84vw,300px)] flex-col gap-7 !rounded-l-none p-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="flex items-center justify-between">
          <Marca />
          <button className="icon-btn" onClick={fechar} aria-label="Fechar menu">
            <X size={20} />
          </button>
        </div>
        <Nav
          {...props}
          ir={(v) => {
            props.ir(v)
            fechar()
          }}
        />
      </aside>
    </div>
  )
}
