(function () {
  'use strict';

  /* ---------- State (in memory) ---------- */
  const state = {
    done: new Set(),
    flow: {}, fallacy: {}, evidence: {}, toulmin: {}, toulminChecked: {},
    rubricTab: 'professor', rubric: { professor: {}, strict: {} }, rubricRevealed: {},
    lensOpen: new Set(), lensNotes: {},
    benoit: {}, benoitChecked: false,
    rq: { theory: 'walton', phen: 'res', method: 'recon' },
    trSeg: 0, trQuery: '', notes: [], logic: {}, gapRate: {}, gapMat: new Set(), viral: {}, opin: {}
  };
  const ORDER = ['flow', 'toulmin', 'fallacy', 'evidence', 'viral', 'rubric', 'lenses', 'benoit', 'research', 'logic', 'gaps'];

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const ext = (url, label) => `<a class="src-link" href="${url}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;
  const who = (w) => `<span class="who who-${esc(w.split(' ')[0])}">${esc(w)}</span>`;
  const check = '<svg class="done" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>';
  const tsToSec = (t) => t.split(':').reduce((a, b) => a * 60 + Number(b), 0);
  const segLink = (key, time) => key && SEG[key] ? ext(SEG[key] + (time ? '&t=' + tsToSec(time) + 's' : ''), time ? 'Watch at ' + time : 'Watch') : '';

  function markDone(id) {
    if (!state.done.has(id)) { state.done.add(id); renderNav(); }
  }

  /* ---------- Theme ---------- */
  (function () {
    const t = $('[data-theme-toggle]'), r = document.documentElement;
    let d = matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
    const sun = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
    const moon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    const apply = () => { r.setAttribute('data-theme', d); t.innerHTML = d === 'dark' ? sun : moon; t.setAttribute('aria-label', 'Switch to ' + (d === 'dark' ? 'light' : 'dark') + ' mode'); };
    apply();
    t.addEventListener('click', () => { d = d === 'dark' ? 'light' : 'dark'; apply(); });
  })();

  /* ---------- Mobile menu ---------- */
  const side = $('#side'), scrim = $('#scrim'), menuBtn = $('#menu-btn');
  const closeMenu = () => { side.classList.remove('open'); scrim.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); };
  menuBtn.addEventListener('click', () => { side.classList.add('open'); scrim.hidden = false; menuBtn.setAttribute('aria-expanded', 'true'); });
  scrim.addEventListener('click', closeMenu);

  /* ---------- Nav ---------- */
  function renderNav() {
    const cur = location.hash.replace('#', '') || 'home';
    let html = `<div class="nav-group"><a class="nav-link" href="#home" ${cur === 'home' ? 'aria-current="page"' : ''}><span class="num">—</span>Syllabus</a></div>`;
    COURSE.forEach((lv) => {
      html += `<div class="nav-group"><h2><span class="lvl">${lv.level}</span>${esc(lv.name)}</h2>`;
      lv.modules.forEach((id) => {
        const m = MODULES[id];
        html += `<a class="nav-link ${state.done.has(id) ? 'is-done' : ''}" href="#m-${id}" ${cur === 'm-' + id ? 'aria-current="page"' : ''}><span class="num">${m.n}</span>${esc(m.short)}${check}</a>`;
      });
      html += '</div>';
    });
    html += `<div class="nav-util">
      <a class="nav-link" href="#transcript" ${cur === 'transcript' ? 'aria-current="page"' : ''}><span class="num">¶</span>Transcript reader</a>
      <a class="nav-link" href="#paper" ${cur === 'paper' ? 'aria-current="page"' : ''}><span class="num">✎</span>Model paper</a>
      <a class="nav-link" href="#readings" ${cur === 'readings' ? 'aria-current="page"' : ''}><span class="num">§</span>Reading list</a></div>`;
    $('#nav').innerHTML = html;
    const n = state.done.size;
    $('#progress-num').textContent = n + ' / ' + ORDER.length;
    $('#progress-fill').style.width = (n / ORDER.length) * 100 + '%';
  }

  /* ---------- Shared module chrome ---------- */
  function levelOf(id) { return COURSE.find((l) => l.modules.includes(id)); }
  function modHead(id, lede) {
    const m = MODULES[id], lv = levelOf(id);
    return `<header class="mod-head">
      <p class="eyebrow">Level ${lv.level} · ${esc(lv.name)} · Module ${m.n}</p>
      <h1 class="h-page">${esc(m.title)}</h1>
      <p class="lede">${lede}</p>
      <div class="mod-meta"><span>About ${m.mins} minutes</span><span>·</span><span>${esc(lv.sub)}</span></div>
    </header>`;
  }
  function modFoot(id) {
    const i = ORDER.indexOf(id), prev = ORDER[i - 1], next = ORDER[i + 1];
    return `<div class="actions" style="margin-top:var(--space-16);justify-content:space-between">
      ${prev ? `<a class="btn btn-ghost" href="#m-${prev}">← ${esc(MODULES[prev].title)}</a>` : '<a class="btn btn-ghost" href="#home">← Syllabus</a>'}
      ${next ? `<a class="btn btn-primary" href="#m-${next}">${esc(MODULES[next].title)} →</a>` : '<a class="btn btn-primary" href="#paper">Read the model paper →</a>'}
    </div>`;
  }
  function scoreLine(right, answered, total) {
    return `<p class="score"><strong>${right}</strong> correct of ${answered} answered · ${total} total</p>`;
  }

  /* ---------- HOME ---------- */
  function home() {
    const lv = COURSE.map((l) => `
      <section class="path-level">
        <div class="path-num">${l.level}</div>
        <div>
          <h3>${esc(l.name)}</h3>
          <p class="sub">${esc(l.sub)}</p>
          <div class="path-mods">
            ${l.modules.map((id) => { const m = MODULES[id]; const d = state.done.has(id); return `<a class="path-mod ${d ? 'is-done' : ''}" href="#m-${id}"><span class="num">${m.n}</span><span class="t">${esc(m.title)}</span><span class="m">${d ? 'Complete' : m.mins + ' min'}</span></a>`; }).join('')}
          </div>
        </div>
      </section>`).join('');
    return `<div class="wrap">
      <section class="hero">
        <p class="eyebrow">Iowa governor debate · October 6, 2026</p>
        <h1 class="h-hero">Read a debate the way a <em>professor</em> does.</h1>
        <p class="lede">Eleven modules take you from flowing arguments and spotting fallacies to grading a round, applying doctoral-level theory, and preparing for a philosophy PhD. Every exercise uses real exchanges between Rob Sand and Zach Lahn, with answer keys you can argue with.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="#m-${ORDER.find((id) => !state.done.has(id)) || 'flow'}">${state.done.size ? 'Continue the course' : 'Start with Module 01'}</a>
          <a class="btn btn-ghost" href="#transcript">Read the transcript</a>
        </div>
        <dl class="case">
          <dt>Case</dt><dd>First of four Sand–Lahn debates, hosted by KWQC at St. Ambrose University, Davenport</dd>
          <dt>Source</dt><dd>Six KWQC segment videos, about 51 minutes of caption transcript</dd>
          <dt>Gap</dt><dd>The agriculture question was not in the posted segments</dd>
        </dl>
      </section>
      <div class="path">${lv}</div>
      <section class="routine">
        <div>
          <p class="eyebrow">Practice routine</p>
          <h2 class="h-page" style="margin-top:var(--space-2)">Six steps for any debate</h2>
          <p class="muted small" style="margin-top:var(--space-3)">Use this after the course on the Oct. 14, Oct. 21 and Oct. 27 debates, where no answer key exists yet.</p>
        </div>
        <ol>
          <li><div><strong>Watch one segment cold</strong> and flow it without the transcript.</div></li>
          <li><div><strong>Read the transcript</strong> and correct your flow.</div></li>
          <li><div><strong>Diagram</strong> the strongest argument from each side.</div></li>
          <li><div><strong>Label every exchange</strong> answered, partly answered, redirected or dropped.</div></li>
          <li><div><strong>Fact-check three claims</strong> per speaker against primary sources.</div></li>
          <li><div><strong>Write a one-page decision</strong> and answer the best objection to your own call.</div></li>
        </ol>
      </section>
    </div>`;
  }

  /* ---------- 01 FLOW ---------- */
  function flow() {
    const ans = state.flow;
    const answered = Object.keys(ans).length, right = FLOW.filter((x, i) => ans[i] === x.key).length;
    const items = FLOW.map((x, i) => {
      const a = ans[i];
      return `<article class="item ${a ? (a === x.key ? 'correct' : 'wrong') : ''}">
        <div class="item-top"><span>${esc(x.seg)}</span>${who(x.from)}<span>makes an argument</span></div>
        <div class="flow-pair">
          <div class="flow-cell"><span class="lab">Argument</span>${esc(x.arg)}</div>
          <div class="flow-cell"><span class="lab">Response</span>${esc(x.resp)}</div>
        </div>
        <div class="choices" role="group" aria-label="Classify the response">
          ${FLOW_OPTIONS.map((o) => `<button class="chip ${a && o === x.key ? 'is-key' : ''}" data-flow="${i}" data-v="${esc(o)}" aria-pressed="${a === o}" ${a ? 'disabled' : ''}>${esc(o)}</button>`).join('')}
        </div>
        ${a ? `<div class="feedback ${a === x.key ? 'ok' : 'no'}"><span class="verdict">${a === x.key ? 'Correct' : 'Key: ' + esc(x.key)}</span><span>${esc(x.why)}</span></div>` : ''}
      </article>`;
    }).join('');
    return `<div class="wrap">${modHead('flow', 'A flow is a debater\'s map of the round. Each argument gets a line; each response gets an arrow back to what it answers. An argument with no arrow pointing at it was dropped, and in academic debate a dropped argument is treated as conceded.')}
      <section class="concept">
        <div class="prose">
          <h2 class="h-sec">How to flow</h2>
          <p>Draw one column per speech. Write each argument in five words or fewer. When a speaker responds, write the response in the next column, level with the argument it answers, and draw an arrow.</p>
          <p>Then audit the arrows. A response that engages the argument's reasoning is an answer. One that changes the subject is a redirect, even if the new subject is a good point. An argument nobody touches is dropped.</p>
          <p>Judges reward clash: direct engagement with the strongest version of the other side's case.</p>
        </div>
        <aside><h3>Four response types</h3><dl>
          <div><dt>Answered</dt><dd>Engages the argument's claim or evidence directly.</dd></div>
          <div><dt>Partly answered</dt><dd>Engages one piece, leaves the rest standing.</dd></div>
          <div><dt>Redirected</dt><dd>Responds, but to a different issue.</dd></div>
          <div><dt>Dropped</dt><dd>No response at all, or a promise to respond later.</dd></div>
        </dl></aside>
      </section>
      <section class="exercise">
        <div class="ex-head"><div><p class="eyebrow">Exercise</p><h2 class="h-sec">Audit twelve exchanges</h2></div>${scoreLine(right, answered, FLOW.length)}</div>
        <div class="items">${items}</div>
        <div class="actions"><button class="btn btn-ghost" data-reset="flow">Reset answers</button><span class="muted small">Watch the ${ext(SEG.econ, 'economy')} and ${ext(SEG.edu, 'education')} segments to check context.</span></div>
        ${answered === FLOW.length ? `<div class="note"><h3>Professor's note</h3><p class="small">Lahn dropped more substantive arguments (Medicaid, voucher admissions, the voting record), which is why he loses on refutation under a strict rubric. Sand's biggest drop is Lahn's spending-versus-results argument, the single strongest evidence-based point Lahn made.</p></div>` : ''}
      </section>${modFoot('flow')}</div>`;
  }

  /* ---------- 02 TOULMIN ---------- */
  function shuffleIdx(n, seed) { const a = [...Array(n).keys()]; let s = seed; for (let i = n - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const j = Math.floor((s / 233280) * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function toulmin() {
    const cards = TOULMIN.map((c, ci) => {
      const checked = state.toulminChecked[ci];
      const order = shuffleIdx(c.frags.length, ci + 7);
      const sel = state.toulmin[ci] || {};
      const right = c.frags.filter((f, fi) => sel[fi] === f.key).length;
      return `<article class="item t-card">
        <div class="item-top">${who(c.who)}<span>${esc(c.title)}</span>${c.src ? segLink(c.src, c.time) : '<span>Paraphrased from a social media endorsement</span>'}</div>
        ${order.map((fi) => { const f = c.frags[fi]; const v = sel[fi] || ''; const ok = v === f.key;
          return `<div class="t-frag ${checked ? (ok ? 'correct' : 'wrong') : ''}">
            <p>${esc(f.x)}</p>
            <select data-tc="${ci}" data-tf="${fi}" aria-label="Label this fragment" ${checked ? 'disabled' : ''}>
              <option value="">Choose a part…</option>${TOULMIN_PARTS.map((p) => `<option ${v === p ? 'selected' : ''}>${esc(p)}</option>`).join('')}
            </select>
            ${checked && !ok ? `<span class="t-fix">Key: ${esc(f.key)}</span>` : ''}
          </div>`; }).join('')}
        ${checked ? `<div class="feedback ${right === c.frags.length ? 'ok' : 'no'}"><span class="verdict">${right} of ${c.frags.length} correct</span><span>${esc(c.note)}</span></div>`
          : `<div class="actions" style="margin-top:0"><button class="btn btn-primary" data-tcheck="${ci}">Check this diagram</button></div>`}
      </article>`;
    }).join('');
    return `<div class="wrap">${modHead('toulmin', 'Stephen Toulmin showed that real arguments rarely look like textbook syllogisms. They have a claim, data that supports it, and a warrant that explains why the data supports the claim. Most weak arguments fail at the warrant.')}
      <section class="concept">
        <div class="prose">
          <h2 class="h-sec">Find the warrant</h2>
          <p>Ask of any argument: "So what? Why does that evidence lead there?" The answer is the warrant. Speakers usually leave it unstated because stating it would expose it to challenge.</p>
          <p>Qualifiers show discipline: "probably," "in the first year," "there are funding issues, no doubt." A speaker who qualifies is claiming only what they can defend.</p>
          <p>The rebuttal gap is the objection a careful opponent would raise. Finding it is how you prepare cross-examination.</p>
        </div>
        <aside><h3>The parts</h3><dl>${TOULMIN_PARTS.map((p) => `<div><dt>${esc(p)}</dt><dd>${esc(TOULMIN_DEFS[p])}</dd></div>`).join('')}</dl></aside>
      </section>
      <section class="exercise">
        <div class="ex-head"><div><p class="eyebrow">Exercise</p><h2 class="h-sec">Diagram three arguments</h2></div><p class="score">${Object.keys(state.toulminChecked).length} of ${TOULMIN.length} checked</p></div>
        <div class="items">${cards}</div>
        <div class="actions"><button class="btn btn-ghost" data-reset="toulmin">Reset diagrams</button></div>
      </section>${modFoot('toulmin')}</div>`;
  }

  /* ---------- 03 FALLACY ---------- */
  function fallacy() {
    const ans = state.fallacy;
    const answered = Object.keys(ans).length, right = FALLACY.filter((x, i) => ans[i] === x.key).length;
    const items = FALLACY.map((x, i) => { const a = ans[i];
      return `<article class="item ${a ? (a === x.key ? 'correct' : 'wrong') : ''}">
        <div class="item-top">${who(x.who)}${segLink(x.src, x.time)}</div>
        <p class="quote">${esc(x.q)}</p>
        <div class="choices" role="group" aria-label="Name the move">
          ${FALLACY_OPTIONS.map((o) => `<button class="chip ${a && o === x.key ? 'is-key' : ''}" data-fal="${i}" data-v="${esc(o)}" aria-pressed="${a === o}" ${a ? 'disabled' : ''}>${esc(o)}</button>`).join('')}
        </div>
        ${a ? `<div class="feedback ${a === x.key ? 'ok' : 'no'}"><span class="verdict">${a === x.key ? 'Correct' : 'Key: ' + esc(x.key)}</span><span>${esc(x.why)}</span></div>` : ''}
      </article>`; }).join('');
    return `<div class="wrap">${modHead('fallacy', 'A fallacy is a move that looks like reasoning but does not support the conclusion. The test is relevance, not tone. A harsh, personal attack can be a fair argument; a polite one can be a fallacy.')}
      <section class="concept">
        <div class="prose">
          <h2 class="h-sec">Relevance is the test</h2>
          <p>Ask: if the attack were true, would it give me a reason to reject the claim being debated? If yes, it may be legitimate even when personal. If no, it is a diversion.</p>
          <p>Two of the eleven excerpts below are legitimate arguments. Labeling everything a fallacy is its own error, and the one doctoral readers most often catch in student work.</p>
        </div>
        <aside><h3>Watch for</h3><dl>${FALLACY_OPTIONS.slice(0, 4).map((p) => `<div><dt>${esc(p)}</dt><dd>${esc(FALLACY_DEFS[p])}</dd></div>`).join('')}</dl></aside>
      </section>
      <div class="defs">${FALLACY_OPTIONS.slice(4).map((p) => `<div class="def"><b>${esc(p)}</b><span>${esc(FALLACY_DEFS[p])}</span></div>`).join('')}</div>
      <section class="exercise">
        <div class="ex-head"><div><p class="eyebrow">Exercise</p><h2 class="h-sec">Fallacy or fair hit?</h2></div>${scoreLine(right, answered, FALLACY.length)}</div>
        <div class="items">${items}</div>
        <div class="actions"><button class="btn btn-ghost" data-reset="fallacy">Reset answers</button></div>
      </section>${modFoot('fallacy')}</div>`;
  }

  /* ---------- 04 EVIDENCE ---------- */
  function evidence() {
    const ans = state.evidence;
    const full = (i) => ans[i] && ans[i].type && ans[i].verdict;
    const answered = EVIDENCE.filter((x, i) => full(i)).length;
    const right = EVIDENCE.filter((x, i) => full(i) && ans[i].type === x.type && ans[i].verdict === x.verdict).length;
    const items = EVIDENCE.map((x, i) => { const a = ans[i] || {}; const f = full(i); const ok = f && a.type === x.type && a.verdict === x.verdict;
      const row = (label, opts, field) => `<div class="chip-row"><span>${label}</span><div class="choices">${opts.map((o) => `<button class="chip ${f && o === x[field] ? 'is-key' : ''}" data-ev="${i}" data-f="${field}" data-v="${esc(o)}" aria-pressed="${a[field] === o}" ${f ? 'disabled' : ''}>${esc(o)}</button>`).join('')}</div></div>`;
      return `<article class="item ${f ? (ok ? 'correct' : 'wrong') : ''}">
        <div class="item-top">${who(x.who)}</div>
        <p class="quote">${esc(x.q)}</p>
        ${row('Claim type', CLAIM_TYPES, 'type')}
        ${row('Verdict', VERDICTS, 'verdict')}
        ${f ? `<div class="feedback ${ok ? 'ok' : 'no'}"><span class="verdict">${ok ? 'Correct' : 'Key: ' + esc(x.type) + ' · ' + esc(x.verdict)}</span><span>${esc(x.why)}${x.url ? ' Source: ' + ext(x.url, x.src) + '.' : ''}</span></div>` : ''}
      </article>`; }).join('');
    return `<div class="wrap">${modHead('evidence', 'Before you can judge whether a claim is true, you have to know what kind of claim it is. Facts can be checked. Characterizations can be supported or not. Opinions can only be argued.')}
      <section class="concept">
        <div class="prose">
          <h2 class="h-sec">Classify, then verify</h2>
          <p>Sort first. "Lahn voted in Kansas in 2022" is a fact. "Lahn is not in Iowa" is a characterization built on facts. "Rob is a radical liberal" is an opinion. Treating an opinion as false, or a characterization as proven, are both analytic errors.</p>
          <p>Then verify facts against primary sources: government data, voting records, the original study. Fact-check outlets are a starting point, not the final word.</p>
          <p>Watch for claims that are technically true but misleading. They are the hardest category and the most common in debates.</p>
        </div>
        <aside><h3>Verdict scale</h3><dl>
          <div><dt>Accurate / Mostly accurate</dt><dd>Supported, with at most minor imprecision.</dd></div>
          <div><dt>Needs context</dt><dd>Literally true, but leaves a misleading impression.</dd></div>
          <div><dt>Overstated</dt><dd>Real basis, inflated beyond what evidence shows.</dd></div>
          <div><dt>False</dt><dd>Contradicted by the record.</dd></div>
          <div><dt>Unverifiable</dt><dd>No evidence settles it, or it is opinion.</dd></div>
        </dl></aside>
      </section>
      <section class="exercise">
        <div class="ex-head"><div><p class="eyebrow">Exercise</p><h2 class="h-sec">Fourteen claims from the stage</h2></div>${scoreLine(right, answered, EVIDENCE.length)}</div>
        <div class="items">${items}</div>
        <div class="actions"><button class="btn btn-ghost" data-reset="evidence">Reset answers</button></div>
        ${answered === EVIDENCE.length ? `<div class="note"><h3>Professor's note</h3><p class="small">Scored on accuracy alone, five of Sand's six claims held up (the sixth is unverifiable), against one of Lahn's seven checkable claims, with one more needing context. Remember the selection effect: Lahn made more specific numerical claims, so he had more chances to be wrong. An analyst reports that caveat rather than hiding it.</p></div>` : ''}
      </section>${modFoot('evidence')}</div>`;
  }


  /* ---------- 05 VIRAL ---------- */
  function viral() {
    const a = state.viral;
    const full = (i) => a[i] && a[i].verdict && a[i].tier;
    const answered = VIRAL.filter((x, i) => full(i)).length;
    const right = VIRAL.filter((x, i) => full(i) && a[i].verdict === x.verdict && a[i].tier === x.tier).length;
    const items = VIRAL.map((x, i) => { const v = a[i] || {}; const f = full(i); const ok = f && v.verdict === x.verdict && v.tier === x.tier;
      const row = (label, opts, field) => `<div class="chip-row"><span>${label}</span><div class="choices">${opts.map((o) => `<button class="chip ${f && o === x[field] ? 'is-key' : ''}" data-vr="${i}" data-f="${field}" data-v="${esc(o)}" aria-pressed="${v[field] === o}" ${f ? 'disabled' : ''}>${esc(o)}</button>`).join('')}</div></div>`;
      return `<article class="item ${f ? (ok ? 'correct' : 'wrong') : ''}">
        <div class="item-top"><span>Claim ${i + 1} of ${VIRAL.length}</span></div>
        <p class="quote">${esc(x.claim)}</p>
        ${row('Verdict', VIRAL_VERDICTS, 'verdict')}${row('Best source', TIERS, 'tier')}
        ${f ? `<div class="feedback ${ok ? 'ok' : 'no'}"><span class="verdict">${ok ? 'Correct' : 'Key: ' + esc(x.verdict) + ' · ' + esc(x.tier)}</span><span>${esc(x.why)}${x.url ? ' Source: ' + ext(x.url, x.src) + '.' : ''}</span></div>` : ''}
      </article>`; }).join('');
    const op = state.opin;
    const opRows = OPINION_PAIRS.map((p, i) => { const v = op[i];
      return `<div class="t-frag ${v ? (v === p.key ? 'correct' : 'wrong') : ''}"><p>${esc(p.x)}</p>
        <div class="seg" role="group" aria-label="Fact or opinion">${['Fact', 'Opinion'].map((o) => `<button data-op="${i}" data-v="${o}" aria-pressed="${v === o}" class="${v && o === p.key ? 'is-key' : ''}" ${v ? 'disabled' : ''}>${o}</button>`).join('')}</div></div>`; }).join('');
    return `<div class="wrap">${modHead('viral', 'Most political claims reach voters as forwarded posts, not debate transcripts. A post can mix verified facts, loose wording, and claims with no source at all, and the true parts make the false parts more believable. This module practices taking one apart.')}
      <section class="concept">
        <div class="prose">
          <h2 class="h-sec">Check every claim separately</h2>
          <p>A post is not true or false as a whole. Break it into individual claims, then check each one. A timeline that gets five dates right and one wrong is still wrong about that one, and the one may be the claim doing the persuading.</p>
          <p>Read laterally: leave the post and search for who else reports each claim. When reporting cites a record, go to the record if you can. A court docket, a voter file, or a property deed outranks any summary of it.</p>
          <p>When a claim has no source, the burden of proof stays with whoever made it. "I couldn't find it" is not proof it is false, but it is a reason not to repeat it.</p>
        </div>
        <aside><h3>Source ladder</h3><dl>${SOURCE_LADDER.map((s) => `<div><dt>${esc(s.t)}</dt><dd>${esc(s.d)}</dd></div>`).join('')}</dl></aside>
      </section>
      <section class="exercise">
        <div class="ex-head"><div><p class="eyebrow">Exercise</p><h2 class="h-sec">Take apart a forwarded timeline</h2></div>${scoreLine(right, answered, VIRAL.length)}</div>
        <p class="small muted" style="margin-bottom:var(--space-6)">These claims come from a real post that circulated about the Republican nominee after the debate. For each one, give a verdict and the best type of source available to check it.</p>
        <div class="items">${items}</div>
      </section>
      <section class="exercise">
        <div class="ex-head"><div><p class="eyebrow">Exercise</p><h2 class="h-sec">Separate facts from opinions before you post</h2></div></div>
        <div class="item t-card">${opRows}</div>
        <div class="note"><h3>Why this matters</h3><p class="small">You are entitled to your opinions, and your bias does not make your factual argument wrong; judging an argument by its source is the genetic fallacy from Module 03. But when opinions are mixed into factual claims, readers can dismiss the facts along with them. Put the checkable facts first, then label your conclusion as your own view.</p></div>
        <div class="actions"><button class="btn btn-ghost" data-reset="viral">Reset answers</button></div>
      </section>${modFoot('viral')}</div>`;
  }

  /* ---------- 05 RUBRIC ---------- */
  function gpaToLetter(g) { const t = [[3.85, 'A'], [3.5, 'A−'], [3.15, 'B+'], [2.85, 'B'], [2.5, 'B−'], [2.15, 'C+'], [1.85, 'C'], [1.5, 'C−'], [1.15, 'D+'], [0.85, 'D']]; for (const [v, l] of t) if (g >= v) return l; return 'F'; }
  function ptsToLetter(p) { const t = [[93, 'A'], [90, 'A−'], [87, 'B+'], [83, 'B'], [80, 'B−'], [77, 'C+'], [73, 'C'], [70, 'C−'], [67, 'D+'], [63, 'D'], [60, 'D−']]; for (const [v, l] of t) if (p >= v) return l; return 'F'; }
  function computeRubric(id, pick) {
    const R = RUBRICS[id];
    if (R.kind === 'letter') {
      let g = 0, ok = true;
      R.rows.forEach((r, i) => { const v = pick(r, i); if (!v) ok = false; else g += LETTER_GPA[v] * r.w / 100; });
      if (!ok) return null;
      return { display: gpaToLetter(g), detail: g.toFixed(2) + ' GPA', pass: g >= 1.5 };
    }
    let p = 0, ok = true;
    R.rows.forEach((r, i) => { const v = pick(r, i); if (v === '' || v == null) ok = false; else p += Number(v); });
    if (!ok) return null;
    return { display: String(p), detail: ptsToLetter(p) + ' · out of 100', pass: p >= 70 };
  }
  function rubric() {
    const id = state.rubricTab, R = RUBRICS[id], mine = state.rubric[id], rev = state.rubricRevealed[id];
    const cell = (r, i, cand) => {
      const k = i + cand; const v = mine[k] ?? '';
      const opts = R.kind === 'letter' ? LETTERS : Array.from({ length: r.max + 1 }, (_, n) => String(r.max - n));
      const key = r[cand];
      const diff = rev && v !== '' && String(v) !== String(key);
      return `<td><select data-rb="${k}" aria-label="${cand === 'sand' ? 'Sand' : 'Lahn'}: ${esc(r.c)}"><option value="">—</option>${opts.map((o) => `<option ${String(v) === o ? 'selected' : ''}>${o}</option>`).join('')}</select>${rev ? `<span class="keyval ${diff ? 'diff' : ''}">key ${esc(key)}</span>` : ''}</td>`;
    };
    const rows = R.rows.map((r, i) => `<tr><th scope="row">${esc(r.c)}</th><td class="w">${R.kind === 'letter' ? r.w + '%' : r.max + ' pts'}</td>${cell(r, i, 'sand')}${cell(r, i, 'lahn')}</tr>`).join('');
    const me = { sand: computeRubric(id, (r, i) => mine[i + 'sand']), lahn: computeRubric(id, (r, i) => mine[i + 'lahn']) };
    const key = { sand: computeRubric(id, (r) => r.sand), lahn: computeRubric(id, (r) => r.lahn) };
    const vcard = (cand, name) => { const m = me[cand], k = key[cand];
      return `<div class="vcard"><div class="item-top">${who(name)}<span>Your grade</span></div>
        <div class="grade" style="margin-top:var(--space-3)">${m ? esc(m.display) : '—'}</div>
        <p class="xs muted" style="margin-top:var(--space-1)">${m ? esc(m.detail) : 'Fill every row to compute'}</p>
        ${m ? `<p class="pf ${m.pass ? 'pass' : 'fail'}">${m.pass ? 'Passes' : 'Fails'}</p>` : ''}
        ${rev ? `<p class="small" style="margin-top:var(--space-4);padding-top:var(--space-3);border-top:1px solid var(--color-divider)">Professor's key: <b>${esc(k.display)}</b> <span class="muted">(${esc(k.detail)})</span> · <span class="${k.pass ? 'pass' : 'fail'}">${k.pass ? 'passes' : 'fails'}</span></p>` : ''}
      </div>`; };
    const filled = me.sand && me.lahn;
    return `<div class="wrap">${modHead('rubric', 'A grade is an argument. A rubric makes it explicit by naming what counts and how much. Changing the rubric can change who passes, which is why a professor always states the rubric before the verdict.')}
      <section class="concept">
        <div class="prose">
          <h2 class="h-sec">Same debate, different standards</h2>
          <p>Under a weighted letter rubric, accuracy is one category among five, so a candidate with weak evidence can still pass on argument construction. A strict academic rubric adds rules: dropped arguments count as conceded, fallacies carry deductions, and evidence errors also lower the refutation score when rebuttals rely on them.</p>
          <p>Grade both candidates yourself before revealing the key. Then look at where you disagree and write one sentence defending your call.</p>
        </div>
        <aside><h3>Passing lines used here</h3><dl>
          <div><dt>Letter rubric</dt><dd>C− (1.5 weighted GPA) or better.</dd></div>
          <div><dt>Points rubric</dt><dd>70 of 100 or better.</dd></div>
        </dl></aside>
      </section>
      <section class="exercise">
        <div class="ex-head"><div><p class="eyebrow">Exercise</p><h2 class="h-sec">Grade the round</h2></div>
          <div class="tabs" role="tablist">${Object.keys(RUBRICS).map((k) => `<button class="tab" role="tab" aria-selected="${k === id}" data-rtab="${k}">${esc(RUBRICS[k].name)}</button>`).join('')}</div></div>
        <p class="small muted">${esc(R.blurb)}</p>
        <div class="rtable-wrap"><table class="rtable">
          <thead><tr><th>Category</th><th>Weight</th><th>Sand</th><th>Lahn</th></tr></thead>
          <tbody>${rows}</tbody>
        </table></div>
        <div class="verdicts">${vcard('sand', 'Sand')}${vcard('lahn', 'Lahn')}</div>
        <div class="actions">
          <button class="btn btn-primary" data-rreveal ${filled ? '' : 'disabled'}>${rev ? 'Key revealed' : 'Reveal the professor\'s key'}</button>
          <button class="btn btn-ghost" data-rfill>Fill with the key</button>
          <button class="btn btn-ghost" data-reset="rubric">Clear</button>
          ${filled ? '' : '<span class="muted small">Grade every row for both candidates to unlock the key.</span>'}
        </div>
        ${rev ? `<div class="note"><h3>Professor's note</h3><p class="small">${id === 'professor' ? 'Lahn passes here with a C because his proposals (innovation zones, saturated buffers, antitrust funding) earn real credit for construction, even though his evidence grade is a D+.' : 'Lahn fails here at 48 because the strict rules compound: false claims cost evidence points, the rebuttals that relied on them cost refutation points, and his dropped arguments count as concessions. Sand passes at 73, held back by his own drops and off-topic Kansas attacks.'} The scores come from the KWQC segments only, and from one analyst's selection of claims.</p></div>` : ''}
      </section>${modFoot('rubric')}</div>`;
  }

  /* ---------- 06 LENSES ---------- */
  function lenses() {
    const chev = '<svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>';
    const list = LENSES.map((l, i) => `<details class="lens" ${state.lensOpen.has(i) ? 'open' : ''} data-lens="${i}">
      <summary><div><h3>${esc(l.name)}</h3><span class="by">${esc(l.who)}</span></div>${chev}</summary>
      <div class="lens-body">
        <p>${esc(l.idea)}</p>
        <p class="k"><b>Key move:</b> ${esc(l.key)}</p>
        <p class="prompt">${esc(l.prompt)}</p>
        <label class="sr-only" for="ln-${i}">Your analysis</label>
        <textarea id="ln-${i}" data-lnote="${i}" placeholder="Write your analysis before comparing…">${esc(state.lensNotes[i] || '')}</textarea>
        ${state.lensOpen.has('m' + i) ? `<div class="model"><b>One strong answer</b>${esc(l.model)}</div>` : `<div><button class="btn btn-ghost" data-lmodel="${i}">Compare with a model answer</button></div>`}
      </div></details>`).join('');
    const seen = LENSES.filter((l, i) => state.lensOpen.has('m' + i)).length;
    return `<div class="wrap">${modHead('lenses', 'At the doctoral level the question changes. Not "who won," but "what is this discourse doing, why does it work on some audiences, and what does it reveal?" Each lens below is a theory that produces a different answer.')}
      <section class="concept">
        <div class="prose">
          <h2 class="h-sec">Theory before verdict</h2>
          <p>A dissertation-level analysis starts from a theory, states a method, and makes an argument that adds to existing scholarship. The same exchange can be a fallacy under one lens and a successful identification strategy under another.</p>
          <p>Work through at least four lenses. Write your answer first; the model answer is one defensible reading, not the only one.</p>
        </div>
        <aside><h3>Fields that do this work</h3><dl>
          <div><dt>Communication Studies</dt><dd>Rhetorical criticism and argumentation.</dd></div>
          <div><dt>Political Science</dt><dd>Political communication and debate effects.</dd></div>
          <div><dt>Philosophy</dt><dd>Informal logic and argument evaluation.</dd></div>
        </dl></aside>
      </section>
      <section class="exercise">
        <div class="ex-head"><div><p class="eyebrow">Exercise</p><h2 class="h-sec">Nine lenses on one debate</h2></div><p class="score"><strong>${seen}</strong> of ${LENSES.length} compared · 4 to complete</p></div>
        <div class="lens-list">${list}</div>
      </section>${modFoot('lenses')}</div>`;
  }

  /* ---------- 07 BENOIT ---------- */
  function tallies(get) {
    const out = {};
    ['Sand', 'Lahn'].forEach((c) => {
      out[c] = { Acclaim: 0, Attack: 0, Defense: 0, Policy: 0, Character: 0, n: 0 };
      BENOIT.forEach((x, i) => { if (x.who !== c) return; const v = get(x, i); if (v.f) out[c][v.f]++; if (v.t) out[c][v.t]++; out[c].n++; });
    });
    return out;
  }
  function tallyCard(title, t) {
    const rows = (c) => ['Acclaim', 'Attack', 'Defense', 'Policy', 'Character'].map((k) => `<div class="bar-row"><span>${k}</span><div class="bar-track"><div class="bar-fill fill-${c}" style="width:${(t[c][k] / t[c].n) * 100}%"></div></div><span>${t[c][k]}</span></div>`).join('');
    return `<div class="tally-card"><p class="eyebrow">${esc(title)}</p>${['Sand', 'Lahn'].map((c) => `<div style="margin-top:var(--space-5)">${who(c)}<div class="bars">${rows(c)}</div></div>`).join('')}</div>`;
  }
  function benoit() {
    const a = state.benoit, ck = state.benoitChecked;
    const coded = BENOIT.filter((x, i) => a[i] && a[i].f && a[i].t).length;
    let agreeF = 0, agreeT = 0;
    BENOIT.forEach((x, i) => { if (a[i]) { if (a[i].f === x.f) agreeF++; if (a[i].t === x.t) agreeT++; } });
    const items = BENOIT.map((x, i) => { const v = a[i] || {}; const ok = ck && v.f === x.f && v.t === x.t;
      const seg = (opts, field) => `<div class="seg" role="group" aria-label="${field === 'f' ? 'Function' : 'Topic'}">${opts.map((o) => `<button data-bn="${i}" data-f="${field}" data-v="${o}" aria-pressed="${v[field] === o}" class="${ck && x[field] === o ? 'is-key' : ''}" ${ck ? 'disabled' : ''}>${o}</button>`).join('')}</div>`;
      return `<article class="item ${ck ? (ok ? 'correct' : 'wrong') : ''}">
        <div class="b-item"><div><div class="item-top">${who(x.who)}</div><p class="quote" style="margin-top:var(--space-2)">${esc(x.q)}</p></div>
        <div class="b-controls">${seg(FUNCTIONS, 'f')}${seg(TOPICS, 't')}</div></div>
        ${ck ? `<div class="feedback ${ok ? 'ok' : 'no'}"><span class="verdict">${ok ? 'Agrees with key' : 'Key: ' + x.f + ' · ' + x.t}</span><span>${esc(x.note)}</span></div>` : ''}
      </article>`; }).join('');
    const mine = tallies((x, i) => a[i] || {});
    const keyT = tallies((x) => ({ f: x.f, t: x.t }));
    return `<div class="wrap">${modHead('benoit', 'William Benoit\'s functional theory turns impressions into data. Every utterance acclaims, attacks, or defends, and each is about policy or character. Code the sample, then compare your coding to a second coder: that comparison is how researchers test reliability.')}
      <section class="concept">
        <div class="prose">
          <h2 class="h-sec">Coding rules</h2>
          <p><b>Acclaim:</b> praises the speaker or their plans. <b>Attack:</b> criticizes the opponent. <b>Defense:</b> responds to an attack.</p>
          <p><b>Policy</b> covers past deeds in office, future plans, and general goals. <b>Character</b> covers personal qualities, leadership ability, and ideals. A record as auditor is policy; a voting address is character.</p>
          <p>Researchers report agreement between coders. Simple percent agreement is the starting point; published studies use stricter statistics such as Cohen's kappa, which corrects for chance agreement.</p>
        </div>
        <aside><h3>What the literature predicts</h3><dl>
          <div><dt>Acclaims outnumber attacks</dt><dd>Across decades of debates, candidates praise themselves more than they criticize.</dd></div>
          <div><dt>Policy beats character</dt><dd>Winners tend to discuss policy more than character.</dd></div>
          <div><dt>Defenses are rare</dt><dd>Defending repeats the attack, so candidates use it sparingly.</dd></div>
        </dl></aside>
      </section>
      <section class="exercise">
        <div class="ex-head"><div><p class="eyebrow">Exercise</p><h2 class="h-sec">Code fourteen utterances</h2></div><p class="score"><strong>${coded}</strong> of ${BENOIT.length} coded${ck ? ` · agreement: function ${Math.round((agreeF / BENOIT.length) * 100)}%, topic ${Math.round((agreeT / BENOIT.length) * 100)}%` : ''}</p></div>
        <div class="items">${items}</div>
        <div class="actions">
          <button class="btn btn-primary" data-bcheck ${coded === BENOIT.length && !ck ? '' : 'disabled'}>${ck ? 'Compared' : 'Compare with second coder'}</button>
          <button class="btn btn-ghost" data-reset="benoit">Reset coding</button>
        </div>
        <div class="tally">${tallyCard('Your coding', mine)}${ck ? tallyCard('Second coder (key)', keyT) : '<div class="tally-card"><p class="eyebrow">Second coder (key)</p><p class="empty" style="margin-top:var(--space-4)">Code every utterance, then compare to see the key\'s tally.</p></div>'}</div>
        ${ck ? `<div class="note"><h3>Professor's note</h3><p class="small">In this sample, Lahn's attacks cluster on character; Sand's attacks also lean character but his acclaims are mostly policy. Fourteen hand-picked utterances cannot support a finding. A publishable study codes every utterance in the full debate with two trained coders and reports kappa.</p></div>` : ''}
      </section>${modFoot('benoit')}</div>`;
  }

  /* ---------- 08 RESEARCH ---------- */
  function research() {
    const q = state.rq;
    const th = RQ.theories.find((x) => x.id === q.theory), ph = RQ.phenomena.find((x) => x.id === q.phen), me = RQ.methods.find((x) => x.id === q.method);
    const sel = (key, list, label) => `<div><label class="lab" for="rq-${key}">${label}</label><select id="rq-${key}" data-rq="${key}">${list.map((x) => `<option value="${x.id}" ${q[key] === x.id ? 'selected' : ''}>${esc(x.label)}</option>`).join('')}</select></div>`;
    return `<div class="wrap">${modHead('research', 'A PhD-level paper does not grade a debate. It asks a question the field cannot yet answer, names the theory it will use, and defends a method. Build a study design from the pieces below.')}
      <section class="concept">
        <div class="prose">
          <h2 class="h-sec">What makes a research question</h2>
          <p>It names a phenomenon ("how candidates use residency"), a theory that frames it, and a reason the answer matters beyond this one debate. "Who won?" is not a research question. "What does this debate reveal about how place-based belonging substitutes for character evaluation?" is.</p>
          <p>Every paper also states its limits. Here: one debate, auto-generated captions, and a missing agriculture segment.</p>
        </div>
        <aside><h3>Standard paper structure</h3><dl>
          <div><dt>Introduction</dt><dd>The question and why it matters.</dd></div>
          <div><dt>Literature review</dt><dd>What scholars already know.</dd></div>
          <div><dt>Method</dt><dd>Your artifact and how you analyze it.</dd></div>
          <div><dt>Analysis</dt><dd>The evidence and your reading of it.</dd></div>
          <div><dt>Contribution</dt><dd>What the field learns.</dd></div>
        </dl></aside>
      </section>
      <section class="exercise">
        <div class="ex-head"><div><p class="eyebrow">Exercise</p><h2 class="h-sec">Design a study</h2></div></div>
        <div class="rq-form">${sel('theory', RQ.theories, 'Theory')}${sel('phen', RQ.phenomena, 'Phenomenon')}${sel('method', RQ.methods, 'Method')}</div>
        <div class="rq-out" aria-live="polite">
          <p class="eyebrow">Your research question</p>
          <p class="rq">Through the lens of ${esc(th.label.toLowerCase().replace("walton's", "Walton's").replace("benoit's", "Benoit's").replace("fisher's", "Fisher's").replace('burkean', 'Burkean'))}, how do ${esc(ph.text)}, and what does the first 2026 Iowa gubernatorial debate reveal about the limits of that strategy?</p>
          <ol>
            <li><b>Introduction.</b> Open with the exchange that best shows ${esc(ph.label)}; state why open-seat state races are understudied compared with presidential debates.</li>
            <li><b>Literature review.</b> Ground the study in ${esc(th.lit)}, then identify what that work does not yet explain about state-level debate.</li>
            <li><b>Method.</b> Use ${esc(me.text)}. Name your artifact precisely: the KWQC caption transcript and six segment videos.</li>
            <li><b>Analysis.</b> Present three to five exchanges as evidence. For each, show what the theory predicts and where the debate confirms or complicates it.</li>
            <li><b>Contribution and limits.</b> State what the field learns, then the limits: one debate, auto-generated captions, a missing agriculture segment.</li>
          </ol>
          <div><button class="btn btn-primary" data-rqdone>${state.done.has('research') ? 'Design saved' : 'Mark this design complete'}</button></div>
        </div>
      </section>${modFoot('research')}</div>`;
  }


  /* ---------- 09 LOGIC ---------- */
  function logic() {
    const a = state.logic;
    const full = (i) => a[i] && a[i].form && a[i].valid;
    const answered = LOGIC.filter((x, i) => full(i)).length;
    const right = LOGIC.filter((x, i) => full(i) && a[i].form === x.form && a[i].valid === x.valid).length;
    const items = LOGIC.map((x, i) => { const v = a[i] || {}; const f = full(i); const ok = f && v.form === x.form && v.valid === x.valid;
      const row = (label, opts, field) => `<div class="chip-row"><span>${label}</span><div class="choices">${opts.map((o) => `<button class="chip ${f && o === x[field] ? 'is-key' : ''}" data-lg="${i}" data-f="${field}" data-v="${esc(o)}" aria-pressed="${v[field] === o}" ${f ? 'disabled' : ''}>${esc(o)}</button>`).join('')}</div></div>`;
      return `<article class="item ${f ? (ok ? 'correct' : 'wrong') : ''}">
        <div class="item-top">${who(x.who)}${x.src ? segLink(x.src, x.time) : '<span>Reconstructed from a social media endorsement</span>'}<span>Reconstructed, not verbatim</span></div>
        <p class="quote">${esc(x.arg)}</p>
        ${row('Form', FORMS, 'form')}${row('Validity', ['Valid', 'Invalid'], 'valid')}
        ${f ? `<div class="feedback ${ok ? 'ok' : 'no'}"><span class="verdict">${ok ? 'Correct' : 'Key: ' + esc(x.form) + ' · ' + esc(x.valid)}</span><span><code class="sym">${esc(x.sym)}</code> ${esc(x.why)}</span></div>` : ''}
      </article>`; }).join('');
    return `<div class="wrap">${modHead('logic', 'Philosophy PhD programs expect formal logic. Informal analysis asks whether an argument is persuasive or relevant; formal analysis asks whether its conclusion follows from its premises by structure alone. The debate is full of both.')}
      <section class="concept">
        <div class="prose">
          <h2 class="h-sec">Validity is not truth</h2>
          <p>An argument is <b>valid</b> when the premises, if true, guarantee the conclusion. It is <b>sound</b> when it is valid and its premises are actually true. A valid argument can have a false conclusion if a premise is false; an invalid argument can have a true conclusion by luck.</p>
          <p>Most debate arguments are reconstructed rather than stated. Your first job is to supply the premises the speaker relied on, charitably, then test the form. The six arguments below are reconstructions of moves from the debate.</p>
          <p>Next step after this module: natural deduction proofs in predicate logic, the level most PhD programs assume.</p>
        </div>
        <aside><h3>Forms</h3><dl>${FORMS.map((f) => `<div><dt>${esc(f)} <span class="${FORM_DEFS[f][1] === 'Valid' ? 'pass' : 'fail'} xs">${FORM_DEFS[f][1]}</span></dt><dd><code class="sym">${esc(FORM_DEFS[f][0])}</code></dd></div>`).join('')}</dl></aside>
      </section>
      <section class="exercise">
        <div class="ex-head"><div><p class="eyebrow">Exercise</p><h2 class="h-sec">Name the form, test the validity</h2></div>${scoreLine(right, answered, LOGIC.length)}</div>
        <div class="items">${items}</div>
        <div class="actions"><button class="btn btn-ghost" data-reset="logic">Reset answers</button></div>
        ${answered === LOGIC.length ? `<div class="note"><h3>Professor's note</h3><p class="small">Notice that the strongest arguments on both sides are valid in form and fail, if they fail, at a premise. That is where philosophical criticism lives: not in naming a fallacy, but in showing which premise is false or unsupported, and why.</p></div>` : ''}
      </section>${modFoot('logic')}</div>`;
  }

  /* ---------- 10 GAPS ---------- */
  const RATINGS = ['Not yet', 'Some', 'Solid'];
  function gaps() {
    const rated = UIOWA.areas.filter((x) => state.gapRate[x.id]).length;
    const order = [...UIOWA.areas].filter((x) => state.gapRate[x.id]).sort((p, q) => RATINGS.indexOf(state.gapRate[p.id]) - RATINGS.indexOf(state.gapRate[q.id]));
    const areas = UIOWA.areas.map((x) => { const v = state.gapRate[x.id];
      return `<article class="item">
        <div class="b-item"><div><h3 class="h-sec">${esc(x.name)}</h3><p class="small muted" style="margin-top:var(--space-1)">${esc(x.what)}</p></div>
        <div class="seg" role="group" aria-label="Rate your background in ${esc(x.name)}">${RATINGS.map((r) => `<button data-gap="${x.id}" data-v="${r}" aria-pressed="${v === r}">${r}</button>`).join('')}</div></div>
        <div class="flow-pair">
          <div class="flow-cell"><span class="lab">Start with</span>${esc(x.start)}</div>
          <div class="flow-cell"><span class="lab">Bridge from this debate</span>${esc(x.link)}</div>
        </div></article>`; }).join('');
    const pri = order.length ? `<ol class="pri">${order.map((x) => `<li><b>${esc(x.name)}</b> <span class="muted small">· ${esc(state.gapRate[x.id])}</span></li>`).join('')}</ol>` : '<p class="empty">Rate each area to build your study order. The weakest areas rise to the top.</p>';
    const mats = UIOWA.materials.map((m, i) => `<label class="check"><input type="checkbox" data-mat="${i}" ${state.gapMat.has(i) ? 'checked' : ''} /> <span>${esc(m)}</span></label>`).join('');
    return `<div class="wrap">${modHead('gaps', 'Applicants from outside a philosophy major are judged mainly on a writing sample and letters that show they can do philosophy. This map lines up the University of Iowa\'s required areas with your current background so you can see what to study first.')}
      <section class="concept">
        <div class="prose">
          <h2 class="h-sec">What the University of Iowa asks for</h2>
          <p>The PhD requires coursework in metaphysics and epistemology, history of philosophy, logic and philosophy of science, ethics, and value theory, with no foreign language requirement (${ext('https://philosophy.uiowa.edu/graduate/phd-philosophy', 'UI Philosophy')}). Applications are due February 1, GRE scores are not required, and there is no terminal MA except the combined MA/JD; students can earn an MA on the way to the PhD (${ext('https://grad.admissions.uiowa.edu/academics/philosophy-ma-or-phd', 'UI Graduate Admissions')}).</p>
          <p>The two hardest gaps for a non-major are usually the same: a polished writing sample of roughly 15 to 25 pages on a philosophical problem, and letters from philosophy faculty who have seen your work. Both take at least a semester or two of philosophy courses to build.</p>
          <p>A common bridge is a funded terminal MA at another school, which some departments recommend for applicants without a philosophy background (${ext('https://fundedphilma.weebly.com/', 'list of funded MA programs')}).</p>
        </div>
        <aside><h3>Application materials</h3><div class="checks">${mats}</div><p class="xs muted" style="margin-top:var(--space-3)">${state.gapMat.size} of ${UIOWA.materials.length} ready</p></aside>
      </section>
      <section class="exercise">
        <div class="ex-head"><div><p class="eyebrow">Self-assessment</p><h2 class="h-sec">Rate the five required areas</h2></div><p class="score"><strong>${rated}</strong> of ${UIOWA.areas.length} rated</p></div>
        <div class="items">${areas}</div>
        <div class="note"><h3>Your study order</h3>${pri}
          <p class="small" style="margin-top:var(--space-3)">Turn one exercise from this course into a writing-sample seed: the Kansas exchange analysis in the model paper sits in argumentation theory, which overlaps with logic and epistemology. Ask a philosophy professor whether it fits their department's expectations before you build on it.</p></div>
      </section>${modFoot('gaps')}</div>`;
  }

  /* ---------- MODEL PAPER ---------- */
  function paper() {
    return `<div class="wrap">
      <header class="mod-head"><p class="eyebrow">Model paper · Doctoral seminar</p>
        <h1 class="h-page">Residency as Character Evidence: A Waltonian Analysis of the Kansas Exchange</h1>
        <p class="lede">A worked example of PhD-level analysis. Read it alongside the ${ext(SEG.edu, 'education segment')} and notice the moves: a thesis that takes a side, a stated framework, reconstruction before evaluation, and explicit limits.</p></header>
      <article class="paper">${PAPER_HTML}</article>
    </div>`;
  }

  /* ---------- TRANSCRIPT ---------- */
  const TAGS = ['Claim', 'Evidence', 'Warrant', 'Attack', 'Defense', 'Dropped', 'Fallacy', 'Identification'];
  function highlight(text, q) {
    const safe = esc(text);
    if (!q) return safe;
    const re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/&/g, '&amp;') + ')', 'gi');
    return safe.replace(re, '<mark>$1</mark>');
  }
  function paraHTML(si, pi, p, q) {
    const seg = TRANSCRIPT[si];
    const mine = state.notes.filter((n) => n.si === si && n.pi === pi);
    return `<div class="para" id="p-${si}-${pi}">
      <a class="ts" href="${seg.url}&t=${tsToSec(p.t)}s" target="_blank" rel="noopener noreferrer" aria-label="Watch ${esc(seg.title)} at ${p.t}">${p.t}</a>
      <div><p>${highlight(p.x, q)}</p>
        <div class="para-tools">${mine.map((n) => `<span class="tag">${esc(n.tag)}</span>${n.note ? `<span class="tag-note">${esc(n.note)}</span>` : ''}`).join('')}
          <button class="tag-btn" data-annot="${si}-${pi}">+ Annotate</button></div>
        <div data-pop="${si}-${pi}"></div>
      </div></div>`;
  }
  function transcript() {
    const q = state.trQuery.trim();
    let body = '';
    if (q.length >= 2) {
      let count = 0;
      TRANSCRIPT.forEach((s, si) => {
        const hits = s.paras.map((p, pi) => ({ p, pi })).filter(({ p }) => p.x.toLowerCase().includes(q.toLowerCase()));
        if (!hits.length) return; count += hits.length;
        body += `<h3 class="eyebrow" style="margin:var(--space-6) 0 var(--space-2)">${esc(s.title)}</h3>` + hits.map(({ p, pi }) => paraHTML(si, pi, p, q)).join('');
      });
      body = `<p class="small muted">${count} passage${count === 1 ? '' : 's'} match "${esc(q)}"</p>` + (body || '');
    } else {
      const s = TRANSCRIPT[state.trSeg];
      body = `<p class="small muted">${esc(s.title)} · ${esc(s.length)} · ${ext(s.url, 'Watch on YouTube')}</p>` + s.paras.map((p, pi) => paraHTML(state.trSeg, pi, p, '')).join('');
    }
    const notes = state.notes.length ? `<ul>${state.notes.map((n) => `<li><a href="#transcript" data-jump="${n.si}-${n.pi}"><span><span class="tag">${esc(n.tag)}</span> <span class="xs muted">${esc(TRANSCRIPT[n.si].title)} ${esc(TRANSCRIPT[n.si].paras[n.pi].t)}</span></span>${n.note ? `<span class="xs muted">${esc(n.note)}</span>` : ''}</a></li>`).join('')}</ul>` : '<p class="empty">Annotate passages as claims, evidence, attacks or fallacies. Your tags collect here for this session.</p>';
    return `<div class="wrap" style="max-width:1180px">
      <header class="mod-head"><p class="eyebrow">Primary source</p><h1 class="h-page">Transcript reader</h1>
        <p class="lede">The full KWQC caption transcript in six segments. Timestamps open the video at that moment. Captions do not identify speakers; follow the moderators' handoffs.</p></header>
      <div class="tr-bar">
        <div class="tr-tabs tabs" role="tablist">${TRANSCRIPT.map((s, i) => `<button class="tab" role="tab" aria-selected="${!q && i === state.trSeg}" data-trseg="${i}">${esc(s.title.replace('The State of the ', '').replace('The Health of Iowans', 'Health').replace(' Statements', 's').replace('The State ', ''))}</button>`).join('')}</div>
        <div><label class="lab" for="tr-q">Search all segments</label><input type="search" id="tr-q" placeholder="Try Kansas, radon, vouchers" value="${esc(state.trQuery)}" /></div>
      </div>
      <div class="tr-layout"><div class="tr-paras">${body}</div>
        <aside class="annot" aria-label="Your annotations"><h3>Your annotations · ${state.notes.length}</h3>${notes}</aside></div>
    </div>`;
  }

  /* ---------- READINGS ---------- */
  function readings() {
    return `<div class="wrap">
      <header class="mod-head"><p class="eyebrow">Bibliography</p><h1 class="h-page">Reading list</h1>
        <p class="lede">Ordered from first reading to doctoral seminar. Roman numerals match the course levels.</p></header>
      <div class="readings">${READINGS.map((r) => `<div class="reading"><span class="lvl">${r.lvl}</span><div><p class="t"><i>${esc(r.t)}</i></p><p class="a">${esc(r.a)} · ${esc(r.why)}</p></div></div>`).join('')}</div>
      <div class="note"><h3>Next step</h3><p class="small">A University of Iowa Communication Studies faculty member can point you to graduate seminars in rhetoric and argumentation, and to current journals such as <i>Argumentation</i>, <i>Rhetoric &amp; Public Affairs</i>, and the <i>Quarterly Journal of Speech</i>.</p></div>
    </div>`;
  }

  /* ---------- Router ---------- */
  const VIEWS = { home, transcript, readings, 'm-flow': flow, 'm-toulmin': toulmin, 'm-fallacy': fallacy, 'm-evidence': evidence, 'm-viral': viral, 'm-rubric': rubric, 'm-lenses': lenses, 'm-benoit': benoit, 'm-research': research, 'm-logic': logic, 'm-gaps': gaps, paper };
  const LABELS = { home: 'Syllabus', transcript: 'Transcript reader', readings: 'Reading list', paper: 'Model paper' };
  function render(keepScroll) {
    const r = location.hash.replace('#', '') || 'home';
    const view = VIEWS[r] || home;
    const y = window.scrollY;
    $('#main').innerHTML = view();
    const id = r.startsWith('m-') ? r.slice(2) : null;
    $('#crumb').textContent = id ? 'Module ' + MODULES[id].n + ' · ' + MODULES[id].title : LABELS[r] || 'Syllabus';
    document.title = (id ? MODULES[id].title : LABELS[r] || 'Syllabus') + ' — Warrant';
    renderNav();
    if (keepScroll) window.scrollTo(0, y);
  }
  window.addEventListener('hashchange', () => { closeMenu(); render(); window.scrollTo(0, 0); $('#main').focus({ preventScroll: true }); });

  /* ---------- Events ---------- */
  const main = $('#main');
  main.addEventListener('click', (e) => {
    const b = e.target.closest('button, a[data-jump]');
    if (!b) return;
    const d = b.dataset;
    if (d.flow !== undefined) { state.flow[d.flow] = d.v; if (Object.keys(state.flow).length === FLOW.length) markDone('flow'); render(true); }
    else if (d.fal !== undefined) { state.fallacy[d.fal] = d.v; if (Object.keys(state.fallacy).length === FALLACY.length) markDone('fallacy'); render(true); }
    else if (d.ev !== undefined) {
      const o = state.evidence[d.ev] || (state.evidence[d.ev] = {}); o[d.f] = d.v;
      if (EVIDENCE.every((x, i) => state.evidence[i] && state.evidence[i].type && state.evidence[i].verdict)) markDone('evidence');
      render(true);
    }
    else if (d.tcheck !== undefined) {
      const sel = state.toulmin[d.tcheck] || {};
      if (Object.keys(sel).filter((k) => sel[k]).length < TOULMIN[d.tcheck].frags.length) { b.textContent = 'Label every fragment first'; return; }
      state.toulminChecked[d.tcheck] = true;
      if (Object.keys(state.toulminChecked).length === TOULMIN.length) markDone('toulmin');
      render(true);
    }
    else if (d.rtab) { state.rubricTab = d.rtab; render(true); }
    else if (d.rreveal !== undefined) { state.rubricRevealed[state.rubricTab] = true; markDone('rubric'); render(true); }
    else if (d.rfill !== undefined) { const R = RUBRICS[state.rubricTab]; R.rows.forEach((r, i) => { state.rubric[state.rubricTab][i + 'sand'] = String(r.sand); state.rubric[state.rubricTab][i + 'lahn'] = String(r.lahn); }); render(true); }
    else if (d.lmodel !== undefined) { state.lensOpen.add('m' + d.lmodel); if (LENSES.filter((l, i) => state.lensOpen.has('m' + i)).length >= 4) markDone('lenses'); render(true); }
    else if (d.vr !== undefined) {
      const o = state.viral[d.vr] || (state.viral[d.vr] = {}); o[d.f] = d.v;
      if (VIRAL.every((x, i) => state.viral[i] && state.viral[i].verdict && state.viral[i].tier) && Object.keys(state.opin).length === OPINION_PAIRS.length) markDone('viral');
      render(true);
    }
    else if (d.op !== undefined) {
      state.opin[d.op] = d.v;
      if (VIRAL.every((x, i) => state.viral[i] && state.viral[i].verdict && state.viral[i].tier) && Object.keys(state.opin).length === OPINION_PAIRS.length) markDone('viral');
      render(true);
    }
    else if (d.lg !== undefined) {
      const o = state.logic[d.lg] || (state.logic[d.lg] = {}); o[d.f] = d.v;
      if (LOGIC.every((x, i) => state.logic[i] && state.logic[i].form && state.logic[i].valid)) markDone('logic');
      render(true);
    }
    else if (d.gap) { state.gapRate[d.gap] = d.v; if (UIOWA.areas.every((x) => state.gapRate[x.id])) markDone('gaps'); render(true); }
    else if (d.bn !== undefined) { const o = state.benoit[d.bn] || (state.benoit[d.bn] = {}); o[d.f] = d.v; render(true); }
    else if (d.bcheck !== undefined) { state.benoitChecked = true; markDone('benoit'); render(true); }
    else if (d.rqdone !== undefined) { markDone('research'); render(true); }
    else if (d.trseg !== undefined) { state.trSeg = Number(d.trseg); state.trQuery = ''; render(true); }
    else if (d.annot) {
      const pop = main.querySelector(`[data-pop="${d.annot}"]`);
      if (pop.innerHTML) { pop.innerHTML = ''; return; }
      pop.innerHTML = `<div class="tag-pop"><label class="lab" for="tg-${d.annot}">Tag</label><select id="tg-${d.annot}">${TAGS.map((t) => `<option>${t}</option>`).join('')}</select>
        <label class="lab" for="tn-${d.annot}">Note (optional)</label><input type="text" id="tn-${d.annot}" placeholder="Why you tagged it" />
        <div class="actions" style="margin-top:var(--space-2)"><button class="btn btn-primary" data-savenote="${d.annot}">Save tag</button></div></div>`;
      $('#tg-' + d.annot).focus();
    }
    else if (d.savenote) {
      const [si, pi] = d.savenote.split('-').map(Number);
      state.notes.push({ si, pi, tag: $('#tg-' + d.savenote).value, note: $('#tn-' + d.savenote).value.trim() });
      render(true);
    }
    else if (d.jump) {
      e.preventDefault();
      const [si, pi] = d.jump.split('-').map(Number);
      state.trSeg = si; state.trQuery = ''; render(true);
      const el = document.getElementById(`p-${si}-${pi}`);
      if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.style.borderColor = 'var(--color-primary)'; setTimeout(() => (el.style.borderColor = ''), 1600); }
    }
    else if (d.reset) {
      const k = d.reset;
      if (k === 'flow') state.flow = {}; if (k === 'fallacy') state.fallacy = {}; if (k === 'evidence') state.evidence = {};
      if (k === 'toulmin') { state.toulmin = {}; state.toulminChecked = {}; }
      if (k === 'rubric') { state.rubric[state.rubricTab] = {}; state.rubricRevealed[state.rubricTab] = false; }
      if (k === 'benoit') { state.benoit = {}; state.benoitChecked = false; }
      if (k === 'logic') state.logic = {};
      if (k === 'viral') { state.viral = {}; state.opin = {}; }
      state.done.delete(k); render(true);
    }
  });
  main.addEventListener('change', (e) => {
    const t = e.target, d = t.dataset;
    if (d.tc !== undefined) { (state.toulmin[d.tc] || (state.toulmin[d.tc] = {}))[d.tf] = t.value; }
    else if (d.rb !== undefined) { state.rubric[state.rubricTab][d.rb] = t.value; render(true); }
    else if (d.rq) { state.rq[d.rq] = t.value; render(true); }
    else if (d.mat !== undefined) { const i = Number(d.mat); if (t.checked) state.gapMat.add(i); else state.gapMat.delete(i); render(true); }
  });
  main.addEventListener('input', (e) => {
    const t = e.target;
    if (t.dataset.lnote !== undefined) state.lensNotes[t.dataset.lnote] = t.value;
    if (t.id === 'tr-q') {
      state.trQuery = t.value; const pos = t.selectionStart;
      clearTimeout(window.__trT); window.__trT = setTimeout(() => { render(true); const n = $('#tr-q'); if (n) { n.focus(); n.setSelectionRange(pos, pos); } }, 180);
    }
  });
  main.addEventListener('toggle', (e) => {
    const t = e.target; if (!t.matches || !t.matches('details[data-lens]')) return;
    const i = Number(t.dataset.lens); if (t.open) state.lensOpen.add(i); else state.lensOpen.delete(i);
  }, true);

  render();
})();
