import { useApiObject } from '../hooks/useApiData';
import { NAV_LINKS, CONTACT_INFO } from '../data/data';
import * as Icon from './Icons';
import './Footer.css';

export default function Footer() {
  const settings = useApiObject('site-settings', {
    logo: 'Ramani.',
    navLinks: NAV_LINKS,
    footerTagline:
      'Full Stack Developer — React, Angular, Java & Node.js.',
    footerCopy: 'Ramani S · Sivakasi, Tamil Nadu, India',
  });
  const contactInfo = useApiObject('about', CONTACT_INFO);
  const navLinks = settings.navLinks?.length ? settings.navLinks : NAV_LINKS;

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const socials = [
    { href: contactInfo.github, icon: <Icon.GitHub />, label: 'GitHub' },
    { href: contactInfo.linkedin, icon: <Icon.LinkedIn />, label: 'LinkedIn' },
    { href: `mailto:${contactInfo.email}`, icon: <Icon.Mail />, label: 'Email' },
    { href: contactInfo.leetcode, icon: <Icon.Code />, label: 'LeetCode' },
  ].filter((s) => s.href);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">{settings.logo || 'Ramani.'}</div>
            <p className="footer-tagline">{settings.footerTagline}</p>
            <div className="footer-social">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn"
                  aria-label={s.label}
                  title={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <div className="footer-col-label">Sitemap</div>
            <div className="footer-links">
              {navLinks.map((link) => (
                <span
                  key={link}
                  className="footer-link"
                  onClick={() => scrollTo(link)}
                >
                  {link}
                </span>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <div className="footer-col-label">Contact</div>
            <div className="footer-contact">
              <a href={`mailto:${contactInfo.email}`} className="footer-link">
                {contactInfo.email}
              </a>
              <a href={`tel:${contactInfo.phone}`} className="footer-link">
                {contactInfo.phone}
              </a>
              <span className="footer-link static">{contactInfo.location}</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">
            &copy; {new Date().getFullYear()} {settings.footerCopy}
          </span>
          <span className="footer-built">
            Built with React &amp; <span className="footer-heart"><Icon.Heart size={11} /></span> · Deployed with care
          </span>
        </div>
      </div>
    </footer>
  );
}
