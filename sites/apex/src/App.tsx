import { useCallback, useEffect, useMemo, useState } from 'react'
import { MotionConfig } from 'motion/react'
import { Cursor } from './components/Cursor'
import { Loader } from './components/Loader'
import { Navbar } from './components/Navbar'
import { preloadImage } from './components/Picture'
import { ScrollProgress } from './components/ScrollProgress'
import { VEHICLES, vehicleBySlug, type MetricKey } from './data/vehicles'
import { SmoothScrollProvider, useScrollLock, useSmoothScroll } from './hooks/useSmoothScroll'
import { Cinema } from './sections/Cinema'
import { Credits } from './sections/Credits'
import { Footer } from './sections/Footer'
import { Frames } from './sections/Frames'
import { Garage } from './sections/Garage'
import { HERO_SIZES, Hero } from './sections/Hero'
import { Manifesto } from './sections/Manifesto'
import { Performance } from './sections/Performance'
import { VehicleDetail } from './sections/VehicleDetail'

const readCarFromUrl = () => new URLSearchParams(window.location.search).get('car')

/** Mirrors the open car in the address bar. Embedded viewers may refuse it; the page works regardless. */
function writeCarToUrl(slug: string | null, mode: 'push' | 'replace') {
  try {
    const url = new URL(window.location.href)
    if (slug) url.searchParams.set('car', slug)
    else url.searchParams.delete('car')
    if (mode === 'push') window.history.pushState(null, '', url)
    else window.history.replaceState(null, '', url)
  } catch {
    /* sandboxed frame: keep the state in memory only */
  }
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider>
        <Page />
      </SmoothScrollProvider>
    </MotionConfig>
  )
}

function Page() {
  const { scrollTo } = useSmoothScroll()

  /* ── Loading: wait for the hero photograph and the webfonts ── */
  const [loaded, setLoaded] = useState(false)
  const assets = useMemo(() => Promise.all([preloadImage('hero', HERO_SIZES), document.fonts?.ready]), [])
  useScrollLock(!loaded)

  /* ── Open car: mirrored in the URL (?car=slug) so Back closes it and links can be shared ── */
  const [carSlug, setCarSlug] = useState<string | null>(readCarFromUrl)
  useEffect(() => {
    const onPop = () => setCarSlug(readCarFromUrl())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const openCar = useCallback((slug: string) => {
    // Opening pushes one history entry; stepping between cars replaces it.
    writeCarToUrl(slug, readCarFromUrl() ? 'replace' : 'push')
    setCarSlug(slug)
  }, [])

  const closeCar = useCallback(() => {
    writeCarToUrl(null, 'replace')
    setCarSlug(null)
  }, [])

  /* ── Performance section state (shared so a car sheet can hand its car over) ── */
  const [selectedSlug, setSelectedSlug] = useState(VEHICLES[0]!.slug)
  const [metric, setMetric] = useState<MetricKey>('power')
  const selected = vehicleBySlug(selectedSlug) ?? VEHICLES[0]!

  const compare = useCallback(
    (slug: string) => {
      setSelectedSlug(slug)
      closeCar()
      // Let the sheet start closing and the scroll lock release before travelling.
      window.setTimeout(() => scrollTo('#telemetry', { offset: -160 }), 60)
    },
    [closeCar, scrollTo],
  )

  const [creditsOpen, setCreditsOpen] = useState(false)

  return (
    <>
      <a
        href="#collection"
        className="fixed top-3 left-3 z-[110] -translate-y-20 bg-paper px-4 py-3 text-[0.6875rem] wide text-ink transition-transform focus:translate-y-0"
      >
        Skip to the collection
      </a>

      {!loaded && <Loader ready={assets} onDone={() => setLoaded(true)} />}

      <Navbar visible={loaded} />
      <ScrollProgress />
      <Cursor />

      <main>
        {/* The hero is sticky inside this wrapper, so the manifesto slides over it */}
        <div className="relative">
          <Hero ready={loaded} />
          <Manifesto />
        </div>
        <Garage onOpen={openCar} />
        <Performance selected={selected} onSelect={setSelectedSlug} metric={metric} onMetric={setMetric} />
        <Frames />
        <Cinema />
      </main>

      <Footer onCredits={() => setCreditsOpen(true)} />

      <VehicleDetail vehicle={vehicleBySlug(carSlug)} onClose={closeCar} onNavigate={openCar} onCompare={compare} />
      <Credits open={creditsOpen} onClose={() => setCreditsOpen(false)} />
    </>
  )
}
