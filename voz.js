// Peregrinar por dentro · guion de la voz
// Lo usan la web (para reproducir) y la herramienta generar-voz.html (para crear los MP3).
// Cada trozo se guarda en audio/<id del lugar>/<clave>.mp3
// Las pausas usan la marca <break time="…s" /> que entiende ElevenLabs.
(function () {
  const pausa = s => ` <break time="${s}s" /> `;
  const limpia = t => String(t).replace(/\s+/g, ' ').trim();
  window.guionVoz = function (L) {
    const trozos = [];
    trozos.push({ clave: '00', destino: 'inicio', nombre: 'Introducción',
      texto: `${L.nombre}.` + pausa(1.0) + `${limpia(L.titulo)}.` + pausa(1.4) + limpia(L.entradilla) });
    L.secciones.forEach((s, i) => trozos.push({
      clave: String(i + 1).padStart(2, '0'), destino: s.id, nombre: s.titulo || 'Para empezar',
      texto: (s.titulo ? `${limpia(s.titulo)}.` + pausa(1.2) : '') + s.parrafos.map(limpia).join(pausa(1.1))
    }));
    const n = L.secciones.length + 1;
    trozos.push({ clave: String(n).padStart(2, '0'), destino: 'guardar', nombre: 'Para guardar en el corazón',
      texto: 'Para guardar en el corazón.' + pausa(1.4) + limpia(L.guardar) + pausa(1.0) });
    trozos.push({ clave: String(n + 1).padStart(2, '0'), destino: 'oracion', nombre: 'Una oración',
      texto: 'Una oración.' + pausa(1.4) + L.oracion.map(limpia).join(pausa(0.8)) + pausa(1.2) +
        `Para leer despacio: ${limpia(L.lectura.cita).replace(/(\d+),(\d+)-(\d+)/, 'capítulo $1, versículos $2 al $3')}.` });
    return trozos;
  };
})();
