import React, { useState, useEffect } from 'react'
import logo from '../assets/logo.png'
import styles from './Header.module.css'

export default function Header() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('hero')

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)

            // Simple scroll spy to highlight active section
            const sections = ['hero', 'about', 'features', 'projects', 'contact']
            let current = 'hero'
            sections.forEach(id => {
                const el = document.getElementById(id)
                if (el && window.scrollY >= el.offsetTop - 200) {
                    current = id
                }
            })
            setActiveSection(current)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleNavClick = (e, id) => {
        e.preventDefault()
        setMobileOpen(false)
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    const navItems = [
        { id: 'hero', label: 'Home', icon: 'ph-house' },
        { id: 'about', label: 'About', icon: 'ph-user' },
        { id: 'features', label: 'Services', icon: 'ph-briefcase' },
        { id: 'projects', label: 'Projects', icon: 'ph-folder' },
    ]

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
            {/* The floating dock */}
            <div className={styles.dock}>

                {/* Logo */}
                <a href="#hero" className={styles.logo} onClick={(e) => handleNavClick(e, 'hero')}>
                    <img src={logo} alt="RF" className={styles.logoMark} />
                </a>

                <div className={styles.divider}></div>

                {/* Nav Items */}
                <nav className={`${styles.nav} ${mobileOpen ? styles.open : ''}`}>
                    {navItems.map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={`${styles.navItem} ${activeSection === item.id ? styles.active : ''}`}
                            onClick={(e) => handleNavClick(e, item.id)}
                        >
                            <i className={`ph ${item.icon}`}></i>
                            <span>{item.label}</span>
                        </a>
                    ))}
                </nav>

                {/* CTA Button */}
                <a
                    href="#contact"
                    className={styles.ctaBtn}
                    onClick={(e) => handleNavClick(e, 'contact')}
                    aria-label="Contact Me"
                >
                    <i className="ph ph-paper-plane-tilt"></i>
                </a>

                {/* Mobile Hamburger */}
                <button
                    className={`${styles.mobileBtn} ${mobileOpen ? styles.active : ''}`}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-expanded={mobileOpen}
                >
                    <span></span><span></span><span></span>
                </button>
            </div>
        </header>
    )
}