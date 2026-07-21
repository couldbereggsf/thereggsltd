import React, { useState, useEffect, useRef } from 'react'
import profilePhoto from '../assets/portfoliophoto.jpeg'

export default function Hero() {
    const [typedWord, setTypedWord] = useState('')
    const words = ['Java Specialist', 'Security Advocate', 'Financial Tech Builder']

    // ── Typewriter using useRef ──
    const wordIndexRef = useRef(0)
    const charIndexRef = useRef(0)
    const isDeletingRef = useRef(false)
    const timeoutRef = useRef(null)

    useEffect(() => {
        const type = () => {
            const currentWord = words[wordIndexRef.current]
            if (!isDeletingRef.current) {
                const newText = currentWord.slice(0, charIndexRef.current + 1)
                setTypedWord(newText)
                charIndexRef.current += 1
                if (charIndexRef.current === currentWord.length) {
                    isDeletingRef.current = true
                    timeoutRef.current = setTimeout(type, 2000)
                    return
                }
                timeoutRef.current = setTimeout(type, 100)
            } else {
                const newText = currentWord.slice(0, charIndexRef.current - 1)
                setTypedWord(newText)
                charIndexRef.current -= 1
                if (charIndexRef.current === 0) {
                    isDeletingRef.current = false
                    wordIndexRef.current = (wordIndexRef.current + 1) % words.length
                    timeoutRef.current = setTimeout(type, 500)
                    return
                }
                timeoutRef.current = setTimeout(type, 60)
            }
        }
        type()
        return () => clearTimeout(timeoutRef.current)
    }, []) // runs once

    // ── Scroll reveal ──
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible')
                }
            })
        }, { threshold: 0.15 })

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    return (
        <section id="hero" className="section-hero">
            <div className="hero-bg" aria-hidden="true">
                <div className="hero-orb hero-orb-1"></div>
                <div className="hero-orb hero-orb-2"></div>
            </div>

            <div className="hero-inner">
                <div className="container">
                    <div className="hero-layout">
                        {/* Left column */}
                        <div className="hero-content">
                            <div className="availability-badge reveal">
                                <span className="avail-dot" aria-hidden="true"></span>
                                Available for projects
                            </div>

                            <h1 className="hero-headline reveal rd1">Full-Stack Engineer</h1>

                            <div className="rotating-tagline reveal rd2">
                                <span className="typed-word">{typedWord || 'Java Specialist'}</span>
                            </div>

                            <p className="hero-sub reveal rd3">
                                Building secure, scalable systems that solve real business problems.
                            </p>

                            {/* ─── Announcement Section ─── */}
                            <div className="announcement reveal rd4">
                                <span className="announcement-badge">📢 Latest Updates</span>
                                <div className="announcement-items">
                                    <div className="announcement-item">
                                        <span className="announcement-dot"></span>
                                        <strong>The Reggs Platform</strong> — Live and ready for clients
                                    </div>
                                    <div className="announcement-item">
                                        <span className="announcement-dot"></span>
                                        <strong>NSE Analytics Dashboard</strong> —{' '}
                                        <a
                                            href="https://github.com/couldbereggsf/nse-analytics-platform"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="announcement-link"
                                        >
                                            Open source on GitHub →
                                        </a>
                                    </div>
                                    <div className="announcement-item">
                                        <span className="announcement-dot"></span>
                                        <strong>Available for hire</strong> — Full-time or contract work
                                    </div>
                                </div>
                            </div>

                            <div className="hero-actions reveal rd5">
                                <a href="#projects" className="btn btn-primary">View Projects</a>
                                <a href="#contact" className="btn btn-ghost">Get in Touch</a>
                            </div>

                            <div className="hero-stats reveal rd6">
                                <div className="stat-item">
                                    <div className="stat-value">5+</div>
                                    <div className="stat-label">Years Experience</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-value">30%</div>
                                    <div className="stat-label">Cost Reduction</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-value">99.9%</div>
                                    <div className="stat-label">Uptime SLA</div>
                                </div>
                            </div>
                        </div>

                        {/* Right column */}
                        <div className="hero-visual reveal rd2">
                            <div className="profile-3d-wrap">
                                <div className="profile-ring-container">
                                    <div className="profile-tilt-card">
                                        <div className="profile-img-wrap">
                                            <img
                                                src={profilePhoto}
                                                alt="Reagan Fwamba"
                                                loading="eager"
                                            />
                                        </div>
                                    </div>
                                    <div className="rotating-ring"></div>
                                </div>
                                <div className="float-chip chip-1">
                                    <i className="ph ph-code"></i> Java
                                </div>
                                <div className="float-chip chip-2">
                                    <i className="ph ph-cloud"></i> AWS
                                </div>
                                <div className="float-chip chip-3">
                                    <i className="ph ph-atom"></i> React
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="scroll-indicator">
                        <a href="#about" aria-label="Scroll to About section">
                            <i className="ph ph-arrow-down" aria-hidden="true"></i>
                            <span>Scroll</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}