const cache = new Map<number, Intl.NumberFormat>()

/** 1277 → "1,277" · 2.8 → "2.8" (decimals fixed so counters don't jitter). */
export function formatNumber(value: number, decimals = 0): string {
  let fmt = cache.get(decimals)
  if (!fmt) {
    fmt = new Intl.NumberFormat('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    cache.set(decimals, fmt)
  }
  return fmt.format(value)
}

/** 83 → "01:23" */
export function formatTime(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds))
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}
