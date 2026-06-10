// src/components/Navbar.jsx
import { useState, useEffect } from 'react'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <a href="#hero" className="nav-logo">
                    <img
                        src="/assets/images/logo.png"
                        alt="The Reggs Limited logo"
                        className="logo-mark"
                        width="36"
                        height="36"
                    />
                    <span>Reagan Fwamba</span>
                </a>
                <nav
                    className={`nav-menu ${menuOpen ? 'open' : ''}`}
                    role="navigation"
                >
                    <a href="#hero" className="nav-link" onClick={() => setMenuOpen(false)}>Home</a>
                    <a href="#about" className="nav-link" onClick={() => setMenuOpen(false)}>About</a>
                    <a href="#projects" className="nav-link" onClick={() => setMenuOpen(false)}>Projects</a>
                    <a href="#quickwin" className="nav-link" onClick={() => setMenuOpen(false)}>Services</a>
                    <a href="#contact" className="nav-link" onClick={() => setMenuOpen(false)}>Contact</a>
                    <a href="mailto:reaganfwambaa@gmail.com" className="nav-cta">Hire Me</a>
                </nav>
                <button
                    className={`mobile-menu-btn ${menuOpen ? 'open' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation"
                    aria-expanded={menuOpen}
                >
                    <span></span><span></span><span></span>
                </button>
            </div>
        </header>
    )
}