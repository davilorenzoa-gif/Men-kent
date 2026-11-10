import type { ImageId } from './images.generated'

/**
 * CINEMATIC GARAGE playlist.
 *
 * Three kinds of film are supported by the player:
 *
 *  • 'video'  self-hosted files. Put them in /public/video and list every
 *             format you have; the browser picks the first it can play.
 *               { kind: 'video', sources: [
 *                   { src: 'video/launch.webm', type: 'video/webm' },
 *                   { src: 'video/launch.mp4',  type: 'video/mp4'  } ] }
 *
 *  • 'embed'  hosted video. Only the id is needed.
 *               { kind: 'embed', provider: 'youtube', videoId: 'xxxxxxxxxxx' }
 *               { kind: 'embed', provider: 'vimeo',   videoId: '123456789'   }
 *
 *  • 'reel'   a timed sequence of stills, played by the same controls. This is
 *             what ships today, so the player works before any footage exists.
 *
 * `poster` is the still shown before playback for every kind.
 */
export type FilmSource = { src: string; type: 'video/mp4' | 'video/webm' }

type FilmBase = {
  id: string
  title: string
  /** One line under the title. */
  note: string
  poster: ImageId
}

export type ReelFilm = FilmBase & {
  kind: 'reel'
  secondsPerFrame: number
  frames: { image: ImageId; caption: string }[]
}
export type VideoFilm = FilmBase & { kind: 'video'; sources: FilmSource[] }
export type EmbedFilm = FilmBase & { kind: 'embed'; provider: 'youtube' | 'vimeo'; videoId: string }

export type Film = ReelFilm | VideoFilm | EmbedFilm

export const FILMS: Film[] = [
  {
    id: 'the-collection',
    kind: 'reel',
    title: 'The Collection',
    note: 'Six cars, one after the other',
    poster: 'car-turbo-s',
    secondsPerFrame: 4.5,
    frames: [
      { image: 'car-turbo-s', caption: 'Porsche 911 Turbo S' },
      { image: 'car-amg-gt', caption: 'Mercedes-AMG GT 63' },
      { image: 'car-750s', caption: 'McLaren 750S' },
      { image: 'car-296', caption: 'Ferrari 296 GTB' },
      { image: 'car-m4', caption: 'BMW M4 Competition' },
      { image: 'car-rs6', caption: 'Audi RS 6 Avant' },
    ],
  },
  {
    id: 'after-dark',
    kind: 'reel',
    title: 'After Dark',
    note: 'Headlights, tail lights and a hall with the lamps down',
    poster: 'frame-2',
    secondsPerFrame: 5,
    frames: [
      { image: 'frame-2', caption: 'Ferrari 296 GTB' },
      { image: 'frame-4', caption: 'Ferrari 296 GTB' },
      { image: 'hero', caption: 'Porsche 911 GT3 RS' },
    ],
  },
  {
    id: 'in-detail',
    kind: 'reel',
    title: 'In Detail',
    note: 'A seat, a wheel, a steering wheel, a tail',
    poster: 'frame-3',
    secondsPerFrame: 4.5,
    frames: [
      { image: 'frame-1', caption: 'McLaren 750S' },
      { image: 'frame-3', caption: 'Porsche 911 GT3 RS' },
      { image: 'frame-5', caption: 'Audi RS 6 Avant' },
      { image: 'frame-6', caption: 'Audi RS 6 Avant' },
    ],
  },
]

/** Seconds a film lasts when it is a reel; `null` when the media decides. */
export const reelDuration = (film: Film): number | null =>
  film.kind === 'reel' ? film.frames.length * film.secondsPerFrame : null
