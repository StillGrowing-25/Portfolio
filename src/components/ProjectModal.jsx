import React from 'react';
import { X, Github, CheckCircle2 } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(7, 12, 24, 0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        className="spotlight-card"
        style={{
          maxWidth: '650px',
          width: '100%',
          padding: '2.5rem',
          position: 'relative',
          background: 'var(--bg-2)',
          border: '1px solid var(--border-glow)',
          borderRadius: '16px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(56, 189, 248, 0.2)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.2rem',
            right: '1.2rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          <X size={24} />
        </button>

        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.8rem',
            fontWeight: 700,
            color: 'var(--text)',
            marginBottom: '0.8rem',
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            fontSize: '0.95rem',
            color: 'var(--text-dim)',
            lineHeight: 1.8,
            marginBottom: '1.5rem',
          }}
        >
          {project.description}
        </p>

        <h4
          style={{
            fontSize: '0.82rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--accent-light)',
            marginBottom: '0.8rem',
            fontWeight: 700,
          }}
        >
          Key Highlights
        </h4>

        <ul style={{ listStyle: 'none', marginBottom: '1.8rem' }}>
          {project.highlights?.map((hl, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.6rem',
                fontSize: '0.88rem',
                color: 'var(--text-muted)',
                marginBottom: '0.6rem',
              }}
            >
              <CheckCircle2 size={16} color="var(--accent-light)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>{hl}</span>
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {project.tags?.map((t) => (
            <span
              key={t}
              style={{
                background: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid var(--border)',
                color: 'var(--accent-light)',
                padding: '0.3rem 0.8rem',
                borderRadius: '4px',
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* GitHub Link */}
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-outline"
          style={{ padding: '0.7rem 1.4rem' }}
        >
          <Github size={16} />
          <span>View on GitHub</span>
        </a>
      </div>
    </div>
  );
}
