// src/pages/Features.jsx
//
// Screen 5 — Simplified features
// Every feature is rewritten as a business outcome.
// No jargon. No bullet lists of technologies.
// The visitor reads what changes for them, not what tools are used.

import useScrollReveal from '../hooks/useScrollReveal'
import useTilt         from '../hooks/useTilt'

// Outcome card data.
// "was" is the technical feature name shown in muted text at the bottom
// so technical visitors can still orient themselves.
const OUTCOMES = [
  {
    id:    'apis',
    num:   '01',
    title: 'APIs that hold up when traffic spikes',
    sub:   'No emergency calls at 2am. No rewrites six months after launch.',
    was:   'Java & Spring Boot',
  },
  {
    id:    'cloud',
    num:   '02',
    title: 'Cloud costs down 30–40%',
    sub:   'Infra your team can understand, right-sized from the start.',
    was:   'AWS & multi-cloud architecture',
  },
  {
    id:    'security',
    num:   '03',
    title: 'Ship faster — security baked in, not bolted on',
    sub:   'Reviews stop blocking releases. Compliance becomes a byproduct.',
    was:   'DevSecOps practices',
  },
  {
    id:    'db',
    num:   '04',
    title: 'Queries that stop slowing your users down',
    sub:   'Database optimisation across SAP, Oracle, Azure SQL, and PostgreSQL.',
    was:   'Database optimisation',
  },
  {
    id:    'frontend',
    num:   '05',
    title: 'A front-end that matches the quality of your backend',
    sub:   'Mobile-first, accessible, and fast on any device your clients use.',
    was:   'React — frontend development',
  },
  {
    id:    'fintech',
    num:   '06',
    title: 'Finance logic that survives an audit',
    sub:   'Data pipelines built for environments where bugs cost real money.',
    was:   'Financial systems & market data',
  },
]

// Each card is its own component so the tilt hook
// can attach a separate ref to each one independently
function OutcomeCard({ outcome, delay }) {
  const cardRef = useTilt({ maxTilt: 8, scale: 1.02 })

  return (
    <div
      ref={cardRef}
      className={`outcome-card reveal rd${delay}`}
    >
      <div className="outcome-num">{outcome.num}</div>
      <h3 className="outcome-title">{outcome.title}</h3>
      <p className="outcome-sub">{outcome.sub}</p>
      <p className="outcome-was">Was: {outcome.was}</p>
    </div>
  )
}

export default function Features() {
  const sectionRef = useScrollReveal()

  return (
    <section
      id="features"
      className="section-features"
      ref={sectionRef}
      aria-label="What you actually get"
    >
      <div className="container">

        <p className="section-label reveal">What you actually get</p>

        <h2 className="section-heading reveal rd1">
          Outcomes, not <em>feature lists.</em>
        </h2>

        <div className="features-grid">
          {OUTCOMES.map((outcome, index) => (
            <OutcomeCard
              key={outcome.id}
              outcome={outcome}
              delay={(index % 5) + 1}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
