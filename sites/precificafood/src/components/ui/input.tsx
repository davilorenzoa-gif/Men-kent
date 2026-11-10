import * as React from 'react'
import { cn } from '@/lib/utils'

export const inputClass =
  'h-10 w-full rounded-md border border-line-strong bg-bg-2 px-3 text-[15px] text-fg placeholder:text-subtle transition-[border-color,box-shadow] duration-150 hover:border-[#3d4860] focus-visible:outline-none focus-visible:border-accent focus-visible:ring-3 focus-visible:ring-accent/20 disabled:opacity-50 aria-[invalid=true]:border-danger aria-[invalid=true]:ring-danger/20 sm:text-sm'

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn(inputClass, className)} {...props} />
))
Input.displayName = 'Input'

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn(inputClass, 'h-auto min-h-20 py-2.5 leading-relaxed', className)} {...props} />
))
Textarea.displayName = 'Textarea'
