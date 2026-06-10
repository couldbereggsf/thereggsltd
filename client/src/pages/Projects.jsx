// src/pages/Projects.jsx

import useScrollReveal from '../hooks/useScrollReveal'
import useTilt         from '../hooks/useTilt'

const PROJECTS = [
  {
    id:     'reggs-platform',
    tags:   ['Java', 'Spring Boot', 'AWS', 'React'],
    title:  'The Reggs Financial Analytics Platform',
    desc:   'Real-time NSE market data pipeline with portfolio analytics, risk metrics, and automated alerts. Spring Boot API serving a React dashboard, deployed on AWS ECS with Redis caching and PostgreSQL time-series storage.',
    metric: '99.9% uptime — 0 cloud incidents in year one',
    demo:   '#magic',
    source: 'https://github.com/coudbereggsf',
  },
  {
    id:     'cloud-dashboard',
    tags:   ['AWS', 'Python', 'React', 'DevSecOps'],
    title:  'Cloud Security Monitoring Dashboard',
    desc:   'Multi-cloud visibility platform covering AWS and Azure infrastructure. Automated compliance checks, incident detection, and alerting — reducing mean time to response by 65% for the client team.',
    metric: '65% faster incident response',
    demo:   null,
    source: 'https://github.com/coudbereggsf',
  },
  {
    id:     'portfolio',
    tags:   ['React', 'Vite', 'Node.js', 'Express'],
    title:  'This Portfolio — The Reggs Limited',
    desc:   'An 8-screen, conversion-optimised portfolio built with a Dark Forest Luxury design system. Phase 1 was plain HTML/CSS. Phase 2 migrates to React + Node/Express. Phase 3 will replace the backend with Java and Spring Boot.',
    metric: 'Built in phases — live throughout',
    demo:   '/',
    source: 'https://github.com/coudbereggsf/portfolio',
  },
  {
    id:     'farmers-ledger',
    tags:   ['Excel', 'VBA', 'Data modelling'],
    title:  "Farmer's Ledger — Personal Finance Tracker",
    desc:   'A 13-sheet Excel workbook built around a farmer and seasons metaphor for personal finance. Tracks income, expenses, investments, and KPIs across custom reporting periods with a built-in dashboard.',
    metric: '13 sheets — full finance lifecycle',
    demo:   null,
    source: 'https://github.com/coudbereggsf',
  },
]

function ProjectCard({ project, delay }) {
  const cardRef = useTilt({ maxTilt: 7 })

  return (
    <div ref={cardRef} className={`project-card reveal rd${delay}`}>
      <div className="project-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
      <h3>{project.title}</h3>
      <p>{project.desc}</p>
      <div className="project-metric">{project.metric}</div>
      <div className="project-links">
        {project.demo && (
          <a
            href={project.demo}
            className="project-link"
            target={project.demo.startsWith('http') ? '_blank' : undefined}
            rel={project.demo.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            <i className="ph ph-arrow-square-out" aria-hidden="true"></i>
            Live demo
          </a>
        )}
        <a
          href={project.source}
          className="project-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="ph ph-github-logo" aria-hidden="true"></i>
          Source
        </a>
      </div>
    </div>
  )
}

export default function Projects() {
  const sectionRef = useScrollReveal()

  return (
    <section id="projects" className="section-projects" ref={sectionRef} aria-label="Selected work">
      <div className="container">
        <p className="section-label reveal">Selected work</p>
        <h2 className="section-heading reveal rd1">
          Built, shipped, <em>and running in production.</em>
        </h2>
        <div className="projects-grid">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              delay={(index % 4) + 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
