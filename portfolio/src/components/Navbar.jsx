import { useState, useEffect } from 'react';
import { useApiObject } from '../hooks/useApiData';
import { NAV_LINKS, CONTACT_INFO } from '../data/data';
import * as Icon from './Icons';
import './Navbar.css';

// Map nav-link label -> section id used in the document.
const LINK_TO_ID = {
  Home: 'home',
  About: 'about',
  Experience: 'experience',
  Skills: 'skills',
  Projects: 'projects',
  Certifications: 'certifications',
  GitHub: 'github',
  Contact: 'contact',
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('Home');
  const [theme, setTheme] = useState('dark');

  const settings = useApiObject('site-settings', {
    logo: 'Ramani.',
    navLinks: NAV_LINKS,
  });
  const contactInfo = useApiObject('about', CONTACT_INFO);
  const navLinks = settings.navLinks?.length ? settings.navLinks : NAV_LINKS;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // scroll-spy — pick the section nearest the top of the viewport
      const sections = Object.values(LINK_TO_ID);
      let current = navLinks[0];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom > 120) {
          current =
            Object.keys(LINK_TO_ID).find((k) => LINK_TO_ID[k] === id) ||
            current;
          break;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [navLinks]);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersLight =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: light)').matches;
    const initial = stored || (prefersLight ? 'light' : 'dark');
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  const scrollTo = (label) => {
    setOpen(false);
    setActive(label);
    const id = LINK_TO_ID[label] || label.toLowerCase();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const logo = settings.logo || 'Ramani.';

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <span className="logo" onClick={() => scrollTo('Home')}>
          {logo}
        </span>

        <button
          className="hamburger"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <Icon.X /> : <Icon.Menu />}
        </button>

        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {navLinks.map((l) => (
            <li key={l}>
              <span
                className={`nav-link ${active === l ? 'active' : ''}`}
                onClick={() => scrollTo(l)}
              >
                {l}
              </span>
            </li>
          ))}
          <li className="nav-divider" />
          <li>
            <a
              href={`mailto:${contactInfo.email}`}
              className="nav-cta"
              title="Get in touch"
            >
              <Icon.Mail /> Hire me
            </a>
          </li>
        </ul>

        <div className="nav-actions">
          <a
            href={contactInfo.github}
            target="_blank"
            rel="noreferrer"
            className="admin-link-desktop"
            title="GitHub"
          >
            <Icon.GitHub />
          </a>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title="Toggle theme"
            aria-label="Toggle theme"
            data-theme-state={theme}
          >
            <span className={`theme-icon ${theme === 'dark' ? 'show-moon' : 'show-sun'}`}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {/* Sun */}
                <g className="sun">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </g>
                {/* Moon */}
                <g className="moon">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </g>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
