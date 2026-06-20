import { useEffect, useRef, useState } from "react";
import useCountUp from "../../hooks/useCountUp";

const TECH_PILLS = ["Python", "Spring Boot", "React", "Node.js", "Java", "PostgreSQL", "AWS"];

const STATS = [
  { value: 5,    suffix: "+",  label: "Years Experience" },
  { value: 35,   suffix: "%",  label: "Cost Reduction"   },
  { value: 99.9, suffix: "%",  label: "Uptime SLA"       },
];

function StatCounter({ value, suffix, label, start }) {
  const count = useCountUp(value, 1800, start);
  return (
    <div className="hero__stat">
      <span className="hero__stat-value">{count}{suffix}</span>
      <span className="hero__stat-label">{label}</span>
    </div>
  );
}

export default function Hero() {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" className="hero" ref={ref}>
      <div className="hero__content">

        <div className="hero__text">
          <p className="eyebrow">Full-Stack Engineer</p>
          <h1 className="hero__headline">
            Java <span className="hero__headline--accent">Specialist</span>
          </h1>
          <p className="hero__sub">
            Building secure, scalable systems that solve real business problems.
          </p>
          <div className="hero__actions">
            <a href="#projects" className="btn btn--primary">View Projects</a>
            <a href="#contact"  className="btn btn--outline">Get in Touch</a>
          </div>
          <div className="hero__stats">
            {STATS.map((s) => (
              <StatCounter key={s.label} {...s} start={inView} />
            ))}
          </div>
        </div>

        <div className="hero__visual">
          <img
            src="/assets/images/portfoliophoto.jpeg"
            alt="Reagan Fwamba"
            className="hero__photo"
          />
          <div className="hero__pills">
            {TECH_PILLS.map((t) => (
              <span key={t} className="hero__pill">{t}</span>
            ))}
          </div>
        </div>

      </div>

      <a href="#about" className="hero__scroll" aria-label="Scroll to about">
        Scroll
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M8 3v10M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </section>
  );
}
