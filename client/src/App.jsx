// src/App.jsx
//
// This is the root of my entire React app.
// Think of it as the skeleton that holds every section together.
//
// KEY CONCEPT — Lifting state up:
// The persona the visitor selects on the Personalize section
// needs to be known by the Solution section too.
// Instead of each component managing its own copy, I store it
// HERE at the top level and pass it down as props.
// This is called "lifting state up" — a core React pattern.

import { useState, useEffect } from 'react'
import Navbar      from './components/Navbar'
//import Footer      from './components/Footer'
import Hero        from './pages/Hero'
import Problem     from './pages/Problem'
import Personalize from './pages/Personalize'
import Solution    from './pages/Solution'
import Features    from './pages/Features'
import MagicDemo   from './pages/MagicDemo'
import QuickWin    from './pages/QuickWin'
import About       from './pages/About'
import Projects    from './pages/Projects'
import Pricing     from './pages/Pricing'
import CTA         from './pages/CTA'
import Contact     from './pages/Contact'

export default function App() {
  // Persona state lives here so both Personalize and Solution can use it
  const [persona, setPersona] = useState(null)

  // Scroll progress bar — replaces the vanilla JS scroll listener
  useEffect(() => {
    const bar = document.querySelector('.scroll-progress')
    if (!bar) return

    const onScroll = () => {
      const scrolled = window.scrollY
      const total    = document.documentElement.scrollHeight - window.innerHeight
      const pct      = total > 0 ? (scrolled / total) * 100 : 0
      bar.style.width = `${pct}%`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Custom cursor — replaces the vanilla JS cursor tracking
  useEffect(() => {
    const dot  = document.querySelector('.cursor-dot')
    const ring = document.querySelector('.cursor-ring')
    if (!dot || !ring) return

    let ringX = 0, ringY = 0
    let dotX  = 0, dotY  = 0
    let raf

    const onMouseMove = (e) => {
      dotX  = e.clientX
      dotY  = e.clientY
    }

    const animate = () => {
      ringX += (dotX - ringX) * 0.12
      ringY += (dotY - ringY) * 0.12
      dot.style.transform  = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(animate)
    }

    const onMouseOver = (e) => {
      const hoverable = e.target.closest('a, button, .persona-btn, .outcome-card, .project-card, .pricing-card')
      if (hoverable) ring.classList.add('hovering')
      else           ring.classList.remove('hovering')
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseover', onMouseOver)
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* Global overlays — these sit on top of everything */}
      <div className="noise-overlay"   aria-hidden="true"></div>
      <div className="scroll-progress" aria-hidden="true"></div>
      <div className="cursor-dot"      aria-hidden="true"></div>
      <div className="cursor-ring"     aria-hidden="true"></div>

      {/* Navigation */}
      <Navbar />

      {/* All 8 screens in order */}
      <main>
        <Hero />

        {/* Screen 2 — Problem */}
        <Problem />

        {/* Screen 3 — Personalization
            onSelect passes the chosen persona UP to App,
            which then passes it DOWN to Solution below     */}
        <Personalize onSelect={setPersona} selectedPersona={persona} />

        {/* Screen 4 — Solution (reads the persona chosen above) */}
        <Solution persona={persona} />

        {/* Screen 5 — Features as outcomes */}
        <Features />

        {/* Screen 6 — Magic demo */}
        <MagicDemo />

        {/* Screen 7 — Quick win audit */}
        <QuickWin />

        {/* Supporting sections */}
        <About />
        <Projects />
        <Pricing />

        {/* Screen 8 — CTA */}
        <CTA />

        <Contact />
      </main>

      {/* <Footer /> */}
    </>
  )
}
