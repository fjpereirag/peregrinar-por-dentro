// Peregrinar por dentro · plantilla de un lugar con mapa 3D gratuito (MapLibre)
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
const estrecho = () => innerWidth <= 760;
const MAPLIBRE = 'https://cdn.jsdelivr.net/npm/maplibre-gl@5.24.0/dist/';

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

async function arrancar3D() {
  await Promise.all([cargar('script', { src: MAPLIBRE + 'maplibre-gl.js' }), cargar('link', { rel: 'stylesheet', href: MAPLIBRE + 'maplibre-gl.css' })]);
  const ml = window.maplibregl;
  const [la, lo] = L.coord;
  const camaraDe = v => ({ center: [lo, la], zoom: zoomDe(v.dist, la), pitch: Math.max(0, Math.min(80, 90 + v.incl)), bearing: v.rumbo });
  const map = new ml.Map({
    container: 'mapa', interactive: false, attributionControl: false, maxPitch: 85, fadeDuration: 0,
    pixelRatio: Math.min(devicePixelRatio, estrecho() ? 1.5 : 2),
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
        { id: 'foto', type: 'raster', source: 'foto', paint: { 'raster-saturation': -0.08, 'raster-contrast': 0.06 } },
        { id: 'edificios', type: 'fill-extrusion', source: 'osm', 'source-layer': 'building', minzoom: 15,
          paint: { 'fill-extrusion-color': '#e8d6b4', 'fill-extrusion-height': ['coalesce', ['get', 'render_height'], 6], 'fill-extrusion-base': ['coalesce', ['get', 'render_min_height'], 0],
            'fill-extrusion-opacity': ['interpolate', ['linear'], ['zoom'], 15, 0, 16.5, 0.55] } }
      ],
      terrain: { source: 'relieve', exaggeration: 1.15 }
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

const webgl = (() => { try { return !!document.createElement('canvas').getContext('webgl2'); } catch { return false; } })();
if (!webgl) mapaPlano('sin WebGL');
else arrancar3D().catch(e => { console.warn(e); $('#mapa').innerHTML = ''; mapaPlano('error 3D'); });
