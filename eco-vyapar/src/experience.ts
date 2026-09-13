const dashboardMarkup = `
<section class='section intelligence-section light' id='dashboard'>
  <div class='wrap'>
    <div class='section-head split-head'>
      <div><div class='eyebrow dark'>FIELD IMPACT DASHBOARD</div><h2>Evidence first. Interpretation second.</h2></div>
      <div class='data-provenance'><span>OBSERVED</span><b>6 selected retailers · Gothapatna</b><small>Not representative of all local retailers.</small></div>
    </div>
    <div class='kpi-grid'>
      <article><span>OBSERVED</span><strong>6</strong><p>Retailers observed</p></article>
      <article><span>OBSERVED</span><strong>4</strong><p>Using plastic bags</p></article>
      <article><span>OBSERVED</span><strong>2</strong><p>Using alternatives</p></article>
      <article><span>OBSERVED</span><strong>66.7%</strong><p>Plastic usage in sample</p></article>
      <article><span>OBSERVED</span><strong>33.3%</strong><p>Alternative usage</p></article>
      <article><span>OBSERVED</span><strong>2</strong><p>Retailers recognised</p></article>
    </div>
    <div class='dashboard-grid'>
      <article class='chart-card'><div class='chart-title'><span>OBSERVED DATA</span><h3>Bag usage distribution</h3></div><div id='bagDonut' class='chart-stage' aria-label='Donut chart showing four plastic users and two alternative users'></div></article>
      <article class='chart-card'><div class='chart-title'><span>OBSERVED DATA</span><h3>Retail observation</h3></div><div id='retailBars' class='chart-stage' aria-label='Bar chart comparing four plastic users with two alternative users'></div></article>
      <article class='chart-card horizon-card'><div class='chart-title'><span>SCENARIO ESTIMATE</span><h3>Impact horizon</h3></div><div class='horizon-controls' id='horizonControls'><button class='active' data-horizon='daily'>Daily</button><button data-horizon='monthly'>Monthly</button><button data-horizon='annual'>Annual</button></div><div id='horizonChart' class='chart-stage' aria-label='Scenario chart showing estimated avoided plastic bags'></div><small>Scenario estimate — not an observed field outcome.</small></article>
    </div>
    <div class='intelligence-console'>
      <div class='console-header'><span>ECO VYAPAR INTELLIGENCE CONSOLE</span><b>ETHICS-LOCKED</b></div>
      <div class='console-grid'>
        <article><i>OBSERVED</i><strong>06</strong><span>Retailers</span></article>
        <article><i>SELF-ASSESSMENT</i><strong id='consoleScore'>00</strong><span>Green Score</span></article>
        <article><i>SCENARIO</i><strong id='consoleScenario'>—</strong><span>Daily bags avoided</span></article>
        <article><i>LOCAL SESSION</i><strong id='consoleChallenge'>0/5</strong><span>Consumer Challenge</span></article>
        <article><i>VOLUNTARY</i><strong>01</strong><span>Retail commitment pathway</span></article>
        <article><i>PLANNED</i><strong>→</strong><span>Network expansion</span></article>
      </div>
    </div>
  </div>
</section>`;

const checkoutMarkup = `
<section class='section decision-section' id='decision'>
  <div class='wrap decision-grid'>
    <div class='decision-copy'><div class='eyebrow'>RETAIL DECISION SIMULATOR</div><h2>What happens at the checkout counter?</h2><p class='lead'>One item. Four packaging choices. Explore the operational and ethical trade-offs without pretending there is one universal answer.</p><div class='data-provenance compact'><span>SCENARIO</span><b>Educational decision model</b><small>No carbon figures or measured field outcomes.</small></div></div>
    <div class='decision-console'>
      <div class='decision-head'><span>ONE ITEM PURCHASE</span><b>Choose what happens next</b></div>
      <div class='decision-options' id='decisionOptions'><button class='active' data-choice='plastic' type='button'>Plastic bag</button><button data-choice='paper' type='button'>Paper bag</button><button data-choice='reusable' type='button'>Reusable bag</button><button data-choice='none' type='button'>No bag</button></div>
      <div class='decision-outcome' id='decisionOutcome'></div>
    </div>
  </div>
</section>`;

const simulatorMarkup = `
<section class='section simulator-section' id='simulator'>
  <div class='wrap simulator-grid'>
    <div class='simulator-copy'>
      <div class='eyebrow'>3D RETAIL TRANSFORMATION SIMULATOR</div>
      <h2>Build your green store.</h2>
      <p class='lead'>Toggle practical interventions and watch the model store respond. The readiness score is educational, not measured environmental performance.</p>
      <div class='sim-controls' id='simControls'>
        <button data-feature='plastic' aria-pressed='true'><span>Plastic bags</span><i>ON</i></button>
        <button data-feature='paper' aria-pressed='false'><span>Paper alternatives</span><i>OFF</i></button>
        <button data-feature='reusable' aria-pressed='false'><span>Reusable encouragement</span><i>OFF</i></button>
        <button data-feature='packaging' aria-pressed='false'><span>Minimal packaging</span><i>OFF</i></button>
        <button data-feature='waste' aria-pressed='false'><span>Waste segregation</span><i>OFF</i></button>
        <button data-feature='energy' aria-pressed='false'><span>Efficient lighting</span><i>OFF</i></button>
        <button data-feature='awareness' aria-pressed='false'><span>Consumer awareness signage</span><i>OFF</i></button>
      </div>
    </div>
    <div class='sim-visual'>
      <canvas id='simWorld' aria-label='Interactive 3D green store simulator'></canvas>
      <div class='sim-hud'><span>GREEN READINESS</span><strong id='readinessScore'>0</strong><b id='readinessLabel'>Starting Point</b><small>/100 · educational scenario</small></div>
      <div class='sim-legend'><span><i></i>Drag / move to inspect</span><span>SCENARIO</span></div>
    </div>
  </div>
</section>`;

const journeyMarkup = `
<section class='section journey-section' id='journey'>
  <div class='wrap'>
    <div class='eyebrow'>ECO TRANSFORMATION JOURNEY</div><h2>Observe the system. Change the moment of choice.</h2>
    <div class='journey-rail' id='journeyRail'>
      <article data-stage='0'><span>01</span><h3>Observe</h3><p>See the existing retail behaviour without judgement.</p></article>
      <article data-stage='1'><span>02</span><h3>Interact</h3><p>Understand retailer and consumer constraints.</p></article>
      <article data-stage='2'><span>03</span><h3>Create Awareness</h3><p>Make alternatives and trade-offs visible.</p></article>
      <article data-stage='3'><span>04</span><h3>Encourage</h3><p>Prompt achievable change at the point of purchase.</p></article>
      <article data-stage='4'><span>05</span><h3>Recognise</h3><p>Reinforce positive behaviour without shaming others.</p></article>
    </div>
    <div class='ecosystem-grid'>
      <div class='flow-system'><h3>Retail behaviour loop</h3><div class='flow-nodes'><b>Consumer Demand</b><i>→</i><b>Retailer Choice</b><i>→</i><b>Packaging Decision</b><i>→</i><b>Waste Outcome</b><i>→</i><b>Social Norm</b></div></div>
      <div class='flow-system intervention'><h3>ECO Vyapar intervention</h3><div class='flow-nodes'><b>Awareness</b><i>→</i><b>Alternative</b><i>→</i><b>Prompt</b><i>→</i><b>Recognition</b><i>→</i><b>Repeat</b></div></div>
    </div>
  </div>
</section>`;

const networkMarkup = `
<section class='section network-section light' id='network'>
  <div class='wrap network-grid'>
    <div><div class='eyebrow dark'>FUTURE ECO VYAPAR NETWORK — CONCEPT</div><h2>From one conversation to a visible local movement.</h2><p class='lead'>This is a conceptual network visualization, not a map of actual retailer locations.</p><div class='network-legend'><span><i class='observed'></i>Observed</span><span><i class='transitioning'></i>Transitioning</span><span><i class='green'></i>Green practice</span><span><i class='future'></i>Future outreach</span></div></div>
    <div class='network-map' id='networkMap' aria-label='Conceptual future green retail network'><div class='network-core'>EV</div></div>
  </div>
</section>
<section class='section insights-section'>
  <div class='wrap'><div class='eyebrow'>FIELD LEARNINGS</div><h2>Small signals. Useful lessons.</h2><div class='insight-track' id='insightTrack'>
    <article><span>01</span><h3>Convenience drives behavior.</h3><p>Practical alternatives must work at the retail counter, not only in theory.</p></article>
    <article><span>02</span><h3>Retailers respond to demand.</h3><p>Consumer expectations can reinforce or reduce plastic dependence.</p></article>
    <article><span>03</span><h3>Awareness needs both sides.</h3><p>Retailer and consumer participation are connected.</p></article>
    <article><span>04</span><h3>Recognition encourages action.</h3><p>Positive reinforcement can make change more visible.</p></article>
    <article><span>05</span><h3>Conversations can scale.</h3><p>Small interventions can create a repeatable local model.</p></article>
  </div></div>
</section>`;

export function initExperienceShell() {
  const app = document.querySelector<HTMLElement>('#app');
  if (!app) return;

  const introSeen = (() => { try { return sessionStorage.getItem('eco-vyapar-intro') === 'seen'; } catch { return false; } })();
  if (!introSeen && document.body.dataset.motion !== 'reduced') {
    document.body.insertAdjacentHTML('afterbegin', `<div class='intro-screen' id='introScreen'><button id='skipIntro' type='button'>Skip</button><div class='intro-mark'><img src='./eco-vyapar-icon.svg' alt=''><i></i></div><p>Retail is changing.</p><h1>ECO Vyapar</h1></div>`);
    const intro = document.querySelector<HTMLElement>('#introScreen');
    const close = () => { intro?.classList.add('hide'); try { sessionStorage.setItem('eco-vyapar-intro', 'seen'); } catch { /* unavailable */ } window.setTimeout(() => intro?.remove(), 700); };
    document.querySelector<HTMLButtonElement>('#skipIntro')?.addEventListener('click', close);
    window.setTimeout(close, 1600);
  }

  document.body.insertAdjacentHTML('beforeend', `<div class='eco-cursor' aria-hidden='true'><i></i><b></b></div><aside class='eco-journey-progress' aria-label='ECO transformation progress'><b id='journeyCompact'>01 / 07 — Observe</b><div><span data-step='0'>Observe</span><span data-step='1'>Understand</span><span data-step='2'>Measure</span><span data-step='3'>Improve</span><span data-step='4'>Participate</span><span data-step='5'>Recognise</span><span data-step='6'>Scale</span></div></aside>`);
  const cursor = document.querySelector<HTMLElement>('.eco-cursor');
  if (cursor && window.matchMedia('(pointer:fine)').matches) {
    window.addEventListener('pointermove', event => { cursor.style.setProperty('--x', `${event.clientX}px`); cursor.style.setProperty('--y', `${event.clientY}px`); });
    document.addEventListener('pointerover', event => { const target = event.target as HTMLElement; cursor.classList.toggle('hot', Boolean(target.closest('a,button,input,select'))); });
  }

  const nav = document.querySelector<HTMLElement>('.nav nav');
  if (nav) nav.innerHTML = `<a href='#home'>Home</a><a href='#impact'>Impact</a><a href='#dashboard'>Dashboard</a><a href='#score'>Green Score</a><a href='#simulator'>Retail Lab</a><a href='#ethics'>Ethics</a><a href='#roadmap'>Roadmap</a>`;
  const navHeader = document.querySelector<HTMLElement>('.nav');
  navHeader?.insertAdjacentHTML('beforeend', `<button class='menu-toggle' id='menuToggle' type='button' aria-label='Open navigation'><span></span><span></span></button>`);
  document.querySelector<HTMLButtonElement>('#menuToggle')?.addEventListener('click', () => navHeader?.classList.toggle('menu-open'));
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navHeader?.classList.remove('menu-open')));

  const heroCopy = document.querySelector<HTMLElement>('.hero-grid > div:first-child');
  heroCopy?.insertAdjacentHTML('beforeend', `<div class='hero-profile'><img src='./eco-vyapar-profile.svg' alt='Conceptual ECO Vyapar sustainability-tech profile visual'><div><span>PROJECT IDENTITY</span><b>ECO Vyapar</b><small>Local retail · ethical sustainability · 2026</small></div></div>`);
  document.querySelector('.scene3d')?.insertAdjacentHTML('beforeend', `<div class='explore-label'>Drag / Move to Explore</div>`);
  document.querySelector('.hero')?.insertAdjacentHTML('beforeend', `<div class='hero-stage-copy' id='heroStageCopy'><span>STAGE 01 · PLASTIC DEPENDENCE</span><strong>CONVENIENCE BECOMES HABIT.</strong></div><div class='hero-stage-rail' id='heroStageRail'><span class='active'>01 Plastic dependence</span><span>02 Awareness</span><span>03 Retailer action</span><span>04 Consumer participation</span><span>05 Green network</span></div>`);

  document.querySelector('#impact')?.insertAdjacentHTML('afterend', dashboardMarkup);
  document.querySelector('#lab')?.insertAdjacentHTML('afterend', `${checkoutMarkup}${simulatorMarkup}`);
  const labButtons = document.querySelector('#labButtons');
  labButtons?.insertAdjacentHTML('beforeend', `<button class='lab-button' data-material='compostable' type='button'>Compostable</button><button class='lab-button' data-material='plastic' type='button'>Plastic</button>`);
  document.querySelector('.lab-output')?.insertAdjacentHTML('beforeend', `<div class='material-details' id='materialDetails'></div>`);

  const scoreResult = document.querySelector('.score .result');
  scoreResult?.insertAdjacentHTML('beforeend', `<div class='score-radar-wrap'><span>DIMENSION VIEW</span><svg id='scoreRadar' viewBox='0 0 220 200' role='img' aria-label='Radar chart of Green Score dimensions'></svg></div><div class='score-roadmap' id='scoreRoadmap'></div>`);

  const calc = document.querySelector('.calc');
  calc?.insertAdjacentHTML('beforeend', `<div class='impact-pile-card'><div><span>ONE SHOP → ONE YEAR</span><b>Visual scenario</b></div><div class='bag-pile' id='bagPile' aria-label='Illustrative bag pile that shrinks as the reduction scenario increases'></div><p><strong id='pileAvoided'>0</strong> estimated bags avoided annually · <span>SCENARIO, NOT OBSERVED IMPACT</span></p></div>`);
  const calcSection = calc?.closest('section');
  calcSection?.insertAdjacentHTML('afterend', journeyMarkup);
  const challengeSection = document.querySelector('#challengeActions')?.closest('section');
  challengeSection?.insertAdjacentHTML('afterend', networkMarkup);

  const ethics = document.querySelector('#ethics');
  const ethicsHeading = ethics?.querySelector('h2');
  if (ethicsHeading) ethicsHeading.textContent = 'Ethics before optics.';
  ethics?.querySelector('.eyebrow')?.replaceChildren(document.createTextNode('BUSINESS ETHICS BY DESIGN'));

  const trustTitle = document.querySelector('.trust-console h2');
  if (trustTitle) trustTitle.textContent = `What we know vs what we don't claim.`;

  const roadSection = Array.from(document.querySelectorAll<HTMLElement>('.section')).find(section => section.querySelector('.road'));
  if (roadSection) {
    roadSection.id = 'roadmap';
    const road = roadSection.querySelector('.road');
    if (road) road.innerHTML = `<div>01<b>Retailer Awareness</b></div><div>02<b>Green Recognition</b></div><div>03<b>Consumer Action</b></div><div>04<b>Green Retail Network</b></div><div>05<b>1–3 Month Follow-Up</b></div><div>06<b>Digital Expansion</b></div><div>07<b>Community Partnerships</b></div><div>08<b>Data-Informed Insights</b></div>`;
  }

  const final = document.querySelector('.final');
  final?.querySelector('h2')?.insertAdjacentHTML('afterend', `<p class='final-thesis'>THE PROBLEM EXISTS AT THE LOCAL LEVEL.<br><b>SO DOES THE OPPORTUNITY TO SOLVE IT.</b></p><div class='final-actions'><a href='#pledge'>Join ECO Vyapar</a><a class='secondary' href='#score'>Check Your Green Score</a></div>`);
  const oldFinalLink = final?.querySelector(':scope > a');
  oldFinalLink?.remove();

  const sections = document.querySelectorAll<HTMLElement>('main section[id]');
  const navLinks = nav?.querySelectorAll<HTMLAnchorElement>('a') || [];
  const activeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
    });
  }, { rootMargin: '-42% 0px -50% 0px' });
  sections.forEach(section => activeObserver.observe(section));

  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('is-visible', entry.isIntersecting)), { threshold: 0.16 });
  document.querySelectorAll('.chart-card,.kpi-grid article,.journey-rail article,.insight-track article,.trust-grid article').forEach(element => revealObserver.observe(element));

  const network = document.querySelector('#networkMap');
  if (network) {
    const states = ['observed','observed','transitioning','green','future','future','future','transitioning','green','future','future','future'];
    states.forEach((state, index) => network.insertAdjacentHTML('beforeend', `<button class='network-node ${state}' style='--i:${index}' type='button' aria-label='Conceptual ${state} retail node'><i></i><span>${String(index + 1).padStart(2, '0')}</span></button>`));
  }

  window.addEventListener('eco-score-update', (event: Event) => {
    const detail = (event as CustomEvent<{ score: number }>).detail;
    const value = document.querySelector('#consoleScore');
    if (value) value.textContent = String(detail.score).padStart(2, '0');
  });
  ['input','change'].forEach(type => document.querySelector('#reduction')?.addEventListener(type, () => {
    const customers = Number((document.querySelector<HTMLInputElement>('#customers'))?.value || 0);
    const bags = Number((document.querySelector<HTMLInputElement>('#bags'))?.value || 0);
    const reduction = Number((document.querySelector<HTMLInputElement>('#reduction'))?.value || 0);
    const daily = Math.round(Math.min(customers, bags) * reduction / 100);
    const target = document.querySelector('#consoleScenario');
    if (target) target.textContent = String(daily);
  }));
  document.querySelector('#challengeActions')?.addEventListener('click', () => window.setTimeout(() => {
    const value = document.querySelector('#consoleChallenge');
    const source = document.querySelector('#challengeScore');
    if (value && source) value.textContent = source.textContent || '0/5';
  }, 0));
}
