import React, { useEffect } from 'react'

// I have defined all four solution panels as data
const SOLUTIONS = {
    startup: {
        label: 'For founders',
        headline: (
            <>
                From idea to production in <em>6 weeks</em> — without the hiring overhead.
            </>
        ),
        body: 'Startups work with me when they need a backend that handles 10x growth from day one. Spring Boot APIs, AWS-native deployment, and zero technical debt baked in from the first commit.',
        proof: {
            title: 'Fintech API — The Reggs Platform',
            detail: 'Launched in 5 weeks. 99.9% uptime. Zero cloud incident in year one. Built on Spring Boot, deployed to AWS ECS.',
        },
        stats: [
            { value: '5–6 wks', label: 'MVP to production' },
            { value: '99.9%', label: 'Uptime target' },
            { value: '$0', label: 'Cloud incidents year one' },
        ],
    },
    enterprise: {
        label: 'For engineering leads',
        headline: (
            <>
                Legacy modernisation that <em>does not break</em> what already works.
            </>
        ),
        body: 'Enterprise teams hire me when they need to move from monolith to services, migrate off on-premise, or reduce a cloud bill that has grown out of control — without stopping the business.',
        proof: {
            title: 'Cloud Security Dashboard',
            detail: 'Reduced incident response time by 65%. Multi-cloud visibility across AWS and Azure. Delivered in a 12-week engagement.',
        },
        stats: [
            { value: '65%', label: 'Faster incident response' },
            { value: '30–40%', label: 'Cloud cost reduction' },
            { value: '12 wks', label: 'Typical engagement length' },
        ],
    },
    hire: {
        label: 'For hiring managers',
        headline: (
            <>
                A full-stack engineer who <em>ships</em> — and documents what they build.
            </>
        ),
        body: 'Available for full-time roles and long-term contracts. I bring Java, Spring Boot, React, AWS, and DevSecOps experience to teams that need someone who can work across the stack without hand-holding.',
        proof: {
            title: 'Currently available',
            detail: 'Open to full-time, contract, and remote-first roles. Response time under 4 hours. References available on request.',
        },
        stats: [
            { value: '5 yrs', label: 'Production engineering experience' },
            { value: '4 hrs', label: 'Average response time' },
            { value: '100%', label: 'Remote-ready' },
        ],
    },
    audit: {
        label: 'For technical reviews',
        headline: (
            <>
                A second pair of eyes on your <em>architecture, security, and performance.</em>
            </>
        ),
        body: 'Code and architecture audits for teams that want an honest assessment before a launch, a fundraise, or a compliance review. Deliverable is a written report with prioritised, actionable findings.',
        proof: {
            title: 'Audit engagement',
            detail: 'Typical audit takes 5–10 working days. Covers OWASP top 10, cloud configuration, database query performance, and dependency vulnerabilities.',
        },
        stats: [
            { value: '5–10', label: 'Working days to complete' },
            { value: 'OWASP', label: 'Security framework used' },
            { value: '100%', label: 'Written findings delivered' },
        ],
    },
}

export default function Solution({ persona }) {
    // ── Scroll reveal — re-runs when persona changes ──
    useEffect(() => {
        // Small delay to let the new content mount first
        const timer = setTimeout(() => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible')
                    }
                })
            }, { threshold: 0.15 })

            document.querySelectorAll('#solution .reveal').forEach(el => observer.observe(el))

            return () => observer.disconnect()
        }, 50)

        return () => clearTimeout(timer)
    }, [persona])

    // Default to startup if nothing selected yet
    const activeKey = persona && SOLUTIONS[persona] ? persona : 'startup'
    const active = SOLUTIONS[activeKey]

    return (
        <section id="solution" className="section-solution">
            <div className="container">
                {/* The key prop forces a remount when persona changes,
                    re-triggering the reveal animations. */}
                <div key={activeKey} className="solution-panel">
                    {/* Left — text content */}
                    <div className="solution-text">
                        <p className="section-label reveal">{active.label}</p>

                        <h2 className="reveal rd1">{active.headline}</h2>

                        <p className="reveal rd2">{active.body}</p>

                        <div className="solution-proof reveal rd3">
                            <strong>{active.proof.title}</strong>
                            <span>{active.proof.detail}</span>
                        </div>

                        <div className="reveal rd4" style={{ marginTop: '2rem' }}>
                            <a href="#contact" className="btn btn-primary">
                                Discuss your project
                                <i className="ph ph-arrow-right" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>

                    {/* Right — stats card */}
                    <div className="reveal rd2">
                        <div
                            className="glass-card"
                            style={{
                                padding: '2.5rem',
                                height: '100%',
                                minHeight: '280px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                gap: '1.5rem',
                            }}
                        >
                            <p className="section-label" style={{ marginBottom: 0 }}>
                                Typical outcomes
                            </p>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1.25rem',
                                }}
                            >
                                {active.stats.map((stat) => (
                                    <div key={stat.label}>
                                        <div
                                            className="stat-value"
                                            style={{
                                                fontSize:
                                                    'clamp(1.7rem, 1.5rem + 1vw, 2.2rem)',
                                            }}
                                        >
                                            {stat.value}
                                        </div>
                                        <div className="stat-label">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}