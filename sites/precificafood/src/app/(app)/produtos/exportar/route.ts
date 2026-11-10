import { getWorkspace } from '@/lib/data'
import { evaluateAll, effectiveMargin } from '@/lib/evaluate-all'
import { STATUS_LABELS } from '@/lib/pricing/engine'

/** CSV no formato que o Excel brasileiro abre direto (;, vírgula decimal, UTF-8 com BOM). */
export async function GET() {
  const ws = await getWorkspace()
  const evals = evaluateAll(ws.restaurant, ws.profiles, ws.products, ws.ingredients)
  const money = (v: { toFixed: (n: number) => string } | null | undefined) => (v ? v.toFixed(2).replace('.', ',') : '')
  const cell = (v: string) => (/[";\n\r]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v)
  // Evita injeção de fórmula ao abrir no Excel/Sheets
  const text = (v: string) => cell(/^[=+\-@\t]/.test(v) ? `'${v}` : v)

  const header = ['Produto', 'Categoria', 'Custo variável (R$)', 'Fixo rateado (R$)', 'Taxas e impostos (%)', 'Preço atual (R$)', 'Preço recomendado (R$)', 'Preço comercial (R$)', 'Margem no preço atual (%)', 'Margem efetiva (%)', 'Situação']
  const lines = evals.map((e) => {
    const rec = e.recommended.ok ? e.recommended : null
    const m = effectiveMargin(e)
    return [
      text(e.product.name),
      text(e.product.category),
      money(rec?.analysis.variableCost),
      money(rec?.analysis.fixedPerOrder),
      rec ? rec.analysis.totalRate.times(100).toFixed(2).replace('.', ',') : '',
      e.product.current_price !== null ? Number(e.product.current_price).toFixed(2).replace('.', ',') : '',
      money(rec?.price),
      money(e.commercial),
      e.current ? e.current.contributionMargin.times(100).toFixed(2).replace('.', ',') : '',
      m !== null ? (m * 100).toFixed(2).replace('.', ',') : '',
      e.status ? STATUS_LABELS[e.status] : 'Sem preço atual',
    ].join(';')
  })
  const date = new Intl.DateTimeFormat('sv-SE', { timeZone: 'America/Sao_Paulo' }).format(new Date())
  const body = '﻿' + [header.join(';'), ...lines].join('\r\n')
  return new Response(body, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="precificafood-produtos-${date}.csv"`,
      'Cache-Control': 'no-store',
    },
  })
}
