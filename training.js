'use strict';
const lessons = [
  {title:'Know where you are', body:'A real ID.me sign-in takes place on an ID.me website. Before entering anything, look at the address bar and make sure the address belongs to id.me.', tip:'Training tip: the browser address is more important than a page’s colors or logo.', visual:'address'},
  {title:'Use the account you already have', body:'If you have used ID.me before, sign in with that same account. Do not create another account just because you are using a new government service.', tip:'Not sure which email you used? Stop and use ID.me’s official account recovery help.', visual:'account'},
  {title:'Complete the security step', body:'After your password, ID.me may ask for a security code or another method you chose earlier. Keep that code private—even from a trusted helper.', tip:'A legitimate helper can explain where to click. They should never ask you to read your code aloud.', visual:'security'},
  {title:'Review before you agree', body:'ID.me may show what information another service wants to receive. Read the page and continue only if you understand and agree.', tip:'Signing in does not automatically grant benefits or access. The other service decides what happens next.', visual:'consent'},
  {title:'You’re ready to recognize the process', body:'You now know the basic ID.me sign-in journey: check the website, use your existing account, protect your security step, and review what you share.', tip:'This lesson does not sign you in. When you use a real service, follow its link to ID.me and move at your own pace.', visual:'complete'}
];
let current = 0;
const content = document.getElementById('lesson-content');
const visual = document.getElementById('lesson-visual');
const previous = document.getElementById('previous');
const next = document.getElementById('next');
function render() {
  const item = lessons[current];
  document.getElementById('progress-label').textContent = `Lesson ${current + 1} of ${lessons.length}`;
  document.getElementById('progress-bar').style.width = `${((current + 1) / lessons.length) * 100}%`;
  content.replaceChildren();
  const kicker = document.createElement('p'); kicker.className = 'kicker'; kicker.textContent = `STEP ${current + 1}`;
  const title = document.createElement('h1'); title.id = 'lesson-title'; title.textContent = item.title;
  const body = document.createElement('p'); body.className = 'lesson-lead'; body.textContent = item.body;
  const tip = document.createElement('div'); tip.className = 'lesson-tip'; tip.textContent = item.tip;
  content.append(kicker, title, body, tip);
  visual.className = `lesson-visual visual-${item.visual}`;
  visual.innerHTML = visualMarkup(item.visual);
  previous.disabled = current === 0;
  next.textContent = current === lessons.length - 1 ? 'Review from the start ↺' : 'Next step →';
  content.focus({preventScroll:true});
}
function visualMarkup(type) {
  if (type === 'address') return '<div class="browser-demo"><span>● ● ●</span><strong>🔒 api.id.me</strong><small>Look for id.me in the website address.</small></div>';
  if (type === 'account') return '<div class="practice-card"><span aria-hidden="true">◎</span><strong>Your existing account</strong><small>Use the email already connected to ID.me.</small></div>';
  if (type === 'security') return '<div class="practice-card"><span aria-hidden="true">••••••</span><strong>Security codes stay private</strong><small>Never share a one-time code.</small></div>';
  if (type === 'consent') return '<div class="practice-card"><span aria-hidden="true">✓</span><strong>Pause and review</strong><small>Understand what will be shared before continuing.</small></div>';
  return '<div class="practice-card complete"><span aria-hidden="true">★</span><strong>Lesson complete</strong><small>You know the four safety checks.</small></div>';
}
next.addEventListener('click', () => { current = current === lessons.length - 1 ? 0 : current + 1; render(); });
previous.addEventListener('click', () => { if (current > 0) { current -= 1; render(); } });
document.getElementById('text-size').addEventListener('click', event => { const on = document.documentElement.classList.toggle('large-text'); event.currentTarget.setAttribute('aria-pressed', String(on)); event.currentTarget.textContent = on ? 'Standard text' : 'Larger text'; });
render();
