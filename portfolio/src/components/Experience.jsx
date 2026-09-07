import { useInView } from '../hooks/useTyped';
import { useApiCollection, useApiObject } from '../hooks/useApiData';
import { EXPERIENCE } from '../data/data';
import * as Icon from './Icons';
import './Experience.css';

export default function Experience() {
  const [ref, inView] = useInView();
  const experience = useApiCollection('experience', EXPERIENCE);
  const settings = useApiObject('site-settings', {
    experienceLabel: '02 — Professional',
    experienceTitle: 'Where I have worked',
    experienceDesc:
      'Recent roles and the impact I delivered using modern web and backend technologies.',
  });

  return (
    <section id="experience" className="section experience-section">
      <div className="section-watermark" aria-hidden="true">
        02
      </div>
      <div className={`container fade-up ${inView ? 'visible' : ''}`} ref={ref}>
        <div className="exp-head">
          <div className="section-label">{settings.experienceLabel}</div>
          <h2 className="section-title">{settings.experienceTitle}</h2>
          <p className="section-desc">{settings.experienceDesc}</p>
        </div>

        <div className="experience-grid">
          {experience.map((item) => (
            <div
              key={`${item.company}-${item.period}`}
              className="glass experience-card"
              style={{ '--accent': item.color || 'var(--accent)' }}
            >
              <div
                className="experience-accent"
                style={{
                  background: `linear-gradient(90deg, ${item.color || 'var(--accent)'}, transparent)`,
                }}
              />

              <div className="experience-header">
                <div>
                  <div className="experience-title">{item.title}</div>
                  <div className="experience-company">
                    {item.company}
                    {item.location ? (
                      <span className="experience-loc"> · {item.location}</span>
                    ) : null}
                  </div>
                </div>
                <div className="experience-period">{item.period}</div>
              </div>

              <p className="experience-desc">{item.desc}</p>

              <ul className="experience-list">
                {(item.highlights || []).map((h) => (
                  <li key={h}>
                    <span
                      className="exp-bullet"
                      style={{ background: item.color || 'var(--accent)' }}
                    />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="experience-tech">
                {(item.tech || []).map((t) => (
                  <span
                    key={t}
                    className="tech-tag"
                    style={{
                      color: item.color || 'var(--accent)',
                      borderColor: `${item.color || 'var(--accent)'}40`,
                      background: `${item.color || 'var(--accent)'}10`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="experience-foot">
                <span className="exp-foot-pip">
                  <Icon.Briefcase size={14} /> {item.period.split('–')[0].trim()} → Present
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
