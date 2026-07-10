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
import Pricing from './pages/Pricing'
import CTA from './pages/CTA'
import Contact from './pages/Contact'
import './styles/App.css'

function App() {
  const [persona, setPersona] = useState(null)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

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
              <Pricing />
              <CTA />
              <Contact />
            </>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App