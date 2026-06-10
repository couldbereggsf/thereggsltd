// src/pages/About.jsx

import useScrollReveal from '../hooks/useScrollReveal'

const TECH = [
  { cat: 'Backend',     tags: ['Java 21', 'Spring Boot 3', 'Spring Security', 'Node.js', 'Express'] },
  { cat: 'Frontend',    tags: ['React', 'Vite', 'JavaScript ES6+', 'HTML5', 'CSS3'] },
  { cat: 'Cloud & DevOps', tags: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'] },
  { cat: 'Databases',   tags: ['PostgreSQL', 'MySQL', 'Redis', 'Oracle', 'SAP HANA'] },
  { cat: 'Security',    tags: ['OWASP', 'DevSecOps', 'IAM', 'SonarQube', 'SAST/DAST'] },
  { cat: 'Data',        tags: ['Python', 'Pandas', 'Time-series', 'Market data pipelines'] },
]

export default function About() {
  const sectionRef = useScrollReveal()

  return (
    <section id="about" className="section-about" ref={sectionRef} aria-label="About Reagan">
      <div className="container">

        <p className="section-label reveal">About</p>
        <h2 className="section-heading reveal rd1">
          Building brick by brick — <em>toward something real.</em>
        </h2>

        <div className="about-layout">

          <div className="about-text">
            <p className="reveal rd1">
              I am a Full-Stack Engineer and founder of The Reggs Limited, based in
              Nairobi, Kenya. I graduated from Murang'a University of Technology
              with a Computer Science degree in August 2025 and have been building production
              systems since my ICT attachment at KenGen in 2022.
            </p>
            <p className="reveal rd2">
              My work sits at the intersection of backend engineering, cloud infrastructure,
              and financial systems. I build things that are meant to last — not prototypes
              that need to be rewritten six months after launch.
            </p>
            <p className="reveal rd3">
              Outside engineering I study financial markets using the ICT methodology,
              and I am working toward live fund management using the analytics systems
              I build. Everything I build for clients, I build for myself first.
            </p>
            <ul className="about-list reveal rd4">
              <li>Computer Science — Murang'a University of Technology (2019–2025)</li>
              <li>ICT Attachment — KenGen, 2022</li>
              <li>AI Data Work — Neevo AI</li>
              <li>Founder — The Reggs Limited</li>
            </ul>
          </div>

          <div className="reveal rd2">
            <div className="tech-grid">
              {TECH.map((group) => (
                <div key={group.cat} className="tech-cat">
                  <h4>{group.cat.toUpperCase()}</h4>
                  <div className="tech-tags">
                    {group.tags.map((tag) => (
                      <span key={tag} className="tech-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
