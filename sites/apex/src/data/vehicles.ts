import type { ImageId } from './images.generated'

/**
 * Every figure below is manufacturer data for the exact version named in
 * `version`, and `source` links to where it was published. Nothing here is
 * estimated. If a photo is swapped for a different version of a car, update
 * the figures with it.
 *
 * Power is given in PS (metric horsepower, identical to the Italian "cv").
 */
export type Vehicle = {
  slug: string
  maker: string
  model: string
  /** Exact version the figures apply to. */
  version: string
  country: string
  image: ImageId
  /** One factual sentence. No superlatives the manufacturer did not publish. */
  summary: string
  powerPs: number
  powerKw: number
  torqueNm: number
  /** 0–100 km/h, seconds */
  sprint: number
  topSpeedKmh: number
  /** Printed next to the top speed when it needs context (limiter, "over"). */
  topSpeedNote?: string
  engine: string
  displacementCc: number
  transmission: string
  gears: number
  drive: string
  source: { label: string; url: string }
}

export const VEHICLES: Vehicle[] = [
  {
    slug: 'porsche-911-turbo-s',
    maker: 'Porsche',
    model: '911 Turbo S',
    version: 'Coupé, type 992.2, T-Hybrid',
    country: 'Germany',
    image: 'car-turbo-s',
    summary:
      'A 3.6-litre flat-six with two electric turbochargers and an electric motor inside the eight-speed PDK. With 523 kW of system output, Porsche calls it the most powerful production 911 to date.',
    powerPs: 711,
    powerKw: 523,
    torqueNm: 800,
    sprint: 2.5,
    topSpeedKmh: 322,
    engine: 'Twin-turbo flat-six, T-Hybrid',
    displacementCc: 3591,
    transmission: '8-speed PDK dual-clutch',
    gears: 8,
    drive: 'All-wheel drive',
    source: {
      label: 'Porsche Newsroom',
      url: 'https://newsroom.porsche.com/en/press-kits/pfv-porsche-911-turbo-s/Summary.html',
    },
  },
  {
    slug: 'mercedes-amg-gt',
    maker: 'Mercedes-AMG',
    model: 'GT 63',
    version: 'GT 63 4MATIC+ Coupé, C192',
    country: 'Germany',
    image: 'car-amg-gt',
    summary:
      'The second-generation GT pairs the hand-built 4.0-litre V8 biturbo with fully variable all-wheel drive and a nine-speed multi-clutch transmission.',
    powerPs: 585,
    powerKw: 430,
    torqueNm: 800,
    sprint: 3.2,
    topSpeedKmh: 315,
    engine: 'V8 biturbo',
    displacementCc: 3982,
    transmission: 'AMG SPEEDSHIFT MCT 9G',
    gears: 9,
    drive: 'AMG Performance 4MATIC+ all-wheel drive',
    source: { label: 'Mercedes-AMG', url: 'https://www.mercedes-amg.com/en/gt-coupe' },
  },
  {
    slug: 'mclaren-750s',
    maker: 'McLaren',
    model: '750S',
    version: 'Coupé',
    country: 'United Kingdom',
    image: 'car-750s',
    summary:
      'A carbon-fibre Monocage II, a 4.0-litre twin-turbo V8 and a lightest dry weight of 1,277 kg: McLaren quotes 587 PS per tonne.',
    powerPs: 750,
    powerKw: 552,
    torqueNm: 800,
    sprint: 2.8,
    topSpeedKmh: 332,
    engine: 'Twin-turbo V8',
    displacementCc: 3994,
    transmission: '7-speed SSG',
    gears: 7,
    drive: 'Rear-wheel drive',
    source: { label: 'McLaren Automotive', url: 'https://cars.mclaren.com/en/750s' },
  },
  {
    slug: 'ferrari-296-gtb',
    maker: 'Ferrari',
    model: '296 GTB',
    version: 'Plug-in hybrid berlinetta',
    country: 'Italy',
    image: 'car-296',
    summary:
      'A 120° V6 producing 663 cv on its own, joined by an electric motor for 830 cv combined. Ferrari cites 221 cv per litre, a production-car record.',
    powerPs: 830,
    powerKw: 610,
    torqueNm: 740,
    sprint: 2.9,
    topSpeedKmh: 330,
    topSpeedNote: 'over',
    engine: 'Twin-turbo 120° V6 with electric motor',
    displacementCc: 2992,
    transmission: '8-speed F1 DCT',
    gears: 8,
    drive: 'Rear-wheel drive',
    source: { label: 'Ferrari', url: 'https://www.ferrari.com/en-EN/auto/296-gtb' },
  },
  {
    slug: 'bmw-m4-competition',
    maker: 'BMW M',
    model: 'M4 Competition',
    version: 'Coupé, G82, rear-wheel-drive version',
    country: 'Germany',
    image: 'car-m4',
    summary:
      'A 3.0-litre straight-six with M TwinPower Turbo technology sending 650 Nm to the rear axle through an Active M Differential.',
    powerPs: 510,
    powerKw: 375,
    torqueNm: 650,
    sprint: 3.9,
    topSpeedKmh: 250,
    topSpeedNote: 'limited, 290 with M Driver’s Package',
    engine: 'Twin-turbo straight-six',
    displacementCc: 2993,
    transmission: '8-speed M Steptronic with Drivelogic',
    gears: 8,
    drive: 'Rear-wheel drive',
    source: {
      label: 'BMW M',
      url: 'https://www.bmw-m.com/en/all-models/overview-m-and-m-performance/bmw-m4-coupe/2024/bmw-m4-coupe-and-m4-competition-coupe.html',
    },
  },
  {
    slug: 'audi-rs6-avant',
    maker: 'Audi Sport',
    model: 'RS 6 Avant',
    version: 'C8, 4.0 TFSI quattro',
    country: 'Germany',
    image: 'car-rs6',
    summary:
      'A twin-turbo V8 with a 48-volt mild-hybrid system holds 800 Nm from 2,050 to 4,500 rpm, in a body that still carries a family and its luggage.',
    powerPs: 600,
    powerKw: 441,
    torqueNm: 800,
    sprint: 3.6,
    topSpeedKmh: 250,
    topSpeedNote: 'limited, up to 305 with dynamic package plus',
    engine: 'Twin-turbo V8 with 48 V mild hybrid',
    displacementCc: 3996,
    transmission: '8-speed tiptronic',
    gears: 8,
    drive: 'quattro all-wheel drive',
    source: {
      label: 'Audi',
      url: 'https://www.audi.com/en/the-audi-rs-6-avant-and-the-new-audi-rs-6-avant-performance-12345/the-facts-12347',
    },
  },
]

export const vehicleBySlug = (slug: string | null) => VEHICLES.find((v) => v.slug === slug) ?? null

/* ── Metrics shared by the cards, the gauges and the comparison chart ── */

export type MetricKey = 'power' | 'torque' | 'sprint' | 'topSpeed'

export type Metric = {
  key: MetricKey
  label: string
  short: string
  unit: string
  decimals: number
  /** Gauge scale. For the sprint the scale is inverted: quicker fills more. */
  min: number
  max: number
  lowerIsBetter?: boolean
  value: (v: Vehicle) => number
}

export const METRICS: Metric[] = [
  { key: 'power', label: 'Power', short: 'Power', unit: 'PS', decimals: 0, min: 0, max: 900, value: (v) => v.powerPs },
  { key: 'torque', label: 'Torque', short: 'Torque', unit: 'Nm', decimals: 0, min: 0, max: 900, value: (v) => v.torqueNm },
  {
    key: 'sprint',
    label: '0 to 100 km/h',
    short: '0–100',
    unit: 's',
    decimals: 1,
    min: 2,
    max: 5,
    lowerIsBetter: true,
    value: (v) => v.sprint,
  },
  {
    key: 'topSpeed',
    label: 'Top speed',
    short: 'Top speed',
    unit: 'km/h',
    decimals: 0,
    min: 0,
    max: 360,
    value: (v) => v.topSpeedKmh,
  },
]

export const metricByKey = (key: MetricKey): Metric => METRICS.find((m) => m.key === key) ?? METRICS[0]!

/** 0 → 1 position of a value on a metric's gauge scale. */
export function metricRatio(metric: Metric, value: number): number {
  const t = (value - metric.min) / (metric.max - metric.min)
  const clamped = Math.min(1, Math.max(0, t))
  return metric.lowerIsBetter ? 1 - clamped : clamped
}

/* ── Collection-wide facts, derived (never typed by hand) ── */
export const COLLECTION = {
  count: VEHICLES.length,
  combinedPowerPs: VEHICLES.reduce((sum, v) => sum + v.powerPs, 0),
  quickestSprint: Math.min(...VEHICLES.map((v) => v.sprint)),
  highestTopSpeed: Math.max(...VEHICLES.map((v) => v.topSpeedKmh)),
}
