import { useEffect, useState, type ReactNode } from 'react'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { pontosGrafico, porCanal, porPagamento, recorte, type Periodo } from '../lib/data'
import { compacto, moeda, moedaCurta, variacao } from '../lib/format'

/** Recharts escreve as cores em atributos SVG, então resolve os tokens CSS aqui. */
function useTokens(tema: string) {
  const ler = () => {
    const s = getComputedStyle(document.documentElement)
    const v = (k: string) => s.getPropertyValue(k).trim()
    return {
      accent: v('--accent'),
      accent2: v('--accent-2'),
      teal: v('--teal'),
      prev: v('--chart-prev'),
      grid: v('--chart-grid'),
      ink3: v('--ink-3'),
      line: v('--line-strong'),
    }
  }
  const [t, setT] = useState(ler)
  useEffect(() => setT(ler()), [tema])
  return t
}

function Dica({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-pop px-3 py-2.5 text-[13px]">
      {label && <div className="mb-1.5 text-xs text-[var(--ink-3)]">{label}</div>}
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
          <span className="text-[var(--ink-2)]">{p.name}</span>
          <span className="num ml-auto pl-4 font-medium">{moeda(p.value)}</span>
        </div>
      ))}
    </div>
  )
}

export function GraficoReceita({ periodo, tema }: { periodo: Periodo; tema: string }) {
  const t = useTokens(tema)
  const [comparar, setComparar] = useState(true)
  const dados = pontosGrafico(periodo)
  const r = recorte(periodo)
  return (
    <article className="glass rise flex min-w-0 flex-col p-4 sm:p-5 lg:col-span-2" style={{ ['--i' as string]: 4 }}>
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-semibold tracking-tight">Receita</h2>
          <p className="mt-0.5 text-[13px] text-[var(--ink-3)]">
            <span className="num text-[var(--ink-2)]">{moedaCurta(r.receita.valor)}</span> nos últimos {periodo} dias ·{' '}
            <span className="num" style={{ color: r.receita.delta >= 0 ? 'var(--ok)' : 'var(--bad)' }}>
              {variacao(r.receita.delta)}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-[var(--ink-2)]">
          <span className="flex items-center gap-1.5">
            <span className="h-[3px] w-4 rounded-full" style={{ background: t.accent }} /> Atual
          </span>
          <button
            onClick={() => setComparar((c) => !c)}
            aria-pressed={comparar}
            className={`flex items-center gap-1.5 rounded-lg px-1.5 py-1 hover:bg-[var(--glass-2)] ${comparar ? '' : 'opacity-50'}`}
          >
            <span className="h-0 w-4 border-t-2 border-dashed" style={{ borderColor: t.prev }} /> Período anterior
          </button>
        </div>
      </header>
      <div className="mt-4 -ml-2 h-[240px] sm:h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dados} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gRec" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={t.accent} stopOpacity={0.32} />
                <stop offset="100%" stopColor={t.accent} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={t.grid} vertical={false} />
            <XAxis
              dataKey="rotulo"
              tick={{ fill: t.ink3, fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              minTickGap={24}
              tickMargin={8}
            />
            <YAxis
              tickFormatter={compacto}
              tick={{ fill: t.ink3, fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={68}
              tickCount={5}
            />
            <Tooltip content={<Dica />} cursor={{ stroke: t.line, strokeWidth: 1 }} />
            {comparar && (
              <Area
                type="monotone"
                dataKey="anterior"
                name="Anterior"
                stroke={t.prev}
                strokeWidth={1.5}
                strokeDasharray="4 4"
                fill="transparent"
                dot={false}
                activeDot={{ r: 3, fill: t.prev, strokeWidth: 0 }}
                isAnimationActive={false}
              />
            )}
            <Area
              type="monotone"
              dataKey="atual"
              name="Atual"
              stroke={t.accent}
              strokeWidth={2.25}
              fill="url(#gRec)"
              dot={false}
              activeDot={{ r: 4.5, fill: t.accent, stroke: 'white', strokeWidth: 2 }}
              animationDuration={700}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </article>
  )
}

function GraficoCanais({ periodo, tema, topo }: { periodo: Periodo; tema: string; topo: ReactNode }) {
  const t = useTokens(tema)
  const dados = porCanal(periodo)
  const [ativo, setAtivo] = useState<number | null>(null)
  const total = dados.reduce((s, d) => s + d.receita, 0)
  return (
    <>
      {topo}
      <p className="mt-0.5 text-[13px] text-[var(--ink-3)]">De onde vem cada real vendido</p>
      <div className="mt-6 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dados} layout="vertical" margin={{ top: 0, right: 56, left: 0, bottom: 0 }} barCategoryGap={10}>
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="canal"
              tick={{ fill: t.ink3, fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={84}
            />
            <Tooltip content={<Dica />} cursor={false} />
            <Bar
              dataKey="receita"
              name="Receita"
              radius={[0, 8, 8, 0]}
              maxBarSize={30}
              onMouseEnter={(_, i) => setAtivo(i)}
              onMouseLeave={() => setAtivo(null)}
              label={{
                position: 'right',
                fill: t.ink3,
                fontSize: 11,
                formatter: (v: unknown) => `${Math.round((Number(v) / total) * 100)}%`,
              }}
              animationDuration={700}
            >
              {dados.map((d, i) => (
                <Cell key={d.canal} fill={t.accent} fillOpacity={ativo === null || ativo === i ? 0.9 : 0.35} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

function GraficoPagamentos({ periodo, tema, topo }: { periodo: Periodo; tema: string; topo: ReactNode }) {
  const t = useTokens(tema)
  const dados = porPagamento(periodo)
  const cores = [t.accent, t.accent2, t.teal]
  const [ativo, setAtivo] = useState(0)
  const sel = dados[ativo]
  return (
    <>
      {topo}
      <p className="mt-0.5 text-[13px] text-[var(--ink-3)]">Toque numa fatia ou na legenda</p>
      <div className="relative mx-auto mt-3 h-[180px] w-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dados}
              dataKey="valor"
              nameKey="nome"
              innerRadius={62}
              outerRadius={84}
              paddingAngle={3}
              cornerRadius={6}
              stroke="none"
              onMouseEnter={(_, i) => setAtivo(i)}
              onClick={(_, i) => setAtivo(i)}
              animationDuration={700}
            >
              {dados.map((d, i) => (
                <Cell key={d.nome} fill={cores[i]} fillOpacity={i === ativo ? 1 : 0.4} style={{ cursor: 'pointer', outline: 'none' }} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
          <div>
            <div className="num text-2xl font-medium">{Math.round(sel.parte * 100)}%</div>
            <div className="text-xs text-[var(--ink-3)]">{sel.nome}</div>
          </div>
        </div>
      </div>
      <ul className="mt-4 flex flex-col gap-1">
        {dados.map((d, i) => (
          <li key={d.nome}>
            <button
              onClick={() => setAtivo(i)}
              aria-pressed={i === ativo}
              className={`flex w-full items-center gap-2.5 rounded-[10px] px-2.5 py-1.5 text-sm transition-colors ${
                i === ativo ? 'bg-[var(--glass-2)]' : 'hover:bg-[var(--glass-1)]'
              }`}
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: cores[i] }} />
              <span className="text-[var(--ink-2)]">{d.nome}</span>
              <span className="num ml-auto">{moedaCurta(d.valor)}</span>
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

export function OrigemReceita({ periodo, tema }: { periodo: Periodo; tema: string }) {
  const [aba, setAba] = useState<'pagamento' | 'canal'>('pagamento')
  const topo = (
    <div className="flex items-center justify-between gap-3">
      <h2 className="text-[15px] font-semibold tracking-tight">{aba === 'pagamento' ? 'Formas de pagamento' : 'Receita por canal'}</h2>
      <div className="seg" role="group" aria-label="Agrupar receita por">
        <button aria-pressed={aba === 'pagamento'} onClick={() => setAba('pagamento')}>
          Pagamento
        </button>
        <button aria-pressed={aba === 'canal'} onClick={() => setAba('canal')}>
          Canal
        </button>
      </div>
    </div>
  )
  return (
    <article className="glass rise flex min-w-0 flex-col p-4 sm:p-5" style={{ ['--i' as string]: 5 }}>
      {aba === 'pagamento' ? (
        <GraficoPagamentos periodo={periodo} tema={tema} topo={topo} />
      ) : (
        <GraficoCanais periodo={periodo} tema={tema} topo={topo} />
      )}
    </article>
  )
}
