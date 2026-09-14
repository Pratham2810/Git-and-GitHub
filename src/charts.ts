function polarPoint(cx: number, cy: number, radius: number, angle: number) {
  return [cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius];
}

function drawDonut() {
  const host = document.querySelector<HTMLElement>('#bagDonut');
  if (!host) return;
  host.innerHTML = `<div class='svg-donut'><svg viewBox='0 0 220 220' role='img' aria-label='66.7 percent plastic and 33.3 percent alternatives'><circle class='donut-track' cx='110' cy='110' r='78'></circle><circle class='donut-plastic' cx='110' cy='110' r='78'></circle><circle class='donut-alt' cx='110' cy='110' r='78'></circle></svg><div class='donut-center'><strong>6</strong><span>retailers</span></div></div><div class='chart-legend'><span><i class='plastic'></i><b>4 · 66.7%</b> Plastic</span><span><i class='alt'></i><b>2 · 33.3%</b> Alternatives</span></div>`;
}

function drawBars() {
  const host = document.querySelector<HTMLElement>('#retailBars');
  if (!host) return;
  host.innerHTML = `<div class='observed-bars'><div><span>Plastic users</span><b style='--value:66.7%'></b><strong>4</strong></div><div><span>Alternative users</span><b style='--value:33.3%'></b><strong>2</strong></div></div><p class='chart-footnote'>Observed counts only. Qualitative drivers are not assigned numeric weights.</p>`;
}

function drawRadar(score: number, answers: boolean[]) {
  const svg = document.querySelector<SVGSVGElement>('#scoreRadar');
  if (!svg) return;
  const cx = 110;
  const cy = 98;
  const radius = 70;
  const count = 6;
  const rings = [0.25, 0.5, 0.75, 1].map(level => {
    const points = Array.from({ length: count }, (_, index) => polarPoint(cx, cy, radius * level, -Math.PI / 2 + index * Math.PI * 2 / count).join(',')).join(' ');
    return `<polygon points='${points}'></polygon>`;
  }).join('');
  const axes = Array.from({ length: count }, (_, index) => {
    const [x, y] = polarPoint(cx, cy, radius, -Math.PI / 2 + index * Math.PI * 2 / count);
    return `<line x1='${cx}' y1='${cy}' x2='${x}' y2='${y}'></line>`;
  }).join('');
  const values = answers.map(value => value ? 1 : 0.18);
  const polygon = values.map((value, index) => polarPoint(cx, cy, radius * value, -Math.PI / 2 + index * Math.PI * 2 / count).join(',')).join(' ');
  svg.innerHTML = `<g class='radar-grid'>${rings}${axes}</g><polygon class='radar-value' points='${polygon}'></polygon><text x='110' y='190' text-anchor='middle'>${score}/100 · educational self-assessment</text>`;
  const roadmap = document.querySelector<HTMLElement>('#scoreRoadmap');
  if (roadmap) {
    const next = answers.map((value, index) => ({ value, index })).filter(item => !item.value).slice(0, 3).map(item => ['Reduce unnecessary bagging','Offer practical alternatives','Prompt reusable bags','Minimise excess packaging','Improve waste handling','Communicate sustainable choices'][item.index]);
    roadmap.innerHTML = `<span>NEXT BEST MOVES</span>${next.length ? next.map(item => `<b>→ ${item}</b>`).join('') : '<b>→ Maintain and verify the practices you selected.</b>'}`;
  }
}

let horizon: 'daily' | 'monthly' | 'annual' = 'daily';
function scenarioValue() {
  const customers = Number(document.querySelector<HTMLInputElement>('#customers')?.value || 0);
  const bags = Number(document.querySelector<HTMLInputElement>('#bags')?.value || 0);
  const reduction = Number(document.querySelector<HTMLInputElement>('#reduction')?.value || 0);
  return Math.round(Math.min(customers, bags) * reduction / 100);
}

function drawHorizon() {
  const host = document.querySelector<HTMLElement>('#horizonChart');
  if (!host) return;
  const daily = scenarioValue();
  const factors = horizon === 'daily' ? [1,2,3,4,5,6,7] : horizon === 'monthly' ? [30,60,90,120,150,180] : [365,730,1095,1460,1825];
  const labels = horizon === 'daily' ? ['D1','D2','D3','D4','D5','D6','D7'] : horizon === 'monthly' ? ['M1','M2','M3','M4','M5','M6'] : ['Y1','Y2','Y3','Y4','Y5'];
  const values = factors.map(value => daily * value);
  const max = Math.max(...values, 1);
  const points = values.map((value, index) => `${30 + index * (260 / Math.max(values.length - 1, 1))},${145 - value / max * 105}`).join(' ');
  const ticks = labels.map((label, index) => `<text x='${30 + index * (260 / Math.max(labels.length - 1, 1))}' y='172' text-anchor='middle'>${label}</text>`).join('');
  const circles = values.map((value, index) => `<circle cx='${30 + index * (260 / Math.max(values.length - 1, 1))}' cy='${145 - value / max * 105}' r='4'><title>${value.toLocaleString('en-IN')} estimated bags avoided</title></circle>`).join('');
  host.innerHTML = `<svg class='horizon-svg' viewBox='0 0 320 185' role='img' aria-label='Scenario estimate over ${horizon} horizon'><line x1='30' y1='145' x2='290' y2='145'></line><polyline points='${points}'></polyline>${circles}${ticks}</svg><div class='horizon-total'><span>${horizon.toUpperCase()} HORIZON</span><strong>${values[values.length - 1]?.toLocaleString('en-IN') || '0'}</strong><small>estimated bags avoided at current inputs</small></div>`;
}

export function initDataVisuals() {
  drawDonut();
  drawBars();
  drawRadar(0, Array<boolean>(6).fill(false));
  drawHorizon();
  window.addEventListener('eco-score-update', (event: Event) => {
    const detail = (event as CustomEvent<{ score: number; answers: boolean[] }>).detail;
    drawRadar(detail.score, detail.answers);
  });
  document.querySelectorAll<HTMLButtonElement>('#horizonControls button').forEach(button => button.addEventListener('click', () => {
    horizon = (button.dataset.horizon || 'daily') as typeof horizon;
    document.querySelectorAll('#horizonControls button').forEach(item => item.classList.toggle('active', item === button));
    drawHorizon();
  }));
  ['customers','bags','reduction'].forEach(id => document.querySelector(`#${id}`)?.addEventListener('input', drawHorizon));
}
