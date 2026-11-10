// Dados de demonstração. Tudo é gerado a partir de uma semente fixa,
// então a tela mostra sempre os mesmos números.

export type Status = 'pago' | 'pendente' | 'enviado' | 'cancelado'
export type Canal = 'Site' | 'WhatsApp' | 'Loja física' | 'Instagram'
export type Pagamento = 'Pix' | 'Cartão' | 'Boleto'
export type Periodo = 7 | 30 | 90

export interface Pedido {
  id: string
  cliente: string
  cidade: string
  canal: Canal
  pagamento: Pagamento
  itens: number
  valor: number
  status: Status
  /** dias atrás (0 = hoje) */
  dia: number
  hora: string
}

export interface Dia {
  data: Date
  receita: number
  pedidos: number
  novos: number
}

export interface Produto {
  sku: string
  nome: string
  categoria: string
  vendidos: number
  receita: number
  estoque: number
  minimo: number
}

export interface Notificacao {
  id: string
  tipo: 'estoque' | 'pedido' | 'pagamento' | 'meta'
  titulo: string
  texto: string
  quando: string
  lida: boolean
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const rnd = mulberry32(911)
const pick = <T,>(arr: readonly T[]) => arr[Math.floor(rnd() * arr.length)]

export const HOJE = new Date(2026, 9, 26)

/** 180 dias: os 90 mais recentes + 90 anteriores pra comparar. */
export const SERIE: Dia[] = (() => {
  const out: Dia[] = []
  for (let i = 179; i >= 0; i--) {
    const data = new Date(HOJE)
    data.setDate(HOJE.getDate() - i)
    const dow = data.getDay()
    const tendencia = 1 + (179 - i) * 0.0042
    const fimDeSemana = dow === 5 || dow === 6 ? 1.28 : dow === 0 ? 0.82 : 1
    const ruido = 0.82 + rnd() * 0.36
    const pedidos = Math.round(34 * tendencia * fimDeSemana * ruido)
    const ticket = 118 + rnd() * 34
    out.push({
      data,
      pedidos,
      receita: Math.round(pedidos * ticket),
      novos: Math.round(pedidos * (0.22 + rnd() * 0.12)),
    })
  }
  return out
})()

export function recorte(periodo: Periodo) {
  const atual = SERIE.slice(SERIE.length - periodo)
  const anterior = SERIE.slice(SERIE.length - periodo * 2, SERIE.length - periodo)
  const soma = (d: Dia[], k: 'receita' | 'pedidos' | 'novos') => d.reduce((s, x) => s + x[k], 0)
  const r = soma(atual, 'receita')
  const rA = soma(anterior, 'receita')
  const p = soma(atual, 'pedidos')
  const pA = soma(anterior, 'pedidos')
  const n = soma(atual, 'novos')
  const nA = soma(anterior, 'novos')
  const delta = (a: number, b: number) => (b === 0 ? 0 : (a - b) / b)
  return {
    atual,
    anterior,
    receita: { valor: r, delta: delta(r, rA) },
    pedidos: { valor: p, delta: delta(p, pA) },
    ticket: { valor: r / p, delta: delta(r / p, rA / pA) },
    novos: { valor: n, delta: delta(n, nA) },
  }
}

/** Agrupa por semana quando o período é longo, pra o gráfico não virar serrote. */
export function pontosGrafico(periodo: Periodo) {
  const { atual, anterior } = recorte(periodo)
  const passo = periodo === 90 ? 7 : 1
  const pts: { rotulo: string; data: Date; atual: number; anterior: number }[] = []
  for (let i = 0; i < atual.length; i += passo) {
    const a = atual.slice(i, i + passo)
    const b = anterior.slice(i, i + passo)
    pts.push({
      data: a[0].data,
      rotulo: a[0].data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', ''),
      atual: a.reduce((s, x) => s + x.receita, 0),
      anterior: b.reduce((s, x) => s + x.receita, 0),
    })
  }
  return pts
}

export const CANAIS: Canal[] = ['Site', 'WhatsApp', 'Loja física', 'Instagram']
const PESO_CANAL = [0.38, 0.31, 0.19, 0.12]

export function porCanal(periodo: Periodo) {
  const { receita } = recorte(periodo)
  return CANAIS.map((canal, i) => ({ canal, receita: Math.round(receita.valor * PESO_CANAL[i]) }))
}

export function porPagamento(periodo: Periodo) {
  const { receita } = recorte(periodo)
  const base = periodo === 7 ? [0.58, 0.34, 0.08] : periodo === 30 ? [0.55, 0.36, 0.09] : [0.52, 0.38, 0.1]
  return (['Pix', 'Cartão', 'Boleto'] as Pagamento[]).map((nome, i) => ({
    nome,
    valor: Math.round(receita.valor * base[i]),
    parte: base[i],
  }))
}

const NOMES = [
  'Ana Ribeiro', 'Bruno Carvalho', 'Camila Duarte', 'Diego Martins', 'Elisa Nogueira', 'Felipe Araújo',
  'Gabriela Lima', 'Henrique Souza', 'Isabela Rocha', 'João Pedro Alves', 'Larissa Teixeira', 'Marcos Vinícius',
  'Natália Freitas', 'Otávio Mendes', 'Paula Cardoso', 'Rafael Moura', 'Sofia Barros', 'Thiago Pires',
  'Vanessa Campos', 'Yuri Fernandes',
]
const CIDADES = ['São Paulo', 'Guarulhos', 'Osasco', 'Santo André', 'Campinas', 'Barueri']
const PAGAMENTOS: Pagamento[] = ['Pix', 'Pix', 'Pix', 'Cartão', 'Cartão', 'Boleto']

export const PEDIDOS_INICIAIS: Pedido[] = Array.from({ length: 64 }, (_, i) => {
  const dia = Math.floor(i / 3.2)
  const status: Status =
    dia === 0 ? pick(['pendente', 'pago', 'pago'] as const) : dia < 3 ? pick(['pago', 'enviado', 'pendente'] as const) : rnd() < 0.08 ? 'cancelado' : 'enviado'
  const itens = 1 + Math.floor(rnd() * 4)
  const h = 8 + Math.floor(rnd() * 13)
  const m = Math.floor(rnd() * 60)
  return {
    id: `#${4820 - i}`,
    cliente: pick(NOMES),
    cidade: pick(CIDADES),
    canal: CANAIS[Math.min(3, Math.floor(rnd() * rnd() * 5))],
    pagamento: pick(PAGAMENTOS),
    itens,
    valor: Math.round((48 + rnd() * 90) * itens * 100) / 100,
    status,
    dia,
    hora: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`,
  }
})

export const PRODUTOS_INICIAIS: Produto[] = [
  { sku: 'LM-014', nome: 'Luminária Arco Latão', categoria: 'Iluminação', vendidos: 186, receita: 63054, estoque: 24, minimo: 15 },
  { sku: 'TP-201', nome: 'Tapete Juta Natural 2×3', categoria: 'Têxtil', vendidos: 142, receita: 55238, estoque: 6, minimo: 10 },
  { sku: 'VS-088', nome: 'Vaso Cerâmica Fosca G', categoria: 'Decoração', vendidos: 231, receita: 34419, estoque: 41, minimo: 20 },
  { sku: 'AL-320', nome: 'Almofada Linho Areia', categoria: 'Têxtil', vendidos: 318, receita: 25122, estoque: 12, minimo: 25 },
  { sku: 'ES-007', nome: 'Espelho Orgânico 80cm', categoria: 'Decoração', vendidos: 64, receita: 30656, estoque: 9, minimo: 6 },
  { sku: 'CN-115', nome: 'Kit Velas Âmbar (3)', categoria: 'Aromas', vendidos: 276, receita: 17388, estoque: 58, minimo: 30 },
]

export const NOTIFICACOES_INICIAIS: Notificacao[] = [
  { id: 'n1', tipo: 'estoque', titulo: 'Estoque baixo', texto: 'Tapete Juta Natural 2×3 tem só 6 unidades.', quando: 'há 12 min', lida: false },
  { id: 'n2', tipo: 'pedido', titulo: 'Pedido grande', texto: '#4818 com 4 itens aguardando confirmação.', quando: 'há 40 min', lida: false },
  { id: 'n3', tipo: 'pagamento', titulo: 'Pix recebido', texto: 'R$ 412,90 de Camila Duarte.', quando: 'há 1 h', lida: false },
  { id: 'n4', tipo: 'meta', titulo: 'Meta da semana', texto: 'Você passou de 80% da meta semanal.', quando: 'ontem', lida: true },
]

export const STATUS_INFO: Record<Status, { rotulo: string; cor: string }> = {
  pago: { rotulo: 'Pago', cor: 'var(--ok)' },
  pendente: { rotulo: 'Pendente', cor: 'var(--warn)' },
  enviado: { rotulo: 'Enviado', cor: 'var(--info)' },
  cancelado: { rotulo: 'Cancelado', cor: 'var(--bad)' },
}
