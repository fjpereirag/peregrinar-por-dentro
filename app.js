// Peregrinar por dentro · plantilla de un lugar: imágenes IA con cine lento y mapa ilustrado
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
const estrecho = () => innerWidth <= 760;

// ---------- qué lugar se muestra: ?l=getsemani (por defecto, el último) ----------
const LUGARES = [...(window.LUGARES || [])].sort((a, b) => a.numero - b.numero);
const pedido = new URLSearchParams(location.search).get('l');
const L = LUGARES.find(x => x.id === pedido) || LUGARES[LUGARES.length - 1];
const urlLugar = id => `${location.pathname}?l=${encodeURIComponent(id)}`;
const WEB = 'https://fjpereirag.github.io/peregrinar-por-dentro/';
const enlaceLugar = id => `${WEB}?l=${encodeURIComponent(id)}`;

// ---------- texto ----------
const romano = n => { const t = [[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']]; let r = ''; for (const [v, l] of t) while (n >= v) { r += l; n -= v; } return r; };
const lineas = t => `<span class="linea"><span>${esc(t)}</span></span>`;
document.title = `${L.nombre} · Peregrinar por dentro`;
$('meta[name="description"]')?.setAttribute('content', `${L.nombre}: ${L.titulo}. Una serie para rezar desde los lugares de Tierra Santa.`);
$('#marcaLugar').textContent = `${romano(L.numero)} · ${L.nombre}`;
$('#serie').textContent = `Lugar ${romano(L.numero)} · ${L.ubicacion}`;
$('#serie').classList.add('revela');
$('#nombre').innerHTML = lineas(L.nombre);
$('#titulo').textContent = L.titulo; $('#titulo').classList.add('revela'); $('#titulo').style.setProperty('--i', 4);
$('#entradilla').textContent = L.entradilla; $('#entradilla').classList.add('revela'); $('#entradilla').style.setProperty('--i', 6);
$('#inicio .acciones').classList.add('revela'); $('#inicio .acciones').style.setProperty('--i', 8);
$('#reflexion').innerHTML = L.secciones.map((s, i) => `
  <section class="paso ${i % 2 ? 'derecha' : ''}" id="${esc(s.id)}" data-vista="${String(i + 1).padStart(2, '0')}" aria-labelledby="t-${esc(s.id)}">
    <article class="tarjeta">
      <p class="numeral revela" aria-hidden="true">${romano(i + 1)}</p>
      <h2 id="t-${esc(s.id)}">${lineas(s.titulo || 'Para empezar')}</h2>
      ${s.cita ? `<p class="cita revela" style="--i:2">${esc(s.cita)}</p>` : ''}
      <div class="cuerpo">${s.parrafos.map((p, k) => `<p class="revela" style="--i:${k + 3}">${esc(p)}</p>`).join('')}</div>
    </article>
  </section>`).join('');
$('#frase').textContent = L.guardar;
$('#versos').innerHTML = L.oracion.map(esc).join('<br>');
$('#lectura').href = L.lectura.url;
$('#lectura').innerHTML = `Para leer despacio: <b>${esc(L.lectura.cita)}</b> ↗`;
const textoCompartir = () => `${L.whatsapp}\n\nLéelo y escúchalo aquí:\n${enlaceLugar(L.id)}`;
$('#mensaje').textContent = textoCompartir();
$('#btnWhatsapp').href = 'https://wa.me/?text=' + encodeURIComponent(textoCompartir());
$('#btnCopiar').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(textoCompartir()); avisar('Mensaje copiado. Ya puedes pegarlo donde quieras.'); }
  catch { avisar('No se ha podido copiar; selecciona el texto y cópialo a mano.'); }
});

const otros = LUGARES.filter(x => x.id !== L.id);
if (otros.length) {
  $('#serieLista').hidden = false;
  $('#serieRejilla').innerHTML = otros.map(x => `<a class="serie-item" href="${urlLugar(x.id)}"><i>${x.numero}</i><span><b>${esc(x.nombre)}</b><small>${esc(x.titulo)}</small></span></a>`).join('');
}

let tAviso;
function avisar(t, ms = 3800) {
  const a = $('#aviso'); a.textContent = t; a.hidden = false;
  clearTimeout(tAviso); if (ms) tAviso = setTimeout(() => { a.hidden = true; }, ms);
}

// ---------- revelados al entrar en pantalla (solo transform/opacity) ----------
if (reducido || !('IntersectionObserver' in window)) document.documentElement.classList.add('sin-motion');
else {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visto'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -12% 0px' });
  $$('.portada-in, .paso .tarjeta, .guardar-in, .oracion-in, .compartir-in, .seguir-in, .serie-lista').forEach(el => io.observe(el));
  $$('.oracion-in, .compartir-in').forEach(el => el.classList.add('revela'));
}

// ---------- menú móvil ----------
const cab = $('.cabecera'), btnMenu = $('.btn-menu');
const cerrarMenu = () => { cab.classList.remove('menu-abierto'); btnMenu.setAttribute('aria-expanded', 'false'); };
btnMenu.addEventListener('click', () => btnMenu.setAttribute('aria-expanded', String(cab.classList.toggle('menu-abierto'))));
document.addEventListener('click', e => { if (!cab.contains(e.target)) cerrarMenu(); });
addEventListener('keydown', e => { if (e.key === 'Escape') cerrarMenu(); });
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]'); if (!a) return;
  const el = document.getElementById(a.getAttribute('href').slice(1)); if (!el) return;
  e.preventDefault(); cerrarMenu();
  scrollTo({ top: el.getBoundingClientRect().top + scrollY - (el.id === 'inicio' ? 0 : cab.offsetHeight + 8), behavior: reducido ? 'auto' : 'smooth' });
});

// ---------- escena: una imagen por apartado, con movimiento de cine lento ----------
// Imágenes en img/<lugar>/<clave>.webp (horizontal) y, opcional, <clave>-movil.webp (vertical).
// Claves: 00 portada · 01…05 apartados · 06 frase · 07 oración.
const CLAVES = ['00', ...L.secciones.map((_, i) => String(i + 1).padStart(2, '0')), String(L.secciones.length + 1).padStart(2, '0'), String(L.secciones.length + 2).padStart(2, '0')];
const ajustes = L.imagenes || {};
const escena = $('#escena');
escena.innerHTML = CLAVES.map((c, i) => {
  const a = ajustes[c] || {};
  return `<figure class="plano ${i % 2 ? 'kb-b' : 'kb-a'}" data-clave="${c}" style="--foco:${a.foco || '50% 50%'};--zoom:${a.zoom || 1.12}"><img alt="" decoding="async"></figure>`;
}).join('');
const figura = c => escena.querySelector(`[data-clave="${c}"]`);
function cargarImagen(c) {
  const f = figura(c); if (!f || f.dataset.cargada) return; f.dataset.cargada = '1';
  const img = f.querySelector('img'), base = `img/${L.id}/${c}`;
  const ancho = () => { img.onerror = () => f.classList.add('vacia'); img.src = base + '.webp'; };
  img.onload = () => f.classList.add('lista');
  if (estrecho()) { img.onerror = ancho; img.src = base + '-movil.webp'; } else ancho();
}
let claveActual = null;
function mostrar(c) {
  if (c === claveActual) return; claveActual = c;
  $$('.plano', escena).forEach(f => f.classList.toggle('activo', f.dataset.clave === c));
  const i = CLAVES.indexOf(c);
  [i, i + 1, i - 1].forEach(k => CLAVES[k] && cargarImagen(CLAVES[k]));
}

function espiar() {
  const centro = innerHeight * 0.55;
  let clave = '00';
  for (const s of $$('[data-vista]')) { const r = s.getBoundingClientRect(); if (r.top <= centro) clave = s.dataset.vista; }
  mostrar(clave);
  cab.classList.toggle('solida', scrollY > 40);
  const ids = ['inicio', 'reflexion', 'oracion', 'compartir'];
  let act = 'inicio';
  ids.forEach(id => { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top < innerHeight * 0.45) act = id; });
  $$('.menu a').forEach(a => a.classList.toggle('actual', a.getAttribute('href') === '#' + act));
  $('#velo').classList.toggle('lectura', scrollY > innerHeight * 0.5);
}
addEventListener('scroll', espiar, { passive: true });
espiar();
// cuando la portada ya está, se van cargando las demás sin prisa
addEventListener('load', () => { let k = 0; const sig = () => { if (k < CLAVES.length) { cargarImagen(CLAVES[k++]); setTimeout(sig, 700); } }; setTimeout(sig, 1200); });

// ---------- mapa ilustrado de situación (estático, dibujado en SVG) ----------
(() => {
  const caja = $('#situacion'); if (!caja) return;
  const LAT = [30.95, 33.35], LON = [34.2, 36.0], K = Math.cos(32 * Math.PI / 180), ESC = 100;
  const x = lo => ((lo - LON[0]) * K * ESC).toFixed(1), y = la => ((LAT[1] - la) * ESC).toFixed(1);
  const W = ((LON[1] - LON[0]) * K * ESC).toFixed(0), H = ((LAT[1] - LAT[0]) * ESC).toFixed(0);
  const linea = pts => pts.map(([la, lo], i) => `${i ? 'L' : 'M'}${x(lo)} ${y(la)}`).join(' ');
  const costa = [[31.0, 34.2], [31.25, 34.25], [31.5, 34.43], [31.8, 34.64], [32.08, 34.76], [32.5, 34.89], [32.82, 34.96], [32.83, 35.06], [32.93, 35.08], [33.1, 35.11], [33.35, 35.2]];
  const mar = linea(costa) + ` L${x(34.2)} ${y(33.35)} L${x(34.2)} ${y(31.0)} Z`;
  const galilea = linea([[32.89, 35.6], [32.85, 35.65], [32.75, 35.645], [32.7, 35.59], [32.76, 35.53], [32.85, 35.535]]) + ' Z';
  const muerto = linea([[31.77, 35.53], [31.6, 35.47], [31.35, 35.41], [31.1, 35.39], [30.97, 35.43], [31.05, 35.51], [31.35, 35.56], [31.6, 35.58], [31.77, 35.57]]) + ' Z';
  const jordan = linea([[33.25, 35.62], [33.05, 35.61], [32.9, 35.6]]) + ' ' + linea([[32.7, 35.57], [32.5, 35.56], [32.25, 35.53], [32.0, 35.54], [31.77, 35.55]]);
  const ciudades = [['Jerusalén', 31.778, 35.235, 'i', -2], ['Belén', 31.705, 35.2, 'i', 6], ['Nazaret', 32.70, 35.30, 'i', 3], ['Jericó', 31.86, 35.46, 'd', 0]];
  const lugares = LUGARES.map(l => `<g class="${l.id === L.id ? 'sit-actual' : 'sit-otro'}"><circle cx="${x(l.coord[1])}" cy="${y(l.coord[0])}" r="${l.id === L.id ? 5 : 3.5}"/>${l.id === L.id ? `<circle class="sit-pulso" cx="${x(l.coord[1])}" cy="${y(l.coord[0])}" r="5"/>` : ''}</g>`).join('');
  caja.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Mapa de Tierra Santa: ${esc(L.nombre)}, junto a Jerusalén">
    <path class="sit-mar" d="${mar}"/><path class="sit-costa" d="${linea(costa)}"/>
    <path class="sit-agua" d="${galilea}"/><path class="sit-agua" d="${muerto}"/><path class="sit-rio" d="${jordan}"/>
    <text class="sit-rotulo mar" x="${x(34.33)}" y="${y(32.2)}" transform="rotate(-62 ${x(34.33)} ${y(32.2)})">Mar Mediterráneo</text>
    <text class="sit-rotulo agua" x="${x(35.66)}" y="${y(32.82)}">Galilea</text>
    <text class="sit-rotulo agua" x="${x(35.58)}" y="${y(31.35)}">Mar Muerto</text>
    ${ciudades.map(([n, la, lo, lado, dy]) => `<circle class="sit-ciudad" cx="${x(lo)}" cy="${y(la)}" r="1.8"/><text class="sit-rotulo" x="${(+x(lo) + (lado === 'd' ? 5 : -7)).toFixed(1)}" y="${(+y(la) + 2.5 + dy).toFixed(1)}" text-anchor="${lado === 'd' ? 'start' : 'end'}">${n}</text>`).join('')}
    ${lugares}
  </svg><p>${romano(L.numero)} · ${esc(L.nombre)}</p>`;
})();
