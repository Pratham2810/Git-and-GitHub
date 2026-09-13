type DecisionKey = 'plastic' | 'paper' | 'reusable' | 'none';

type DecisionInfo = {
  convenience: string;
  reuse: string;
  packaging: string;
  waste: string;
  ethics: string;
};

const decisionCopy: Record<DecisionKey, DecisionInfo> = {
  plastic: {
    convenience: 'High at the counter',
    reuse: 'Possible, but behaviour-dependent',
    packaging: 'Adds a new carry material',
    waste: 'Can persist when discarded after limited use',
    ethics: 'Avoid automatic distribution when the purchase can be carried without it.',
  },
  paper: {
    convenience: 'Useful for light, dry purchases',
    reuse: 'Limited to moderate',
    packaging: 'Still requires a new material',
    waste: 'Outcome depends on reuse, sourcing and disposal',
    ethics: 'Paper can be an alternative, but replacement should not become unnecessary consumption.',
  },
  reusable: {
    convenience: 'Strong when the customer already carries one',
    reuse: 'High when genuinely reused many times',
    packaging: 'No new single-use bag is needed',
    waste: 'Potentially lower repeated bag demand through reuse',
    ethics: 'The value comes from repeated use, not simply from the reusable label.',
  },
  none: {
    convenience: 'Best for purchases that are easy to carry',
    reuse: 'No bag required',
    packaging: 'Avoids an additional carry material',
    waste: 'No new carry-bag waste is created',
    ethics: 'Reduce first when skipping a bag is practical and safe.',
  },
};

const heroStages = [
  ['STAGE 01 · PLASTIC DEPENDENCE', 'CONVENIENCE BECOMES HABIT.'],
  ['STAGE 02 · AWARENESS', 'AWARENESS MAKES CHOICE VISIBLE.'],
  ['STAGE 03 · RETAILER ACTION', 'CHANGE STARTS AT THE COUNTER.'],
  ['STAGE 04 · CONSUMER PARTICIPATION', 'DEMAND SHAPES RETAIL BEHAVIOUR.'],
  ['STAGE 05 · GREEN RETAIL NETWORK', 'ONE SHOP CAN BECOME A MOVEMENT.'],
] as const;

export function initUpgradeLayer() {
  const options = document.querySelectorAll<HTMLButtonElement>('#decisionOptions button[data-choice]');
  const outcome = document.querySelector<HTMLElement>('#decisionOutcome');
  const renderDecision = (key: DecisionKey) => {
    const copy = decisionCopy[key];
    options.forEach(button => button.classList.toggle('active', button.dataset.choice === key));
    if (!outcome) return;
    outcome.innerHTML = [
      ['Immediate convenience', copy.convenience],
      ['Reuse potential', copy.reuse],
      ['Packaging requirement', copy.packaging],
      ['Waste implication', copy.waste],
      ['Ethical consideration', copy.ethics],
    ].map(([label, value]) => `<article><span>${label}</span><b>${value}</b></article>`).join('');
  };
  options.forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.choice as DecisionKey;
    if (decisionCopy[key]) renderDecision(key);
  }));
  renderDecision('plastic');

  const pile = document.querySelector<HTMLElement>('#bagPile');
  if (pile) pile.innerHTML = Array.from({ length: 24 }, (_, index) => `<i aria-hidden='true' style='--i:${index}'></i>`).join('');
  const updatePile = () => {
    const customers = Number(document.querySelector<HTMLInputElement>('#customers')?.value || 0);
    const bags = Number(document.querySelector<HTMLInputElement>('#bags')?.value || 0);
    const reduction = Number(document.querySelector<HTMLInputElement>('#reduction')?.value || 0);
    const daily = Math.round(Math.min(customers, bags) * reduction / 100);
    const annual = daily * 365;
    const avoidedCount = Math.round(24 * Math.min(100, Math.max(0, reduction)) / 100);
    pile?.querySelectorAll('i').forEach((bag, index) => bag.classList.toggle('avoided', index < avoidedCount));
    const total = document.querySelector<HTMLElement>('#pileAvoided');
    if (total) total.textContent = annual.toLocaleString('en-IN');
  };
  ['customers', 'bags', 'reduction'].forEach(id => document.querySelector(`#${id}`)?.addEventListener('input', updatePile));
  updatePile();

  const stageCopy = document.querySelector<HTMLElement>('#heroStageCopy');
  window.addEventListener('eco-hero-stage', (event: Event) => {
    const stage = Math.max(0, Math.min(4, (event as CustomEvent<{ stage: number }>).detail.stage));
    const [label, message] = heroStages[stage];
    if (!stageCopy) return;
    stageCopy.classList.remove('pulse');
    stageCopy.querySelector('span')!.textContent = label;
    stageCopy.querySelector('strong')!.textContent = message;
    void stageCopy.offsetWidth;
    stageCopy.classList.add('pulse');
  });

  const journeySteps = [
    ['home', 'Observe'],
    ['impact', 'Understand'],
    ['dashboard', 'Measure'],
    ['score', 'Improve'],
    ['decision', 'Participate'],
    ['pledge', 'Recognise'],
    ['roadmap', 'Scale'],
  ] as const;
  const progress = document.querySelector<HTMLElement>('.eco-journey-progress');
  const compact = document.querySelector<HTMLElement>('#journeyCompact');
  const stepLabels = progress?.querySelectorAll<HTMLElement>('[data-step]');
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const index = journeySteps.findIndex(([id]) => id === visible.target.id);
    if (index < 0) return;
    stepLabels?.forEach((label, labelIndex) => label.classList.toggle('active', labelIndex === index));
    if (compact) compact.textContent = `${String(index + 1).padStart(2, '0')} / 07 — ${journeySteps[index][1]}`;
  }, { rootMargin: '-34% 0px -46% 0px', threshold: [0.05, 0.2, 0.5] });
  journeySteps.forEach(([id]) => {
    const target = document.getElementById(id);
    if (target) observer.observe(target);
  });
}
