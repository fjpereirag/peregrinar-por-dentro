# Peregrinar por dentro

Una serie para rezar desde los lugares de Tierra Santa.
Cada lugar se recorre con imágenes creadas con IA, una por apartado, con movimiento de cine lento, y la reflexión al ritmo del scroll.

- Web: https://fjpereirag.github.io/peregrinar-por-dentro/
- Un lugar concreto: `…/peregrinar-por-dentro/?l=getsemani`. Sin `?l=`, se abre el último lugar publicado.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Estructura de la página (no hace falta tocarlo) |
| `estilo.css` | Aspecto visual |
| `app.js` | Imágenes y su movimiento, mapa de situación, menú, voz y botones |
| `lugares.js` | **Los textos de cada lugar**: aquí se añade el lugar de cada día |
| `voz.js` | Cómo se reparte el texto en audios y dónde van las pausas |
| `img/<lugar>/` | Las imágenes de cada apartado (00.webp … 07.webp) |
| `audio/<lugar>/` | Los MP3 de la voz (00.mp3, 01.mp3…) |
| `favicon.svg`, `og.jpg`, `404.html` | Icono, imagen al compartir el enlace (1200×630) y página de error con el mismo estilo |
| `herramienta-imagenes/` | Prompts para generar las imágenes y conversor a WebP (`preparar-imagenes.bat`) |
| `herramienta-voz/` | Herramientas para crear los MP3 en tu ordenador: voz gratuita (`voz-gratis.bat`) o ElevenLabs (`generar-voz.html`) |

## Añadir un lugar nuevo

1. Abre `lugares.js`.
2. Copia el bloque de Getsemaní entero, desde `{` hasta `},`, y pégalo debajo.
3. Cambia `id` (sin espacios ni tildes, por ejemplo `belen`), `numero`, los textos, las citas y `coord`. Para sacar las coordenadas, haz clic derecho sobre el lugar en Google Maps o en OpenStreetMap y copia las dos cifras.
4. Prepara sus imágenes y su voz (apartados de abajo).
5. Sube `lugares.js`, la carpeta `img/<id>` y la carpeta `audio/<id>` a GitHub.

## Imágenes (creadas con IA)

Cada apartado tiene su propia imagen a pantalla completa, con un movimiento muy lento de acercamiento (efecto de cine). Al bajar, la imagen cambia con un fundido. Arriba a la derecha, un mapa ilustrado marca dónde está el lugar.

1. Abre `herramienta-imagenes/prompts-<lugar>.md`. Para Getsemaní ya está hecho: `prompts-getsemani.md`.
2. En Gemini (Nanobanana), pega el **bloque de estilo** y después el prompt de cada escena. Genera en 16:9 y, si quieres, también en 9:16 para el móvil.
3. Guarda las imágenes en `img/<lugar>/` con su número: `00.png`, `01.png`… `07.png` (y `00-movil.png`… si hiciste verticales).
4. Doble clic en `herramienta-imagenes/preparar-imagenes.bat`: crea los `.webp` ligeros que usa la web.
5. Sube a GitHub los `.webp` de `img/<lugar>/`.

Mientras falte alguna imagen, ese apartado muestra un fondo oscuro con un halo dorado.

Para mover el punto de interés de una imagen o cambiar cuánto se acerca, ajusta `imagenes` en `lugares.js` (`foco` y `zoom`).

## La voz

La web tiene tres formas de leer el texto en voz alta, de mejor a más sencilla:

1. **MP3 con voz gratuita de Microsoft (recomendado, sin cuentas).** En la carpeta `herramienta-voz` haz doble clic en **voz-gratis.bat**. Hace falta Python, que se instala gratis desde python.org; al instalarlo, marca «Add Python to PATH». El programa crea `audio/getsemani/00.mp3…07.mp3` con la voz de Álvaro (hombre, España), pausada y grave. Sube la carpeta `audio` a GitHub.
   - Para un lugar nuevo: abre `generar-voz.html`, elige el lugar, pulsa «Descargar guion del lugar», guarda el archivo en `herramienta-voz` y vuelve a hacer doble clic en voz-gratis.bat.
   - Ritmo y tono se cambian al principio de `voz-gratis.py` (`RITMO`, `TONO`).
2. **MP3 con ElevenLabs.** Si algún día tienes cuenta, `generar-voz.html` busca voces, prueba y genera el ZIP con tu clave.
3. **Sin MP3.** Si no hay audios subidos, la web usa la voz del propio móvil u ordenador: gratis, pero la calidad depende del equipo. En Edge, en Windows, suena con la voz natural de Álvaro.

En los tres casos aparecen el botón «Escuchar todo» en la portada y «Escuchar» en cada tarjeta.

## Diseño

La web sigue la variante **pastoral** de las especificaciones Awwwards: «noche, oro y silencio».

- **Fuentes:** dos familias, Cormorant Garamond para los titulares y Source Serif 4 para el texto.
- **Color:** un solo acento oro (`#C9A35B`) sobre noche (`#0B0A08`).
- **Apartados:** cada uno lleva número romano, título que se revela línea a línea, cita bíblica en versalitas, capitular en oro y una pausa final.
- **Valores:** todos salen de las variables de `:root` en `estilo.css`.
