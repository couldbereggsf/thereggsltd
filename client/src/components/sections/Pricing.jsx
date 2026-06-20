const TIERS = [
  {
    name:      "Basic",
    price:     "$50",
    unit:      "/hour",
    detail:    "4-hour minimum",
    scope:     "Small business sites · Portfolio updates · Plugin integrations",
    features:  ["Website Audit", "Basic Consulting", "Email Support"],
    finePrint: ["50% deposit required", "3 revision rounds included", "14-day support window"],
    cta:       "Get Started",
    featured:  false,
  },
  {
    name:      "Professional",
    price:     "$900",
    unit:      "/project",
    detail:    "2–4 week delivery",
    scope:     "Business websites · E-commerce stores · Web apps",
    features:  ["Full Website Development", "Mobile Optimisation", "1 Month Support", "Basic SEO"],
    finePrint: ["50% deposit required", "3 revision rounds", "1 month support"],
    cta:       "Start Project",
    featured:  true,
  },
  {
    name:      "Enterprise",
    price:     "Custom",
    unit:      "",
    detail:    "Ongoing support",
    scope:     "Large businesses · SaaS platforms · Custom solutions",
    features:  ["Full Stack Development", "Ongoing Maintenance", "Priority Support", "Advanced SEO", "Custom Solutions"],
    finePrint: ["Custom payment terms", "Unlimited revisions", "Ongoing support"],
    cta:       "Contact Me",
    featured:  false,
  },
];

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path d="M2 7.5l4 4 7-7" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Pricing() {
  return (
    <section className="pricing">
      <div className="section-inner">
        <p className="eyebrow">Service Rates</p>
        <h2 className="section-heading">
          Transparent <em>Pricing</em>
        </h2>
        <p className="pricing__sub">Simple, honest rates — no surprises.</p>

        <div className="pricing__grid">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`pricing__card${tier.featured ? " pricing__card--featured" : ""}`}
            >
              {tier.featured && (
                <span className="pricing__badge">Most Popular</span>
              )}

              <div className="pricing__header">
                <h3 className="pricing__name">{tier.name}</h3>
                <div className="pricing__price">
                  {tier.price}
                  {tier.unit && <span>{tier.unit}</span>}
                </div>
                <p className="pricing__detail">{tier.detail}</p>
              </div>

              <p className="pricing__scope">{tier.scope}</p>

              <ul className="pricing__features">
                {tier.features.map((f) => (
                  <li key={f}>
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="pricing__fine-print">
                {tier.finePrint.map((fp) => (
                  <p key={fp}>✓ {fp}</p>
                ))}
              </div>

              <a href="#contact" className="btn btn--primary pricing__cta">
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
