import React, { useState, useEffect } from 'react';
import { Sun, Moon, Zap, Menu, X } from 'lucide-react';

export default function Navbar({ isDarkMode, setIsDarkMode, spotlightEnabled, setSpotlightEnabled }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 100) {
            setActiveNav(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.2rem 3rem',
        transition: 'all 0.4s ease',
        background: scrolled
          ? isDarkMode
            ? 'rgba(7, 12, 24, 0.85)'
            : 'rgba(240, 247, 255, 0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <a
        href="#hero"
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: '2.2rem',
          color: 'var(--accent-light)',
          textDecoration: 'none',
          letterSpacing: '0.04em',
          textShadow: '0 0 25px rgba(56, 189, 248, 0.5)',
          fontWeight: 700,
        }}
      >
        Aarzoo
      </a>

      {/* Desktop Links */}
      <ul
        style={{
          display: 'flex',
          gap: '2.2rem',
          listStyle: 'none',
          alignItems: 'center',
        }}
        className="desktop-nav"
      >
        {navLinks.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              style={{
                textDecoration: 'none',
                color: activeNav === link.href.replace('#', '') ? 'var(--accent-light)' : 'var(--text-muted)',
                fontSize: '0.8rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontWeight: 600,
                transition: 'color 0.3s ease',
                position: 'relative',
              }}
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>

      {/* Action Toggles */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={() => setSpotlightEnabled(!spotlightEnabled)}
          title={spotlightEnabled ? 'Disable Spotlight Torch' : 'Enable Spotlight Torch'}
          style={{
            background: spotlightEnabled ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
            border: '1px solid var(--border)',
            color: spotlightEnabled ? 'var(--accent-light)' : 'var(--text-muted)',
            padding: '0.5rem 0.8rem',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            transition: 'all 0.3s ease',
          }}
        >
          <Zap size={14} />
          <span style={{ display: 'none' }} className="toggle-label">Spotlight</span>
        </button>

        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          title={isDarkMode ? 'Switch to Ice Blue Theme' : 'Switch to Sapphire Dark Theme'}
          style={{
            background: 'transparent',
            border: '1px solid var(--border)',
            color: 'var(--accent-light)',
            padding: '0.5rem 0.8rem',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            transition: 'all 0.3s ease',
          }}
        >
          {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        <button
          className="mobile-hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text)',
            cursor: 'pointer',
            display: 'none',
          }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            top: '70px',
            right: 0,
            left: 0,
            background: 'var(--bg-2)',
            borderBottom: '1px solid var(--border)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            alignItems: 'center',
            zIndex: 999,
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                textDecoration: 'none',
                color: 'var(--text)',
                fontSize: '1.1rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
