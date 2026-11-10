import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'solid' | 'outline'
  icon?: ReactNode
  children: ReactNode
}

/**
 * The site's one button. A red panel rises from the bottom edge on hover,
 * the icon turns a quarter, and a press nudges the whole thing down a pixel.
 */
export function Button({ variant = 'outline', icon, children, className = '', ...rest }: ButtonProps) {
  const palette =
    variant === 'solid'
      ? 'bg-paper text-ink border-paper hover:text-paper hover:border-apex'
      : 'bg-transparent text-paper border-paper/30 hover:border-apex'
  return (
    <button
      type="button"
      {...rest}
      className={`group/btn relative inline-flex items-center gap-4 overflow-hidden border px-6 py-4 text-[0.6875rem] wide transition-[color,border-color,transform] duration-500 ease-expo active:translate-y-px sm:px-7 ${palette} ${className}`}
    >
      <span
        aria-hidden
        className="absolute inset-0 origin-bottom scale-y-0 bg-apex transition-transform duration-500 ease-expo group-hover/btn:scale-y-100 group-focus-visible/btn:scale-y-100"
      />
      <span className="relative">{children}</span>
      {icon && (
        <span aria-hidden className="relative grid size-4 place-items-center transition-transform duration-500 ease-expo group-hover/btn:rotate-90">
          {icon}
        </span>
      )}
    </button>
  )
}
