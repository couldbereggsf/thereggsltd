import React, { useState, useEffect, useRef } from 'react'
import profilePhoto from '../assets/portfoliophoto.jpeg'

const HERO_SLIDES = [
    { type: 'project', icon: 'ph-shield-check', tag: 'Featured Project', title: 'Cloud Security Dashboard', desc: 'Cut incident response time by 65% using AWS GuardDuty & React.', link: '#projects' },
    { type: 'interest', icon: 'ph-apple-logo', tag: 'Tech & Gear', title: 'Apple M4 Architecture', desc: 'Obsessed with the efficiency of Apple Silicon for local AI inference.', link: 'https://www.apple.com/mac/' },
    { type: 'project', icon: 'ph-chart-line-up', tag: 'Featured Project', title: 'NSE Analytics Platform', desc: 'Real-time market data pipeline processing 10k+ events/sec.', link: '#projects' },
    { type: 'interest', icon: 'ph-car', tag: 'Automotive', title: 'Koenigsegg Jesko', desc: 'Pure engineering. A theoretical top speed of 330+ mph.', link: 'https://www.koenigsegg.com/' },
    { type: 'impact', icon: 'ph-cloud-check', tag: 'Business Impact', title: '30% Cloud Cost Reduction', desc: 'Right-sized Azure AKS clusters, saving clients $1,200/mo.', link: '#contact' },
    { type: 'interest', icon: 'ph-airplane', tag: 'Aviation', title: 'Boom Supersonic XB-1', desc: 'The return of supersonic flight. First test flights underway.', link: 'https://boomsupersonic.com/' }
]

const PLANETS = [
    { size: 20, color: '#DDA15E', top: '15%', left: '10%', duration: '25s' },
    { size: 8, color: '#BC6C25', top: '70%', left: '15%', duration: '18s' },
    { size: 40, color: '#606C38', top: '25%', right: '5%', duration: '35s' },
    { size: 12, color: '#FEFAE0', top: '60%', right: '12%', duration: '22s' },
    { size: 5, color: '#8A9A5B', top: '40%', left: '45%', duration: '15s' },
    { size: 30, color: '#4A5C30', top: '80%', left: '40%', duration: '40s' },
]

function HeroCarousel() {
    const [index, setIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const resumeTimerRef = useRef(null)
    const total = HERO_SLIDES.length

    useEffect(() => {
        if (isPaused) return
        const timer = setInterval(() => setIndex((i) => (i + 1) % total), 4500)
        return () => clearInterval(timer)
    }, [isPaused, total])

    const pause = () => setIsPaused(true)
    const resume = () => {
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
        resumeTimerRef.current = setTimeout(() => setIsPaused(false), 3000)
    }

    useEffect(() => () => { if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current) }, [])

    const slide = HERO_SLIDES[index] || HERO_SLIDES[0]

    return (
        <div className="hero-carousel" onMouseEnter={pause} onMouseLeave={resume}>
            <div className="carousel-badge"><i className={slide.icon}></i> {slide.tag}</div>
            <div className="carousel-content">
                <h3>{slide.title}</h3>
                <p>{slide.desc}</p>
            </div>
            <a href={slide.link} className="carousel-link" target={slide.link.startsWith('http') ? '_blank' : undefined} rel={slide.link.startsWith('http') ? 'noopener noreferrer' : undefined}>
                Read more <i className="ph ph-arrow-right"></i>
            </a>
            <div className="carousel-dots-mini">
                {HERO_SLIDES.map((_, i) => (
                    <button key={i} className={`mini-dot ${i === index ? 'active' : ''}`} onClick={() => { setIndex(i); pause(); resume(); }} aria-label={`Go to slide ${i + 1}`} />
                ))}
            </div>
        </div>
    )
}

export default function Hero() {
    const [typedWord, setTypedWord] = useState('')
    const words = ['Java Specialist', 'Security Advocate', 'Financial Tech Builder']

    // Typewriter
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
    }, [])

    // Particle Canvas, Stars, Shooting Stars
    const canvasRef = useRef(null)
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let particles = []
        let shootingStars = []
        let W, H
        let animationFrameId

        const resize = () => {
            W = canvas.width = window.innerWidth
            H = canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        const NUM = Math.min(70, Math.floor(window.innerWidth / 18))
        const ACCENT = '221,161,94'
        const MUTED = '254,250,224'

        for (let i = 0; i < NUM; i++) {
            particles.push({
                x: Math.random() * W, y: Math.random() * H,
                r: Math.random() * 1.8 + 0.4,
                vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
                a: Math.random() * 0.5 + 0.15,
                col: Math.random() > 0.7 ? ACCENT : MUTED,
            })
        }

        const drawParticles = () => {
            ctx.clearRect(0, 0, W, H)

            // Draw stars and lines
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i]
                p.x += p.vx; p.y += p.vy
                if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
                if (p.y < 0) p.y = H; if (p.y > H) p.y = 0

                ctx.beginPath()
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${p.col},${p.a})`
                ctx.fill()

                for (let j = i + 1; j < particles.length; j++) {
                    const q = particles[j]
                    const dx = p.x - q.x, dy = p.y - q.y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < 110) {
                        ctx.beginPath()
                        ctx.moveTo(p.x, p.y)
                        ctx.lineTo(q.x, q.y)
                        ctx.strokeStyle = `rgba(${p.col},${(1 - dist / 110) * 0.18})`
                        ctx.lineWidth = 0.6
                        ctx.stroke()
                    }
                }
            }

            // Draw shooting stars
            for (let i = shootingStars.length - 1; i >= 0; i--) {
                const s = shootingStars[i]
                s.x += s.vx; s.y += s.vy; s.opacity -= 0.005

                if (s.opacity <= 0) {
                    shootingStars.splice(i, 1)
                    continue
                }

                ctx.beginPath()
                ctx.moveTo(s.x, s.y)
                ctx.lineTo(s.x - s.vx * 10, s.y - s.vy * 10)
                ctx.strokeStyle = `rgba(254, 250, 224, ${s.opacity})`
                ctx.lineWidth = 2
                ctx.stroke()
            }

            // Spawn shooting star
            if (Math.random() < 0.02 && shootingStars.length < 3) {
                shootingStars.push({
                    x: Math.random() * W, y: 0,
                    vx: (Math.random() - 0.5) * 6 - 2, vy: Math.random() * 4 + 2,
                    opacity: 1,
                })
            }

            animationFrameId = requestAnimationFrame(drawParticles)
        }
        drawParticles()

        return () => {
            window.removeEventListener('resize', resize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    // Scroll Reveal Failsafe (Bulletproof)
    useEffect(() => {
        // Force visibility after 500ms no matter what
        const failsafe = setTimeout(() => {
            document.querySelectorAll('#hero .reveal').forEach(el => {
                el.classList.add('visible')
                el.style.opacity = '1'
                el.style.transform = 'translateY(0) scale(1)'
            })
        }, 500)

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible')
                }
            })
        }, { threshold: 0.1 })

        document.querySelectorAll('#hero .reveal').forEach(el => observer.observe(el))

        return () => {
            observer.disconnect()
            clearTimeout(failsafe)
        }
    }, [])

    return (
        <section id="hero" className="section-hero">
            <canvas id="particleCanvas" ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />

            <div className="hero-bg" aria-hidden="true">
                <div className="hero-orb hero-orb-1"></div>
                <div className="hero-orb hero-orb-2"></div>
                {/* PLANETS */}
                <div className="solar-system">
                    {PLANETS.map((planet, i) => (
                        <div key={i} className="planet" style={{ width: planet.size, height: planet.size, backgroundColor: planet.color, top: planet.top, left: planet.left || 'auto', right: planet.right || 'auto', animationDuration: planet.duration }} />
                    ))}
                </div>
            </div>

            <div className="hero-inner" style={{ position: 'relative', zIndex: 2 }}>
                <div className="container">
                    <div className="hero-layout">
                        <div className="hero-content">
                            <div className="availability-badge reveal"><span className="avail-dot"></span> Available for projects</div>
                            <h1 className="hero-headline reveal rd1">Full-Stack Engineer</h1>
                            <div className="rotating-tagline reveal rd2"><span className="typed-word">{typedWord || 'Java Specialist'}</span></div>
                            <p className="hero-sub reveal rd3">Building secure, scalable systems that solve real business problems.</p>
                            <div className="reveal rd4" style={{ margin: '1.5rem 0 2rem' }}><HeroCarousel /></div>
                            <div className="hero-actions reveal rd5">
                                <a href="#projects" className="btn btn-primary">View Projects</a>
                                <a href="#contact" className="btn btn-ghost">Get in Touch</a>
                            </div>
                            <div className="hero-stats reveal rd6">
                                <div className="stat-item"><div className="stat-value">3+</div><div className="stat-label">Years Professional</div></div>
                                <div className="stat-item"><div className="stat-value">30%</div><div className="stat-label">Azure Cost Reduction</div></div>
                                <div className="stat-item"><div className="stat-value">99.9%</div><div className="stat-label">Uptime SLA Delivered</div></div>
                            </div>
                        </div>
                        <div className="hero-visual reveal rd2">
                            <div className="profile-3d-wrap">
                                <div className="profile-ring-container">
                                    <div className="profile-tilt-card">
                                        <div className="profile-img-wrap"><img src={profilePhoto} alt="Reagan Fwamba" loading="eager" /></div>
                                    </div>
                                    <div className="rotating-ring"></div>
                                </div>
                                <div className="float-chip chip-1"><i className="ph ph-code"></i> Java</div>
                                <div className="float-chip chip-2"><i className="ph ph-cloud"></i> AWS</div>
                                <div className="float-chip chip-3"><i className="ph ph-atom"></i> React</div>
                            </div>
                        </div>
                    </div>
                    <div className="scroll-indicator">
                        <a href="#about"><i className="ph ph-arrow-down"></i><span>Scroll</span></a>
                    </div>
                </div>
            </div>
        </section>
    )
}