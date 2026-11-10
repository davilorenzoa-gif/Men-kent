/** Single source for the navbar, the mobile menu, the side rail and the footer. */
export const SECTIONS = [
  { id: 'collection', label: 'Collection' },
  { id: 'performance', label: 'Performance' },
  { id: 'frames', label: 'Frames' },
  { id: 'cinema', label: 'Cinematic Garage' },
] as const

export type SectionId = (typeof SECTIONS)[number]['id']

/** Ids watched to highlight the current section (hero included). */
export const TRACKED_IDS = ['top', ...SECTIONS.map((s) => s.id)] as const
