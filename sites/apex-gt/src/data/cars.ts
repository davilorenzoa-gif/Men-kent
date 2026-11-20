// Manufacturer figures (press kits / official configurators). Nothing here is estimated.
// "0–100" in seconds, power in PS (metric horsepower), torque in Nm, top speed in km/h.

export type Car = {
  id: string
  index: string
  make: string
  model: string
  category: string
  engine: string
  power: number
  torque: number
  torqueNote?: string
  zeroToHundred: number
  topSpeed: number
  topSpeedPlus?: boolean
  drivetrain: string
  img: string
  imgWidths: number[]
  imgRatio: number
  alt: string
  tone: string
  note: string
}

export const cars: Car[] = [
  {
    id: 'gt3-rs',
    index: '01',
    make: 'Porsche',
    model: '911 GT3 RS',
    category: 'Track-bred coupé',
    engine: '4.0 L flat-six, naturally aspirated',
    power: 525,
    torque: 465,
    zeroToHundred: 3.2,
    topSpeed: 296,
    drivetrain: 'Rear-wheel drive · 7-speed PDK',
    img: 'gt3-studio',
    imgWidths: [640, 1080],
    imgRatio: 1080 / 715,
    alt: 'Porsche 911 GT3 RS in light grey with red wheels, headlights on, in a dark studio',
    tone: '#b71925',
    note: 'Swan-neck wing with DRS and 860 kg of downforce at 285 km/h. A 9,000 rpm engine in a road car.',
  },
  {
    id: '296-gtb',
    index: '02',
    make: 'Ferrari',
    model: '296 GTB',
    category: 'Plug-in hybrid berlinetta',
    engine: '3.0 L V6 twin-turbo + electric motor',
    power: 830,
    torque: 740,
    zeroToHundred: 2.9,
    topSpeed: 330,
    topSpeedPlus: true,
    drivetrain: 'Rear-wheel drive · 8-speed DCT',
    img: 'f296',
    imgWidths: [640, 1080],
    imgRatio: 1080 / 602,
    alt: 'Ferrari 296 GTB in dark green with gold wheels, side profile in a concrete hall',
    tone: '#1f5a3a',
    note: 'The first road Ferrari with a six-cylinder hybrid. Up to 25 km on electric power alone.',
  },
  {
    id: '750s',
    index: '03',
    make: 'McLaren',
    model: '750S',
    category: 'Carbon-tub supercar',
    engine: '4.0 L V8 twin-turbo',
    power: 750,
    torque: 800,
    zeroToHundred: 2.8,
    topSpeed: 332,
    drivetrain: 'Rear-wheel drive · 7-speed SSG',
    img: 'm750s',
    imgWidths: [640, 1080],
    imgRatio: 1080 / 715,
    alt: 'Black McLaren 750S seen from behind, rear lights glowing through low fog',
    tone: '#c2561c',
    note: 'Built around a carbon fibre Monocage II-T. Dry weight of 1,277 kg.',
  },
  {
    id: 'amg-gt',
    index: '04',
    make: 'Mercedes-AMG',
    model: 'GT 63 4MATIC+',
    category: 'Grand tourer',
    engine: '4.0 L V8 biturbo',
    power: 585,
    torque: 800,
    zeroToHundred: 3.2,
    topSpeed: 315,
    drivetrain: 'All-wheel drive · 9-speed MCT',
    img: 'amg-gt',
    imgWidths: [640, 1440],
    imgRatio: 1440 / 1004,
    alt: 'White Mercedes-AMG GT 63 coupé, rear three-quarter view on a show floor',
    tone: '#6f7378',
    note: 'Fully variable all-wheel drive and active rear-axle steering, with 2+2 seats.',
  },
  {
    id: 'revuelto',
    index: '05',
    make: 'Lamborghini',
    model: 'Revuelto',
    category: 'V12 hybrid (HPEV)',
    engine: '6.5 L V12 + three electric motors',
    power: 1015,
    torque: 725,
    torqueNote: 'V12 alone',
    zeroToHundred: 2.5,
    topSpeed: 350,
    topSpeedPlus: true,
    drivetrain: 'All-wheel drive · 8-speed DCT',
    img: 'revuelto',
    imgWidths: [640, 1440],
    imgRatio: 1440 / 779,
    alt: 'White Lamborghini Revuelto, rear three-quarter view showing the hexagonal exhausts',
    tone: '#c9a227',
    note: 'A naturally aspirated V12 that revs to 9,500 rpm, paired with three electric motors.',
  },
]

/** Porsche 911 GT3 RS (992), figures used by The Machine section. */
export const gt3 = {
  redline: 9000,
  powerPeakRpm: 8500,
  torquePeakRpm: 6300,
  power: 525,
  powerKw: 386,
  torque: 465,
  displacement: 4.0,
  zeroToHundred: 3.2,
  topSpeed: 296,
  downforce: 860,
  downforceSpeed: 285,
  weight: 1450,
}
