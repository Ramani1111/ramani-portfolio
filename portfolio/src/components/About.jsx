import { useInView } from '../hooks/useTyped';
import { EDUCATION } from '../data/data';
import './About.css';

export default function About() {
  const [ref, inView] = useInView();

  return (
    <section id="about" className="section">
      <div className={`container fade-up ${inView ? 'visible' : ''}`} ref={ref}>

        <div className="about-grid">
          {/* Left — Avatar */}
          <div className="avatar-wrap">
            <div className="avatar-ring" />
            <div className="avatar-box">
              <div className="avatar-glow" />
              <span className="avatar-initials">RS</span>
              <div className="avatar-company">@ Amshuhu iTech</div>
            </div>
          </div>

          {/* Right — Info */}
          <div>
            <div className="section-label">About Me</div>
            <h2 className="section-title">
              Crafting Software<br />
              <span style={{ color: 'var(--accent)' }}>with Purpose</span>
            </h2>

            <p className="about-para">
              I'm a Computer Science graduate from{' '}
              <strong>Mepco Schlenk Engineering College, Sivakasi</strong> — passionate about
              building real-world solutions using frontend, backend, and AI/ML skills.
            </p>
            <p className="about-para">
              I'm currently placed at{' '}
              <strong style={{ color: 'var(--accent)' }}>Amshuhu iTech Solution Pvt Ltd</strong>{' '}
              through campus recruitment, where I apply my skills in software development
              and enterprise applications.
            </p>
            <p className="about-para">
              I'm deeply interested in React, Angular, Python, and machine learning —
              and I thrive on learning new technologies and solving challenging problems.
            </p>

            {/* Education Timeline */}
            <div className="edu-section">
              <div className="edu-label">Education</div>
              {EDUCATION.map((e) => (
                <div key={e.degree} className="edu-item">
                  <div className="edu-dot" />
                  <div>
                    <div className="edu-degree">{e.degree}</div>
                    <div className="edu-school">{e.school}</div>
                    <div className="edu-meta">
                      <span>{e.period}</span>
                      <span className="edu-score">{e.score}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
