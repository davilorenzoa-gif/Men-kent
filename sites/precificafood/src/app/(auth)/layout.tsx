import { Wordmark } from '@/components/app/logo'
import { Calculator, Percent, ShieldCheck } from 'lucide-react'

const POINTS = [
  { icon: Calculator, text: 'Preço recomendado com todas as taxas do seu contrato, não com uma tabela genérica.' },
  { icon: Percent, text: 'Veja quanto sobra de cada venda antes e depois de uma promoção.' },
  { icon: ShieldCheck, text: 'Seus números ficam isolados por restaurante, com acesso protegido.' },
]

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-[1fr_minmax(0,520px)]">
      <section className="relative hidden overflow-hidden border-r border-line bg-bg-2 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <Wordmark />
        <div className="max-w-md">
          <h1 className="text-[34px] font-semibold leading-[1.1] tracking-[-0.03em]">
            Saiba quanto cobrar e quanto sobra de cada pedido no iFood.
          </h1>
          <ul className="mt-10 space-y-5">
            {POINTS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex gap-3.5 text-[15px] leading-relaxed text-muted">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md border border-line-strong bg-surface">
                  <Icon className="size-4 text-accent" aria-hidden />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-subtle">Valores em reais. Fórmula: preço = (custos + fixos rateados) ÷ (1 − taxas − margem).</p>
      </section>
      <section className="flex flex-col px-5 py-8 sm:px-10">
        <div className="lg:hidden">
          <Wordmark />
        </div>
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-10">{children}</div>
      </section>
    </div>
  )
}
