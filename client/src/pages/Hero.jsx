import React, { useState, useEffect, useRef } from 'react'
import profilePhoto from '../assets/portfoliophoto.jpeg'

export default function Hero() {
    const [typedWord, setTypedWord] = useState('')
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

    const words = ['Java Specialist', 'Security Advocate', 'Financial Tech Builder']
    const targetDate = new Date(2026, 6, 15, 0, 0, 0)

    // ── Typewriter using useRef for mutable variables ──
    const wordIndexRef = useRef(0)
    const charIndexRef = useRef(0)
    const isDeletingRef = useRef(false)
    const timeoutRef = useRef(null)

    useEffect(() => {
        const type = () => {
            const currentWord = words[wordIndexRef.current]
            if (!isDeletingRef.current) {
                // Typing forward
                const newText = currentWord.slice(0, charIndexRef.current + 1)
                setTypedWord(newText)
                charIndexRef.current += 1
                if (charIndexRef.current === currentWord.length) {
                    // Word complete – pause then delete
                    isDeletingRef.current = true
                    timeoutRef.current = setTimeout(type, 2000)
                    return
                }
                timeoutRef.current = setTimeout(type, 100)
            } else {
                // Deleting backward
                const newText = currentWord.slice(0, charIndexRef.current - 1)
                setTypedWord(newText)
                charIndexRef.current -= 1
                if (charIndexRef.current === 0) {
                    // Deleted – move to next word
                    isDeletingRef.current = false
                    wordIndexRef.current = (wordIndexRef.current + 1) % words.length
                    timeoutRef.current = setTimeout(type, 500)
                    return
                }
                timeoutRef.current = setTimeout(type, 60)
            }
        }

        type() // start the loop
        return () => clearTimeout(timeoutRef.current)
    }, []) // empty dependency array – runs only once

    // ── Countdown ──
    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date()
            const diff = Math.max(0, targetDate - now)
            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((diff % (1000 * 60)) / 1000)
            })
        }
        updateCountdown()
        const interval = setInterval(updateCountdown, 1000)
        return () => clearInterval(interval)
    }, [targetDate])

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
                            <div className="feature-badge reveal">
                                <span className="badge-dot"></span> Launching July 2026
                            </div>

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

                            <div className="countdown-container reveal rd4">
                                <div className="countdown-item">
                                    <span>{String(timeLeft.days).padStart(2, '0')}</span>
                                    Days
                                </div>
                                <div className="countdown-item">
                                    <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                                    Hours
                                </div>
                                <div className="countdown-item">
                                    <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                                    Mins
                                </div>
                                <div className="countdown-item">
                                    <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                                    Secs
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