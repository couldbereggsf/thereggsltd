import React, { useEffect } from 'react'

export default function Problem() {
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
        <section id="problem" className="section-problem">
            <div className="container">
                <p className="section-label reveal">Sound familiar?</p>
                <h2 className="section-heading reveal rd1">
                    Your system works — until it <em>doesn&apos;t.</em>
                </h2>

                <div className="problem-grid">
                    <div className="problem-card reveal rd2">
                        <div className="problem-icon" aria-hidden="true">
                            <i className="ph ph-fire"></i>
                        </div>
                        <h3>Dev velocity drops</h3>
                        <p>Complexity grows with every sprint. The codebase that was fast to build becomes slow to change — and slower to debug at 2am.</p>
                    </div>

                    <div className="problem-card reveal rd3">
                        <div className="problem-icon" aria-hidden="true">
                            <i className="ph ph-shield-warning"></i>
                        </div>
                        <h3>Security blocks releases</h3>
                        <p>Compliance reviews, vulnerability scans, and audit requirements sit between your team and every deployment.</p>
                    </div>

                    <div className="problem-card reveal rd4">
                        <div className="problem-icon" aria-hidden="true">
                            <i className="ph ph-cloud"></i>
                        </div>
                        <h3>Cloud costs outpace growth</h3>
                        <p>The bill grows faster than revenue. Right-sizing, reserved capacity, and architecture decisions get deprioritised until they hurt.</p>
                    </div>
                </div>

                <p className="problem-bridge reveal">
                    That is exactly the work I specialise in.
                </p>
            </div>
        </section>
    )
}