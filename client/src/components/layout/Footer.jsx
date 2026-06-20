const NAV_LINKS = [
  { label: "Home",     href: "#hero" },
  { label: "About",    href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact",  href: "#contact" },
];

const EXPERTISE = [
  "Java Development",
  "Cloud Architecture",
  "Security Consulting",
  "Full-Stack Engineering",
  "DevSecOps",
];

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/reagan-f-04a448244",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/couldbereggsf",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">

        <div className="footer__brand">
          <a href="#hero" className="footer__logo">
            <img src="/assets/images/logo.png" alt="The Reggs Limited" className="footer__logo-img" />
            Reagan Fwamba
          </a>
          <p className="footer__tagline">
            Full-Stack Engineer building secure, scalable systems that deliver
            measurable business value.
          </p>
          <div className="footer__socials">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="footer__social"
                aria-label={s.label}
                target="_blank"
                rel="noreferrer"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Navigation</h4>
          <ul className="footer__col-list">
            {NAV_LINKS.map((l) => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Expertise</h4>
          <ul className="footer__col-list">
            {EXPERTISE.map((e) => (
              <li key={e}><a href="#services">{e}</a></li>
            ))}
          </ul>
        </div>

      </div>

      <div className="footer__bottom">
        <p>© 2025 Reagan Fwamba. All rights reserved.</p>
        <p>Nairobi, Kenya</p>
      </div>
    </footer>
  );
}
