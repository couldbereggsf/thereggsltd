const PROJECTS = [
  {
    title: "Cloud Security Dashboard",
    tags:  ["AWS", "Java", "React"],
    desc:  "Centralised monitoring system for multi-cloud environments that reduced security incident response time by 65%.",
    caseStudy: "#",
    demo: "#",
  },
  {
    title: "NSE Financial Analytics Platform",
    tags:  ["Spring Boot", "Python", "PostgreSQL", "AWS ECS"],
    desc:  "Real-time investment analysis tool processing NSE market feeds with 99.9% uptime SLA and Redis-backed caching.",
    caseStudy: "#",
    demo: null,
  },
  {
    title: "DevSecOps Pipeline Overhaul",
    tags:  ["CI/CD", "OWASP", "Azure", "Java"],
    desc:  "End-to-end pipeline modernisation cutting release cycles from two weeks to two days with automated security gates.",
    caseStudy: "#",
    demo: null,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="section-inner">
        <p className="eyebrow">Featured Work</p>
        <h2 className="section-heading">
          Projects That <em>Matter</em>
        </h2>

        <div className="projects__grid">
          {PROJECTS.map((p) => (
            <div key={p.title} className="projects__card">
              <div className="projects__card-header">
                <h3 className="projects__card-title">{p.title}</h3>
                <div className="projects__tags">
                  {p.tags.map((t) => (
                    <span key={t} className="projects__tag">{t}</span>
                  ))}
                </div>
              </div>
              <p className="projects__card-desc">{p.desc}</p>
              <div className="projects__card-links">
                <a href={p.caseStudy} className="btn btn--outline btn--sm">Case Study</a>
                {p.demo && (
                  <a href={p.demo} className="btn btn--outline btn--sm">Live Demo</a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="projects__cta">
          <a href="https://github.com/couldbereggsf" className="btn btn--outline" target="_blank" rel="noreferrer">
            GitHub Profile
          </a>
          <a href="https://www.upwork.com/freelancers/~0173ac14a9e0ef0a69" className="btn btn--outline" target="_blank" rel="noreferrer">
            Upwork Profile
          </a>
        </div>
      </div>
    </section>
  );
}
