/*Nebula*/
function initGalaxy(canvasId, opts = {}) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const section = canvas.parentElement;
  let stars = [], nebula = [], shootingStars = [];

  const cfg = {
    starCount: opts.starCount || 180,
    nebulaCount: opts.nebulaCount || 6,
    shootingFreq: opts.shootingFreq || 0.004,
  };

  function resize() {
    canvas.width  = section.offsetWidth;
    canvas.height = section.offsetHeight;
  }

  function randomStar() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.2,
      alpha: Math.random() * 0.7 + 0.15,
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2,
    };
  }

  function randomNebula() {
    const colors = ['rgba(74,144,226,','rgba(26,51,112,','rgba(58,123,213,','rgba(100,160,240,'];
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 140 + 60,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.07 + 0.02,
    };
  }

  function init() {
    resize();
    stars = Array.from({ length: cfg.starCount }, randomStar);
    nebula = Array.from({ length: cfg.nebulaCount }, randomNebula);
  }

  function spawnShooter() {
    shootingStars.push({
      x: Math.random() * canvas.width * 0.7,
      y: Math.random() * canvas.height * 0.4,
      len: Math.random() * 80 + 40,
      speed: Math.random() * 6 + 4,
      alpha: 1, angle: Math.PI / 5,
    });
  }

  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nebula.forEach(n => {
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
      g.addColorStop(0, n.color + n.alpha + ')');
      g.addColorStop(1, n.color + '0)');
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
    });
    stars.forEach(s => {
      const pulse = s.alpha + Math.sin(t * s.speed + s.phase) * 0.18;
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,220,255,${Math.max(0,Math.min(1,pulse))})`;
      ctx.fill();
    });
    if (Math.random() < cfg.shootingFreq) spawnShooter();
    shootingStars = shootingStars.filter(ss => ss.alpha > 0.02);
    shootingStars.forEach(ss => {
      const dx = Math.cos(ss.angle) * ss.len, dy = Math.sin(ss.angle) * ss.len;
      const g2 = ctx.createLinearGradient(ss.x, ss.y, ss.x+dx, ss.y+dy);
      g2.addColorStop(0, `rgba(255,255,255,${ss.alpha})`);
      g2.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.beginPath(); ctx.moveTo(ss.x, ss.y); ctx.lineTo(ss.x+dx, ss.y+dy);
      ctx.strokeStyle = g2; ctx.lineWidth = 1.5; ctx.stroke();
      ss.x += Math.cos(ss.angle)*ss.speed; ss.y += Math.sin(ss.angle)*ss.speed;
      ss.alpha -= 0.018;
    });
    t += 0.016;
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); nebula = Array.from({length:cfg.nebulaCount}, randomNebula); });
  init(); draw();
}

initGalaxy('galaxy-hero',   { starCount:220, nebulaCount:7, shootingFreq:0.005 });
initGalaxy('galaxy-about',  { starCount:160, nebulaCount:5, shootingFreq:0.003 });
initGalaxy('galaxy-footer', { starCount:80,  nebulaCount:3, shootingFreq:0.002 });
initGalaxy('galaxy-cookie', { starCount:60,  nebulaCount:3, shootingFreq:0.002 });

/* navbar */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* reveal */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* skills carousel */
const row1 = [
  { label:'HTML5',      icon:'<i class="fa-brands fa-html5" style="color:#e34f26"></i>' },
  { label:'CSS3',       icon:'<i class="fa-brands fa-css3-alt" style="color:#1572b6"></i>' },
  { label:'JavaScript', icon:'<i class="devicon-javascript-plain" style="color:#f7df1e"></i>' },
  { label:'React',      icon:'<i class="devicon-react-original" style="color:#61dafb"></i>' },
  { label:'TypeScript', icon:'<i class="devicon-typescript-plain" style="color:#3178c6"></i>' },
  { label:'Node.js',    icon:'<i class="devicon-nodejs-plain" style="color:#68a063"></i>' },
];
const row2 = [
  { label:'Next.js', icon:'<i class="devicon-nextjs-plain" style="color:#fff"></i>' },
  { label:'Python',  icon:'<i class="devicon-python-plain" style="color:#3776ab"></i>' },
  { label:'Figma',   icon:'<i class="devicon-figma-plain" style="color:#f24e1e"></i>' },
  { label:'Git',     icon:'<i class="devicon-git-plain" style="color:#f05032"></i>' },
  { label:'MySQL',   icon:'<i class="devicon-mysql-plain" style="color:#4479a1"></i>' },
  { label:'SEO',     icon:'<i class="fa-solid fa-magnifying-glass" style="color:#4a90e2"></i>' },
];
function buildTrack(id, skills) {
  const el = document.getElementById(id);
  if (!el) return;
  const items = [...skills,...skills,...skills,...skills];
  el.innerHTML = items.map(s => `<div class="skill-pill">${s.icon}<span>${s.label}</span></div>`).join('');
}
buildTrack('track-1', row1);
buildTrack('track-2', row2);

/*counter*/
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  if (target === 0 && suffix === '∞') { el.textContent = '∞'; return; }
  const duration = 1800, steps = 60, stepTime = duration / steps;
  let current = 0;
  const timer = setInterval(() => {
    current += Math.ceil(target / steps);
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = current + suffix;
  }, stepTime);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.currentTarget.querySelectorAll('.stat-box .num[data-target]').forEach(el => {
        if (!el.dataset.animated) { el.dataset.animated = 'true'; animateCounter(el); }
      });
    }
  });
}, { threshold: 0.3 });
const aboutSection = document.getElementById('sobre');
if (aboutSection) counterObserver.observe(aboutSection);

/*phone*/
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', (e) => {
  let v = e.target.value.replace(/\D/g, '').slice(0, 11);
  if (v.length > 10) {
    v = v.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  } else if (v.length > 6) {
    v = v.replace(/^(\d{2})(\d{4})(\d*)$/, '($1) $2-$3');
  } else if (v.length > 2) {
    v = v.replace(/^(\d{2})(\d*)$/, '($1) $2');
  }
  e.target.value = v;
});
phoneInput.addEventListener('keypress', (e) => {
  if (!/[\d]/.test(e.key) && !['Backspace','Delete','Tab','ArrowLeft','ArrowRight'].includes(e.key)) {
    e.preventDefault();
  }
});

/*e-mail*/
const emailInput = document.getElementById('email');
const emailHint  = document.getElementById('email-hint');

function validateEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val.trim());
}

emailInput.addEventListener('blur', () => {
  const v = emailInput.value.trim();
  if (v === '') { emailHint.textContent = ''; emailHint.className = 'field-hint'; return; }
  if (!validateEmail(v)) {
    emailInput.classList.add('field-error');
    emailHint.textContent = '⚠ Digite um e-mail válido. Ex: nome@dominio.com';
    emailHint.className = 'field-hint error';
  } else {
    emailInput.classList.remove('field-error');
    emailHint.textContent = '✓ E-mail válido';
    emailHint.className = 'field-hint';
    emailHint.style.color = '#16a34a';
  }
});

emailInput.addEventListener('input', () => {
  if (emailInput.classList.contains('field-error') && validateEmail(emailInput.value.trim())) {
    emailInput.classList.remove('field-error');
    emailHint.textContent = '';
    emailHint.className = 'field-hint';
  }
});

/*form*/
const form   = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Validação client-side
  const emailVal = emailInput.value.trim();
  if (!validateEmail(emailVal)) {
    emailInput.classList.add('field-error');
    emailHint.textContent = '⚠ Digite um e-mail válido antes de enviar.';
    emailHint.className = 'field-hint error';
    emailInput.focus();
    return;
  }

  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' },
    });
    if (res.ok) {
      status.className = 'form-status success';
      status.textContent = '✅ Mensagem enviada! Retorno em até 24h.';
      form.reset();
      emailHint.textContent = '';
    } else {
      throw new Error();
    }
  } catch {
    status.className = 'form-status error';
    status.textContent = '❌ Algo deu errado. Tente pelo WhatsApp ou e-mail.';
  }
  btn.textContent = 'Enviar Mensagem ✉️';
  btn.disabled = false;
});

/*cookie*/
const cookieBanner = document.getElementById('cookie-banner');
const COOKIE_KEY = 'renn_cookie_consent';

function showCookieBanner() {
  setTimeout(() => cookieBanner.classList.add('visible'), 1200);
}
function hideCookieBanner() {
  cookieBanner.classList.remove('visible');
  setTimeout(() => cookieBanner.style.display = 'none', 500);
}

if (!localStorage.getItem(COOKIE_KEY)) {
  showCookieBanner();
}

document.getElementById('cookie-accept').addEventListener('click', () => {
  localStorage.setItem(COOKIE_KEY, 'all');
  hideCookieBanner();
});
document.getElementById('cookie-reject').addEventListener('click', () => {
  localStorage.setItem(COOKIE_KEY, 'essential');
  hideCookieBanner();
});