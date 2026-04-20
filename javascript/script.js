/* MBS Advisory — script.js */
(function () {
  'use strict';

  /* ── MOBILE MENU ─────────────────────────────── */
  const mobBtn  = document.getElementById('mob-btn');
  const mobMenu = document.getElementById('mob-menu');

  const toggleMenu = open => {
    mobMenu.classList.toggle('open', open);
    mobBtn.setAttribute('aria-expanded', String(open));
    mobBtn.textContent = open ? '✕' : '☰';
  };

  mobBtn?.addEventListener('click', () =>
    toggleMenu(!mobMenu.classList.contains('open'))
  );
  document.querySelectorAll('#mob-list a, .mob-cta-wrap a').forEach(a =>
    a.addEventListener('click', () => toggleMenu(false))
  );
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggleMenu(false);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) toggleMenu(false);
  });

  /* ── HEADER SCROLL SHADOW ────────────────────── */
  const hdr = document.getElementById('hdr');
  const syncHdr = () => hdr.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', syncHdr, { passive: true });
  syncHdr();

  /* ── ACTIVE NAV HIGHLIGHT ────────────────────── */
  const sections = document.querySelectorAll('section[id], #metrics');
  const navLinks = document.querySelectorAll('#navlinks a');
  const syncNav  = () => {
    const y = window.scrollY + 100;
    let cur = '';
    sections.forEach(s => { if (y >= s.offsetTop) cur = s.id; });
    navLinks.forEach(a =>
      a.classList.toggle('active', a.getAttribute('href') === '#' + cur)
    );
  };
  window.addEventListener('scroll', syncNav, { passive: true });
  syncNav();

  /* ── SCROLL REVEAL ───────────────────────────── */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const siblings = [
          ...(entry.target.parentElement
            ?.querySelectorAll('.rv:not(.on), .rv-l:not(.on)') || [])
        ];
        const delay = Math.min(siblings.indexOf(entry.target) * 70, 280);
        setTimeout(() => entry.target.classList.add('on'), delay);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -32px 0px' });

    document.querySelectorAll('.rv, .rv-l').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.rv, .rv-l').forEach(el => el.classList.add('on'));
  }

  /* ── ANIMATED METRIC COUNTERS ────────────────── */
  const easeOut = t => 1 - Math.pow(1 - t, 4);

  const animCounter = el => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = prefix + target.toLocaleString() + suffix;
      return;
    }
    const t0  = performance.now();
    const dur = 1900;
    const tick = now => {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = prefix + Math.round(easeOut(p) * target).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const metricsSection = document.getElementById('metrics');
  let countersRan = false;
  if (metricsSection && 'IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !countersRan) {
        countersRan = true;
        document.querySelectorAll('.metric-k[data-target]').forEach(animCounter);
      }
    }, { threshold: 0.3 }).observe(metricsSection);
  }

  /* ── DIAGNOSTIC TABS ─────────────────────────── */
  const tabs  = document.querySelectorAll('.diag-tab');
  const panes = document.querySelectorAll('.diag-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('on');
        t.setAttribute('aria-selected', 'false');
      });
      panes.forEach(p => p.classList.remove('on'));

      tab.classList.add('on');
      tab.setAttribute('aria-selected', 'true');
      const pane = document.getElementById(tab.dataset.pane);
      if (pane) pane.classList.add('on');
    });
  });

  /* ── LANGUAGE SWITCHER ───────────────────────── */
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
    });
  });

})();
