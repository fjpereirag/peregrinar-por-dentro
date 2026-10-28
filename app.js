// Peregrinar por dentro · plantilla de un lugar con mapa 3D gratuito (MapLibre)
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
const estrecho = () => innerWidth <= 760;
const MAPLIBRE = 'https://cdn.jsdelivr.net/npm/maplibre-gl@5.24.0/dist/';
const CESIUM = 'https://cdn.jsdelivr.net/npm/cesium@1.145.0/Build/Cesium/';

// ---------- qué lugar se muestra: ?l=getsemani (por defecto, el último) ----------
const LUGARES = [...(window.LUGARES || [])].sort((a, b) => a.numero - b.numero);
const pedido = new URLSearchParams(location.search).get('l');
const L = LUGARES.find(x => x.id === pedido) || LUGARES[LUGARES.length - 1];
const urlLugar = id => `${location.pathname}?l=${encodeURIComponent(id)}`;

// ---------- texto ----------
document.title = `${L.nombre} · Peregrinar por dentro`;
$('#marcaLugar').textContent = `${L.numero} · ${L.nombre}`;
$('#serie').textContent = `Lugar ${L.numero} · ${L.ubicacion}`;
$('#nombre').textContent = L.nombre;
$('#titulo').textContent = L.titulo;
$('#entradilla').textContent = L.entradilla;
$('#reflexion').innerHTML = L.secciones.map((s, i) => `
  <section class="paso ${i % 2 ? 'derecha' : ''}" id="${esc(s.id)}" data-vista="${i}">
    <article class="tarjeta">
      ${s.titulo ? `<h2>${esc(s.titulo)}</h2>` : `<p class="antetitulo">${esc(L.nombre)}</p>`}
      ${s.parrafos.map(p => `<p>${esc(p)}</p>`).join('')}
    </article>
  </section>`).join('');
$('#frase').textContent = L.guardar;
$('#versos').innerHTML = L.oracion.map(esc).join('<br>');
$('#lectura').href = L.lectura.url;
$('#lectura').innerHTML = `Para leer despacio: <b>${esc(L.lectura.cita)}</b> ↗`;
$('#mensaje').textContent = L.whatsapp;
const textoCompartir = () => `${L.whatsapp}\n\n${location.origin}${urlLugar(L.id)}`;
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

// ---------- vistas de cámara ----------
const vistaDe = clave => clave === 'inicio' ? L.vistaInicio : clave === 'guardar' ? (L.vistaGuardar || L.vistaInicio) : (L.secciones[clave]?.vista || L.vistaInicio);
let camara = null;            // se define si el 3D arranca
let claveActual = 'inicio';

function espiar() {
  const centro = innerHeight * 0.55;
  let clave = 'inicio';
  for (const s of $$('[data-vista]')) { const r = s.getBoundingClientRect(); if (r.top <= centro) clave = s.dataset.vista; }
  if (clave !== claveActual) { claveActual = clave; camara?.ir(vistaDe(clave)); }
  cab.classList.toggle('solida', scrollY > 40);
  const ids = ['inicio', 'reflexion', 'oracion', 'compartir'];
  let act = 'inicio';
  ids.forEach(id => { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top < innerHeight * 0.45) act = id; });
  $$('.menu a').forEach(a => a.classList.toggle('actual', a.getAttribute('href') === '#' + act));
  $('#velo').classList.toggle('lectura', scrollY > innerHeight * 0.5);
}
addEventListener('scroll', espiar, { passive: true });
espiar();

$('#volar').addEventListener('click', () => {
  if (camara) { camara.saltar(VISTA_LEJOS); setTimeout(() => camara.ir(L.vistaInicio, true), 300); }
  else avisar('Este equipo no puede mostrar el mapa en 3D; ves el mapa plano.');
});

// ---------- mapa 3D gratuito y sin claves ----------
// Relieve: Terrain Tiles de AWS (datos abiertos) · Foto aérea: Esri World Imagery
// Sin edificios en volumen (los cubos de OSM se veían falsos) · Motor: MapLibre GL JS (licencia BSD)
const ATRIB = 'Foto aérea: <a href="https://www.esri.com/" target="_blank" rel="noopener">Esri</a>, Maxar, Earthstar Geographics · Relieve: <a href="https://registry.opendata.aws/terrain-tiles/" target="_blank" rel="noopener">Terrain Tiles</a> (Mapzen, AWS)';

function mapaPlano(motivo) {
  document.body.classList.add('modo-2d');
  const [la, lo] = L.coord, d = 0.004;
  $('#mapa').innerHTML = `<iframe title="Mapa de ${esc(L.nombre)}" loading="lazy"
    src="https://www.openstreetmap.org/export/embed.html?bbox=${lo - d},${la - d * .8},${lo + d},${la + d * .8}&layer=mapnik&marker=${la},${lo}"></iframe>`;
  $('#pieMapa').innerHTML = 'Mapa: © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>.';
  if (motivo) console.info('[peregrinar] mapa plano:', motivo);
}
const cargar = (tag, attrs) => new Promise((ok, mal) => { const e = Object.assign(document.createElement(tag), attrs); e.onload = ok; e.onerror = mal; document.head.append(e); });

// distancia en metros (como en lugares.js) → nivel de zoom de MapLibre
const zoomDe = (dist, la) => Math.log2(1.5 * innerHeight * 40075016 * Math.cos(la * Math.PI / 180) / (512 * dist));
const VISTA_LEJOS = { rumbo: 0, incl: -88, dist: 2600000 };

async function arrancarMapLibre() {
  await Promise.all([cargar('script', { src: MAPLIBRE + 'maplibre-gl.js' }), cargar('link', { rel: 'stylesheet', href: MAPLIBRE + 'maplibre-gl.css' })]);
  const ml = window.maplibregl;
  const [la, lo] = L.coord;
  const camaraDe = v => ({ center: [lo, la], zoom: zoomDe(v.dist, la), pitch: Math.max(0, Math.min(80, 90 + v.incl)), bearing: v.rumbo });
  const map = new ml.Map({
    container: 'mapa', interactive: false, attributionControl: false, maxPitch: 85, fadeDuration: 0,
    pixelRatio: Math.min(devicePixelRatio, 2.5), maxTileCacheSize: 600,
    style: {
      version: 8,
      projection: { type: 'globe' },
      sky: { 'sky-color': '#7fa6c9', 'horizon-color': '#e9d3a6', 'fog-color': '#d8c39a', 'sky-horizon-blend': 0.6, 'horizon-fog-blend': 0.6, 'fog-ground-blend': 0.4, 'atmosphere-blend': ['interpolate', ['linear'], ['zoom'], 0, 1, 8, 0.6, 12, 0] },
      sources: {
        foto: { type: 'raster', tileSize: 256, maxzoom: 19, tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'] },
        relieve: { type: 'raster-dem', encoding: 'terrarium', tileSize: 256, maxzoom: 15, tiles: ['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'] }
      },
      layers: [
        { id: 'fondo', type: 'background', paint: { 'background-color': '#140f0b' } },
        { id: 'foto', type: 'raster', source: 'foto', paint: { 'raster-saturation': -0.05, 'raster-contrast': 0.08, 'raster-resampling': 'linear', 'raster-fade-duration': 0 } }
      ],
      terrain: { source: 'relieve', exaggeration: 1.1 }
    },
    ...camaraDe(VISTA_LEJOS)
  });
  map.on('error', e => console.warn('[peregrinar] mapa:', e?.error?.message || e));

  // marcas de todos los lugares de la serie
  LUGARES.forEach(x => {
    const el = document.createElement('div');
    el.className = 'marca-lugar' + (x.id === L.id ? ' actual' : '');
    el.innerHTML = `<i></i><span>${x.numero} · ${esc(x.nombre)}</span>`;
    new ml.Marker({ element: el, anchor: 'bottom' }).setLngLat([x.coord[1], x.coord[0]]).addTo(map);
  });
  map.on('zoom', () => document.body.classList.toggle('cerca', map.getZoom() > 15.2));

  // cámara: vuelos entre vistas y giro lento alrededor del lugar
  let meta = L.vistaInicio, girando = false, ant = 0;
  const giro = t => {
    if (girando && meta.gira && !reducido && !map.isMoving()) map.setBearing(map.getBearing() + Math.min(0.05, (t - ant) / 1000) * 2.2);
    ant = t; requestAnimationFrame(giro);
  };
  requestAnimationFrame(giro);
  map.on('moveend', () => { girando = true; });
  camara = {
    ir(v, vuelo = false) {
      meta = v; girando = false;
      const c = camaraDe(v);
      if (reducido) map.jumpTo(c);
      else map.flyTo({ ...c, duration: vuelo ? 7000 : 2600, curve: vuelo ? 1.6 : 1.2, essential: true });
    },
    saltar(v) { girando = false; map.jumpTo(camaraDe(v)); }
  };
  // primer vuelo: de lejos al lugar (no espera a que carguen todas las teselas)
  let volado = false;
  const volar = () => { if (!volado) { volado = true; camara.ir(vistaDe(claveActual), true); } };
  map.once('load', () => setTimeout(volar, reducido ? 0 : 900));
  setTimeout(volar, 4500);
  $('#pieMapa').innerHTML = 'Mapa 3D gratuito: ' + ATRIB + ' · <a href="https://maplibre.org/" target="_blank" rel="noopener">MapLibre</a>.';
  $('#creditos').innerHTML = ATRIB;
  document.body.classList.add('modo-3d');
}

// ---------- 3D fotorrealista (edificios y olivos reales) con la cuenta gratuita de Cesium ion ----------
// Google Photorealistic 3D Tiles a través de Cesium ion (plan Community: gratis, uso no comercial,
// unas 1.000 visitas al mes). Si falla o se agota, la web pasa sola al mapa gratuito de MapLibre.
async function arrancarCesium(token) {
  window.CESIUM_BASE_URL = CESIUM;
  await Promise.all([cargar('script', { src: CESIUM + 'Cesium.js' }), cargar('link', { rel: 'stylesheet', href: CESIUM + 'Widgets/widgets.css' })]);
  const C = window.Cesium;
  C.Ion.defaultAccessToken = token;
  const tiles = await C.Cesium3DTileset.fromIonAssetId(2275207, { maximumScreenSpaceError: estrecho() ? 16 : 8, skipLevelOfDetail: true, preferLeaves: true });
  const viewer = new C.Viewer('mapa', {
    globe: false, baseLayer: false, baseLayerPicker: false, geocoder: false, homeButton: false, sceneModePicker: false,
    navigationHelpButton: false, animation: false, timeline: false, fullscreenButton: false, infoBox: false,
    selectionIndicator: false, creditContainer: 'creditos', msaaSamples: estrecho() ? 1 : 4, useBrowserRecommendedResolution: false
  });
  viewer.resolutionScale = Math.min(devicePixelRatio, estrecho() ? 2 : 1.5);
  const escena = viewer.scene;
  escena.screenSpaceCameraController.enableInputs = false;
  escena.skyAtmosphere.show = true;
  escena.backgroundColor = C.Color.fromCssColorString('#140f0b');
  escena.primitives.add(tiles);

  const [la, lo] = L.coord;
  const GEOIDE = 20; // en Jerusalén el elipsoide queda unos 20 m por debajo del nivel del mar
  let objetivo = C.Cartesian3.fromDegrees(lo, la, L.altura + GEOIDE);
  setTimeout(async () => {
    try {
      const [p] = await escena.sampleHeightMostDetailed([C.Cartographic.fromDegrees(lo, la)]);
      if (p && Number.isFinite(p.height)) objetivo = C.Cartesian3.fromDegrees(lo, la, p.height + 6);
    } catch {}
  }, 6000);

  LUGARES.forEach(x => viewer.entities.add({
    position: C.Cartesian3.fromDegrees(x.coord[1], x.coord[0], x.altura + GEOIDE),
    point: { pixelSize: x.id === L.id ? 14 : 9, color: C.Color.fromCssColorString('#d9b26a'), outlineColor: C.Color.fromCssColorString('#140f0b'), outlineWidth: 3, disableDepthTestDistance: Number.POSITIVE_INFINITY,
      translucencyByDistance: new C.NearFarScalar(1500, 0, 6000, 1) },
    label: { text: `${x.numero} · ${x.nombre}`, font: '600 15px Inter, sans-serif', fillColor: C.Color.fromCssColorString('#f4ead8'),
      showBackground: true, backgroundColor: C.Color.fromCssColorString('rgba(20,15,11,.78)'), backgroundPadding: new C.Cartesian2(10, 6),
      pixelOffset: new C.Cartesian2(0, -26), disableDepthTestDistance: Number.POSITIVE_INFINITY,
      translucencyByDistance: new C.NearFarScalar(1500, 0, 6000, 1) }
  }));

  // cámara: rumbo/inclinación/distancia que se acercan suavemente a la vista pedida
  const rad = C.Math.toRadians;
  const est = { h: VISTA_LEJOS.rumbo, p: VISTA_LEJOS.incl, ld: Math.log(VISTA_LEJOS.dist) };
  let meta = { ...VISTA_LEJOS }, lento = false, giro = 0;
  camara = {
    ir(v, vuelo = false) { meta = { ...v }; lento = vuelo; giro = 0; },
    saltar(v) { est.h = v.rumbo; est.p = v.incl; est.ld = Math.log(v.dist); meta = { ...v }; giro = 0; }
  };
  let ant = performance.now();
  escena.preRender.addEventListener(() => {
    const ahora = performance.now(), dt = Math.min(0.1, (ahora - ant) / 1000); ant = ahora;
    const k = 1 - Math.exp(-dt * (lento ? 0.5 : 1.0));
    if (meta.gira && !reducido) giro += dt * 2.2;
    const dh = ((meta.rumbo + giro - est.h) % 360 + 540) % 360 - 180;
    est.h += dh * k; est.p += (meta.incl - est.p) * k; est.ld += (Math.log(meta.dist) - est.ld) * k;
    if (lento && Math.abs(est.ld - Math.log(meta.dist)) < 0.05) lento = false;
    viewer.camera.lookAt(objetivo, new C.HeadingPitchRange(rad(est.h), rad(est.p), Math.exp(est.ld)));
  });
  setTimeout(() => camara.ir(vistaDe(claveActual), true), reducido ? 0 : 1600);
  $('#pieMapa').innerHTML = 'Mapa 3D: Google Photorealistic 3D Tiles, servidos por <a href="https://cesium.com/platform/cesium-ion/" target="_blank" rel="noopener">Cesium ion</a> y mostrados con CesiumJS.';
  document.body.classList.add('modo-3d', 'modo-real');
}

const webgl = (() => { try { return !!document.createElement('canvas').getContext('webgl2'); } catch { return false; } })();
const tokenCesium = (window.CONFIG?.tokenCesium || '').trim();
const conMapLibre = () => arrancarMapLibre().catch(e => { console.warn(e); $('#mapa').innerHTML = ''; mapaPlano('error 3D'); });
if (!webgl) mapaPlano('sin WebGL');
else if (tokenCesium) arrancarCesium(tokenCesium).catch(e => {
  console.warn('[peregrinar] Cesium ion no disponible, paso al mapa gratuito:', e);
  $('#mapa').innerHTML = ''; $('#creditos').innerHTML = ''; conMapLibre();
});
else conMapLibre();

// ================= Voz =================
// 1) Si existen audio/<lugar>/00.mp3… se usan esos MP3 (voz gratuita de Microsoft o ElevenLabs).
// 2) Si no, se usa la voz del propio dispositivo (gratis, calidad según el equipo).
(async () => {
  if (!window.guionVoz) return;
  const trozos = guionVoz(L).map(t => ({ ...t, url: `audio/${L.id}/${t.clave}.mp3` }));
  let hayMp3 = false;
  try { hayMp3 = (await fetch(trozos[0].url, { method: 'HEAD', cache: 'no-store' })).ok; } catch {}

  // --- motor: MP3 o voz del navegador, con la misma interfaz ---
  const motor = hayMp3 ? motorMp3() : await motorNavegador();
  if (!motor) return;

  const rp = $('#reproductor'), btnPausa = $('#rpPausa');
  let actual = -1, seguido = false;
  const destino = t => document.getElementById(t.destino);

  trozos.forEach((t, i) => {
    if (t.destino === 'inicio') return; // en la portada está «Escuchar todo»
    const el = destino(t); if (!el) return;
    const sitio = el.querySelector('.tarjeta, .guardar-in') || el;
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'btn-oir'; b.dataset.i = i;
    b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg><span>Escuchar</span>';
    sitio.append(b);
  });
  $('#escucharTodo').hidden = false;

  const pintar = () => {
    const pausado = !motor.sonando();
    $$('.btn-oir').forEach(b => { const si = Number(b.dataset.i) === actual && !pausado; b.classList.toggle('sonando', si); b.querySelector('span').textContent = si ? 'Pausar' : 'Escuchar'; });
    rp.classList.toggle('en-pausa', pausado);
    btnPausa.setAttribute('aria-label', pausado ? 'Seguir' : 'Pausar');
  };
  const irA = el => {
    if (el.id === 'inicio') return scrollTo({ top: 0, behavior: reducido ? 'auto' : 'smooth' });
    const t = el.querySelector('.tarjeta, blockquote') || el, r = t.getBoundingClientRect();
    scrollTo({ top: r.top + scrollY - Math.max(80, (innerHeight - r.height) / 2), behavior: reducido ? 'auto' : 'smooth' });
  };
  function tocar(i, desplazar) {
    if (i < 0 || i >= trozos.length) { parar(); return; }
    actual = i; const t = trozos[i];
    motor.tocar(t);
    rp.hidden = false; $('#rpTitulo').textContent = t.nombre;
    $('#rpModo').textContent = (seguido ? `Escuchando · ${i + 1} de ${trozos.length}` : 'Escuchando');
    if (desplazar) { const el = destino(t); if (el) irA(el); }
    pintar();
  }
  function parar() { motor.parar(); actual = -1; seguido = false; rp.hidden = true; pintar(); }
  motor.alAcabar = () => { if (seguido) setTimeout(() => tocar(actual + 1, true), 900); else { actual = -1; rp.hidden = true; } pintar(); };
  motor.alCambiar = pintar;
  motor.alAvanzar = f => { $('#rpBarra').style.width = (f * 100).toFixed(1) + '%'; };
  motor.alFallar = () => { avisar('No se ha podido reproducir este apartado.'); if (seguido) tocar(actual + 1, true); else parar(); };

  document.addEventListener('click', e => {
    const b = e.target.closest('.btn-oir'); if (!b) return;
    const i = Number(b.dataset.i);
    if (i === actual) { motor.alternar(); pintar(); return; }
    seguido = false; tocar(i, false);
  });
  $('#escucharTodo').addEventListener('click', () => { seguido = true; tocar(0, true); });
  btnPausa.addEventListener('click', () => { motor.alternar(); pintar(); });
  $('#rpSiguiente').addEventListener('click', () => tocar(actual + 1, seguido));
  $('#rpCerrar').addEventListener('click', parar);
  addEventListener('pagehide', () => motor.parar());

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
      u.onend = () => { if (g !== gen) return; hecho += c.f.length; m.alAvanzar(hecho / total); pos++; espera = setTimeout(() => siguiente(g), c.p * 1000 + 150); };
      u.onerror = e => { if (g === gen && e.error !== 'interrupted' && e.error !== 'canceled') { activo = false; m.alFallar(); } };
      ss.speak(u);
    }
    // Chrome corta frases largas tras ~15 s si no se «despierta» de vez en cuando
    setInterval(() => { if (activo && !pausado && ss.speaking) { ss.pause(); ss.resume(); } }, 12000);
    console.info('[peregrinar] voz del navegador:', voz.name, voz.lang);
    return m;
  }
})();
