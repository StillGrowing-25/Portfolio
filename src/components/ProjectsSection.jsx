import React, { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import ProjectModal from './ProjectModal';

export default function ProjectsSection({ showToast }) {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.projects) setProjects(data.projects);
      })
      .catch((err) => console.error('Failed to load projects:', err));
  }, []);

  return (
    <div className="section-wrap" id="projects">
      <div className="section-header">
        <span className="section-num">03</span>
        <h2 className="section-title"><em>Projects</em></h2>
        <div className="section-line" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '1.5rem' }}>
        {projects.map((proj, idx) => (
          <div
            key={proj.id}
            className="spotlight-card"
            onClick={() => setSelectedProject(proj)}
            style={{ padding: '2rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <div style={{ marginBottom: '0.8rem' }}>
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '2.8rem',
                    fontWeight: 900,
                    color: 'rgba(56, 189, 248, 0.12)',
                    lineHeight: 1,
                  }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'var(--text)',
                  marginBottom: '0.7rem',
                  lineHeight: 1.4,
                }}
              >
                {proj.title}
              </h3>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.2rem' }}>
                {proj.description}
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {proj.tags?.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: '0.65rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--accent-light)',
                      background: 'rgba(56, 189, 248, 0.08)',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '4px',
                    }}
                  >
                    {t}
                  </span>
                ))}
                {proj.tags?.length > 4 && (
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', padding: '0.2rem 0.4rem' }}>
                    +{proj.tags.length - 4} more
                  </span>
                )}
              </div>

              <div
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--primary-soft)',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <span>View Details</span>
                <ExternalLink size={12} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
