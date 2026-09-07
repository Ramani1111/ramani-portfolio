import { useTyped } from '../hooks/useTyped';
import { useApiObject } from '../hooks/useApiData';
import { TYPED_WORDS, CONTACT_INFO, STATS, MARQUEE_TECHS } from '../data/data';
import * as Icon from './Icons';
import TechIcon from './TechIcon';
import './Hero.css';

const defaultSettings = {
  heroTag: 'Open to opportunities · Sivakasi, India',
  heroName: 'Ramani S',
  role: 'Full Stack Developer',
  typedWords: TYPED_WORDS,
  heroSubtitle:
    'I build enterprise web applications end to end — React and Angular frontends, Java and Node.js backends — and ship side products like a real-time chat app and a Flutter job tracker.',
  lede: 'B.E. CSE at Mepco Schlenk Engineering College, working at Amshuhu iTech on production web apps used by real teams.',
};

export default function Hero() {
  const settings = useApiObject('site-settings', defaultSettings);
  const contactInfo = useApiObject('about', CONTACT_INFO);
  const stats = useApiObject('stats', STATS);
  const marqueeTechs = useApiObject('marquee', MARQUEE_TECHS);
  const resume = useApiObject('resume/latest', { url: '/RAMANI_RESUME.pdf' });

  const typedWords =
    settings.typedWords?.length ? settings.typedWords : TYPED_WORDS;
  const typed = useTyped(typedWords);
  const heroName = settings.heroName || defaultSettings.heroName;
  const initials = (heroName || '')
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
  const hasPhoto = !!(contactInfo && contactInfo.photo);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Build a list of unique tech names to render in two opposite-scrolling rows.
  const techs = marqueeTechs?.length ? marqueeTechs : MARQUEE_TECHS;
  const half = Math.ceil(techs.length / 2);
  const rowA = techs.slice(0, half);
  const rowB = techs.slice(half);

  return (
    <section id="home" className="hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />

      <div className="container hero-content">
        <div className="hero-grid-2">
          <div className="hero-copy">
            <div className="hero-tag">
              <span className="hero-dot" />
              {settings.heroTag || defaultSettings.heroTag}
            </div>

            <h1 className="hero-name">
              {heroName}
              <span className="hero-name-accent">.</span>
            </h1>

            <p className="hero-role">
              {settings.role || defaultSettings.role}{' '}
              <span className="hero-typed-inline">
                <span className="hero-typed">{typed}</span>
                <span className="cursor" />
              </span>
            </p>

            <p className="hero-sub">
              {settings.heroSubtitle || defaultSettings.heroSubtitle}
            </p>
            <p className="hero-lede">{settings.lede || defaultSettings.lede}</p>

            <div className="btn-row">
              <button
                className="btn btn-primary"
                onClick={() => scrollTo('projects')}
              >
                <Icon.Code /> View Projects
              </button>
              <a
                className="btn btn-outline"
                href={resume.url || '/RAMANI_RESUME.pdf'}
                download
              >
                <Icon.Download /> Download Resume
              </a>
              <button
                className="btn btn-ghost"
                onClick={() => scrollTo('contact')}
              >
                <Icon.Send /> Contact Me
              </button>
            </div>

            <div className="hero-socials">
              <a
                href={contactInfo.github}
                target="_blank"
                rel="noreferrer"
                className="hero-social-link"
              >
                <Icon.GitHub /> GitHub
              </a>
              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hero-social-link"
              >
                <Icon.LinkedIn /> LinkedIn
              </a>
              <a
                href={contactInfo.leetcode}
                target="_blank"
                rel="noreferrer"
                className="hero-social-link"
              >
                <Icon.Code /> LeetCode
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="hero-social-link"
              >
                <Icon.Mail /> Email
              </a>
            </div>
          </div>

          <div className="hero-portrait-wrap">
            <div className="hero-portrait-frame">
              <div
                className="hero-portrait"
                style={{
                  backgroundImage: `url(${contactInfo.photo || '/profile.jpg'})`,
                }}
              >
                {!hasPhoto && (
                  <div className="hero-portrait-initials">{initials}</div>
                )}
              </div>
              <div className="hero-portrait-badge">
                <span className="pb-value">FSD</span>
                <span className="pb-label">
                  Full Stack
                  <br />
                  Developer
                </span>
              </div>
            </div>

            <div className="hero-stats">
              {(stats?.length ? stats : STATS).map((s) => (
                <div key={s.k} className="hero-stat">
                  <div className="hero-stat-v">{s.v}</div>
                  <div className="hero-stat-k">{s.k}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Marquee tech strip — like Sathish's portfolio */}
        <div className="hero-marquee" aria-label="Technologies I work with">
          <div className="marq-row">
            <div className="marq-track">
              {/* 3 sets so the -33.33% translation creates a perfect infinite loop */}
              {[...rowA, ...rowA, ...rowA].map((t, i) => (
                <span
                  key={`a-${t.name}-${i}`}
                  className="tech-tile"
                  style={{ '--brand': t.color }}
                >
                  <span className="tech-icon" style={{ color: t.color }}>
                    <TechIcon name={t.name} size={18} />
                  </span>
                  <span className="tech-name">{t.name}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="marq-row rev">
            <div className="marq-track">
              {[...rowB, ...rowB, ...rowB].map((t, i) => (
                <span
                  key={`b-${t.name}-${i}`}
                  className="tech-tile"
                  style={{ '--brand': t.color }}
                >
                  <span className="tech-icon" style={{ color: t.color }}>
                    <TechIcon name={t.name} size={18} />
                  </span>
                  <span className="tech-name">{t.name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-hint" onClick={() => scrollTo('about')}>
        <span>scroll</span>
        <Icon.ChevronDown />
      </div>
    </section>
  );
}
