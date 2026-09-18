import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const PROJECTS_FILE = path.join(__dirname, 'data', 'projects.json');
const MESSAGES_FILE = path.join(__dirname, 'data', 'messages.json');

// Helper to safely read JSON files
const readJSON = (filePath, fallback = []) => {
  try {
    if (!fs.existsSync(filePath)) {
      return fallback;
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return fallback;
  }
};

// Helper to write JSON files
const writeJSON = (filePath, data) => {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
};

let pageViews = 1540;

// Quotes list
const quotes = [
  { text: "My mother told me to be a lady. And for her, that meant be your own person, be independent.", author: "Ruth Bader Ginsburg" },
  { text: "Code is like poetry; it should be concise, beautiful, and purposeful.", author: "Anonymous" },
  { text: "Mathematics is the language with which God has written the universe.", author: "Galileo Galilei" },
  { text: "The elegance of code is born from the simplicity of thought.", author: "Aarzoo" },
];

// Routes

// 1. GET /api/projects
app.get('/api/projects', (req, res) => {
  const projects = readJSON(PROJECTS_FILE);
  res.json({ success: true, projects });
});

// 2. POST /api/projects/:id/like
app.post('/api/projects/:id/like', (req, res) => {
  const { id } = req.params;
  const projects = readJSON(PROJECTS_FILE);
  const project = projects.find(p => p.id === id);

  if (project) {
    project.likes = (project.likes || 0) + 1;
    writeJSON(PROJECTS_FILE, projects);
    return res.json({ success: true, likes: project.likes, id });
  }

  res.status(404).json({ success: false, error: "Project not found" });
});

// 3. GET /api/messages
app.get('/api/messages', (req, res) => {
  const messages = readJSON(MESSAGES_FILE);
  res.json({ success: true, messages });
});

// 4. POST /api/contact
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Name, email, and message are required." });
  }

  const messages = readJSON(MESSAGES_FILE);
  const newMessage = {
    id: Date.now(),
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    timestamp: new Date().toISOString()
  };

  messages.unshift(newMessage);
  writeJSON(MESSAGES_FILE, messages);

  res.json({ success: true, message: "Thank you! Your message has been recorded.", data: newMessage });
});

// 5. GET /api/stats
app.get('/api/stats', (req, res) => {
  pageViews += 1;
  const messages = readJSON(MESSAGES_FILE);
  const projects = readJSON(PROJECTS_FILE);
  const totalLikes = projects.reduce((sum, p) => sum + (p.likes || 0), 0);

  res.json({
    success: true,
    stats: {
      views: pageViews,
      totalLikes,
      messageCount: messages.length,
      projectsCount: projects.length
    }
  });
});

// 6. GET /api/quote
app.get('/api/quote', (req, res) => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.json({ success: true, quote: randomQuote });
});

// 7. Serve built React frontend in production
const DIST = path.join(__dirname, '..', 'dist');
if (fs.existsSync(DIST)) {
  app.use(express.static(DIST));
  app.get('*', (req, res) => {
    res.sendFile(path.join(DIST, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`[Express Backend] Portfolio Server running on port ${PORT}`);
});

