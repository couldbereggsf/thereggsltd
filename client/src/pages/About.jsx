import React, { useEffect } from 'react'
import profilePhoto from '../assets/portfoliophoto.jpeg'

export default function About() {
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
        <section id="about" className="section-about">
            <div className="container">
                <p className="section-label reveal">About Me</p>
                <h2 className="section-heading reveal rd1">
                    Problem Solver &amp; <em>Continuous Learner</em>
                </h2>

                <div className="about-layout">
                    {/* Left – profile image with rotating ring */}
                    <div className="about-image reveal rd1">
                        <div className="about-image-container">
                            <img
                                src={profilePhoto}
                                alt="Reagan Fwamba"
                                className="profile-image"
                                loading="lazy"
                            />
                            <div className="rotating-ring"></div>
                            <div className="profile-badge">
                                <div className="profile-badge-name">
                                    <strong>Reagan Fwamba</strong>
                                    <span>Full-Stack Engineer</span>
                                </div>
                                <div className="profile-badge-location">
                                    <i className="ph ph-map-pin"></i> Nairobi, Kenya
                                </div>
                                <div className="profile-badge-tags">
                                    <span className="badge-tag">Java</span>
                                    <span className="badge-tag">AWS</span>
                                    <span className="badge-tag">React</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right – text content */}
                    <div className="about-text">
                        <p className="reveal rd2">
                            With 5+ years in software development, I&apos;ve helped businesses
                            transform their operations through secure application development,
                            cloud migration strategies, and high-performance systems architecture.
                        </p>

                        {/* Highlight cards */}
                        <ul className="about-highlights reveal rd3" aria-label="Key strengths">
                            <li className="highlight-item">
                                <i className="ph ph-check-circle" aria-hidden="true"></i>
                                <div>
                                    <strong>Secure Development</strong>
                                    <span>OWASP standards and DevSecOps practices baked in from day one</span>
                                </div>
                            </li>
                            <li className="highlight-item">
                                <i className="ph ph-check-circle" aria-hidden="true"></i>
                                <div>
                                    <strong>Cloud Migration</strong>
                                    <span>Strategies that have reduced operational costs by 30–40%</span>
                                </div>
                            </li>
                            <li className="highlight-item">
                                <i className="ph ph-check-circle" aria-hidden="true"></i>
                                <div>
                                    <strong>Performance Engineering</strong>
                                    <span>Optimised for high-traffic, enterprise-scale environments</span>
                                </div>
                            </li>
                        </ul>

                        {/* Tech grid */}
                        <div className="tech-grid reveal rd4">
                            <div>
                                <h4>Languages</h4>
                                <div className="tech-tags">
                                    <span className="tech-tag">Java</span>
                                    <span className="tech-tag">JavaScript</span>
                                    <span className="tech-tag">Python</span>
                                    <span className="tech-tag">SQL</span>
                                </div>
                            </div>
                            <div>
                                <h4>Frameworks</h4>
                                <div className="tech-tags">
                                    <span className="tech-tag">Spring Boot</span>
                                    <span className="tech-tag">React</span>
                                    <span className="tech-tag">Node.js</span>
                                </div>
                            </div>
                            <div>
                                <h4>Cloud &amp; DB</h4>
                                <div className="tech-tags">
                                    <span className="tech-tag">AWS</span>
                                    <span className="tech-tag">Azure</span>
                                    <span className="tech-tag">Oracle</span>
                                    <span className="tech-tag">SAP</span>
                                </div>
                            </div>
                            <div>
                                <h4>Practices</h4>
                                <div className="tech-tags">
                                    <span className="tech-tag">DevSecOps</span>
                                    <span className="tech-tag">CI/CD</span>
                                    <span className="tech-tag">Agile</span>
                                    <span className="tech-tag">OWASP</span>
                                </div>
                            </div>
                        </div>

                        {/* CTAs */}
                        <div className="about-cta reveal rd5">
                            <a
                                href="https://drive.google.com/file/d/1UqVt7H9E4f3OUxB7dGR0-0dwUJWMn-RF/view?usp=sharing"
                                className="btn btn-primary"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="ph ph-download-simple" aria-hidden="true"></i>
                                Download CV
                            </a>
                            <a href="#contact" className="btn btn-ghost">
                                Contact Me
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}