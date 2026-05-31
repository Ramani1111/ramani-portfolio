import { useInView } from '../hooks/useTyped';
import { SKILLS } from '../data/data';
import './Skills.css';

export default function Skills() {
  const [ref, inView] = useInView();

  return (
    <section id="skills" className="section skills-bg">
      <div className={`container fade-up ${inView ? 'visible' : ''}`} ref={ref}>

        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Tech Stack</div>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Languages, frameworks, and tools I use to build software.
          </p>
        </div>

        <div className="skills-grid">
          {SKILLS.map((s) => (
            <div key={s.cat} className="glass skill-card">
              <div className="skill-accent" style={{ background: `linear-gradient(90deg, ${s.color}, transparent)` }} />
              <div className="skill-cat" style={{ color: s.color }}>{s.cat}</div>
              <div className="skill-items">
                {s.items.map((item) => (
                  <span
                    key={item}
                    className="skill-pill"
                    style={{ borderColor: `${s.color}35`, color: s.color, background: `${s.color}0d` }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
