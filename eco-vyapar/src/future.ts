type MaterialKey = 'no-bag' | 'reusable' | 'paper' | 'compostable' | 'plastic';

type MaterialInfo = {
  kicker: string;
  title: string;
  text: string;
  tradeoff: string;
  symbol: string;
  attributes: [string, string][];
};

const materialCopy: Record<MaterialKey, MaterialInfo> = {
  'no-bag': {
    kicker: 'REDUCE FIRST',
    title: 'Can the customer skip a bag?',
    text: 'Avoiding unnecessary material use is the strongest first move when the purchase can be carried safely without a bag.',
    tradeoff: 'Reduce before replacing.',
    symbol: 'Ø',
    attributes: [['Reuse potential', 'Not applicable'], ['Durability', 'No material needed'], ['Best use', 'Small / easy-to-carry purchases'], ['Limitation', 'Not suitable for every purchase']],
  },
  reusable: {
    kicker: 'REUSE PATHWAY',
    title: 'Can one bag replace many single-use trips?',
    text: 'Reusable cloth or jute bags work best when customers actually bring them back repeatedly. Adoption and habit matter as much as material choice.',
    tradeoff: 'The most sustainable bag is often the one genuinely reused many times.',
    symbol: '∞',
    attributes: [['Reuse potential', 'High when repeatedly used'], ['Durability', 'High'], ['Best use', 'Repeat shopping'], ['Limitation', 'Requires customer habit']],
  },
  paper: {
    kicker: 'ALTERNATIVE PATHWAY',
    title: 'Is paper suitable for this purchase?',
    text: 'Paper can reduce dependence on conventional plastic in some contexts, but it still uses material and energy. Strength and sourcing matter.',
    tradeoff: 'Replacement helps, but avoidance still comes first.',
    symbol: 'P',
    attributes: [['Reuse potential', 'Limited to moderate'], ['Durability', 'Moderate'], ['Best use', 'Light, dry items'], ['Limitation', 'Moisture and load capacity']],
  },
  compostable: {
    kicker: 'CONTEXT MATTERS',
    title: 'Can the disposal system support the material?',
    text: 'A compostable label alone does not guarantee a better outcome. Collection conditions, certification and actual disposal behaviour matter.',
    tradeoff: 'Material claims should match the real waste system.',
    symbol: 'C',
    attributes: [['Reuse potential', 'Usually low'], ['Durability', 'Varies'], ['Best use', 'Context-specific'], ['Limitation', 'Needs suitable disposal conditions']],
  },
  plastic: {
    kicker: 'CURRENT BASELINE',
    title: 'Why does conventional plastic remain common?',
    text: 'Plastic remains convenient because it is lightweight, available, familiar and often perceived as inexpensive. These are qualitative field insights, not measured percentages.',
    tradeoff: 'The intervention is behavioural as well as material.',
    symbol: 'PL',
    attributes: [['Reuse potential', 'Depends on user behaviour'], ['Durability', 'Often high'], ['Best use', 'Operational convenience'], ['Limitation', 'Single-use dependence and waste persistence']],
  },
};

export function initFutureUI() {
  const root = document.documentElement;
  const themeButton = document.querySelector<HTMLButtonElement>('#themeToggle');
  const themeLabel = themeButton?.querySelector<HTMLElement>('.theme-label');
  const savedTheme = (() => { try { return localStorage.getItem('eco-vyapar-theme'); } catch { return null; } })();
  const preferred: 'light' | 'dark' = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  const initialTheme: 'light' | 'dark' = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : preferred;
  const applyTheme = (theme: 'light' | 'dark') => {
    root.dataset.theme = theme;
    if (themeLabel) themeLabel.textContent = theme === 'dark' ? 'Dark' : 'Light';
    themeButton?.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#06110D' : '#F3F7F1');
    try { localStorage.setItem('eco-vyapar-theme', theme); } catch { /* unavailable */ }
  };
  applyTheme(initialTheme);
  themeButton?.addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  const motionButton = document.querySelector<HTMLButtonElement>('#motionToggle');
  const savedMotion = (() => { try { return localStorage.getItem('eco-vyapar-motion'); } catch { return null; } })();
  const reducedBySystem = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const initialReduced = savedMotion === 'reduced' || (savedMotion === null && reducedBySystem);
  document.body.dataset.motion = initialReduced ? 'reduced' : 'full';
  if (motionButton) motionButton.textContent = initialReduced ? 'Motion: Off' : 'Motion: On';
  motionButton?.addEventListener('click', () => {
    const reduced = document.body.dataset.motion === 'reduced';
    const next = reduced ? 'full' : 'reduced';
    document.body.dataset.motion = next;
    motionButton.textContent = next === 'reduced' ? 'Motion: Off' : 'Motion: On';
    motionButton.setAttribute('aria-pressed', String(next === 'reduced'));
    try { localStorage.setItem('eco-vyapar-motion', next); } catch { /* unavailable */ }
  });

  const progress = document.querySelector<HTMLElement>('#scrollProgress');
  const updateProgress = () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    progress.style.transform = `scaleX(${value})`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  const buttons = document.querySelectorAll<HTMLButtonElement>('.lab-button');
  const kicker = document.querySelector<HTMLElement>('#labKicker');
  const title = document.querySelector<HTMLElement>('#labTitle');
  const text = document.querySelector<HTMLElement>('#labText');
  const tradeoff = document.querySelector<HTMLElement>('#labTradeoff');
  const core = document.querySelector<HTMLElement>('.orbit-core');
  const details = document.querySelector<HTMLElement>('#materialDetails');
  const updateMaterial = (key: MaterialKey) => {
    const copy = materialCopy[key];
    buttons.forEach(button => button.classList.toggle('active', button.dataset.material === key));
    if (kicker) kicker.textContent = copy.kicker;
    if (title) title.textContent = copy.title;
    if (text) text.textContent = copy.text;
    if (tradeoff) tradeoff.textContent = copy.tradeoff;
    if (core) core.textContent = copy.symbol;
    if (details) details.innerHTML = copy.attributes.map(([label, value]) => `<div><span>${label}</span><b>${value}</b></div>`).join('');
    document.querySelector<HTMLElement>('#materialOrbit')?.setAttribute('data-material', key);
    window.dispatchEvent(new CustomEvent('eco-material-change', { detail: { material: key } }));
  };
  buttons.forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.material as MaterialKey | undefined;
    if (key && materialCopy[key]) updateMaterial(key);
  }));
  updateMaterial('no-bag');
}
