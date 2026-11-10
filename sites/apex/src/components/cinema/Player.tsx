import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { Maximize, Minimize, Pause, Play, RotateCcw, Volume2, VolumeX, X } from 'lucide-react'
import { Magnetic } from '../Magnetic'
import { Picture } from '../Picture'
import { reelDuration, type Film, type ReelFilm } from '../../data/films'
import { EASE_EXPO, clamp } from '../../lib/motion'
import { formatTime } from '../../lib/format'

const base = import.meta.env.BASE_URL
const FADE = 0.9

type PlayerProps = { film: Film; autoPlay?: boolean }

/**
 * One player for three kinds of film (see data/films.ts):
 * self-hosted video, hosted embed, or a timed reel of stills.
 * The same transport drives video and reel: play/pause, scrub, time,
 * fullscreen, keyboard (Space/K, ←/→, M, F).
 */
export function Player({ film, autoPlay = false }: PlayerProps) {
  const stage = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const reduced = useReducedMotion()

  const [started, setStarted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [ended, setEnded] = useState(false)
  const [muted, setMuted] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [idle, setIdle] = useState(false)
  const [duration, setDuration] = useState(reelDuration(film) ?? 0)
  const [shownSecond, setShownSecond] = useState(0)

  /* Playback position lives in a motion value: the UI reads it without re-rendering every frame. */
  const time = useMotionValue(0)
  const progress = useTransform(time, (t) => (duration > 0 ? clamp(t / duration) : 0))
  useMotionValueEvent(time, 'change', (t) => {
    const s = Math.floor(t)
    setShownSecond((prev) => (prev === s ? prev : s))
  })

  const isReel = film.kind === 'reel'
  const isEmbed = film.kind === 'embed'

  /* ── Transport ── */
  const play = useCallback(() => {
    setStarted(true)
    setEnded(false)
    if (film.kind === 'video') {
      void video.current?.play().catch(() => setPlaying(false))
    } else {
      if (isReel && duration > 0 && time.get() >= duration) time.set(0)
      setPlaying(true)
    }
  }, [duration, film.kind, isReel, time])

  const pause = useCallback(() => {
    if (film.kind === 'video') video.current?.pause()
    else setPlaying(false)
  }, [film.kind])

  const toggle = useCallback(() => (playing ? pause() : play()), [pause, play, playing])

  const seek = useCallback(
    (to: number) => {
      const t = clamp(to, 0, duration || 0)
      time.set(t)
      if (film.kind === 'video' && video.current) video.current.currentTime = t
      if (t < duration) setEnded(false)
    },
    [duration, film.kind, time],
  )

  /* Reel clock */
  useEffect(() => {
    if (!isReel || !playing) return
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const next = time.get() + (now - last) / 1000
      last = now
      if (next >= duration) {
        time.set(duration)
        setPlaying(false)
        setEnded(true)
        return
      }
      time.set(next)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [duration, isReel, playing, time])

  /* Start on mount when the viewer picked this film from the playlist */
  useEffect(() => {
    if (autoPlay) play()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* Pause when the stage leaves the viewport */
  useEffect(() => {
    const el = stage.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry && !entry.isIntersecting) pause()
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [pause])

  /* Controls fade out while playing and the pointer rests */
  useEffect(() => {
    if (!playing) {
      setIdle(false)
      return
    }
    const timer = setTimeout(() => setIdle(true), 2600)
    return () => clearTimeout(timer)
  }, [playing, shownSecond, idle])
  const wake = () => setIdle(false)

  /* Fullscreen */
  const canFullscreen = typeof document !== 'undefined' && document.fullscreenEnabled
  useEffect(() => {
    const onChange = () => setFullscreen(document.fullscreenElement === stage.current)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])
  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen()
    else void stage.current?.requestFullscreen().catch(() => undefined)
  }, [])

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (isEmbed) return
    const tag = (e.target as HTMLElement).tagName
    if (tag === 'INPUT') return
    switch (e.key) {
      case ' ':
      case 'k':
        if (tag === 'BUTTON' && e.key === ' ') return
        e.preventDefault()
        toggle()
        break
      case 'ArrowRight':
        seek(time.get() + 5)
        break
      case 'ArrowLeft':
        seek(time.get() - 5)
        break
      case 'm':
        setMuted((m) => !m)
        break
      case 'f':
        if (canFullscreen) toggleFullscreen()
        break
    }
    wake()
  }

  const showControls = started && !isEmbed && (!playing || !idle)

  return (
    <div
      ref={stage}
      tabIndex={0}
      role="group"
      aria-label={`Film player: ${film.title}`}
      onKeyDown={onKeyDown}
      onPointerMove={wake}
      className={`group/stage relative w-full overflow-hidden bg-black outline-none focus-visible:ring-2 focus-visible:ring-apex ${
        fullscreen ? 'h-full' : 'aspect-video md:aspect-[21/9]'
      } ${playing && idle ? 'cursor-none' : ''}`}
    >
      {/* ── Picture ── */}
      {film.kind === 'reel' && started && <Reel film={film} time={time} still={!!reduced} />}

      {film.kind === 'video' && (
        <video
          ref={video}
          className="absolute inset-0 h-full w-full object-cover"
          playsInline
          preload="metadata"
          muted={muted}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
          onTimeUpdate={(e) => time.set(e.currentTarget.currentTime)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => {
            setPlaying(false)
            setEnded(true)
          }}
        >
          {film.sources.map((source) => (
            <source key={source.src} src={`${base}${source.src}`} type={source.type} />
          ))}
        </video>
      )}

      {film.kind === 'embed' && started && (
        <iframe
          className="absolute inset-0 h-full w-full"
          title={film.title}
          src={
            film.provider === 'youtube'
              ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(film.videoId)}?autoplay=1&rel=0&playsinline=1`
              : `https://player.vimeo.com/video/${encodeURIComponent(film.videoId)}?autoplay=1&dnt=1`
          }
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      )}

      {/* Click surface for play / pause */}
      {!isEmbed && started && (
        <button
          type="button"
          tabIndex={-1}
          aria-hidden
          onClick={toggle}
          data-cursor={playing ? 'Pause' : ended ? 'Replay' : 'Play'}
          className="absolute inset-0 cursor-pointer"
        />
      )}

      {/* ── Poster ── */}
      <AnimatePresence>
        {!started && (
          <motion.div className="absolute inset-0" exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: 'linear' }}>
            <div className="absolute inset-0 animate-kenburns">
              <Picture id={film.poster} sizes="100vw" alt="" />
            </div>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/45" />
            <button
              type="button"
              onClick={play}
              data-cursor="Play"
              aria-label={`Play ${film.title}`}
              className="group/play absolute inset-0 grid place-items-center pb-14 sm:pb-0"
            >
              <Magnetic strength={0.35}>
                <span className="relative grid size-16 place-items-center rounded-full border border-paper/50 text-paper transition-[border-color,background-color,transform] duration-500 ease-expo group-hover/play:scale-110 group-hover/play:border-apex group-hover/play:bg-apex sm:size-24">
                  <Play aria-hidden className="ml-1 size-5 sm:size-6" fill="currentColor" strokeWidth={0} />
                </span>
              </Magnetic>
            </button>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-5 sm:p-8">
              <div>
                <p className="display text-[clamp(1.75rem,5.4vw,5rem)] text-paper">{film.title}</p>
                <p className="mt-1.5 text-[0.8125rem] text-silver sm:mt-2 sm:text-[0.9375rem]">{film.note}</p>
              </div>
              <p className="hidden shrink-0 data text-silver sm:block">{kindLabel(film)}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ended: replay */}
      <AnimatePresence>
        {ended && !isEmbed && (
          <motion.div
            className="pointer-events-none absolute inset-0 grid place-items-center bg-black/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="grid size-20 place-items-center rounded-full border border-paper/50 text-paper">
              <RotateCcw aria-hidden strokeWidth={1.5} className="size-6" />
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Embed: way back to the poster */}
      {isEmbed && started && (
        <button
          type="button"
          onClick={() => setStarted(false)}
          aria-label="Close video"
          className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-black/70 text-paper transition-colors hover:bg-apex"
        >
          <X aria-hidden strokeWidth={1.5} className="size-5" />
        </button>
      )}

      {/* ── Transport bar ── */}
      <motion.div
        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-4 pt-14 pb-3 sm:px-7 sm:pb-5"
        initial={false}
        animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 8 }}
        transition={{ duration: 0.45, ease: EASE_EXPO }}
        style={{ pointerEvents: showControls ? 'auto' : 'none' }}
        onFocusCapture={wake}
      >
        <div className="relative h-5">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-paper/25">
            <motion.div className="h-full origin-left bg-paper" style={{ scaleX: progress }} />
          </div>
          <input
            type="range"
            min={0}
            max={Math.max(duration, 0.01)}
            step={0.1}
            value={Math.min(shownSecond, duration)}
            onChange={(e) => seek(Number(e.currentTarget.value))}
            onInput={(e) => seek(Number(e.currentTarget.value))}
            aria-label="Seek"
            aria-valuetext={`${formatTime(shownSecond)} of ${formatTime(duration)}`}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </div>

        <div className="mt-1 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1 sm:gap-2">
            <TransportButton label={playing ? 'Pause' : ended ? 'Replay' : 'Play'} onClick={toggle}>
              {playing ? (
                <Pause aria-hidden className="size-4" fill="currentColor" strokeWidth={0} />
              ) : ended ? (
                <RotateCcw aria-hidden strokeWidth={1.75} className="size-4" />
              ) : (
                <Play aria-hidden className="size-4" fill="currentColor" strokeWidth={0} />
              )}
            </TransportButton>
            <span className="data ml-1 text-paper tabular-nums" aria-live="off">
              {formatTime(shownSecond)} <span className="text-paper/50">/ {formatTime(duration)}</span>
            </span>
          </div>

          <p className="hidden min-w-0 truncate data text-paper/70 md:block">{film.title}</p>

          <div className="flex items-center gap-1 sm:gap-2">
            {film.kind === 'video' && (
              <TransportButton label={muted ? 'Unmute' : 'Mute'} onClick={() => setMuted((m) => !m)}>
                {muted ? <VolumeX aria-hidden strokeWidth={1.5} className="size-4" /> : <Volume2 aria-hidden strokeWidth={1.5} className="size-4" />}
              </TransportButton>
            )}
            {canFullscreen && (
              <TransportButton label={fullscreen ? 'Exit full screen' : 'Full screen'} onClick={toggleFullscreen}>
                {fullscreen ? <Minimize aria-hidden strokeWidth={1.5} className="size-4" /> : <Maximize aria-hidden strokeWidth={1.5} className="size-4" />}
              </TransportButton>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function kindLabel(film: Film): string {
  if (film.kind === 'reel') return `Stills reel, ${formatTime(reelDuration(film) ?? 0)}`
  if (film.kind === 'video') return 'Video'
  return film.provider === 'youtube' ? 'YouTube' : 'Vimeo'
}

function TransportButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-10 place-items-center rounded-full text-paper transition-[background-color,transform] duration-300 hover:bg-paper/15 active:scale-90"
    >
      {children}
    </button>
  )
}

/* ───────────────────────── Stills reel ───────────────────────── */

function Reel({ film, time, still }: { film: ReelFilm; time: MotionValue<number>; still: boolean }) {
  const spf = film.secondsPerFrame
  const [current, setCurrent] = useState(0)
  useMotionValueEvent(time, 'change', (t) => {
    const i = Math.min(film.frames.length - 1, Math.floor(t / spf))
    setCurrent((prev) => (prev === i ? prev : i))
  })
  const caption = film.frames[current]?.caption

  return (
    <div className="absolute inset-0">
      {/* isolate: the frames stack among themselves, below the caption */}
      <div className="absolute inset-0 isolate">
        {film.frames.map((frame, i) =>
          // Mount a frame shortly before it is needed so the next image is already decoded.
          i <= current + 1 ? <ReelFrame key={i} index={i} image={frame.image} spf={spf} time={time} still={still} /> : null,
        )}
      </div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/35" />
      <AnimatePresence mode="wait">
        {caption && (
          <motion.p
            key={caption}
            className="absolute top-5 left-5 display text-[clamp(1.5rem,3vw,2.75rem)] text-paper sm:top-8 sm:left-8"
            initial={{ opacity: 0, y: still ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE_EXPO }}
          >
            {caption}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function ReelFrame({ index, image, spf, time, still }: { index: number; image: Film['poster']; spf: number; time: MotionValue<number>; still: boolean }) {
  const start = index * spf
  const opacity = useTransform(time, (t) => (index === 0 ? 1 : clamp((t - start) / FADE)))
  // Slow push-in across the frame's time on screen; alternate the origin so cuts feel different.
  const scale = useTransform(time, (t) => (still ? 1 : 1.03 + 0.1 * clamp((t - start) / (spf + FADE))))
  return (
    <motion.div className="absolute inset-0" style={{ opacity, zIndex: index }}>
      <motion.div className="h-full w-full" style={{ scale, transformOrigin: index % 2 === 0 ? '30% 55%' : '70% 45%' }}>
        <Picture id={image} sizes="100vw" alt="" />
      </motion.div>
    </motion.div>
  )
}
