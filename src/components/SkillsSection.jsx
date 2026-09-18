import React, { useState } from 'react';

export default function SkillsSection() {
  const [filter, setFilter] = useState('all');

  const techSkills = [
    { name: 'C / C++', level: 88, category: 'languages' },
    { name: 'Python', level: 82, category: 'languages' },
    { name: 'Java', level: 80, category: 'languages' },
    { name: 'TypeScript / JavaScript', level: 85, category: 'languages' },
    { name: 'React.js', level: 88, category: 'web' },
    { name: 'Angular', level: 80, category: 'web' },
    { name: 'HTML5, CSS3 & Bootstrap', level: 90, category: 'web' },
    { name: 'Machine Learning & Deep Learning', level: 72, category: 'ai' },
    { name: 'Data Structures & Algorithms', level: 84, category: 'core' },
    { name: 'DBMS / SQL', level: 78, category: 'core' },
    { name: 'Operating Systems & CN', level: 74, category: 'core' },
    { name: 'Git & GitHub', level: 85, category: 'tools' },
  ];

  const softSkills = [
    'Communication',
    'Public Speaking',
    'Leadership',
    'Time Management',
    'Problem Solving',
    'Creativity',
    'Teamwork',
    'Adaptability',
  ];

  const categories = ['all', 'web', 'languages', 'ai', 'core', 'tools'];

  const filteredTech = filter === 'all'
    ? techSkills
    : techSkills.filter((s) => s.category === filter);

  return (
    <div className="section-wrap" id="skills">
      <div className="section-header">
        <span className="section-num">02</span>
        <h2 className="section-title">My <em>Skills</em></h2>
        <div className="section-line" />
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              background: filter === cat ? 'var(--primary)' : 'var(--card)',
              color: filter === cat ? '#ffffff' : 'var(--text-muted)',
              border: '1px solid var(--border)',
              padding: '0.4rem 1.1rem',
              borderRadius: '20px',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: 600,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3.5rem' }}>
        {/* Technical Progress Bars */}
        <div>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.3rem',
              fontStyle: 'italic',
              color: 'var(--accent-light)',
              marginBottom: '1.8rem',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid var(--border)',
            }}
          >
            Technical Stack
          </h3>

          {filteredTech.map((skill) => (
            <div key={skill.name} style={{ marginBottom: '1.4rem' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.78rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-dim)',
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                }}
              >
                <span>{skill.name}</span>
                <span style={{ color: 'var(--accent-light)' }}>{skill.level}%</span>
              </div>
              <div
                style={{
                  height: '4px',
                  background: 'rgba(56, 189, 248, 0.08)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    background: 'linear-gradient(to right, var(--primary), var(--accent-light))',
                    width: `${skill.level}%`,
                    borderRadius: '2px',
                    boxShadow: '0 0 10px rgba(56, 189, 248, 0.55)',
                    transition: 'width 1s ease',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Soft Skills */}
        <div>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.3rem',
              fontStyle: 'italic',
              color: 'var(--accent-light)',
              marginBottom: '1.8rem',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid var(--border)',
            }}
          >
            Soft Skills
          </h3>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {softSkills.map((soft) => (
              <span
                key={soft}
                className="spotlight-card"
                style={{
                  padding: '0.6rem 1.2rem',
                  fontSize: '0.78rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text)',
                  fontWeight: 600,
                  cursor: 'default',
                  display: 'inline-block',
                }}
              >
                {soft}
              </span>
            ))}
          </div>

          {/* Tools & Tech Badges */}
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.1rem',
              fontStyle: 'italic',
              color: 'var(--accent-light)',
              marginBottom: '1rem',
              marginTop: '2rem',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid var(--border)',
            }}
          >
            Tools & Concepts
          </h3>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {['Git & GitHub', 'REST APIs', 'SQL', 'OOP', 'DBMS', 'OS', 'Computer Networks'].map((tool) => (
              <span
                key={tool}
                style={{
                  background: 'rgba(56, 189, 248, 0.08)',
                  border: '1px solid var(--border)',
                  color: 'var(--primary-soft)',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '4px',
                  fontSize: '0.72rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
