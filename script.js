// ============================================================
// Ishtiak Ahmed Ayon — Portfolio interactions
// ============================================================

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------------- Theme toggle (persisted) ---------------- */
(function themeInit() {
  const root = document.documentElement;
  const stored = localStorage.getItem('ayon-theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const initial = stored || (prefersLight ? 'light' : 'dark');
  root.setAttribute('data-theme', initial);

  document.getElementById('themeToggle').addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('ayon-theme', next);
  });
})();

/* ---------------- Mobile nav ---------------- */
(function navInit() {
  const nav = document.querySelector('.nav');
  const burger = document.getElementById('navBurger');
  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', isOpen);
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ---------------- Hero typed line ---------------- */
(function typedInit() {
  const el = document.getElementById('typedText');
  const lines = [
    'compiling: code, ideas, and coffee',
    'currently building something new',
    'status: debugging life, one bug at a time'
  ];
  let lineIndex = 0, charIndex = 0, deleting = false;

  function tick() {
    const full = lines[lineIndex];
    if (!deleting) {
      charIndex++;
      el.textContent = full.slice(0, charIndex);
      if (charIndex === full.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      charIndex--;
      el.textContent = full.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        lineIndex = (lineIndex + 1) % lines.length;
      }
    }
    setTimeout(tick, deleting ? 28 : 46);
  }
  tick();
})();

/* ---------------- Education: semester curriculum ----------------
   EDIT ME: replace with your real MBSTU ICT semester-wise courses.
   Each entry = { semester: N, courses: [ "Course name", ... ] }
------------------------------------------------------------------- */
const curriculum = [
  { semester: 1, courses: ['Course 1', 'Course 2', 'Course 3', 'Course 4', 'Course 5'] },
  { semester: 2, courses: ['Course 1', 'Course 2', 'Course 3', 'Course 4', 'Course 5'] },
  { semester: 3, courses: ['Course 1', 'Course 2', 'Course 3', 'Course 4', 'Course 5'] },
  { semester: 4, courses: ['Course 1', 'Course 2', 'Course 3', 'Course 4', 'Course 5'] },
  { semester: 5, courses: ['Course 1', 'Course 2', 'Course 3', 'Course 4', 'Course 5'] },
  { semester: 6, courses: ['Course 1', 'Course 2', 'Course 3', 'Course 4', 'Course 5'] },
  { semester: 7, courses: ['Course 1', 'Course 2', 'Course 3', 'Course 4', 'Course 5'] },
  { semester: 8, courses: ['Course 1', 'Course 2', 'Course 3', 'Course 4', 'Course 5'] },
];

(function renderCurriculum() {
  const wrap = document.getElementById('semTimeline');
  const track = document.createElement('div');
  track.className = 'sem-track';
  wrap.appendChild(track);

  curriculum.forEach(({ semester, courses }) => {
    const block = document.createElement('div');
    block.className = 'sem-block';

    const node = document.createElement('span');
    node.className = 'sem-node';
    block.appendChild(node);

    const heading = document.createElement('p');
    heading.className = 'sem-heading';
    heading.textContent = `Semester ${semester}`;
    block.appendChild(heading);

    const list = document.createElement('ul');
    list.className = 'sem-courses';
    courses.forEach(course => {
      const li = document.createElement('li');
      li.textContent = course;
      list.appendChild(li);
    });
    block.appendChild(list);

    wrap.appendChild(block);
  });
})();

/* ---------------- Education modal ---------------- */
(function modalInit() {
  const curriculumEnabled = false;
  const card = document.getElementById('bscCard');
  const backdrop = document.getElementById('eduModalBackdrop');
  const closeBtn = document.getElementById('modalClose');

  if (!curriculumEnabled) {
    card.classList.remove('edu-card-clickable');
    card.removeAttribute('tabindex');
    card.removeAttribute('role');
    card.removeAttribute('aria-haspopup');
    card.removeAttribute('aria-controls');
    return;
  }

  function open() {
    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }
  function close() {
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
    card.focus();
  }

  card.addEventListener('click', open);
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
  });
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', e => { if (e.target === backdrop) close(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && backdrop.classList.contains('is-open')) close();
  });
})();

/* ---------------- Projects: side-menu tab switching ---------------- */
(function projectsInit() {
  const menu = document.getElementById('projectsMenu');
  if (!menu) return;

  const items = Array.from(menu.querySelectorAll('.project-menu-item[data-project]'));
  const panels = Array.from(document.querySelectorAll('.project-panel'));

  function activate(targetItem) {
    const index = targetItem.getAttribute('data-project');
    items.forEach(i => {
      const active = i === targetItem;
      i.classList.toggle('is-active', active);
      i.setAttribute('aria-current', active ? 'true' : 'false');
    });
    panels.forEach(p => p.classList.toggle('is-active', p.dataset.panel === index));
  }

  items.forEach(item => {
    item.addEventListener('click', () => activate(item));
  });
})();

/* ---------------- Scroll reveal ---------------- */
(function revealInit() {
  const targets = document.querySelectorAll('.edu-card, .skill-card, .hobby-badge, .projects-panel');
  targets.forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateY(14px)'; el.style.transition = 'opacity .5s ease, transform .5s ease'; });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(el => io.observe(el));
})();
