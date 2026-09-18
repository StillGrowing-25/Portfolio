import React, { useState, useEffect } from 'react';
import ConstellationCanvas from './ConstellationCanvas';
import { ArrowRight, ExternalLink, Code2, Eye, Heart, MessageSquare } from 'lucide-react';

export default function HeroSection({ isDarkMode, stats }) {
  const roles = [
    'Frontend Developer',
    'React & Angular Developer',
    'AI / ML Enthusiast',
    'CS Undergrad @ UPES',
    'Problem Solver',
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [quote, setQuote] = useState({
    text: "My mother told me to be a lady. And for her, that meant be your own person, be independent.",
    author: "Ruth Bader Ginsburg"
  });

  // Typewriter effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setCharIndex((prev) => prev + 1);
          if (charIndex === currentRole.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setCharIndex((prev) => prev - 1);
          if (charIndex === 0) {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  // Fetch quote from server API
  useEffect(() => {
    fetch('/api/quote')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.quote) setQuote(data.quote);
      })
      .catch(() => { });
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        padding: '8rem 3rem 4rem',
        gap: '4rem',
        overflow: 'hidden',
      }}
    >
      <ConstellationCanvas isDarkMode={isDarkMode} />

      {/* Left: Intro */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.72rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--accent-light)',
            border: '1px solid var(--border)',
            padding: '0.4rem 1.2rem',
            borderRadius: '20px',
            marginBottom: '1.5rem',
            background: 'rgba(56, 189, 248, 0.08)',
          }}
        >
          <Code2 size={13} />
          <span>B.Tech CSE (AI &amp; ML) · UPES </span>
        </div>

        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(3rem, 5.5vw, 5.2rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            color: 'var(--text)',
            marginBottom: '0.8rem',
          }}
        >
          Hi, I'm<br />
          <em style={{ fontStyle: 'italic', color: 'var(--accent-light)', textShadow: '0 0 35px rgba(56, 189, 248, 0.5)' }}>
            Aarzoo Gupta.
          </em>
        </h1>

        <p
          style={{
            fontSize: '1.05rem',
            color: 'var(--accent-light)',
            letterSpacing: '0.05em',
            marginBottom: '1.8rem',
            minHeight: '1.8rem',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
          }}
        >
          <span>{roles[roleIndex].substring(0, charIndex)}</span>
          <span style={{ animation: 'blink 0.8s step-end infinite', color: 'var(--primary)' }}>|</span>
        </p>

        <blockquote
          style={{
            borderLeft: '3px solid var(--accent-light)',
            padding: '1rem 1.4rem',
            marginBottom: '2rem',
            fontStyle: 'italic',
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            background: 'rgba(56, 189, 248, 0.04)',
            borderRadius: '0 8px 8px 0',
          }}
        >
          "{quote.text}"
          <span style={{ display: 'block', marginTop: '0.4rem', fontSize: '0.78rem', fontStyle: 'normal', color: 'var(--primary-soft)' }}>
            — {quote.author}
          </span>
        </blockquote>

        <p
          style={{
            fontSize: '0.95rem',
            color: 'var(--text-dim)',
            lineHeight: 1.85,
            marginBottom: '2.5rem',
            maxWidth: '520px',
          }}
        >
          CS undergraduate at UPES specializing in AI &amp; ML. I explore machine learning, and love transforming ideas into elegant, user-first digital experiences.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <a href="#projects" className="btn-primary">
            <span>View Projects</span>
            <ArrowRight size={15} />
          </a>
          <a href="#contact" className="btn-outline">Contact Me</a>
        </div>
      </div>

      {/* Right: Photo Frame */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'center' }}>
        <div className="spotlight-card" style={{ padding: '12px', maxWidth: '380px', width: '100%' }}>
          <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px' }}>
            <img
              src="requirements/pic.jpeg"
              alt="Aarzoo Gupta"
              style={{
                width: '100%',
                height: '480px',
                objectFit: 'cover',
                objectPosition: 'top',
                display: 'block',
                borderRadius: '8px',
                filter: 'brightness(0.95) contrast(1.05)',
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
