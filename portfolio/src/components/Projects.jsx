import { useInView } from '../hooks/useTyped';
import { PROJECTS } from '../data/data';
import * as Icon from './Icons';
import './Projects.css';

export default function Projects() {
  const [ref, inView] = useInView();

  return (
    <section id="projects" className="section">
      <div className={`container fade-up ${inView ? 'visible' : ''}`} ref={ref}>

        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Portfolio</div>
          <h2 className="section-title">Technical Projects</h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Projects built during college — showcasing my skills across different domains.
          </p>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div key={p.title} className="glass project-card">
              <div
                className="project-hover-bg"
                style={{ background: `radial-gradient(circle at top left, ${p.color}0d, transparent 70%)` }}
              />

              <div className="project-header">
                <span className="project-num" style={{ color: p.color }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="project-period">{p.period}</span>
              </div>

              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>

              <div className="project-tech">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="tech-tag"
                    style={{ color: p.color, borderColor: `${p.color}40`, background: `${p.color}10` }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="project-links">
                <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ fontSize: 13, padding: '8px 16px' }}>
                  <Icon.GitHub /> GitHub
                </a>
                <button className="btn btn-ghost" style={{ fontSize: 13, padding: '8px 16px' }}>
                  <Icon.ExternalLink /> Live Demo
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
