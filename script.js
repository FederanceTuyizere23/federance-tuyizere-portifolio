/* ============================================================
   TUYIZERE Federance - Portfolio JavaScript
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
  document.getElementById('scroll-progress').style.width = progress + '%';
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});
// Close menu when link clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

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

themeToggle.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  localStorage.setItem('theme', currentTheme);
  updateThemeIcon();
});

function updateThemeIcon() {
  if (currentTheme === 'dark') {
    themeIcon.className = 'fas fa-moon';
  } else {
    themeIcon.className = 'fas fa-sun';
  }
}

// ===== TYPING TEXT ANIMATION =====
const phrases = [
  'Cybersecurity Enthusiast',
  'Web Developer',
  'Ethical Hacker in Training',
  'Problem Solver',
  'ALX Certified Graduate',
  'Tech Innovator'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedText = document.getElementById('typed-text');

function type() {
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
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(drawMatrix, 55);


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
    document.getElementById('tab-' + tab).classList.add('active');
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

// Use IntersectionObserver to trigger counters
const counterSection = document.querySelector('.about-stats-row');
if (counterSection) {
  const counterObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      counterObs.disconnect();
    }
  }, { threshold: 0.5 });
  counterObs.observe(counterSection);
}

// ===== SKILL BARS ANIMATION =====
function animateSkillBars() {
  document.querySelectorAll('.skill-fill').forEach(bar => {
    const width = bar.getAttribute('data-width');
    bar.style.width = width + '%';
  });
}

const skillsSection = document.getElementById('skills');
if (skillsSection) {
  const skillsObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateSkillBars();
      skillsObs.disconnect();
    }
  }, { threshold: 0.3 });
  skillsObs.observe(skillsSection);
}

// ===== TESTIMONIAL SLIDER =====
const track = document.getElementById('testimonialTrack');
const cards = document.querySelectorAll('.testimonial-card');
const dotsContainer = document.getElementById('sliderDots');
let currentSlide = 0;
let autoSlide;

if (track && cards.length > 0) {
  // Create dots
  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot-indicator' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  function goToSlide(index) {
    currentSlide = (index + cards.length) % cards.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    document.querySelectorAll('.dot-indicator').forEach((d, i) => {
      d.classList.toggle('active', i === currentSlide);
    });
  }

  document.getElementById('prevBtn').addEventListener('click', () => {
    goToSlide(currentSlide - 1);
    resetAutoSlide();
  });
  document.getElementById('nextBtn').addEventListener('click', () => {
    goToSlide(currentSlide + 1);
    resetAutoSlide();
  });

  function startAutoSlide() {
    autoSlide = setInterval(() => goToSlide(currentSlide + 1), 4500);
  }
  function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
  }
  startAutoSlide();
}

// ===== BACK TO TOP BUTTON =====
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) backToTop.classList.add('visible');
  else backToTop.classList.remove('visible');
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== FOOTER YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== CONTACT FORM SUBMISSION (AJAX) =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const alertBox = document.getElementById('form-alert');
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    fetch('send.php', {
      method: 'POST',
      body: formData
    })
      .then(res => res.text())
      .then(response => {
        if (response.trim() === 'success') {
          alertBox.className = 'form-alert success';
          alertBox.textContent = '✓ Message sent successfully! I will get back to you soon.';
          contactForm.reset();
        } else {
          alertBox.className = 'form-alert error';
          alertBox.textContent = '✗ Something went wrong. Please try again or email me directly.';
        }
      })
      .catch(() => {
        alertBox.className = 'form-alert error';
        alertBox.textContent = '✗ Network error. Please check your connection and try again.';
      })
      .finally(() => {
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        submitBtn.disabled = false;
        setTimeout(() => {
          alertBox.className = 'form-alert';
        }, 6000);
      });
  });
}

// ===== VIDEO PLACEHOLDER CLICK =====
const videoPlaceholder = document.querySelector('.video-placeholder');
if (videoPlaceholder) {
  videoPlaceholder.addEventListener('click', () => {
    // Replace this URL with your actual ALX elevator pitch video link
    const videoUrl = 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID';
    window.open(videoUrl, '_blank');
  });
}

// ===== SMOOTH SCROLL FOR INTERNAL LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = document.getElementById('navbar').offsetHeight;
      const top = target.offsetTop - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== MOUSE CURSOR GLOW (Optional, Desktop Only) =====
if (window.innerWidth > 1024) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(0,220,255,0.04) 0%, transparent 70%);
    border-radius: 50%;
    position: fixed; pointer-events: none; z-index: 0;
    transform: translate(-50%, -50%);
    transition: left 0.12s, top 0.12s;
  `;
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

console.log('%c TUYIZERE Federance Portfolio ', 'background:#00dcff;color:#000;font-weight:bold;font-size:14px;padding:6px 12px;');
console.log('%c Aspiring Cybersecurity & Technology Professional ', 'color:#00dcff;font-size:11px;');
