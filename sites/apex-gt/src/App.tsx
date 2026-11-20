import { useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { Cursor } from './components/Cursor'
import { Hero } from './sections/Hero'
import { Machine } from './sections/Machine'
import { Details } from './sections/Details'
import { Collection } from './sections/Collection'
import { Story } from './sections/Story'
import { Footer } from './sections/Footer'
import { ScrollTrigger, startLenis } from './lib/gsap'

export default function App() {
  useEffect(() => {
    startLenis()
    // Fonts and lazy images change heights: re-measure pins once everything has settled.
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <>
      <a href="#machine" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-ice focus:px-4 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <Machine />
        <Details />
        <Collection />
        <Story />
      </main>
      <Footer />
      <Cursor />
    </>
  )
}
