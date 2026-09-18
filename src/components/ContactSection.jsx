import React, { useState, useEffect } from 'react';
import { Mail, Linkedin, Github, Instagram, Send, MessageSquare, Clock, User, Phone } from 'lucide-react';

export default function ContactSection({ showToast, onMessageSent }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('contact');

  const fetchMessages = () => {
    fetch('/api/messages')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.messages) {
          setMessages(data.messages);
        }
      })
      .catch((err) => console.error('Error fetching messages:', err));
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast('Please fill in all fields.', 'error');
      return;
    }

    setIsSubmitting(true);
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsSubmitting(false);
        if (data.success) {
          showToast('Message sent! Thank you for connecting ✨');
          setFormData({ name: '', email: '', message: '' });
          fetchMessages();
          if (onMessageSent) onMessageSent();
        } else {
          showToast(data.error || 'Failed to send message', 'error');
        }
      })
      .catch(() => {
        setIsSubmitting(false);
        showToast('Server error while sending message', 'error');
      });
  };

  return (
    <div className="section-wrap" id="contact">
      <div className="section-header">
        <span className="section-num">05</span>
        <h2 className="section-title">
          Get in <em>Touch</em>
        </h2>
        <div className="section-line" />
      </div>

      {/* Tabs: Send Message vs Live Guestbook */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem' }}>
        <button
          onClick={() => setActiveTab('contact')}
          style={{
            background: activeTab === 'contact' ? 'var(--primary)' : 'var(--card)',
            color: activeTab === 'contact' ? '#ffffff' : 'var(--text-muted)',
            border: '1px solid var(--border)',
            padding: '0.6rem 1.4rem',
            borderRadius: '6px',
            fontSize: '0.8rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.3s ease',
          }}
        >
          <Mail size={16} />
          <span>Send Message</span>
        </button>

        <button
          onClick={() => setActiveTab('guestbook')}
          style={{
            background: activeTab === 'guestbook' ? 'var(--primary)' : 'var(--card)',
            color: activeTab === 'guestbook' ? '#ffffff' : 'var(--text-muted)',
            border: '1px solid var(--border)',
            padding: '0.6rem 1.4rem',
            borderRadius: '6px',
            fontSize: '0.8rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.3s ease',
          }}
        >
          <MessageSquare size={16} />
          <span>Live Guestbook ({messages.length})</span>
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: '4rem',
          alignItems: 'start',
        }}
      >
        {/* Left Column: Direct Links */}
        <div>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.4rem',
              fontWeight: 700,
              color: 'var(--text)',
              marginBottom: '1.5rem',
            }}
          >
            Let's connect &amp; create together.
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a
              href="mailto:aarzooguptaddn@gmail.com"
              className="spotlight-card"
              style={{
                padding: '1.2rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                textDecoration: 'none',
                color: 'var(--text)',
              }}
            >
              <Mail size={20} color="var(--accent-light)" />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Email</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>aarzooguptaddn@gmail.com</div>
              </div>
            </a>

            <a
              href="tel:+916398086738"
              className="spotlight-card"
              style={{
                padding: '1.2rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                textDecoration: 'none',
                color: 'var(--text)',
              }}
            >
              <Phone size={20} color="var(--accent-light)" />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Phone</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>+91-6398086738</div>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/aarzoo2095/"
              target="_blank"
              rel="noreferrer"
              className="spotlight-card"
              style={{
                padding: '1.2rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                textDecoration: 'none',
                color: 'var(--text)',
              }}
            >
              <Linkedin size={20} color="var(--accent-light)" />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>LinkedIn</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>linkedin.com/in/aarzoo2095</div>
              </div>
            </a>

            <a
              href="https://github.com/StillGrowing-25"
              target="_blank"
              rel="noreferrer"
              className="spotlight-card"
              style={{
                padding: '1.2rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                textDecoration: 'none',
                color: 'var(--text)',
              }}
            >
              <Github size={20} color="var(--accent-light)" />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>GitHub</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>github.com/StillGrowing-25</div>
              </div>
            </a>

            <a
              href="https://www.instagram.com/_sorcererss.dream_/"
              target="_blank"
              rel="noreferrer"
              className="spotlight-card"
              style={{
                padding: '1.2rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                textDecoration: 'none',
                color: 'var(--text)',
              }}
            >
              <Instagram size={20} color="var(--accent-light)" />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Instagram</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>@_sorcererss.dream_</div>
              </div>
            </a>
          </div>
        </div>

        {/* Right Column: Tab View (Contact Form vs Guestbook List) */}
        {activeTab === 'contact' ? (
          <div className="spotlight-card" style={{ padding: '2.5rem' }}>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.72rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: '0.5rem',
                    fontWeight: 600,
                  }}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  style={{
                    width: '100%',
                    background: 'var(--bg-3)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    padding: '0.9rem 1.2rem',
                    color: 'var(--text)',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.72rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: '0.5rem',
                    fontWeight: 600,
                  }}
                >
                  Your Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  style={{
                    width: '100%',
                    background: 'var(--bg-3)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    padding: '0.9rem 1.2rem',
                    color: 'var(--text)',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.8rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.72rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: '0.5rem',
                    fontWeight: 600,
                  }}
                >
                  Your Message
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Say hello or share project ideas..."
                  style={{
                    width: '100%',
                    background: 'var(--bg-3)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    padding: '0.9rem 1.2rem',
                    color: 'var(--text)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{ width: '100%' }}
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <Send size={15} />
              </button>
            </form>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '500px', overflowY: 'auto' }}>
            {messages.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No messages in guestbook yet.</p>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="spotlight-card" style={{ padding: '1.4rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--text)' }}>
                      <User size={15} color="var(--accent-light)" />
                      <span>{msg.name}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      <Clock size={12} />
                      <span>{new Date(msg.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
                    "{msg.message}"
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
