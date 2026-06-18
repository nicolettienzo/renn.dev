/* ─── PROGRESS SCROLL BAR ─── */
(function(){
  const bar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', function(){
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
})();

(function(){
  const btn     = document.getElementById('hamburger');
  const drawer  = document.getElementById('mobile-nav');
  const overlay = document.getElementById('nav-overlay');

  // Exibir overlay (estava display:none no CSS)
  overlay.style.display = 'block';

  function closeMenu() {
    btn.classList.remove('open');
    drawer.classList.remove('open');
    overlay.classList.remove('visible');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', function(){
    const isOpen = drawer.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    overlay.classList.toggle('visible', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  overlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
})();

/* ─── GALAXY ─── */
function initGalaxy(canvasId, opts) {
  opts = opts || {};
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
  var t = 0;
  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    nebula.forEach(function(n){ var g=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r); g.addColorStop(0,n.color+n.alpha+')'); g.addColorStop(1,n.color+'0)'); ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2); ctx.fillStyle=g; ctx.fill(); });
    stars.forEach(function(s){ var pulse=s.alpha+Math.sin(t*s.speed+s.phase)*0.18; ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fillStyle='rgba(200,220,255,'+Math.max(0,Math.min(1,pulse))+')'; ctx.fill(); });
    if (Math.random()<cfg.shootingFreq) spawnShooter();
    shootingStars = shootingStars.filter(function(ss){return ss.alpha>0.02;});
    shootingStars.forEach(function(ss){ var dx=Math.cos(ss.angle)*ss.len,dy=Math.sin(ss.angle)*ss.len; var g2=ctx.createLinearGradient(ss.x,ss.y,ss.x+dx,ss.y+dy); g2.addColorStop(0,'rgba(255,255,255,'+ss.alpha+')'); g2.addColorStop(1,'rgba(255,255,255,0)'); ctx.beginPath(); ctx.moveTo(ss.x,ss.y); ctx.lineTo(ss.x+dx,ss.y+dy); ctx.strokeStyle=g2; ctx.lineWidth=1.5; ctx.stroke(); ss.x+=Math.cos(ss.angle)*ss.speed; ss.y+=Math.sin(ss.angle)*ss.speed; ss.alpha-=0.018; });
    t+=0.016; requestAnimationFrame(draw);
  }
  window.addEventListener('resize', function(){ resize(); nebula=Array.from({length:cfg.nebulaCount},randomNebula); });
  init(); draw();
}
initGalaxy('galaxy-hero',   { starCount:220, nebulaCount:7, shootingFreq:0.005 });
initGalaxy('galaxy-about',  { starCount:160, nebulaCount:5, shootingFreq:0.003 });
initGalaxy('galaxy-footer', { starCount:80,  nebulaCount:3, shootingFreq:0.002 });
initGalaxy('galaxy-cookie', { starCount:60,  nebulaCount:3, shootingFreq:0.002 });

/* ─── NAVBAR SCROLL ─── */
var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function(){ navbar.classList.toggle('scrolled', window.scrollY>60); }, {passive:true});

/* ─── REVEAL ─── */
var revealObserver = new IntersectionObserver(function(entries){
  entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('visible'); revealObserver.unobserve(e.target); } });
}, {threshold:0.12});
document.querySelectorAll('.reveal').forEach(function(el){ revealObserver.observe(el); });

/* ─── SKILLS CAROUSEL ─── */
var row1 = [
  {label:'HTML5',      icon:'<i class="fa-brands fa-html5" style="color:#e34f26"></i>'},
  {label:'CSS3',       icon:'<i class="fa-brands fa-css3-alt" style="color:#1572b6"></i>'},
  {label:'JavaScript', icon:'<i class="devicon-javascript-plain" style="color:#f7df1e"></i>'},
  {label:'React',      icon:'<i class="devicon-react-original" style="color:#61dafb"></i>'},
  {label:'TypeScript', icon:'<i class="devicon-typescript-plain" style="color:#3178c6"></i>'},
  {label:'Node.js',    icon:'<i class="devicon-nodejs-plain" style="color:#68a063"></i>'},
];
var row2 = [
  {label:'Next.js', icon:'<i class="devicon-nextjs-plain" style="color:#fff"></i>'},
  {label:'Python',  icon:'<i class="devicon-python-plain" style="color:#3776ab"></i>'},
  {label:'Figma',   icon:'<i class="devicon-figma-plain" style="color:#f24e1e"></i>'},
  {label:'Git',     icon:'<i class="devicon-git-plain" style="color:#f05032"></i>'},
  {label:'MySQL',   icon:'<i class="devicon-mysql-plain" style="color:#4479a1"></i>'},
  {label:'SEO',     icon:'<i class="fa-solid fa-magnifying-glass" style="color:#4a90e2"></i>'},
];
function buildTrack(id, skills) {
  var el = document.getElementById(id);
  if (!el) return;
  var items = skills.concat(skills).concat(skills).concat(skills);
  el.innerHTML = items.map(function(s){ return '<div class="skill-pill">'+s.icon+'<span>'+s.label+'</span></div>'; }).join('');
}
buildTrack('track-1', row1);
buildTrack('track-2', row2);

/* ─── PHONE MASK ─── */
var phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', function(e){
  var v=e.target.value.replace(/\D/g,'').slice(0,11);
  if(v.length>10) v=v.replace(/^(\d{2})(\d{5})(\d{4})$/,'($1) $2-$3');
  else if(v.length>6) v=v.replace(/^(\d{2})(\d{4})(\d*)$/,'($1) $2-$3');
  else if(v.length>2) v=v.replace(/^(\d{2})(\d*)$/,'($1) $2');
  e.target.value=v;
});

/* ─── EMAIL VALIDATION ─── */
var emailInput = document.getElementById('email');
var emailHint  = document.getElementById('email-hint');
function validateEmail(val) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val.trim()); }
emailInput.addEventListener('blur', function(){
  var v=emailInput.value.trim();
  if(v===''){emailHint.textContent='';emailHint.className='field-hint';return;}
  if(!validateEmail(v)){emailInput.classList.add('field-error');emailHint.textContent='⚠ Digite um e-mail válido. Ex: nome@dominio.com';emailHint.className='field-hint error';}
  else{emailInput.classList.remove('field-error');emailHint.textContent='✓ E-mail válido';emailHint.className='field-hint';emailHint.style.color='#16a34a';}
});
emailInput.addEventListener('input', function(){
  if(emailInput.classList.contains('field-error')&&validateEmail(emailInput.value.trim())){emailInput.classList.remove('field-error');emailHint.textContent='';emailHint.className='field-hint';}
});

/* ─── CONTACT FORM ─── */
var form   = document.getElementById('contact-form');
var status = document.getElementById('form-status');
form.addEventListener('submit', async function(e){
  e.preventDefault();
  var emailVal=emailInput.value.trim();
  if(!validateEmail(emailVal)){emailInput.classList.add('field-error');emailHint.textContent='⚠ Digite um e-mail válido antes de enviar.';emailHint.className='field-hint error';emailInput.focus();return;}
  var btn=form.querySelector('button[type="submit"]');
  btn.textContent='Enviando...'; btn.disabled=true;
  try {
    var res=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{'Accept':'application/json'}});
    if(res.ok){status.className='form-status success';status.textContent='✅ Mensagem enviada! Retorno em até 24h.';form.reset();emailHint.textContent='';}
    else throw new Error();
  } catch(err) {
    status.className='form-status error';
    status.textContent='❌ Algo deu errado. Tente pelo WhatsApp ou e-mail.';
  }
  btn.textContent='Enviar Mensagem'; btn.disabled=false;
});

/* ─── COOKIE ─── */
var cookieBanner=document.getElementById('cookie-banner');
var COOKIE_KEY='renn_cookie_consent';
function showCookieBanner(){setTimeout(function(){cookieBanner.classList.add('visible');},1200);}
function hideCookieBanner(){cookieBanner.classList.remove('visible');setTimeout(function(){cookieBanner.style.display='none';},500);}
if(!localStorage.getItem(COOKIE_KEY)) showCookieBanner();
document.getElementById('cookie-accept').addEventListener('click',function(){localStorage.setItem(COOKIE_KEY,'all');hideCookieBanner();});
document.getElementById('cookie-reject').addEventListener('click',function(){localStorage.setItem(COOKIE_KEY,'essential');hideCookieBanner();});

/* ─── BACK TO TOP ─── */
var backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', function(){
  backToTop.classList.toggle('visible', window.scrollY > 400);
}, {passive:true});
backToTop.addEventListener('click', function(e){
  e.preventDefault();
  window.scrollTo({top:0, behavior:'smooth'});
});

/* ═══════════════════════════════════════════
   BUDGET CALCULATOR
═══════════════════════════════════════════ */
(function(){
  var selectedType = { priceMin:800, priceMax:1800, days:7 };
  var pages = 3;
  var urgencyMult = 1;
  var selectedExtras = new Set();

  var baseFeatures = {
    landing:       ['Design responsivo','Código limpo','Formulário de contato','Suporte pós-entrega'],
    institutional: ['Design responsivo','Múltiplas páginas','Blog opcional','SEO básico','Suporte pós-entrega'],
    ecommerce:     ['Design responsivo','Catálogo de produtos','Checkout integrado','Painel de pedidos','SEO básico','Suporte pós-entrega'],
    blog:          ['Design responsivo','CMS fácil de usar','Categorias e tags','SEO básico','Suporte pós-entrega'],
  };

  function updateCalc() {
    var pageMultMin = 1 + (pages - 1) * 0.08;
    var pageMultMax = 1 + (pages - 1) * 0.1;
    var extrasTotal = 0;
    selectedExtras.forEach(function(k){
      var el = document.querySelector('[data-extra="'+k+'"]');
      if (el) extrasTotal += parseInt(el.dataset.extraPrice);
    });
    var rawMin = Math.round((selectedType.priceMin * pageMultMin + extrasTotal) * urgencyMult / 50) * 50;
    var rawMax = Math.round((selectedType.priceMax * pageMultMax + extrasTotal) * urgencyMult / 50) * 50;
    document.getElementById('calc-price-display').innerHTML = 'R$ '+rawMin.toLocaleString('pt-BR')+' <span>– R$ '+rawMax.toLocaleString('pt-BR')+'</span>';
    var deadline = Math.round(selectedType.days / (urgencyMult === 1.5 ? 2 : urgencyMult === 1.25 ? 1.5 : 1));
    document.getElementById('calc-deadline-badge').textContent = '⏱ Prazo estimado: '+deadline+' dias úteis';
    var typeKey = (document.querySelector('#calc-type .selected') || {dataset:{}}).dataset.value || 'landing';
    var feats = (baseFeatures[typeKey] || []).slice();
    if (selectedExtras.has('seo')) feats = feats.map(function(f){ return f === 'SEO básico' ? 'SEO avançado' : f; });
    if (selectedExtras.has('analytics') && feats.indexOf('Google Analytics')===-1) feats.push('Google Analytics');
    if (selectedExtras.has('chat') && feats.indexOf('Chat WhatsApp')===-1) feats.push('Chat WhatsApp');
    if (selectedExtras.has('copywriting') && feats.indexOf('Copywriting profissional')===-1) feats.push('Copywriting profissional');
    if (selectedExtras.has('multilang') && feats.indexOf('Versão bilíngue')===-1) feats.push('Versão bilíngue');
    document.getElementById('calc-features-list').innerHTML = feats.map(function(f){ return '<span class="calc-feature-tag">✓ '+f+'</span>'; }).join('');
  }

  document.querySelectorAll('#calc-type .calc-option').forEach(function(btn){
    btn.addEventListener('click', function(){
      document.querySelectorAll('#calc-type .calc-option').forEach(function(b){ b.classList.remove('selected'); });
      btn.classList.add('selected');
      selectedType = { priceMin: parseInt(btn.dataset.priceMin), priceMax: parseInt(btn.dataset.priceMax), days: parseInt(btn.dataset.days) };
      updateCalc();
    });
  });

  var slider = document.getElementById('pages-slider');
  slider.addEventListener('input', function(){
    pages = parseInt(slider.value);
    var pct = ((pages - 1) / 14 * 100).toFixed(1);
    slider.style.setProperty('--pct', pct + '%');
    document.getElementById('pages-display').textContent = pages === 15 ? '15+ páginas' : pages+' página'+(pages > 1 ? 's' : '');
    updateCalc();
  });

  document.querySelectorAll('#calc-extras .calc-option').forEach(function(btn){
    btn.addEventListener('click', function(){
      var key = btn.dataset.extra;
      if (selectedExtras.has(key)) { selectedExtras.delete(key); btn.classList.remove('selected'); }
      else { selectedExtras.add(key); btn.classList.add('selected'); }
      updateCalc();
    });
  });

  document.querySelectorAll('#calc-urgency .calc-option').forEach(function(btn){
    btn.addEventListener('click', function(){
      document.querySelectorAll('#calc-urgency .calc-option').forEach(function(b){ b.classList.remove('selected'); });
      btn.classList.add('selected');
      urgencyMult = parseFloat(btn.dataset.urgencyMult);
      updateCalc();
    });
  });

  updateCalc();
})();

/* ═══════════════════════════════════════════
   FAQ CHATBOT
═══════════════════════════════════════════ */
(function(){
  var chatFab      = document.getElementById('chat-fab');
  var chatFabIcon  = document.getElementById('chat-fab-icon');
  var chatWindow   = document.getElementById('chat-window');
  var closeBtn     = document.getElementById('chat-close');
  var messagesEl   = document.getElementById('chat-messages');
  var faqGridEl    = document.getElementById('chat-faq-grid');
  var inputArea    = document.getElementById('chat-input-area');
  var customInput  = document.getElementById('chat-custom-input');
  var sendBtn      = document.getElementById('chat-send-btn');

  var isOpen = false;
  var started = false;
  var DELAY = 600;
  var WA_NUMBER = '5519998817310';

  // FAQ data
  var faqs = [
    {
      q: '💰 Quanto custa um site?',
      a: 'Os valores variam conforme o projeto:\n• Landing Page: R$800 – R$1.800\n• Site Institucional: R$1.500 – R$3.500\n• Loja Virtual: R$3.000 – R$7.000\n\nUse o simulador de orçamento na seção acima para uma estimativa mais precisa! 👆'
    },
    {
      q: '⏱ Qual o prazo de entrega?',
      a: 'Os prazos típicos são:\n• Landing Page: ~7 dias úteis\n• Site Institucional: ~14 dias úteis\n• Loja Virtual: ~30 dias úteis\n\nProjetos urgentes têm prazo reduzido com taxa adicional de 25% a 50%.'
    },
    {
      q: '📱 O site funciona no celular?',
      a: 'Sim! Todos os projetos são 100% responsivos — funcionam perfeitamente em celulares, tablets e computadores. Design mobile-first é padrão em todo trabalho. 📲'
    },
    {
      q: '🔍 Vocês fazem SEO?',
      a: 'Sim! Todo site já sai com SEO técnico básico incluído (meta tags, estrutura semântica, velocidade). Otimização SEO avançada é um serviço adicional que inclui pesquisa de palavras-chave, conteúdo otimizado e relatórios.'
    },
    {
      q: '🔧 Fazem manutenção de site existente?',
      a: 'Sim, fazemos! Atualização de conteúdo, correção de bugs, melhorias de performance, redesign parcial ou total. Entre em contato descrevendo o que precisa e a gente avalia. 🤝'
    },
    {
      q: '💳 Quais formas de pagamento?',
      a: 'Trabalhamos com Pix, transferência bancária e parcelamento via cartão em alguns casos. Geralmente é 50% no início e 50% na entrega. Combine os detalhes diretamente com o Enzo!'
    },
    {
      q: '🌐 Vocês registram domínio e hospedagem?',
      a: 'Orientamos e auxiliamos no processo, mas domínio e hospedagem ficam no nome e conta do cliente — assim você tem total controle e independência do seu site.'
    },
    {
      q: '📞 Como funciona o suporte pós-entrega?',
      a: 'Todo projeto inclui um período de suporte gratuito para pequenos ajustes após a entrega. Para manutenção contínua, oferecemos planos mensais. Dúvidas e suporte básico sempre via WhatsApp! 💬'
    },
  ];

  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function addBubble(text, type, delay) {
    delay = delay || 0;
    return new Promise(function(resolve){
      setTimeout(function(){
        var div = document.createElement('div');
        div.className = 'chat-bubble ' + type;
        // Support line breaks in answers
        div.style.whiteSpace = 'pre-line';
        div.textContent = text;
        messagesEl.appendChild(div);
        scrollToBottom();
        resolve();
      }, delay);
    });
  }

  function showTyping() {
    var el = document.createElement('div');
    el.className = 'chat-typing';
    el.id = 'chat-typing-indicator';
    el.innerHTML = '<span></span><span></span><span></span>';
    messagesEl.appendChild(el);
    scrollToBottom();
  }

  function removeTyping() {
    var el = document.getElementById('chat-typing-indicator');
    if (el) el.remove();
  }

  function renderFaqButtons() {
    var grid = document.createElement('div');
    grid.className = 'chat-faq-grid';
    grid.id = 'chat-faq-grid-inner';
    faqs.forEach(function(faq, i){
      var btn = document.createElement('button');
      btn.className = 'chat-faq-btn';
      btn.innerHTML = '<span class="faq-emoji">' + faq.q.split(' ')[0] + '</span><span>' + faq.q.split(' ').slice(1).join(' ') + '</span>';
      btn.addEventListener('click', function(){ handleFaqClick(i); });
      grid.appendChild(btn);
    });
    messagesEl.appendChild(grid);
    scrollToBottom();
    return grid;
  }

  function handleFaqClick(i) {
    var faq = faqs[i];
    var grid = document.getElementById('chat-faq-grid-inner');
    if (grid) grid.remove();

    addBubble(faq.q, 'user').then(function(){
      showTyping();
      setTimeout(function(){
        removeTyping();
        addBubble(faq.a, 'bot').then(function(){
          // Show "back" option
          var backBtn = document.createElement('button');
          backBtn.className = 'chat-back-btn';
          backBtn.innerHTML = '← Ver outras perguntas';
          backBtn.addEventListener('click', function(){
          backBtn.remove();
          renderFaqButtons();
        });
          messagesEl.appendChild(backBtn);
          scrollToBottom();
        });
      }, DELAY);
    });
  }

  function sendCustomQuestion() {
    var text = customInput.value.trim();
    if (!text) return;
    customInput.value = '';
    var waMsg = 'Olá Enzo! Tenho uma dúvida sobre o site:\n\n"' + text + '"\n\nPode me ajudar?';
    addBubble(text, 'user');
    showTyping();
    setTimeout(function(){
      removeTyping();
      addBubble('Vou te conectar com o Enzo agora para responder sua dúvida! 👇', 'bot').then(function(){
        var div = document.createElement('div');
        div.style.cssText = 'padding:.4rem 1rem .75rem;';
        div.innerHTML = '<a href="https://wa.me/'+WA_NUMBER+'?text='+encodeURIComponent(waMsg)+'" target="_blank" style="display:flex;align-items:center;gap:.5rem;background:#25d366;color:#fff;padding:.6rem 1.1rem;border-radius:8px;font-size:.85rem;font-weight:700;text-decoration:none;justify-content:center;"><i class="fa-brands fa-whatsapp"></i> Enviar dúvida pelo WhatsApp</a>';
        messagesEl.appendChild(div);
        scrollToBottom();
      });
    }, DELAY);
  }

  function startChat() {
    if (started) return;
    started = true;
    showTyping();
    setTimeout(function(){
      removeTyping();
      addBubble('Olá! 👋 Sou o FAQ do renn.dev. Selecione uma dúvida abaixo ou escreva sua pergunta!', 'bot').then(function(){
        renderFaqButtons();
        scrollToBottom();
      });
    }, DELAY);
  }

  function toggleChat() {
    isOpen = !isOpen;
    chatWindow.classList.toggle('open', isOpen);
    chatFabIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-circle-question';
    if (isOpen) startChat();
  }

  chatFab.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', function(){
    isOpen = false;
    chatWindow.classList.remove('open');
    chatFabIcon.className = 'fa-solid fa-circle-question';
  });

  sendBtn.addEventListener('click', sendCustomQuestion);
  customInput.addEventListener('keydown', function(e){
    if (e.key === 'Enter') sendCustomQuestion();
  });
})();

/* ─── CUSTOM CURSOR ─── */
(function(){
  var dot  = document.getElementById('cursor-dot');
  var ring = document.getElementById('cursor-ring');
  if (!window.matchMedia('(pointer: fine)').matches) return;
  dot.style.display  = 'block';
  ring.style.display = 'block';
  var mouseX = -100, mouseY = -100;
  var ringX  = -100, ringY  = -100;
  document.addEventListener('mousemove', function(e){
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left = mouseX + 'px'; dot.style.top = mouseY + 'px';
  }, { passive: true });
  function animateRing(){
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();
  var hoverTargets = 'a, button, [role="button"], input, textarea, select, label, .service-card, .project-card, .contact-item, .skill-pill';
  document.addEventListener('mouseover', function(e){ if(e.target.closest(hoverTargets)) ring.classList.add('hovering'); });
  document.addEventListener('mouseout',  function(e){ if(e.target.closest(hoverTargets)) ring.classList.remove('hovering'); });
  document.addEventListener('mouseleave', function(){ dot.style.opacity='0'; ring.style.opacity='0'; });
  document.addEventListener('mouseenter', function(){ dot.style.opacity='1'; ring.style.opacity='1'; });
})();