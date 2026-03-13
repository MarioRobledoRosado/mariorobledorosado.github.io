// ── REVEAL ──
document.documentElement.classList.add('js-loaded');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.05 });

document.querySelectorAll('.reveal').forEach(el => {
  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    el.classList.add('visible');
  } else {
    observer.observe(el);
  }
});

// ── LIGHTBOX ──
const lightbox  = document.getElementById('lightbox');
if (lightbox) {
  const lbImg   = document.getElementById('lb-img');
  const lbClose = document.getElementById('lb-close');
  const lbPrev  = document.getElementById('lb-prev');
  const lbNext  = document.getElementById('lb-next');

  let images = [];   // todas las <img> de galerías en la página
  let current = 0;

  function open(idx) {
    current = idx;
    lbImg.src = images[current].src;
    lbImg.alt = images[current].alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function prev() { open((current - 1 + images.length) % images.length); }
  function next() { open((current + 1) % images.length); }

  // Recoge todas las imágenes reales de galerías (no placeholders)
  document.querySelectorAll('.project-gallery .photo-slot img').forEach((img, i) => {
    images.push(img);
    img.parentElement.addEventListener('click', () => open(i));
  });

  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click', prev);
  lbNext.addEventListener('click', next);

  lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });
}
