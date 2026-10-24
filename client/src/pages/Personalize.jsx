import React, { useEffect } from 'react'

const PERSONAS = [
    {
        id: 'startup',
        icon: 'ph ph-rocket-launch',
        title: 'Building a startup',
        subtitle: 'Need an MVP or technical co-founder',
        hint: 'Showing startup-focused case studies below',
    },
    {
        id: 'enterprise',
        icon: 'ph ph-buildings',
        title: 'Scaling a system',
        subtitle: 'Legacy modernisation or cloud migration',
        hint: 'Showing enterprise and cloud migration work below',
    },
    {
        id: 'hire',
        icon: 'ph ph-user-check',
        title: 'Looking to hire',
        subtitle: 'Full-time or long-term contract',
        hint: 'Showing availability, resume and references below',
    },
    {
        id: 'audit',
        icon: 'ph ph-magnifying-glass',
        title: 'Need a code audit',
        subtitle: 'Security, performance or architecture review',
        hint: 'Try the 30-second stack audit below',
    },
]

export default function Personalize({ onSelect, selectedPersona }) {
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

    const handleSelect = (persona) => {
        onSelect(persona.id)

        // Smooth-scroll to the solution section after a short delay
        // so the visitor sees the button activate before the page moves
        setTimeout(() => {
            document.getElementById('solution')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }, 280)
    }

    // Find the hint for the currently selected persona
    const activePersona = PERSONAS.find((p) => p.id === selectedPersona)

    return (
        <section id="personalize" className="section-personalize">
            <div className="container">
                <div className="personalize-header">
                    <p className="section-label reveal">Step one</p>
                    <h2 className="section-heading reveal rd1">What brings you here?</h2>
                    <p className="reveal rd2">
                        Select the option that best describes your situation.
                        The page will adapt to show you what is most relevant.
                    </p>
                </div>

                {/* Persona buttons */}
                <div
                    className="persona-grid reveal rd3"
                    role="group"
                    aria-label="Choose your situation"
                >
                    {PERSONAS.map((persona) => (
                        <button
                            key={persona.id}
                            className="persona-btn"
                            aria-pressed={selectedPersona === persona.id}
                            onClick={() => handleSelect(persona)}
                            type="button"
                        >
                            <div className="persona-icon-wrap" aria-hidden="true">
                                <i className={persona.icon}></i>
                            </div>
                            <strong>{persona.title}</strong>
                            <span>{persona.subtitle}</span>
                        </button>
                    ))}
                </div>

                {/* Live region — announces hint changes to screen readers */}
                <p
                    className="persona-hint"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {activePersona ? activePersona.hint : ''}
                </p>
            </div>
        </section>
    )
}