import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[background-color,border-color,color,transform,box-shadow] duration-150 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-accent-ink hover:bg-accent-strong shadow-[0_1px_0_rgb(255_255_255/0.25)_inset,0_4px_12px_-4px_rgb(39_217_154/0.35)]',
        secondary: 'bg-surface-2 text-fg border border-line-strong hover:bg-[#283143] hover:border-[#3d4860]',
        ghost: 'text-muted hover:text-fg hover:bg-surface-2',
        outline: 'border border-line-strong text-fg hover:bg-surface-2',
        danger: 'bg-danger/90 text-white hover:bg-danger',
        'danger-ghost': 'text-danger hover:bg-danger/10',
      },
      size: {
        sm: 'h-8 px-3 text-[13px]',
        md: 'h-10 px-4',
        lg: 'h-11 px-5 text-[15px]',
        icon: 'size-10',
        'icon-sm': 'size-8',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    if (asChild) {
      return (
        <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props}>
          {children}
        </Comp>
      )
    }
    return (
      <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} disabled={disabled || loading} aria-busy={loading || undefined} {...props}>
        {loading ? <Loader2 className="animate-spin" aria-hidden /> : null}
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'
export { buttonVariants }
