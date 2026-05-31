# Ramani S — Portfolio Website

## 🚀 Setup & Run (3 steps only)

### Step 1 — Install Node.js
Download from: https://nodejs.org  
(Choose LTS version)

### Step 2 — Install dependencies
Open terminal inside this folder and run:
```
npm install
```

### Step 3 — Start the website
```
npm start
```
Browser-ல் automatically http://localhost:3000

---

## 📁 Folder Structure

```
portfolio/
├── public/
│   ├── index.html
│   └── RAMANI_RESUME.pdf     ← 
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx + Navbar.css
│   │   ├── Hero.jsx + Hero.css
│   │   ├── About.jsx + About.css
│   │   ├── Skills.jsx + Skills.css
│   │   ├── Projects.jsx + Projects.css
│   │   ├── Certifications.jsx + Certifications.css
│   │   ├── Contact.jsx + Contact.css
│   │   ├── Footer.jsx + Footer.css
│   │   └── Icons.jsx
│   │
│   ├── data/
│   │   └── data.js       
│   │
│   ├── hooks/
│   │   └── useTyped.js
│   │
│   ├── styles/
│   │   └── global.css
│   │
│   ├── App.js
│   └── index.js
│
└── package.json
```

---

## ✏️ Customization

### Resume Download button 
`public/` folder-ல் உங்கள் resume file-ஐ `RAMANI_RESUME.pdf` 
### Details
`src/data/data.js` 

---

## 🌐 Deploy (Free Hosting)

### Netlify (Easiest):
1. `npm run build` — 
2. netlify.com போங்க
3. `build/`
4. Done! Live URL got

### Vercel:
```
npm install -g vercel
vercel
```
