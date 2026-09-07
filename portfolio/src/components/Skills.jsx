import { useRef } from 'react';
import { useInView } from '../hooks/useTyped';
import { useApiCollection, useApiObject } from '../hooks/useApiData';
import { SKILLS } from '../data/data';
import * as Icon from './Icons';
import TechIcon from './TechIcon';
import './Skills.css';

// Brand colors for individual technologies — gives the pills real visual identity
const TECH_COLORS = {
  Java: '#E76F00',
  Python: '#3776AB',
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  C: '#A8B9CC',
  'C++': '#F34B7D',
  'React.js': '#61DAFB',
  React: '#61DAFB',
  Angular: '#DD0031',
  'Node.js': '#5FA04E',
  HTML5: '#E34F26',
  CSS3: '#1572B6',
  'REST APIs': '#38bdf8',
  MySQL: '#4479A1',
  MongoDB: '#47A248',
  Oracle: '#F80000',
  SQL: '#38bdf8',
  OpenCV: '#5C3EE8',
  'Image Processing': '#a78bfa',
  NumPy: '#4DABCF',
  Pandas: '#150458',
  Git: '#F03C2E',
  GitHub: '#181717',
  'VS Code': '#007ACC',
  NetBeans: '#1B6AC6',
  LeetCode: '#FFA116',
  Postman: '#FF6C37',
  Flutter: '#02569B',
  Dart: '#00B4AB',
  Firebase: '#FFCA28',
  Express: '#000000',
  'Socket.IO': '#010101',
  JWT: '#000000',
};

function TechPill({ name, large = false }) {
  const color = TECH_COLORS[name] || 'var(--accent)';
  return (
    <span
      className={`skill-pill ${large ? 'skill-pill-lg' : ''}`}
      style={{
        color,
        borderColor: `${color}55`,
        background: `${color}10`,
        '--pill-color': color,
      }}
    >
      <span className="skill-pill-icon" style={{ background: color }}>
        <TechIcon name={name} size={large ? 16 : 14} />
      </span>
      {name}
    </span>
  );
}

function SkillRow({ skill, index, reversed = false }) {
  const scrollRef = useRef(null);

  const scrollBy = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir * 360,
      behavior: 'smooth',
    });
  };

  // Single track per category — each tech appears once, plus one
  // duplicate set so the user can scroll without immediately hitting
  // the end of the list. The mask gradient makes the boundary invisible.
  const items = skill.items || [];
  const trackItems = [...items, ...items];

  return (
    <div
      className={`skill-row ${reversed ? 'reversed' : ''}`}
      style={{ '--cat-color': skill.color }}
    >
      <div className="skill-row-header">
        <div
          className="skill-row-icon"
          style={{
            background: `linear-gradient(135deg, ${skill.color}30, ${skill.color}10)`,
            borderColor: `${skill.color}40`,
            color: skill.color,
          }}
          aria-hidden="true"
        >
          {skill.cat
            .split(' ')
            .map((w) => w[0])
            .filter(Boolean)
            .slice(0, 2)
            .join('')}
        </div>
        <div className="skill-row-meta">
          <div className="skill-row-cat" style={{ color: skill.color }}>
            {skill.cat}
          </div>
          <div className="skill-row-count">
            {items.length} {items.length === 1 ? 'tech' : 'techs'}
          </div>
        </div>
        <div className="skill-row-controls">
          <button
            className="skill-arrow"
            onClick={() => scrollBy(reversed ? 1 : -1)}
            aria-label="Scroll left"
          >
            <Icon.ChevronDown
              size={16}
              style={{ transform: 'rotate(90deg)' }}
            />
          </button>
          <button
            className="skill-arrow"
            onClick={() => scrollBy(reversed ? -1 : 1)}
            aria-label="Scroll right"
          >
            <Icon.ChevronDown
              size={16}
              style={{ transform: 'rotate(-90deg)' }}
            />
          </button>
        </div>
      </div>

      <div className="skill-row-track" ref={scrollRef}>
        {trackItems.map((item, i) => (
          <TechPill key={`${item}-${i}`} name={item} large />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const [ref, inView] = useInView();
  const skills = useApiCollection('skills', SKILLS);
  const settings = useApiObject('site-settings', {
    skillsLabel: '03 — Stack',
    skillsTitle: 'Skills & technologies',
    skillsDesc:
      'Languages, frameworks, databases, and tools I have used to ship software end to end. Scroll each row horizontally to explore.',
  });

  const totalTechs = skills.reduce(
    (sum, s) => sum + (s.items?.length || 0),
    0
  );

  return (
    <section id="skills" className="section skills-bg">
      <div className="section-watermark" aria-hidden="true">
        03
      </div>
      <div className={`container fade-up ${inView ? 'visible' : ''}`} ref={ref}>
        <div className="skills-head">
          <div className="section-label">{settings.skillsLabel}</div>
          <h2 className="section-title">{settings.skillsTitle}</h2>
          <p className="section-desc skills-desc">
            {settings.skillsDesc}
          </p>
          <div className="skills-meta">
            <span>
              <strong>{skills.length}</strong> categories
            </span>
            <span className="dot">·</span>
            <span>
              <strong>{totalTechs}</strong> technologies
            </span>
            <span className="dot">·</span>
            <span>
              <strong>4+</strong> years learning
            </span>
          </div>
        </div>

        <div className="skills-rows">
          {skills.map((s, i) => (
            <SkillRow
              key={s.cat}
              skill={s}
              index={i}
              reversed={i % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
