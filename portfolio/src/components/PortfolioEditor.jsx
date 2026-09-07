import { useState, useEffect } from 'react';
import { CURRENT_PORTFOLIO_DATA, DEFAULT_PORTFOLIO_DATA, savePortfolioData } from '../data/data';
import * as Icon from './Icons';
import './PortfolioEditor.css';

export default function PortfolioEditor() {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState('projects');
  const [projects, setProjects] = useState(CURRENT_PORTFOLIO_DATA.PROJECTS || []);
  const [editingIndex, setEditingIndex] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'E') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [isOpen]);

  const handleSave = () => {
    const updated = { ...CURRENT_PORTFOLIO_DATA, PROJECTS: projects };
    savePortfolioData(updated);
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('portfolioDataChanged', { detail: updated }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAddProject = () => {
    const newProject = {
      title: 'New Project',
      period: '2025',
      desc: 'Project description',
      problem: 'Problem statement',
      approach: 'Your approach',
      result: 'Result achieved',
      tech: ['Tech1', 'Tech2'],
      color: '#38bdf8',
      github: 'https://github.com/username',
      demo: '',
    };
    setProjects([...projects, newProject]);
  };

  const handleDeleteProject = (i) => {
    setProjects(projects.filter((_, idx) => idx !== i));
  };

  const handleEditChange = (field, value) => {
    if (editingIndex === null) return;
    const updated = [...projects];
    if (field.includes('.')) {
      const [key, subkey] = field.split('.');
      updated[editingIndex] = { ...updated[editingIndex], [key]: { ...updated[editingIndex][key], [subkey]: value } };
    } else {
      updated[editingIndex][field] = value;
    }
    setProjects(updated);
  };

  if (!isOpen) {
    return (
      <button
        className="editor-toggle"
        onClick={() => setIsOpen(true)}
        title="Ctrl+Shift+E to edit portfolio"
      >
        ✏️
      </button>
    );
  }

  return (
    <div className="editor-panel">
      <div className="editor-header">
        <h3>Portfolio Editor</h3>
        <button className="editor-close" onClick={() => setIsOpen(false)}>
          ✕
        </button>
      </div>

      <div className="editor-tabs">
        <button
          className={`tab ${tab === 'projects' ? 'active' : ''}`}
          onClick={() => { setTab('projects'); setEditingIndex(null); }}
        >
          Projects
        </button>
      </div>

      {tab === 'projects' && (
        <div className="editor-content">
          {editingIndex !== null ? (
            <div className="editor-form">
              <button
                className="back-btn"
                onClick={() => setEditingIndex(null)}
              >
                ← Back
              </button>

              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={projects[editingIndex].title}
                  onChange={(e) => handleEditChange('title', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Period</label>
                <input
                  type="text"
                  value={projects[editingIndex].period}
                  onChange={(e) => handleEditChange('period', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={projects[editingIndex].desc}
                  onChange={(e) => handleEditChange('desc', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label>Problem</label>
                <textarea
                  value={projects[editingIndex].problem}
                  onChange={(e) => handleEditChange('problem', e.target.value)}
                  rows={2}
                />
              </div>

              <div className="form-group">
                <label>Approach</label>
                <textarea
                  value={projects[editingIndex].approach}
                  onChange={(e) => handleEditChange('approach', e.target.value)}
                  rows={2}
                />
              </div>

              <div className="form-group">
                <label>Result</label>
                <textarea
                  value={projects[editingIndex].result}
                  onChange={(e) => handleEditChange('result', e.target.value)}
                  rows={2}
                />
              </div>

              <div className="form-group">
                <label>GitHub URL</label>
                <input
                  type="text"
                  value={projects[editingIndex].github}
                  onChange={(e) => handleEditChange('github', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Demo URL (optional)</label>
                <input
                  type="text"
                  value={projects[editingIndex].demo || ''}
                  onChange={(e) => handleEditChange('demo', e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="projects-list">
              {projects.map((p, i) => (
                <div key={i} className="project-item">
                  <div>
                    <div className="project-item-title">{p.title}</div>
                    <div className="project-item-meta">{p.period}</div>
                  </div>
                  <div className="project-item-actions">
                    <button
                      className="btn-edit"
                      onClick={() => setEditingIndex(i)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteProject(i)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              <button className="btn-add" onClick={handleAddProject}>
                + Add Project
              </button>
            </div>
          )}
        </div>
      )}

      <div className="editor-footer">
        <button className="btn-save" onClick={handleSave}>
          💾 Save Changes
        </button>
        {saved && <span className="save-success">✓ Saved!</span>}
      </div>
    </div>
  );
}
