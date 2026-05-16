/* ============================================================
   TUYIZERE Federance - Portfolio JavaScript
   Fixed for Netlify (no PHP required)
   ============================================================ */

// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  }, 2400);
  document.body.style.overflow = 'hidden';
});

// ===== SCROLL PROGRESS BAR =====
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / docHeight) * 100;
  const bar = document.getElementById('scroll-progress');
  if (bar) bar.style.width = progress + '%';
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });
}

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

// ===== DARK / LIGHT MODE TOGGLE =====
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
let currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon();

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
  });
}

function updateThemeIcon() {
  if (!themeIcon) return;
  themeIcon.className = currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

// ===== TYPING TEXT ANIMATION =====
const phrases = [
  'Cybersecurity Enthusiast',
  'Web Developer',
  'Ethical Hacker in Training',
  'Problem Solver',
  'ALX Student',
  'Business Information Technology Student',
  'Tech Innovator'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedText = document.getElementById('typed-text');

function type() {
  if (!typedText) return;
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typedText.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedText.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }
  if (!isDeleting && charIndex === current.length) {
    setTimeout(() => { isDeleting = true; }, 1800);
  }
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }
  setTimeout(type, isDeleting ? 60 : 110);
}
setTimeout(type, 1000);

// ===== MATRIX RAIN CANVAS =====
const canvas = document.getElementById('matrix-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initMatrix();
  });

  const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ';
  const fontSize = 13;
  let columns, drops;

  function initMatrix() {
    columns = Math.floor(canvas.width / fontSize);
    drops = new Array(columns).fill(1);
  }
  initMatrix();

  function drawMatrix() {
    ctx.fillStyle = 'rgba(5, 10, 15, 0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00dcff';
    ctx.font = fontSize + 'px Share Tech Mono';
    for (let i = 0; i < drops.length; i++) {
      const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }
  setInterval(drawMatrix, 55);
}

// ===== PARTICLES.JS =====
if (typeof particlesJS !== 'undefined') {
  particlesJS('particles-js', {
    particles: {
      number: { value: 50, density: { enable: true, value_area: 900 } },
      color: { value: '#00dcff' },
      shape: { type: 'circle' },
      opacity: { value: 0.35, random: true },
      size: { value: 2.5, random: true },
      line_linked: { enable: true, distance: 130, color: '#00dcff', opacity: 0.15, width: 1 },
      move: { enable: true, speed: 1.2, direction: 'none', random: true, out_mode: 'out' }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' } },
      modes: { grab: { distance: 140, line_linked: { opacity: 0.4 } }, push: { particles_nb: 3 } }
    }
  });
}

// ===== AOS INIT =====
if (typeof AOS !== 'undefined') {
  AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 80 });
}

// ===== ABOUT TABS =====
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.getAttribute('data-tab');
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const target = document.getElementById('tab-' + tab);
    if (target) target.classList.add('active');
  });
});

// ===== ANIMATED COUNTERS =====
function animateCounters() {
  document.querySelectorAll('.counter').forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 1600;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        counter.textContent = target + (target >= 100 ? '+' : '');
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current);
      }
    }, 16);
  });
}

const counterSection = document.querySelector('.about-stats-row');
if (counterSection) {
  new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
    }
  }, { threshold: 0.5 }).observe(counterSection);
}

// ===== SKILL BARS ANIMATION =====
function animateSkillBars() {
  document.querySelectorAll('.skill-fill').forEach(bar => {
    bar.style.width = bar.getAttribute('data-width') + '%';
  });
}

const skillsSection = document.getElementById('skills');
if (skillsSection) {
  new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) animateSkillBars();
  }, { threshold: 0.3 }).observe(skillsSection);
}

// ===== BACK TO TOP BUTTON =====
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== FOOTER YEAR =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = navbar ? navbar.offsetHeight : 70;
      window.scrollTo({ top: target.offsetTop - navH, behavior: 'smooth' });
    }
  });
});

// ===== MOUSE CURSOR GLOW =====
if (window.innerWidth > 1024) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    width:300px;height:300px;
    background:radial-gradient(circle,rgba(0,220,255,0.04) 0%,transparent 70%);
    border-radius:50%;position:fixed;pointer-events:none;z-index:0;
    transform:translate(-50%,-50%);transition:left 0.12s,top 0.12s;
  `;
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// =====================================================
// ✅ CONTACT FORM — Netlify Forms (NO PHP needed)
// =====================================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const alertBox = document.getElementById('form-alert');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    // Loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    alertBox.className = 'form-alert';
    alertBox.textContent = '';

    // Collect all form fields into URL-encoded string
    const formData = new FormData(contactForm);
    const encoded = new URLSearchParams(formData).toString();

    // POST to Netlify
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encoded
    })
    .then(function (res) {
      // Netlify returns 200 or 303 on success
      if (res.ok) {
        alertBox.className = 'form-alert success';
        alertBox.innerHTML =
          '<i class="fas fa-check-circle"></i> ' +
          'Message sent successfully! I will reply within 24 hours. Thank you!';
        contactForm.reset();
      } else {
        throw new Error('status ' + res.status);
      }
    })
    .catch(function () {
      alertBox.className = 'form-alert error';
      alertBox.innerHTML =
        '<i class="fas fa-exclamation-circle"></i> ' +
        'Could not send. Please email me directly: ' +
        '<a href="mailto:tuyizerefederance15@gmail.com" ' +
        'style="color:inherit;text-decoration:underline;">' +
        'tuyizerefederance15@gmail.com</a>';
    })
    .finally(function () {
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      submitBtn.disabled = false;
      setTimeout(function () {
        alertBox.className = 'form-alert';
        alertBox.textContent = '';
      }, 8000);
    });
  });
}

console.log('%c TUYIZERE Federance Portfolio ', 'background:#00dcff;color:#000;font-weight:bold;font-size:14px;padding:6px 12px;');
console.log('%c Aspiring Cybersecurity & Technology Professional ', 'color:#00dcff;font-size:11px;');
