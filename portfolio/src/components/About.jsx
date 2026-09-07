import { useInView } from '../hooks/useTyped';
import { useApiCollection, useApiObject } from '../hooks/useApiData';
import { EDUCATION, CONTACT_INFO } from '../data/data';
import './About.css';

const defaultAbout = {
  label: '01 — About',
  heading: 'Crafting software',
  accent: 'with purpose.',
  paragraphs: [
    "I'm a Computer Science graduate from Mepco Schlenk Engineering College, Sivakasi. I enjoy building real-world products — from accessible UIs to backend services that quietly do the right thing.",
    "I'm currently placed at Amshuhu iTech Solution Pvt Ltd through campus recruitment, where I ship features for enterprise web applications alongside experienced engineers.",
    "I like React, Angular, Java and Python — and I enjoy the harder problems: designing a schema that survives year two, optimising the hot path, or explaining a system on a whiteboard.",
  ],
  quickFacts: [
    { k: 'Focus', v: 'Full Stack · Java · React' },
    { k: 'Currently', v: 'Full Stack Developer @ Amshuhu iTech' },
    { k: 'Graduating', v: 'B.E. CSE, 2026' },
    { k: 'Location', v: 'Sivakasi, Tamil Nadu' },
  ],
};

export default function About() {
  const [ref, inView] = useInView();
  const about = useApiObject('about', defaultAbout);
  const education = useApiCollection('education', EDUCATION);
  const contactInfo = useApiObject('about', CONTACT_INFO);
  const settings = useApiObject('site-settings', {
    aboutLabel: 'About Me',
    educationLabel: 'Education',
  });

  return (
    <section id="about" className="section about-section">
      <div className="section-watermark" aria-hidden="true">
        01
      </div>
      <div className={`container fade-up ${inView ? 'visible' : ''}`} ref={ref}>
        <div className="about-grid">
          <div className="about-left">
            <div className="section-label">{about.label || '01 — About'}</div>
            <h2 className="section-title">
              {about.heading || defaultAbout.heading}
              <br />
              <span style={{ color: 'var(--accent)' }}>
                {about.accent || defaultAbout.accent}
              </span>
            </h2>

            {(about.paragraphs || defaultAbout.paragraphs).map((p) => (
              <p className="about-para" key={p}>
                {p}
              </p>
            ))}

            <div className="about-facts">
              {(about.quickFacts || defaultAbout.quickFacts).map((f) => (
                <div className="about-fact" key={f.k}>
                  <div className="about-fact-k">{f.k}</div>
                  <div className="about-fact-v">{f.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-right">
            <div className="edu-section">
              <div className="edu-label">
                {settings.educationLabel || 'Education'}
              </div>
              <div className="edu-list">
                {education.map((item, i) => (
                  <div
                    key={item._id || item.degree}
                    className="edu-item animate"
                    style={{ animationDelay: `${i * 120}ms` }}
                  >
                    <div className="edu-dot" />
                    <div className="edu-body">
                      <div className="edu-degree">{item.degree}</div>
                      <div className="edu-school">{item.school}</div>
                      <div className="edu-meta">
                        <span>{item.period}</span>
                        <span className="edu-score">{item.score}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-card">
              <div className="about-card-label">Currently at</div>
              <div className="about-card-value">
                Amshuhu iTech Solution Pvt Ltd
              </div>
              <div className="about-card-meta">
                Full Stack Developer · {contactInfo.location}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
