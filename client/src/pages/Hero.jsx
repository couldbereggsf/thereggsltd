// client/src/pages/Hero.jsx
export default function Hero() {
    return (
        <section id="hero" className="section-hero">

            {/* Background orbs */}
            <div className="hero-bg" aria-hidden="true">
                <div className="hero-orb hero-orb-1"></div>
                <div className="hero-orb hero-orb-2"></div>
                <div className="hero-orb hero-orb-3"></div>
                <div className="hero-orb hero-orb-4"></div>
                <div className="hero-grid-lines"></div>
            </div>

            <div className="hero-inner">
                <div className="container">
                    <div className="hero-layout">

                        {/* Left column */}
                        <div className="hero-content">
                            <div className="availability-badge">
                                <span className="avail-dot" aria-hidden="true"></span>
                                Available for projects
                            </div>

                            <h1 className="hero-headline">
                                I build systems that scale —
                                <em> and fix the ones that don't.</em>
                            </h1>

                            <p className="hero-sub">
                                Full-Stack Engineer. Java, Spring Boot, AWS, DevSecOps.
                                Startups and growing teams hire me when reliability matters.
                            </p>

                            <div className="hero-actions">
                                <a href="#quickwin" className="btn btn-primary">
                                    Get a Free Stack Assessment
                                </a>
                                <a href="#contact" className="btn btn-ghost">
                                    Book a 15-min Call
                                </a>
                            </div>

                            <div className="hero-stats">
                                <div>
                                    <div className="stat-value">65%</div>
                                    <div className="stat-label">Faster incident response</div>
                                </div>
                                <div>
                                    <div className="stat-value">30–40%</div>
                                    <div className="stat-label">Cloud cost reduction</div>
                                </div>
                                <div>
                                    <div className="stat-value">99.9%</div>
                                    <div className="stat-label">Uptime SLA delivered</div>
                                </div>
                            </div>
                        </div>

                        {/* Right column — 3D profile */}
                        <div className="hero-visual">
                            <div className="profile-3d-wrap">
                                <div className="profile-tilt-card" id="profileTiltCard">
                                    <div className="profile-img-wrap">
                                        <img
                                            src="/assets/images/IMG_0095-1.png"
                                            alt="Reagan Fwamba, Full-Stack Engineer"
                                            width="360"
                                            height="420"
                                            loading="eager"
                                            decoding="async"
                                        />
                                    </div>
                                    <div className="profile-shimmer" aria-hidden="true"></div>
                                </div>
                                <div className="float-chip chip-1">Java + Spring Boot</div>
                                <div className="float-chip chip-2">AWS Certified</div>
                                <div className="float-chip chip-3">Open to work</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </section>
    )
}