// src/pages/CTA.jsx
//
// Screen 8 — The Call to Action
// One primary action. Risk reducers visible. No choice paralysis.

import useScrollReveal from '../hooks/useScrollReveal'

export default function CTA() {
  const sectionRef = useScrollReveal()

  return (
    <section id="cta" className="section-cta" ref={sectionRef} aria-label="Get in touch">
      <div className="cta-bg" aria-hidden="true"></div>
      <div className="container">
        <div className="cta-inner">

          <p className="section-label reveal">Next step</p>

          <h2 className="cta-headline reveal rd1">
            The next step is <em>one message away.</em>
          </h2>

          <p className="cta-sub reveal rd2">
            15 minutes. No obligation. No sales pitch.
            Most clients know whether it is a fit in the first conversation.
          </p>

          <div className="cta-trust reveal rd3">
            <span className="trust-item">
              <i className="ph ph-check-circle" aria-hidden="true"></i>
              Free first call
            </span>
            <span className="trust-item">
              <i className="ph ph-check-circle" aria-hidden="true"></i>
              No NDA required to talk
            </span>
            <span className="trust-item">
              <i className="ph ph-check-circle" aria-hidden="true"></i>
              Response in under 4 hours
            </span>
            <span className="trust-item">
              <i className="ph ph-check-circle" aria-hidden="true"></i>
              Available for 2 more projects
            </span>
          </div>

          <div className="cta-actions reveal rd4">
            <a href="#contact" className="btn btn-primary">
              Book a 15-min call
              <i className="ph ph-calendar-blank" aria-hidden="true"></i>
            </a>
            <a href="mailto:reaganfwambaa@gmail.com" className="btn btn-ghost">
              Send an email
              <i className="ph ph-envelope" aria-hidden="true"></i>
            </a>
          </div>

          <p className="cta-email reveal rd5">
            Or reach out directly:{' '}
            <a href="mailto:reaganfwambaa@gmail.com">
              reaganfwambaa@gmail.com
            </a>
          </p>

        </div>
      </div>
    </section>
  )
}
