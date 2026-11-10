import { BarChart3, Calculator, LayoutDashboard, Percent, Settings, UserRound, UtensilsCrossed } from 'lucide-react'

export const NAV = [
  { href: '/visao-geral', label: 'Visão geral', icon: LayoutDashboard },
  { href: '/precificador', label: 'Precificador', icon: Calculator },
  { href: '/produtos', label: 'Meus produtos', icon: UtensilsCrossed },
  { href: '/promocoes', label: 'Simulador de promoções', icon: Percent },
  { href: '/analise', label: 'Análise de lucratividade', icon: BarChart3 },
  { href: '/configuracoes', label: 'Configurações', icon: Settings },
  { href: '/conta', label: 'Minha conta', icon: UserRound },
] as const
