import { evaluateProduct, groupIngredients, type FeeProfile, type Product, type ProductEvaluation, type ProductIngredient, type Restaurant } from './domain'

export function evaluateAll(restaurant: Restaurant, profiles: FeeProfile[], products: Product[], ingredients: ProductIngredient[]): ProductEvaluation[] {
  const byProduct = groupIngredients(ingredients)
  return products.map((p) => evaluateProduct(p, byProduct.get(p.id) ?? [], restaurant, profiles))
}

/** Margem usada para ordenar e classificar: preço atual se houver, senão o comercial sugerido. */
export function effectiveMargin(e: ProductEvaluation): number | null {
  if (e.current) return e.current.contributionMargin.toNumber()
  if (e.commercialAnalysis) return e.commercialAnalysis.contributionMargin.toNumber()
  return null
}
