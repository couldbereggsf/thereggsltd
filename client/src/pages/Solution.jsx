// src/pages/Solution.jsx
//
// Screen 4 — Solution
// Shows a different message depending on which persona was selected.
// If no persona is selected yet, shows the startup panel as default.
//
// PROPS:
//   persona  — string ('startup' | 'enterprise' | 'hire' | 'audit' | null)
//              passed down from App.jsx

import useScrollReveal from '../hooks/useScrollReveal'

// All four solution panels defined as data.
// Each has a label, headline, body copy, and a proof card.
const SOLUTIONS = {
  startup: {
    label:    'For founders',
    headline: <>From idea to production in <em>6 weeks</em> — without the hiring overhead.</>,
    body:     'Startups work with me when they need a backend that handles 10x growth from day one. Spring Boot APIs, AWS-native deployment, and zero technical debt baked in from the first commit.',
    proof: {
      title:  'Fintech API — The Reggs Platform',
      detail: 'Launched in 5 weeks. 99.9% uptime. Zero cloud incident in year one. Built on Spring Boot, deployed to AWS ECS.',
    },
  },
  enterprise: {
    label:    'For engineering leads',
    headline: <>Legacy modernisation that <em>does not break</em> what already works.</>,
    body:     'Enterprise teams hire me when they need to move from monolith to services, migrate off on-premise, or reduce a cloud bill that has grown out of control — without stopping the business.',
    proof: {
      title:  'Cloud Security Dashboard',
      detail: 'Reduced incident response time by 65%. Multi-cloud visibility across AWS and Azure. Delivered in a 12-week engagement.',
    },
  },
  hire: {
    label:    'For hiring managers',
    headline: <>A full-stack engineer who <em>ships</em> — and documents what they build.</>,
    body:     'Available for full-time roles and long-term contracts. I bring Java, Spring Boot, React, AWS, and DevSecOps experience to teams that need someone who can work across the stack without hand-holding.',
    proof: {
      title:  'Currently available',
      detail: 'Open to full-time, contract, and remote-first roles. Response time under 4 hours. References available on request.',
    },
  },
  audit: {
    label:    'For technical reviews',
    headline: <>A second pair of eyes on your <em>architecture, security, and performance.</em></>,
    body:     'Code and architecture audits for teams that want an honest assessment before a launch, a fundraise, or a compliance review. Deliverable is a written report with prioritised, actionable findings.',
    proof: {
      title:  'Audit engagement',
      detail: 'Typical audit takes 5–10 working days. Covers OWASP top 10, cloud configuration, database query performance, and dependency vulnerabilities.',
    },
  },
}

export default function Solution({ persona }) {
  const sectionRef = useScrollReveal()

  // If nothing is selected yet, default to startup so the section
  // is never visually empty on first load
  const activeKey  = persona && SOLUTIONS[persona] ? persona : 'startup'
  const active     = SOLUTIONS[activeKey]

  return (
    <section
      id="solution"
      className="section-solution"
      ref={sectionRef}
      aria-label="How I solve your problem"
    >
      <div className="container">

        {/* The key prop on this div is important.
            When `activeKey` changes, React unmounts and remounts
            this div, which re-triggers the CSS fadeInUp animation
            so the content visibly transitions on persona change.  */}
        <div
          key={activeKey}
          className="solution-panel active"
        >
          {/* Left — text content */}
          <div className="solution-text">
            <p className="section-label reveal">{active.label}</p>

            <h2 className="reveal rd1">{active.headline}</h2>

            <p className="reveal rd2">{active.body}</p>

            <div className="solution-proof reveal rd3">
              <strong>{active.proof.title}</strong>
              {active.proof.detail}
            </div>

            <div className="reveal rd4" style={{ marginTop: '2rem' }}>
              <a href="#contact" className="btn btn-primary">
                Discuss your project
                <i className="ph ph-arrow-right" aria-hidden="true"></i>
              </a>
            </div>
          </div>

          {/* Right — decorative stat card */}
          <div className="reveal rd2">
            <div className="glass-card" style={{ padding: '2.5rem', height: '100%', minHeight: '280px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem' }}>
              <p className="section-label" style={{ marginBottom: 0 }}>Typical outcomes</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {activeKey === 'startup' && (
                  <>
                    <Stat value="5–6 wks" label="MVP to production" />
                    <Stat value="99.9%"   label="Uptime target" />
                    <Stat value="$0"      label="Cloud incidents year one" />
                  </>
                )}
                {activeKey === 'enterprise' && (
                  <>
                    <Stat value="65%"    label="Faster incident response" />
                    <Stat value="30–40%" label="Cloud cost reduction" />
                    <Stat value="12 wks" label="Typical engagement length" />
                  </>
                )}
                {activeKey === 'hire' && (
                  <>
                    <Stat value="5 yrs"  label="Production engineering experience" />
                    <Stat value="4 hrs"  label="Average response time" />
                    <Stat value="100%"   label="Remote-ready" />
                  </>
                )}
                {activeKey === 'audit' && (
                  <>
                    <Stat value="5–10"  label="Working days to complete" />
                    <Stat value="OWASP" label="Security framework used" />
                    <Stat value="100%"  label="Written findings delivered" />
                  </>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// Small helper component for the stat items on the right side.
// Defined here because it is only used in this file.
function Stat({ value, label }) {
  return (
    <div>
      <div className="stat-value" style={{ fontSize: 'clamp(1.7rem,1.5rem + 1vw,2.2rem)' }}>{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}
