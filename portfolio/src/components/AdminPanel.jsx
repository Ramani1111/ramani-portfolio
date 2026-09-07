import { useEffect, useMemo, useState } from 'react';
import './AdminPanel.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const emptyForms = {
  projects: {
    title: '',
    period: '',
    desc: '',
    problem: '',
    approach: '',
    result: '',
    tech: '',
    color: '#38bdf8',
    github: '',
    demo: '',
  },
  skills: { cat: '', color: '#38bdf8', items: '' },
  experience: { title: '', company: '', period: '', desc: '', highlights: '' },
  certifications: { issuer: '', color: '#38bdf8', items: '' },
  education: { degree: '', school: '', period: '', score: '' },
  resume: { filename: '', url: '' },
};

const tabs = [
  { id: 'siteSettings', label: 'Site Settings', endpoint: 'site-settings' },
  { id: 'projects', label: 'Projects', endpoint: 'projects', title: 'title', meta: 'period' },
  { id: 'skills', label: 'Skills', endpoint: 'skills', title: 'cat', meta: 'items' },
  { id: 'experience', label: 'Experience', endpoint: 'experience', title: 'title', meta: 'company' },
  { id: 'certifications', label: 'Certifications', endpoint: 'certifications', title: 'issuer', meta: 'items' },
  { id: 'education', label: 'Education', endpoint: 'education', title: 'degree', meta: 'school' },
  { id: 'resume', label: 'Resume', endpoint: 'resume', title: 'filename', meta: 'url' },
  { id: 'about', label: 'About / Contact', endpoint: 'about' },
  { id: 'settings', label: 'Settings' },
];

const fieldLabels = {
  title: 'Title',
  period: 'Period',
  desc: 'Description',
  problem: 'Problem',
  approach: 'Approach',
  result: 'Result',
  tech: 'Technologies',
  color: 'Color',
  github: 'GitHub URL',
  demo: 'Demo URL',
  logo: 'Logo',
  navLinks: 'Navigation Links',
  heroTag: 'Hero Tagline',
  heroName: 'Hero Name',
  typedWords: 'Typed Words',
  heroSubtitle: 'Hero Subtitle',
  cgpa: 'CGPA',
  githubUsername: 'GitHub Username',
  aboutLabel: 'About Label',
  educationLabel: 'Education Label',
  projectsLabel: 'Projects Label',
  projectsTitle: 'Projects Title',
  projectsDesc: 'Projects Description',
  skillsLabel: 'Skills Label',
  skillsTitle: 'Skills Title',
  skillsDesc: 'Skills Description',
  experienceLabel: 'Experience Label',
  experienceTitle: 'Experience Title',
  experienceDesc: 'Experience Description',
  certificationsLabel: 'Certifications Label',
  certificationsTitle: 'Certifications Title',
  certificationsDesc: 'Certifications Description',
  githubLabel: 'GitHub Label',
  githubTitle: 'GitHub Title',
  githubDesc: 'GitHub Description',
  contactLabel: 'Contact Label',
  contactTitle: 'Contact Title',
  contactDesc: 'Contact Description',
  contactFormTitle: 'Contact Form Title',
  resumeLabel: 'Resume Label',
  resumeDesc: 'Resume Description',
  footerTagline: 'Footer Tagline',
  footerCopy: 'Footer Copy',
  cat: 'Category',
  items: 'Items',
  company: 'Company',
  highlights: 'Highlights',
  issuer: 'Issuer',
  degree: 'Degree',
  school: 'School',
  score: 'Score',
  filename: 'File name',
  url: 'URL',
};

const multilineFields = new Set([
  'desc',
  'problem',
  'approach',
  'result',
  'highlights',
  'items',
  'heroSubtitle',
  'projectsDesc',
  'skillsDesc',
  'experienceDesc',
  'certificationsDesc',
  'githubDesc',
  'contactDesc',
  'resumeDesc',
  'footerCopy',
]);
const listFields = new Set(['tech', 'items', 'highlights', 'navLinks', 'typedWords']);

function toCsv(value) {
  return Array.isArray(value) ? value.join(', ') : value || '';
}

function normalizeForm(tabId, form) {
  const payload = { ...form };
  Object.keys(payload).forEach((key) => {
    if (listFields.has(key)) {
      payload[key] = String(payload[key] || '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    }
  });
  return payload;
}

function itemToForm(tabId, item) {
  const form = { ...emptyForms[tabId] };
  Object.keys(form).forEach((key) => {
    form[key] = listFields.has(key) ? toCsv(item[key]) : item[key] || '';
  });
  return form;
}

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('admin_token'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('projects');
  const [items, setItems] = useState({});
  const [forms, setForms] = useState(emptyForms);
  const [editing, setEditing] = useState({});
  const [showForm, setShowForm] = useState({});
  const [aboutForm, setAboutForm] = useState({
    heading: '',
    accent: '',
    paragraphs: '',
    avatarInitials: '',
    avatarCompany: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    leetcode: '',
  });
  const [siteSettingsForm, setSiteSettingsForm] = useState({
    logo: '',
    navLinks: '',
    heroTag: '',
    heroName: '',
    typedWords: '',
    heroSubtitle: '',
    cgpa: '',
    githubUsername: '',
    aboutLabel: '',
    educationLabel: '',
    projectsLabel: '',
    projectsTitle: '',
    projectsDesc: '',
    skillsLabel: '',
    skillsTitle: '',
    skillsDesc: '',
    experienceLabel: '',
    experienceTitle: '',
    experienceDesc: '',
    certificationsLabel: '',
    certificationsTitle: '',
    certificationsDesc: '',
    githubLabel: '',
    githubTitle: '',
    githubDesc: '',
    contactLabel: '',
    contactTitle: '',
    contactDesc: '',
    contactFormTitle: '',
    resumeLabel: '',
    resumeDesc: '',
    footerTagline: '',
    footerCopy: '',
  });
  const [settingsForm, setSettingsForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    newEmail: '',
  });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('admin_token');
  const activeConfig = useMemo(() => tabs.find((tab) => tab.id === activeTab), [activeTab]);

  useEffect(() => {
    if (!isLoggedIn || activeTab === 'settings') return;
    if (activeTab === 'siteSettings') {
      loadSiteSettings();
      return;
    }
    if (activeTab === 'about') {
      loadAbout();
      return;
    }
    loadItems(activeTab);
  }, [activeTab, isLoggedIn]);

  async function api(path, options = {}) {
    const headers = { ...(options.headers || {}) };
    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const response = await fetch(`${API_URL}/${path}`, { ...options, headers });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }
    return data;
  }

  async function handleLogin(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const data = await api('auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem('admin_token', data.token);
      setIsLoggedIn(true);
      setEmail('');
      setPassword('');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadItems(tabId) {
    const config = tabs.find((tab) => tab.id === tabId);
    if (!config?.endpoint) return;
    try {
      const data = await api(config.endpoint);
      setItems((prev) => ({ ...prev, [tabId]: Array.isArray(data) ? data : [] }));
    } catch (error) {
      console.error(`Failed to load ${tabId}:`, error);
    }
  }

  async function loadAbout() {
    try {
      const data = await api('about');
      setAboutForm({
        heading: data.heading || '',
        accent: data.accent || '',
        paragraphs: toCsv(data.paragraphs),
        avatarInitials: data.avatarInitials || '',
        avatarCompany: data.avatarCompany || '',
        bio: data.bio || '',
        email: data.email || '',
        phone: data.phone || '',
        location: data.location || '',
        linkedin: data.linkedin || '',
        github: data.github || '',
        leetcode: data.leetcode || '',
      });
    } catch (error) {
      console.error('Failed to load about details:', error);
    }
  }

  async function loadSiteSettings() {
    try {
      const data = await api('site-settings');
      setSiteSettingsForm({
        logo: data.logo || '',
        navLinks: toCsv(data.navLinks),
        heroTag: data.heroTag || '',
        heroName: data.heroName || '',
        typedWords: toCsv(data.typedWords),
        heroSubtitle: data.heroSubtitle || '',
        cgpa: data.cgpa || '',
        githubUsername: data.githubUsername || '',
        aboutLabel: data.aboutLabel || '',
        educationLabel: data.educationLabel || '',
        projectsLabel: data.projectsLabel || '',
        projectsTitle: data.projectsTitle || '',
        projectsDesc: data.projectsDesc || '',
        skillsLabel: data.skillsLabel || '',
        skillsTitle: data.skillsTitle || '',
        skillsDesc: data.skillsDesc || '',
        experienceLabel: data.experienceLabel || '',
        experienceTitle: data.experienceTitle || '',
        experienceDesc: data.experienceDesc || '',
        certificationsLabel: data.certificationsLabel || '',
        certificationsTitle: data.certificationsTitle || '',
        certificationsDesc: data.certificationsDesc || '',
        githubLabel: data.githubLabel || '',
        githubTitle: data.githubTitle || '',
        githubDesc: data.githubDesc || '',
        contactLabel: data.contactLabel || '',
        contactTitle: data.contactTitle || '',
        contactDesc: data.contactDesc || '',
        contactFormTitle: data.contactFormTitle || '',
        resumeLabel: data.resumeLabel || '',
        resumeDesc: data.resumeDesc || '',
        footerTagline: data.footerTagline || '',
        footerCopy: data.footerCopy || '',
      });
    } catch (error) {
      console.error('Failed to load site settings:', error);
    }
  }

  function startCreate(tabId) {
    setEditing((prev) => ({ ...prev, [tabId]: null }));
    setForms((prev) => ({ ...prev, [tabId]: emptyForms[tabId] }));
    setShowForm((prev) => ({ ...prev, [tabId]: !prev[tabId] }));
  }

  function startEdit(tabId, item) {
    setEditing((prev) => ({ ...prev, [tabId]: item }));
    setForms((prev) => ({ ...prev, [tabId]: itemToForm(tabId, item) }));
    setShowForm((prev) => ({ ...prev, [tabId]: true }));
  }

  async function saveItem(event, tabId) {
    event.preventDefault();
    const config = tabs.find((tab) => tab.id === tabId);
    const selected = editing[tabId];
    setLoading(true);
    try {
      await api(selected ? `${config.endpoint}/${selected._id}` : config.endpoint, {
        method: selected ? 'PUT' : 'POST',
        body: JSON.stringify(normalizeForm(tabId, forms[tabId])),
      });
      setForms((prev) => ({ ...prev, [tabId]: emptyForms[tabId] }));
      setEditing((prev) => ({ ...prev, [tabId]: null }));
      setShowForm((prev) => ({ ...prev, [tabId]: false }));
      await loadItems(tabId);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteItem(tabId, id) {
    const config = tabs.find((tab) => tab.id === tabId);
    if (!window.confirm(`Delete this ${config.label.toLowerCase()} item?`)) return;
    try {
      await api(`${config.endpoint}/${id}`, { method: 'DELETE' });
      await loadItems(tabId);
    } catch (error) {
      alert(error.message);
    }
  }

  async function saveAbout(event) {
    event.preventDefault();
    setLoading(true);
    try {
      await api('about', {
        method: 'PUT',
        body: JSON.stringify({
          ...aboutForm,
          paragraphs: String(aboutForm.paragraphs || '')
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean),
        }),
      });
      alert('About/contact details saved');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function saveSiteSettings(event) {
    event.preventDefault();
    setLoading(true);
    try {
      await api('site-settings', {
        method: 'PUT',
        body: JSON.stringify(normalizeForm('siteSettings', siteSettingsForm)),
      });
      alert('Site settings saved');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleChangePassword(event) {
    event.preventDefault();
    if (settingsForm.newPassword !== settingsForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await api('auth/change-password', {
        method: 'POST',
        body: JSON.stringify({
          currentPassword: settingsForm.currentPassword,
          newPassword: settingsForm.newPassword,
        }),
      });
      alert('Password changed successfully');
      setSettingsForm({ currentPassword: '', newPassword: '', confirmPassword: '', newEmail: '' });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleChangeEmail(event) {
    event.preventDefault();
    setLoading(true);
    try {
      await api('auth/change-email', {
        method: 'POST',
        body: JSON.stringify({
          newEmail: settingsForm.newEmail,
          password: settingsForm.currentPassword,
        }),
      });
      alert('Email changed successfully');
      setSettingsForm({ currentPassword: '', newPassword: '', confirmPassword: '', newEmail: '' });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem('admin_token');
    setIsLoggedIn(false);
  }

  function goBack() {
    window.history.pushState({}, '', '/');
    window.location.reload();
  }

  if (!isLoggedIn) {
    return (
      <div className="admin-login-container">
        <button className="back-btn" onClick={goBack}>Back to Portfolio</button>
        <div className="login-card">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="admin-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="admin-content">
        {activeTab !== 'siteSettings' && activeTab !== 'about' && activeTab !== 'settings' && activeConfig && (
          <CrudSection
            config={activeConfig}
            tabId={activeTab}
            form={forms[activeTab]}
            items={items[activeTab] || []}
            editing={editing[activeTab]}
            showForm={showForm[activeTab]}
            loading={loading}
            onStartCreate={startCreate}
            onStartEdit={startEdit}
            onSave={saveItem}
            onDelete={deleteItem}
            onFormChange={(nextForm) => setForms((prev) => ({ ...prev, [activeTab]: nextForm }))}
          />
        )}

        {activeTab === 'siteSettings' && (
          <div className="section">
            <h3>Manage Site Settings</h3>
            <form className="form" onSubmit={saveSiteSettings}>
              {Object.keys(siteSettingsForm).map((field) => (
                <div className="form-group" key={field}>
                  <label>{fieldLabels[field] || field}</label>
                  {multilineFields.has(field) ? (
                    <textarea
                      rows="3"
                      value={siteSettingsForm[field]}
                      placeholder={listFields.has(field) ? 'Comma separated values' : ''}
                      onChange={(event) => setSiteSettingsForm({ ...siteSettingsForm, [field]: event.target.value })}
                    />
                  ) : (
                    <input
                      type="text"
                      value={siteSettingsForm[field]}
                      placeholder={listFields.has(field) ? 'Comma separated values' : ''}
                      onChange={(event) => setSiteSettingsForm({ ...siteSettingsForm, [field]: event.target.value })}
                    />
                  )}
                </div>
              ))}
              <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Saving...' : 'Save Site Settings'}</button>
            </form>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="section">
            <h3>Manage About / Contact</h3>
            <form className="form" onSubmit={saveAbout}>
              {Object.keys(aboutForm).map((field) => (
                <div className="form-group" key={field}>
                  <label>{fieldLabels[field] || field}</label>
                  {field === 'paragraphs' || field === 'bio' ? (
                    <textarea
                      rows="3"
                      value={aboutForm[field]}
                      onChange={(event) => setAboutForm({ ...aboutForm, [field]: event.target.value })}
                    />
                  ) : (
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      value={aboutForm[field]}
                      onChange={(event) => setAboutForm({ ...aboutForm, [field]: event.target.value })}
                    />
                  )}
                </div>
              ))}
              <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Saving...' : 'Save About / Contact'}</button>
            </form>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="section">
            <h3>Account Settings</h3>
            <div className="settings-group">
              <h4>Change Password</h4>
              <form className="form" onSubmit={handleChangePassword}>
                <div className="form-group"><label>Current Password</label><input type="password" value={settingsForm.currentPassword} onChange={(event) => setSettingsForm({ ...settingsForm, currentPassword: event.target.value })} required /></div>
                <div className="form-group"><label>New Password</label><input type="password" value={settingsForm.newPassword} onChange={(event) => setSettingsForm({ ...settingsForm, newPassword: event.target.value })} required /></div>
                <div className="form-group"><label>Confirm Password</label><input type="password" value={settingsForm.confirmPassword} onChange={(event) => setSettingsForm({ ...settingsForm, confirmPassword: event.target.value })} required /></div>
                <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Updating...' : 'Change Password'}</button>
              </form>
            </div>

            <div className="settings-group">
              <h4>Change Email</h4>
              <form className="form" onSubmit={handleChangeEmail}>
                <div className="form-group"><label>Password</label><input type="password" value={settingsForm.currentPassword} onChange={(event) => setSettingsForm({ ...settingsForm, currentPassword: event.target.value })} required /></div>
                <div className="form-group"><label>New Email</label><input type="email" value={settingsForm.newEmail} onChange={(event) => setSettingsForm({ ...settingsForm, newEmail: event.target.value })} required /></div>
                <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Updating...' : 'Change Email'}</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CrudSection({
  config,
  tabId,
  form,
  items,
  editing,
  showForm,
  loading,
  onStartCreate,
  onStartEdit,
  onSave,
  onDelete,
  onFormChange,
}) {
  return (
    <div className="section">
      <div className="section-header">
        <h3>Manage {config.label}</h3>
        <button className="btn-add" onClick={() => onStartCreate(tabId)}>
          {showForm ? 'Cancel' : `Add ${config.label}`}
        </button>
      </div>

      {showForm && (
        <form className="form" onSubmit={(event) => onSave(event, tabId)}>
          {Object.keys(form).map((field) => (
            <div className="form-group" key={field}>
              <label>{fieldLabels[field] || field}</label>
              {multilineFields.has(field) ? (
                <textarea
                  rows="3"
                  value={form[field]}
                  placeholder={listFields.has(field) ? 'Comma separated values' : ''}
                  onChange={(event) => onFormChange({ ...form, [field]: event.target.value })}
                />
              ) : (
                <input
                  type={field === 'color' ? 'color' : 'text'}
                  value={form[field]}
                  onChange={(event) => onFormChange({ ...form, [field]: event.target.value })}
                  required={['title', 'cat', 'issuer', 'degree'].includes(field)}
                />
              )}
            </div>
          ))}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Saving...' : editing ? `Update ${config.label}` : `Create ${config.label}`}
          </button>
        </form>
      )}

      <div className="items-list">
        {items.map((item) => (
          <div key={item._id} className="item-card">
            <div className="item-info">
              <h4>{item[config.title] || 'Untitled'}</h4>
              <p className="meta">{toCsv(item[config.meta])}</p>
              <p className="description">{item.desc || item.url || ''}</p>
            </div>
            <div className="item-actions">
              <button className="btn-edit" onClick={() => onStartEdit(tabId, item)}>Edit</button>
              <button className="btn-delete" onClick={() => onDelete(tabId, item._id)}>Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="empty">No items yet</p>}
      </div>
    </div>
  );
}
