import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'
import styles from './Header.module.css'

export default function Header() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <Link to="/" className={styles.logo}>
                    <img src={logo} alt="The Reggs Limited logo" className={styles.logoMark} />
                    <span className={styles.logoName}>Reagan Fwamba</span>
                </Link>

                <button
                    className={`${styles.mobileBtn} ${mobileOpen ? styles.active : ''}`}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-expanded={mobileOpen}
                >
                    <span></span><span></span><span></span>
                </button>

                <nav className={`${styles.nav} ${mobileOpen ? styles.open : ''}`}>
                    <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''} onClick={() => setMobileOpen(false)}>
                        Home
                    </NavLink>
                    <NavLink to="/about" onClick={() => setMobileOpen(false)}>
                        About
                    </NavLink>
                    <NavLink to="/projects" onClick={() => setMobileOpen(false)}>
                        Projects
                    </NavLink>
                    <NavLink to="/services" onClick={() => setMobileOpen(false)}>
                        Services
                    </NavLink>
                    <NavLink to="/contact" className={styles.cta} onClick={() => setMobileOpen(false)}>
                        Contact
                    </NavLink>
                </nav>
            </div>
        </header>
    )
}