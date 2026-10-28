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
// Edificios: OpenStreetMap vía OpenFreeMap · Motor: MapLibre GL JS (licencia BSD)
const ATRIB = 'Foto aérea: <a href="https://www.esri.com/" target="_blank" rel="noopener">Esri</a>, Maxar, Earthstar Geographics · Relieve: <a href="https://registry.opendata.aws/terrain-tiles/" target="_blank" rel="noopener">Terrain Tiles</a> (Mapzen, AWS) · Edificios: © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>, <a href="https://openfreemap.org/" target="_blank" rel="noopener">OpenFreeMap</a>';

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
        relieve: { type: 'raster-dem', encoding: 'terrarium', tileSize: 256, maxzoom: 15, tiles: ['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'] },
        osm: { type: 'vector', url: 'https://tiles.openfreemap.org/planet' }
      },
      layers: [
        { id: 'fondo', type: 'background', paint: { 'background-color': '#140f0b' } },
        { id: 'foto', type: 'raster', source: 'foto', paint: { 'raster-saturation': -0.05, 'raster-contrast': 0.08, 'raster-resampling': 'linear', 'raster-fade-duration': 0 } },
        { id: 'edificios', type: 'fill-extrusion', source: 'osm', 'source-layer': 'building', minzoom: 14.5,
          paint: { 'fill-extrusion-color': ['interpolate', ['linear'], ['coalesce', ['get', 'render_height'], 6], 0, '#cdb892', 20, '#e6d5b2', 40, '#f2e6cc'],
            'fill-extrusion-height': ['coalesce', ['get', 'render_height'], 7], 'fill-extrusion-base': ['coalesce', ['get', 'render_min_height'], 0],
            'fill-extrusion-vertical-gradient': true,
            'fill-extrusion-opacity': ['interpolate', ['linear'], ['zoom'], 14.5, 0, 15.5, 0.92] } }
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

// ================= Voz (MP3 de ElevenLabs en audio/<lugar>/) =================
(async () => {
  if (!window.guionVoz) return;
  const trozos = guionVoz(L).map(t => ({ ...t, url: `audio/${L.id}/${t.clave}.mp3` }));
  try { const r = await fetch(trozos[0].url, { method: 'HEAD', cache: 'no-store' }); if (!r.ok) return; } catch { return; }

  const audio = new Audio(); audio.preload = 'none';
  const rp = $('#reproductor'), btnPausa = $('#rpPausa');
  let actual = -1, seguido = false;
  const destino = t => document.getElementById(t.destino);
  const botonDe = i => $(`.btn-oir[data-i="${i}"]`);

  // botón en cada tarjeta
  trozos.forEach((t, i) => {
    const el = destino(t); if (!el) return;
    const sitio = el.querySelector('.tarjeta, .guardar-in, .portada-in .acciones') || el;
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'btn-oir'; b.dataset.i = i;
    b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg><span>Escuchar</span>';
    if (t.destino === 'inicio') return; // en la portada está «Escuchar todo»
    sitio.append(b);
  });
  $('#escucharTodo').hidden = false;

  const pintar = () => {
    $$('.btn-oir').forEach(b => { const si = Number(b.dataset.i) === actual && !audio.paused; b.classList.toggle('sonando', si); b.querySelector('span').textContent = si ? 'Pausar' : 'Escuchar'; });
    rp.classList.toggle('en-pausa', audio.paused);
    btnPausa.setAttribute('aria-label', audio.paused ? 'Seguir' : 'Pausar');
  };
  const irA = el => {
    if (el.id === 'inicio') return scrollTo({ top: 0, behavior: reducido ? 'auto' : 'smooth' });
    const t = el.querySelector('.tarjeta, blockquote') || el, r = t.getBoundingClientRect();
    scrollTo({ top: r.top + scrollY - Math.max(80, (innerHeight - r.height) / 2), behavior: reducido ? 'auto' : 'smooth' });
  };
  function tocar(i, desplazar) {
    if (i < 0 || i >= trozos.length) { parar(); return; }
    actual = i; const t = trozos[i];
    audio.src = t.url; audio.play().catch(() => avisar('Pulsa de nuevo para escuchar.'));
    rp.hidden = false; $('#rpTitulo').textContent = t.nombre; $('#rpModo').textContent = seguido ? `Escuchando · ${i + 1} de ${trozos.length}` : 'Escuchando';
    if (desplazar) { const el = destino(t); if (el) irA(el); }
    pintar();
  }
  function parar() { audio.pause(); audio.removeAttribute('src'); actual = -1; seguido = false; rp.hidden = true; pintar(); }

  document.addEventListener('click', e => {
    const b = e.target.closest('.btn-oir'); if (!b) return;
    const i = Number(b.dataset.i);
    if (i === actual) { audio.paused ? audio.play() : audio.pause(); pintar(); return; }
    seguido = false; tocar(i, false);
  });
  $('#escucharTodo').addEventListener('click', () => { seguido = true; tocar(0, true); });
  btnPausa.addEventListener('click', () => { audio.paused ? audio.play() : audio.pause(); pintar(); });
  $('#rpSiguiente').addEventListener('click', () => tocar(actual + 1, seguido));
  $('#rpCerrar').addEventListener('click', parar);
  audio.addEventListener('ended', () => { if (seguido) setTimeout(() => tocar(actual + 1, true), 900); else { actual = -1; rp.hidden = true; pintar(); } });
  audio.addEventListener('timeupdate', () => { $('#rpBarra').style.width = (audio.duration ? audio.currentTime / audio.duration * 100 : 0) + '%'; });
  audio.addEventListener('play', pintar); audio.addEventListener('pause', pintar);
  audio.addEventListener('error', () => { if (actual >= 0) { avisar('No se encuentra el audio de este apartado.'); if (seguido) tocar(actual + 1, true); else parar(); } });
})();
