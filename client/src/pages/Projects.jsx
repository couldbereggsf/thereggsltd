import React, { useState, useEffect, useRef, useCallback } from 'react'

// ── All projects ──
const PROJECTS = [
    {
        id: 'cloud-security',
        number: '01',
        tags: ['AWS', 'Java', 'React'],
        title: 'Cloud Security Dashboard',
        desc: 'Centralised monitoring for multi-cloud environments, cutting security incident response time by 65% and providing real-time threat visibility across all deployments.',
        metric: '65% Faster Incident Response',
        status: 'live',
        links: [
            { label: 'Case Study', href: '#', icon: 'ph-book-open' },
            { label: 'Live Demo', href: '#', icon: 'ph-arrow-square-out' },
        ],
    },
    {
        id: 'financial-analytics',
        number: '02',
        tags: ['Spring Boot', 'Python', 'Azure'],
        title: 'Financial Analytics Platform',
        desc: 'Real-time investment analysis tool processing live market data with 99.9% uptime SLA and sub-millisecond latency for institutional-grade performance.',
        metric: '99.9% Uptime SLA Achieved',
        status: 'live',
        links: [
            { label: 'Case Study', href: '#', icon: 'ph-book-open' },
        ],
    },
    {
        id: 'enterprise-security',
        number: '03',
        tags: ['Java', 'Oracle', 'DevSecOps'],
        title: 'Enterprise Security Suite',
        desc: 'OWASP-compliant application security framework deployed across three enterprise environments, achieving zero critical vulnerabilities in production.',
        metric: 'Zero Critical Vulnerabilities',
        status: 'live',
        links: [
            { label: 'Case Study', href: '#', icon: 'ph-book-open' },
        ],
    },
    {
        id: 'futures-ict',
        number: '04',
        tags: ['Python', 'React', 'ICT', 'Trading'],
        title: 'Futures ICT Analyzer',
        desc: 'Real-time ICT concept detector for CME futures (ES/NQ) — identifying Fair Value Gaps, Order Blocks, Liquidity Sweeps, and Market Structure Shifts with interactive chart overlays.',
        metric: 'In Development',
        status: 'development',
        links: [
            { label: 'Coming Soon', href: '#', icon: 'ph-hourglass' },
        ],
    },
    {
        id: 'aml-engine',
        number: '05',
        tags: ['Java', 'Fintech', 'Compliance'],
        title: 'Anti-Money Laundering Engine',
        desc: 'Core Java compliance engine simulating automated transaction streams, executing programmatic financial risk scoring, and enforcing strict scope encapsulation to flag suspicious activity.',
        metric: 'Automated Risk Scoring',
        status: 'live',
        links: [
            { label: 'View on GitHub', href: 'https://github.com/couldbereggsf/anti-money-laundering-engine', icon: 'ph-github-logo' },
        ],
    },
    {
        id: 'registration-api',
        number: '06',
        tags: ['Spring Boot', 'JPA', 'Validation'],
        title: 'Registration API',
        desc: 'Multi-stage user registration API demonstrating clean architectural layering, tiered validation with @GroupSequence, global exception handling, and a decoupled four-module design.',
        metric: 'Tiered Validation Pipeline',
        status: 'live',
        links: [
            { label: 'View on GitHub', href: 'https://github.com/couldbereggsf/registration-api', icon: 'ph-github-logo' },
        ],
    },
    {
        id: 'file-system-mapper',
        number: '07',
        tags: ['Java', 'OOP', 'Recursion'],
        title: 'File System Mapper',
        desc: 'Recursive directory parsing and file system mapping utility in Java — demonstrates clean object-oriented design and traversal algorithms for hierarchical structures.',
        metric: 'Recursive Traversal Core',
        status: 'live',
        links: [
            { label: 'View on GitHub', href: 'https://github.com/couldbereggsf/file-system-mapper', icon: 'ph-github-logo' },
        ],
    },
    {
        id: 'cinematch',
        number: '08',
        tags: ['React 19', 'TypeScript', 'Tailwind', 'TMDB'],
        title: 'CineMatch — Movie Recommendations',
        desc: 'TMDB-powered movie recommendation app with TanStack Query caching, Auth0 authentication, Zustand state management, and a phased CI/CD pipeline deploying to GitHub Pages.',
        metric: 'Full-Stack Media App',
        status: 'live',
        links: [
            { label: 'View on GitHub', href: 'https://github.com/couldbereggsf/movie-recommendation-app', icon: 'ph-github-logo' },
        ],
    },
]

// ── Auto-play constants ──
const AUTOPLAY_INTERVAL = 5500      // advance every 5.5s
const AUTOPLAY_RESUME_DELAY = 6000  // wait 6s after user interaction before resuming

// ── Toast helper (unchanged) ──
function showComingSoonToast(projectName) {
    const existing = document.querySelector('.coming-soon-toast')
    if (existing) existing.remove()

    const toast = document.createElement('div')
    toast.className = 'coming-soon-toast'
    toast.setAttribute('role', 'alert')
    toast.setAttribute('aria-live', 'polite')

    toast.innerHTML = `
        <div class="toast-icon"><i class="ph ph-rocket-launch" aria-hidden="true"></i></div>
        <div class="toast-content">
            <strong>Coming Soon</strong>
            <span>The case study for "${projectName}" is currently being written. Check back soon!</span>
        </div>
        <button class="toast-close" aria-label="Close notification"><i class="ph ph-x" aria-hidden="true"></i></button>
    `

    document.body.appendChild(toast)
    requestAnimationFrame(() => toast.classList.add('show'))
    const autoDismiss = setTimeout(() => dismissToast(toast), 5000)
    toast.querySelector('.toast-close').addEventListener('click', () => {
        clearTimeout(autoDismiss)
        dismissToast(toast)
    })
    toast.addEventListener('click', (e) => {
        if (e.target === toast) {
            clearTimeout(autoDismiss)
            dismissToast(toast)
        }
    })
}

function dismissToast(toast) {
    toast.classList.remove('show')
    toast.classList.add('hiding')
    setTimeout(() => toast.remove(), 400)
}

export default function Projects() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [touchStartX, setTouchStartX] = useState(null)
    const stageRef = useRef(null)
    const resumeTimerRef = useRef(null)

    const total = PROJECTS.length

    // ── Scroll reveal ──
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible')
                }
            })
        }, { threshold: 0.15 })

        document.querySelectorAll('#projects .reveal').forEach(el => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    // ── Navigation ──
    const goTo = useCallback((index) => {
        setActiveIndex((index + total) % total)
    }, [total])

    const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])
    const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])

    // ── Auto-play timer ──
    useEffect(() => {
        // Respect reduced-motion preference
        const prefersReduced = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches
        if (prefersReduced) return

        if (isPaused) return

        const timer = setInterval(() => {
            setActiveIndex((i) => (i + 1) % total)
        }, AUTOPLAY_INTERVAL)

        return () => clearInterval(timer)
    }, [isPaused, total])

    // ── Pause on tab hidden ──
    useEffect(() => {
        const onVisibilityChange = () => {
            if (document.hidden) setIsPaused(true)
            else setIsPaused(false)
        }
        document.addEventListener('visibilitychange', onVisibilityChange)
        return () => document.removeEventListener('visibilitychange', onVisibilityChange)
    }, [])

    // ── Pause / resume helpers ──
    const pauseAutoplay = () => {
        if (resumeTimerRef.current) {
            clearTimeout(resumeTimerRef.current)
            resumeTimerRef.current = null
        }
        setIsPaused(true)
    }

    const scheduleResume = () => {
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
        resumeTimerRef.current = setTimeout(() => {
            setIsPaused(false)
        }, AUTOPLAY_RESUME_DELAY)
    }

    // Cleanup resume timer on unmount
    useEffect(() => {
        return () => {
            if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
        }
    }, [])

    // ── Keyboard navigation ──
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'ArrowRight') {
                pauseAutoplay()
                next()
            }
            if (e.key === 'ArrowLeft') {
                pauseAutoplay()
                prev()
            }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [next, prev])

    // ── Touch swipe ──
    const onTouchStart = (e) => {
        pauseAutoplay()
        setTouchStartX(e.touches[0].clientX)
    }
    const onTouchEnd = (e) => {
        if (touchStartX === null) return
        const diff = touchStartX - e.changedTouches[0].clientX
        if (Math.abs(diff) > 50) {
            diff > 0 ? next() : prev()
        }
        setTouchStartX(null)
        scheduleResume()
    }

    // ── Card position mapping ──
    const getCardPosition = (index) => {
        const offset = index - activeIndex
        const wrapped = ((offset + total) % total) - Math.floor(total / 2)
        if (wrapped === 0) return 'active'
        if (wrapped === 1) return 'next-1'
        if (wrapped === -1) return 'prev-1'
        if (wrapped === 2) return 'next-2'
        if (wrapped === -2) return 'prev-2'
        return 'hidden'
    }

    // ── Manual arrow / dot click ──
    const handleArrowClick = (fn) => {
        pauseAutoplay()
        fn()
        scheduleResume()
    }

    const handleDotClick = (index) => {
        pauseAutoplay()
        goTo(index)
        scheduleResume()
    }

    // ── Card click (brings non-active to front) ──
    const handleCardClick = (index, pos) => {
        if (pos === 'active') return
        pauseAutoplay()
        goTo(index)
        scheduleResume()
    }

    // ── Link click handler ──
    const handleLinkClick = (e, project, link) => {
        if (link.href === '#') {
            e.preventDefault()
            showComingSoonToast(project.title)
        }
    }

    return (
        <section id="projects" className="section-projects">
            <div className="container">
                <p className="section-label reveal">Featured Work</p>
                <h2 className="section-heading reveal rd1">
                    Projects That <em>Matter</em>
                </h2>

                {/* ── Carousel stage ── */}
                <div
                    className="carousel-stage reveal rd2"
                    ref={stageRef}
                    onMouseEnter={pauseAutoplay}
                    onMouseLeave={scheduleResume}
                    onFocus={pauseAutoplay}
                    onBlur={scheduleResume}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                    aria-roledescription="carousel"
                    aria-label="Project showcase"
                >
                    {PROJECTS.map((project, index) => {
                        const pos = getCardPosition(index)
                        return (
                            <div
                                key={project.id}
                                className={`project-card carousel-card ${pos} ${project.status === 'development' ? 'project-card--wip' : ''
                                    }`}
                                onClick={() => handleCardClick(index, pos)}
                                aria-hidden={pos === 'hidden'}
                                aria-label={`Project: ${project.title}`}
                                tabIndex={pos === 'active' ? 0 : -1}
                            >
                                {project.status === 'development' && (
                                    <span className="project-status">In Development</span>
                                )}

                                <div className="project-number" aria-hidden="true">
                                    {project.number}
                                </div>

                                <div className="project-tags">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="tag">{tag}</span>
                                    ))}
                                </div>

                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.desc}</p>

                                <div className="project-metric">{project.metric}</div>

                                <div className="project-links">
                                    {project.links.map((link) => (
                                        <a
                                            key={link.label}
                                            href={link.href}
                                            className="project-link"
                                            onClick={(e) => handleLinkClick(e, project, link)}
                                            target={link.href.startsWith('http') ? '_blank' : undefined}
                                            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        >
                                            <i className={`ph ${link.icon}`} aria-hidden="true"></i>
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* ── Controls ── */}
                <div className="carousel-controls reveal rd3">
                    <button
                        className="carousel-arrow"
                        onClick={() => handleArrowClick(prev)}
                        aria-label="Previous project"
                    >
                        <i className="ph ph-caret-left"></i>
                    </button>

                    <div className="carousel-dots" role="tablist" aria-label="Project navigation">
                        {PROJECTS.map((project, index) => (
                            <button
                                key={project.id}
                                className={`carousel-dot ${index === activeIndex ? 'active' : ''}`}
                                onClick={() => handleDotClick(index)}
                                role="tab"
                                aria-selected={index === activeIndex}
                                aria-label={`Go to ${project.title}`}
                            />
                        ))}
                    </div>

                    <button
                        className="carousel-arrow"
                        onClick={() => handleArrowClick(next)}
                        aria-label="Next project"
                    >
                        <i className="ph ph-caret-right"></i>
                    </button>
                </div>

                {/* Profile links */}
                <div
                    className="projects-cta reveal rd4"
                    style={{
                        marginTop: '2.5rem',
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}
                >
                    <a
                        href="https://github.com/couldbereggsf"
                        className="btn btn-ghost"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="ph ph-github-logo" aria-hidden="true"></i>
                        GitHub Profile
                    </a>
                    <a
                        href="https://www.upwork.com/freelancers/~0173ac14a9e0ef0a69?mp_source=share"
                        className="btn btn-ghost"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="ph ph-briefcase" aria-hidden="true"></i>
                        Upwork Profile
                    </a>
                </div>
            </div>
        </section>
    )
}