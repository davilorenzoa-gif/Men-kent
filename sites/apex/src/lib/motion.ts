/** Shared motion vocabulary: two easings, used everywhere. */
export const EASE_EXPO = [0.16, 1, 0.3, 1] as const
export const EASE_CINE = [0.65, 0, 0.35, 1] as const

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v))
