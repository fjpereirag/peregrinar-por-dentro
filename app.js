// Peregrinar por dentro · plantilla de un lugar: imágenes IA con cine lento y mapa ilustrado
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
const estrecho = () => innerWidth <= 760;

// ---------- qué lugar se muestra: ?l=getsemani (por defecto, el último publicado) ----------
// Cada lugar sale el día de su «publicar» (AAAA-MM-DD, en lugares.js). Antes de esa fecha no aparece.
// Para revisarlo antes de que salga: añade &previa a la dirección, por ejemplo ?l=nazaret&previa
const params = new URLSearchParams(location.search), previa = params.has('previa');
const hoy = (d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`)(new Date());
// activo: false lo retira de la web aunque haya llegado su fecha (lo decides tú en lugares.js)
const publicado = x => previa || (x.activo !== false && (!x.publicar || x.publicar <= hoy));
const LUGARES = [...(window.LUGARES || [])].filter(publicado).sort((a, b) => a.numero - b.numero);
const pedido = params.get('l');
const L = LUGARES.find(x => x.id === pedido) || LUGARES[LUGARES.length - 1];
// si alguien abre un lugar que aún no ha salido (o está retirado), se le avisa y se le ofrece el actual
const pendiente = pedido && L.id !== pedido ? (window.LUGARES || []).find(x => x.id === pedido) : null;
const fechaLarga = f => new Date(f + 'T12:00').toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }).replace(',', '');
// el próximo lugar que saldrá (el de fecha más cercana después de hoy)
const proximo = (window.LUGARES || []).filter(x => x.activo !== false && x.publicar && x.publicar > hoy)
  .sort((a, b) => a.publicar.localeCompare(b.publicar))[0] || null;
const urlLugar = id => `${location.pathname}?l=${encodeURIComponent(id)}${previa ? '&previa' : ''}`;
const WEB = 'https://fjpereirag.github.io/peregrinar-por-dentro/';
// enlace para compartir: la página corta de cada lugar (getsemani/, emaus/…) trae su propia vista previa para WhatsApp
const enlaceLugar = id => `${WEB}${encodeURIComponent(id)}/`;

// ---------- texto ----------
const romano = n => { const t = [[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']]; let r = ''; for (const [v, l] of t) while (n >= v) { r += l; n -= v; } return r; };
const lineas = t => `<span class="linea"><span>${esc(t)}</span></span>`;
document.title = `${L.nombre} · Peregrinar por dentro`;
$('meta[name="description"]')?.setAttribute('content', `${L.nombre}: ${L.titulo}. Una serie para rezar desde los lugares de Tierra Santa.`);
$('#marcaLugar').textContent = `${romano(L.numero)} · ${L.nombre}`;
$('#serie').textContent = `Lugar ${romano(L.numero)} · ${L.ubicacion}`;
$('#serie').classList.add('revela');
if (pendiente) {
  const dia = pendiente.publicar && pendiente.publicar > hoy && pendiente.activo !== false
    ? fechaLarga(pendiente.publicar) : null;
  const p = document.createElement('p'); p.className = 'proximo'; p.setAttribute('role', 'status');
  p.innerHTML = (dia
    ? `<span><b>${esc(pendiente.nombre)}</b> se publica el ${esc(dia)}. Mientras tanto, puedes rezar con ${esc(L.nombre)}.</span>`
    : `<span><b>${esc(pendiente.nombre)}</b> no está disponible en este momento. Puedes rezar con ${esc(L.nombre)}.</span>`)
    + '<button type="button" aria-label="Cerrar el aviso">×</button>';
  p.querySelector('button').addEventListener('click', () => p.remove());
  document.body.appendChild(p);
}
$('#nombre').innerHTML = lineas(L.nombre);
$('#titulo').textContent = L.titulo; $('#titulo').classList.add('revela'); $('#titulo').style.setProperty('--i', 4);
$('#entradilla').textContent = L.entradilla; $('#entradilla').classList.add('revela'); $('#entradilla').style.setProperty('--i', 6);
$('#inicio .acciones').classList.add('revela'); $('#inicio .acciones').style.setProperty('--i', 8);
$('#inicio .controles').classList.add('revela'); $('#inicio .controles').style.setProperty('--i', 9);
$('#reflexion').innerHTML = L.secciones.map((s, i) => `
  <section class="paso ${i % 2 ? 'derecha' : ''}" id="${esc(s.id)}" data-vista="${String(i + 1).padStart(2, '0')}" aria-labelledby="t-${esc(s.id)}">
    <article class="tarjeta">
      <button type="button" class="plegar" aria-expanded="true" aria-label="Ocultar el texto para ver la imagen"><span class="plegar-txt">Ver la imagen</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>
      <p class="numeral revela" aria-hidden="true">${romano(i + 1)}</p>
      <h2 id="t-${esc(s.id)}">${lineas(s.titulo || 'Para empezar')}</h2>
      ${s.cita ? `<p class="cita revela" style="--i:2">${esc(s.cita)}</p>` : ''}
      <div class="cuerpo">${s.parrafos.map((p, k) => `<p class="revela" style="--i:${k + 3}">${esc(p)}</p>`).join('')}</div>
    </article>
  </section>`).join('');
// ---------- plegar el texto (móvil): un toque oculta los textos para ver las imágenes; otro los devuelve ----------
$('#oracion .oracion-in').insertAdjacentHTML('afterbegin', `<button type="button" class="plegar" aria-expanded="true" aria-label="Ocultar el texto para ver la imagen"><span class="plegar-txt">Ver la imagen</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>`);
const plegar = boton => {
  const tarjeta = boton.closest('.tarjeta'), antes = tarjeta.getBoundingClientRect().bottom;
  const plegado = !document.body.classList.contains('plegado');
  document.body.classList.toggle('plegado', plegado);
  $$('.plegar').forEach(b => {
    b.setAttribute('aria-expanded', String(!plegado));
    b.setAttribute('aria-label', plegado ? 'Mostrar el texto' : 'Ocultar el texto para ver la imagen');
    b.querySelector('.plegar-txt').textContent = plegado ? 'Leer el texto' : 'Ver la imagen';
  });
  // mantiene la tarjeta pulsada en el mismo sitio de la pantalla
  scrollBy({ top: tarjeta.getBoundingClientRect().bottom - antes, behavior: 'instant' });
};
document.addEventListener('click', e => { const b = e.target.closest('.plegar'); if (b) plegar(b); });
// las imágenes de la frase y la oración van después de los apartados (Getsemaní: 06 y 07; Emaús: 07 y 08)
const dos = n => String(n).padStart(2, '0'), nSec = L.secciones.length;
$('#guardar').dataset.vista = dos(nSec + 1);
['#oracion', '#compartir', '#seguir'].forEach(q => { $(q).dataset.vista = dos(nSec + 2); });
$('#frase').textContent = L.guardar;
$('#versos').innerHTML = L.oracion.map(esc).join('<br>');
$('#lectura').href = L.lectura.url;
$('#lectura').innerHTML = `Para leer despacio: <b>${esc(L.lectura.cita)}</b> ↗`;
const textoCompartir = () => `${L.whatsapp}\n👉 ${enlaceLugar(L.id)}`;
$('#mensaje').textContent = textoCompartir().replace(/\*/g, '');
$('#btnWhatsapp').href = 'https://wa.me/?text=' + encodeURIComponent(textoCompartir());

const otros = LUGARES.filter(x => x.id !== L.id);
if (otros.length || proximo) {
  $('#serieLista').hidden = false;
  $('#serieRejilla').innerHTML = otros.map(x => `<a class="serie-item" href="${urlLugar(x.id)}"><i>${x.numero}</i><span><b>${esc(x.nombre)}</b><small>${esc(x.titulo)}</small></span></a>`).join('')
    + (proximo && proximo.id !== L.id ? `<div class="serie-item serie-proximo"><i>${proximo.numero}</i><span><b>${esc(proximo.nombre)}</b><small>Próximo lugar · ${esc(fechaLarga(proximo.publicar))}</small></span></div>` : '');
}
// en la portada: cuándo sale el siguiente lugar
if (proximo && proximo.id !== L.id) {
  const p = document.createElement('p'); p.className = 'proximo-lugar revela'; p.style.setProperty('--i', 10);
  p.innerHTML = `Próximo lugar: <b>${esc(proximo.nombre)}</b>, el ${esc(fechaLarga(proximo.publicar))} · <a href="calendario.html">Ver el calendario</a>`;
  $('#inicio .portada-in').appendChild(p);
}
// ---------- Canal de WhatsApp (ajustes.js) ----------
const CANAL = (window.AJUSTES || {}).canalWhatsapp;
if (CANAL) {
  $$('.suscribir').forEach(el => { el.hidden = false; });
  const p = document.createElement('p'); p.className = 'suscribir-portada revela'; p.style.setProperty('--i', 11);
  p.innerHTML = '<a class="btn-canal" target="_blank" rel="noopener">Recibe cada domingo un lugar en WhatsApp ↗</a>';
  $('#inicio .portada-in').appendChild(p);
  $$('.btn-canal').forEach(a => { a.href = CANAL; });
}
// ---------- qué se usa (contador sin cookies, ajustes.js) ----------
const contar = e => window.contar && window.contar(e);
document.addEventListener('click', e => {
  if (e.target.closest('.btn-canal')) contar('canal-whatsapp');
  if (e.target.closest('#btnWhatsapp')) contar('compartir-whatsapp/' + L.id);
  if (e.target.closest('a[href="calendario.html"]')) contar('ir-al-calendario');
});
// llega hasta la oración = ha hecho el recorrido entero
new IntersectionObserver((es, o) => { if (es.some(x => x.isIntersecting)) { contar('llega-a-la-oracion/' + L.id); o.disconnect(); } }, { threshold: .5 }).observe($('#oracion'));

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
// Claves: 00 portada · 01… un número por apartado · después, la frase y la oración.
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
  dispatchEvent(new CustomEvent('cambio-plano', { detail: c }));
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

// ================= Audio y Música (dos casillas) =================
// Audio: lee la reflexión (no la portada, que es solo para leer) y va bajando la página.
//        Usa audio/<lugar>/01.mp3… si existen; si no, la voz del propio dispositivo.
// Música: audio/<lugar>/musica.mp3 si existe; si no, una música de fondo serena generada en el navegador.
//        Con Audio y Música a la vez, la música baja de volumen mientras habla la voz.
(() => {
  const pref = { audio: false, musica: false };
  const cAudio = $('#ctlAudio'), cMusica = $('#ctlMusica'), estado = $('#ctlEstado'), sonando = $('#sonando');
  // aviso flotante mientras suena algo: qué apartado se lee y un botón para detener
  const verSonando = () => { sonando.hidden = !(pref.audio || pref.musica); };

  // ----- Música -----
  const musica = crearMusica();
  // «volumen» en musica (lugares.js) ajusta cada pieza: 1 = normal, 0.7 = más baja
  const AJ = L.musica?.volumen ?? 1, VOL = 0.55 * AJ, VOL_BAJO = 0.14 * AJ;
  const ajustarMusica = () => musica.volumen(narrador.hablando() ? VOL_BAJO : VOL);
  cMusica.addEventListener('change', () => { if (cMusica.checked) window.contar && contar('musica/' + L.id); });
  cAudio.addEventListener('change', () => { if (cAudio.checked) window.contar && contar('audio/' + L.id); });
  cMusica.addEventListener('change', async () => {
    pref.musica = cMusica.checked;
    if (pref.musica) { await musica.empezar(); ajustarMusica(); } else musica.parar();
    verSonando();
  });

  // ----- Audio (narración) -----
  const narrador = crearNarrador();
  cAudio.addEventListener('change', async () => {
    pref.audio = cAudio.checked;
    if (pref.audio) { const ok = await narrador.empezar(); if (!ok) { cAudio.checked = pref.audio = false; } }
    else narrador.parar();
    ajustarMusica(); verSonando();
  });
  $('#btnParar').addEventListener('click', () => {
    narrador.parar(); musica.parar();
    cAudio.checked = cMusica.checked = pref.audio = pref.musica = false; verSonando();
  });
  addEventListener('pagehide', () => { narrador.parar(); musica.parar(); });

  function crearNarrador() {
    if (!window.guionVoz) return { empezar: async () => false, parar() {}, hablando: () => false };
    const trozos = guionVoz(L).filter(t => t.clave !== '00').map(t => ({ ...t, url: `audio/${L.id}/${t.clave}.mp3` }));
    let motor = null, actual = -1, activo = false, autoHasta = 0;
    const destino = t => document.getElementById(t.destino);
    const irA = el => {
      const t = el.querySelector('.tarjeta, blockquote') || el, r = t.getBoundingClientRect();
      autoHasta = performance.now() + 1800;
      scrollTo({ top: r.top + scrollY - Math.max(80, (innerHeight - r.height) / 2), behavior: reducido ? 'auto' : 'smooth' });
    };
    const pintar = () => {
      $$('.paso, .guardar, .oracion').forEach(e => e.classList.remove('leyendo'));
      if (activo && actual >= 0) { destino(trozos[actual])?.classList.add('leyendo'); estado.textContent = trozos[actual].nombre; }
      else estado.textContent = '';
      verSonando();
      ajustarMusica();
    };
    function tocar(i, desplazar = true) {
      if (i >= trozos.length) { cAudio.checked = pref.audio = false; parar(); avisar('Fin de la reflexión. Amén.'); return; }
      actual = i; const t = trozos[i];
      if (desplazar) { const el = destino(t); if (el) irA(el); }
      motor.tocar(t); pintar();
    }
    function parar() { activo = false; motor?.parar(); actual = -1; pintar(); }
    // si la persona baja o sube por su cuenta, la voz salta a ese apartado
    addEventListener('cambio-plano', e => {
      if (!activo || performance.now() < autoHasta) return;
      const i = trozos.findIndex(t => destino(t)?.dataset.vista === e.detail);
      if (i >= 0 && i !== actual) tocar(i, false);
    });
    return {
      async empezar() {
        if (!motor) {
          let hayMp3 = false;
          try { hayMp3 = (await fetch(trozos[0].url, { method: 'HEAD', cache: 'no-store' })).ok; } catch {}
          motor = hayMp3 ? motorMp3() : await motorNavegador();
          if (!motor) { avisar('Este dispositivo no tiene voz en español para leer en alto.'); return false; }
          motor.alAcabar = () => { if (activo) setTimeout(() => activo && tocar(actual + 1), 1200); };
          motor.alCambiar = pintar;
          motor.alAvanzar = () => {};
          motor.alFallar = () => { if (activo) tocar(actual + 1); };
        }
        activo = true;
        tocar(0); // siempre desde el principio de la reflexión
        return true;
      },
      parar,
      hablando: () => !!(activo && motor && motor.sonando())
    };
  }

  function motorMp3() {
    const a = new Audio(); a.preload = 'none';
    const m = {
      tocar(t) { a.src = t.url; a.play().catch(() => avisar('Pulsa de nuevo para escuchar.')); },
      parar() { a.pause(); a.removeAttribute('src'); },
      alternar() { a.paused ? a.play() : a.pause(); },
      sonando: () => !a.paused
    };
    a.addEventListener('ended', () => m.alAcabar());
    a.addEventListener('timeupdate', () => m.alAvanzar(a.duration ? a.currentTime / a.duration : 0));
    a.addEventListener('play', () => m.alCambiar()); a.addEventListener('pause', () => m.alCambiar());
    a.addEventListener('error', () => { if (a.getAttribute('src')) m.alFallar(); });
    return m;
  }

  async function motorNavegador() {
    const ss = window.speechSynthesis; if (!ss) return null;
    let voces = ss.getVoices();
    if (!voces.length) voces = await new Promise(ok => { ss.addEventListener('voiceschanged', () => ok(ss.getVoices()), { once: true }); setTimeout(() => ok(ss.getVoices()), 1500); });
    const es = voces.filter(v => /^es([-_]|$)/i.test(v.lang)); if (!es.length) return null;
    // preferencia: hombre de España con voz neuronal; luego cualquier hombre en español
    const HOMBRES = /alvaro|álvaro|pablo|jorge|enrique|diego|carlos|juan|raul|raúl|arnau|dario|darío|tomas|tomás|antonio|male|hombre/i;
    const punt = v => (HOMBRES.test(v.name) ? 8 : 0) + (/es[-_]ES/i.test(v.lang) ? 4 : 0) + (/natural|neural|online|premium|enhanced|mejorad/i.test(v.name) ? 3 : 0) + (v.localService ? 0 : 1);
    const voz = es.sort((a, b) => punt(b) - punt(a))[0];
    const esHombre = HOMBRES.test(voz.name);
    const MARCA = /<break time="([\d.]+)s"\s*\/>/g;
    let cola = [], pos = 0, total = 0, hecho = 0, activo = false, pausado = false, espera = null, gen = 0;
    const m = {
      tocar(t) {
        m.parar(); gen++; activo = true; pausado = false;
        cola = []; let ult = 0, r;
        MARCA.lastIndex = 0;
        while ((r = MARCA.exec(t.texto))) { cola.push({ f: t.texto.slice(ult, r.index), p: +r[1] }); ult = MARCA.lastIndex; }
        cola.push({ f: t.texto.slice(ult), p: 0 });
        cola = cola.map(c => ({ f: c.f.replace(/\s+/g, ' ').trim(), p: c.p })).filter(c => c.f || c.p);
        // frases seguidas, sin pausa entre ellas (evita que el navegador corte textos largos)
        cola = cola.flatMap(c => { const fr = c.f.split(/(?<=[.!?»])\s+(?=[«¿¡A-ZÁÉÍÓÚÑ])/); return fr.map((f, k) => ({ f, p: k === fr.length - 1 ? c.p : 0 })); });
        total = cola.reduce((s, c) => s + c.f.length, 0) || 1; hecho = 0; pos = 0;
        siguiente(gen);
      },
      parar() { gen++; activo = false; pausado = false; clearTimeout(espera); ss.cancel(); },
      alternar() {
        if (!activo) return;
        if (pausado) { pausado = false; ss.paused ? ss.resume() : siguiente(gen); }
        else { pausado = true; ss.speaking ? ss.pause() : clearTimeout(espera); }
        m.alCambiar();
      },
      sonando: () => activo && !pausado
    };
    function siguiente(g) {
      if (g !== gen || pausado) return;
      if (pos >= cola.length) { activo = false; m.alAvanzar(1); m.alAcabar(); return; }
      const c = cola[pos];
      if (!c.f) { pos++; espera = setTimeout(() => siguiente(g), c.p * 1000); return; }
      const u = new SpeechSynthesisUtterance(c.f);
      u.voice = voz; u.lang = voz.lang; u.rate = 0.86; u.pitch = esHombre ? 0.92 : 0.8;
      u.onend = () => { if (g !== gen) return; hecho += c.f.length; m.alAvanzar(hecho / total); pos++; espera = setTimeout(() => siguiente(g), c.p * 1000 + 40); };
      u.onerror = e => { if (g === gen && e.error !== 'interrupted' && e.error !== 'canceled') { activo = false; m.alFallar(); } };
      ss.speak(u);
    }
    // Chrome corta frases largas tras ~15 s si no se «despierta» de vez en cuando
    setInterval(() => { if (activo && !pausado && ss.speaking) { ss.pause(); ss.resume(); } }, 12000);
    console.info('[peregrinar] voz del navegador:', voz.name, voz.lang);
    return m;
  }


  // crédito de la música en el pie (solo si se usa el archivo musica.mp3)
  const creditoMusica = () => {
    const m = L.musica, pie = $('.pie-nota'); if (!m || !pie || $('#creditoMusica')) return;
    const p = document.createElement('p'); p.className = 'pie-nota'; p.id = 'creditoMusica';
    p.innerHTML = `Música: «${esc(m.titulo)}», de ${esc(m.autor)}${m.url ? ` (<a href="${esc(m.url)}" target="_blank" rel="noopener">Pixabay</a>)` : ''}.`;
    pie.after(p);
  };

  function crearMusica() {
    let ctx = null, salida = null, fuente = null, sinte = null, el = null;
    // ?v= obliga a los móviles a bajar el archivo nuevo cuando se cambia la música (subir «version» en lugares.js)
    const url = `audio/${L.id}/musica.mp3?v=${L.musica?.version || 1}`;
    return {
      async empezar() {
        if (!ctx) {
          ctx = new (window.AudioContext || window.webkitAudioContext)();
          salida = ctx.createGain(); salida.gain.value = 0; salida.connect(ctx.destination);
          let hay = false;
          try { hay = (await fetch(url, { method: 'HEAD', cache: 'no-store' })).ok; } catch {}
          if (hay) { creditoMusica(); el = new Audio(url); el.loop = true; el.crossOrigin = 'anonymous'; fuente = ctx.createMediaElementSource(el); fuente.connect(salida); }
          else sinte = musicaGenerada(ctx, salida);
        }
        if (ctx.state === 'suspended') await ctx.resume();
        if (el) el.play().catch(() => {});
        sinte?.arrancar();
      },
      parar() {
        if (!ctx) return;
        salida.gain.cancelScheduledValues(ctx.currentTime);
        salida.gain.setTargetAtTime(0, ctx.currentTime, 0.4);
        setTimeout(() => { if (!pref.musica) { el?.pause(); sinte?.parar(); } }, 1800);
      },
      volumen(v) {
        if (!ctx || !pref.musica) return;
        salida.gain.cancelScheduledValues(ctx.currentTime);
        salida.gain.setTargetAtTime(v, ctx.currentTime, v < 0.3 ? 0.35 : 1.4); // baja rápido, sube despacio
      }
    };
  }

  // Música serena generada: acordes en re menor (modo dórico) que cambian cada 12 s,
  // un bordón grave, campanas suaves de vez en cuando y una reverberación amplia.
  function musicaGenerada(ctx, salida) {
    const reverb = ctx.createConvolver(), seco = ctx.createGain(), humedo = ctx.createGain();
    const largo = ctx.sampleRate * 4, imp = ctx.createBuffer(2, largo, ctx.sampleRate);
    for (let c = 0; c < 2; c++) { const d = imp.getChannelData(c); for (let i = 0; i < largo; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / largo, 2.6); }
    reverb.buffer = imp; seco.gain.value = 0.35; humedo.gain.value = 0.9;
    const bus = ctx.createGain(); bus.gain.value = 0.32;
    const filtro = ctx.createBiquadFilter(); filtro.type = 'lowpass'; filtro.frequency.value = 1400; filtro.Q.value = 0.4;
    bus.connect(filtro); filtro.connect(seco); filtro.connect(reverb); reverb.connect(humedo); seco.connect(salida); humedo.connect(salida);
    const hz = m => 440 * Math.pow(2, (m - 69) / 12);
    // Dm(add9) · B♭maj7 · Fadd9 · Csus2 · Gm7 · Dm
    const ACORDES = [[50, 57, 62, 64, 65], [46, 53, 57, 62, 65], [41, 53, 57, 60, 67], [48, 55, 60, 62, 67], [43, 55, 58, 62, 65], [50, 57, 62, 65, 69]];
    const ESCALA = [74, 76, 77, 79, 81, 84, 86];
    let viva = false, paso = 0, temporizador = null, campanas = null, bordon = [];
    function nota(f, t0, dur, vol, tipo = 'sine') {
      const o = ctx.createOscillator(), g = ctx.createGain(); o.type = tipo; o.frequency.value = f; o.detune.value = (Math.random() - 0.5) * 8;
      g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(vol, t0 + dur * 0.35); g.gain.linearRampToValueAtTime(0, t0 + dur);
      o.connect(g); g.connect(bus); o.start(t0); o.stop(t0 + dur + 0.1);
    }
    function acorde() {
      if (!viva) return;
      const t = ctx.currentTime + 0.05, dur = 15;
      ACORDES[paso % ACORDES.length].forEach((m, k) => { nota(hz(m), t, dur, k === 0 ? 0.09 : 0.05, k % 2 ? 'triangle' : 'sine'); nota(hz(m) * 1.003, t, dur, 0.03, 'sine'); });
      paso++; temporizador = setTimeout(acorde, 12000);
    }
    function campana() {
      if (!viva) return;
      const t = ctx.currentTime + 0.05, f = hz(ESCALA[Math.floor(Math.random() * ESCALA.length)]);
      const o = ctx.createOscillator(), g = ctx.createGain(); o.type = 'sine'; o.frequency.value = f;
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.045, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0005, t + 5);
      o.connect(g); g.connect(bus); o.start(t); o.stop(t + 5.2);
      campanas = setTimeout(campana, 5000 + Math.random() * 7000);
    }
    return {
      arrancar() {
        if (viva) return; viva = true;
        bordon = [hz(38), hz(45)].map((f, k) => { const o = ctx.createOscillator(), g = ctx.createGain(); o.type = 'sine'; o.frequency.value = f; g.gain.value = k ? 0.03 : 0.05; o.connect(g); g.connect(bus); o.start(); return o; });
        acorde(); campanas = setTimeout(campana, 4000);
      },
      parar() { viva = false; clearTimeout(temporizador); clearTimeout(campanas); bordon.forEach(o => { try { o.stop(); } catch {} }); bordon = []; }
    };
  }
})();
