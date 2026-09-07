// -------- Typed words shown in the hero (rotates) --------
export const TYPED_WORDS = [
  'Full Stack Developer',
  'React.js & Angular Dev',
  'Java & Node.js Backend',
  'AI / ML Enthusiast',
  'Problem Solver',
];

export const GITHUB_USERNAME = 'Ramani1111';

// -------- Nav links (in this exact order) --------
export const NAV_LINKS = [
  'Home',
  'About',
  'Experience',
  'Skills',
  'Projects',
  'Certifications',
  'GitHub',
  'Contact',
];

// -------- Top-line stats shown in the hero strip --------
// Each one is real, specific, and verifiable.
export const STATS = [
  { v: '12', k: 'Public repos' },
  { v: '5', k: 'Projects shipped' },
  { v: '~18%', k: 'Faster APIs' },
  { v: '7.8', k: 'B.E. CGPA' },
];

// -------- Marquee tech tiles shown beneath the hero --------
// Each tile is rendered as a small card with the brand color and an inline SVG.
export const MARQUEE_TECHS = [
  { name: 'Java', color: '#E76F00' },
  { name: 'Python', color: '#3776AB' },
  { name: 'JavaScript', color: '#F7DF1E' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'React', color: '#61DAFB' },
  { name: 'Angular', color: '#DD0031' },
  { name: 'Node.js', color: '#5FA04E' },
  { name: 'HTML5', color: '#E34F26' },
  { name: 'CSS3', color: '#1572B6' },
  { name: 'MySQL', color: '#4479A1' },
  { name: 'MongoDB', color: '#47A248' },
  { name: 'Git', color: '#F03C2E' },
  { name: 'GitHub', color: '#181717' },
  { name: 'VS Code', color: '#007ACC' },
  { name: 'NetBeans', color: '#1B6AC6' },
  { name: 'OpenCV', color: '#5C3EE8' },
];

// -------- Skills grouped by category --------
export const SKILLS = [
  {
    cat: 'Programming Languages',
    color: '#38bdf8',
    items: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C', 'C++'],
  },
  {
    cat: 'Web & Frameworks',
    color: '#a78bfa',
    items: ['React.js', 'Angular', 'Node.js', 'HTML5', 'CSS3', 'REST APIs'],
  },
  {
    cat: 'Databases',
    color: '#34d399',
    items: ['MySQL', 'MongoDB', 'Oracle', 'SQL'],
  },
  {
    cat: 'AI / Machine Learning',
    color: '#f472b6',
    items: ['OpenCV', 'Image Processing', 'NumPy', 'Pandas'],
  },
  {
    cat: 'Tools & Platforms',
    color: '#fb923c',
    items: ['Git', 'GitHub', 'VS Code', 'NetBeans', 'LeetCode', 'Postman'],
  },
];

// -------- Professional experience --------
// Highlights are short, outcome-focused lines.
export const EXPERIENCE = [
  {
    title: 'Full Stack Developer',
    company: 'Amshuhu iTech Solution Pvt Ltd',
    period: 'May 2025 – Present',
    location: 'India',
    desc: 'Building enterprise-grade web applications end to end — frontend + backend features for internal and client-facing products at Amshuhu iTech.',
    highlights: [
      'Built new React dashboard modules wired to REST APIs with dynamic charts and role-based access.',
      'Optimised backend endpoints in Node.js — cut average response time by ~18% on critical paths.',
      'Collaborated with QA and product to ship weekly releases on a predictable cadence.',
    ],
    tech: ['React', 'Node.js', 'JavaScript', 'REST APIs'],
    color: '#38bdf8',
  },
  {
    title: 'Project Lead',
    company: 'Mepco Schlenk Engineering College',
    period: 'Jan 2024 – Apr 2025',
    location: 'Sivakasi',
    desc: 'Led multiple campus projects from concept to deployment with a focus on real-world usability and accessible design.',
    highlights: [
      'Delivered a hospital management system covering patients, staff, beds, reports and feedback.',
      'Built a real-time chat app using Angular + WebSockets with presence indicators and a responsive UI.',
      'Mentored junior teammates on code quality, Git workflows, and end-to-end testing.',
    ],
    tech: ['Angular', 'Java', 'MySQL', 'WebSockets'],
    color: '#a78bfa',
  },
];

// -------- Projects --------
// problem / approach / result mirror the Sathish-style narrative.
// `github` is required; `demo` is optional — leave '' to hide the live button.
export const PROJECTS = [
  {
    title: 'Hospital Management System',
    path: 'Ramani1111/Hospital-Management',
    period: 'Aug – Dec 2023',
    status: 'Open source',
    desc: 'A full hospital management system with patient, staff, bed allocation, reporting, and feedback modules.',
    problem: 'Manual hospital records caused delays and poor communication between departments.',
    approach: 'Built a Java + MySQL solution with role-based access, tracking dashboards, and automated reporting workflows.',
    result: 'Reduced administrative friction and improved tracking for admissions and resource allocation.',
    tech: ['Java', 'MySQL', 'NetBeans'],
    color: '#34d399',
    github: 'https://github.com/Ramani1111/Hospital-Management',
    demo: '',
  },
  {
    title: 'Real-Time Chat Application',
    path: 'Ramani1111/CHAT_APPLICATION-',
    period: 'Aug 2025',
    status: 'Live',
    desc: 'A real-time chat platform with user authentication, live messaging, typing indicators, and a fully responsive UI — separated into an Angular frontend and a Node.js backend.',
    problem: 'Team collaboration was difficult without a secure live messaging tool for campus and personal projects.',
    approach: 'Built a Socket.IO-powered chat backend in Node.js + Express with MongoDB and JWT auth, paired with an Angular frontend featuring presence indicators, typing indicators, and a responsive UI.',
    result: 'Shipped an end-to-end chat product across two repos; demonstrates real-time architecture, REST + WebSocket integration, and full-stack ownership. Live at chat-app-eight-murex.vercel.app.',
    tech: ['Angular', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'JWT'],
    color: '#38bdf8',
    github: 'https://github.com/Ramani1111/CHAT_APPLICATION-',
    demo: 'https://chat-app-eight-murex.vercel.app/',
    extraLinks: [
      { label: 'Backend repo', url: 'https://github.com/Ramani1111/CHAT_APP_BACKEND' },
      { label: 'Frontend CSS', url: 'https://github.com/Ramani1111/Chat_App' },
    ],
  },
  {
    title: 'Electronic Journal System',
    path: 'Ramani1111/Electronic-Journal-System',
    period: 'Aug 2025',
    status: 'Open source',
    desc: 'A Java-based journal management system for submitting, reviewing, and publishing articles with a MySQL database backend.',
    problem: 'Academic journals were being managed with email threads and spreadsheets — slow, error-prone, and hard to audit.',
    approach: 'Designed a normalised MySQL schema, built Java services for the submission-to-publication workflow, and a simple reviewer console.',
    result: 'Delivered a working end-to-end submission, review, and publishing flow that demonstrates backend + DB integration.',
    tech: ['Java', 'MySQL'],
    color: '#fb923c',
    github: 'https://github.com/Ramani1111/Electronic-Journal-System',
    demo: '',
  },
  {
    title: 'Job Tracker (Flutter App)',
    path: 'Ramani1111/Job_Tracker_Flutter_App',
    period: 'Oct 2025',
    status: 'Open source',
    desc: 'A cross-platform mobile app to track job applications — status, deadlines, and notes in one place.',
    problem: 'Job-hunting across emails and spreadsheets meant losing track of applications, follow-ups, and deadlines.',
    approach: 'Built a Flutter + Dart mobile app with local persistence, status filters, and a clean Material UI.',
    result: 'Shipped a working cross-platform app covering the full job-application lifecycle — useful as both a tool and a mobile portfolio piece.',
    tech: ['Flutter', 'Dart', 'Firebase'],
    color: '#a78bfa',
    github: 'https://github.com/Ramani1111/Job_Tracker_Flutter_App',
    demo: '',
  },
  {
    title: 'Eye-Tracking Mouse Control',
    path: 'Ramani1111/Eye-Controlled-Mouse',
    period: 'Mar 2025',
    status: 'Prototype',
    desc: 'Assistive technology that converts eye movement into cursor control, click actions, and scroll gestures.',
    problem: 'Existing cursor-control tools were unaffordable and hard to customise for users with limited hand mobility.',
    approach: 'Used Python + OpenCV for gaze detection and translated it into smooth mouse events for hands-free navigation.',
    result: 'Built a working accessibility prototype demonstrating hands-free interaction for assistive use cases.',
    tech: ['Python', 'OpenCV'],
    color: '#f472b6',
    github: 'https://github.com/Ramani1111/Eye-Controlled-Mouse',
    demo: '',
  },
];

// -------- Certifications --------
// Keep image filenames in /public/certs/ — fallback handled by component.
// Each item: { title, date, credentialId?, url? }
export const CERTIFICATIONS = [
  {
    issuer: 'Oracle',
    color: '#F80000',
    image: '/certs/oracle.svg',
    items: [
      {
        title: 'Java Certified Foundations Associate',
        date: 'Issued Oct 2025',
        credentialId: '7827561F6B828804383E29F07713DCF363D9BFEF6A1ECD378530D9AC586EA61E',
        url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=7827561F6B828804383E29F07713DCF363D9BFEF6A1ECD378530D9AC586EA61E',
        skills: ['Java', 'JDK', 'JRE', 'Logic', 'Mathematics', 'Analytical Problem Solving'],
      },
    ],
  },
  {
    issuer: 'NPTEL',
    color: '#38bdf8',
    image: '/certs/nptel.svg',
    items: [
      {
        title: 'Introduction to Industry 4.0 & Industrial Internet of Things',
        date: 'Issued Apr 2025',
      },
      {
        title: 'Google Cloud Computing Foundations',
        date: 'Issued Aug 2024',
      },
      {
        title: 'Data Mining',
        date: 'Issued Jan 2024',
      },
    ],
  },
  {
    issuer: 'SRM IST Vadapalani Campus',
    color: '#a78bfa',
    image: '/certs/srm.svg',
    items: [
      {
        title: 'Role of Rust Language in Blockchain Development',
        date: 'Issued Aug 2024',
        url: 'https://github.com/Ramani1111/Rust.pdf',
      },
    ],
  },
];

// -------- Education --------
export const EDUCATION = [
  {
    degree: 'B.E. Computer Science & Engineering',
    school: 'Mepco Schlenk Engineering College (Autonomous), Sivakasi',
    period: 'Oct 2022 – 2026',
    score: 'CGPA: 7.8',
  },
  {
    degree: 'Higher Secondary (Class XII)',
    school: 'Govt. Higher Secondary School, Sevalpatti, Virudhunagar',
    period: 'Jun 2020 – May 2021',
    score: '83.6%',
  },
  {
    degree: 'SSLC (Class X)',
    school: 'Govt. Higher Secondary School, Sevalpatti, Virudhunagar',
    period: 'Jun 2018 – Mar 2019',
    score: '74.4%',
  },
];

// -------- Contact info --------
export const CONTACT_INFO = {
  email: 'sedhuramani105@gmail.com',
  phone: '+91 8807103294',
  location: 'Sivakasi, Tamil Nadu, India',
  photo: '/profile.jpg',
  linkedin: 'https://linkedin.com/in/ramani-s-191743319',
  github: 'https://github.com/Ramani1111',
  leetcode: 'https://leetcode.com/u/Ramani2004',
};

const STORAGE_KEY = 'ramani_portfolio_data_v1';

export function getCurrentPortfolioData() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load portfolio data:', e);
  }
  return null;
}

export const CURRENT_PORTFOLIO_DATA = getCurrentPortfolioData() || {
  TYPED_WORDS,
  NAV_LINKS,
  STATS,
  MARQUEE_TECHS,
  SKILLS,
  EXPERIENCE,
  PROJECTS,
  CERTIFICATIONS,
  EDUCATION,
  CONTACT_INFO,
  GITHUB_USERNAME,
};

export const DEFAULT_PORTFOLIO_DATA = {
  TYPED_WORDS,
  NAV_LINKS,
  STATS,
  MARQUEE_TECHS,
  SKILLS,
  EXPERIENCE,
  PROJECTS,
  CERTIFICATIONS,
  EDUCATION,
  CONTACT_INFO,
  GITHUB_USERNAME,
};

export function savePortfolioData(data) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save portfolio data:', e);
  }
}

export function resetPortfolioData() {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to reset portfolio data:', e);
  }
}
