/** APEX mark: the apex of a corner (a chevron) cut by the racing line. */
export function Mark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 32" className={className} aria-hidden="true">
      <path d="M2 30 20 2l18 28h-7.5L20 13.6 9.5 30z" fill="currentColor" />
      <path d="M8.6 24.4h22.8" stroke="var(--color-signal)" strokeWidth="3.2" />
    </svg>
  )
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mark className="h-[18px] w-auto" />
      <span className="font-display text-[22px] font-extrabold leading-none tracking-[0.2em]">APEX</span>
    </span>
  )
}
