/* ===========================================================================
   Once Upon a Dish — la mappa delle storie
   Miniature cartografiche originali in stile incisione: ogni luogo è disegnato
   a tratto, con prospettiva e tratteggio di ombra, come su una carta antica.

   Convenzioni di disegno
     · origine (0,0) alla base, al centro del disegno; verso l'alto = y negativa
     · ingombro tipico  x -70…70   y -110…4
     · classi:  .ln  contorno        .ln2 dettaglio sottile
                .hx  tratteggio      .fl  velatura chiara (nessun tratto)
   =========================================================================== */

let _uid = 0;
const _dv = (v, d) => (v === undefined ? d : v);

/* tratteggio inciso ritagliato dentro una forma.
   dir:  1 = diagonale \   -1 = diagonale /   0 = verticale              */
function sh(shape, o) {
  o = o || {};
  const id = 'h' + (++_uid);
  const x = _dv(o.x, -90), y = _dv(o.y, -130), w = _dv(o.w, 180), h = _dv(o.h, 150);
  const st = _dv(o.step, 3), dir = _dv(o.dir, 1);
  let d = '';
  if (dir === 0) {
    for (let i = 0; i < w; i += st) d += `M${(x + i).toFixed(1)} ${y}V${y + h}`;
  } else {
    for (let i = -h; i < w + h; i += st)
      d += `M${(x + i).toFixed(1)} ${y + h}L${(x + i + dir * h).toFixed(1)} ${y}`;
  }
  return `<clipPath id="${id}"><path d="${shape}"/></clipPath>` +
         `<g class="hx" clip-path="url(#${id})"><path d="${d}"/></g>`;
}

/* filari di pietra / corsi di mattoni dentro una forma */
function courses(shape, y0, y1, step, x0, x1) {
  const id = 'c' + (++_uid);
  let d = '';
  for (let y = y0; y <= y1; y += step) d += `M${x0} ${y}H${x1}`;
  return `<clipPath id="${id}"><path d="${shape}"/></clipPath>` +
         `<g class="hx" clip-path="url(#${id})"><path d="${d}"/></g>`;
}

/* chioma d'albero: festoni tondeggianti attorno a un centro */
function canopy(cx, cy, rx, ry, n, seed) {
  let s = seed || 7, d = '';
  const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i <= n; i++) {
    const a = Math.PI * (1 + i / n * 1.98);
    const r = 0.86 + rnd() * 0.3;
    const x = cx + Math.cos(a) * rx * r, y = cy + Math.sin(a) * ry * r;
    d += (i ? `A${(rx / n * 1.9).toFixed(1)} ${(ry / n * 2.1).toFixed(1)} 0 0 1 ` : 'M') +
         `${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

const G = {};

/* --- Rapunzel: la torre ------------------------------------------------- */
G.tower = () => {
  const body = 'M-15 2 L-12 -58 H12 L15 2 Z';
  return `
  <path class="ln2" d="M-52 3 q14 -7 26 -6 q16 1 28 5"/>
  ${sh('M-52 3 q14 -7 26 -6 q16 1 28 5 l-54 1Z', { x: -56, y: -6, w: 112, h: 12, step: 3.4, dir: -1 })}
  <path class="fl" d="${body}"/>
  <path class="ln" d="M-15 2 L-12 -58 M15 2 L12 -58"/>
  ${courses(body, -56, 0, 4.6, -16, 16)}
  ${sh('M4 2 L4 -58 H12 L15 2Z', { x: 2, y: -60, w: 16, h: 64, step: 2.6, dir: 0 })}
  <path class="ln2" d="M-13 -34 H13 M-13.6 -22 H13.6"/>
  <path class="ln" d="M-12 -58 H12"/>
  <path class="ln" d="M-19 -58 L0 -84 L19 -58 Z"/>
  ${sh('M2 -58 L0 -84 L19 -58Z', { x: 0, y: -86, w: 22, h: 30, step: 2.4, dir: 1 })}
  <path class="ln2" d="M-14 -64 q14 -5 28 0 M-9 -71 q9 -4 18 0"/>
  <path class="ln" d="M0 -84 V-93"/>
  <path class="ln2" d="M0 -93 l12 4 -12 4"/>
  <path class="ln2" d="M-4.5 -46 h9 v11 h-9 Z M-4.5 -41 h9 M0 -46 v11"/>
  <path class="ln2" d="M-3.5 -26 h7 a3.5 3.5 0 0 0 -7 0"/>
  <path class="ln2" d="M-12 -12 q-7 4 -9 12 M-9 -16 q-10 6 -12 17 M13 -16 q9 6 11 16"/>
  <path class="ln2" d="M-26 2 q3 -8 8 -11 M22 2 q-2 -7 -6 -10"/>`;
};

/* --- Rapunzel: la locanda ----------------------------------------------- */
G.tavern = () => {
  const roof = 'M-40 -24 L-24 -47 H22 L38 -24 Z';
  return `
  <path class="ln2" d="M-54 3 q22 -6 44 -5 q26 1 44 4"/>
  <path class="fl" d="M-34 2 V-24 H30 V2 Z"/>
  <path class="ln" d="M-34 2 V-24 H30 V2"/>
  <path class="ln" d="${roof}"/>
  ${sh(roof, { x: -42, y: -49, w: 82, h: 28, step: 2.5, dir: -1 })}
  <path class="ln2" d="M-32 -30 h58 M-28 -36 h50 M-24 -42 h42"/>
  <path class="ln2" d="M-34 -24 H30"/>
  <path class="ln2" d="M-22 2 V-16 h14 V2 M-22 -16 h14"/>
  <path class="ln2" d="M-15 2 V-16"/>
  <path class="ln2" d="M2 -18 h12 v10 H2 Z M8 -18 v10 M2 -13 h12"/>
  ${sh('M18 2 V-24 H30 V2Z', { x: 16, y: -26, w: 16, h: 30, step: 2.6, dir: 0 })}
  <path class="ln" d="M14 -47 v-13 h8 v13"/>
  <path class="ln2" d="M13 -60 h10"/>
  <path class="ln2" d="M18 -62 q-6 -5 -1 -10 q5 -5 0 -10"/>
  <path class="ln" d="M38 2 V-34"/>
  <path class="ln" d="M38 -32 H26"/>
  <path class="ln2" d="M38 -32 q-6 2 -8 6"/>
  <path class="ln" d="M27 -31 v14 h12 v-14 Z"/>
  ${sh('M27 -31 h12 v14 H27Z', { x: 25, y: -33, w: 16, h: 18, step: 2.4, dir: -1 })}
  <path class="ln2" d="M-46 2 q1 -7 6 -9 q5 -2 7 3 M-44 2 v-7"/>
  <path class="ln2" d="M-40 -3 a6 7 0 0 1 11 2 l-1 3 h-10 Z"/>`;
};

/* --- Rapunzel: le lanterne ----------------------------------------------- */
G.lanterns = () => {
  const one = (x, y, s, t) => `
    <g transform="translate(${x} ${y}) scale(${s}) rotate(${t})">
      <path class="ln" d="M-7 -8 q7 -4 14 0 l2 11 q-9 5 -18 0 Z"/>
      <path class="ln2" d="M-5 -7.4 l1.6 12.4 M0 -9 V5.6 M5 -7.4 l-1.6 12.4"/>
      <path class="ln2" d="M-6.4 -2 q6.4 -3 12.8 0"/>
      <path class="ln2" d="M-5 3.6 q5 3 10 0 l-1 3 q-4 2 -8 0 Z"/>
      <path class="ln2" d="M0 7 q2 3 0 5 q-2 -2 0 -5"/>
    </g>`;
  return `
  ${one(0, -70, 1.05, -6)}
  ${one(-26, -44, 0.82, 7)}
  ${one(22, -32, 0.72, -10)}
  ${one(-12, -16, 0.6, 4)}
  ${one(34, -62, 0.6, 9)}
  <g class="hx">
    <path d="M0 -56 v6 M-26 -33 v5 M22 -23 v4 M-12 -9 v4"/>
    <path d="M-40 -58 q4 -6 9 -7 M38 -46 q5 -5 10 -5 M-34 -20 q5 -5 9 -5"/>
  </g>`;
};

/* --- La Bella Addormentata: il castello ---------------------------------- */
G.castle = () => {
  const keep = 'M-13 0 V-54 H13 V0 Z';
  const wall = 'M-52 2 V-26 H-14 V2 Z';
  const wallR = 'M14 2 V-22 H50 V2 Z';
  return `
  <path class="ln2" d="M-70 3 q20 -8 38 -7 q24 1 40 6 q14 -4 28 -1"/>
  ${sh('M-70 3 q20 -8 38 -7 q24 1 40 6 q14 -4 28 -1 l0 3 H-70Z', { x: -74, y: -6, w: 150, h: 12, step: 3.6, dir: -1 })}
  <path class="fl" d="${wall}"/><path class="fl" d="${wallR}"/><path class="fl" d="${keep}"/>
  <path class="ln" d="M-52 2 V-26 H-14"/>
  <path class="ln" d="M14 -22 H50 V2"/>
  ${courses(wall, -24, 0, 4.4, -53, -13)}
  ${courses(wallR, -20, 0, 4.4, 13, 51)}
  <path class="ln2" d="M-52 -26 h38 M14 -22 h36"/>
  <path class="ln2" d="M-50 -26 v-5 h6 v5 M-38 -26 v-5 h6 v5 M-26 -26 v-5 h6 v5"/>
  <path class="ln2" d="M20 -22 v-5 h6 v5 M32 -22 v-5 h6 v5 M44 -22 v-5 h6 v5"/>
  <path class="ln" d="${keep}"/>
  ${courses(keep, -52, 0, 4.4, -14, 14)}
  <path class="ln" d="M-13 -54 H13"/>
  <path class="ln" d="M-17 -54 L0 -80 L17 -54"/>
  ${sh('M2 -54 L0 -80 L17 -54Z', { x: 0, y: -82, w: 20, h: 30, step: 2.3, dir: 1 })}
  <path class="ln2" d="M-13 -60 q13 -5 26 0 M-8 -68 q8 -4 16 0"/>
  <path class="ln" d="M0 -80 v-9"/><path class="ln2" d="M0 -89 l11 4 -11 4"/>
  <path class="ln" d="M-31 2 V-40 h18 V2"/>
  <path class="ln" d="M-34 -40 L-22 -58 L-10 -40"/>
  <path class="ln" d="M-22 -58 v-7"/><path class="ln2" d="M-22 -65 l8 3 -8 3"/>
  <path class="ln" d="M28 2 V-36 h16 V2"/>
  <path class="ln" d="M25 -36 L36 -52 L47 -36"/>
  ${sh('M36 -52 L47 -36 H36Z', { x: 34, y: -54, w: 16, h: 22, step: 2.3, dir: 1 })}
  <path class="ln2" d="M-5 2 V-13 a5 6.5 0 0 1 10 0 V2"/>
  <path class="ln2" d="M-5 -8 h10 M0 -14 V2"/>
  <path class="ln2" d="M-25 -30 h6 v8 h-6 Z M-25 -20 h6 v8 h-6 Z"/>
  <path class="ln2" d="M33 -28 h6 v7 h-6 Z"/>
  <path class="ln2" d="M-4 -44 h8 v9 h-8 Z M0 -44 v9"/>
  <path class="ln2" d="M-60 2 q2 -10 8 -13 M-64 2 q0 -7 3 -10"/>`;
};

/* --- La Bella Addormentata: la foresta ----------------------------------- */
G.forest = () => {
  const fir = (x, y, s) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <path class="ln" d="M0 0 V-8"/>
      <path class="ln" d="M0 -40 l-9 14 h4 l-8 11 h5 l-9 13 h34 l-9 -13 h5 l-8 -11 h4 Z"/>
      ${sh('M0 -40 l9 14 h-4 l8 11 h-5 l9 13 H0Z', { x: -2, y: -42, w: 20, h: 44, step: 2.4, dir: 1 })}
    </g>`;
  const oak = (x, y, s) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <path class="ln" d="M0 0 V-16 M0 -10 l-7 -6 M0 -13 l8 -7"/>
      <path class="ln" d="${canopy(0, -26, 17, 12, 11, 31)}Z"/>
      ${sh(canopy(0, -26, 17, 12, 11, 31) + 'Z', { x: 0, y: -40, w: 20, h: 30, step: 2.6, dir: 1 })}
    </g>`;
  return `
  <path class="ln2" d="M-62 3 q24 -5 44 -4 q26 1 46 3"/>
  ${fir(-44, 2, 0.72)}${oak(-24, 2, 0.8)}${fir(-6, 3, 1)}${oak(16, 2, 1)}${fir(40, 2, 0.84)}${fir(56, 2, 0.6)}
  <g class="hx"><path d="M-56 3 h8 M-34 4 h7 M4 4 h8 M30 3 h7 M48 4 h7"/></g>`;
};

/* --- Alice: il grande albero --------------------------------------------- */
G.greatTree = () => {
  const crown = canopy(0, -56, 40, 27, 15, 77) + 'Z';
  return `
  <path class="ln2" d="M-56 3 q22 -6 40 -5 q24 1 40 4"/>
  <path class="ln" d="M-16 2 q3 -16 -2 -26 q6 6 10 2 q-2 -8 2 -14 q3 8 8 8 q-2 -10 4 -16"/>
  <path class="ln" d="M16 2 q-4 -18 1 -28"/>
  <path class="ln" d="M-16 2 q-8 -2 -14 3 M16 2 q9 -2 15 3"/>
  ${sh('M-16 2 q3 -16 -2 -26 q10 -8 22 -2 q5 10 10 28Z', { x: -4, y: -34, w: 24, h: 40, step: 2.5, dir: 0 })}
  <path class="ln" d="M-10 -30 q-14 -4 -22 -14 M8 -32 q16 -6 24 -16"/>
  <path class="ln" d="${crown}"/>
  ${sh(crown, { x: 6, y: -84, w: 44, h: 56, step: 3, dir: 1 })}
  <path class="ln2" d="M-26 -46 q10 -9 22 -4 M4 -62 q12 -7 22 -1 M-14 -70 q10 -6 18 -2"/>
  <path class="ln2" d="M-6 2 V-14 a6 8 0 0 1 12 0 V2 M0 -22 V2"/>
  <path class="ln2" d="M-3 -16 a3 3 0 1 0 0.1 0"/>
  <path class="ln2" d="M-34 2 q1 -6 5 -7 q4 -1 4 4 M-30 2 v-4"/>
  <path class="ln2" d="M30 2 q1 -5 4 -6 q4 -1 4 4"/>`;
};

/* --- Alice: il tè ------------------------------------------------------- */
G.teaparty = () => `
  <path class="ln2" d="M-58 3 q24 -5 44 -4 q24 1 42 3"/>
  <path class="ln" d="M-40 -14 h74 l-8 7 h-74 Z"/>
  ${sh('M-40 -14 h74 l-8 7 h-74Z', { x: -50, y: -16, w: 92, h: 10, step: 2.2, dir: 1 })}
  <path class="ln2" d="M-46 -7 q40 5 80 0"/>
  <path class="ln2" d="M-44 -7 l-2 10 M-24 -5 l-2 11 M2 -4 l-1 11 M26 -5 l1 11"/>
  <path class="ln" d="M-44 -7 L-40 3 M26 -7 l2 10"/>
  <path class="ln" d="M-26 -16 q-3 -11 3 -13 h12 q6 2 3 13"/>
  <path class="ln2" d="M-23 -27 h12 M-17 -29 v2"/>
  <path class="ln" d="M-11 -24 q9 1 8 7"/>
  <path class="ln" d="M-28 -22 q-7 2 -6 7"/>
  ${sh('M-26 -16 q-3 -11 3 -13 h12 q6 2 3 13Z', { x: -14, y: -30, w: 14, h: 16, step: 2.2, dir: 1 })}
  <path class="ln" d="M6 -16 q-2 -9 2 -10 h9 q4 1 2 10"/>
  <path class="ln2" d="M17 -24 q6 1 5 5 q-1 3 -5 3"/>
  <path class="ln" d="M24 -16 q-2 -8 2 -9 h8 q4 1 2 9"/>
  <path class="ln2" d="M22 -17 q8 2 18 0"/>
  <path class="ln" d="M-38 -16 q-2 -6 2 -7 h7 q4 1 2 7"/>
  <path class="ln2" d="M-39 -17 q7 2 14 0"/>
  <path class="ln" d="M44 3 V-18 M38 -18 h12 M44 -18 q-8 -4 -6 -12"/>
  <path class="ln2" d="M40 -32 q5 -4 9 0 q-4 4 -9 0"/>
  <path class="ln" d="M-52 3 V-20 M-58 -20 h12 M-52 -20 q-6 -6 -3 -14"/>
  <g class="hx"><path d="M-34 -34 q3 -6 1 -10 M-20 -37 q3 -5 1 -9"/></g>`;

/* --- La Bella e la Bestia: il castello ----------------------------------- */
G.gothic = () => {
  const crag = 'M-50 3 q10 -14 22 -16 q16 -3 28 4 q12 6 22 12 Z';
  const nave = 'M-20 -22 H18 V-58 H-20 Z';
  return `
  <path class="ln" d="${crag}"/>
  ${sh(crag, { x: -52, y: -16, w: 104, h: 22, step: 2.6, dir: 0 })}
  <path class="ln2" d="M-38 -6 q8 -5 16 -4 M-6 -10 q10 -2 18 3"/>
  <path class="fl" d="${nave}"/>
  <path class="ln" d="M-20 -14 V-58 H18 V-12"/>
  ${courses(nave, -56, -14, 4.6, -21, 19)}
  <path class="ln" d="M-24 -58 L-1 -74 L22 -58"/>
  ${sh('M-1 -74 L22 -58 H-1Z', { x: -2, y: -76, w: 26, h: 22, step: 2.2, dir: 1 })}
  <path class="ln" d="M-32 -12 V-66 h13 V-12"/>
  <path class="ln" d="M-34 -66 L-25.5 -96 L-17 -66"/>
  <path class="ln2" d="M-25.5 -96 v-8"/>
  <path class="ln" d="M20 -14 V-62 h13 V-14"/>
  <path class="ln" d="M18 -62 L26.5 -90 L35 -62"/>
  ${sh('M26.5 -90 L35 -62 H26.5Z', { x: 25, y: -92, w: 12, h: 32, step: 2.1, dir: 1 })}
  <path class="ln2" d="M26.5 -90 v-7"/>
  <path class="ln" d="M4 -22 V-48 h12 V-22"/>
  <path class="ln" d="M2 -48 L10 -70 L18 -48"/>
  <path class="ln2" d="M10 -70 v-6"/>
  <path class="ln2" d="M-10 -12 V-28 a5 7 0 0 1 10 0 V-12"/>
  <path class="ln2" d="M-5 -36 a5 5 0 1 0 0.1 0 M-5 -41 v10 M-10 -36 h10"/>
  <path class="ln2" d="M-28 -34 v-8 a3 4 0 0 1 6 0 v8 Z M-28 -50 v-7 a3 4 0 0 1 6 0 v7 Z"/>
  <path class="ln2" d="M24 -32 v-8 a3 4 0 0 1 6 0 v8 Z M24 -48 v-6 a3 4 0 0 1 6 0 v6 Z"/>
  <path class="ln2" d="M-19 -24 q-7 2 -9 8 M18 -26 q7 3 8 9"/>
  <g class="hx"><path d="M-44 0 q4 -5 9 -6 M30 2 q4 -6 9 -7"/></g>`;
};

/* --- La Bella e la Bestia: il villaggio ---------------------------------- */
G.village = () => {
  const house = (x, y, w, h, s, flip) => `
    <g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
      <path class="fl" d="M0 0 V-${h} H${w} V0 Z"/>
      <path class="ln" d="M0 0 V-${h} H${w} V0 Z"/>
      <path class="ln" d="M-3 -${h} L${w / 2} -${h + 11} L${w + 3} -${h} Z"/>
      ${sh(`M${w / 2} -${h + 11} L${w + 3} -${h} H${w / 2}Z`, { x: w / 2, y: -h - 13, w: w / 2 + 6, h: 14, step: 2, dir: 1 })}
      <path class="ln2" d="M${w * 0.18} 0 v-${h * 0.55} h${w * 0.26} V0"/>
      <path class="ln2" d="M${w * 0.6} -${h * 0.78} h${w * 0.26} v${h * 0.3} h-${w * 0.26} Z"/>
      ${sh(`M${w * 0.7} 0 V-${h} H${w} V0Z`, { x: w * 0.68, y: -h - 2, w: w * 0.4, h: h + 4, step: 2.4, dir: 0 })}
    </g>`;
  return `
  <path class="ln2" d="M-66 3 q26 -6 48 -5 q28 1 48 4"/>
  ${house(-62, 2, 20, 17, 1, false)}
  ${house(-34, 1, 26, 22, 1, false)}
  ${house(6, 2, 22, 18, 1, true)}
  ${house(16, 3, 18, 14, 0.9, false)}
  <path class="ln" d="M40 3 V-26 h13 V3"/>
  <path class="ln" d="M38 -26 L46.5 -50 L55 -26"/>
  ${sh('M46.5 -50 L55 -26 H46.5Z', { x: 45, y: -52, w: 12, h: 28, step: 2.1, dir: 1 })}
  <path class="ln2" d="M46.5 -50 v-6 M43.5 -56 h6"/>
  <path class="ln2" d="M43 -14 v-7 a3.5 4 0 0 1 7 0 v7 Z"/>
  <path class="ln" d="M-30 -24 v-9 h5 v9"/>
  <path class="ln2" d="M-31 -33 h7"/>
  <path class="ln2" d="M-27 -35 q-5 -5 0 -9 q5 -4 1 -8"/>
  <path class="ln2" d="M-48 3 q10 -7 22 -6 q14 1 24 6"/>
  <g class="hx"><path d="M-44 4 h7 M-18 5 h8 M8 4 h7"/></g>
  <path class="ln2" d="M-74 3 q2 -9 7 -11 M-70 3 v-7"/>`;
};

/* --- Lilli e il Vagabondo: la trattoria ---------------------------------- */
G.bistro = () => {
  const front = 'M-34 2 V-40 H26 V2 Z';
  return `
  <path class="ln2" d="M-56 3 q24 -5 44 -4 q24 1 42 3"/>
  <path class="fl" d="${front}"/>
  <path class="ln" d="M-34 2 V-40 H26 V2"/>
  <path class="ln" d="M26 2 V-34 l14 -5 V-2"/>
  ${sh('M26 2 V-34 l14 -5 V-2Z', { x: 24, y: -40, w: 18, h: 46, step: 2.6, dir: 0 })}
  <path class="ln" d="M-38 -40 H30"/>
  ${courses(front, -38, 0, 5, -35, 27)}
  <path class="ln" d="M-38 -22 h68 l-6 11 h-62 Z"/>
  ${sh('M-38 -22 h68 l-6 11 h-62Z', { x: -42, y: -24, w: 78, h: 15, step: 2.1, dir: -1 })}
  <path class="ln2" d="M-38 -11 q6 5 12 0 q6 5 12 0 q6 5 12 0 q6 5 12 0 q6 5 12 0"/>
  <path class="ln2" d="M-27 -22 v-11 M-13 -22 v-11 M1 -22 v-11 M15 -22 v-11"/>
  <path class="ln" d="M-26 2 V-10 h13 V2 M-26 -10 q6.5 -7 13 0"/>
  <path class="ln2" d="M-19.5 2 V-13"/>
  <path class="ln2" d="M-4 -10 h16 v8 h-16 Z M4 -10 v8 M-4 -6 h16"/>
  <path class="ln" d="M-50 2 v-9 M-57 -7 h14 M-50 -7 q-5 -4 -3 -9 M-57 -16 q7 -4 14 0"/>
  <path class="ln" d="M-62 2 V-28"/>
  <path class="ln" d="M-66 -28 q4 -7 8 0 Z"/>
  <path class="ln2" d="M-65 -24 h6"/>
  <path class="ln2" d="M-62 -30 v-3"/>
  <path class="ln" d="M-44 2 v-7 M-48 -5 h8 M-44 -5 q-4 -3 -2 -7 M-48 -12 q4 -3 8 0"/>
  <g class="hx"><path d="M-70 3 h10 M-30 4 h8 M10 4 h9 M32 3 h8"/></g>
  <path class="ln2" d="M34 2 q2 -8 7 -10"/>`;
};

/* --- Hercules: il tempio -------------------------------------------------- */
G.temple = () => {
  const col = (x, h) => `
    <path class="ln" d="M${x} -6 v-${h}"/><path class="ln" d="M${x + 7} -6 v-${h}"/>
    <path class="ln2" d="M${x + 2.4} -8 v-${h - 4} M${x + 4.8} -8 v-${h - 4}"/>
    <path class="ln2" d="M${x - 1.4} -${h} h9.8 M${x - 1.4} -6 h9.8"/>`;
  return `
  <path class="ln2" d="M-62 3 q26 -5 46 -4 q24 1 42 3"/>
  <path class="ln" d="M-48 2 h86 l-4 -5 H-44 Z"/>
  <path class="ln" d="M-44 -3 h78 l-3 -4 H-41 Z"/>
  ${sh('M-48 2 h86 l-4 -5 H-44Z', { x: -50, y: -8, w: 92, h: 12, step: 2.2, dir: -1 })}
  ${col(-40, 32)}${col(-26, 32)}${col(-12, 32)}${col(2, 32)}${col(16, 32)}${col(30, 32)}
  <path class="ln" d="M-45 -38 h84 v6 H-45 Z"/>
  <path class="ln2" d="M-45 -34 h84"/>
  <path class="ln" d="M-48 -44 h90 l-45 -16 Z"/>
  ${sh('M-3 -60 L42 -44 H-3Z', { x: -2, y: -62, w: 48, h: 20, step: 2.2, dir: 1 })}
  <path class="ln2" d="M-39 -45 h72 l-36 -11 Z"/>
  <path class="ln2" d="M-28 -46 q6 -5 11 -1 M-4 -50 q7 -4 12 0 M14 -47 q6 -4 11 -1"/>
  <path class="ln" d="M-48 -44 h90 v-3 H-48 Z"/>
  <path class="ln2" d="M-42 -38 v-6 M-28 -38 v-6 M-14 -38 v-6 M0 -38 v-6 M14 -38 v-6 M28 -38 v-6"/>
  <path class="ln" d="M52 2 v-24"/>
  <path class="ln2" d="M49 -22 h6 M52 -24 q-5 -6 -1 -11"/>
  <path class="ln" d="M-60 2 V-14 M-64 -14 h9"/>
  <path class="ln" d="${canopy(-60, -24, 13, 9, 9, 17)}Z"/>
  ${sh(canopy(-60, -24, 13, 9, 9, 17) + 'Z', { x: -60, y: -34, w: 16, h: 22, step: 2.6, dir: 1 })}
  <g class="hx"><path d="M46 3 h8 M-70 3 h8"/></g>`;
};

/* --- Mulan: il padiglione cinese ----------------------------------------- */
G.pagoda = () => {
  const eave = (y, w, t) => `
    <path class="ln" d="M-${w} ${y} q${w * 0.55} -${t} ${w} -${t * 0.6} q${w * 0.45} ${t * 0.6 - t} ${w} ${t}"
          transform="translate(0 0)"/>`;
  const tier = (y, w, h) => `
    <path class="ln" d="M-${w} ${y} q${w * 0.5} -9 ${w} -7 q${w * 0.5} -2 ${w} 7 Z"/>
    ${sh(`M0 ${y - 7} q${w * 0.5} -2 ${w} 7 H0Z`, { x: 0, y: y - 12, w: w + 4, h: 16, step: 2.1, dir: 1 })}
    <path class="ln2" d="M-${w * 0.72} ${y - 1.5} q${w * 0.72} -7 ${w * 1.44} 0 M-${w * 0.45} ${y - 3.5} q${w * 0.45} -5 ${w * 0.9} 0"/>
    <path class="ln" d="M-${w} ${y} q-5 -1 -7 -5 M${w} ${y} q5 -1 7 -5"/>
    <path class="ln2" d="M-${w * 0.68} ${y} v${h} M${w * 0.68} ${y} v${h}"/>`;
  return `
  <path class="ln2" d="M-60 3 q24 -5 44 -4 q24 1 42 3"/>
  <path class="ln" d="M-34 2 h68 l-4 -6 H-30 Z"/>
  ${sh('M-34 2 h68 l-4 -6 H-30Z', { x: -36, y: -8, w: 74, h: 12, step: 2.2, dir: -1 })}
  <path class="ln" d="M-26 -4 v-14 M26 -4 v-14 M-12 -4 v-14 M12 -4 v-14"/>
  <path class="ln2" d="M-26 -11 h52"/>
  ${tier(-18, 32, 14)}
  <path class="ln" d="M-20 -32 v-12 M20 -32 v-12 M-8 -32 v-12 M8 -32 v-12"/>
  <path class="ln2" d="M-20 -38 h40"/>
  ${tier(-44, 24, 12)}
  <path class="ln" d="M-13 -56 v-10 M13 -56 v-10"/>
  ${tier(-66, 16, 10)}
  <path class="ln" d="M0 -74 v-9"/>
  <path class="ln2" d="M0 -83 a3 3 0 1 0 0.1 0"/>
  <path class="ln2" d="M-6 -22 h12 v9 h-12 Z M0 -22 v9 M-6 -17.5 h12"/>
  <path class="ln" d="M44 2 V-18"/>
  <path class="ln" d="M44 -18 q-14 -2 -16 -12 q10 2 16 8 q6 -8 16 -10 q-4 12 -16 14"/>
  ${sh('M44 -18 q6 -10 16 -12 q-4 12 -16 14Z', { x: 44, y: -34, w: 20, h: 20, step: 2.4, dir: 1 })}
  <path class="ln" d="M-46 2 v-10 h-8 v10"/>
  <path class="ln" d="M-58 -8 h20 l-4 -4 h-12 Z"/>
  <path class="ln2" d="M-50 -12 v-8 M-50 -20 q-4 -4 0 -7 q4 3 0 7"/>
  <g class="hx"><path d="M36 3 h9 M-66 3 h9"/></g>`;
};

/* --- Encanto: la casita --------------------------------------------------- */
G.casita = () => {
  const front = 'M-32 2 V-34 H22 V2 Z';
  return `
  <path class="ln2" d="M-58 3 q24 -5 44 -4 q24 1 42 3"/>
  <path class="fl" d="${front}"/>
  <path class="ln" d="M-32 2 V-34 H22 V2"/>
  <path class="ln" d="M22 2 V-30 l16 -6 V-2"/>
  ${sh('M22 2 V-30 l16 -6 V-2Z', { x: 20, y: -38, w: 20, h: 44, step: 2.6, dir: 0 })}
  <path class="ln" d="M-37 -34 H27 l10 -5 H-27 Z"/>
  <path class="ln2" d="M-35 -36 h60 M-33 -38 h56"/>
  ${sh('M-37 -34 H27 l10 -5 H-27Z', { x: -40, y: -41, w: 80, h: 10, step: 2, dir: -1 })}
  <path class="ln" d="M-37 -34 q-3 3 -2 5 M27 -34 q-2 3 -1 5"/>
  <path class="ln" d="M-10 2 V-16 a10 11 0 0 1 20 0 V2"/>
  <path class="ln2" d="M0 -27 V2 M-10 -16 h20"/>
  <path class="ln2" d="M-5 -20 q5 -5 10 0"/>
  <path class="ln" d="M-26 -14 h13 v12 h-13 Z"/>
  <path class="ln2" d="M-26 -8 h13 M-19.5 -14 v12"/>
  <path class="ln" d="M-26 -26 h13 v8 h-13 Z"/>
  <path class="ln2" d="M-19.5 -26 v8"/>
  <path class="ln" d="M-32 -20 h-8 v18 h8"/>
  <path class="ln2" d="M-40 -11 h8"/>
  <path class="ln" d="M46 2 V-22 q-8 -4 -10 -12 q10 2 12 10 q4 -10 14 -12 q-2 14 -14 16"/>
  ${sh('M46 -2 V-22 q4 -10 14 -12 q-2 14 -14 16Z', { x: 46, y: -36, w: 18, h: 26, step: 2.4, dir: 1 })}
  <g class="ln2">
    <path d="M32 -46 q-6 -6 -1 -9 q4 -2 5 4 q1 -6 5 -4 q5 3 -1 9 q-6 5 -8 0 Z"/>
    <path d="M18 -56 q-4 -4 -0.6 -6 q2.6 -1.4 3.4 2.6 q0.6 -4 3.4 -2.6 q3.4 2 -0.6 6 q-4 3.4 -5.6 0 Z"/>
  </g>
  <g class="hx"><path d="M-44 3 h9 M26 4 h8"/></g>`;
};

/* --- Luca: Portorosso ----------------------------------------------------- */
G.harbour = () => {
  const h1 = 'M-44 -14 V-44 h18 v30 Z', h2 = 'M-26 -14 V-56 h20 v42 Z', h3 = 'M-6 -14 V-38 h18 v24 Z';
  return `
  <path class="ln" d="M-56 -14 H34"/>
  <path class="fl" d="${h1}"/><path class="fl" d="${h2}"/><path class="fl" d="${h3}"/>
  <path class="ln" d="${h1}"/><path class="ln" d="${h2}"/><path class="ln" d="${h3}"/>
  ${sh(h1, { x: -46, y: -46, w: 22, h: 34, step: 2.8, dir: 0 })}
  ${sh('M-6 -14 V-38 h18 v24Z', { x: 2, y: -40, w: 12, h: 28, step: 2.8, dir: 0 })}
  <path class="ln" d="M-48 -44 h26 l-4 -4 h-18 Z"/>
  <path class="ln" d="M-30 -56 h28 l-4 -5 h-20 Z"/>
  <path class="ln" d="M-10 -38 h26 l-4 -4 h-18 Z"/>
  <path class="ln2" d="M-40 -38 h5 v7 h-5 Z M-33 -38 h5 v7 h-5 Z M-40 -27 h5 v7 h-5 Z M-33 -27 h5 v7 h-5 Z"/>
  <path class="ln2" d="M-22 -50 h6 v8 h-6 Z M-14 -50 h6 v8 h-6 Z M-22 -37 h6 v8 h-6 Z M-14 -37 h6 v8 h-6 Z M-18 -24 h7 v10 h-7 Z"/>
  <path class="ln2" d="M-2 -32 h6 v7 h-6 Z M6 -32 h6 v7 h-6 Z"/>
  <path class="ln2" d="M-26 -48 q-6 1 -8 5 M-6 -32 q-6 1 -7 4"/>
  <path class="ln" d="M16 -14 V-50 h12 V-14"/>
  <path class="ln" d="M14 -50 L22 -62 L30 -50"/>
  ${sh('M22 -62 L30 -50 H22Z', { x: 21, y: -64, w: 12, h: 16, step: 2.1, dir: 1 })}
  <path class="ln2" d="M19 -44 h6 v9 h-6 Z M22 -44 v9"/>
  <path class="ln2" d="M22 -62 v-5"/>
  <path class="ln" d="M-56 -14 q10 5 20 0 q10 5 20 0 q10 5 20 0 q10 5 20 0 q10 5 20 0"/>
  <path class="ln" d="M24 -2 l6 -9 h30 l-8 9 Z"/>
  ${sh('M24 -2 l6 -9 h30 l-8 9Z', { x: 22, y: -12, w: 40, h: 12, step: 2.2, dir: 1 })}
  <path class="ln" d="M40 -11 v-26"/>
  <path class="ln" d="M41 -36 q16 9 13 24 l-13 0 Z"/>
  ${sh('M41 -36 q16 9 13 24 l-13 0Z', { x: 41, y: -38, w: 18, h: 28, step: 2.4, dir: -1 })}
  <path class="ln2" d="M39 -32 q-11 6 -9 20 l9 0 Z"/>
  <g class="hx">
    <path d="M-60 2 q9 -4 18 0 q9 -4 18 0 q9 -4 18 0 q9 -4 18 0"/>
    <path d="M-52 8 q9 -4 18 0 q9 -4 18 0 q9 -4 18 0"/>
  </g>`;
};

/* --- Le Follie dell'Imperatore: il palazzo -------------------------------- */
G.pyramid = () => `
  <path class="ln2" d="M-64 3 q26 -5 48 -4 q24 1 42 3"/>
  <path class="ln" d="M-50 2 h94 l-8 -11 H-44 Z"/>
  ${sh('M-50 2 h94 l-8 -11 H-44Z', { x: -52, y: -12, w: 100, h: 16, step: 2.4, dir: -1 })}
  <path class="ln" d="M-42 -9 h78 l-7 -11 H-36 Z"/>
  ${sh('M-42 -9 h78 l-7 -11 H-36Z', { x: -44, y: -22, w: 84, h: 15, step: 2.4, dir: -1 })}
  <path class="ln" d="M-34 -20 h62 l-6 -11 H-29 Z"/>
  ${sh('M-34 -20 h62 l-6 -11 H-29Z', { x: -36, y: -33, w: 68, h: 15, step: 2.4, dir: -1 })}
  <path class="ln" d="M-27 -31 h48 l-5 -10 H-23 Z"/>
  <path class="ln" d="M-9 2 V-41 h17 V2"/>
  <path class="ln2" d="M-9 -4 h17 M-9 -11 h17 M-9 -18 h17 M-9 -25 h17 M-9 -32 h17"/>
  <path class="ln" d="M-12 -41 h23 v-12 h-23 Z"/>
  <path class="ln" d="M-15 -53 h29 l-4 -5 h-21 Z"/>
  ${sh('M-12 -41 h23 v-12 h-23Z', { x: 0, y: -55, w: 14, h: 16, step: 2.2, dir: 1 })}
  <path class="ln2" d="M-5 -41 v-8 a5 5 0 0 1 10 0 v8"/>
  <path class="ln2" d="M0 -58 v-5 M-3 -63 h6"/>
  <path class="ln2" d="M-30 -14 h7 v6 h-7 Z M23 -14 h7 v6 h-7 Z"/>
  <path class="ln" d="M-58 2 V-16 M-62 -16 h8 M-58 -10 l-7 -6 M-58 -13 l8 -7"/>
  <path class="ln" d="M-58 -16 q-11 -3 -13 -12 q10 1 13 8 q3 -9 13 -11 q-2 13 -13 15"/>
  <path class="ln" d="M54 2 V-14"/>
  <path class="ln" d="M54 -14 q-10 -2 -12 -10 q9 1 12 7 q3 -8 12 -9 q-2 11 -12 12"/>
  ${sh('M54 -14 q3 -8 12 -9 q-2 11 -12 12Z', { x: 54, y: -24, w: 16, h: 22, step: 2.4, dir: 1 })}
  <g class="hx"><path d="M-70 3 h9 M44 4 h9"/></g>`;

/* --- La Sirenetta: Atlantica ---------------------------------------------- */
G.undersea = () => `
  <path class="ln" d="M-40 2 q-2 -30 20 -36 q22 -6 32 10 q8 14 4 26"/>
  <path class="ln" d="M-24 2 q0 -16 10 -20 q12 -4 16 8 q3 8 1 12"/>
  ${sh('M-40 2 q-2 -30 20 -36 q22 -6 32 10 q8 14 4 26 h-12 q2 -12 -1 -20 q-4 -12 -16 -8 q-10 4 -10 20Z', { x: -42, y: -38, w: 60, h: 44, step: 2.8, dir: 1 })}
  <path class="ln2" d="M-34 -14 q6 -4 11 -2 M6 -18 q6 -3 10 1"/>
  <path class="ln" d="M-50 2 v-14 q-7 -3 -6 -10 q5 2 7 6 q1 -8 7 -10 q0 12 -8 14"/>
  <path class="ln" d="M-56 2 q-2 -8 2 -12"/>
  <path class="ln" d="M28 2 v-20 M28 -10 q-9 -2 -10 -9 q8 1 10 6 M28 -8 q9 -3 10 -10 q-8 0 -10 6"/>
  <path class="ln2" d="M36 2 v-11 q6 -2 6 -7 q-6 1 -6 6"/>
  <path class="ln" d="M44 2 V-24 l-3 -4 h6 Z"/>
  <path class="ln2" d="M44 -8 h-5 M44 -16 h5"/>
  <path class="ln2" d="M41 2 q3 -5 6 0"/>
  <g class="ln2">
    <circle cx="-14" cy="-50" r="3.4"/><circle cx="-2" cy="-60" r="2.3"/>
    <circle cx="-22" cy="-62" r="1.7"/><circle cx="10" cy="-52" r="1.9"/>
    <circle cx="2" cy="-72" r="1.3"/>
  </g>
  <g class="hx">
    <path d="M-58 -34 q10 -5 20 0 q10 -5 20 0 q10 -5 20 0 q10 -5 20 0"/>
    <path d="M-50 -28 q10 -5 20 0 q10 -5 20 0 q10 -5 20 0"/>
  </g>
  <path class="ln2" d="M-46 8 q11 -5 22 0 q11 -5 22 0 q11 -5 22 0"/>`;

/* --- La Principessa e il Ranocchio: il Vieux Carré ------------------------ */
G.balcony = () => {
  const front = 'M-30 2 V-54 H24 V2 Z';
  return `
  <path class="ln2" d="M-54 3 q22 -5 42 -4 q22 1 38 3"/>
  <path class="fl" d="${front}"/>
  <path class="ln" d="M-30 2 V-54 H24 V2"/>
  <path class="ln" d="M24 2 V-50 l14 -5 V-2"/>
  ${sh('M24 2 V-50 l14 -5 V-2Z', { x: 22, y: -56, w: 18, h: 60, step: 2.6, dir: 0 })}
  <path class="ln" d="M-34 -54 H28 l10 -5 H-24"/>
  <path class="ln2" d="M-33 -56 h58"/>
  <path class="ln" d="M-36 -36 h66 M-36 -18 h66"/>
  <path class="ln" d="M-36 -36 q-2 3 -1 4 h66 q2 -2 1 -4"/>
  <path class="ln" d="M-36 -18 q-2 3 -1 4 h66 q2 -2 1 -4"/>
  <g class="ln2">
    <path d="M-33 -36 v-9 M-25 -36 v-9 M-17 -36 v-9 M-9 -36 v-9 M-1 -36 v-9 M7 -36 v-9 M15 -36 v-9 M23 -36 v-9"/>
    <path d="M-33 -45 h58"/>
    <path d="M-29 -45 q4 -5 8 0 M-13 -45 q4 -5 8 0 M3 -45 q4 -5 8 0 M19 -45 q4 -5 8 0"/>
    <path d="M-33 -18 v-9 M-25 -18 v-9 M-17 -18 v-9 M-9 -18 v-9 M-1 -18 v-9 M7 -18 v-9 M15 -18 v-9 M23 -18 v-9"/>
    <path d="M-33 -27 h58"/>
    <path d="M-29 -27 q4 -5 8 0 M-13 -27 q4 -5 8 0 M3 -27 q4 -5 8 0 M19 -27 q4 -5 8 0"/>
  </g>
  <path class="ln" d="M-22 -36 v-14 a5 7 0 0 1 10 0 v14"/>
  <path class="ln" d="M0 -36 v-14 a5 7 0 0 1 10 0 v14"/>
  <path class="ln" d="M-22 -18 v-13 a5 6 0 0 1 10 0 v13"/>
  <path class="ln" d="M0 -18 v-13 a5 6 0 0 1 10 0 v13"/>
  <path class="ln" d="M-12 2 V-11 a6 7 0 0 1 12 0 V2"/>
  <path class="ln2" d="M-6 -18 V2 M-12 -11 h12"/>
  <path class="ln" d="M-44 2 V-30"/>
  <path class="ln" d="M-49 -30 q5 -9 10 0 Z"/>
  <path class="ln2" d="M-48 -25 h8 M-44 -33 v-4 M-47 -37 h6"/>
  <path class="ln2" d="M-44 -4 q-4 2 -5 6 M-44 -4 q4 2 5 6"/>
  <g class="hx"><path d="M-58 3 h9 M30 4 h8"/></g>`;
};

/* --- Biancaneve: la casetta ----------------------------------------------- */
G.cottage = () => {
  const roof = 'M-44 -20 L-22 -46 H10 L30 -20 Z';
  return `
  <path class="ln2" d="M-58 3 q24 -5 44 -4 q24 1 42 3"/>
  <path class="fl" d="M-34 2 V-20 H22 V2 Z"/>
  <path class="ln" d="M-34 2 V-20 H22 V2"/>
  <path class="ln" d="${roof}"/>
  ${sh(roof, { x: -46, y: -48, w: 78, h: 30, step: 2.2, dir: -1 })}
  <path class="ln2" d="M-38 -26 h52 M-33 -32 h42 M-28 -38 h32"/>
  <path class="ln2" d="M-44 -20 q-3 3 -2 5 M30 -20 q3 3 2 5"/>
  <path class="ln" d="M-2 -46 v-12 q0 -2 3 -2 h6 q3 0 3 2 v12"/>
  <path class="ln2" d="M-4 -58 h16"/>
  <path class="ln2" d="M4 -62 q-6 -5 -1 -10 q5 -5 0 -10"/>
  <path class="ln" d="M-16 2 V-13 a7 8 0 0 1 14 0 V2"/>
  <path class="ln2" d="M-9 -21 V2"/>
  <path class="ln2" d="M-6 -10 a1.6 1.6 0 1 0 0.1 0"/>
  <path class="ln" d="M4 -14 h14 v10 H4 Z"/>
  <path class="ln2" d="M11 -14 v10 M4 -9 h14 M7.5 -14 l7 10 M14.5 -14 l-7 10"/>
  <path class="ln" d="M-28 -14 h8 v9 h-8 Z"/>
  <path class="ln2" d="M-24 -14 v9 M-28 -9.5 h8"/>
  <path class="ln" d="M38 2 V-8 h18 V2 Z"/>
  <path class="ln" d="M38 -8 h18"/>
  ${sh('M38 2 V-8 h18 V2Z', { x: 36, y: -10, w: 22, h: 14, step: 2.4, dir: 0 })}
  <path class="ln" d="M40 -8 v-10 M54 -8 v-10"/>
  <path class="ln" d="M35 -18 L47 -27 L59 -18 Z"/>
  ${sh('M47 -27 L59 -18 H47Z', { x: 46, y: -29, w: 14, h: 13, step: 2.1, dir: 1 })}
  <path class="ln2" d="M47 -18 v6 M44 -12 h6 v4 h-6 Z"/>
  <path class="ln2" d="M-48 2 q2 -9 8 -11 M-44 2 v-8"/>
  <g class="hx"><path d="M-54 3 h9 M26 4 h8 M62 3 h7"/></g>`;
};

/* --- Biancaneve: il frutteto ---------------------------------------------- */
G.orchard = () => {
  const crown = canopy(0, -44, 30, 21, 13, 53) + 'Z';
  return `
  <path class="ln2" d="M-52 3 q22 -5 40 -4 q22 1 38 3"/>
  <path class="ln" d="M-5 2 q2 -14 -1 -22 q-5 -6 -12 -8 M4 2 q-1 -16 2 -24 q6 -5 14 -6"/>
  <path class="ln" d="M-5 2 q-7 -1 -12 3 M4 2 q8 -1 13 3"/>
  ${sh('M-5 2 q2 -14 -1 -22 q6 -8 14 -2 q1 10 -4 24Z', { x: -2, y: -26, w: 16, h: 30, step: 2.4, dir: 0 })}
  <path class="ln" d="${crown}"/>
  ${sh(crown, { x: 4, y: -66, w: 32, h: 44, step: 2.9, dir: 1 })}
  <path class="ln2" d="M-20 -38 q10 -8 20 -3 M2 -52 q10 -6 18 -1 M-12 -56 q9 -5 16 -1"/>
  <g class="ln2">
    <circle cx="-14" cy="-36" r="2.8"/><circle cx="6" cy="-30" r="2.6"/>
    <circle cx="16" cy="-42" r="2.4"/><circle cx="-6" cy="-52" r="2.2"/>
    <circle cx="20" cy="-56" r="2"/>
  </g>
  <path class="ln" d="M24 2 L34 -34 M30 2 L40 -34"/>
  <path class="ln2" d="M26 -6 l9 0 M28 -14 l9 0 M30 -22 l8 0 M32 -30 l8 0"/>
  <path class="ln" d="M-34 2 q-4 -6 0 -9 q5 -3 10 0 q4 3 0 9 Z"/>
  <path class="ln2" d="M-34 -4 q7 -3 14 0"/>
  <path class="ln2" d="M-30 -7 a2 2 0 1 0 0.1 0 M-26 -7.5 a2 2 0 1 0 0.1 0"/>
  <path class="ln2" d="M-48 2 q1 -6 5 -7 q4 -1 4 4"/>
  <g class="hx"><path d="M-44 3 h8 M12 4 h8 M44 3 h8"/></g>`;
};

/* --- il ponte di pietra ---------------------------------------------------- */
G.bridge = () => `
  <path class="ln" d="M-46 2 q6 -22 24 -22 q18 0 24 22"/>
  <path class="ln" d="M-38 2 q5 -15 16 -15 q11 0 16 15"/>
  ${sh('M-46 2 q6 -22 24 -22 q18 0 24 22 h-8 q-5 -15 -16 -15 q-11 0 -16 15Z', { x: -48, y: -24, w: 52, h: 28, step: 2.6, dir: 1 })}
  <path class="ln" d="M4 2 q4 -14 16 -14 q12 0 16 14"/>
  <path class="ln" d="M10 2 q3 -9 10 -9 q7 0 10 9"/>
  <path class="ln" d="M-54 -22 h94 l-3 5 H-51 Z"/>
  <path class="ln2" d="M-52 -24 h88"/>
  <g class="ln2"><path d="M-48 -24 v-7 M-38 -24 v-7 M-28 -24 v-7 M-18 -24 v-7 M-8 -24 v-7 M2 -24 v-7 M12 -24 v-7 M22 -24 v-7 M32 -24 v-7"/>
  <path d="M-50 -31 h86"/></g>
  <path class="ln2" d="M-26 -17 h10 M-30 -12 h18 M8 -8 h12"/>
  <g class="hx">
    <path d="M-60 2 q10 -4 20 0 q10 -4 20 0 q10 -4 20 0 q10 -4 20 0"/>
    <path d="M-54 8 q10 -4 20 0 q10 -4 20 0 q10 -4 20 0"/>
  </g>`;

/* --- il mulino a vento ----------------------------------------------------- */
G.windmill = () => {
  const body = 'M-16 2 L-11 -40 H11 L16 2 Z';
  return `
  <path class="ln2" d="M-48 3 q20 -5 36 -4 q20 1 34 3"/>
  <path class="fl" d="${body}"/>
  <path class="ln" d="${body}"/>
  ${courses(body, -38, 0, 4.6, -17, 17)}
  ${sh('M4 2 L11 -40 H11 L16 2Z', { x: 3, y: -42, w: 16, h: 46, step: 2.6, dir: 0 })}
  <path class="ln" d="M-14 -40 H14 l-3 -8 H-11 Z"/>
  <path class="ln2" d="M-11 -48 q11 -5 22 0"/>
  <path class="ln2" d="M-6 2 V-12 h12 V2 M-6 -12 h12"/>
  <path class="ln2" d="M-8 -22 h7 v8 h-7 Z M2 -22 h7 v8 h-7 Z"/>
  <path class="ln" d="M0 -46 v-4"/>
  <g class="ln">
    <path d="M0 -50 l-3 -26 h6 Z M0 -50 l26 -3 v6 Z M0 -50 l3 26 h-6 Z M0 -50 l-26 3 v-6 Z"/>
  </g>
  <g class="ln2">
    <path d="M-1.6 -62 h3.2 M-1.4 -68 h2.8 M14 -51.6 v3.2 M20 -51.4 v2.8 M-1.6 -38 h3.2 M-14 -51.6 v3.2"/>
  </g>
  <g class="hx"><path d="M-36 3 h9 M24 4 h9"/></g>`;
};

/* --- il faro --------------------------------------------------------------- */
G.lighthouse = () => {
  const body = 'M-13 2 L-8 -48 H8 L13 2 Z';
  return `
  <path class="ln" d="M-34 2 q10 -8 22 -8 q14 0 24 8"/>
  ${sh('M-34 2 q10 -8 22 -8 q14 0 24 8Z', { x: -36, y: -8, w: 72, h: 12, step: 2.6, dir: -1 })}
  <path class="fl" d="${body}"/>
  <path class="ln" d="${body}"/>
  ${courses(body, -46, 0, 5, -14, 14)}
  ${sh('M4 2 L8 -48 H8 L13 2Z', { x: 3, y: -50, w: 12, h: 54, step: 2.6, dir: 0 })}
  <path class="ln" d="M-11 -30 h22 M-10 -16 h20"/>
  <path class="ln" d="M-11 -48 h22 v-3 H-11 Z"/>
  <path class="ln" d="M-8 -51 v-10 h16 v10"/>
  <path class="ln2" d="M-4 -51 v-10 M4 -51 v-10"/>
  <path class="ln" d="M-10 -61 h20 l-10 -8 Z"/>
  <path class="ln2" d="M0 -69 v-4"/>
  <g class="hx"><path d="M12 -58 h12 M12 -54 h16 M-12 -58 h-12 M-12 -54 h-16 M14 -62 l10 -5 M-14 -62 l-10 -5"/></g>
  <path class="ln2" d="M-6 -20 h5 v6 h-5 Z"/>
  <g class="hx">
    <path d="M-44 6 q10 -4 20 0 q10 -4 20 0 q10 -4 20 0"/>
    <path d="M-38 11 q10 -4 20 0 q10 -4 20 0"/>
  </g>`;
};

/* --- le rovine ------------------------------------------------------------- */
G.ruins = () => `
  <path class="ln2" d="M-46 3 q20 -5 36 -4 q20 1 34 3"/>
  <path class="ln" d="M-38 2 h72 l-3 -5 H-35 Z"/>
  ${sh('M-38 2 h72 l-3 -5 H-35Z', { x: -40, y: -8, w: 78, h: 12, step: 2.4, dir: -1 })}
  <path class="ln" d="M-30 -3 v-30 h8 v30"/>
  <path class="ln2" d="M-30 -33 h8 M-28 -31 v-26 M-25 -31 v-26"/>
  <path class="ln" d="M-31 -33 q4 -4 10 0 l-1 -4 h-8 Z"/>
  <path class="ln" d="M-10 -3 v-34 h8 v34"/>
  <path class="ln2" d="M-10 -37 h8 M-8 -35 v-30 M-5 -35 v-30"/>
  <path class="ln" d="M-11 -37 q4 -4 10 0 l-1 -4 h-8 Z"/>
  <path class="ln" d="M12 -3 v-18 h8 v18"/>
  <path class="ln2" d="M12 -21 h8 M14 -19 v-14"/>
  <path class="ln" d="M11 -21 q5 -4 10 0 l-1 -4 h-8 Z"/>
  <path class="ln" d="M-33 -41 h24 l2 5 h-26 Z"/>
  <path class="ln2" d="M-31 -41 v-3 h20 v3"/>
  <path class="ln" d="M24 -3 v-11 h7 v11"/>
  <path class="ln" d="M22 -14 h11"/>
  <path class="ln2" d="M34 2 q-2 -8 2 -10 q5 -2 6 3"/>
  <path class="ln2" d="M-44 2 q2 -7 7 -8"/>`;

/* --- il cartiglio ---------------------------------------------------------- */
G.cartouche = (txt) => `
  <path class="ln2" d="M-62 -16 q-10 -2 -10 8 q0 10 10 8 M62 -16 q10 -2 10 8 q0 10 -10 8"/>
  <path class="ln" d="M-62 -18 h124 q6 0 6 6 v24 q0 6 -6 6 H-62 q-6 0 -6 -6 v-24 q0 -6 6 -6 Z"/>
  <path class="ln2" d="M-58 -13 h116 v26 h-116 Z"/>
  <path class="ln2" d="M-68 -6 q-8 -4 -4 -10 q5 -5 9 2 M68 -6 q8 -4 4 -10 q-5 -5 -9 2"/>
  <path class="ln2" d="M-68 12 q-8 4 -4 10 q5 5 9 -2 M68 12 q8 4 4 10 q-5 5 -9 -2"/>
  <text class="ct" y="4" text-anchor="middle">${txt}</text>
  <path class="ln2" d="M-26 11 h52 M-30 11 l4 -2 M30 11 l-4 -2"/>`;

/* ===========================================================================
   Decori da carta antica
   =========================================================================== */

const DECOR = {};

/* rosa dei venti a 16 punte, con punte a due facce come nelle incisioni */
DECOR.compass = () => {
  let main = '', half = '', minor = '', ticks = '';
  for (let i = 0; i < 8; i++) {
    const a = (i * 45 - 90) * Math.PI / 180, b = a + Math.PI / 4;
    const R = i % 2 ? 30 : 42, r = 9;
    const px = Math.cos(a) * R, py = Math.sin(a) * R;
    const lx = Math.cos(a - Math.PI / 2) * r, ly = Math.sin(a - Math.PI / 2) * r;
    main += `M0 0 L${lx.toFixed(1)} ${ly.toFixed(1)} L${px.toFixed(1)} ${py.toFixed(1)} Z`;
    half += `M0 0 L${(-lx).toFixed(1)} ${(-ly).toFixed(1)} L${px.toFixed(1)} ${py.toFixed(1)} Z`;
    const mR = 24, mx = Math.cos(b) * mR, my = Math.sin(b) * mR;
    const mlx = Math.cos(b - Math.PI / 2) * 5, mly = Math.sin(b - Math.PI / 2) * 5;
    minor += `M0 0 L${mlx.toFixed(1)} ${mly.toFixed(1)} L${mx.toFixed(1)} ${my.toFixed(1)} Z` +
             `M0 0 L${(-mlx).toFixed(1)} ${(-mly).toFixed(1)} L${mx.toFixed(1)} ${my.toFixed(1)} Z`;
  }
  for (let i = 0; i < 64; i++) {
    const a = i * Math.PI / 32, o = i % 4 ? 3 : 6;
    ticks += `M${(Math.cos(a) * 47).toFixed(1)} ${(Math.sin(a) * 47).toFixed(1)}` +
             `L${(Math.cos(a) * (47 + o)).toFixed(1)} ${(Math.sin(a) * (47 + o)).toFixed(1)}`;
  }
  const id = 'cr' + (++_uid);
  return `
    <circle class="ln2" r="54"/><circle class="ln" r="47"/>
    <circle class="ln2" r="43"/><circle class="ln2" r="12"/>
    <g class="hx"><path d="${ticks}"/></g>
    <path class="ln2" d="${minor}"/>
    <path class="ln" d="${main}"/>
    <clipPath id="${id}"><path d="${half}"/></clipPath>
    <path class="ln" d="${half}"/>
    <g class="hx" clip-path="url(#${id})">
      <path d="${(() => { let d = ''; for (let i = -70; i < 70; i += 2.4) d += `M${i} -50L${i + 100} 50`; return d; })()}"/>
    </g>
    <path class="ln" d="M0 -42 q-5 -10 0 -18 q5 8 0 18 Z"/>
    <path class="ln2" d="M0 -60 v-8 M-3 -64 h6"/>
    <circle class="ln2" r="3"/>
    <text class="cp" y="-60" text-anchor="middle">N</text>
    <text class="cp" y="70" text-anchor="middle">S</text>
    <text class="cp" x="64" y="4" text-anchor="middle">E</text>
    <text class="cp cp--w" x="-64" y="4" text-anchor="middle">${LANGTEXT(W_LABEL)}</text>`;
};

/* galeone */
DECOR.ship = () => {
  const sail = (x, y, w, h) => `
    <path class="ln" d="M${-w / 2} ${y} q${w / 2} ${-h * 0.18} ${w} 0 l-2 ${h} q${-w / 2} ${h * 0.2} ${-w + 4} 0 Z"
          transform="translate(${x} 0)"/>
    ${sh(`M${x - w / 2 + w * 0.55} ${y} q${w * 0.45} ${-h * 0.1} ${w * 0.45} 0 l-2 ${h} q${-w * 0.2} ${h * 0.1} ${-w * 0.42} 0Z`,
         { x: x + w * 0.05, y: y - 4, w: w * 0.6, h: h + 8, step: 2.4, dir: 1 })}
    <g class="hx"><path d="M${x - w / 2 + 2} ${y + h * 0.33} h${w - 4} M${x - w / 2 + 2} ${y + h * 0.66} h${w - 4}"/></g>`;
  return `
    <path class="ln" d="M-40 0 q6 10 18 12 h26 q12 -2 18 -12 Z"/>
    ${sh('M-40 0 q6 10 18 12 h26 q12 -2 18 -12Z', { x: -42, y: -2, w: 84, h: 16, step: 2.2, dir: 1 })}
    <path class="ln2" d="M-38 -4 h76 M-39 0 h78"/>
    <path class="ln2" d="M-34 -4 v-6 h8 v6 M-22 -4 v-6 h8 v6 M-10 -4 v-6 h8 v6 M2 -4 v-6 h8 v6 M14 -4 v-6 h8 v6 M26 -4 v-6 h8 v6"/>
    <path class="ln" d="M-26 -10 v-46 M6 -10 v-56 M30 -10 v-34"/>
    ${sail(-26, -52, 22, 18)}
    ${sail(6, -62, 28, 22)}
    ${sail(6, -36, 30, 20)}
    ${sail(30, -31, 16, 14)}
    <g class="hx">
      <path d="M-26 -56 L-40 -8 M-26 -56 L-8 -12 M6 -66 L-14 -10 M6 -66 L28 -12 M30 -44 L40 -10"/>
    </g>
    <path class="ln2" d="M6 -66 v-6 l10 3 -10 3"/>
    <g class="hx">
      <path d="M-56 10 q11 -5 22 0 q11 -5 22 0 q11 -5 22 0 q11 -5 22 0"/>
      <path d="M-48 16 q11 -5 22 0 q11 -5 22 0 q11 -5 22 0"/>
    </g>`;
};

/* serpente marino */
DECOR.monster = () => `
  <path class="ln" d="M-56 6 q10 -20 22 -6 q10 12 20 -4 q10 -16 22 -2 q8 8 16 2"/>
  <path class="ln2" d="M-52 6 q9 -15 19 -4 q10 11 20 -4 q9 -14 20 -2"/>
  <path class="ln" d="M24 -4 q10 -12 20 -8 q12 5 10 14 q-2 8 -12 7 q-10 -1 -8 -9 q2 -5 7 -3"/>
  ${sh('M24 -4 q10 -12 20 -8 q12 5 10 14 q-2 8 -12 7 q-10 -1 -8 -9Z', { x: 26, y: -16, w: 32, h: 28, step: 2.3, dir: 1 })}
  <path class="ln2" d="M44 -9 a2 2 0 1 0 0.1 0"/>
  <path class="ln2" d="M50 -16 q4 -7 9 -6 M44 -17 q1 -8 6 -9"/>
  <path class="ln2" d="M-30 -2 q-3 -8 2 -11 M-8 -6 q-2 -8 3 -10 M12 -10 q-2 -8 3 -10"/>
  <g class="hx"><path d="M-60 12 q12 -5 24 0 q12 -5 24 0 q12 -5 24 0"/></g>`;

/* catena di monti */
DECOR.mountains = () => `
  <path class="ln" d="M-78 2 L-50 -34 L-34 -14 L-18 -30 L0 2 Z"/>
  ${sh('M-50 -34 L-34 -14 L-18 -30 L0 2 H-50Z', { x: -50, y: -36, w: 54, h: 40, step: 2.6, dir: 1 })}
  <path class="ln2" d="M-58 -20 l6 4 7 -5 M-24 -20 l5 4 6 -4"/>
  <path class="ln" d="M-10 2 L14 -26 L38 2 Z"/>
  ${sh('M14 -26 L38 2 H14Z', { x: 14, y: -28, w: 26, h: 32, step: 2.6, dir: 1 })}
  <path class="ln2" d="M4 -12 l5 3 6 -4"/>
  <path class="ln" d="M30 2 L48 -18 L66 2 Z"/>
  ${sh('M48 -18 L66 2 H48Z', { x: 48, y: -20, w: 20, h: 24, step: 2.6, dir: 1 })}
  <path class="ln2" d="M-84 2 q30 -4 60 -2 q30 2 58 2"/>`;

/* increspature del mare */
DECOR.waves = () => `
  <g class="hx">
    <path d="M0 0 q10 -5 20 0 q10 -5 20 0 q10 -5 20 0 q10 -5 20 0"/>
    <path d="M8 7 q10 -5 20 0 q10 -5 20 0 q10 -5 20 0"/>
    <path d="M2 14 q10 -5 20 0 q10 -5 20 0 q10 -5 20 0 q10 -5 20 0"/>
  </g>`;

/* banco di scogli / secca */
DECOR.rocks = () => `
  <path class="ln" d="M-18 2 L-8 -12 L2 2 Z M0 2 L10 -8 L20 2 Z"/>
  ${sh('M-8 -12 L2 2 H-8Z', { x: -8, y: -14, w: 12, h: 18, step: 2.2, dir: 1 })}
  <g class="hx"><path d="M-26 5 q10 -4 20 0 q10 -4 20 0"/></g>`;

/* ===========================================================================
   Costruzione della carta
   Tutto è diviso in tre gruppi: banda sinistra, banda destra, fondo neutro.
   Su schermo stretto le due bande si stringono verso il centro (vedi app.js).
   =========================================================================== */

/* miniature puramente decorative, senza etichetta e senza interazione */
const SCENERY = [
  ['windmill',   168,  496, 0.62], ['bridge',     176, 1186, 0.64],
  ['ruins',      168, 1878, 0.60], ['lighthouse', 1452, 1622, 0.58],
  ['ruins',      1456,  520, 0.50], ['bridge',     1448, 2996, 0.55]
];

/* nomi di regione, appena accennati */
const REGIONS = [
  [250,  455, { it: 'VALLE  DELLE  LANTERNE',  en: 'LANTERN  VALLEY' },     -4],
  [1402, 640, { it: 'BOSCO  DELLE  SPINE',     en: 'WOOD  OF  THORNS' },     3],
  [214, 1560, { it: 'PIANA  DEI  RACCONTI',    en: 'PLAIN  OF  TALES' },    -3],
  [1420, 2050, { it: 'ALTE  TERRE  D’ORIENTE', en: 'EASTERN  HIGHLANDS' },   4],
  [240, 2900, { it: 'MARE  IGNOTO',            en: 'UNCHARTED  SEA' },      -2],
  [1414, 2700, { it: 'COSTA  DI  PORTOROSSO',  en: 'PORTOROSSO  COAST' },    3]
];

function mapSVG() {
  const L = [], R = [], N = [];
  const g = (body, x, y, s, cls) =>
    `<g class="${cls || 'm-dec'}" transform="translate(${x} ${y}) scale(${s})">${body}</g>`;

  /* --- fondo: graticolato di meridiani e paralleli ---------------------- */
  let grid = '';
  for (let y = -40; y < 3500; y += 170) grid += `M-240 ${y}H1840`;
  for (let x = -170; x <= 1770; x += 170) grid += `M${x} -40V3500`;
  N.push(`<path class="m-grid" d="${grid}"/>`);

  /* --- linee lossodromiche dalle rose dei venti -------------------------- */
  const rhumb = (cx, cy, len) => {
    let d = '';
    for (let i = 0; i < 16; i++) {
      const a = i * Math.PI / 8;
      d += `M${cx} ${cy}L${(cx + Math.cos(a) * len).toFixed(0)} ${(cy + Math.sin(a) * len).toFixed(0)}`;
    }
    return `<path class="m-rhumb" d="${d}"/>`;
  };
  R.push(rhumb(1468, 980, 430));
  L.push(rhumb(132, 2290, 360));

  /* --- sentieri --------------------------------------------------------- */
  const trail = (pts, cls) => {
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const [px, py] = pts[i - 1], [cx, cy] = pts[i];
      d += ` Q${(px + (cx - px) / 2 + (i % 2 ? 86 : -86)).toFixed(0)} ${(py + (cy - py) / 2).toFixed(0)} ${cx} ${cy}`;
    }
    return `<path class="m-trail ${cls || ''}" d="${d}"/>`;
  };
  const band = (left) => LANDMARKS.filter(l => (l.x < 800) === left).map(l => [l.x, l.y - 10]);
  L.push(trail([[150, -80], ...band(true), [250, 3480]]));
  R.push(trail([[1372, -80], ...band(false), [1300, 3480]]));
  N.push(trail([[310, 1245], [690, 1320], [980, 1470], [1250, 1400]], 'm-trail--thin'));
  N.push(trail([[300, 2470], [700, 2520], [1000, 2660], [1260, 2600]], 'm-trail--thin'));

  /* --- stelline, secche, punti di scandaglio ----------------------------- */
  let seed = 20261008;
  const rnd = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
  let sl = '', sr = '', dl = '', dr = '';
  for (let i = 0; i < 190; i++) {
    const x = 40 + rnd() * 1520, y = -40 + rnd() * 3540, t = rnd();
    if (x > 440 && x < 1160) continue;
    if (t < 0.46) {
      const r = 1.5 + rnd() * 2.8;
      const s = `M${x.toFixed(0)} ${(y - r).toFixed(1)}L${(x + r * .3).toFixed(1)} ${(y - r * .3).toFixed(1)}L${(x + r).toFixed(1)} ${y.toFixed(0)}L${(x + r * .3).toFixed(1)} ${(y + r * .3).toFixed(1)}L${x.toFixed(0)} ${(y + r).toFixed(1)}L${(x - r * .3).toFixed(1)} ${(y + r * .3).toFixed(1)}L${(x - r).toFixed(1)} ${y.toFixed(0)}L${(x - r * .3).toFixed(1)} ${(y - r * .3).toFixed(1)}Z`;
      x < 800 ? (sl += s) : (sr += s);
    } else {
      const s = `M${x.toFixed(0)} ${y.toFixed(0)}l0.9 0`;
      x < 800 ? (dl += s) : (dr += s);
    }
  }
  L.push(`<path class="m-star" d="${sl}"/><path class="m-dot" d="${dl}"/>`);
  R.push(`<path class="m-star" d="${sr}"/><path class="m-dot" d="${dr}"/>`);

  /* --- rose dei venti, monti, mare, scogli, galeone ---------------------- */
  R.push(g('<g class="m-spin">' + DECOR.compass() + '</g>', 1468, 980, 1));
  L.push(g('<g class="m-spin">' + DECOR.compass() + '</g>', 132, 2290, 0.72));
  L.push(g(DECOR.mountains(), 262, 1206, 0.82));
  R.push(g(DECOR.mountains(), 1416, 2322, 0.62));
  R.push(g(DECOR.ship(), 1438, 2686, 0.86));
  L.push(g(DECOR.monster(), 166, 2932, 0.84));
  R.push(g(DECOR.rocks(), 1452, 2452, 0.8));
  R.push(g(DECOR.waves(), 1216, 2566, 0.85));
  R.push(g(DECOR.waves(), 1240, 2980, 0.8));
  L.push(g(DECOR.waves(), 96, 560, 0.75));
  L.push(g(DECOR.waves(), 104, 2730, 0.8));
  R.push(g(G.cartouche('HIC · SVNT · FABVLAE'), 1392, 100, 0.6, 'm-dec m-cart'));
  L.push(g(G.cartouche('MARE · IGNOTO'), 176, 2606, 0.5, 'm-dec m-cart'));

  /* --- miniature decorative --------------------------------------------- */
  SCENERY.forEach(([k, x, y, s]) => (x < 800 ? L : R).push(g(G[k](), x, y, s)));

  /* --- nomi di regione ---------------------------------------------------- */
  REGIONS.forEach(([x, y, t, rot], i) =>
    (x < 800 ? L : R).push(
      `<text class="m-region" data-rg="${i}" x="${x}" y="${y}" text-anchor="middle" transform="rotate(${rot} ${x} ${y})">${LANGTEXT(t)}</text>`));

  /* --- i luoghi delle storie (interattivi) -------------------------------- */
  LANDMARKS.forEach((l, i) => {
    const art = G[l.g] ? G[l.g]() : '';
    (l.x < 800 ? L : R).push(
      `<g class="lm" data-i="${i}" tabindex="0" role="button" aria-label="${l.label} — ${l.sub}"
          transform="translate(${l.x} ${l.y}) scale(${l.s})">
         <ellipse class="lm-halo" cy="-34" rx="92" ry="74"/>
         <g class="lm-art">${art}</g>
         <text class="lm-label" y="22" text-anchor="middle">${l.label.toUpperCase()}</text>
         <path class="lm-rule" d="M-26 27 h52"/>
         <rect class="lm-hit" x="-82" y="-104" width="164" height="136"/>
       </g>`);
  });

  return `
    <defs>
      <radialGradient id="halo">
        <stop offset="0%"   stop-color="#b8821f" stop-opacity=".26"/>
        <stop offset="58%"  stop-color="#b8821f" stop-opacity=".09"/>
        <stop offset="100%" stop-color="#b8821f" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <g id="drift">
      <g class="band band--n">${N.join('')}</g>
      <g class="band band--l">${L.join('')}</g>
      <g class="band band--r">${R.join('')}</g>
    </g>`;
}
