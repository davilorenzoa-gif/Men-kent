/**
 * APEX mark: the racing line through a corner, with the apex (the point where
 * the car clips the inside kerb) marked in red. The same line and dot recur
 * as the page's progress rail.
 */
export function LogoMark({ className = 'size-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden className={className}>
      <path d="M3 27 L16 5 L29 27" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="miter" strokeLinecap="square" />
      <circle cx="16" cy="20.5" r="2.6" fill="var(--color-apex)" />
    </svg>
  )
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark />
      <span className="wide text-[0.9375rem] font-bold tracking-[0.32em]">APEX</span>
    </span>
  )
}
