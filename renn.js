/* ─── GALAXY ─── */
function initGalaxy(canvasId, opts = {}) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const section = canvas.parentElement;
  let stars = [], nebula = [], shootingStars = [];
  const cfg = { starCount: opts.starCount || 180, nebulaCount: opts.nebulaCount || 6, shootingFreq: opts.shootingFreq || 0.004 };
  function resize() { canvas.width = section.offsetWidth; canvas.height = section.offsetHeight; }
  function randomStar() { return { x: Math.random()*canvas.width, y: Math.random()*canvas.height, r: Math.random()*1.4+0.2, alpha: Math.random()*0.7+0.15, speed: Math.random()*0.004+0.001, phase: Math.random()*Math.PI*2 }; }
  function randomNebula() { const colors = ['rgba(74,144,226,','rgba(26,51,112,','rgba(58,123,213,','rgba(100,160,240,']; return { x: Math.random()*canvas.width, y: Math.random()*canvas.height, r: Math.random()*140+60, color: colors[Math.floor(Math.random()*colors.length)], alpha: Math.random()*0.07+0.02 }; }
  function init() { resize(); stars = Array.from({length:cfg.starCount}, randomStar); nebula = Array.from({length:cfg.nebulaCount}, randomNebula); }
  function spawnShooter() { shootingStars.push({ x: Math.random()*canvas.width*0.7, y: Math.random()*canvas.height*0.4, len: Math.random()*80+40, speed: Math.random()*6+4, alpha: 1, angle: Math.PI/5 }); }
  let t = 0;
  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    nebula.forEach(n => { const g=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r); g.addColorStop(0,n.color+n.alpha+')'); g.addColorStop(1,n.color+'0)'); ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2); ctx.fillStyle=g; ctx.fill(); });
    stars.forEach(s => { const pulse=s.alpha+Math.sin(t*s.speed+s.phase)*0.18; ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fillStyle=`rgba(200,220,255,${Math.max(0,Math.min(1,pulse))})`; ctx.fill(); });
    if (Math.random()<cfg.shootingFreq) spawnShooter();
    shootingStars = shootingStars.filter(ss=>ss.alpha>0.02);
    shootingStars.forEach(ss => { const dx=Math.cos(ss.angle)*ss.len,dy=Math.sin(ss.angle)*ss.len; const g2=ctx.createLinearGradient(ss.x,ss.y,ss.x+dx,ss.y+dy); g2.addColorStop(0,`rgba(255,255,255,${ss.alpha})`); g2.addColorStop(1,'rgba(255,255,255,0)'); ctx.beginPath(); ctx.moveTo(ss.x,ss.y); ctx.lineTo(ss.x+dx,ss.y+dy); ctx.strokeStyle=g2; ctx.lineWidth=1.5; ctx.stroke(); ss.x+=Math.cos(ss.angle)*ss.speed; ss.y+=Math.sin(ss.angle)*ss.speed; ss.alpha-=0.018; });
    t+=0.016; requestAnimationFrame(draw);
  }
  window.addEventListener('resize', ()=>{ resize(); nebula=Array.from({length:cfg.nebulaCount},randomNebula); });
  init(); draw();
}
initGalaxy('galaxy-hero',   { starCount:220, nebulaCount:7, shootingFreq:0.005 });
initGalaxy('galaxy-about',  { starCount:160, nebulaCount:5, shootingFreq:0.003 });
initGalaxy('galaxy-footer', { starCount:80,  nebulaCount:3, shootingFreq:0.002 });
initGalaxy('galaxy-cookie', { starCount:60,  nebulaCount:3, shootingFreq:0.002 });

/* ─── NAVBAR ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', ()=>{ navbar.classList.toggle('scrolled', window.scrollY>60); }, {passive:true});

/* ─── REVEAL ─── */
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); revealObserver.unobserve(e.target); } });
}, {threshold:0.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

/* ─── SKILLS CAROUSEL ─── */
const row1 = [
  {label:'HTML5',      icon:'<i class="fa-brands fa-html5" style="color:#e34f26"></i>'},
  {label:'CSS3',       icon:'<i class="fa-brands fa-css3-alt" style="color:#1572b6"></i>'},
  {label:'JavaScript', icon:'<i class="devicon-javascript-plain" style="color:#f7df1e"></i>'},
  {label:'React',      icon:'<i class="devicon-react-original" style="color:#61dafb"></i>'},
  {label:'TypeScript', icon:'<i class="devicon-typescript-plain" style="color:#3178c6"></i>'},
  {label:'Node.js',    icon:'<i class="devicon-nodejs-plain" style="color:#68a063"></i>'},
];
const row2 = [
  {label:'Next.js', icon:'<i class="devicon-nextjs-plain" style="color:#fff"></i>'},
  {label:'Python',  icon:'<i class="devicon-python-plain" style="color:#3776ab"></i>'},
  {label:'Figma',   icon:'<i class="devicon-figma-plain" style="color:#f24e1e"></i>'},
  {label:'Git',     icon:'<i class="devicon-git-plain" style="color:#f05032"></i>'},
  {label:'MySQL',   icon:'<i class="devicon-mysql-plain" style="color:#4479a1"></i>'},
  {label:'SEO',     icon:'<i class="fa-solid fa-magnifying-glass" style="color:#4a90e2"></i>'},
];
function buildTrack(id, skills) {
  const el = document.getElementById(id);
  if (!el) return;
  const items = [...skills,...skills,...skills,...skills];
  el.innerHTML = items.map(s=>`<div class="skill-pill">${s.icon}<span>${s.label}</span></div>`).join('');
}
buildTrack('track-1', row1);
buildTrack('track-2', row2);

/* ─── COUNTER ─── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  if (target === 0 && suffix === '∞') { el.textContent = '∞'; return; }
  const duration=1800, steps=60, stepTime=duration/steps;
  let current=0;
  const timer=setInterval(()=>{ current+=Math.ceil(target/steps); if(current>=target){current=target;clearInterval(timer);} el.textContent=current+suffix; }, stepTime);
}
const counterObserver = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.currentTarget.querySelectorAll('.stat-box .num[data-target]').forEach(el=>{ if(!el.dataset.animated){el.dataset.animated='true';animateCounter(el);} }); } });
}, {threshold:0.3});
const aboutSection = document.getElementById('sobre');
if (aboutSection) counterObserver.observe(aboutSection);

/* ─── PHONE MASK ─── */
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', (e)=>{
  let v=e.target.value.replace(/\D/g,'').slice(0,11);
  if(v.length>10) v=v.replace(/^(\d{2})(\d{5})(\d{4})$/,'($1) $2-$3');
  else if(v.length>6) v=v.replace(/^(\d{2})(\d{4})(\d*)$/,'($1) $2-$3');
  else if(v.length>2) v=v.replace(/^(\d{2})(\d*)$/,'($1) $2');
  e.target.value=v;
});
phoneInput.addEventListener('keypress', (e)=>{ if(!/[\d]/.test(e.key)&&!['Backspace','Delete','Tab','ArrowLeft','ArrowRight'].includes(e.key)) e.preventDefault(); });

/* ─── EMAIL VALIDATION ─── */
const emailInput = document.getElementById('email');
const emailHint  = document.getElementById('email-hint');
function validateEmail(val) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val.trim()); }
emailInput.addEventListener('blur', ()=>{
  const v=emailInput.value.trim();
  if(v===''){emailHint.textContent='';emailHint.className='field-hint';return;}
  if(!validateEmail(v)){emailInput.classList.add('field-error');emailHint.textContent='⚠ Digite um e-mail válido. Ex: nome@dominio.com';emailHint.className='field-hint error';}
  else{emailInput.classList.remove('field-error');emailHint.textContent='✓ E-mail válido';emailHint.className='field-hint';emailHint.style.color='#16a34a';}
});
emailInput.addEventListener('input', ()=>{
  if(emailInput.classList.contains('field-error')&&validateEmail(emailInput.value.trim())){emailInput.classList.remove('field-error');emailHint.textContent='';emailHint.className='field-hint';}
});

/* ─── CONTACT FORM ─── */
const form   = document.getElementById('contact-form');
const status = document.getElementById('form-status');
form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const emailVal=emailInput.value.trim();
  if(!validateEmail(emailVal)){emailInput.classList.add('field-error');emailHint.textContent='⚠ Digite um e-mail válido antes de enviar.';emailHint.className='field-hint error';emailInput.focus();return;}
  const btn=form.querySelector('button[type="submit"]');
  btn.textContent='Enviando...'; btn.disabled=true;
  try {
    const res=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{'Accept':'application/json'}});
    if(res.ok){status.className='form-status success';status.textContent='✅ Mensagem enviada! Retorno em até 24h.';form.reset();emailHint.textContent='';}
    else throw new Error();
  } catch {
    status.className='form-status error';
    status.textContent='❌ Algo deu errado. Tente pelo WhatsApp ou e-mail.';
  }
  btn.textContent='Enviar Mensagem ✉️'; btn.disabled=false;
});

/* ─── COOKIE ─── */
const cookieBanner=document.getElementById('cookie-banner');
const COOKIE_KEY='renn_cookie_consent';
function showCookieBanner(){setTimeout(()=>cookieBanner.classList.add('visible'),1200);}
function hideCookieBanner(){cookieBanner.classList.remove('visible');setTimeout(()=>cookieBanner.style.display='none',500);}
if(!localStorage.getItem(COOKIE_KEY)) showCookieBanner();
document.getElementById('cookie-accept').addEventListener('click',()=>{localStorage.setItem(COOKIE_KEY,'all');hideCookieBanner();});
document.getElementById('cookie-reject').addEventListener('click',()=>{localStorage.setItem(COOKIE_KEY,'essential');hideCookieBanner();});

/* ═══════════════════════════════════════════
   BACK TO TOP
═══════════════════════════════════════════ */
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', ()=>{
  backToTop.classList.toggle('visible', window.scrollY > 400);
}, {passive:true});
backToTop.addEventListener('click', (e)=>{
  e.preventDefault();
  window.scrollTo({top:0, behavior:'smooth'});
});

/* ═══════════════════════════════════════════
   BUDGET CALCULATOR
═══════════════════════════════════════════ */
(function(){
  let selectedType = { priceMin:800, priceMax:1800, days:7 };
  let pages = 3;
  let urgencyMult = 1;
  const selectedExtras = new Set();

  const baseFeatures = {
    landing:       ['Design responsivo','Código limpo','Formulário de contato','Suporte pós-entrega'],
    institutional: ['Design responsivo','Múltiplas páginas','Blog opcional','SEO básico','Suporte pós-entrega'],
    ecommerce:     ['Design responsivo','Catálogo de produtos','Checkout integrado','Painel de pedidos','SEO básico','Suporte pós-entrega'],
    blog:          ['Design responsivo','CMS fácil de usar','Categorias e tags','SEO básico','Suporte pós-entrega'],
  };

  function updateCalc() {
    const pageMultMin = 1 + (pages - 1) * 0.08;
    const pageMultMax = 1 + (pages - 1) * 0.1;
    let extrasTotal = 0;
    selectedExtras.forEach(k => {
      const el = document.querySelector(`[data-extra="${k}"]`);
      if (el) extrasTotal += parseInt(el.dataset.extraPrice);
    });

    const rawMin = Math.round((selectedType.priceMin * pageMultMin + extrasTotal) * urgencyMult / 50) * 50;
    const rawMax = Math.round((selectedType.priceMax * pageMultMax + extrasTotal) * urgencyMult / 50) * 50;

    document.getElementById('calc-price-display').innerHTML =
      `R$ ${rawMin.toLocaleString('pt-BR')} <span>– R$ ${rawMax.toLocaleString('pt-BR')}</span>`;

    const deadline = Math.round(selectedType.days / (urgencyMult === 1.5 ? 2 : urgencyMult === 1.25 ? 1.5 : 1));
    document.getElementById('calc-deadline-badge').textContent = `⏱ Prazo estimado: ${deadline} dias úteis`;

    // features
    const typeKey = document.querySelector('#calc-type .selected')?.dataset.value || 'landing';
    let feats = [...(baseFeatures[typeKey] || [])];
    if (selectedExtras.has('seo')) feats = feats.map(f => f === 'SEO básico' ? 'SEO avançado' : f);
    if (selectedExtras.has('analytics') && !feats.includes('Google Analytics')) feats.push('Google Analytics');
    if (selectedExtras.has('chat') && !feats.includes('Chat WhatsApp')) feats.push('Chat WhatsApp');
    if (selectedExtras.has('copywriting') && !feats.includes('Copywriting profissional')) feats.push('Copywriting profissional');
    if (selectedExtras.has('multilang') && !feats.includes('Versão bilíngue')) feats.push('Versão bilíngue');

    document.getElementById('calc-features-list').innerHTML =
      feats.map(f=>`<span class="calc-feature-tag">✓ ${f}</span>`).join('');
  }

  // Type selection
  document.querySelectorAll('#calc-type .calc-option').forEach(btn => {
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('#calc-type .calc-option').forEach(b=>b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedType = { priceMin: parseInt(btn.dataset.priceMin), priceMax: parseInt(btn.dataset.priceMax), days: parseInt(btn.dataset.days) };
      updateCalc();
    });
  });

  // Pages slider
  const slider = document.getElementById('pages-slider');
  slider.addEventListener('input', ()=>{
    pages = parseInt(slider.value);
    const pct = ((pages - 1) / 14 * 100).toFixed(1);
    slider.style.setProperty('--pct', pct + '%');
    document.getElementById('pages-display').textContent = pages === 15 ? '15+ páginas' : `${pages} página${pages > 1 ? 's' : ''}`;
    updateCalc();
  });

  // Extras (multi-select)
  document.querySelectorAll('#calc-extras .calc-option').forEach(btn => {
    btn.addEventListener('click', ()=>{
      const key = btn.dataset.extra;
      if (selectedExtras.has(key)) { selectedExtras.delete(key); btn.classList.remove('selected'); }
      else { selectedExtras.add(key); btn.classList.add('selected'); }
      updateCalc();
    });
  });

  // Urgency
  document.querySelectorAll('#calc-urgency .calc-option').forEach(btn => {
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('#calc-urgency .calc-option').forEach(b=>b.classList.remove('selected'));
      btn.classList.add('selected');
      urgencyMult = parseFloat(btn.dataset.urgencyMult);
      updateCalc();
    });
  });

  updateCalc();
})();

/* ═══════════════════════════════════════════
   CHATBOT PRE-QUALIFICATION
═══════════════════════════════════════════ */
(function(){
  const chatFab     = document.getElementById('chat-fab');
  const chatFabIcon = document.getElementById('chat-fab-icon');
  const chatWindow  = document.getElementById('chat-window');
  const closeBtn    = document.getElementById('chat-close');
  const messagesEl  = document.getElementById('chat-messages');
  const choicesEl   = document.getElementById('chat-choices');

  let isOpen = false;
  let step = 0;
  const userData = {};

  const DELAY_BOT = 700;

  const flow = [
    // step 0 — greeting
    {
      bot: 'Olá! 👋 Sou o assistente da renn.dev. Vou te ajudar a montar o briefing do seu projeto em menos de 2 minutos!',
      choices: null,
      next: 1,
    },
    // step 1 — tipo de negócio
    {
      bot: 'Qual é o segmento do seu negócio?',
      choices: ['🛒 E-commerce','🏢 Empresa/Serviços','💡 Startup','🎨 Portfólio Pessoal','🍔 Alimentação','Outro'],
      field: 'segment',
      next: 2,
    },
    // step 2 — tipo de site
    {
      bot: 'Que tipo de site você precisa?',
      choices: ['⚡ Landing Page','🏗️ Site Institucional','🛒 Loja Virtual','📝 Blog'],
      field: 'siteType',
      next: 3,
    },
    // step 3 — prazo
    {
      bot: 'Qual é o prazo desejado para entrega?',
      choices: ['🚨 Urgente (até 1 semana)','⚡ Rápido (2-3 semanas)','🗓️ Tranquilo (1 mês+)','Ainda não definido'],
      field: 'deadline',
      next: 4,
    },
    // step 4 — budget
    {
      bot: 'Qual faixa de investimento está considerando?',
      choices: ['Até R$1.000','R$1.000 – R$3.000','R$3.000 – R$6.000','Acima de R$6.000','Ainda calculando'],
      field: 'budget',
      next: 5,
    },
    // step 5 — encerramento
    {
      bot: null, // dynamic
      choices: null,
      next: null,
    },
  ];

  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function addBubble(text, type, delay = 0) {
    return new Promise(resolve => {
      setTimeout(()=>{
        const div = document.createElement('div');
        div.className = `chat-bubble ${type}`;
        div.textContent = text;
        messagesEl.appendChild(div);
        scrollToBottom();
        resolve();
      }, delay);
    });
  }

  function showTyping() {
    const el = document.createElement('div');
    el.className = 'chat-typing';
    el.id = 'chat-typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    messagesEl.appendChild(el);
    scrollToBottom();
  }

  function removeTyping() {
    const el = document.getElementById('chat-typing');
    if (el) el.remove();
  }

  function showChoices(choices) {
    choicesEl.innerHTML = '';
    choicesEl.classList.remove('hidden');
    choices.forEach(c => {
      const btn = document.createElement('button');
      btn.className = 'chat-choice';
      btn.textContent = c;
      btn.addEventListener('click', () => handleChoice(c));
      choicesEl.appendChild(btn);
    });
  }

  async function handleChoice(choice) {
    choicesEl.classList.add('hidden');
    choicesEl.innerHTML = '';

    // record user answer
    const currentStep = flow[step];
    if (currentStep.field) userData[currentStep.field] = choice;
    await addBubble(choice, 'user');

    step = currentStep.next;

    if (step === null || step >= flow.length) {
      endFlow(); return;
    }

    if (step === 5) {
      endFlow(); return;
    }

    // next bot message
    showTyping();
    setTimeout(async ()=>{
      removeTyping();
      const nextStep = flow[step];
      await addBubble(nextStep.bot, 'bot');
      if (nextStep.choices) showChoices(nextStep.choices);
      else { step = nextStep.next; }
    }, DELAY_BOT);
  }

  async function endFlow() {
    const waMsg = `Olá Enzo! Vim pelo site e já preenchi o briefing rápido:\n\n` +
      `• Segmento: ${userData.segment || '—'}\n` +
      `• Tipo de site: ${userData.siteType || '—'}\n` +
      `• Prazo: ${userData.deadline || '—'}\n` +
      `• Investimento: ${userData.budget || '—'}\n\n` +
      `Podemos conversar?`;

    showTyping();
    await new Promise(r => setTimeout(r, DELAY_BOT));
    removeTyping();
    await addBubble(`Ótimo! 🎉 Com base no que me contou, posso te passar uma proposta personalizada. Vou te conectar agora com o Enzo!`, 'bot');

    setTimeout(()=>{
      const div = document.createElement('div');
      div.style.cssText = 'padding:.5rem 1rem 1rem;';
      div.innerHTML = `
        <a href="https://wa.me/5519998817310?text=${encodeURIComponent(waMsg)}" target="_blank"
           style="display:flex;align-items:center;gap:.5rem;background:#25d366;color:#fff;padding:.6rem 1.1rem;border-radius:8px;font-size:.85rem;font-weight:700;text-decoration:none;justify-content:center;">
          <i class="fa-brands fa-whatsapp"></i> Falar com Enzo no WhatsApp
        </a>`;
      messagesEl.appendChild(div);
      scrollToBottom();
    }, 600);
  }

  async function startChat() {
    if (messagesEl.children.length > 0) return; // already started
    step = 0;
    showTyping();
    setTimeout(async ()=>{
      removeTyping();
      const s0 = flow[0];
      await addBubble(s0.bot, 'bot');
      step = s0.next;
      showTyping();
      setTimeout(async ()=>{
        removeTyping();
        const s1 = flow[1];
        await addBubble(s1.bot, 'bot');
        showChoices(s1.choices);
      }, DELAY_BOT);
    }, DELAY_BOT);
  }

  function toggleChat() {
    isOpen = !isOpen;
    chatWindow.classList.toggle('open', isOpen);
    chatFabIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-comment-dots';
    if (isOpen) startChat();
  }

  chatFab.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', ()=>{ isOpen=false; chatWindow.classList.remove('open'); chatFabIcon.className='fa-solid fa-comment-dots'; });
})();