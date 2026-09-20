'use strict';

const lessons = [
  {
    title: 'Put these items beside you',
    body: 'Have your phone, personal email, Social Security number, and photo ID ready.',
    tip: 'Do not enter any of them on this practice website.',
    visual: 'ready'
  },
  {
    title: 'Start at the official website',
    body: 'Open the government service you need. Choose its ID.me button.',
    tip: 'The ID.me page should have an address that ends in id.me.',
    visual: 'address'
  },
  {
    title: 'Create and protect your account',
    body: 'Use your personal email. Make a new password. Then choose a security method for your phone.',
    tip: 'Keep your password and security codes private.',
    visual: 'security'
  },
  {
    title: 'Follow the ID.me directions',
    body: 'ID.me may ask for a photo of your ID and a short video selfie. Review the information before you choose Allow.',
    tip: 'Use good light. Take your time. It is okay to stop and get official help.',
    visual: 'verify'
  },
  {
    title: 'Quick safety check',
    body: 'Choose one answer for each question.',
    tip: 'Nothing is saved or sent.',
    visual: 'test',
    quiz: true
  }
];

const questions = [
  { prompt: 'Where should you begin?', answers: ['The official agency website', 'A link in an unexpected message'], correct: 0 },
  { prompt: 'What should stay private?', answers: ['The agency name', 'Your password and security code'], correct: 1 },
  { prompt: 'What should you do before choosing Allow?', answers: ['Review what will be shared', 'Send your documents to a helper'], correct: 0 }
];

let current = 0;
const content = document.getElementById('lesson-content');
const visual = document.getElementById('lesson-visual');
const previous = document.getElementById('previous');
const next = document.getElementById('next');
const progressTrack = document.querySelector('.progress-track');
const officialSites = document.getElementById('official-sites');

function render() {
  const item = lessons[current];
  document.getElementById('progress-label').textContent = `Step ${current + 1} of ${lessons.length}`;
  document.getElementById('progress-bar').style.width = `${((current + 1) / lessons.length) * 100}%`;
  progressTrack.setAttribute('aria-valuenow', String(current + 1));
  content.replaceChildren();

  const title = document.createElement('h2');
  title.id = 'lesson-title';
  title.textContent = item.title;

  const body = document.createElement('p');
  body.className = 'lesson-lead';
  body.textContent = item.body;

  const tip = document.createElement('div');
  tip.className = 'lesson-tip';
  const tipLabel = document.createElement('strong');
  tipLabel.textContent = 'Remember: ';
  tip.append(tipLabel, document.createTextNode(item.tip));

  content.append(title, body);
  if (item.quiz) content.append(buildQuiz());
  content.append(tip);

  visual.className = `lesson-visual visual-${item.visual}`;
  visual.innerHTML = visualMarkup(item.visual);
  previous.disabled = current === 0;
  next.textContent = item.quiz ? 'Check answers' : 'Next →';
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
    result.textContent = 'Please answer all three questions.';
  } else if (correct === questions.length) {
    result.className = 'test-result passed';
    result.innerHTML = '<strong>You are ready.</strong><br>Choose the government service you need.';
    officialSites.hidden = false;
    next.textContent = 'Choose a service ↓';
    next.dataset.action = 'official';
  } else {
    result.className = 'test-result needs-attention';
    result.innerHTML = '<strong>Almost there.</strong><br>Use the Back button to review, then try again.';
  }
  result.focus();
}

function visualMarkup(type) {
  if (type === 'ready') return '<div class="practice-card"><span aria-hidden="true">✓</span><strong>Your ready kit</strong><small>Phone<br>Email<br>Social Security number<br>Photo ID</small></div>';
  if (type === 'address') return '<div class="idme-training-example"><span class="example-label">Look for this button</span><span class="idme-button-clear"><img src="assets/sign-in-button-white-green-text.svg" alt="" width="191" height="48"></span><small>Practice picture only</small><div class="browser-demo"><span aria-hidden="true">● ● ●</span><strong>🔒 id.me</strong><small>Check the website address.</small></div></div>';
  if (type === 'security') return '<div class="practice-card"><span aria-hidden="true">••••••</span><strong>Keep it private</strong><small>Password<br>Security code</small></div>';
  if (type === 'verify') return '<div class="practice-card"><span aria-hidden="true">▣</span><strong>Take your time</strong><small>ID photo<br>Video selfie<br>Review before Allow</small></div>';
  return '<div class="practice-card complete"><span aria-hidden="true">★</span><strong>Three questions</strong><small>You can try again.</small></div>';
}

next.addEventListener('click', () => {
  if (next.dataset.action === 'check') return checkAnswers();
  if (next.dataset.action === 'official') {
    officialSites.scrollIntoView({ behavior: 'smooth', block: 'start' });
    officialSites.focus({ preventScroll: true });
    return;
  }
  if (next.dataset.action === 'restart') current = 0;
  else if (current < lessons.length - 1) current += 1;
  render();
});

previous.addEventListener('click', () => {
  if (current > 0) {
    current -= 1;
    render();
  }
});

document.getElementById('text-size').addEventListener('click', event => {
  const on = document.documentElement.classList.toggle('large-text');
  event.currentTarget.setAttribute('aria-pressed', String(on));
  event.currentTarget.textContent = on ? 'Use standard text' : 'Make text larger';
});

render();
