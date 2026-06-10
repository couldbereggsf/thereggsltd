// src/pages/Problem.jsx
//
// Screen 2 — The Problem
// Makes the visitor feel understood before they scroll further.
// Three pain cards + a bridge line that leads into the personalisation step.

import useScrollReveal from '../hooks/useScrollReveal'

// Each pain point is stored as data so the JSX stays clean.
// If you ever want to change the copy, you only touch this array.
const PAINS = [
  {
    id: 'velocity',
    icon: 'ph ph-fire',
    title: 'Dev velocity drops',
    body:  'Complexity grows with every sprint. The codebase that was fast to build becomes slow to change — and slower to debug at 2am.',
  },
  {
    id: 'security',
    icon: 'ph ph-shield-warning',
    title: 'Security blocks releases',
    body:  'Compliance reviews, vulnerability scans, and audit requirements sit between your team and every deployment.',
  },
  {
    id: 'cloud',
    icon: 'ph ph-cloud',
    title: 'Cloud costs outpace growth',
    body:  'The bill grows faster than revenue. Right-sizing, reserved capacity, and architecture decisions get deprioritised until they hurt.',
  },
]

export default function Problem() {
  // Attach the scroll-reveal observer to this section
  const sectionRef = useScrollReveal()

  return (
    <section
      id="problem"
      className="section-problem"
      ref={sectionRef}
      aria-label="Common engineering problems"
    >
      <div className="problem-inner">
        <div className="container">

          <p className="section-label reveal">Sound familiar?</p>

          <h2 className="problem-headline reveal rd1">
            Your system works — until it <em>doesn't.</em>
          </h2>

          <div className="problem-grid">
            {PAINS.map((pain, index) => (
              <div
                key={pain.id}
                className={`problem-card reveal rd${index + 2}`}
              >
                <div className="problem-icon" aria-hidden="true">
                  <i className={pain.icon}></i>
                </div>
                <h3>{pain.title}</h3>
                <p>{pain.body}</p>
              </div>
            ))}
          </div>

          <p className="problem-bridge reveal">
            That is exactly the work I specialise in.
          </p>

        </div>
      </div>
    </section>
  )
}
