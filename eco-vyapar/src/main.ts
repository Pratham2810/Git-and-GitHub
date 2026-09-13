import '@fontsource-variable/manrope';
import '@fontsource-variable/syne';
import './styles.css';
import './future.css';
import './experience.css';
import './dashboard.css';
import './simulator.css';
import './award.css';
import { initEcoWorld } from './scene3d';
import { initFutureUI } from './future';
import { initExperienceShell } from './experience';
import { initDataVisuals } from './charts';
import { initGreenStoreSimulator } from './simulator3d';
import { initParallaxExperience } from './parallax';

const questions = [
  'Avoid unnecessary plastic bags',
  'Offer paper, biodegradable or reusable alternatives',
  'Encourage customers to carry reusable bags',
  'Minimise unnecessary packaging',
  'Manage shop waste responsibly',
  'Communicate sustainable choices to customers',
];
const qState = Array<boolean>(6).fill(false);
const qBox = document.querySelector<HTMLDivElement>('#questions');
const scoreValue = document.querySelector<HTMLElement>('#scoreValue');
const scoreLabel = document.querySelector<HTMLElement>('#scoreLabel');
const ring = document.querySelector<HTMLElement>('#ring');
const tips = document.querySelector<HTMLDivElement>('#tips');

function updateScore() {
  if (!qBox || !scoreValue || !scoreLabel || !ring || !tips) return;
  qBox.innerHTML = questions
    .map(
      (q, i) =>
        `<button class='q ${qState[i] ? 'on' : ''}' data-i='${i}'><span>${String(i + 1).padStart(2, '0')}</span><b>${q}</b><em>${qState[i] ? 'YES' : 'NO'}</em></button>`
    )
    .join('');
  qBox.querySelectorAll<HTMLButtonElement>('.q').forEach(button =>
    button.addEventListener('click', () => {
      const index = Number(button.dataset.i);
      qState[index] = !qState[index];
      updateScore();
    })
  );
  const score = Math.round((qState.filter(Boolean).length / 6) * 100);
  const label =
    score >= 84
      ? 'Green Retail Champion'
      : score >= 67
        ? 'Green Retailer'
        : score >= 34
          ? 'Transitioning Retailer'
          : 'Starting the Green Journey';
  scoreValue.textContent = String(score);
  scoreLabel.textContent = label;
  ring.style.setProperty('--deg', `${score * 3.6}deg`);
  const suggestions: string[] = [];
  if (!qState[0])
    suggestions.push('Stop automatic bag distribution for small purchases.');
  if (!qState[1])
    suggestions.push('Keep a visible reusable or paper option at the counter.');
  if (!qState[2]) suggestions.push('Prompt customers to bring their own bag.');
  tips.innerHTML = suggestions
    .slice(0, 3)
    .map(item => `<div>→ ${item}</div>`)
    .join('');
  window.dispatchEvent(new CustomEvent('eco-score-update', { detail: { score, answers: [...qState] } }));
}
updateScore();

function calculateImpact() {
  const customers = Number(
    document.querySelector<HTMLInputElement>('#customers')?.value || 0
  );
  const bags = Number(
    document.querySelector<HTMLInputElement>('#bags')?.value || 0
  );
  const reduction = Number(
    document.querySelector<HTMLInputElement>('#reduction')?.value || 0
  );
  const daily = Math.round((Math.min(customers, bags) * reduction) / 100);
  const dailyEl = document.querySelector<HTMLElement>('#daily');
  const monthlyEl = document.querySelector<HTMLElement>('#monthly');
  const yearlyEl = document.querySelector<HTMLElement>('#yearly');
  if (dailyEl) dailyEl.textContent = daily.toLocaleString('en-IN');
  if (monthlyEl) monthlyEl.textContent = (daily * 30).toLocaleString('en-IN');
  if (yearlyEl) yearlyEl.textContent = (daily * 365).toLocaleString('en-IN');
}
['customers', 'bags', 'reduction'].forEach(id =>
  document
    .querySelector<HTMLInputElement>(`#${id}`)
    ?.addEventListener('input', calculateImpact)
);
calculateImpact();

const pledgeForm = document.querySelector<HTMLFormElement>('#pledgeForm');
const formFields = document.querySelector<HTMLElement>('#formFields');
const success = document.querySelector<HTMLElement>('#success');
pledgeForm?.addEventListener('submit', event => {
  event.preventDefault();
  if (!pledgeForm.checkValidity()) {
    pledgeForm.reportValidity();
    return;
  }
  if (formFields) formFields.hidden = true;
  if (success) success.hidden = false;
});
document
  .querySelector<HTMLButtonElement>('#resetPledge')
  ?.addEventListener('click', () => {
    pledgeForm?.reset();
    if (formFields) formFields.hidden = false;
    if (success) success.hidden = true;
  });

const challengeActions = [
  'Bring your own bag',
  'Say no to unnecessary plastic',
  'Reuse existing bags',
  'Choose sustainable packaging',
  'Encourage your local retailer',
];
const challengeState = Array<boolean>(5).fill(false);
const challengeBox =
  document.querySelector<HTMLDivElement>('#challengeActions');
function renderChallenge() {
  if (!challengeBox) return;
  challengeBox.innerHTML = challengeActions
    .map(
      (item, i) =>
        `<button class='action ${challengeState[i] ? 'done' : ''}' data-i='${i}'><span>${challengeState[i] ? '✓' : '○'}</span>${item}</button>`
    )
    .join('');
  challengeBox.querySelectorAll<HTMLButtonElement>('.action').forEach(button =>
    button.addEventListener('click', () => {
      const index = Number(button.dataset.i);
      challengeState[index] = !challengeState[index];
      renderChallenge();
    })
  );
  const completed = challengeState.filter(Boolean).length;
  const score = document.querySelector<HTMLElement>('#challengeScore');
  const label = document.querySelector<HTMLElement>('#challengeLabel');
  if (score) score.textContent = `${completed}/5`;
  if (label)
    label.textContent =
      completed === 5 ? 'Green Consumer Champion' : 'Green actions completed';
}
renderChallenge();
initExperienceShell();
initEcoWorld();
initFutureUI();
initDataVisuals();
initGreenStoreSimulator();
initParallaxExperience();
