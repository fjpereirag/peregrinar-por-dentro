// Peregrinar por dentro · puerta de acceso con contraseña
// La web espera a que se escriba la clave. Una vez acertada, ese móvil u ordenador la recuerda.
// Para cambiar la clave: calcula su SHA-256 (por ejemplo en https://emn178.github.io/online-tools/sha256.html)
// y pega el resultado en HUELLA. Al cambiarla, todos tendrán que escribir la nueva.
// Aviso: es una puerta en el navegador, no una caja fuerte; quien sepa leer el código puede ver los textos.
(function () {
  const HUELLA = '30c641c8eb93273dc77cfd3a71f890d03e2dcdac17c50ca474f9ba4d59354590';
  const RECUERDO = 'pxd-acceso';
  const leer = () => { try { return localStorage.getItem(RECUERDO); } catch { try { return sessionStorage.getItem(RECUERDO); } catch { return null; } } };
  const guardar = v => { try { localStorage.setItem(RECUERDO, v); } catch { try { sessionStorage.setItem(RECUERDO, v); } catch {} } };
  const huella = async t => {
    const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t));
    return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
  };

  window.puerta = new Promise(abrir => {
    if (leer() === HUELLA) { abrir(); return; }
    document.documentElement.classList.add('cerrado');
    const montar = () => {
      const p = document.createElement('div');
      p.className = 'puerta'; p.setAttribute('role', 'dialog'); p.setAttribute('aria-modal', 'true'); p.setAttribute('aria-labelledby', 'puertaTitulo');
      p.innerHTML = `
        <form class="puerta-in" novalidate>
          <img src="${new URL('logo-revista-tierra-santa.png', document.baseURI)}" width="150" height="65" alt="Revista Tierra Santa" class="puerta-logo">
          <p class="antetitulo">Una serie para rezar desde Tierra Santa</p>
          <h1 id="puertaTitulo">Peregrinar por dentro</h1>
          <label for="puertaClave">Escribe la clave de acceso</label>
          <div class="puerta-fila">
            <input id="puertaClave" type="password" autocomplete="current-password" autocapitalize="off" spellcheck="false" required>
            <button class="btn oro" type="submit">Entrar</button>
          </div>
          <p class="puerta-error" id="puertaError" role="alert" hidden>Esa clave no es correcta. Vuelve a intentarlo.</p>
        </form>`;
      document.body.appendChild(p);
      const f = p.querySelector('form'), c = p.querySelector('#puertaClave'), err = p.querySelector('#puertaError');
      setTimeout(() => c.focus(), 60);
      f.addEventListener('submit', async e => {
        e.preventDefault();
        if (await huella(c.value.trim()) === HUELLA) {
          guardar(HUELLA);
          document.documentElement.classList.remove('cerrado');
          p.remove(); abrir();
        } else { err.hidden = false; c.select(); }
      });
    };
    if (document.body) montar(); else document.addEventListener('DOMContentLoaded', montar);
  });
})();
