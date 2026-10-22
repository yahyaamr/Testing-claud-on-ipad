import { site, topics, issues as rawIssues } from './data.js';

/* ==========================================================================
   Icons — single-weight line set, SF Symbols in spirit
   ========================================================================== */

const ICONS = {
  today: '<rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><path d="M7.5 9h9M7.5 12.5h9M7.5 16h5"/>',
  explore: '<circle cx="12" cy="12" r="8.5"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
  saved: '<path d="M7 4.5h10a1 1 0 0 1 1 1v14l-6-4-6 4v-14a1 1 0 0 1 1-1z"/>',
  'saved-fill': '<path fill="currentColor" d="M7 4.5h10a1 1 0 0 1 1 1v14l-6-4-6 4v-14a1 1 0 0 1 1-1z"/>',
  settings: '<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/>',
  share: '<path d="M12 3.5v11M8 7l4-3.5L16 7"/><path d="M8.5 10.5H7a1.5 1.5 0 0 0-1.5 1.5v6.5A1.5 1.5 0 0 0 7 20h10a1.5 1.5 0 0 0 1.5-1.5V12a1.5 1.5 0 0 0-1.5-1.5h-1.5"/>',
  'plus-square': '<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M12 8.5v7M8.5 12h7"/>',
  'chevron-left': '<path d="m14.5 5.5-6.5 6.5 6.5 6.5"/>',
  'chevron-right': '<path d="m9.5 6 6 6-6 6"/>',
  'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"/>',
  moon: '<path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10z"/>',
  bell: '<path d="M6 16.5V11a6 6 0 1 1 12 0v5.5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
  mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="2.5"/><path d="m4.5 7 7.5 6 7.5-6"/>',
  text: '<path d="M4 18 8.5 6h1L14 18M5.5 14h6.5"/><path d="m15 18 2.75-7h.5L21 18M15.8 16h4.4"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.8v.2"/>',
  refresh: '<path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3M19.5 4.5v4h-4"/>',
  bolt: '<path d="M13 3.5 5.5 13.5H12l-1 7 7.5-10H12z"/>',
  sparkles: '<path d="M12 3.5 13.6 9a2 2 0 0 0 1.4 1.4l5.5 1.6-5.5 1.6a2 2 0 0 0-1.4 1.4L12 20.5l-1.6-5.5A2 2 0 0 0 9 13.6L3.5 12 9 10.4A2 2 0 0 0 10.4 9z"/>',
  server: '<rect x="4" y="4.5" width="16" height="6" rx="2"/><rect x="4" y="13.5" width="16" height="6" rx="2"/><path d="M7.5 7.5h.01M7.5 16.5h.01"/>',
  terminal: '<rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><path d="m7.5 9.5 3 2.5-3 2.5M12.5 15h4"/>',
  flask: '<path d="M9.5 3.5h5M10 3.5v5.2L5.2 17.3a2.2 2.2 0 0 0 1.9 3.2h9.8a2.2 2.2 0 0 0 1.9-3.2L14 8.7V3.5"/><path d="M7.5 14h9"/>',
  chip: '<rect x="6.5" y="6.5" width="11" height="11" rx="2"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/><path d="M9.5 3.5v3M14.5 3.5v3M9.5 17.5v3M14.5 17.5v3M3.5 9.5h3M3.5 14.5h3M17.5 9.5h3M17.5 14.5h3"/>',
  scale: '<path d="M12 4v16M8 20h8M5 7.5h14"/><path d="M5 7.5 2.5 13a2.5 2.5 0 0 0 5 0zM19 7.5 16.5 13a2.5 2.5 0 0 0 5 0z"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  offline: '<path d="M4 15.5a4 4 0 0 1 3-6.4 5.5 5.5 0 0 1 10.5 1.4A3.5 3.5 0 0 1 17 18H7.5"/><path d="m9.5 15 2 2 3.5-3.5"/>',
};

const svg = (name) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
const icon = (name, cls = '') => `<span class="i ${cls}">${svg(name)}</span>`;

/* ==========================================================================
   Utilities & state
   ========================================================================== */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ESC[c]);
const pad = (n) => String(n).padStart(3, '0');
const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;
const toDate = (iso) => new Date(iso + 'T12:00:00');
const fmtDate = (iso, opts = { month: 'short', day: 'numeric', year: 'numeric' }) =>
  toDate(iso).toLocaleDateString('en-US', opts);

const store = {
  get(key, fallback) {
    try {
      const v = localStorage.getItem('kernel:' + key);
      return v == null ? fallback : JSON.parse(v);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem('kernel:' + key, JSON.stringify(value));
    } catch {}
  },
};

const topicById = Object.fromEntries(topics.map((t) => [t.id, t]));
const issues = rawIssues
  .map((it) => {
    const words = it.body.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length;
    return { ...it, readTime: Math.max(1, Math.round(words / 230)), topicName: topicById[it.topic]?.name ?? '' };
  })
  .sort((a, b) => b.number - a.number);
const issueBySlug = Object.fromEntries(issues.map((it) => [it.slug, it]));
const countByTopic = issues.reduce((acc, it) => ((acc[it.topic] = (acc[it.topic] || 0) + 1), acc), {});

const state = {
  saved: new Set(store.get('saved', [])),
  theme: store.get('theme', 'system'),
  textSize: store.get('textSize', 'm'),
  email: store.get('email', null),
  installDismissed: store.get('installDismissed', false),
};

const html = document.documentElement;
const isStandalone = html.classList.contains('standalone');
const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const isIPad = /iPad/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
let deferredInstall = null;

const canOfferInstall = () => !isStandalone && (isIOS || !!deferredInstall);

const TABS = [
  { id: 'today', label: 'Today', href: '#/', icon: 'today' },
  { id: 'explore', label: 'Explore', href: '#/explore', icon: 'explore' },
  { id: 'saved', label: 'Saved', href: '#/saved', icon: 'saved' },
  { id: 'settings', label: 'Settings', href: '#/settings', icon: 'settings' },
];
const tabById = Object.fromEntries(TABS.map((t) => [t.id, t]));

/* ==========================================================================
   Shared fragments
   ========================================================================== */

function issueRow(it) {
  const haystack = `${it.title} ${it.dek} ${it.topicName} ${pad(it.number)}`.toLowerCase();
  return `
    <a class="issue-row" href="#/issue/${it.slug}" data-search="${esc(haystack)}">
      <span class="num">${pad(it.number)}</span>
      <div>
        <h3>${esc(it.title)}</h3>
        <p>${esc(it.dek)}</p>
        <div class="meta">
          <span>${esc(it.topicName)}</span><span>·</span><span>${fmtDate(it.date)}</span><span>·</span><span>${it.readTime} min</span>
          ${state.saved.has(it.slug) ? '<span class="saved-dot">● Saved</span>' : ''}
        </div>
      </div>
      ${icon('chevron-right', 'chev')}
    </a>`;
}

const issueList = (list) => `<div class="issue-list">${list.map(issueRow).join('')}</div>`;

function subscribeCard({ compact = false } = {}) {
  if (state.email) {
    if (compact) return '';
    return `
      <div class="subscribe done">
        <div class="check">${icon('check')}</div>
        <h3>You're on the list.</h3>
        <p>New issues will arrive at <strong>${esc(state.email)}</strong> ${esc(site.cadence.toLowerCase())}.</p>
      </div>`;
  }
  return `
    <div class="subscribe">
      <h3>${compact ? 'Get the briefing' : 'One email. Every Monday.'}</h3>
      <p>${compact ? 'Weekly. No noise.' : 'The developments in AI and technology that matter — explained clearly, in five minutes.'}</p>
      <form data-subscribe novalidate>
        <input class="field" type="email" name="email" placeholder="you@company.com" autocomplete="email" inputmode="email" aria-label="Email address" required>
        <button class="btn" type="submit">Subscribe</button>
      </form>
      ${compact ? '' : '<div class="fine">Free · Unsubscribe anytime · No tracking</div>'}
    </div>`;
}

function installBanner() {
  if (!canOfferInstall() || state.installDismissed) return '';
  return `
    <div class="install-banner" data-install-banner>
      <img class="app-icon" src="icons/apple-touch-icon.png" alt="" width="46" height="46">
      <div class="txt">
        <strong>Get the Kernel app</strong>
        <span>Add to Home Screen for the full experience.</span>
      </div>
      <button class="btn small" data-action="install">Install</button>
      <button class="icon-btn x" data-action="dismiss-install" aria-label="Dismiss">${icon('x')}</button>
    </div>`;
}

const footer = () => `
  <footer class="site-foot">
    <span>© ${new Date().getFullYear()} ${site.name} · v${site.version}</span>
    <span>Prototype · sample content</span>
  </footer>`;

function nextEdition() {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() + (((8 - d.getDay()) % 7) || 7));
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

/* ==========================================================================
   Views
   ========================================================================== */

function viewToday() {
  const [latest, ...rest] = issues;
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  return {
    title: 'Today',
    left: `<a class="mini-brand" href="#/" aria-label="Kernel"><span class="brand-mark"></span><span>Kernel</span></a>`,
    right: `<button class="icon-btn" data-action="palette" data-hide-desktop aria-label="Search">${icon('search')}</button>`,
    html: `
      <div class="container wide">
        <header class="page-head">
          ${installBanner()}
          <div class="eyebrow">${esc(today)}</div>
          <h1 class="large-title" data-large-title>Today</h1>
          <div class="status" style="margin-top:14px">
            <span class="pulse" aria-hidden="true"></span><span>Live</span>
            <span class="sep">/</span><span>Issue ${pad(latest.number)}</span>
            <span class="sep">/</span><span>Next edition ${nextEdition()}</span>
          </div>
        </header>
        <div class="today-grid">
          <div>
            <a class="card feature" href="#/issue/${latest.slug}">
              <div class="kicker">
                <span class="tag"><span class="dot"></span>Latest · No. ${pad(latest.number)}</span>
                <span class="eyebrow">${esc(latest.topicName)}</span>
              </div>
              <h2>${esc(latest.title)}</h2>
              <p>${esc(latest.dek)}</p>
              <div class="foot">
                <span class="eyebrow">${fmtDate(latest.date)} · ${latest.readTime} min read</span>
                <span class="btn small">Read ${icon('arrow-right')}</span>
              </div>
            </a>
            <section class="section">
              <div class="section-head">
                <h2 class="section-title">Previous issues</h2>
                <a class="section-link" href="#/explore">See all</a>
              </div>
              ${issueList(rest.slice(0, 5))}
            </section>
          </div>
          <aside class="rail">
            <section class="section">
              <div class="section-head"><h2 class="section-title">Topics</h2></div>
              <div class="chips">
                ${topics.map((t) => `<a class="chip" href="#/topic/${t.id}">${icon(t.icon)}${esc(t.name)}</a>`).join('')}
              </div>
            </section>
            <section class="section">${subscribeCard()}</section>
          </aside>
        </div>
        ${footer()}
      </div>`,
  };
}

function viewExplore() {
  return {
    title: 'Explore',
    html: `
      <div class="container">
        <header class="page-head">
          <div class="eyebrow">Archive</div>
          <h1 class="large-title" data-large-title>Explore</h1>
        </header>
        <label class="search-field">
          ${icon('search')}
          <input type="search" placeholder="Search ${issues.length} issues" autocomplete="off" spellcheck="false" enterkeyhint="search" data-filter aria-label="Search issues">
        </label>
        <section class="section" data-topics-section>
          <div class="section-head"><h2 class="section-title">Topics</h2></div>
          <div class="topic-grid">
            ${topics
              .map(
                (t) => `
              <a class="card topic-card" href="#/topic/${t.id}">
                <span class="glyph">${icon(t.icon)}</span>
                <h3>${esc(t.name)}</h3>
                <span class="count">${plural(countByTopic[t.id] || 0, 'issue')}</span>
              </a>`,
              )
              .join('')}
          </div>
        </section>
        <section class="section">
          <div class="section-head"><h2 class="section-title" data-list-title>All issues</h2></div>
          ${issueList(issues)}
          <div class="empty" data-no-results hidden>
            <div class="glyph">${icon('search')}</div>
            <h2>No matches</h2>
            <p>Try a different word, or browse by topic.</p>
          </div>
        </section>
        ${footer()}
      </div>`,
    mount(root) {
      const input = $('[data-filter]', root);
      const rows = $$('.issue-row', root);
      input.addEventListener('input', () => {
        const terms = input.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
        let shown = 0;
        for (const row of rows) {
          const hit = terms.every((t) => row.dataset.search.includes(t));
          row.hidden = !hit;
          if (hit) shown++;
        }
        $('[data-topics-section]', root).hidden = terms.length > 0;
        $('[data-list-title]', root).textContent = terms.length ? `${shown} result${shown === 1 ? '' : 's'}` : 'All issues';
        $('[data-no-results]', root).hidden = shown > 0;
      });
    },
  };
}

function viewTopic(id) {
  const topic = topicById[id];
  if (!topic) return null;
  const list = issues.filter((it) => it.topic === id);
  return {
    title: topic.name,
    back: { href: '#/explore', label: 'Explore' },
    html: `
      <div class="container">
        <header class="page-head">
          <div class="eyebrow">Topic · ${plural(list.length, 'issue')}</div>
          <h1 class="large-title" data-large-title>${esc(topic.name)}</h1>
          <p class="lede">${esc(topic.blurb)}</p>
        </header>
        ${
          list.length
            ? issueList(list)
            : `<div class="empty"><div class="glyph">${icon(topic.icon)}</div><h2>Nothing here yet</h2><p>Issues about ${esc(topic.name.toLowerCase())} will appear here.</p></div>`
        }
        ${footer()}
      </div>`,
  };
}

function viewSaved() {
  const list = issues.filter((it) => state.saved.has(it.slug));
  return {
    title: 'Saved',
    html: `
      <div class="container">
        <header class="page-head">
          <div class="eyebrow">Library${list.length ? ` · ${list.length}` : ''}</div>
          <h1 class="large-title" data-large-title>Saved</h1>
        </header>
        ${
          list.length
            ? issueList(list)
            : `<div class="empty">
                <div class="glyph">${icon('saved')}</div>
                <h2>Nothing saved yet</h2>
                <p>Tap the bookmark on any issue to keep it here. Saved issues are available offline.</p>
                <a class="btn secondary" href="#/explore">Browse issues</a>
              </div>`
        }
      </div>`,
  };
}

function seg(action, current, options) {
  return `<div class="seg" role="group">${options
    .map(([value, label]) => `<button type="button" data-action="${action}" data-value="${value}" aria-pressed="${value === current}">${label}</button>`)
    .join('')}</div>`;
}

function viewSettings() {
  const offlineReady = !!navigator.serviceWorker?.controller;
  return {
    title: 'Settings',
    html: `
      <div class="container">
        <header class="page-head">
          <div class="eyebrow">${esc(site.name)} · v${site.version}</div>
          <h1 class="large-title" data-large-title>Settings</h1>
        </header>

        <div class="group">
          <div class="group-label">Subscription</div>
          ${
            state.email
              ? `<div class="list">
                  <div class="row"><span class="glyph accent">${icon('mail')}</span><span class="label">Subscribed<small>${esc(state.email)}</small></span>${icon('check', 'chev')}</div>
                  <button class="row plain danger" data-action="unsubscribe"><span class="label">Unsubscribe</span></button>
                </div>`
              : subscribeCard()
          }
        </div>

        <div class="group">
          <div class="group-label">Appearance</div>
          <div class="list">
            <div class="row"><span class="glyph">${icon('moon')}</span><span class="label">Theme</span>
              ${seg('theme', state.theme, [['system', 'Auto'], ['light', 'Light'], ['dark', 'Dark']])}</div>
            <div class="row"><span class="glyph">${icon('text')}</span><span class="label">Text size</span>
              ${seg('text', state.textSize, [['s', 'S'], ['m', 'M'], ['l', 'L'], ['xl', 'XL']])}</div>
          </div>
        </div>

        <div class="group">
          <div class="group-label">Notifications</div>
          <div class="list">
            <div class="row"><span class="glyph">${icon('bell')}</span><span class="label">New issue alerts<small>Coming soon</small></span>
              <button class="switch" role="switch" aria-checked="false" aria-label="New issue alerts" disabled></button></div>
          </div>
        </div>

        <div class="group">
          <div class="group-label">App</div>
          <div class="list">
            ${
              isStandalone
                ? `<div class="row"><span class="glyph accent">${icon('bolt')}</span><span class="label">Running as an app</span>${icon('check', 'chev')}</div>`
                : `<button class="row" data-action="install"><span class="glyph accent">${icon('plus-square')}</span><span class="label">Add to Home Screen<small>Full-screen, offline-ready</small></span>${icon('chevron-right', 'chev')}</button>`
            }
            <div class="row"><span class="glyph">${icon('offline')}</span><span class="label">Offline reading</span><span class="value">${offlineReady ? 'Ready' : 'Preparing…'}</span></div>
            <button class="row" data-action="refresh"><span class="glyph">${icon('refresh')}</span><span class="label">Refresh content</span>${icon('chevron-right', 'chev')}</button>
          </div>
        </div>

        <div class="group">
          <div class="group-label">About</div>
          <div class="list">
            <div class="row plain"><span class="label">Version</span><span class="value mono">${site.version}</span></div>
            <div class="row plain"><span class="label">Issues</span><span class="value mono">${issues.length}</span></div>
            <div class="row plain"><span class="label">Edition</span><span class="value">${esc(site.cadence)}</span></div>
          </div>
          <p class="group-note">${esc(site.name)} is a prototype. The issues shown are sample content and will be replaced.</p>
        </div>
        ${footer()}
      </div>`,
  };
}

function viewIssue(slug) {
  const it = issueBySlug[slug];
  if (!it) return null;
  const idx = issues.indexOf(it);
  const next = issues[idx + 1] || issues[0];
  const saved = state.saved.has(slug);
  const from = tabById[lastTab] || tabById.today;
  return {
    title: it.title,
    reading: true,
    back: { href: from.href, label: from.label },
    right: `
      <button class="icon-btn" data-action="share" aria-label="Share">${icon('share')}</button>
      <button class="icon-btn ${saved ? 'on' : ''}" data-action="save" data-slug="${slug}" aria-pressed="${saved}" aria-label="${saved ? 'Remove from Saved' : 'Save'}">${icon(saved ? 'saved-fill' : 'saved')}</button>`,
    html: `
      <article class="container">
        <header class="article-head">
          <div class="eyebrow"><span class="accent">No. ${pad(it.number)}</span><span class="sep">/</span><a href="#/topic/${it.topic}">${esc(it.topicName)}</a></div>
          <h1 data-large-title>${esc(it.title)}</h1>
          <p class="dek">${esc(it.dek)}</p>
          <div class="byline">
            <img class="avatar" src="icons/icon-192.png" alt="" width="36" height="36">
            <div>
              <div class="who">${esc(it.author)}</div>
              <div class="when">${fmtDate(it.date, { month: 'long', day: 'numeric', year: 'numeric' })} · ${it.readTime} min read</div>
            </div>
          </div>
        </header>
        <div class="prose">${it.body}</div>
        <footer class="article-end">
          <div class="eyebrow">${next === issues[0] ? 'Latest issue' : 'Up next'}</div>
          <a class="card next-card" href="#/issue/${next.slug}">
            <div class="eyebrow"><span class="accent">No. ${pad(next.number)}</span><span class="sep">/</span>${esc(next.topicName)}</div>
            <h3>${esc(next.title)}</h3>
            <p>${esc(next.dek)}</p>
          </a>
          ${state.email ? '' : `<div style="margin-top:28px">${subscribeCard()}</div>`}
        </footer>
        ${footer()}
      </article>`,
  };
}

/* ==========================================================================
   Router
   ========================================================================== */

const routes = [
  { re: /^\/?$/, tab: 'today', depth: 0, view: viewToday },
  { re: /^\/explore\/?$/, tab: 'explore', depth: 0, view: viewExplore },
  { re: /^\/topic\/([\w-]+)\/?$/, tab: 'explore', depth: 1, view: viewTopic },
  { re: /^\/saved\/?$/, tab: 'saved', depth: 0, view: viewSaved },
  { re: /^\/settings\/?$/, tab: 'settings', depth: 0, view: viewSettings },
  { re: /^\/issue\/([\w-]+)\/?$/, tab: null, depth: 2, view: viewIssue },
];

const page = $('#page');
const topbar = $('[data-topbar]');
const progress = $('[data-progress]');
const scrollMemory = new Map();
let current = null; // { key, route, view, idx }
let lastTab = 'today';
let skipNextAnimation = false;

history.scrollRestoration = 'manual';

const currentPath = () => decodeURIComponent(location.hash.replace(/^#/, '')) || '/';

function resolve(path) {
  for (const route of routes) {
    const m = path.match(route.re);
    if (m) {
      const view = route.view(...m.slice(1));
      if (view) return { route, view };
    }
  }
  return null;
}

function render({ initial = false } = {}) {
  const path = currentPath();
  const resolved = resolve(path);
  if (!resolved) {
    location.replace('#/');
    return;
  }
  const { route, view } = resolved;

  // Every history entry gets an index so we know whether we moved forward or back.
  let idx = history.state?.idx;
  if (idx == null) {
    idx = (current?.idx ?? 0) + 1;
    history.replaceState({ idx }, '');
  }

  let dir = 'fade';
  if (current && !initial) {
    scrollMemory.set(current.key, window.scrollY);
    if (route.depth > current.route.depth) dir = 'push';
    else if (route.depth < current.route.depth) dir = 'pop';
    else if (route.tab && route.tab !== current.route.tab) dir = 'fade';
    else dir = idx < current.idx ? 'pop' : 'push';
  }
  if (skipNextAnimation) {
    dir = 'none';
    skipNextAnimation = false;
  }

  if (route.tab) lastTab = route.tab;
  current = { key: path, route, view, idx };

  // Chrome
  $('[data-topbar-left]').innerHTML = view.back
    ? `<button class="back-btn" data-action="back" data-href="${view.back.href}">${icon('chevron-left')}<span>${esc(view.back.label)}</span></button>`
    : view.left || '';
  $('[data-topbar-title]').textContent = view.title;
  $('[data-topbar-right]').innerHTML = view.right || '';
  topbar.classList.remove('scrolled');
  progress.classList.toggle('active', !!view.reading);
  progress.style.transform = 'scaleX(0)';
  updateNav();

  // Page
  page.style.transform = '';
  page.style.transition = '';
  page.innerHTML = view.html;
  page.classList.remove('enter-push', 'enter-pop', 'enter-fade');
  if (dir !== 'none' && !initial) {
    void page.offsetWidth;
    page.classList.add('enter-' + dir);
  }

  const y = dir === 'pop' ? scrollMemory.get(path) ?? 0 : 0;
  window.scrollTo(0, y);

  view.mount?.(page);
  document.title = route.tab === 'today' ? `${site.name} — ${site.tagline}` : `${view.title} — ${site.name}`;
  largeTitle = $('[data-large-title]', page);
  onScroll();
  if (!initial) page.focus({ preventScroll: true });
}

page.addEventListener('animationend', () => page.classList.remove('enter-push', 'enter-pop', 'enter-fade'));

function goBack(fallback) {
  if ((history.state?.idx ?? 1) > 1) history.back();
  else location.replace(fallback || '#/');
}

function rerender() {
  // Re-render the current view in place (state changed), keeping scroll.
  const y = window.scrollY;
  skipNextAnimation = true;
  render();
  window.scrollTo(0, y);
}

/* ---------- Navigation chrome ---------- */

function updateNav() {
  const active = current?.route.tab ?? lastTab;
  const isIssue = !current?.route.tab;

  $('[data-tabbar]').innerHTML = TABS.map(
    (t) => `<a class="tab" href="${t.href}" ${t.id === active ? 'aria-current="page"' : ''}>${icon(t.id === 'saved' && t.id === active ? 'saved-fill' : t.icon)}<span>${t.label}</span></a>`,
  ).join('');

  $('[data-nav]').innerHTML = TABS.map(
    (t) =>
      `<a class="side-link" href="${t.href}" ${t.id === active && !isIssue ? 'aria-current="page"' : ''}>${icon(t.icon)}<span>${t.label}</span>${
        t.id === 'saved' && state.saved.size ? `<span class="count">${state.saved.size}</span>` : ''
      }</a>`,
  ).join('');

  const topicPath = current?.key.startsWith('/topic/') ? current.key.slice(7) : null;
  $('[data-side-topics]').innerHTML = topics
    .map(
      (t) =>
        `<a class="side-link" href="#/topic/${t.id}" ${t.id === topicPath ? 'aria-current="page"' : ''}>${icon(t.icon)}<span>${esc(t.name)}</span><span class="count">${countByTopic[t.id] || 0}</span></a>`,
    )
    .join('');

  $('[data-side-footer]').innerHTML = subscribeCard({ compact: true });
}

/* ---------- Scroll: large title collapse + reading progress ---------- */

let largeTitle = null;
let ticking = false;

function onScroll() {
  ticking = false;
  const barBottom = topbar.getBoundingClientRect().bottom;
  const scrolled = largeTitle ? largeTitle.getBoundingClientRect().bottom < barBottom + 4 : window.scrollY > 4;
  topbar.classList.toggle('scrolled', scrolled);
  if (current?.view.reading) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
  }
}

window.addEventListener(
  'scroll',
  () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  },
  { passive: true },
);

/* ---------- Edge swipe to go back (installed app only, like native) ---------- */

let swipe = null;

window.addEventListener(
  'touchstart',
  (e) => {
    if (!isStandalone || !current || current.route.depth === 0 || layerOpen()) return;
    const t = e.touches[0];
    if (t.clientX > 24) return;
    swipe = { x: t.clientX, y: t.clientY, dx: 0, t: performance.now(), active: false };
  },
  { passive: true },
);

window.addEventListener(
  'touchmove',
  (e) => {
    if (!swipe) return;
    const t = e.touches[0];
    const dx = t.clientX - swipe.x;
    const dy = t.clientY - swipe.y;
    if (!swipe.active) {
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 8) return (swipe = null);
      if (dx < 8) return;
      swipe.active = true;
      page.style.transition = 'none';
    }
    swipe.dx = Math.max(0, dx);
    page.style.transform = `translate3d(${swipe.dx}px,0,0)`;
  },
  { passive: true },
);

window.addEventListener('touchend', () => {
  if (!swipe) return;
  const s = swipe;
  swipe = null;
  if (!s.active) return;
  const velocity = s.dx / (performance.now() - s.t);
  if (s.dx > Math.min(140, window.innerWidth * 0.33) || velocity > 0.6) {
    page.style.transition = 'transform 0.22s cubic-bezier(0.22, 0.8, 0.24, 1)';
    page.style.transform = `translate3d(${window.innerWidth}px,0,0)`;
    setTimeout(() => {
      skipNextAnimation = true;
      const btn = $('[data-action="back"]');
      goBack(btn?.dataset.href);
    }, 200);
  } else {
    page.style.transition = 'transform 0.3s cubic-bezier(0.22, 0.8, 0.24, 1)';
    page.style.transform = '';
  }
});

/* ==========================================================================
   Layer: sheets & command palette
   ========================================================================== */

const layer = $('[data-layer]');
let layerCleanup = null;
let layerReturnFocus = null;
const layerOpen = () => layer.classList.contains('open');

function openLayer(markup, { onOpen, onClose } = {}) {
  if (layerOpen()) closeLayer(true);
  layerReturnFocus = document.activeElement;
  layer.innerHTML = markup;
  layerCleanup = onClose || null;
  html.style.overflow = 'hidden';
  requestAnimationFrame(() => {
    layer.classList.add('open');
    onOpen?.(layer);
  });
}

function closeLayer(immediate = false) {
  if (!layerOpen()) return;
  layer.classList.remove('open');
  html.style.overflow = '';
  layerCleanup?.();
  layerCleanup = null;
  const clear = () => {
    if (!layerOpen()) layer.innerHTML = '';
  };
  immediate ? clear() : setTimeout(clear, 380);
  layerReturnFocus?.focus?.({ preventScroll: true });
}

layer.addEventListener('click', (e) => {
  if (e.target.closest('[data-close]')) closeLayer();
});

/* ---------- Install ---------- */

async function install() {
  if (deferredInstall) {
    deferredInstall.prompt();
    const choice = await deferredInstall.userChoice.catch(() => null);
    deferredInstall = null;
    if (choice?.outcome === 'accepted') toast('Kernel installed', { icon: 'check' });
    return;
  }
  const steps = isIOS
    ? `
      <li><span>Tap <strong>Share</strong> in Safari${isIPad ? '' : ' — or <strong>•••</strong>, then Share'}</span>${icon('share')}</li>
      <li><span>Choose <strong>Add to Home Screen</strong></span>${icon('plus-square')}</li>
      <li><span>Keep <strong>Open as Web App</strong> on, then tap <strong>Add</strong></span>${icon('check')}</li>`
    : `
      <li><span><strong>Safari on Mac:</strong> File → Add to Dock</span>${icon('plus-square')}</li>
      <li><span><strong>Chrome or Edge:</strong> use the install icon in the address bar</span>${icon('arrow-right')}</li>
      <li><span>Open Kernel from your Dock or apps like any other app</span>${icon('check')}</li>`;
  openLayer(`
    <div class="backdrop" data-close></div>
    <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="install-title">
      <div class="grabber"></div>
      <button class="icon-btn close" data-close aria-label="Close">${icon('x')}</button>
      <div class="install-hero">
        <img src="icons/apple-touch-icon.png" alt="" width="60" height="60">
        <div>
          <h2 id="install-title">Install Kernel</h2>
          <p class="sub">Full-screen, offline-ready, one tap away.</p>
        </div>
      </div>
      <ol class="steps">${steps}</ol>
      <button class="btn block" data-close>Got it</button>
    </div>`);
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstall = e;
  if (current?.route.tab === 'today' || current?.route.tab === 'settings') rerender();
});

window.addEventListener('appinstalled', () => {
  deferredInstall = null;
  toast('Kernel installed', { icon: 'check' });
});

/* ---------- Command palette (⌘K) ---------- */

function paletteItems(query) {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const match = (text) => terms.every((t) => text.toLowerCase().includes(t));
  const groups = [];

  const issueHits = issues
    .filter((it) => !terms.length || match(`${it.title} ${it.dek} ${it.topicName} ${pad(it.number)}`))
    .slice(0, terms.length ? 8 : 4)
    .map((it) => ({ icon: 'today', label: it.title, hint: pad(it.number), href: `#/issue/${it.slug}` }));
  if (issueHits.length) groups.push([terms.length ? 'Issues' : 'Recent issues', issueHits]);

  const topicHits = topics
    .filter((t) => !terms.length || match(`${t.name} ${t.blurb} topic`))
    .map((t) => ({ icon: t.icon, label: t.name, hint: `${countByTopic[t.id] || 0}`, href: `#/topic/${t.id}` }));
  if (topicHits.length && terms.length) groups.push(['Topics', topicHits]);

  const nav = TABS.filter((t) => !terms.length || match(`go to ${t.label}`)).map((t) => ({
    icon: t.icon,
    label: `Go to ${t.label}`,
    href: t.href,
  }));
  if (nav.length) groups.push(['Navigate', nav]);

  const nextTheme = isDark() ? 'light' : 'dark';
  const actions = [
    { icon: isDark() ? 'sun' : 'moon', label: `Switch to ${nextTheme} appearance`, run: () => setTheme(nextTheme), keys: 'theme dark light mode appearance' },
    ...(canOfferInstall() ? [{ icon: 'plus-square', label: 'Install Kernel app', run: install, keys: 'install add home screen app' }] : []),
    ...(!state.email ? [{ icon: 'mail', label: 'Subscribe to the newsletter', href: '#/settings', keys: 'subscribe email newsletter' }] : []),
  ].filter((a) => !terms.length || match(`${a.label} ${a.keys}`));
  if (actions.length) groups.push(['Actions', actions]);

  return groups;
}

function openPalette() {
  let flat = [];
  let sel = 0;

  const paint = (root) => {
    const input = $('input', root);
    const results = $('.palette-results', root);
    const groups = paletteItems(input.value);
    flat = groups.flatMap(([, items]) => items);
    sel = Math.min(sel, Math.max(0, flat.length - 1));
    let n = 0;
    results.innerHTML = flat.length
      ? groups
          .map(
            ([name, items]) =>
              `<div class="palette-group">${name}</div>` +
              items
                .map((item) => {
                  const i = n++;
                  return `<button class="palette-item" role="option" data-i="${i}" aria-selected="${i === sel}">${icon(item.icon)}<span class="t">${esc(item.label)}</span>${item.hint ? `<span class="k">${esc(item.hint)}</span>` : ''}</button>`;
                })
                .join(''),
          )
          .join('')
      : `<div class="palette-empty">No results for “${esc(input.value)}”</div>`;
  };

  const select = (root, i) => {
    sel = i;
    $$('.palette-item', root).forEach((el) => el.setAttribute('aria-selected', String(Number(el.dataset.i) === sel)));
    $(`.palette-item[data-i="${sel}"]`, root)?.scrollIntoView({ block: 'nearest' });
  };

  const run = (i) => {
    const item = flat[i];
    if (!item) return;
    closeLayer(true);
    if (item.href) location.hash = item.href.slice(1);
    else item.run?.();
  };

  openLayer(
    `
    <div class="backdrop" data-close></div>
    <div class="palette" role="dialog" aria-modal="true" aria-label="Search">
      <div class="palette-input">
        ${icon('search')}
        <input type="search" placeholder="Search issues, topics, actions…" autocomplete="off" spellcheck="false" enterkeyhint="go" aria-label="Search">
        <kbd>esc</kbd>
      </div>
      <div class="palette-results" role="listbox"></div>
      <div class="palette-foot"><span><kbd>↑</kbd><kbd>↓</kbd>navigate</span><span><kbd>↵</kbd>open</span><span><kbd>esc</kbd>close</span></div>
    </div>`,
    {
      onOpen(root) {
        const input = $('input', root);
        paint(root);
        input.focus();
        input.addEventListener('input', () => {
          sel = 0;
          paint(root);
        });
        input.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowDown') (e.preventDefault(), select(root, Math.min(flat.length - 1, sel + 1)));
          else if (e.key === 'ArrowUp') (e.preventDefault(), select(root, Math.max(0, sel - 1)));
          else if (e.key === 'Enter') (e.preventDefault(), run(sel));
        });
        const results = $('.palette-results', root);
        results.addEventListener('click', (e) => {
          const el = e.target.closest('.palette-item');
          if (el) run(Number(el.dataset.i));
        });
        results.addEventListener('pointermove', (e) => {
          const el = e.target.closest('.palette-item');
          if (el && Number(el.dataset.i) !== sel) select(root, Number(el.dataset.i));
        });
      },
    },
  );
}

/* ==========================================================================
   Toasts
   ========================================================================== */

function toast(message, { icon: iconName, action, onAction, duration = 2400, sticky = false } = {}) {
  const region = $('[data-toasts]');
  const el = document.createElement('div');
  el.className = 'toast' + (action ? '' : ' only');
  el.innerHTML = `${iconName ? icon(iconName) : ''}<span>${esc(message)}</span>${action ? `<button type="button">${esc(action)}</button>` : ''}`;
  const dismiss = () => {
    el.classList.add('out');
    setTimeout(() => el.remove(), 260);
  };
  if (action) el.querySelector('button').addEventListener('click', () => (onAction?.(), dismiss()));
  region.appendChild(el);
  if (!sticky) setTimeout(dismiss, duration);
}

/* ==========================================================================
   Preferences
   ========================================================================== */

const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
const isDark = () => state.theme === 'dark' || (state.theme === 'system' && darkQuery.matches);

function applyTheme() {
  if (state.theme === 'system') html.removeAttribute('data-theme');
  else html.setAttribute('data-theme', state.theme);
  const [light, dark] = $$('meta[name="theme-color"]');
  if (state.theme === 'system') {
    light.content = '#ffffff';
    dark.content = '#000000';
  } else {
    light.content = dark.content = state.theme === 'dark' ? '#000000' : '#ffffff';
  }
}

function setTheme(theme) {
  state.theme = theme;
  store.set('theme', theme);
  applyTheme();
  if (current?.route.tab === 'settings') rerender();
}

function setTextSize(size) {
  state.textSize = size;
  store.set('textSize', size);
  html.setAttribute('data-text', size);
  if (current?.route.tab === 'settings') rerender();
}

/* ==========================================================================
   Global events
   ========================================================================== */

const actions = {
  back: (el) => goBack(el.dataset.href),
  palette: () => openPalette(),
  install: () => install(),
  'dismiss-install': () => {
    state.installDismissed = true;
    store.set('installDismissed', true);
    const banner = $('[data-install-banner]');
    banner?.animate([{ opacity: 1 }, { opacity: 0, transform: 'scale(0.97)' }], { duration: 180, easing: 'ease-out' }).finished.then(() => banner.remove());
  },
  theme: (el) => setTheme(el.dataset.value),
  text: (el) => setTextSize(el.dataset.value),
  save: (el) => {
    const slug = el.dataset.slug;
    const saved = !state.saved.has(slug);
    saved ? state.saved.add(slug) : state.saved.delete(slug);
    store.set('saved', [...state.saved]);
    el.classList.toggle('on', saved);
    el.setAttribute('aria-pressed', String(saved));
    el.setAttribute('aria-label', saved ? 'Remove from Saved' : 'Save');
    el.innerHTML = icon(saved ? 'saved-fill' : 'saved');
    el.animate([{ transform: 'scale(0.8)' }, { transform: 'scale(1.12)' }, { transform: 'scale(1)' }], { duration: 320, easing: 'ease-out' });
    updateNav();
    toast(saved ? 'Saved to your library' : 'Removed from Saved', { icon: saved ? 'saved-fill' : 'saved' });
  },
  share: async () => {
    const it = current?.view;
    const data = { title: `${it?.title} — ${site.name}`, url: location.href };
    if (navigator.share) {
      try {
        await navigator.share(data);
      } catch {}
      return;
    }
    try {
      await navigator.clipboard.writeText(location.href);
      toast('Link copied', { icon: 'link' });
    } catch {
      toast('Copy the link from the address bar');
    }
  },
  unsubscribe: () => {
    state.email = null;
    store.set('email', null);
    rerender();
    toast('You have been unsubscribed');
  },
  refresh: async () => {
    try {
      if ('caches' in window) await Promise.all((await caches.keys()).map((k) => caches.delete(k)));
      const reg = await navigator.serviceWorker?.getRegistration();
      await reg?.update();
    } catch {}
    location.reload();
  },
};

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]');
  if (!el || !actions[el.dataset.action]) return;
  e.preventDefault();
  actions[el.dataset.action](el);
});

document.addEventListener('submit', (e) => {
  const form = e.target.closest('[data-subscribe]');
  if (!form) return;
  e.preventDefault();
  const input = form.elements.email;
  const email = input.value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    input.focus();
    input.animate(
      [{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(0)' }],
      { duration: 320, easing: 'ease-out' },
    );
    toast('Enter a valid email address');
    return;
  }
  input.blur();
  state.email = email;
  store.set('email', email);
  rerender();
  toast("You're subscribed", { icon: 'check' });
});

document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    layerOpen() ? closeLayer() : openPalette();
  } else if (e.key === 'Escape' && layerOpen()) {
    closeLayer();
  } else if (e.key === '/' && !layerOpen() && !/INPUT|TEXTAREA/.test(document.activeElement?.tagName)) {
    e.preventDefault();
    openPalette();
  }
});

darkQuery.addEventListener?.('change', () => current?.route.tab === 'settings' && rerender());

window.addEventListener('hashchange', () => {
  if (layerOpen()) closeLayer(true);
  render();
});

/* ==========================================================================
   Service worker: offline + silent updates
   ========================================================================== */

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  const hadController = !!navigator.serviceWorker.controller;
  let reloading = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadController || reloading) return;
    reloading = true;
    location.reload();
  });
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('sw.js')
      .then((reg) => {
        const prompt = (worker) =>
          toast('A new version is ready', { icon: 'sparkles', action: 'Update', sticky: true, onAction: () => worker.postMessage('skipWaiting') });
        if (reg.waiting && hadController) prompt(reg.waiting);
        reg.addEventListener('updatefound', () => {
          const worker = reg.installing;
          worker?.addEventListener('statechange', () => {
            if (worker.state === 'installed' && navigator.serviceWorker.controller) prompt(worker);
          });
        });
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') reg.update().catch(() => {});
        });
      })
      .catch(() => {});
  });
}

/* ==========================================================================
   Boot
   ========================================================================== */

$$('.i[data-icon]').forEach((el) => (el.innerHTML = svg(el.dataset.icon)));
applyTheme();
render({ initial: true });
