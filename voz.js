// Peregrinar por dentro · guion de la voz
// Lo usan la web (para reproducir) y la herramienta generar-voz.html (para crear los MP3).
// Cada trozo se guarda en audio/<id del lugar>/<clave>.mp3
// Las pausas usan la marca <break time="…s" /> que entiende ElevenLabs.
(function () {
  const pausa = s => ` <break time="${s}s" /> `;
  const limpia = t => String(t).replace(/\s+/g, ' ').trim();
  // Citas bíblicas dichas en voz alta: «(Lc 24,13-35)» → «Lucas, capítulo 24, versículos 13 al 35»
  const LIBROS = {
    'Mt': 'Mateo', 'Mc': 'Marcos', 'Lc': 'Lucas', 'Jn': 'Juan', 'Hch': 'Hechos de los Apóstoles', 'Rom': 'Romanos', 'Rm': 'Romanos',
    'Gn': 'Génesis', 'Éx': 'Éxodo', 'Ex': 'Éxodo', 'Lv': 'Levítico', 'Nm': 'Números', 'Dt': 'Deuteronomio', 'Jos': 'Josué', 'Jue': 'Jueces',
    '1 Sam': 'primer libro de Samuel', '2 Sam': 'segundo libro de Samuel', '1 Re': 'primer libro de los Reyes', '2 Re': 'segundo libro de los Reyes',
    '1 Reyes': 'primer libro de los Reyes', '2 Reyes': 'segundo libro de los Reyes', 'Sal': 'Salmo', 'Is': 'Isaías', 'Jr': 'Jeremías', 'Ez': 'Ezequiel'
  };
  // también los nombres completos (como en «Para leer despacio: Marcos 14,32-42»)
  ['Mateo', 'Marcos', 'Lucas', 'Juan', 'Romanos', 'Génesis', 'Éxodo', 'Levítico', 'Números', 'Deuteronomio', 'Josué', 'Jueces', 'Salmo', 'Isaías', 'Jeremías', 'Ezequiel']
    .forEach(n => { LIBROS[n] = n; });
  LIBROS['Hechos de los Apóstoles'] = 'Hechos de los Apóstoles';
  const LIBRO = Object.keys(LIBROS).sort((a, b) => b.length - a.length).map(k => k.replace(/ /g, '\\s')).join('|');
  const CITA = new RegExp(`\\b(${LIBRO})\\.?\\s(\\d+),(\\d+)(?:-(\\d+))?`, 'g');
  const cita = (lib, c, v1, v2) => `${LIBROS[lib.replace(/\s+/g, ' ')]}, capítulo ${c}, ${v2 ? `versículos ${v1} al ${v2}` : `versículo ${v1}`}`;
  // entre paréntesis dentro del texto: se dice como una frase aparte, tras un punto
  const citaHablada = t => t
    .replace(new RegExp(`\\s*\\((${LIBRO})\\.?\\s(\\d+),(\\d+)(?:-(\\d+))?\\)\\.?`, 'g'), (_, l, c, a, b) => { const d = cita(l, c, a, b); return `. ${d.charAt(0).toUpperCase()}${d.slice(1)}.`; })
    .replace(CITA, (_, l, c, a, b) => cita(l, c, a, b));
  window.guionVoz = function (L) {
    const trozos = [];
    trozos.push({ clave: '00', destino: 'inicio', nombre: 'Introducción',
      texto: `${L.nombre}.` + pausa(1.0) + `${limpia(L.titulo)}.` + pausa(1.4) + limpia(L.entradilla) });
    L.secciones.forEach((s, i) => trozos.push({
      clave: String(i + 1).padStart(2, '0'), destino: s.id, nombre: s.titulo || 'Para empezar',
      // sin pausas dentro del apartado, para que la escucha sea ágil
      texto: (s.titulo ? `${limpia(s.titulo)}. ` : '') + citaHablada(s.parrafos.map(limpia).join(' '))
    }));
    const n = L.secciones.length + 1;
    trozos.push({ clave: String(n).padStart(2, '0'), destino: 'guardar', nombre: 'Para guardar en el corazón',
      texto: 'Para guardar en el corazón. ' + limpia(L.guardar) });
    trozos.push({ clave: String(n + 1).padStart(2, '0'), destino: 'oracion', nombre: 'Una oración',
      texto: 'Una oración. ' + L.oracion.map(limpia).join(' ') + ' ' +
        `Para leer despacio: ${citaHablada(limpia(L.lectura.cita))}.` });
    return trozos;
  };
})();
