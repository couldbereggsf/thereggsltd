import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home",     href: "#hero" },
  { label: "About",    href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact",  href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <header className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
      <a href="#hero" className="navbar__logo">
        <img
          src="/assets/images/logo.png"
          alt="The Reggs Limited"
          className="navbar__logo-img"
        />
        Reagan Fwamba
      </a>

      <span className="navbar__available">
        <span className="navbar__available-dot" />
        Available for projects
      </span>

      <nav
        className={`navbar__nav${menuOpen ? " navbar__nav--open" : ""}`}
        aria-label="Primary navigation"
      >
        <ul className="navbar__links">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="navbar__link" onClick={close}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <button
        className="navbar__burger"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        <span /><span /><span />
      </button>
    </header>
  );
}
