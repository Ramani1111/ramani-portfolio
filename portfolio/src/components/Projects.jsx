import { useEffect, useState } from 'react';
import { useInView } from '../hooks/useTyped';
import { useApiCollection, useApiObject } from '../hooks/useApiData';
import { PROJECTS as defaultProjects } from '../data/data';
import * as Icon from './Icons';
import './Projects.css';

// Map project title (lowercased) to a small code/UI mockup that represents it.
// Falls back to a browser-window mockup with the project's tech stack.
const PROJECT_MOCKUPS = {
  'hospital management system': {
    type: 'dashboard',
    title: 'Hospital Admin',
    rows: [
      { label: 'Total Patients', value: '1,284', color: '#34d399' },
      { label: 'Beds Available', value: '42', color: '#38bdf8' },
      { label: 'Staff on Duty', value: '76', color: '#a78bfa' },
    ],
  },
  'real-time chat application': {
    type: 'chatapp',
    title: 'ChatsApp',
    name: 'Ananya · online',
    messages: [
      { who: 'them', text: 'Hey, the new socket room is ready 🚀', time: '10:24' },
      { who: 'me', text: 'Awesome — testing it now.', time: '10:25' },
      { who: 'them', text: 'Typing indicator works too', time: '10:25' },
      { who: 'me', text: 'End-to-end latency looks great 👌', time: '10:26' },
    ],
  },
  'electronic journal system': {
    type: 'list',
    title: 'Journal Submissions',
    rows: [
      { label: 'In Review', value: '12', color: '#fb923c' },
      { label: 'Published', value: '48', color: '#34d399' },
      { label: 'Pending', value: '5', color: '#a78bfa' },
    ],
  },
  'job tracker (flutter app)': {
    type: 'flutter',
    title: 'Job Tracker',
    image: '/projects/job-tracker-50.png',
    apps: [
      { name: 'Google', role: 'SDE Intern', status: 'Interview', color: '#4285F4' },
      { name: 'Microsoft', role: 'PM Intern', status: 'Applied', color: '#00A4EF' },
      { name: 'Amazon', role: 'SDE-1', status: 'Offer 🎉', color: '#FF9900' },
    ],
  },
  'eye-tracking mouse control': {
    type: 'terminal',
    title: 'eye-mouse',
    lines: [
      '$ python main.py',
      '→ Loading OpenCV cascade...',
      '→ Calibrating gaze vectors',
      '→ Cursor tracking: ON ✓',
      '→ Click on blink: ON ✓',
    ],
  },
};

function getMockup(project) {
  return PROJECT_MOCKUPS[project.title.toLowerCase()] || {
    type: 'browser',
    title: project.title,
  };
}

// Generate two colors from the project color for the gradient
function palette(color) {
  const base = (color || '#38bdf8').replace('#', '');
  const r = parseInt(base.slice(0, 2), 16);
  const g = parseInt(base.slice(2, 4), 16);
  const b = parseInt(base.slice(4, 6), 16);
  const hslMatch = (rgb) =>
    `hsl(${Math.round((rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114))} 80% 60%)`;
  const accent2 = `hsl(${(Math.atan2(g, r) * 180) / Math.PI + 60} 75% 55%)`;
  return { accent: color || '#38bdf8', accent2 };
}

function ProjectImage({ project }) {
  const { accent, accent2 } = palette(project.color);
  const mockup = getMockup(project);
  const period = project.period || '';
  const status = (project.status || 'Live').toLowerCase();

  return (
    <div
      className="project-image"
      style={{
        background: `linear-gradient(135deg, ${accent} 0%, ${accent2} 100%)`,
      }}
    >
      <div className="project-image-grid" />
      <div className="project-image-glow" />

      {/* Top-left tag + top-right period */}
      <div className="project-image-meta">
        <span className="project-image-tag" style={{ color: accent }}>
          {project.tag || 'Project'}
        </span>
        <span className="project-image-period">{period}</span>
      </div>

      {/* Centered mockup card */}
      <div className="project-image-mockup">
        {/* Browser/window chrome */}
        <div className="mockup-chrome">
          <span className="mockup-dot" style={{ background: '#ff5f57' }} />
          <span className="mockup-dot" style={{ background: '#febc2e' }} />
          <span className="mockup-dot" style={{ background: '#28c840' }} />
          <span className="mockup-title">{mockup.title}</span>
        </div>

        {/* Mockup body */}
        <div className="mockup-body">
          {mockup.type === 'dashboard' && (
            <div className="mockup-stats">
              {mockup.rows.map((r) => (
                <div className="mockup-stat" key={r.label}>
                  <div
                    className="mockup-stat-bar"
                    style={{ background: r.color }}
                  />
                  <div className="mockup-stat-label">{r.label}</div>
                  <div className="mockup-stat-value">{r.value}</div>
                </div>
              ))}
            </div>
          )}
          {mockup.type === 'chat' && (
            <div className="mockup-chat">
              {mockup.messages.map((m, i) => (
                <div key={i} className={`mockup-msg mockup-msg-${m.who}`}>
                  <span className="mockup-msg-dot" />
                  {m.text}
                </div>
              ))}
              <div className="mockup-typing">
                <span /> <span /> <span />
              </div>
            </div>
          )}
          {mockup.type === 'chatapp' && (
            <div className="mockup-chatapp">
              {/* WhatsApp-style header */}
              <div className="mockup-chatapp-header">
                <div className="mockup-chatapp-avatar">
                  <span>A</span>
                </div>
                <div className="mockup-chatapp-name">
                  <div className="mockup-chatapp-title">
                    {mockup.name || 'Ananya'}
                  </div>
                  <div className="mockup-chatapp-status">
                    <span className="mockup-chatapp-online" /> online
                  </div>
                </div>
                <div className="mockup-chatapp-actions">
                  <span>📞</span>
                  <span>📹</span>
                </div>
              </div>
              {/* Messages body */}
              <div className="mockup-chatapp-body">
                {mockup.messages.map((m, i) => (
                  <div
                    key={i}
                    className={`mockup-bubble mockup-bubble-${m.who}`}
                  >
                    <span className="mockup-bubble-text">{m.text}</span>
                    <span className="mockup-bubble-time">
                      {m.time}
                      {m.who === 'me' && (
                        <span className="mockup-bubble-tick">✓✓</span>
                      )}
                    </span>
                  </div>
                ))}
                <div className="mockup-typing">
                  <span /> <span /> <span />
                </div>
              </div>
              {/* Input bar */}
              <div className="mockup-chatapp-input">
                <span className="mockup-chatapp-emoji">😊</span>
                <span className="mockup-chatapp-placeholder">Type a message…</span>
                <span className="mockup-chatapp-mic">🎤</span>
              </div>
            </div>
          )}
          {mockup.type === 'flutter' && (
            <div className="mockup-flutter">
              {mockup.image ? (
                <img
                  src={mockup.image}
                  alt={mockup.title}
                  className="mockup-flutter-image"
                />
              ) : (
                <div className="mockup-flutter-list">
                  {mockup.apps.map((a, i) => (
                    <div key={i} className="mockup-flutter-card">
                      <div
                        className="mockup-flutter-logo"
                        style={{ background: a.color }}
                      >
                        {a.name[0]}
                      </div>
                      <div className="mockup-flutter-body">
                        <div className="mockup-flutter-name">{a.name}</div>
                        <div className="mockup-flutter-role">
                          {a.role}
                        </div>
                      </div>
                      <div
                        className="mockup-flutter-status"
                        style={{
                          color: a.color,
                          borderColor: `${a.color}40`,
                          background: `${a.color}15`,
                        }}
                      >
                        {a.status}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {mockup.type === 'list' && (
            <div className="mockup-list">
              {mockup.rows.map((r) => (
                <div key={r.label} className="mockup-list-row">
                  <span
                    className="mockup-list-dot"
                    style={{ background: r.color }}
                  />
                  <span className="mockup-list-label">{r.label}</span>
                  <span
                    className="mockup-list-value"
                    style={{ color: r.color }}
                  >
                    {r.value}
                  </span>
                </div>
              ))}
            </div>
          )}
          {mockup.type === 'terminal' && (
            <div className="mockup-terminal">
              {mockup.lines.map((l, i) => (
                <div
                  key={i}
                  className={`mockup-term-line ${
                    l.startsWith('→') || l.startsWith('$') ? 'cmd' : 'out'
                  }`}
                >
                  {l}
                </div>
              ))}
              <div className="mockup-cursor">▌</div>
            </div>
          )}
          {mockup.type === 'browser' && (
            <div className="mockup-browser">
              <div className="mockup-browser-url">
                https://{project.title.toLowerCase().replace(/\s+/g, '-')}.app
              </div>
              <div className="mockup-browser-body">
                <div className="mockup-browser-title">{project.title}</div>
                <div className="mockup-browser-sub">
                  Built with {project.tech?.slice(0, 3).join(', ')}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom-left status */}
      <div className="project-status">
        <span className={`status-dot status-${status}`} />
        {project.status || 'Live'}
      </div>
    </div>
  );
}

export default function Projects() {
  const [ref, inView] = useInView();
  const apiProjects = useApiCollection('projects', defaultProjects);
  const settings = useApiObject('site-settings', {
    projectsLabel: '04 — Portfolio',
    projectsTitle: 'Selected projects',
    projectsDesc:
      'Case studies of what I have built — problem, approach, and the result that actually mattered.',
  });
  const [projects, setProjects] = useState(apiProjects);

  useEffect(() => {
    setProjects(apiProjects);
  }, [apiProjects]);

  useEffect(() => {
    const storageKey = 'ramani_portfolio_data_v1';
    const loadProjects = () => {
      try {
        const raw = localStorage.getItem(storageKey);
        if (raw) {
          const data = JSON.parse(raw);
          if (data.PROJECTS) {
            setProjects(data.PROJECTS);
            return;
          }
        }
      } catch (error) {
        console.error('Failed to load projects:', error);
      }
      setProjects(apiProjects);
    };

    loadProjects();
    const handleDataChanged = (event) => {
      if (event.detail?.PROJECTS) {
        setProjects(event.detail.PROJECTS);
      }
    };
    window.addEventListener('storage', loadProjects);
    window.addEventListener('portfolioDataChanged', handleDataChanged);
    return () => {
      window.removeEventListener('storage', loadProjects);
      window.removeEventListener('portfolioDataChanged', handleDataChanged);
    };
  }, [apiProjects]);

  return (
    <section id="projects" className="section projects-section">
      <div className="section-watermark" aria-hidden="true">
        04
      </div>
      <div className={`container fade-up ${inView ? 'visible' : ''}`} ref={ref}>
        <div className="projects-head">
          <div className="section-label">{settings.projectsLabel}</div>
          <h2 className="section-title">{settings.projectsTitle}</h2>
          <p className="section-desc projects-desc">
            {settings.projectsDesc}
          </p>
        </div>

        <div className="projects-stack">
          {projects.map((project, index) => (
            <article
              key={project._id || project.title}
              className={`glass project-row fade-up ${inView ? 'visible' : ''}`}
              style={{
                transitionDelay: `${index * 80}ms`,
                '--accent': project.color,
              }}
            >
              <div className="project-image-col">
                <ProjectImage project={project} />
              </div>

              <div className="project-content">
                <div className="project-meta">
                  <span
                    className="project-num"
                    style={{ color: project.color }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="project-divider" />
                  <span className="project-period">{project.period}</span>
                </div>

                <h3 className="project-title">{project.title}</h3>

                {project.path && (
                  <a
                    className="project-path"
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    title="Open repository on GitHub"
                  >
                    <Icon.GitHub /> github.com/{project.path}
                    <Icon.ExternalLink size={12} />
                  </a>
                )}

                <p className="project-desc">{project.desc}</p>

                <div className="project-case-row">
                  <div className="project-case">
                    <div
                      className="case-label"
                      style={{ color: project.color }}
                    >
                      Problem
                    </div>
                    <p>{project.problem}</p>
                  </div>
                  <div className="project-case">
                    <div
                      className="case-label"
                      style={{ color: project.color }}
                    >
                      Approach
                    </div>
                    <p>{project.approach}</p>
                  </div>
                  <div className="project-case">
                    <div
                      className="case-label"
                      style={{ color: project.color }}
                    >
                      Result
                    </div>
                    <p>{project.result}</p>
                  </div>
                </div>

                <div className="project-tech">
                  {(project.tech || []).map((tech) => (
                    <span
                      key={tech}
                      className="tech-tag"
                      style={{
                        color: project.color,
                        borderColor: `${project.color}40`,
                        background: `${project.color}10`,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-links">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline"
                    style={{
                      fontSize: 13,
                      padding: '10px 18px',
                      borderColor: `${project.color}40`,
                    }}
                  >
                    <Icon.GitHub /> View code
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary"
                      style={{
                        fontSize: 13,
                        padding: '10px 18px',
                        background: `linear-gradient(135deg, ${project.color}, ${project.color}cc)`,
                        boxShadow: `0 6px 24px ${project.color}40`,
                      }}
                    >
                      <Icon.ExternalLink /> Live demo
                    </a>
                  )}
                  {(project.extraLinks || []).map((l) => (
                    <a
                      key={l.url}
                      href={l.url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-ghost"
                      style={{ fontSize: 13, padding: '10px 18px' }}
                    >
                      {l.label} <Icon.ExternalLink size={12} />
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
