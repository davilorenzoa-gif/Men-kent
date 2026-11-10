export function LogoMark({ className = 'size-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="8" fill="#191F2B" />
      <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="none" stroke="#323C4E" />
      <path d="M10 23V9h7a5 5 0 0 1 0 10h-7" fill="none" stroke="#27D99A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="22.5" cy="23" r="1.8" fill="#27D99A" />
    </svg>
  )
}

export function Wordmark() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className="text-[15px] font-semibold tracking-[-0.02em] text-fg">
        Precifica<span className="text-accent">Food</span>
      </span>
    </span>
  )
}
