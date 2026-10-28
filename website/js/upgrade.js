document.addEventListener('DOMContentLoaded', () => {
  // ===== Scroll-reveal =====
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('is-visible'));
  }

  // ===== Countdown naar 2 november 2026 =====
  const out = document.querySelector('#countdown-days');
  const wrap = document.querySelector('.countdown');
  if (out && wrap) {
    const start = new Date(2026, 10, 2); // maand 10 = november
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const days = Math.round((start - today) / 86400000);
    if (days > 1) {
      out.textContent = days;
    } else if (days === 1) {
      wrap.innerHTML = '<strong>Morgen</strong> gaan we!';
    } else if (days <= 0 && days >= -3) {
      wrap.innerHTML = '<strong>Nu</strong> in Berlijn';
    } else {
      wrap.hidden = true;
    }
  }
});