# Flange Viewer

A simple Vite + React + TypeScript app to visualize and customize flanges (Simple, Slip-On, Weld-Neck) with bolt holes and adjustable geometry.

##  Features
- Three flange types: **Simple**, **Slip-On**, **Weld-Neck**
- Adjustable geometry: outer/inner diameter, thickness, bolt count, bolt hole diameter
- Bolt holes cut into the flange geometry
- Slip-on hub and weld-neck parameters derived from inner diameter (adjustable)
- Reset to defaults from the header

---

##  Getting started
### Prerequisites
- Node.js 18+ and npm

### Install
```bash
npm install
```

### Run (development)
```bash
npm start
# open http://localhost:5173
```

### Build (production)
```bash
npm run build
# the production-ready files are in the `dist/` directory
```

---

## 📦 Deploying to GitHub Pages

Use the `gh-pages` npm package:

1. Install as a dev dependency:
   ```bash
   npm install --save-dev gh-pages
   ```
2. Add these scripts to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run:
   ```bash
   npm run deploy
   ```
This will push `dist/` to the `gh-pages` branch and GitHub Pages will serve it.

---

## 🧭 Usage
- Select the flange type from the header
- Use the control panel sliders to change dimensions (numbers shown in mm)
- Click **Reset** in the header to restore defaults

---

## 🤝 Contributing
PRs are welcome. Open issues for bugs or feature requests.

---

## License
MIT
