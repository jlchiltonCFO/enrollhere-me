'use strict';

const lessons = [
  { title: 'Get your ready kit', body: 'Before you begin, put everything beside you: a personal email account you can open, a smartphone with a front-facing camera, your personal phone number, your Social Security number, and one valid government photo ID.', tip: 'Most people use a driver’s license, state ID, passport, passport card, or permanent resident card. Your name and birth date should match what you enter.', visual: 'ready' },
  { title: 'Start with the service you need', body: 'Go to the official website for the agency or organization you want to use. Choose its ID.me button. That sends you to ID.me for account setup and identity verification.', tip: 'Stop if a page asks you to begin from an unexpected link. The ID.me part of the process should use a website address that belongs to id.me.', visual: 'address' },
  { title: 'Create your ID.me Wallet', body: 'Choose “Create a wallet.” Enter a personal email address you can keep using, make a strong and unique password, then open the confirmation email from ID.me and confirm your address.', tip: 'If you discover that you already have an ID.me Wallet, stop creating a new one and use ID.me’s official sign-in or recovery help.', visual: 'wallet' },
  { title: 'Protect your new account', body: 'Set up multi-factor authentication. ID.me may offer a passkey, code generator, push notification, text message, phone call, or security key. Follow the choice that works best for you.', tip: 'ID.me recommends setting up at least two security methods. Never tell another person your password or one-time security code.', visual: 'security' },
  { title: 'Verify that you are you', body: 'Follow ID.me’s directions to photograph your valid photo ID, take a short video selfie, and enter the personal information requested. You may move from a computer to your phone for the camera steps.', tip: 'Use good light, avoid glare, include all four corners of your ID, and keep your face centered. If self-service does not work, ID.me may offer a video call and ask for additional documents.', visual: 'verify' },
  { title: 'Review before you share', body: 'ID.me will show the information the agency or organization wants to receive. Read the list. Choose Allow only when you understand and agree. You should then return to the service where you started.', tip: 'Identity verification confirms who you are. The agency or organization still decides your eligibility or access.', visual: 'consent' },
  { title: 'Take the readiness test', body: 'Choose one answer for each question. This is only a knowledge check. Do not type or upload any personal information.', tip: 'You can review any step and try the test again as often as you like.', visual: 'test', quiz: true }
];

const questions = [
  { prompt: 'Where should you begin?', answers: ['A link from a stranger', 'The official agency or organization website', 'A social-media advertisement'], correct: 1 },
  { prompt: 'What should you keep private?', answers: ['Your password and one-time security code', 'The name of the agency', 'The kind of phone you use'], correct: 0 },
  { prompt: 'What happens before you choose Allow?', answers: ['You review what information will be shared', 'You create a second ID.me account', 'You send your documents to a helper'], correct: 0 }
];

let current = 0;
const content = document.getElementById('lesson-content');
const visual = document.getElementById('lesson-visual');
const previous = document.getElementById('previous');
const next = document.getElementById('next');

function render() {
  const item = lessons[current];
  document.getElementById('progress-label').textContent = `Step ${current + 1} of ${lessons.length}`;
  document.getElementById('progress-bar').style.width = `${((current + 1) / lessons.length) * 100}%`;
  content.replaceChildren();
  const kicker = document.createElement('p');
  kicker.className = 'kicker';
  kicker.textContent = item.quiz ? 'FINAL CHECK' : `STEP ${current + 1}`;
  const title = document.createElement('h2');
  title.id = 'lesson-title';
  title.textContent = item.title;
  const body = document.createElement('p');
  body.className = 'lesson-lead';
  body.textContent = item.body;
  const tip = document.createElement('div');
  tip.className = 'lesson-tip';
  tip.textContent = item.tip;
  content.append(kicker, title, body);
  if (item.quiz) content.append(buildQuiz());
  content.append(tip);
  visual.className = `lesson-visual visual-${item.visual}`;
  visual.innerHTML = visualMarkup(item.visual);
  previous.disabled = current === 0;
  next.textContent = item.quiz ? 'Check my answers' : 'Next step →';
  next.dataset.action = item.quiz ? 'check' : 'next';
  content.focus({ preventScroll: true });
}

function buildQuiz() {
  const form = document.createElement('form');
  form.id = 'readiness-test';
  form.className = 'readiness-test';
  questions.forEach((question, questionIndex) => {
    const fieldset = document.createElement('fieldset');
    const legend = document.createElement('legend');
    legend.textContent = `${questionIndex + 1}. ${question.prompt}`;
    fieldset.append(legend);
    question.answers.forEach((answer, answerIndex) => {
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `question-${questionIndex}`;
      input.value = String(answerIndex);
      label.append(input, document.createTextNode(answer));
      fieldset.append(label);
    });
    form.append(fieldset);
  });
  const result = document.createElement('div');
  result.id = 'test-result';
  result.className = 'test-result';
  result.setAttribute('role', 'status');
  result.setAttribute('aria-live', 'polite');
  form.append(result);
  return form;
}

function checkAnswers() {
  const form = document.getElementById('readiness-test');
  const result = document.getElementById('test-result');
  let answered = 0;
  let correct = 0;
  questions.forEach((question, index) => {
    const selected = form.querySelector(`input[name="question-${index}"]:checked`);
    if (selected) {
      answered += 1;
      if (Number(selected.value) === question.correct) correct += 1;
    }
  });
  result.setAttribute('tabindex', '-1');
  if (answered < questions.length) {
    result.className = 'test-result needs-attention';
    result.textContent = 'Please answer all three questions. It is okay to look back at the earlier steps.';
  } else if (correct === questions.length) {
    result.className = 'test-result passed';
    result.innerHTML = '<strong>You’re ready.</strong> You answered all three questions correctly. Begin for real from the official organization website and move at your own pace.';
    next.textContent = 'Review from the start ↺';
    next.dataset.action = 'restart';
  } else {
    result.className = 'test-result needs-attention';
    result.innerHTML = `<strong>You got ${correct} of ${questions.length} correct.</strong> Review the steps, then try again. Your answers have not been saved or sent anywhere.`;
  }
  result.focus();
}

function visualMarkup(type) {
  if (type === 'ready') return '<div class="practice-card"><span aria-hidden="true">✓</span><strong>Your ready kit</strong><small>Personal email · smartphone · phone number · Social Security number · valid photo ID</small></div>';
  if (type === 'address') return '<div class="idme-training-example"><span class="example-label">Example button you may see</span><span class="idme-button-clear"><img src="assets/sign-in-button-white-green-text.svg" alt="" width="191" height="48"></span><small>This is a picture for practice, not a working sign-in button.</small><div class="browser-demo"><span>● ● ●</span><strong>🔒 api.id.me</strong><small>Begin at the service you need. Check that the ID.me page belongs to id.me.</small></div></div>';
  if (type === 'wallet') return '<div class="practice-card"><span aria-hidden="true">✉</span><strong>Create, then confirm</strong><small>Use a personal email you can open and keep.</small></div>';
  if (type === 'security') return '<div class="practice-card"><span aria-hidden="true">••••••</span><strong>Add account security</strong><small>Set up two methods if you can. Codes stay private.</small></div>';
  if (type === 'verify') return '<div class="practice-card"><span aria-hidden="true">▣</span><strong>ID photo + video selfie</strong><small>Follow ID.me’s camera directions in good light.</small></div>';
  if (type === 'consent') return '<div class="practice-card"><span aria-hidden="true">✓</span><strong>Pause and review</strong><small>Understand what will be shared before choosing Allow.</small></div>';
  return '<div class="practice-card complete"><span aria-hidden="true">★</span><strong>Three simple questions</strong><small>Show that you can recognize the safe first-time process.</small></div>';
}

next.addEventListener('click', () => {
  if (next.dataset.action === 'check') return checkAnswers();
  if (next.dataset.action === 'restart') current = 0;
  else if (current < lessons.length - 1) current += 1;
  render();
});
previous.addEventListener('click', () => { if (current > 0) { current -= 1; render(); } });
document.getElementById('text-size').addEventListener('click', event => {
  const on = document.documentElement.classList.toggle('large-text');
  event.currentTarget.setAttribute('aria-pressed', String(on));
  event.currentTarget.textContent = on ? 'Standard text' : 'Larger text';
});
render();
