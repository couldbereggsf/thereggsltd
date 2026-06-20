import { useState } from "react";

const OPTIONS = [
  {
    id: "startup",
    title: "Building a startup",
    sub: "Need an MVP or technical co-founder",
    outcomes: [
      "Architecture scoped to your runway — built to scale when you need it.",
      "Tech stack chosen for velocity, not hype.",
      "Security built in from the first line, not bolted on later.",
    ],
  },
  {
    id: "scaling",
    title: "Scaling a system",
    sub: "Legacy modernisation or cloud migration",
    outcomes: [
      "Migration roadmap that keeps your team shipping while we move.",
      "Cost reduction targets set before a single resource is touched.",
      "Zero-downtime strategy for the services that cannot stop.",
    ],
  },
  {
    id: "hire",
    title: "Looking to hire",
    sub: "Full-time or long-term contract",
    outcomes: [
      "Senior full-stack capability across Java, React, and cloud.",
      "Available for immediate start on the right role.",
      "Strong preference for teams that care about code quality.",
    ],
  },
  {
    id: "audit",
    title: "Need a code audit",
    sub: "Security, performance or architecture review",
    outcomes: [
      "Structured audit report with prioritised findings.",
      "OWASP-aligned security review with remediation steps.",
      "Performance profiling and concrete optimisation recommendations.",
    ],
  },
];

export default function Qualifier() {
  const [selected, setSelected] = useState(null);
  const active = OPTIONS.find((o) => o.id === selected);

  return (
    <section id="services" className="qualifier">
      <div className="section-inner">
        <p className="eyebrow">Step one</p>
        <h2 className="section-heading">What brings you here?</h2>
        <p className="qualifier__intro">
          Select the option that best describes your situation. The page will
          adapt to show you what is most relevant.
        </p>

        <div className="qualifier__options">
          {OPTIONS.map((opt) => (
            <button
              key={opt.id}
              className={`qualifier__option${selected === opt.id ? " qualifier__option--active" : ""}`}
              onClick={() => setSelected(selected === opt.id ? null : opt.id)}
              type="button"
            >
              <strong>{opt.title}</strong>
              <span>{opt.sub}</span>
            </button>
          ))}
        </div>

        <div className={`qualifier__result${active ? " qualifier__result--visible" : ""}`}>
          {active ? (
            <>
              <p className="qualifier__result-label">What you get</p>
              <ul className="qualifier__result-list">
                {active.outcomes.map((o) => <li key={o}>{o}</li>)}
              </ul>
              <a href="#contact" className="btn btn--primary">Let's talk about this</a>
            </>
          ) : (
            <p className="qualifier__placeholder">Select an option above</p>
          )}
        </div>
      </div>
    </section>
  );
}
