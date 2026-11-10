import { z } from 'zod'

const money = (label: string) =>
  z.number({ error: `${label}: informe um número.` }).finite().min(0, `${label} não pode ser negativo.`).max(1_000_000, `${label} está alto demais.`)

const rate = (label: string) =>
  z.number({ error: `${label}: informe um número.` }).finite().min(0, `${label} não pode ser negativo.`).lt(100, `${label} precisa ser menor que 100%.`)

const optional = <T extends z.ZodTypeAny>(s: T) => s.nullable()

export const ingredientSchema = z.object({
  name: z.string().trim().min(1, 'Dê um nome a cada ingrediente.').max(120),
  quantity: z.number().finite().min(0, 'Quantidade não pode ser negativa.').max(100_000),
  unit: z.string().trim().min(1).max(12),
  unit_cost: money('Custo do ingrediente'),
})

export const productSchema = z.object({
  id: z.string().uuid().nullable(),
  fee_profile_id: z.string().uuid().nullable(),
  name: z.string().trim().min(1, 'Dê um nome ao produto.').max(120, 'Nome muito longo.'),
  category: z.string().trim().min(1, 'Informe a categoria.').max(60),
  description: z.string().trim().max(1000).nullable(),
  packaging_cost: money('Embalagem'),
  labor_cost: money('Mão de obra'),
  other_cost: money('Outros custos'),
  current_price: optional(money('Preço atual')),
  tax_pct: optional(rate('Impostos')),
  target_margin_pct: optional(rate('Margem desejada')),
  funded_discount_pct: optional(rate('Descontos financiados')),
  fixed_cost_per_order: optional(money('Custos fixos rateados')),
  ingredients: z.array(ingredientSchema).max(200, 'Máximo de 200 ingredientes.'),
})
export type ProductPayload = z.infer<typeof productSchema>

export const restaurantSchema = z.object({
  name: z.string().trim().min(1, 'Informe o nome do restaurante.').max(120),
  target_margin_pct: rate('Meta de margem'),
  default_tax_pct: rate('Impostos padrão'),
  fixed_monthly_costs: money('Custos fixos mensais'),
  estimated_monthly_orders: z.number().int('Pedidos por mês precisa ser inteiro.').min(0).max(10_000_000),
  rounding_rule: z.enum(['none', 'end_90', 'end_99', 'end_50', 'whole']),
  food_cost_alert_pct: z.number().gt(0, 'Limite precisa ser maior que 0%.').max(100),
  currency: z.literal('BRL'),
})
export type RestaurantPayload = z.infer<typeof restaurantSchema>

export const feeBase = z.enum(['list', 'customer', 'restaurant'])

export const feeProfileSchema = z.object({
  id: z.string().uuid().nullable(),
  name: z.string().trim().min(1, 'Dê um nome ao perfil.').max(80),
  channel: z.enum(['ifood', 'proprio', 'outro']),
  plan_name: z.string().trim().max(80).nullable(),
  commission_pct: rate('Comissão'),
  payment_fee_pct: rate('Taxa de pagamento'),
  delivery_commission_pct: rate('Comissão de entrega'),
  apply_delivery_commission: z.boolean(),
  other_fees_pct: rate('Taxas adicionais'),
  per_order_fee: money('Taxa fixa por pedido'),
  monthly_fee: money('Mensalidade'),
  campaign_discount_pct: rate('Participação em campanhas'),
  commission_base: feeBase,
  payment_fee_base: feeBase,
  notes: z.string().trim().max(1000).nullable(),
})
export type FeeProfilePayload = z.infer<typeof feeProfileSchema>

export const emailSchema = z.string().trim().toLowerCase().email('E-mail inválido.')
export const passwordSchema = z.string().min(8, 'A senha precisa ter pelo menos 8 caracteres.').max(72)

export function firstError(err: z.ZodError): string {
  return err.issues[0]?.message ?? 'Dados inválidos.'
}
