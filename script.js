/* ============================================================
   script.js — Aarzoo Portfolio
   Features:
   • Custom glowing cursor
   • Canvas constellation / particle hero background
   • Typewriter role animation
   • Scroll-reveal with stagger
   • Skill bar animation on scroll
   • Magnetic button effect
   • Active nav link on scroll
   • Mobile hamburger menu
   • Form validation + feedback toast
   • Parallax hero image tilt
   • Floating back-to-top button
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. CUSTOM CURSOR ───────────────────────────────────────── */
  const cursor     = document.getElementById('cursor');
  const cursorDot  = document.getElementById('cursor-dot');

  let mouseX = 0, mouseY = 0;
  let dotX   = 0, dotY   = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX - 20}px, ${mouseY - 20}px)`;
  });

  // Smooth trailing dot
  (function animateDot() {
    dotX += (mouseX - dotX) * 0.12;
    dotY += (mouseY - dotY) * 0.12;
    cursorDot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
    requestAnimationFrame(animateDot);
  })();

  // Cursor grow on links/buttons
  document.querySelectorAll('a, button, .hobby-card, .project-card, .soft-pill').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-grow'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-grow'));
  });

  /* ── 2. CONSTELLATION CANVAS ────────────────────────────────── */
  const canvas = document.getElementById('hero-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, particles;

  function resizeCanvas() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

  function Particle() {
    this.x  = Math.random() * W;
    this.y  = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.r  = Math.random() * 1.5 + 0.3;
    this.alpha = Math.random() * 0.6 + 0.2;
  }

  function initParticles() {
    particles = Array.from({ length: 90 }, () => new Particle());
  }
  initParticles();

  function drawParticles() {
    ctx.clearRect(0, 0, W, H);

    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,149,108,${p.alpha})`;
      ctx.fill();
    });

    // Connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(133,14,53,${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth   = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(drawParticles);
  }
  drawParticles();

  /* ── 3. TYPEWRITER ──────────────────────────────────────────── */
  const roles = [
    'Frontend Developer',
    'CS Student',
    'UI Designer',
    'Calligrapher',
    'Guitarist',
    'Problem Solver',
  ];
  let roleIdx  = 0;
  let charIdx  = 0;
  let deleting = false;
  const typeEl = document.getElementById('typewriter');

  function type() {
    const current = roles[roleIdx];
    if (!deleting) {
      typeEl.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        setTimeout(() => { deleting = true; type(); }, 1800);
        return;
      }
    } else {
      typeEl.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting  = false;
        roleIdx   = (roleIdx + 1) % roles.length;
      }
    }
    setTimeout(type, deleting ? 45 : 90);
  }
  setTimeout(type, 1200);

  /* ── 4. SCROLL REVEAL ───────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => el.classList.add('visible'), delay);
        revealObs.unobserve(el);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach((el, i) => {
    el.dataset.delay = (i % 4) * 100;
    revealObs.observe(el);
  });

  /* ── 5. SKILL BARS ──────────────────────────────────────────── */
  const skillObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(bar => {
          setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 300);
        });
        skillObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skills-grid > div').forEach(el => skillObs.observe(el));

  /* ── 6. MAGNETIC BUTTONS ────────────────────────────────────── */
  document.querySelectorAll('.btn-magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width  / 2;
      const y = e.clientY - rect.top  - rect.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0,0)';
    });
  });

  /* ── 7. ACTIVE NAV LINK ─────────────────────────────────────── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });

    // Navbar background opacity
    const nav = document.getElementById('navbar');
    nav.classList.toggle('scrolled', window.scrollY > 60);

    // Back to top
    document.getElementById('back-top').classList.toggle('show', window.scrollY > 600);
  });

  /* ── 8. HAMBURGER MENU ──────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });

  /* ── 9. FORM VALIDATION + TOAST ─────────────────────────────── */
  const form  = document.getElementById('contact-form');
  const toast = document.getElementById('toast');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name    = form.querySelector('[name=name]').value.trim();
    const email   = form.querySelector('[name=email]').value.trim();
    const message = form.querySelector('[name=message]').value.trim();
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name)           { showToast('Please enter your name.', 'error');   return; }
    if (!emailRx.test(email)) { showToast('Please enter a valid email.', 'error');  return; }
    if (!message)        { showToast('Please write a message.', 'error');   return; }

    showToast('Message sent! I\'ll get back to you soon ✨', 'success');
    form.reset();
  });

  function showToast(msg, type) {
    toast.textContent = msg;
    toast.className   = 'toast show ' + type;
    setTimeout(() => toast.classList.remove('show'), 3500);
  }

  /* ── 10. HERO IMAGE TILT ─────────────────────────────────────── */
  const heroWrap = document.querySelector('.hero-image-wrap');
  if (heroWrap) {
    heroWrap.addEventListener('mousemove', e => {
      const rect = heroWrap.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 14;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 14;
      heroWrap.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg)`;
    });
    heroWrap.addEventListener('mouseleave', () => {
      heroWrap.style.transform = 'perspective(800px) rotateY(0) rotateX(0)';
    });
  }

  const toggleBtn = document.createElement('button');
toggleBtn.innerText = '🌙';
toggleBtn.style.position = 'fixed';
toggleBtn.style.top = '20px';
toggleBtn.style.right = '20px';
toggleBtn.style.zIndex = '1000';

document.body.appendChild(toggleBtn);

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

  /* ── 11. BACK TO TOP ─────────────────────────────────────────── */
  document.getElementById('back-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

})();