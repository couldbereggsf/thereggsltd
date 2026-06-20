const TRUST = [
  "Free first call",
  "No NDA required to talk",
  "Response in under 4 hours",
  "Available for 2 more projects",
];

function TickIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M1.5 6.5l3.5 3.5 6.5-6.5" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function CTA() {
  return (
    <section className="cta">
      <div className="section-inner">
        <p className="eyebrow eyebrow--light">Next step</p>
        <h2 className="section-heading section-heading--light">
          The next step is <em>one message away.</em>
        </h2>
        <p className="cta__desc">
          15 minutes. No obligation. No sales pitch. Most clients know whether
          it is a fit in the first conversation.
        </p>

        <div className="cta__trust">
          {TRUST.map((t) => (
            <span key={t} className="cta__trust-item">
              <TickIcon />{t}
            </span>
          ))}
        </div>

        <div className="cta__actions">
          <a href="#contact" className="btn btn--primary">Book a 15-min call</a>
          <a href="mailto:reaganfwambaa@gmail.com" className="btn btn--ghost">Send an email</a>
        </div>

        <p className="cta__direct">
          Or reach out directly:{" "}
          <a href="mailto:reaganfwambaa@gmail.com">reaganfwambaa@gmail.com</a>
        </p>
      </div>
    </section>
  );
}
