'use strict';

const lessons = [
  {title:'Set up your Norvise', skill:'Setup', video:'9gOf1ZYcXUo', credit:'Norvise setup demonstration', steps:[
    'Mount the vise and thread post securely using the instructions for your setup.',
    'Clamp an unthreaded practice hook. Turn the vise slowly and watch the shank from the side.',
    'Adjust the hook position and repeat until the section you plan to wrap rotates close to the vise axis.'
  ], checkpoint:'Can you turn the hook through a full rotation without its working section tracing a wide circle?'},
  {title:'Work with the automatic bobbin', skill:'Thread control', video:'4FH7OcK-PLg', credit:'Norm Norlander · The Automatic Bobbin', steps:[
    'Follow Norm’s demonstration to thread and prepare the automatic bobbin.',
    'Start the thread on a practice hook, then use the thread post as shown to keep the working thread clear.',
    'Practice picking up the bobbin and bringing the thread back to the hook. Repeat until the transition feels controlled.'
  ], checkpoint:'Can you move between wrapping and parking the thread without losing control of the wraps?'},
  {title:'Practice rotary dubbing', skill:'Rotary technique', video:'39xvJCfd4Js', credit:'Norm Norlander · Dubbing', steps:[
    'Watch Norm demonstrate dubbing on the vise. Prepare a practice hook and a small pinch of dubbing.',
    'Turn the vise slowly as you build a short body. Watch for gaps and clumps as the body rotates.',
    'Repeat with less dubbing. Compare how evenly the two bodies taper.'
  ], checkpoint:'Can you build a thin body with an even taper while controlling the speed of the vise?'}
];

const materials = ['Curved scud hook','Tying thread','Olive or tan dubbing','Translucent scud back','Fine wire rib','Two contrasting leg materials'];
const steps = [
  ['Plan the profile','Choose a curved hook and set out the same body, shellback, and rib for both flies. Set aside two leg materials so you can vary only one feature.'],
  ['Start the thread and tie in the rib','Secure the hook, lay a thread base, and tie in the fine wire and shellback near the rear. Leave room by the hook eye for finishing.'],
  ['Build the body','Apply a small amount of dubbing at a time. Use slow rotary turns to check the outline and build an even body.'],
  ['Pull the shellback and add the rib','Bring the shellback over the top. Secure it and spiral the rib forward in spaced turns to suggest segments. Keep the hook eye clear.'],
  ['Finish and make the second fly','Tie off and trim. On the second fly, use a different fiber for the legs. Try a softer fiber against a stiffer one and record what you changed.']
];
const anatomy = [
  ['Shellback','The curved back is a visible part of the natural scud’s outline. Translucent scud back lets some of the body color show through. Compare its profile from the side and above.'],
  ['Segmentation','Spaced rib turns suggest the scud’s segmented body and hold the shellback in place. Keep the spacing similar across both test flies.'],
  ['Leg fibers','The prominent legs help define the underside of a scud. Compare how softer and stiffer fibers behave when still and after a gentle pull.'],
  ['Depth & drift','Compare how the flies settle with the same hook and weight. On the water, record depth and presentation so you can interpret what happened on each drift.']
];

const main = document.querySelector('main');
const tabs = ['home','learn','bench','lab','community','totw'];
const storageKey = 'riverturn-v1';
let state = {done:[], materials:[], step:0, lab:{}, draft:{}};
try { state = {...state, ...JSON.parse(localStorage.getItem(storageKey))}; } catch {}
let lesson = lessons.findIndex((_, i) => !state.done.includes(i));
if (lesson < 0) lesson = 0;
let part = 0;
let route = 'home';
let installPrompt;

function persist() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

function intro(label, title, copy) {
  return `<div class="section-intro"><p class="eyebrow">${label}</p><h1 class="page-title">${title}</h1><p>${copy}</p></div>`;
}

function video(id, label) {
  return `<a class="source" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">${label} ↗</a>`;
}

function selector(items, active, label, action) {
  return `<div class="selectors" role="group" aria-label="${label}">${items.map((item, i) => `<button type="button" data-${action}="${i}" aria-pressed="${active === i}">${item}</button>`).join('')}</div>`;
}

function home() {
  return `<section class="hero" aria-labelledby="hero-title">
    <div class="hero-copy"><p class="eyebrow">THE NORVISE LEARNING PATH</p><h1 id="hero-title">From the vise<br> <em>to the water.</em></h1>
      <p>Get comfortable with your Norvise, design flies that come alive in the water, and learn alongside other tiers.</p>
      <div class="actions"><a class="button light" href="#learn">${state.done.length ? 'Continue learning' : 'Start learning'} →</a><a class="button outline" href="#lab">Explore Fly Lab</a></div>
    </div>
    <figure class="hero-art" role="img" aria-label="Field illustration of a scud fly with callouts for the shellback, hook, and fibers"><figcaption class="figure-label">FIG. 01 &nbsp; / &nbsp; FRESHWATER SCUD</figcaption></figure>
  </section>
  <aside class="progress-band" aria-label="Your learning progress"><strong>Norvise Fundamentals</strong><progress max="3" value="${state.done.length}" aria-label="Fundamentals completed"></progress><p>${state.done.length} of 3 lessons complete</p><a href="#learn">View lessons →</a></aside>
  <section><div class="section-head"><div><p class="eyebrow">AT THE BENCH</p><h2>Pick up where you are</h2></div><p>Your first project follows a scud from sketch to stream.</p></div>
    <div class="cards">
      <a class="card" href="#learn"><span class="chip">01 / LEARN</span><h3>Know your Norvise</h3><p>Set up the vise, get comfortable with the bobbin, and practice rotary dubbing.</p><span class="go">Open fundamentals →</span></a>
      <a class="card" href="#bench"><span class="chip">02 / TIE</span><h3>Tie a freshwater scud</h3><p>Work through a recipe one step at a time with a checklist that stays with you.</p><span class="go">Open Bench Mode →</span></a>
      <a class="card" href="#lab"><span class="chip">03 / TEST</span><h3>Make one change</h3><p>Compare leg materials and log what you see in a clear container or out fishing.</p><span class="go">Open Fly Lab →</span></a>
    </div>
  </section>`;
}

function learn() {
  const item = lessons[lesson];
  const done = state.done.includes(lesson);
  return intro('01 / LEARN', 'Norvise Fundamentals', 'Three short practice sessions to get you comfortable with the system at your own bench.') +
    selector(lessons.map((entry, i) => `${i + 1}. ${entry.skill}${state.done.includes(i) ? ' ✓' : ''}`), lesson, 'Choose a lesson', 'lesson') +
    `<div class="split"><section class="panel"><p class="eyebrow">LESSON ${lesson + 1} OF 3</p><h2>${item.title}</h2><ol>${item.steps.map(step => `<li>${step}</li>`).join('')}</ol>
    <button class="button" type="button" data-complete>${done ? 'Completed · Undo' : 'Mark lesson complete'}</button>
    ${lesson < lessons.length - 1 ? `<button class="button outline" type="button" data-lesson="${lesson + 1}">Next lesson →</button>` : '<a class="button outline" href="#bench">Try Bench Mode →</a>'}
    <p class="saved" id="save-status" role="status"></p></section>
    <aside class="panel"><p class="eyebrow">WATCH & PRACTICE</p><h3>Original demonstration</h3><p>${video(item.video, item.credit)}</p><p><strong>Bench checkpoint</strong></p><p>${item.checkpoint}</p></aside></div>`;
}

function bench() {
  const [title, copy] = steps[state.step];
  return intro('02 / BENCH MODE', 'Tie a freshwater scud', 'Work at your pace. Your step and materials checklist are saved on this device.') +
    `<div class="split"><section class="panel"><p class="eyebrow">STEP ${state.step + 1} OF ${steps.length}</p><progress max="${steps.length}" value="${state.step + 1}" aria-label="Current bench step"></progress><h2>${title}</h2><p>${copy}</p>
    <div class="actions"><button class="button outline" type="button" data-step="${state.step - 1}" ${state.step === 0 ? 'disabled' : ''}>← Back</button>
    ${state.step === steps.length - 1 ? '<a class="button" href="#lab">Open Fly Lab →</a>' : `<button class="button" type="button" data-step="${state.step + 1}">Next step →</button>`}</div>
    <p class="saved" id="save-status" role="status"></p><p>${video('VTPDQaC195Y','Norvise · Tying a Scud')}</p></section>
    <aside class="panel"><h3>Materials checklist</h3><div class="checklist">${materials.map((material, i) => `<label><input type="checkbox" data-material="${i}" ${state.materials.includes(i) ? 'checked' : ''}>${material}</label>`).join('')}</div></aside></div>`;
}

function lab() {
  return intro('03 / FLY LAB', 'A scud under the surface', 'Tie two versions, change one feature, and see what each fly does in the water.') +
    `<div class="split"><section class="panel"><img class="lab-art" src="./hero.svg" alt="Illustration showing the shellback, hook, and leg fibers of the scud imitation"><h2>Explore the imitation</h2>
      ${selector(anatomy.map(entry => entry[0]), part, 'Scud design features', 'part')}
      <p id="part-description" aria-live="polite">${anatomy[part][1]}</p>
      <p><a class="source" href="https://news.orvis.com/fly-fishing/video-how-to-tie-a-simple-scud-pattern-2" target="_blank" rel="noopener">Read about natural scuds at Orvis ↗</a></p></section>
      <section class="panel"><h2>Compare A and B</h2><p>Use the same hook, body, and weight. Try both in still water, then give each the same gentle pull.</p>
      <form class="fields" data-form="lab">
        <label>Version A leg material<input name="a" type="text" maxlength="120" placeholder="e.g. soft hackle"></label>
        <label>Version B leg material<input name="b" type="text" maxlength="120" placeholder="e.g. stiff synthetic fibers"></label>
        <label>What did you see in the water?<textarea name="notes" maxlength="3000"></textarea></label>
        <label>Fishing notes, conditions, or takes<textarea name="field" maxlength="3000"></textarea></label>
        <button class="button" type="submit">Save comparison</button>
        <p class="saved" id="save-status" role="status"></p>
      </form></section></div>`;
}

function community() {
  return intro('04 / COMMUNITY', 'The tying circle', 'A place for tie-alongs, feedback, and bragging rights from the bench and the water.') +
    `<div class="split"><section class="panel"><p class="eyebrow">PILOT CHALLENGE</p><h2>Design a better scud for trout</h2>
      <p>Choose one change to the baseline scud. Explain what you expected and what you saw, whether you tested it in a container or on the water.</p>
      <p><strong>Proposed awards</strong></p><ul><li>Best Tie</li><li>Best Original Design</li><li>Best Field Report</li><li>Best Catch Story</li></ul><a class="button outline" href="#lab">Open the scud project →</a></section>
      <section class="panel"><h2>Draft your entry</h2><p>This prototype saves a private draft on your device. Shared entries and voting are planned.</p>
      <form class="fields" data-form="draft">
        <label>Fly name<input name="name" type="text" maxlength="120" required></label>
        <label>What did you change?<textarea name="change" maxlength="3000" required></textarea></label>
        <label>What happened when you tested it?<textarea name="result" maxlength="3000"></textarea></label>
        <button class="button" type="submit">Save private draft</button><p class="saved" id="save-status" role="status"></p>
      </form></section></div>`;
}

function totw() {
  return intro('05 / TOTW', 'Time on the Water', 'A planned podcast and event series that pairs each conversation with something to try on your next outing.') +
    `<div class="split"><section class="panel"><p class="eyebrow">PROPOSED PILOT EPISODE</p><h2>What makes a scud look alive?</h2><p>A tier and an angler compare what they look for in a scud and how they would test it.</p>
      <ol><li>Tie two scuds with different leg fibers.</li><li>Compare their profiles and motion underwater.</li><li>Fish them at comparable depths and share what you noticed.</li></ol><a class="button" href="#lab">Try the field assignment →</a></section>
      <aside class="panel"><h3>Explorer mission</h3><p>Tie the baseline scud, change one material, and write down where the app helped or where you got stuck. The Ladybug feedback connection is planned for the Explorer build.</p><a class="source" href="#bench">Start in Bench Mode →</a></aside></div>`;
}

const pages = {home, learn, bench, lab, community, totw};

function render() {
  main.innerHTML = pages[route]();
  for (const link of document.querySelectorAll('nav a')) {
    if (link.hash === '#' + route) link.setAttribute('aria-current','page');
    else link.removeAttribute('aria-current');
  }
  const form = main.querySelector('form[data-form]');
  if (form) {
    for (const field of form.elements) {
      if (field.name) field.value = state[form.dataset.form][field.name] ?? '';
    }
  }
}

function navigate(focus) {
  const hash = location.hash.slice(1);
  if (hash === 'main') return;
  route = tabs.includes(hash) ? hash : 'home';
  render();
  if (focus) {
    main.focus({preventScroll:true});
    window.scrollTo(0,0);
  }
}

function save(message) {
  const saved = persist();
  const status = document.querySelector('#save-status');
  if (status) status.textContent = saved ? message : 'Browser storage is unavailable. This change lasts for this session.';
}

main.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  const {dataset} = button;
  if ('lesson' in dataset) {
    lesson = Number(dataset.lesson);
    render();
    main.querySelector(`.selectors [data-lesson="${lesson}"]`).focus();
  }
  if ('complete' in dataset) {
    const wasDone = state.done.includes(lesson);
    state.done = wasDone ? state.done.filter(i => i !== lesson) : [...state.done, lesson];
    render();
    save(wasDone ? 'Lesson marked incomplete.' : 'Lesson complete. Progress saved on this device.');
    main.querySelector('[data-complete]').focus();
  }
  if ('step' in dataset) {
    state.step = Number(dataset.step);
    render();
    save('Step saved on this device.');
    const heading = main.querySelector('section h2');
    heading.tabIndex = -1;
    heading.focus();
  }
  if ('part' in dataset) {
    part = Number(dataset.part);
    for (const item of main.querySelectorAll('[data-part]')) {
      item.setAttribute('aria-pressed', String(Number(item.dataset.part) === part));
    }
    main.querySelector('#part-description').textContent = anatomy[part][1];
  }
});

main.addEventListener('change', event => {
  if (!('material' in event.target.dataset)) return;
  const i = Number(event.target.dataset.material);
  state.materials = event.target.checked ? [...state.materials, i] : state.materials.filter(item => item !== i);
  save('Checklist saved on this device.');
});

main.addEventListener('submit', event => {
  const form = event.target;
  if (!form.dataset.form) return;
  event.preventDefault();
  state[form.dataset.form] = Object.fromEntries(new FormData(form));
  save(form.dataset.form === 'lab' ? 'Comparison saved on this device.' : 'Private draft saved on this device.');
});

document.querySelector('[data-install]').addEventListener('click', async () => {
  if (installPrompt) {
    const prompt = installPrompt;
    installPrompt = undefined;
    await prompt.prompt();
  } else {
    document.querySelector('#install-help').showModal();
  }
});
window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  installPrompt = event;
});
window.addEventListener('hashchange', () => navigate(true));
navigate(false);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(error => console.warn('Offline setup unavailable', error));
}
