# Aarzoo — Full Stack React Portfolio

A modern, full-stack personal portfolio built with **React + Vite** (frontend) and **Express.js** (backend API). Features a Sapphire & Electric Blue theme, interactive Spotlight Cursor, particle constellation background, project upvotes, live guestbook, and contact form — all powered by a REST API.

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Project (Frontend + Backend together)

```bash
npm run dev
```

This starts **both** servers concurrently:
- **Frontend (React + Vite)** → `http://localhost:5173` (or `5174` if port is busy)
- **Backend (Express API)** → `http://localhost:5000`

---

## 🛠️ Individual Commands

| Command | Description |
|---|---|
| `npm run dev` | Start **both** frontend & backend |
| `npm run client` | Start **only** the Vite/React frontend |
| `npm run server` | Start **only** the Express backend |
| `npm run build` | Build the React app for production |
| `npm run preview` | Preview the production build locally |

---

## 📁 Project Structure

```
My_Portfolio/
├── src/                          # React frontend
│   ├── components/
│   │   ├── SpotlightCursor.jsx   # Interactive spotlight cursor
│   │   ├── ConstellationCanvas.jsx  # Particle background
│   │   ├── Navbar.jsx            # Navigation + theme toggle
│   │   ├── HeroSection.jsx       # Hero with typewriter & stats
│   │   ├── AboutSection.jsx      # About bio & hobby cards
│   │   ├── SkillsSection.jsx     # Skill bars + filter tags
│   │   ├── ProjectsSection.jsx   # Projects + upvote system
│   │   ├── ExperienceSection.jsx # Experience timeline
│   │   ├── ContactSection.jsx    # Contact form + guestbook
│   │   └── ProjectModal.jsx      # Project detail popup
│   ├── App.jsx                   # Main app layout
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Sapphire Blue design tokens
│
├── server/                       # Express backend
│   ├── index.js                  # REST API server
│   └── data/
│       ├── projects.json         # Project data + likes
│       └── messages.json         # Guestbook messages
│
├── requirements/
│   └── pic.jpeg                  # Profile photo
│
├── index.html                    # HTML entry point (Vite)
├── vite.config.js                # Vite config + API proxy
└── package.json                  # Dependencies & scripts
```

---

## 🔌 Backend API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/projects` | Fetch all projects |
| `POST` | `/api/projects/:id/like` | Upvote a project |
| `GET` | `/api/messages` | Fetch guestbook messages |
| `POST` | `/api/contact` | Submit a contact message |
| `GET` | `/api/stats` | Portfolio stats (views, likes, messages) |
| `GET` | `/api/quote` | Get a random inspirational quote |

---

## ✨ Features

- 🔦 **Spotlight Cursor** — radial flashlight beam follows the mouse
- 🌌 **Constellation Background** — animated blue particle mesh in hero section
- 🎨 **Sapphire Blue Theme** — dark midnight navy + electric blue palette with Ice Blue light mode toggle
- 👆 **Project Upvotes** — live upvote counters backed by the Express REST API
- 📬 **Contact + Live Guestbook** — submit and read messages stored on the backend
- 📊 **Live Stats** — page views, upvotes, and message count from the API
- ⌨️ **Typewriter Role Rotator** — animated role cycling in the hero section

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, CSS Variables (Vanilla CSS) |
| Backend | Node.js, Express.js |
| Icons | Lucide React |
| Fonts | Google Fonts (Playfair Display, Dancing Script, DM Sans) |
| Data | JSON file-based storage |
| Dev Tooling | Concurrently, Nodemon |

---

## 📝 Notes

- No database required — data is persisted in `server/data/*.json` files.
- The Vite dev server proxies all `/api/*` requests to `http://localhost:5000` automatically.
- Profile photo must be at `requirements/pic.jpeg`.

---

© 2026 Aarzoo. All rights reserved.
