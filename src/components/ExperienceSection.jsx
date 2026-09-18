import React from 'react';
import { Building2, Users, Crown, Code, Award, Cpu } from 'lucide-react';

export default function ExperienceSection() {
  const experiences = [
    {
      title: 'Academic Intern — Web Development',
      org: 'Uttarakhand Power Corporation Limited (UPCL)',
      period: 'June 2026 — July 2026',
      location: 'Dehradun, India',
      icon: Building2,
      role: 'Internship',
      details:
        'Developed responsive web interfaces using Angular and TypeScript, implementing reusable components, routing, navigation, and services. Integrated frontend modules with RESTful APIs while strengthening debugging, version control, and collaborative development skills.',
    },
    {
      title: 'Technical Lead',
      org: 'UPES Open Community',
      period: '2025 — Present',
      location: 'UPES, Dehradun',
      icon: Cpu,
      role: 'Leadership',
      details:
        'Leading technical initiatives and coordinating development activities and community projects. Guiding members on full-stack development, open-source contributions, and hackathon projects.',
    },
    {
      title: 'Core Member — IEEE Women in Engineering (WIE)',
      org: 'IEEE WIE, UPES Student Branch',
      period: '2024 — Present',
      location: 'UPES, Dehradun',
      icon: Code,
      role: 'Technical Core',
      details:
        'Contributing to technical sessions, workshops, and community initiatives focused on empowering women in engineering and technology.',
    },
    {
      title: 'Smart India Hackathon 2026',
      org: 'Government of India — SIH 2026',
      period: '2026',
      location: 'National Level',
      icon: Award,
      role: 'Hackathon',
      details:
        'Participated with the MediKiosk AI-powered healthcare pre-consultation solution — a voice-assisted React + Django + FastAPI system integrating LLaMA, MedGemma, and ABDM/FHIR health standards.',
    },
    {
      title: 'Social Intern',
      org: 'Antarman Parivar Society',
      period: 'June 2025 — July 2025',
      location: 'Dehradun, India',
      icon: Users,
      role: 'Social Work',
      details:
        'Conducted educational sessions and designed interactive learning activities for underprivileged students. Mentored students and collaborated with volunteers to organize community education initiatives.',
    },
    {
      title: 'School Captain & Fest Organizer',
      org: "St. Patrick's Academy, Dehradun",
      period: 'School (Pre-2024)',
      location: 'Dehradun',
      icon: Crown,
      role: 'Leadership',
      details:
        'Served as School Captain overseeing student representation and administration. Coordinated discipline, crowd management, and student activities as part of the School Fest Organizing Committee.',
    },
    {
      title: 'Discipline Committee Member',
      org: 'College Cultural & Tech Fest',
      period: '2024 — Present',
      location: 'UPES, Dehradun',
      icon: Users,
      role: 'Event Operations',
      details:
        'Supported event coordination, discipline management, crowd management, and student representation at university-level cultural and tech festivals.',
    },
  ];

  return (
    <div className="section-wrap" id="experience">
      <div className="section-header">
        <span className="section-num">04</span>
        <h2 className="section-title">Experience &amp; <em>Activities</em></h2>
        <div className="section-line" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {experiences.map((exp, idx) => {
          const IconComp = exp.icon;
          return (
            <div
              key={idx}
              className="spotlight-card"
              style={{ padding: '1.5rem 1.8rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.2rem', flex: 1 }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: 'rgba(56, 189, 248, 0.1)',
                      border: '1px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-light)',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    <IconComp size={19} />
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)' }}>
                        {exp.title}
                      </h3>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'var(--accent-light)',
                          border: '1px solid var(--border)',
                          padding: '0.15rem 0.6rem',
                          borderRadius: '20px',
                          fontWeight: 600,
                          background: 'rgba(56, 189, 248, 0.06)',
                        }}
                      >
                        {exp.role}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.83rem', color: 'var(--accent-light)', fontWeight: 600, marginBottom: '0.4rem' }}>
                      {exp.org}
                    </div>
                    <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                      {exp.details}
                    </p>
                  </div>
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{exp.period}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{exp.location}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
