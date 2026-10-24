import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './pages/Hero'
import About from './pages/About'
import Problem from './pages/Problem'
import Personalize from './pages/Personalize'
import Solution from './pages/Solution'
import Features from './pages/Features'
import MagicDemo from './pages/MagicDemo'
import QuickWin from './pages/QuickWin'
import Projects from './pages/Projects'
import CTA from './pages/CTA'
import Contact from './pages/Contact'
import './styles/App.css'

function App() {
  const [persona, setPersona] = useState(null)
  const location = useLocation()
  useEffect(() => {
    const cursor = document.getElementById('customCursor')
    if (!cursor) return

    const moveCursor = (e) => {
        cursor.style.left = `${e.clientX}px`
        cursor.style.top = `${e.clientY}px`
    }

    // Expand cursor on hoverable elements
    const handleMouseOver = (e) => {
        if (e.target.closest('a, button, .persona-btn, .carousel-arrow, .project-card')) {
            cursor.classList.add('hovering')
        }
    }
    const handleMouseOut = (e) => {
        if (e.target.closest('a, button, .persona-btn, .carousel-arrow, .project-card')) {
            cursor.classList.remove('hovering')
        }
    }

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
        window.removeEventListener('mousemove', moveCursor)
        document.removeEventListener('mouseover', handleMouseOver)
        document.removeEventListener('mouseout', handleMouseOut)
    }
}, [])

  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Problem />
              <Personalize onSelect={setPersona} selectedPersona={persona} />
              <Solution persona={persona} />
              <Features />
              <MagicDemo />
              <QuickWin />
              <Projects />
              <CTA />
              <Contact />
            </>
          } />
        </Routes>
        <div className="app">
          <div className="custom-cursor" id="customCursor"></div>
          <Header />
          <main>...</main>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App