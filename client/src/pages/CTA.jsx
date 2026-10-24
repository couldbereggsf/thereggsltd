import React, { useEffect } from 'react'

export default function CTA() {
    // ── Scroll reveal ──
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible')
                }
            })
        }, { threshold: 0.15 })

        document.querySelectorAll('#cta .reveal').forEach(el => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    return (
        <section id="cta" className="section-cta">
            <div className="container">
                <div className="cta-card reveal">
                    <div className="cta-content">
                        <p className="section-label">Let's Talk</p>

                        <h2 className="cta-headline">
                            Ready to fix that <em>bottleneck?</em>
                        </h2>

                        <p className="cta-sub">
                            Whether you need a system rescued, a legacy codebase modernised,
                            or a secure architecture built from scratch — let's have a straight,
                            technical conversation.
                        </p>

                        <div className="cta-actions">
                            <a href="#contact" className="btn btn-primary">
                                Book a 15-min chat
                                <i className="ph ph-calendar-blank" aria-hidden="true"></i>
                            </a>
                            <a href="mailto:reaganfwambaa@gmail.com" className="btn btn-ghost">
                                Send an email
                                <i className="ph ph-envelope" aria-hidden="true"></i>
                            </a>
                        </div>

                        <p className="cta-email">
                            Prefer email? Reach me directly at{' '}
                            <a href="mailto:reaganfwambaa@gmail.com">reaganfwambaa@gmail.com</a>
                        </p>
                    </div>

                    {/* Realistic "What to expect" panel */}
                    <div className="cta-expectations">
                        <h4>What actually happens on the call?</h4>
                        <ul>
                            <li>
                                <div className="expect-icon"><i className="ph ph-chat-teardrop-text"></i></div>
                                <div>
                                    <strong>You tell me what's broken</strong>
                                    <span>We look at your architecture, code, or business problem.</span>
                                </div>
                            </li>
                            <li>
                                <div className="expect-icon"><i className="ph ph-magnifying-glass"></i></div>
                                <div>
                                    <strong>I give you a straight answer</strong>
                                    <span>If I can fix it, I'll tell you how. If I can't, I'll tell you that too.</span>
                                </div>
                            </li>
                            <li>
                                <div className="expect-icon"><i className="ph ph-map-trifold"></i></div>
                                <div>
                                    <strong>You leave with a clear next step</strong>
                                    <span>Even if we don't work together, you'll have actionable advice.</span>
                                </div>
                            </li>
                        </ul>

                        <div className="cta-trust">
                            <span className="trust-item">
                                <i className="ph ph-check-circle"></i>
                                100% free, no obligation
                            </span>
                            <span className="trust-item">
                                <i className="ph ph-check-circle"></i>
                                Available for 2 new projects
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}