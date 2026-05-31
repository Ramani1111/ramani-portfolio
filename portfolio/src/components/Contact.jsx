import { useState } from 'react';
import { useInView } from '../hooks/useTyped';
import { CONTACT_INFO } from '../data/data';
import * as Icon from './Icons';
import './Contact.css';

export default function Contact() {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const links = [
    { label: 'Email', value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}`, icon: <Icon.Mail />, color: '#38bdf8' },
    { label: 'LinkedIn', value: 'ramani-s-191743319', href: CONTACT_INFO.linkedin, icon: <Icon.LinkedIn />, color: '#0a66c2' },
    { label: 'GitHub', value: 'Ramani1111', href: CONTACT_INFO.github, icon: <Icon.GitHub />, color: '#a78bfa' },
    { label: 'LeetCode', value: 'Ramani2004', href: CONTACT_INFO.leetcode, icon: <Icon.Code />, color: '#fb923c' },
  ];

  return (
    <section id="contact" className="section">
      <div className={`container fade-up ${inView ? 'visible' : ''}`} ref={ref}>

        <div style={{ marginBottom: 52 }}>
          <div className="section-label">Get In Touch</div>
          <h2 className="section-title">Let's Connect</h2>
          <p className="section-desc">
            Open to opportunities, collaborations, and interesting conversations!
          </p>
        </div>

        <div className="contact-grid">
          {/* Left */}
          <div>
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="glass contact-link"
                style={{ '--link-color': l.color }}
              >
                <div className="contact-icon" style={{ background: `${l.color}18`, color: l.color, border: `1px solid ${l.color}30` }}>
                  {l.icon}
                </div>
                <div>
                  <div className="contact-label">{l.label}</div>
                  <div className="contact-value">{l.value}</div>
                </div>
              </a>
            ))}

            <div className="glass resume-card">
              <div className="resume-label">Resume</div>
              <p className="resume-desc">Download my resume to see the full picture.</p>
              <a href="/RAMANI_RESUME.pdf" download className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}>
                <Icon.Download /> Download Resume
              </a>
            </div>
          </div>

          {/* Right — Form */}
          <div className="glass contact-form-card">
            <h3 className="form-heading">Send a Message</h3>
            <div className="contact-form">
              <div className="form-group">
                <label className="form-label">NAME</label>
                <input
                  className="form-input"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">EMAIL</label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">MESSAGE</label>
                <textarea
                  className="form-input"
                  rows={5}
                  placeholder="Let's work together..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
              <button className="btn btn-primary" style={{ justifyContent: 'center', marginTop: 4 }}>
                <Icon.Send /> Send Message
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
