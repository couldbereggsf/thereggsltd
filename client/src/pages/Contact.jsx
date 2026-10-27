import React, { useState, useEffect } from 'react'

const CONTACT_LINKS = [
    {
        id: 'email',
        icon: 'ph ph-envelope',
        label: 'Email',
        value: 'reaganfwambaa@gmail.com',
        href: 'mailto:reaganfwambaa@gmail.com',
    },
    {
        id: 'phone',
        icon: 'ph ph-phone',
        label: 'Phone',
        value: '+254 790 028 542',
        href: 'tel:+254790028542',
    },
    {
        id: 'linkedin',
        icon: 'ph ph-linkedin-logo',
        label: 'LinkedIn',
        value: 'reagan-f-04a448244',
        href: 'https://linkedin.com/in/reagan-f-04a448244',
        external: true,
    },
    {
        id: 'github',
        icon: 'ph ph-github-logo',
        label: 'GitHub',
        value: 'couldbereggsf',
        href: 'https://github.com/couldbereggsf',
        external: true,
    },
]

const INITIAL_FORM = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
    const [form, setForm] = useState(INITIAL_FORM)
    const [status, setStatus] = useState('idle') // idle | loading | success | error
    const [errMsg, setErrMsg] = useState('')
    const [localTime, setLocalTime] = useState('')

    // ── Live Nairobi Time ──
    useEffect(() => {
        const updateTime = () => {
            const options = {
                timeZone: 'Africa/Nairobi',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            }
            setLocalTime(new Intl.DateTimeFormat('en-US', options).format(new Date()))
        }

        updateTime()
        const interval = setInterval(updateTime, 60000) // Update every minute
        return () => clearInterval(interval)
    }, [])

    // ── Scroll reveal ──
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible')
                }
            })
        }, { threshold: 0.15 })

        document.querySelectorAll('#contact .reveal').forEach(el => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrMsg('')

        if (!form.name || !form.email || !form.message) {
            setErrMsg('Please fill in your name, email, and message.')
            return
        }

        setStatus('loading')

        try {
            const response = await fetch('http://localhost:8080/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Failed to send message')
            }

            setStatus('success')
            setForm(INITIAL_FORM)
            setTimeout(() => setStatus('idle'), 5000)
        } catch (err) {
            setStatus('error')
            setErrMsg(err.message || 'Something went wrong. Please try emailing me directly.')
        }
    }

    return (
        <section id="contact" className="section-contact">
            <div className="container">
                <p className="section-label reveal">Contact</p>
                <h2 className="section-heading reveal rd1">
                    Let&apos;s Build <em>Something.</em>
                </h2>

                <div className="contact-layout">
                    {/* Left — Info & Links */}
                    <div className="contact-info reveal rd2">
                        <p className="contact-intro">
                            I'm currently available for freelance projects and full-time opportunities.
                            Let's talk about how I can help your business grow.
                        </p>

                        {/* Live Status */}
                        <div className="live-status">
                            <span className="status-dot"></span>
                            <span className="status-text">
                                It's <strong>{localTime}</strong> in Nairobi. I usually reply within 4 hours.
                            </span>
                        </div>

                        <div className="contact-links">
                            {CONTACT_LINKS.map((link) => (
                                <a
                                    key={link.id}
                                    href={link.href}
                                    className="contact-link"
                                    target={link.external ? '_blank' : undefined}
                                    rel={link.external ? 'noopener noreferrer' : undefined}
                                >
                                    <div className="c-icon">
                                        <i className={link.icon} aria-hidden="true"></i>
                                    </div>
                                    <div className="c-detail">
                                        <span className="c-type">{link.label}</span>
                                        <span className="c-val">{link.value}</span>
                                    </div>
                                    <i className="ph ph-arrow-up-right c-arrow" aria-hidden="true"></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right — Form */}
                    <div className="contact-form-card reveal rd3">
                        {status === 'success' ? (
                            <div className="form-success">
                                <div className="success-icon-wrap">
                                    <i className="ph ph-check-circle"></i>
                                </div>
                                <h3>Message received</h3>
                                <p>Thanks for reaching out. I'll get back to you within 4 hours.</p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="btn btn-ghost"
                                    style={{ marginTop: '1.5rem' }}
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="contact-name" className="form-label">NAME</label>
                                        <input
                                            id="contact-name"
                                            type="text"
                                            name="name"
                                            className="form-input"
                                            placeholder="Your full name"
                                            value={form.name}
                                            onChange={handleChange}
                                            disabled={status === 'loading'}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="contact-email" className="form-label">EMAIL</label>
                                        <input
                                            id="contact-email"
                                            type="email"
                                            name="email"
                                            className="form-input"
                                            placeholder="your@email.com"
                                            value={form.email}
                                            onChange={handleChange}
                                            disabled={status === 'loading'}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contact-subject" className="form-label">SUBJECT</label>
                                    <input
                                        id="contact-subject"
                                        type="text"
                                        name="subject"
                                        className="form-input"
                                        placeholder="What's this about?"
                                        value={form.subject}
                                        onChange={handleChange}
                                        disabled={status === 'loading'}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contact-message" className="form-label">MESSAGE</label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        className="form-textarea"
                                        placeholder="Tell me about your project..."
                                        rows="5"
                                        value={form.message}
                                        onChange={handleChange}
                                        disabled={status === 'loading'}
                                    ></textarea>
                                </div>

                                {errMsg && (
                                    <p className="form-error" role="alert">
                                        {errMsg}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-submit"
                                    disabled={status === 'loading'}
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <i className="ph ph-spinner ph-spin"></i>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <i className="ph ph-paper-plane-tilt"></i>
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}