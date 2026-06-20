const PAINS = [
  {
    title: "Dev velocity drops",
    desc:  "Complexity grows with every sprint. The codebase that was fast to build becomes slow to change — and slower to debug at 2am.",
  },
  {
    title: "Security blocks releases",
    desc:  "Compliance reviews, vulnerability scans, and audit requirements sit between your team and every deployment.",
  },
  {
    title: "Cloud costs outpace growth",
    desc:  "The bill grows faster than revenue. Right-sizing, reserved capacity, and architecture decisions get deprioritised until they hurt.",
  },
];

export default function PainPoints() {
  return (
    <section className="pain">
      <div className="section-inner">
        <p className="eyebrow eyebrow--light">Sound familiar?</p>
        <h2 className="section-heading section-heading--light">
          Your system works — until it <em>doesn't.</em>
        </h2>

        <div className="pain__grid">
          {PAINS.map((p) => (
            <div key={p.title} className="pain__card">
              <h3 className="pain__card-title">{p.title}</h3>
              <p className="pain__card-desc">{p.desc}</p>
            </div>
          ))}
        </div>

        <p className="pain__closer">That is exactly the work I specialise in.</p>
      </div>
    </section>
  );
}
