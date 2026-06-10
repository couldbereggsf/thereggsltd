// src/pages/Pricing.jsx

import useScrollReveal from '../hooks/useScrollReveal'
import useTilt         from '../hooks/useTilt'

const TIERS = [
  {
    id:       'discovery',
    tier:     'DISCOVERY',
    price:    '150',
    cadence:  'per session',
    scope:    'One-time architecture or code review',
    features: [
      '60-minute technical deep-dive',
      'Written findings report',
      'Prioritised action items',
      'One follow-up Q&A session',
    ],
    trust:    ['No retainer', 'Delivered in 5 days'],
    featured: false,
  },
  {
    id:       'project',
    tier:     'PROJECT',
    price:    '2,400',
    cadence:  'per month',
    scope:    'Ongoing development — 4 to 12 weeks',
    features: [
      'Full-stack development or consulting',
      'Weekly progress updates',
      'Code reviews and architecture decisions',
      'Deployment and DevOps support',
      'Security and performance review',
    ],
    trust:    ['Start with paid discovery', 'Cancel with 2 weeks notice'],
    featured: true,
  },
  {
    id:       'advisory',
    tier:     'ADVISORY',
    price:    '800',
    cadence:  'per month',
    scope:    'Technical advisory for founders and leads',
    features: [
      '4 advisory calls per month',
      'Architecture and hiring guidance',
      'Async questions via email',
      'Code review on demand',
    ],
    trust:    ['Month to month', 'No long-term commitment'],
    featured: false,
  },
]

function PricingCard({ tier, delay }) {
  const cardRef = useTilt({ maxTilt: tier.featured ? 5 : 8 })

  return (
    <div
      ref={cardRef}
      className={`pricing-card reveal rd${delay} ${tier.featured ? 'featured' : ''}`}
    >
      {tier.featured && (
        <div className="featured-label">Most popular</div>
      )}
      <p className="pricing-tier">{tier.tier}</p>
      <div className="pricing-price">
        <sup>$</sup>{tier.price}
      </div>
      <p className="pricing-cadence">{tier.cadence}</p>
      <p className="pricing-scope">{tier.scope}</p>

      <ul className="pricing-feats" aria-label={`${tier.tier} plan features`}>
        {tier.features.map((feat) => (
          <li key={feat} className="pricing-feat">
            <i className="ph ph-check-circle" aria-hidden="true"></i>
            {feat}
          </li>
        ))}
      </ul>

      <div className="trust-chips">
        {tier.trust.map((chip) => (
          <span key={chip} className="trust-chip">{chip}</span>
        ))}
      </div>

      <a href="#contact" className="pricing-btn">
        Get started
      </a>
    </div>
  )
}

export default function Pricing() {
  const sectionRef = useScrollReveal()

  return (
    <section id="pricing" className="section-pricing" ref={sectionRef} aria-label="Pricing">
      <div className="container">
        <p className="section-label reveal">Pricing</p>
        <h2 className="section-heading reveal rd1">
          Transparent pricing. <em>No surprises.</em>
        </h2>
        <p className="reveal rd2" style={{ color: 'var(--cream-muted)', maxWidth: '52ch', marginTop: '1rem' }}>
          All engagements start with a free 15-minute call. If the project is not a good fit,
          you will know before spending anything.
        </p>
        <div className="pricing-grid">
          {TIERS.map((tier, index) => (
            <PricingCard key={tier.id} tier={tier} delay={index + 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
