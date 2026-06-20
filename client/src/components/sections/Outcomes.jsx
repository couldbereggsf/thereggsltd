const OUTCOMES = [
  { metric: "65%",  label: "Faster incident response",   desc: "Security dashboard reducing mean time-to-detect across multi-cloud environments." },
  { metric: "40%",  label: "Infrastructure cost reduction", desc: "Cloud migration and right-sizing strategy delivered for a regional financial firm." },
  { metric: "99.9%", label: "Uptime SLA maintained",      desc: "Real-time data pipeline processing market feeds with zero-downtime deployments." },
  { metric: "3×",   label: "Release velocity increase",   desc: "CI/CD pipeline overhaul cutting release cycle from two weeks to two days." },
];

export default function Outcomes() {
  return (
    <section className="outcomes">
      <div className="section-inner">
        <p className="eyebrow">What you actually get</p>
        <h2 className="section-heading">
          Outcomes, not <em>feature lists.</em>
        </h2>
        <div className="outcomes__grid">
          {OUTCOMES.map((o) => (
            <div key={o.metric} className="outcomes__card">
              <span className="outcomes__metric">{o.metric}</span>
              <strong className="outcomes__label">{o.label}</strong>
              <p className="outcomes__desc">{o.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
