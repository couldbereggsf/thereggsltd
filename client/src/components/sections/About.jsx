const TECH = [
  { label: "Languages",  items: ["Java", "JavaScript", "Python", "SQL"] },
  { label: "Frameworks", items: ["Spring Boot", "React", "Node.js"] },
  { label: "Cloud & DB", items: ["AWS", "Azure", "Oracle", "SAP"] },
  { label: "Practices",  items: ["DevSecOps", "CI/CD", "Agile", "OWASP"] },
];

const HIGHLIGHTS = [
  { title: "Secure Development",      desc: "OWASP standards and DevSecOps practices baked in from day one." },
  { title: "Cloud Migration",          desc: "Strategies that have reduced operational costs by 30–40%." },
  { title: "Performance Engineering",  desc: "Optimised for high-traffic, enterprise-scale environments." },
];

export default function About() {
  return (
    <section id="about" className="about">
      <div className="section-inner">
        <p className="eyebrow">About Me</p>
        <h2 className="section-heading">
          Problem Solver &amp; <em>Continuous Learner</em>
        </h2>

        <div className="about__grid">

          {/* ── Left col ── */}
          <div className="about__left">
            <div className="about__card">
              <img
                src="/assets/images/portfoliophoto.jpeg"
                alt="Reagan Fwamba"
                className="about__photo"
              />
              <div className="about__card-info">
                <strong>Reagan Fwamba</strong>
                <span>Full-Stack Engineer</span>
                <span className="about__location">Nairobi, Kenya</span>
                <div className="about__card-tags">
                  <span>Java</span><span>AWS</span><span>React</span>
                </div>
              </div>
            </div>

            <p className="about__bio">
              With 5+ years in software development, I've helped businesses transform
              their operations through secure application development, cloud migration
              strategies, and high-performance systems architecture.
            </p>

            <ul className="about__highlights">
              {HIGHLIGHTS.map((h) => (
                <li key={h.title} className="about__highlight">
                  <strong>{h.title}</strong>
                  <span>{h.desc}</span>
                </li>
              ))}
            </ul>

            <div className="about__actions">
              <a
                href="https://drive.google.com/file/d/1UqVt7H9E4f3OUxB7dGR0-0dwUJWMn-RF/view"
                className="btn btn--primary"
                target="_blank"
                rel="noreferrer"
              >
                Download CV
              </a>
              <a href="#contact" className="btn btn--outline">Contact Me</a>
            </div>
          </div>

          {/* ── Right col ── */}
          <div className="about__right">
            <p className="about__stack-label">Technical Toolbox</p>
            <div className="about__stack">
              {TECH.map((cat) => (
                <div key={cat.label} className="about__stack-cat">
                  <h4 className="about__stack-cat-title">{cat.label}</h4>
                  <div className="about__stack-pills">
                    {cat.items.map((item) => (
                      <span key={item} className="about__stack-pill">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
