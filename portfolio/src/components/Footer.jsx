import { NAV_LINKS, CONTACT_INFO } from '../data/data';
import * as Icon from './Icons';
import './Footer.css';

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-logo">RS.</div>
        <p className="footer-tagline">Backend & Frontend Developer · AI/ML Enthusiast</p>

        <div className="footer-social">
          <a href={CONTACT_INFO.github} target="_blank" rel="noreferrer" className="social-btn"><Icon.GitHub /></a>
          <a href={CONTACT_INFO.linkedin} target="_blank" rel="noreferrer" className="social-btn"><Icon.LinkedIn /></a>
          <a href={`mailto:${CONTACT_INFO.email}`} className="social-btn"><Icon.Mail /></a>
        </div>

        <div className="footer-links">
          {NAV_LINKS.map((l) => (
            <span key={l} className="footer-link" onClick={() => scrollTo(l)}>{l}</span>
          ))}
        </div>

        <div className="footer-copy">
          © {new Date().getFullYear()} Ramani S · Sivakasi, Tamil Nadu, India
        </div>
      </div>
    </footer>
  );
}
