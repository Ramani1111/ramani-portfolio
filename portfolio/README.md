# Ramani S — Portfolio Website

## Overview

A modern, responsive portfolio website built with React.js to showcase professional experience, technical skills, projects, certifications, and contact information.

---

## Installation

### Prerequisites

* Node.js (LTS Version)
* npm

Download Node.js from:
https://nodejs.org

### Install Dependencies

```bash
npm install
```

### Run the Development Server

```bash
npm start
```

The application will be available at:

```text
http://localhost:3000
```

---

## Project Structure

```text
portfolio/
├── public/
│   ├── index.html
│   └── RAMANI_RESUME.pdf
│
├── src/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── styles/
│   ├── App.js
│   └── index.js
│
└── package.json
```

---

## Customization

### Resume

Replace the file below with the latest version of your resume:

```text
public/RAMANI_RESUME.pdf
```

### Personal Information

Update personal details, project information, skills, certifications, and contact links in:

```text
src/data/data.js
```

---

## 🌐 Deploy (Free Hosting)

This portfolio is ready for production deployment and can be published to a custom domain such as `ramanis.dev` once hosted.

### Netlify (Easiest):
1. `npm run build`
2. Upload the generated `build/` folder to Netlify
3. Configure a custom domain in Netlify if you want `ramanis.dev`

### Vercel:
```
npm install -g vercel
vercel
```

### Quick notes
- A working contact form is implemented using a `mailto:` flow.
- Project cards now include a problem → approach → result case study format.
- GitHub activity stats are embedded in the portfolio.
- If you want a custom domain, add it to your hosting provider and point DNS to the deployed site.
