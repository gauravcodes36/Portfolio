// ── Cursor ──
const cur = document.getElementById('cur'), corf = document.getElementById('corf');
let mx = 0, my = 0, fx = 0, fy = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cur.style.left = mx + 'px'; cur.style.top = my + 'px' });
(function tick() { fx += (mx - fx) * .11; fy += (my - fy) * .11; corf.style.left = fx + 'px'; corf.style.top = fy + 'px'; requestAnimationFrame(tick) })();
document.querySelectorAll('a,button,.pcard,.tcard,.w-card,.stat,.cert-card,.soc-btn').forEach(el => {
  el.addEventListener('mouseenter', () => { cur.style.width = '14px'; cur.style.height = '14px'; cur.style.background = 'var(--accent)'; corf.style.width = '44px'; corf.style.height = '44px'; corf.style.opacity = '.3' });
  el.addEventListener('mouseleave', () => { cur.style.width = '7px'; cur.style.height = '7px'; cur.style.background = 'var(--ink)'; corf.style.width = '30px'; corf.style.height = '30px'; corf.style.opacity = '.2' });
});

// ── Nav scroll ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('sc', scrollY > 10));

// ── Reveal on scroll ──
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on') });
}, { threshold: .08, rootMargin: '0px 0px -36px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ── Smooth nav ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth' });
  });
});

// ── Number counter animation ──
function animateCount(el) {
  const target = parseFloat(el.dataset.target);
  const isYear = target > 999;
  let current = isYear ? 2020 : 0;
  const step = isYear ? 1 : (target / 60);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = isYear ? Math.round(current) : (target % 1 !== 0 ? current.toFixed(1) : Math.round(current));
    if (current >= target) clearInterval(timer);
  }, 18);
}
const statNums = document.querySelectorAll('.stat-n');
const statIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const numEl = e.target.querySelector('.count');
      if (numEl && !numEl.dataset.done) { numEl.dataset.done = '1'; animateCount(numEl) }
    }
  });
}, { threshold: .5 });

// Add count spans
document.querySelectorAll('.stat-n').forEach(el => {
  const txt = el.textContent.trim();
  const num = parseFloat(txt.replace(/[^0-9.]/g, ''));
  const suffix = txt.replace(/[0-9.]/g, '');
  el.innerHTML = `<span class="count" data-target="${num}">${num > 999 ? 2020 : 0}</span><span style="color:var(--accent)">${suffix}</span>`;
  statIO.observe(el.closest('.stat'));
});