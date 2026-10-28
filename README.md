# Peregrinar por dentro

Una serie para rezar desde los lugares de Tierra Santa, vistos en 3D.
Cada lugar empieza con un vuelo sobre un mapa 3D gratuito, desde Tierra Santa entera hasta el sitio, y luego sigue la reflexión al ritmo del scroll.

- Web: https://fjpereirag.github.io/peregrinar-por-dentro/
- Un lugar concreto: `…/peregrinar-por-dentro/?l=getsemani`. Sin `?l=`, se abre el último lugar publicado.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Estructura de la página (no hace falta tocarlo) |
| `estilo.css` | Aspecto visual |
| `app.js` | Mapa 3D, vuelo de cámara, menú y botones |
| `lugares.js` | **Los textos de cada lugar**: aquí se añade el lugar de cada día |
| `config.js` | El token gratuito de Cesium para los edificios en 3D real |
| `voz.js` | Cómo se reparte el texto en audios y dónde van las pausas |
| `audio/<lugar>/` | Los MP3 de la voz (00.mp3, 01.mp3…) |
| `herramienta-voz/` | Herramientas para crear los MP3 en tu ordenador: voz gratuita (`voz-gratis.bat`) o ElevenLabs (`generar-voz.html`) |

## Añadir un lugar nuevo

1. Abre `lugares.js`.
2. Copia el bloque de Getsemaní entero, desde `{` hasta `},`, y pégalo debajo.
3. Cambia `id` (sin espacios ni tildes, por ejemplo `belen`), `numero`, los textos y `coord`. Para sacar las coordenadas, haz clic derecho sobre el lugar en Google Maps o en OpenStreetMap y copia las dos cifras.
4. En cada apartado puedes ajustar la `vista` de la cámara. El archivo explica qué hace cada número.
5. Sube `lugares.js` a GitHub.

## Mapa 3D gratuito, sin claves ni tarjeta

El mapa se monta solo con servicios abiertos y gratuitos, sin registrarse en nada:

- **Relieve del terreno:** Terrain Tiles (Mapzen), alojados por AWS como datos abiertos.
- **Foto aérea:** Esri World Imagery.
- **Edificios:** solo con el token de Cesium (3D real). Sin él, se ven el relieve y la foto aérea, sin cubos.
- **Motor 3D:** MapLibre GL JS, de código abierto.

Si un equipo no puede mostrar 3D, la web enseña el mapa plano de OpenStreetMap. Las autorías salen siempre en la esquina inferior derecha y en el pie de página.

## Edificios en 3D real (gratis, con Cesium ion)

Con un token gratuito de Cesium se ven los edificios, los olivos y el terreno en 3D fotorrealista (los Google Photorealistic 3D Tiles). La cuenta Community es gratuita para uso no comercial e incluye unas 1.000 visitas al mes. Si un mes se agotan, la web pasa sola al mapa gratuito.

1. Crea la cuenta en https://ion.cesium.com/signup (plan **Community**).
2. Ve a **Asset Depot**, busca «Google Photorealistic 3D Tiles» y pulsa **Add to my assets**.
3. Ve a **Access Tokens → Create token**:
   - Nombre: «peregrinar».
   - Deja marcado el permiso `assets:read`.
   - En **Selected assets**, elige «Google Photorealistic 3D Tiles».
   - En **Allowed URLs**, añade `https://fjpereirag.github.io`.
4. Copia el token, pégalo en `config.js` entre las comillas de `tokenCesium: ''` y sube ese archivo.

## La voz

La web tiene tres formas de leer el texto en voz alta, de mejor a más sencilla:

1. **MP3 con voz gratuita de Microsoft (recomendado, sin cuentas).** En la carpeta `herramienta-voz` haz doble clic en **voz-gratis.bat**. Hace falta Python, que se instala gratis desde python.org; al instalarlo, marca «Add Python to PATH». El programa crea `audio/getsemani/00.mp3…07.mp3` con la voz de Álvaro (hombre, España), pausada y grave. Sube la carpeta `audio` a GitHub.
   - Para un lugar nuevo: abre `generar-voz.html`, elige el lugar, pulsa «Descargar guion del lugar», guarda el archivo en `herramienta-voz` y vuelve a hacer doble clic en voz-gratis.bat.
   - Ritmo y tono se cambian al principio de `voz-gratis.py` (`RITMO`, `TONO`).
2. **MP3 con ElevenLabs.** Si algún día tienes cuenta, `generar-voz.html` busca voces, prueba y genera el ZIP con tu clave.
3. **Sin MP3.** Si no hay audios subidos, la web usa la voz del propio móvil u ordenador: gratis, pero la calidad depende del equipo. En Edge, en Windows, suena con la voz natural de Álvaro.

En los tres casos aparecen el botón «Escuchar todo» en la portada y «Escuchar» en cada tarjeta.
