/**
 * The four engineering chapters of the Performance section.
 * Each headline number is a published manufacturer figure for the car named
 * in `subject`; `source` says where it comes from.
 */
export type Pillar = {
  id: 'aero' | 'engine' | 'transmission' | 'chassis'
  title: string
  subject: string
  value: number
  decimals: number
  unit: string
  caption: string
  body: string
  facts: { label: string; value: string }[]
  source: { label: string; url: string }
}

export const PILLARS: Pillar[] = [
  {
    id: 'aero',
    title: 'Aerodynamics',
    subject: 'Porsche 911 GT3 RS (992)',
    value: 860,
    decimals: 0,
    unit: 'kg',
    caption: 'of downforce at 285 km/h',
    body: 'Continuously adjustable wing elements at the front and on the two-part rear wing, a drag reduction system, and a wing whose upper edge sits higher than the roof. At 200 km/h the car already carries 409 kg of air.',
    facts: [
      { label: 'Downforce at 200 km/h', value: '409 kg' },
      { label: 'Downforce at 285 km/h', value: '860 kg' },
      { label: 'Active elements', value: 'Front and rear, with DRS' },
    ],
    source: {
      label: 'Porsche Newsroom',
      url: 'https://newsroom.porsche.com/dam/jcr:1d390f77-93c3-49c0-89c7-634f5f02b26a/S22_3515_en.pdf',
    },
  },
  {
    id: 'engine',
    title: 'Engine technology',
    subject: 'Ferrari 296 GTB',
    value: 221,
    decimals: 0,
    unit: 'cv/l',
    caption: 'specific output of the 120° V6',
    body: 'Opening the vee to 120° leaves room for both turbochargers inside it, which shrinks the engine and shortens the path the air has to travel. The 2,992 cm³ V6 alone makes 663 cv; the electric motor takes the total to 830.',
    facts: [
      { label: 'Displacement', value: '2,992 cm³' },
      { label: 'Combustion engine', value: '663 cv' },
      { label: 'Combined', value: '830 cv at 8,000 rpm' },
    ],
    source: { label: 'Ferrari', url: 'https://www.ferrari.com/en-EN/auto/296-gtb' },
  },
  {
    id: 'transmission',
    title: 'Transmission',
    subject: 'Mercedes-AMG GT 63 (C192)',
    value: 9,
    decimals: 0,
    unit: 'speeds',
    caption: 'AMG SPEEDSHIFT MCT 9G',
    body: 'Six cars, four schools of thought. Dual-clutch gearboxes in the Porsche, the McLaren and the Ferrari; torque-converter automatics in the BMW and the Audi; and in the AMG a multi-clutch unit with nine ratios.',
    facts: [
      { label: 'Fewest ratios', value: '7, McLaren 750S' },
      { label: 'Most ratios', value: '9, Mercedes-AMG GT 63' },
      { label: 'Driven axles', value: '3 cars rear, 3 cars all' },
    ],
    source: { label: 'Mercedes-AMG', url: 'https://www.mercedes-amg.com/en/gt-coupe' },
  },
  {
    id: 'chassis',
    title: 'Chassis engineering',
    subject: 'McLaren 750S',
    value: 1277,
    decimals: 0,
    unit: 'kg',
    caption: 'lightest dry weight',
    body: 'The carbon-fibre Monocage II is the passenger cell and the main structure at once. With 750 PS behind it, McLaren quotes 587 PS per tonne at the lightest dry weight.',
    facts: [
      { label: 'Structure', value: 'Carbon-fibre Monocage II' },
      { label: 'Power to weight', value: '587 PS per tonne' },
      { label: 'Ferrari 296 GTB, dry', value: '1,470 kg' },
    ],
    source: {
      label: 'McLaren media release',
      url: 'https://cars.mclaren.press/assets/documents/original/14922-ThenewMcLaren750Speaksupercarperformancepureexhilaration.pdf',
    },
  },
]

/** The two downforce points Porsche publishes for the 911 GT3 RS (992). */
export const DOWNFORCE_POINTS = [
  { kmh: 200, kg: 409 },
  { kmh: 285, kg: 860 },
] as const

/** The car in the opening photograph. */
export const HERO_CAR = {
  name: 'Porsche 911 GT3 RS',
  version: 'Type 992',
  facts: ['525 PS', '9,000 rpm', '860 kg downforce'],
  source: 'https://newsroom.porsche.com/dam/jcr:1d390f77-93c3-49c0-89c7-634f5f02b26a/S22_3515_en.pdf',
} as const
