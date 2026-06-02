// ============================================================
// WEBSITE BK KOMPREHENSIF - script.js
// Sri Nurhayati | NIM 2408093 | UPI 2026
// ============================================================

// ---------- NAVBAR SCROLL ----------
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ---------- HAMBURGER MENU ----------
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = mobileMenu.classList.contains('open') ? 'translateY(7px) rotate(45deg)' : '';
    spans[1].style.opacity = mobileMenu.classList.contains('open') ? '0' : '1';
    spans[2].style.transform = mobileMenu.classList.contains('open') ? 'translateY(-7px) rotate(-45deg)' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity = '';
      });
    });
  });
}

// ---------- CHATBOT ----------
function toggleChatbot() {
  const win = document.getElementById('chatbotWindow');
  if (!win) return;
  win.classList.toggle('open');
  const badge = document.querySelector('.cb-badge');
  if (win.classList.contains('open') && badge) badge.style.display = 'none';
}

const chatResponses = {
  'Ingin konseling': 'Untuk mendaftar konseling, silakan klik tombol <strong>Masuk Portal</strong> atau langsung ke bagian <strong>Layanan BK</strong>. Prosesnya mudah dan semua data Anda aman! 🔒',
  'Info kesehatan mental': 'Anda dapat menemukan artikel, tes self-assessment, dan ruang cerita anonim di bagian <strong>Kesehatan Mental & Wellbeing</strong>. Jika butuh bantuan segera, helpline 119 ext 8 selalu siap. 💙',
  'Informasi karier': 'Bagian <strong>Pengembangan Karier</strong> menyediakan eksplorasi minat, database kampus, info beasiswa, dan alumni corner. Yuk eksplorasi potensimu! 🎯',
  'Bantuan darurat': '🆘 Jika dalam kondisi darurat, segera hubungi:<br><strong>119 ext 8</strong> atau <strong>112</strong>. Kamu tidak sendirian, bantuan tersedia untukmu. ❤️',
};

function chatSelect(option) {
  const body = document.querySelector('.cw-body');
  if (!body) return;
  const opts = body.querySelector('.cw-options');
  if (opts) opts.remove();

  const userMsg = document.createElement('div');
  userMsg.className = 'cw-msg cw-user';
  userMsg.textContent = option;
  body.appendChild(userMsg);

  setTimeout(() => {
    const botMsg = document.createElement('div');
    botMsg.className = 'cw-msg cw-bot';
    botMsg.innerHTML = chatResponses[option] || 'Terima kasih atas pertanyaannya! Konselor kami siap membantu. Silakan gunakan portal untuk layanan lebih lanjut.';
    body.appendChild(botMsg);
    body.scrollTop = body.scrollHeight;
  }, 500);
  body.scrollTop = body.scrollHeight;
}

function sendChat() {
  const input = document.getElementById('chatInput');
  const body = document.querySelector('.cw-body');
  if (!input || !body) return;

  const msg = input.value.trim();
  if (!msg) return;

  const userMsg = document.createElement('div');
  userMsg.className = 'cw-msg cw-user';
  userMsg.textContent = msg;
  body.appendChild(userMsg);
  input.value = '';

  setTimeout(() => {
    const botMsg = document.createElement('div');
    botMsg.className = 'cw-msg cw-bot';
    botMsg.innerHTML = 'Terima kasih pesannya! Untuk layanan personal yang lebih detail, silakan masuk ke portal atau hubungi konselor secara langsung. Apakah ada hal lain yang bisa kami bantu? 😊';
    body.appendChild(botMsg);
    body.scrollTop = body.scrollHeight;
  }, 600);
  body.scrollTop = body.scrollHeight;
}

const chatInput = document.getElementById('chatInput');
if (chatInput) {
  chatInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') sendChat();
  });
}

// ---------- LOGIN MODAL ----------
const modalConfig = {
  siswa: { icon: '🎒', title: 'Login Portal Siswa', desc: 'Masukkan kode identitas (NIS) untuk mengakses portal siswa.' },
  ortu: { icon: '👨‍👩‍👧', title: 'Login Portal Orang Tua', desc: 'Masukkan kode akses orang tua untuk melihat perkembangan anak.' },
  guru: { icon: '📚', title: 'Login Portal Guru', desc: 'Masukkan kredensial guru untuk akses sistem referral dan koordinasi.' },
  konselor: { icon: '🏅', title: 'Login Dashboard Konselor', desc: 'Masukkan kredensial konselor untuk akses dashboard manajemen kasus.' },
};

function showLoginModal(role) {
  const cfg = modalConfig[role];
  const modal = document.getElementById('loginModal');
  if (!cfg || !modal) return;

  document.getElementById('modalIcon').textContent = cfg.icon;
  document.getElementById('modalTitle').textContent = cfg.title;
  document.getElementById('modalDesc').textContent = cfg.desc;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLoginModal() {
  const modal = document.getElementById('loginModal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

function closeModal(e) {
  if (e.target.id === 'loginModal') closeLoginModal();
}

const modalSubmit = document.querySelector('.modal-submit');
if (modalSubmit) {
  modalSubmit.addEventListener('click', () => {
    alert('🔒 Demo: Dalam implementasi nyata, login akan diproses dengan enkripsi TLS 1.3 dan MFA. Terima kasih!');
    closeLoginModal();
  });
}

// ---------- SMOOTH SCROLL ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});

// ---------- SCROLL REVEAL ANIMATION ----------
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.qa-card, .visual-card, .layanan-card, .konselor-card, .wb-card, .karier-card, .sb-card, .ot-card, .portal-card, .crisis-level, .sec-layer, .pn-card, .hl-contact').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});

// ---------- ACTIVE NAV LINK ----------
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = '';
    a.style.background = '';
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = 'var(--teal)';
      a.style.background = 'var(--teal-light)';
    }
  });
});
