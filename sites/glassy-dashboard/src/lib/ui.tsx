import { CircleCheck, Info, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type ReactNode, type RefObject } from 'react'

/** Fecha com clique fora ou Esc. */
export function useDismiss(open: boolean, close: () => void, refs: RefObject<HTMLElement | null>[]) {
  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (refs.every((r) => !r.current?.contains(e.target as Node))) close()
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, close, refs])
}

/** Popover ancorado num botão. */
export function usePopover() {
  const [open, setOpen] = useState(false)
  const btn = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const close = useCallback(() => setOpen(false), [])
  const refs = useRef([btn, panel]).current
  useDismiss(open, close, refs)
  return { open, setOpen, close, btn, panel, toggle: () => setOpen((o) => !o) }
}

export interface Toast {
  id: number
  texto: string
  tipo: 'ok' | 'info'
}

export function Toasts({ itens, remover }: { itens: Toast[]; remover: (id: number) => void }) {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[80] flex flex-col items-center gap-2 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:items-end"
      aria-live="polite"
    >
      {itens.map((t) => (
        <div key={t.id} className="glass-pop pop-in pointer-events-auto flex max-w-sm items-center gap-3 py-2.5 pr-2 pl-3.5 text-sm">
          {t.tipo === 'ok' ? (
            <CircleCheck size={18} style={{ color: 'var(--ok)' }} aria-hidden />
          ) : (
            <Info size={18} style={{ color: 'var(--info)' }} aria-hidden />
          )}
          <span className="flex-1">{t.texto}</span>
          <button className="icon-btn !h-8 !w-8" onClick={() => remover(t.id)} aria-label="Fechar aviso">
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}

export function Modal({
  aberto,
  fechar,
  titulo,
  children,
}: {
  aberto: boolean
  fechar: () => void
  titulo: string
  children: ReactNode
}) {
  const painel = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!aberto) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && fechar()
    document.addEventListener('keydown', onKey)
    const anterior = document.activeElement as HTMLElement | null
    painel.current?.querySelector<HTMLElement>('input,select,button')?.focus()
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      anterior?.focus()
    }
  }, [aberto, fechar])
  if (!aberto) return null
  return (
    <div className="fixed inset-0 z-[70] grid place-items-end sm:place-items-center">
      <div className="fade-in absolute inset-0 bg-black/45" onClick={fechar} aria-hidden />
      <div
        ref={painel}
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        className="glass-pop pop-in relative max-h-[92dvh] w-full overflow-y-auto rounded-b-none p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:max-w-md sm:rounded-b-[16px] sm:p-6"
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold tracking-tight">{titulo}</h2>
          <button className="icon-btn" onClick={fechar} aria-label="Fechar">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

/** localStorage que nunca quebra a página (aba anônima, bloqueado etc.). */
export function lerPref<T>(chave: string, padrao: T): T {
  try {
    const v = localStorage.getItem(chave)
    return v == null ? padrao : (JSON.parse(v) as T)
  } catch {
    return padrao
  }
}
export function salvarPref(chave: string, valor: unknown) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor))
  } catch {
    /* sem armazenamento: segue sem lembrar */
  }
}
