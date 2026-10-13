/* ===========================================================================
   Once Upon a Dish — comportamento del sito
   Si scorre dalla copertina all'indice, ogni capitolo apre i suoi prodotti.
   =========================================================================== */

(() => {
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));

  /* ----------------------------------------------------------- 1. lingua  */
  /*  Inglese alla prima visita: OUD.lang nasce 'en' in data.js. Se il
      selettore EN | IT e' stato usato, quella scelta viene ricordata.      */
  try { const v = localStorage.getItem('oud-lang-v2'); if (v === 'it' || v === 'en') OUD.lang = v; } catch (e) {}

  /* t() legge un campo bilingue; una stringa semplice vale per entrambe */
  const t  = LANGTEXT;
  const tl = (v) => { const r = t(v); return Array.isArray(r) ? r : (Array.isArray(v) ? v : []); };

  /* il selettore: EN | IT, lo stesso sulla copertina e nella barra */
  const langHTML = () => `
        <button type="button" data-lang="en" aria-pressed="${OUD.lang === 'en'}">EN</button>
        <span aria-hidden="true">|</span>
        <button type="button" data-lang="it" aria-pressed="${OUD.lang === 'it'}">IT</button>`;

  /*  Il cambio lingua riscrive i testi e lascia la lettura dov'era: nessun
      ricaricamento, la mappa non riparte, le animazioni non si interrompono. */
  function setLang(l) {
    if (l === OUD.lang) return;
    OUD.lang = l;
    try { localStorage.setItem('oud-lang-v2', l); } catch (e) {}
    document.documentElement.lang = l;
    const at = state.view, y = scrollY;
    render(false);
    syncCover();
    syncMapText();
    if (at === 'index') scrollTo({ top: y, behavior: 'auto' });
    else goTo(at, 'auto');
    onScroll();
    if (!modal.hidden && state.openDish) openDish(state.openDish);
  }

  /* --------------------------------------------------- 2. le fotografie   */
  const FILIGREE = `<svg viewBox="0 0 220 14" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">
      <path d="M0 7h74"/><path d="M146 7h74"/>
      <path d="M110 1.5 112.6 7 110 12.5 107.4 7Z"/>
      <path d="M84 7c6-6 14-6 20 0-6 6-14 6-20 0Z"/>
      <path d="M136 7c-6-6-14-6-20 0 6 6 14 6 20 0Z"/>
      <circle cx="79" cy="7" r="1.6"/><circle cx="141" cy="7" r="1.6"/>
    </svg>`;

  const photoSrc = (d) => (typeof PHOTOS !== 'undefined' && PHOTOS[d.slug]) ||
                          'assets/photos/' + d.slug + '.jpg';

  const clampRatio = (r) => Math.min(1.95, Math.max(0.8, r || 1)).toFixed(3);
  const frameRatio = (slug) => clampRatio(typeof AR !== 'undefined' ? AR[slug] : 1);

  function placeholder(dish) {
    const tag = (t(dish.eyebrow) || dish.inspired || 'Once Upon a Dish').toUpperCase();
    const svg =
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <defs>
    <radialGradient id="v" cx="50%" cy="42%" r="72%">
      <stop offset="0%" stop-color="#2f2517"/><stop offset="100%" stop-color="#15100a"/>
    </radialGradient>
    <linearGradient id="g" gradientUnits="userSpaceOnUse" x1="400" y1="200" x2="400" y2="440">
      <stop offset="0%" stop-color="#e3cd90"/><stop offset="100%" stop-color="#9c7a33"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#v)"/>
  <g fill="none" stroke="url(#g)" stroke-width="2.4" opacity=".88" stroke-linejoin="round">
    <ellipse cx="400" cy="396" rx="196" ry="38"/>
    <ellipse cx="400" cy="392" rx="140" ry="26" stroke-width="1.4" opacity=".6"/>
    <path d="M268 388c0-78 59-134 132-134s132 56 132 134"/>
    <path d="M400 254v-22"/><circle cx="400" cy="222" r="11"/>
    <path d="M318 336q82-34 164 0" stroke-width="1.3" opacity=".55"/>
  </g>
  <g fill="#cdb173" opacity=".92" text-anchor="middle"
     font-family="Cinzel, Georgia, serif" font-size="30" letter-spacing="9">
    <text x="400" y="486">${esc(tag)}</text>
  </g>
  <g fill="#9b855c" text-anchor="middle"
     font-family="Cinzel, Georgia, serif" font-size="19" letter-spacing="7">
    <text x="400" y="528">${esc(t(UI.soon))}</text>
  </g>
</svg>`;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  /* le foto della categoria aperta vengono scaldate nei momenti di quiete,
     così la scheda si apre con l'immagine già pronta. Solo quella categoria:
     su rete lenta non ha senso scaricare tutte le fotografie del menu. */
  const warmed = new Set();
  function warmPhotos(course) {
    const queue = (course ? dishesOf(course) : []).filter(d => d.slug);
    if (!queue.length) return;
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 120));
    let i = 0;
    const step = () => {
      while (i < queue.length && warmed.has(queue[i].slug)) i++;
      if (i >= queue.length) return;
      const d = queue[i++];
      warmed.add(d.slug);
      const im = new Image();
      im.decoding = 'async';
      im.onload = im.onerror = () => idle(step, { timeout: 800 });
      im.src = photoSrc(d);
    };
    idle(step, { timeout: 800 });
  }

  /* ------------------------------------------------------------ 3. dati   */
  const courseOf = (id) => MENU.find(c => c.id === id);
  /* i punti del documento con una testata propria: i capitoli e gli allergeni */
  const sectionOf = (id) => courseOf(id) || (id === ALLERGENS.id ? ALLERGENS : null);
  const dishesOf = (c) => c.groups ? c.groups.flatMap(g => g.dishes) : (c.dishes || []);
  const allDishes = () => MENU.flatMap(dishesOf);
  const index = new Map();
  allDishes().forEach(d => { if (d.slug) index.set(d.slug, d); });

  const ROMAN = ['I','II','III','IV','V','VI','VII','VIII','IX','X'];
  const price = (p) => '&euro;&nbsp;' + esc(p);

  /* ------------------------------------------------------- 4. le viste    */
  const state = { view: 'index', winesOpen: false, openDish: null };
  const bar = $('#bar'), view = $('#view'), doc = $('#doc');

  function indexHTML() {
    const items = MENU.map((c, i) => `
      <li>
        <button class="idx__item" type="button" data-go="${c.id}">
          <span class="idx__num" aria-hidden="true">${ROMAN[i]}</span>
          <span class="idx__name">${esc(t(c.title))}</span>
          <span class="idx__dots" aria-hidden="true"></span>
          <span class="idx__mark" aria-hidden="true">&#10022;</span>
        </button>
      </li>`).join('');

    return `
      <section class="idx wrap" id="menu">
        <img class="brand" src="assets/img/logo.webp" width="800" height="800"
             alt="Once Upon a Dish" fetchpriority="high">
        <p class="idx__note">${esc(t(UI.indexNote))}</p>
        <span class="filigree" aria-hidden="true">${FILIGREE}</span>
        <ol class="idx__list">${items}</ol>
        <p class="idx__cover">
          <span>${esc(t(COVER.label))}</span>
          <b>${price(COVER.price)}</b>
          <i>${esc(t(COVER.note))}</i>
        </p>
        <footer class="foot">
          <p>${esc(t(UI.footText))}</p>
        </footer>
      </section>`;
  }

/* Una riga di prodotto: nome, descrizione, prezzo. La fotografia resta
   nascosta finché non si preme VIEW DISH. */
function dishRow(d) {
  const tag = t(d.tag);
  return `
    <li class="row">
      <div class="row__top">
        <span class="row__name">${esc(t(d.name))}${d.sub ? `<i>${esc(t(d.sub))}</i>` : ''}</span>
        <span class="row__dots" aria-hidden="true"></span>
        <span class="row__price">${price(d.price)}</span>
      </div>
      <p class="row__desc">${esc(t(d.short))}</p>
      <p class="row__foot">
        <button class="view" type="button" data-dish="${d.slug}">${esc(t(UI.view))}</button>
        ${tag ? `<span class="tag">${esc(tag)}</span>` : ''}
      </p>
    </li>`;
}

  /* una riga senza scheda: bevande, birre, vini */
  function plainRow(d) {
    const tag = t(d.tag);
    const vars = d.prices ? `
      <ul class="vars">${d.prices.map(p =>
        `<li><span>${esc(t(p.label))}</span><em>${price(p.price)}</em></li>`).join('')}</ul>` : '';
    return `
      <li class="row row--plain">
        <div class="row__top">
          <span class="row__name">${esc(t(d.name))}${d.size ? `<i>${esc(d.size)}</i>` : ''}</span>
          <span class="row__dots" aria-hidden="true"></span>
          ${d.price ? `<span class="row__price">${price(d.price)}</span>` : ''}
        </div>
        ${d.short ? `<p class="row__desc">${esc(t(d.short))}</p>` : ''}
        ${tag ? `<span class="tag">${esc(tag)}</span>` : ''}
        ${vars}
      </li>`;
  }

  function listHTML(c) {
    const row = c.simple ? plainRow : dishRow;
    if (!c.groups) return `<ol class="rows">${c.dishes.map(row).join('')}</ol>`;
    return c.groups.map(g => `
      <div class="group">
        <h2 class="group__title">${esc(t(g.title))}</h2>
        ${g.note ? `<p class="group__note">${esc(t(g.note))}</p>` : ''}
        <ol class="rows">${g.dishes.map(row).join('')}</ol>
      </div>`).join('');
  }

  function courseHTML(c) {
    const head = `
      <header class="course__head">
        <span class="course__mark" aria-hidden="true">&#10022;</span>
        <h1>${esc(t(c.title))}</h1>
        ${c.tag ? `<span class="course__tag">${esc(t(c.tag))}</span>` : ''}
        ${c.note ? `<p class="course__note">${esc(t(c.note))}</p>` : ''}
        <span class="filigree" aria-hidden="true">${FILIGREE}</span>
      </header>`;

    /* la carta dei vini si apre in due tempi */
    if (c.gated && !state.winesOpen) {
      return `
        <section class="course wrap" id="ch-${c.id}">
          ${head}
          <p class="gate__lead">${esc(t(c.gate.lead))}</p>
          <button class="gate__cta" type="button" id="wineGate">
            <span>${esc(t(c.gate.cta))}</span>
          </button>
        </section>`;
    }

    return `
      <section class="course wrap" id="ch-${c.id}">
        ${head}
        ${listHTML(c)}
        ${c.footer ? `<p class="course__foot">${esc(t(c.footer))}</p>` : ''}
      </section>`;
  }

  /*  La legenda degli allergeni: chiude il menu dopo l'ultima categoria.
      Stessa testata dei capitoli (stella, titolo, filigrana), poi le
      quattordici categorie di legge, l'avvertenza e la nota normativa.
      E' una legenda generale: non dice cosa contiene ogni piatto.        */
  function allergensHTML() {
    const A = ALLERGENS;
    const items = A.list.map((n, i) => `
      <li>
        <span class="alg__num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
        <span class="alg__dash" aria-hidden="true">&mdash;</span>
        <span class="alg__name">${esc(t(n))}</span>
      </li>`).join('');

    return `
      <section class="course alg wrap" id="ch-${A.id}">
        <header class="course__head">
          <span class="course__mark" aria-hidden="true">&#10022;</span>
          <h1>${esc(t(A.title))}</h1>
          <span class="course__tag">${esc(t(A.tag))}</span>
          <span class="filigree" aria-hidden="true">${FILIGREE}</span>
        </header>
        <p class="alg__lead">${esc(t(A.lead))}</p>
        <ol class="alg__list">${items}</ol>
        <aside class="alg__note">
          <h2>${esc(t(A.noteTitle))}</h2>
          ${tl(A.note).map(p => `<p>${esc(p)}</p>`).join('')}
        </aside>
        <p class="alg__legal">${esc(t(A.legal))}</p>
      </section>`;
  }

  const backHTML = () =>
    `<p class="backwrap"><button class="backlink" type="button" data-go="index">
       <span aria-hidden="true">&#8592;</span> ${esc(t(UI.back))}
     </button></p>`;

  function barHTML() {
    const atIndex = state.view === 'index';
    const c = atIndex ? null : sectionOf(state.view);
    return `
      <div class="bar__inner">
        <button class="bar__btn" type="button" data-go="${atIndex ? 'top' : 'index'}">
          <span aria-hidden="true">${atIndex ? '&#8593;' : '&#8592;'}</span>
          <span>${esc(atIndex ? t(UI.top) : t(UI.back))}</span>
        </button>
        <span class="bar__title">${atIndex ? 'Once Upon a Dish' : esc(t(c.title))}</span>
        <div class="lang" role="group" aria-label="Language / Lingua">${langHTML()}</div>
      </div>`;
  }

  /*  Una pagina sola: l'indice, poi i nove capitoli uno dopo l'altro. Si legge
      scorrendo; l'indice e la barra portano al punto giusto senza ricostruire
      nulla, cosi' la mappa dietro non riparte da capo a ogni capitolo.  */
  function render(animate = true) {
    bar.innerHTML = barHTML();
    view.innerHTML = indexHTML() + MENU.map(c => courseHTML(c)).join('') +
                     allergensHTML() + backHTML();
    view.classList.remove('is-in');
    if (!animate) return;  /* al cambio lingua i testi non rientrano da capo */
    void view.offsetWidth;
    view.classList.add('is-in');
  }

  /*  Porta a un capitolo. 'index' si ferma all'inizio del menu, con le
      categorie subito in vista; 'top' risale alla schermata iniziale.      */
  function goTo(id, behavior) {
    const how = behavior || (reduced ? 'auto' : 'smooth');
    if (id === 'top') return scrollTo({ top: 0, behavior: how });
    const el = id && id !== 'index' ? document.getElementById('ch-' + id) : doc;
    if (el) el.scrollIntoView({ behavior: how, block: 'start' });
    else scrollTo({ top: 0, behavior: how });
  }

  /*  Quale capitolo si sta leggendo: aggiorna il titolo nella barra,
      l'indirizzo e le fotografie da scaldare.  */
  function syncChapter() {
    const line = innerHeight * 0.3;
    let cur = 'index';
    for (const c of [...MENU, ALLERGENS]) {
      const el = document.getElementById('ch-' + c.id);
      if (el && el.getBoundingClientRect().top <= line) cur = c.id;
    }
    if (cur === state.view) return;
    state.view = cur;
    bar.innerHTML = barHTML();
    warmPhotos(courseOf(cur));
    const h = cur === 'index' ? '' : cur;
    if (location.hash.replace('#', '') !== h) {
      history.replaceState(null, '', h ? '#' + h : location.pathname + location.search);
    }
  }

  /* ----------------------------------------------------- 5. la copertina  */
  /*  Nessuna apertura animata: la pagina e' una sola, la copertina sta in
      cima e il menu la segue. Il sigillo, e la freccia sotto di lui, fanno
      scorrere fino alle categorie. Nient'altro.                            */
  const coverLang = $('#coverLang'), seal = $('#seal'), cue = $('#cue');

  function syncCover() {
    if (coverLang) coverLang.innerHTML = langHTML();
    const hint = $('#sealHint span');
    if (hint) hint.textContent = t(UI.open);
    if (seal) seal.setAttribute('aria-label', t(UI.scroll));
    if (cue)  cue.setAttribute('aria-label', t(UI.scroll));
  }

  /*  I nomi incisi sulla mappa seguono la lingua: si riscrive il testo, il
      disegno non viene ricostruito e la sua deriva non si interrompe.      */
  function syncMapText() {
    $$('.m-region', mapEl).forEach(el => {
      const r = REGIONS[+el.dataset.rg];
      if (r) el.textContent = t(r[2]);
    });
    $$('.cp--w', mapEl).forEach(el => { el.textContent = t(W_LABEL); });
  }

  /* --------------------------------------------------------- 6. la mappa  */
  const mapEl = $('#map');
  let drift, DRIFT = 2450;
  const L_AVG = 241, R_AVG = 1312;

  function buildMap() {
    mapEl.innerHTML = mapSVG();
    drift = $('#drift', mapEl);
    wireLandmarks();
    fitMap();
  }

  function fitMap() {
    const W = Math.max(320, innerWidth  || 320);
    const H = Math.max(320, innerHeight || 568);
    const vbH = Math.max(900, Math.round(H * 470 / W));
    mapEl.setAttribute('viewBox', `0 0 1600 ${vbH}`);
    const k = Math.max(W / 1600, H / vbH);
    const unitsW = W / k;
    const colHalf = (Math.min(780, W - 40) / 2 + 16) / k;
    const dPref  = colHalf + 96;
    const narrow = dPref > unitsW / 2 - 92;
    const d = narrow ? unitsW / 2 - 28 : dPref;
    const bl = $('.band--l', mapEl), br = $('.band--r', mapEl);
    if (bl) bl.setAttribute('transform', `translate(${Math.round(800 - d - L_AVG)} 0)`);
    if (br) br.setAttribute('transform', `translate(${Math.round(800 + d - R_AVG)} 0)`);
    mapEl.classList.toggle('is-narrow', narrow);
    DRIFT = Math.max(1700, 3380 - vbH);
  }

  /*  La mappa percorre tutto il disegno nell'arco del menu intero. Ora che i
      capitoli stanno in una pagina sola la corsa e' lunga, quindi il passo
      resta lento e si arriva in fondo avendo visto tutti i luoghi.  */
  function onScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
    if (drift) drift.setAttribute('transform', `translate(0 ${(-p * DRIFT).toFixed(1)})`);
    syncChapter();
  }

  /* --------------------------------------------- 7. i luoghi della mappa  */
  const tip = $('#tip');
  let tipTimer;

  function showTip(l, x, y) {
    tip.innerHTML = `<b>${esc(l.label)}</b><i>${esc(l.sub)}</i>`;
    tip.style.left = Math.min(innerWidth - 24, Math.max(24, x)) + 'px';
    tip.style.top  = Math.max(76, y) + 'px';
    tip.classList.add('is-on');
  }
  const hideTip = () => tip.classList.remove('is-on');

  function wireLandmarks() {
    $$('.lm', mapEl).forEach(g => {
      const l = LANDMARKS[+g.dataset.i];
      g.addEventListener('pointerenter', e => { if (e.pointerType !== 'touch') showTip(l, e.clientX, e.clientY); });
      g.addEventListener('pointermove',  e => { if (e.pointerType !== 'touch' && tip.classList.contains('is-on')) showTip(l, e.clientX, e.clientY); });
      g.addEventListener('pointerleave', hideTip);
      g.addEventListener('focus', () => {
        const r = g.getBoundingClientRect();
        showTip(l, r.left + r.width / 2, r.top + r.height * 0.4);
      });
      g.addEventListener('blur', hideTip);
      g.addEventListener('click', e => {
        const r = g.getBoundingClientRect();
        showTip(l, r.left + r.width / 2, r.top + r.height * 0.4);
        g.classList.add('is-lit');
        clearTimeout(tipTimer);
        tipTimer = setTimeout(() => { hideTip(); g.classList.remove('is-lit'); }, 2800);
        e.stopPropagation();
      });
    });
  }

  /* ------------------------------------------------- 8. scheda del piatto */
  const modal = $('#dish');
  const slot  = $('#dishCard');
  let lastFocus = null;

  function openDish(slug) {
    const d = index.get(slug);
    if (!d) return;
    if (modal.hidden) lastFocus = document.activeElement;
    state.openDish = slug;
    const eyebrow = t(d.eyebrow) || (d.inspired ? t(UI.inspired) + ' ' + d.inspired : t(UI.house));
    const ing = tl(d.ingredients);
    slot.innerHTML = `
      <button class="card__close" type="button" data-close aria-label="${esc(t(UI.closeCard))}">
        <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <path d="M1 1l12 12M13 1L1 13"/>
        </svg>
      </button>
      <figure class="card__photo" style="aspect-ratio:${frameRatio(d.slug)}">
        <img alt="${esc(t(d.name))}" src="${photoSrc(d)}" decoding="async" fetchpriority="high">
      </figure>
      <div class="card__body">
        <p class="card__eyebrow">${esc(eyebrow)}</p>
        <h2 class="card__name" id="dishTitle">${esc(t(d.name))}</h2>
        ${d.sub ? `<p class="card__sub">${esc(t(d.sub))}</p>` : ''}
        ${d.price ? `<p class="card__price">${price(d.price)}</p>` : ''}
        <span class="card__filigree" aria-hidden="true">${FILIGREE}</span>
        <p class="card__desc">${esc(t(d.long))}</p>
        ${ing.length ? `<ul class="card__ing">${ing.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
      </div>`;

    const img = $('img', slot);
    const ready = () => {
      img.classList.add('is-ready');
      if (!img.naturalWidth || !img.naturalHeight) return;
      const f = img.parentElement;
      f.style.aspectRatio = clampRatio(img.naturalWidth / img.naturalHeight);
      const floor = Math.round((slot.clientWidth || 560) * 0.72);
      f.style.maxWidth = Math.max(img.naturalWidth, floor) + 'px';
    };
    if (img.complete && img.naturalWidth) ready();
    else img.addEventListener('load', ready, { once: true });
    img.addEventListener('error', () => {
      img.src = placeholder(d);
      img.parentElement.style.aspectRatio = '4 / 3';
      img.parentElement.style.maxWidth = '';
      img.classList.add('is-ready');
    }, { once: true });

    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add('is-on'));
    document.body.style.overflow = 'hidden';
    $('[data-close]', slot).focus();
  }

  function closeDish() {
    state.openDish = null;
    modal.classList.remove('is-on');
    document.body.style.overflow = '';
    setTimeout(() => { modal.hidden = true; slot.innerHTML = ''; }, reduced ? 0 : 420);
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
  }

  /* ------------------------------------------------------------ 9. avvio  */
  document.documentElement.lang = OUD.lang;
  buildMap();
  render();
  syncCover();

  /* un indirizzo con #capitolo apre la lettura su quel capitolo */
  { const h = location.hash.replace('#', ''); if (sectionOf(h)) goTo(h, 'auto'); }

  document.addEventListener('click', e => {
    /* il sigillo e la freccia: portano al menu scorrendo, niente altro */
    if (e.target.closest('#seal') || e.target.closest('#cue')) return goTo('index');

    const lang = e.target.closest('[data-lang]');
    if (lang) return setLang(lang.dataset.lang);

    const go = e.target.closest('[data-go]');
    if (go) return goTo(go.dataset.go);

    if (e.target.closest('#wineGate')) {
      state.winesOpen = true;
      const el = document.getElementById('ch-vini');
      if (el) el.outerHTML = courseHTML(courseOf('vini'));
      return;
    }

    const dish = e.target.closest('[data-dish]');
    if (dish) return openDish(dish.dataset.dish);

    if (e.target.closest('[data-close]') || e.target.classList.contains('dish-veil')) return closeDish();
  });

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (!modal.hidden) return closeDish();
    if (state.view !== 'index') goTo('index');
  });

  addEventListener('hashchange', () => {
    const h = location.hash.replace('#', '');
    if (h !== state.view && (h === '' || sectionOf(h))) goTo(h || 'index');
  });

  let raf = 0;
  addEventListener('scroll', () => {
    if (raf) return;
    raf = requestAnimationFrame(() => { raf = 0; onScroll(); });
  }, { passive: true });
  addEventListener('resize', () => { fitMap(); onScroll(); }, { passive: true });
  onScroll();
})();
