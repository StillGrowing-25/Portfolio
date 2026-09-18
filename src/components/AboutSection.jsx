import React from 'react';
import { Code, Feather, Music, Sparkles } from 'lucide-react';

export default function AboutSection() {
  const hobbies = [
    { title: 'Front End Dev', icon: Code, desc: 'React, Angular' },
    { title: 'Calligraphy', icon: Feather, desc: 'Expressing thoughts with artistic penmanship' },
    { title: 'Guitar', icon: Music, desc: 'Playing acoustic melodies & rhythm' },
    { title: 'Dancing', icon: Sparkles, desc: 'Expressing energy & artistic movement' },
  ];

  return (
    <div className="section-wrap" id="about">
      <div className="section-header">
        <span className="section-num">01</span>
        <h2 className="section-title">About <em>Me</em></h2>
        <div className="section-line" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '4rem', alignItems: 'start' }}>
        <div>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.9, color: 'var(--text-dim)', marginBottom: '1.4rem' }}>
            I'm a Computer Science undergraduate at UPES, Dehradun, specializing in Artificial Intelligence &amp; Machine Learning, currently holding a CGPA of <strong style={{ color: 'var(--accent-light)' }}>9.69</strong>. I find joy at the intersection of art and logic — expressing creativity through calligraphy and painting, dancing, and getting lost in novels.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.9, color: 'var(--text-dim)', marginBottom: '1.4rem' }}>
            I'm passionate about building practical AI-driven web applications and solving complex technical problems. From full-stack platforms like <strong style={{ color: 'var(--accent-light)' }}>MediKiosk</strong> and <strong style={{ color: 'var(--accent-light)' }}>ShopEase</strong> to music mood classifiers and inventory systems — I love turning ideas into meaningful digital experiences.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.9, color: 'var(--text-dim)' }}>
            Mathematics is one of my core inspirations — its structural elegance and analytical rigor constantly refine my approach to problem solving and system design.
          </p>

          {/* Education block */}
          <div
            style={{
              marginTop: '2rem',
              padding: '1.5rem',
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
            }}
          >
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.1rem',
                fontStyle: 'italic',
                color: 'var(--accent-light)',
                marginBottom: '1.2rem',
              }}
            >
              Education
            </h3>

            <div style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.3rem' }}>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: '0.95rem' }}>UPES, Dehradun</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>B.Tech CSE (AI &amp; ML)</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>2024 — 2028</div>
                  <div
                    style={{
                      marginTop: '0.3rem',
                      background: 'rgba(56, 189, 248, 0.1)',
                      color: 'var(--accent-light)',
                      padding: '0.2rem 0.7rem',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                  >
                    CGPA 9.69
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.3rem' }}>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: '0.95rem' }}>St. Patrick's Academy, Dehradun</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>CBSE Class X &amp; XII</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div
                    style={{
                      marginTop: '0.3rem',
                      background: 'rgba(56, 189, 248, 0.1)',
                      color: 'var(--accent-light)',
                      padding: '0.2rem 0.7rem',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                  >
                    XII: 94.7% &nbsp;|&nbsp; X: 97.6%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hobby Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
          {hobbies.map((item) => {
            const IconComponent = item.icon;
            return (
              <div key={item.title} className="spotlight-card" style={{ padding: '1.5rem 1rem', textAlign: 'center' }}>
                <div style={{ color: 'var(--accent-light)', marginBottom: '0.8rem', display: 'flex', justifyContent: 'center' }}>
                  <IconComponent size={32} />
                </div>
                <div style={{ fontSize: '0.82rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text)', fontWeight: 700, marginBottom: '0.3rem' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {item.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
