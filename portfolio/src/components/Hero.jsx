import { useTyped } from '../hooks/useTyped';
import { TYPED_WORDS, CONTACT_INFO } from '../data/data';
import * as Icon from './Icons';
import './Hero.css';

export default function Hero() {
  const typed = useTyped(TYPED_WORDS);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      <div className="hero-grid" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div className="container hero-content">
        <div className="hero-tag">
          <span className="hero-dot" />
          Backend & Frontend Developer · AI/ML Enthusiast
        </div>

        <h1 className="hero-name">Ramani S</h1>

        <div className="hero-typed">
          {typed}<span className="cursor" />
        </div>

        <p className="hero-sub">
          Enthusiastic software engineer passionate about building real-world solutions
          using frontend, backend, and AI/ML skills. Currently at{' '}
          <strong>Amshuhu iTech Solution Pvt Ltd</strong>.
        </p>

        <div className="hero-meta">
          <span className="hero-location">
            <Icon.MapPin /> {CONTACT_INFO.location}
          </span>
          <span className="hero-cgpa">CGPA: 7.55</span>
        </div>

        <div className="btn-row">
          <button className="btn btn-primary" onClick={() => scrollTo('projects')}>
            <Icon.Code /> View Projects
          </button>
          <a
            className="btn btn-outline"
            href="/RAMANI_RESUME.pdf"
            download
          >
            <Icon.Download /> Download Resume
          </a>
          <button className="btn btn-ghost" onClick={() => scrollTo('contact')}>
            <Icon.Send /> Contact Me
          </button>
        </div>

        <div className="hero-socials">
          <a href={CONTACT_INFO.github} target="_blank" rel="noreferrer" className="hero-social-link">
            <Icon.GitHub /> GitHub
          </a>
          <a href={CONTACT_INFO.linkedin} target="_blank" rel="noreferrer" className="hero-social-link">
            <Icon.LinkedIn /> LinkedIn
          </a>
          <a href={CONTACT_INFO.leetcode} target="_blank" rel="noreferrer" className="hero-social-link">
            <Icon.Code /> LeetCode
          </a>
        </div>
      </div>

      <div className="scroll-hint" onClick={() => scrollTo('about')}>
        <span>scroll</span>
        <Icon.ChevronDown />
      </div>
    </section>
  );
}
