// Peregrinar por dentro · ajustes generales de la web
// ---------------------------------------------------------------
// canalWhatsapp: enlace del Canal de WhatsApp (en WhatsApp: Novedades → tu canal → Compartir enlace).
//                Mientras esté vacío, los botones «Recibe cada domingo un lugar» no aparecen.
// goatcounter:   el código de tu cuenta de GoatCounter (si tu panel es https://peregrinar.goatcounter.com, pon 'peregrinar').
//                Mientras esté vacío, no se cuentan visitas.
// ---------------------------------------------------------------
window.AJUSTES = {
  canalWhatsapp: 'https://whatsapp.com/channel/0029Vb9TUcU3LdQRguwPWM1Q',
  goatcounter: ''
};

// Contador de visitas GoatCounter: sin cookies ni datos personales, así que no hace falta aviso de cookies.
(function () {
  const A = window.AJUSTES || {};
  // contar(evento): registra acciones (audio, música, compartir…) además de las visitas
  window.contar = function (evento) {
    try { if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: evento, title: evento, event: true }); } catch (e) {}
  };
  // no se cuentan tus revisiones (?previa) ni las pruebas en el ordenador
  if (!A.goatcounter || /localhost|127\.0\.0\.1/.test(location.hostname) || /[?&]previa/.test(location.search)) return;
  // cada lugar se cuenta aparte (?l=nazaret); sin esto todo se sumaría en la portada
  window.goatcounter = { path: () => location.pathname + location.search };
  const s = document.createElement('script');
  s.async = true; s.src = 'https://gc.zgo.at/count.js';
  s.dataset.goatcounter = `https://${A.goatcounter}.goatcounter.com/count`;
  document.head.appendChild(s);
})();
