import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SpotlightCursor from './components/SpotlightCursor';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [spotlightEnabled, setSpotlightEnabled] = useState(true);
  const [toasts, setToasts] = useState([]);
  const [stats, setStats] = useState({ views: 1540, totalLikes: 89, messageCount: 1, projectsCount: 3 });
  const [showBackTop, setShowBackTop] = useState(false);

  // Sync mode class on body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);

  // Back to top scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowBackTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchStats = () => {
    fetch('/api/stats')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.stats) {
          setStats(data.stats);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <SpotlightCursor spotlightEnabled={spotlightEnabled} />

      <Navbar
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        spotlightEnabled={spotlightEnabled}
        setSpotlightEnabled={setSpotlightEnabled}
      />

      <HeroSection isDarkMode={isDarkMode} stats={stats} />

      <div className="divider" />

      <AboutSection />

      <div className="divider" />

      <SkillsSection />

      <div className="divider" />

      <ProjectsSection showToast={showToast} />

      <div className="divider" />

      <ExperienceSection />

      <div className="divider" />

      <ContactSection showToast={showToast} onMessageSent={fetchStats} />

      {/* Footer */}
      <footer
        style={{
          background: 'var(--bg-2)',
          borderTop: '1px solid var(--border)',
          textAlign: 'center',
          padding: '3.5rem 2rem',
          marginTop: '4rem',
        }}
      >
        <div
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: '3rem',
            color: 'var(--accent-light)',
            textShadow: '0 0 25px rgba(56, 189, 248, 0.4)',
            marginBottom: '0.5rem',
          }}
        >
          Aarzoo
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
          CS Undergrad @ UPES · Full Stack Developer · AI &amp; ML Enthusiast
        </p>
        <p style={{ marginTop: '0.4rem', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
          © 2026 Aarzoo Gupta. All rights reserved.
        </p>
      </footer>

      {/* Back to Top */}
      {showBackTop && (
        <button
          onClick={scrollToTop}
          title="Back to Top"
          style={{
            position: 'fixed',
            bottom: '2rem',
            left: '2rem',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'var(--primary)',
            border: 'none',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 1000,
            boxShadow: '0 4px 15px rgba(59, 130, 246, 0.5)',
            transition: 'all 0.3s ease',
          }}
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* Toast Manager */}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type}`}>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
