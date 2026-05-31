import { useState, useEffect } from 'react';
import { NAV_LINKS } from '../data/data';
import * as Icon from './Icons';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState('Home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    setActive(id);
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <span className="logo" onClick={() => scrollTo('Home')}>RS.</span>

        <button className="hamburger" onClick={() => setOpen(!open)}>
          {open ? <Icon.X /> : <Icon.Menu />}
        </button>

        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <span
                className={`nav-link ${active === l ? 'active' : ''}`}
                onClick={() => scrollTo(l)}
              >
                {l}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
