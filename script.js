/* ══════════════════════════════════════════
   CURSOR
══════════════════════════════════════════ */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
});

function animateFollower() {
  fx += (mx - fx - 18) * 0.12;
  fy += (my - fy - 18) * 0.12;
  follower.style.transform = `translate(${fx}px, ${fy}px)`;
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .project-card, .cert-card, .detail-item').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.style.transform += ' scale(2.5)');
  el.addEventListener('mouseleave', () => cursor.style.transform = cursor.style.transform.replace(' scale(2.5)', ''));
});

/* ══════════════════════════════════════════
   NAVBAR SCROLL
══════════════════════════════════════════ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ══════════════════════════════════════════
   REVEAL ON SCROLL
══════════════════════════════════════════ */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObs.observe(el));

/* ══════════════════════════════════════════
   SKILL BARS
══════════════════════════════════════════ */
const skillBars = document.querySelectorAll('.skill-fill');
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const w = entry.target.dataset.width;
      entry.target.style.width = w + '%';
      skillObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
skillBars.forEach(bar => skillObs.observe(bar));

/* ══════════════════════════════════════════
   COUNTER ANIMATION
══════════════════════════════════════════ */
function animateCount(el, target, duration = 1800) {
  let start = 0;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + (target === 499 ? '+' : '');
  };
  requestAnimationFrame(step);
}

const counterEls = document.querySelectorAll('[data-count]');
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target, parseInt(entry.target.dataset.count));
      counterObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counterEls.forEach(el => counterObs.observe(el));

/* ══════════════════════════════════════════
   SECTION PROGRESS DOTS
══════════════════════════════════════════ */
const sections = ['hero','about','experience','projects','skills','education','certifications'];
const dots = document.querySelectorAll('.progress-dot');

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    document.getElementById(dot.dataset.section)?.scrollIntoView({ behavior: 'smooth' });
  });
});

const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      dots.forEach(d => {
        d.classList.toggle('active', d.dataset.section === id);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(id => {
  const el = document.getElementById(id);
  if (el) sectionObs.observe(el);
});

/* ══════════════════════════════════════════
   MARQUEE DUPLICATE FOR INFINITE LOOP
══════════════════════════════════════════ */
// Already duplicated in HTML