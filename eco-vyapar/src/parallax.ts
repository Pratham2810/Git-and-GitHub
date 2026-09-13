function addDepthLayers() {
  const targets = ['.hero', '#dashboard', '#simulator', '#network', '.final'];
  targets.forEach(selector => {
    const section = document.querySelector<HTMLElement>(selector);
    if (!section || section.querySelector('.depth-orb')) return;
    section.classList.add('parallax-shell');
    section.insertAdjacentHTML('afterbegin', `<span class='depth-orb depth-orb-a' aria-hidden='true'></span><span class='depth-orb depth-orb-b' aria-hidden='true'></span>`);
  });
}

function setupPointerGlow() {
  if (!window.matchMedia('(pointer:fine)').matches) return;
  let frame = 0;
  window.addEventListener('pointermove', event => {
    if (frame) return;
    frame = window.requestAnimationFrame(() => {
      document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`);
      frame = 0;
    });
  }, { passive: true });
}

function setupThemeMeta() {
  const meta = document.querySelector<HTMLMetaElement>('meta[name=theme-color]');
  const sync = () => {
    if (!meta) return;
    meta.content = document.documentElement.dataset.theme === 'light' ? '#F3F6EF' : '#06110D';
  };
  sync();
  new MutationObserver(sync).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
}

export function initParallaxExperience() {
  document.body.classList.add('award-shell');
  addDepthLayers();
  setupPointerGlow();
  setupThemeMeta();

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lowPower = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4;
  const mobile = window.matchMedia('(max-width: 800px)').matches;
  if (reduced || lowPower || mobile) return;

  const start = async () => {
    const [{ default: gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('lenis'),
    ]);
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });
    const lenis = new Lenis({ duration: 0.9, smoothWheel: true, wheelMultiplier: 0.9, touchMultiplier: 1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    gsap.to('.hero-grid > div:first-child', {
      yPercent: -16,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.1 },
    });
    gsap.fromTo('.scene3d', { yPercent: -6, scale: 1.03 }, {
      yPercent: 22,
      scale: 0.95,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.2 },
    });

    document.querySelectorAll<HTMLElement>('.parallax-shell').forEach(section => {
      const front = section.querySelector<HTMLElement>('.depth-orb-a');
      const back = section.querySelector<HTMLElement>('.depth-orb-b');
      if (front) gsap.fromTo(front, { yPercent: -12, rotate: -8 }, { yPercent: 38, rotate: 22, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.4 } });
      if (back) gsap.fromTo(back, { yPercent: 18, xPercent: -8 }, { yPercent: -30, xPercent: 16, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.8 } });
    });

    document.querySelectorAll<HTMLElement>('.section h2, .section .eyebrow, .section .lead').forEach(element => {
      gsap.fromTo(element, { y: 26, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: .8,
        ease: 'power3.out',
        scrollTrigger: { trigger: element, start: 'top 86%', once: true },
      });
    });

    const cards = document.querySelectorAll<HTMLElement>('.chart-card,.kpi-grid article,.trust-grid article,.champions article,.insight-track article,.flow-system');
    cards.forEach(card => {
      card.dataset.parallaxCard = '';
      gsap.fromTo(card, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: .7, ease: 'power2.out', scrollTrigger: { trigger: card, start: 'top 91%', once: true } });
    });

    if (window.matchMedia('(pointer:fine)').matches) {
      cards.forEach(card => {
        const xTo = gsap.quickTo(card, 'rotationY', { duration: .35, ease: 'power2.out' });
        const yTo = gsap.quickTo(card, 'rotationX', { duration: .35, ease: 'power2.out' });
        card.addEventListener('pointermove', event => {
          const rect = card.getBoundingClientRect();
          xTo(((event.clientX - rect.left) / rect.width - .5) * 5);
          yTo(-((event.clientY - rect.top) / rect.height - .5) * 5);
        });
        card.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
      });

      document.querySelectorAll<HTMLElement>('.btn,.join,.final-actions a').forEach(button => {
        const xTo = gsap.quickTo(button, 'x', { duration: .3, ease: 'power3.out' });
        const yTo = gsap.quickTo(button, 'y', { duration: .3, ease: 'power3.out' });
        button.addEventListener('pointermove', event => {
          const rect = button.getBoundingClientRect();
          xTo((event.clientX - rect.left - rect.width / 2) * .12);
          yTo((event.clientY - rect.top - rect.height / 2) * .12);
        });
        button.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
      });
    }

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh, { once: true });
    window.setTimeout(refresh, 300);
  };

  const idle = window.requestIdleCallback as ((callback: () => void, options?: { timeout: number }) => number) | undefined;
  if (idle) idle(() => void start(), { timeout: 1100 });
  else window.setTimeout(() => void start(), 250);
}
