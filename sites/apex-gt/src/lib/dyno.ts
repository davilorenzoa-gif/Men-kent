import { gt3 } from '../data/cars'

// Illustrative torque curve for the GT3 RS flat-six. Only the peaks are official
// (465 Nm @ 6,300 rpm, 525 PS @ 8,500 rpm); the shape between them is drawn to meet them.
// Power is derived from torque (PS = Nm · rpm / 7023.5), so both curves stay physically consistent.
const PTS: [number, number][] = [
  [1000, 300],
  [2000, 352],
  [3000, 392],
  [4000, 424],
  [5000, 448],
  [5800, 461],
  [6300, 465],
  [7000, 460],
  [7600, 450],
  [8100, 442],
  [8500, 433.8],
  [8800, 418],
  [9000, 404],
]

// Monotone cubic (Fritsch–Carlson) so the curve never overshoots the official peak.
const xs = PTS.map((p) => p[0])
const ys = PTS.map((p) => p[1])
const n = PTS.length
const d: number[] = []
const m: number[] = new Array(n).fill(0)
for (let i = 0; i < n - 1; i++) d.push((ys[i + 1]! - ys[i]!) / (xs[i + 1]! - xs[i]!))
m[0] = d[0]!
m[n - 1] = d[n - 2]!
for (let i = 1; i < n - 1; i++) {
  if (d[i - 1]! * d[i]! <= 0) m[i] = 0
  else {
    const w1 = 2 * (xs[i + 1]! - xs[i]!) + (xs[i]! - xs[i - 1]!)
    const w2 = (xs[i + 1]! - xs[i]!) + 2 * (xs[i]! - xs[i - 1]!)
    m[i] = (w1 + w2) / (w1 / d[i - 1]! + w2 / d[i]!)
  }
}

export function torqueAt(rpm: number) {
  const r = Math.min(gt3.redline, Math.max(1000, rpm))
  let i = 0
  while (i < n - 2 && r > xs[i + 1]!) i++
  const h = xs[i + 1]! - xs[i]!
  const t = (r - xs[i]!) / h
  const t2 = t * t
  const t3 = t2 * t
  return (
    (2 * t3 - 3 * t2 + 1) * ys[i]! + (t3 - 2 * t2 + t) * h * m[i]! + (-2 * t3 + 3 * t2) * ys[i + 1]! + (t3 - t2) * h * m[i + 1]!
  )
}

export const powerAt = (rpm: number) => (torqueAt(rpm) * rpm) / 7023.5

export const CHART = { w: 640, h: 380, l: 46, r: 46, t: 24, b: 40, rpmMin: 1000, rpmMax: 9000, yMax: 600 }

export const xOf = (rpm: number) =>
  CHART.l + ((rpm - CHART.rpmMin) / (CHART.rpmMax - CHART.rpmMin)) * (CHART.w - CHART.l - CHART.r)
export const yOf = (v: number) => CHART.t + (1 - v / CHART.yMax) * (CHART.h - CHART.t - CHART.b)

export function curvePath(fn: (rpm: number) => number) {
  let s = ''
  for (let r = CHART.rpmMin; r <= CHART.rpmMax; r += 50) s += `${s ? 'L' : 'M'}${xOf(r).toFixed(1)} ${yOf(fn(r)).toFixed(1)}`
  return s
}
