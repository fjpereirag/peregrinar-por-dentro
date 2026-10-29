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
| `app.js` | Imágenes y su movimiento, mapa de situación, menú y botones |
| `lugares.js` | **Los textos de cada lugar**: aquí se añade el lugar de cada día |
| `img/<lugar>/` | Las imágenes de cada apartado (00.webp … 07.webp) |
| `voz.js` | Cómo se reparte el texto en audios y dónde van las pausas |
| `audio/<lugar>/` | (opcional) Voz en MP3 `01.mp3`…`07.mp3` y música de fondo `musica.mp3` |
| `herramienta-voz/` | Para crear los MP3 de la voz en tu ordenador (`voz-gratis.bat`, gratis) |
| `logo-revista-tierra-santa.png` | Logotipo de la Revista Tierra Santa (portada, «Sigue peregrinando» y pie) |
| `favicon.svg`, `og.jpg`, `404.html` | Icono, imagen al compartir el enlace (1200×630) y página de error con el mismo estilo |
| `herramienta-imagenes/` | Prompts para generar las imágenes y conversor a WebP (`preparar-imagenes.bat`) |

## Añadir un lugar nuevo

1. Abre `lugares.js`.
2. Copia el bloque de Getsemaní entero, desde `{` hasta `},`, y pégalo debajo.
3. Cambia `id` (sin espacios ni tildes, por ejemplo `belen`), `numero`, los textos, las citas y `coord`. Para sacar las coordenadas, haz clic derecho sobre el lugar en Google Maps o en OpenStreetMap y copia las dos cifras.
4. Prepara sus imágenes (apartado de abajo).
5. Sube `lugares.js` y la carpeta `img/<id>` a GitHub.

## Imágenes (creadas con IA)

Cada apartado tiene su propia imagen a pantalla completa, con un movimiento muy lento de acercamiento (efecto de cine). Al bajar, la imagen cambia con un fundido. Arriba a la derecha, un mapa ilustrado marca dónde está el lugar.

1. Abre `herramienta-imagenes/prompts-<lugar>.md`. Para Getsemaní ya está hecho: `prompts-getsemani.md`.
2. En Gemini (Nanobanana), pega el **bloque de estilo** y después el prompt de cada escena. Genera en 16:9 y, si quieres, también en 9:16 para el móvil.
3. Guarda las imágenes en `img/<lugar>/` con su número: `00.png`, `01.png`… `07.png` (y `00-movil.png`… si hiciste verticales).
4. Doble clic en `herramienta-imagenes/preparar-imagenes.bat`: crea los `.webp` ligeros que usa la web.
5. Sube a GitHub los `.webp` de `img/<lugar>/`.

Mientras falte alguna imagen, ese apartado muestra un fondo oscuro con un halo dorado.

Para mover el punto de interés de una imagen o cambiar cuánto se acerca, ajusta `imagenes` en `lugares.js` (`foco` y `zoom`).

## Audio y Música

En la portada, debajo de «Empezar a rezar», hay dos casillas. Se eligen solo al principio; mientras suena el audio o la música, abajo aparece un aviso pequeño con el apartado que se lee y un botón **Detener**.

- **Audio:** lee en voz alta la reflexión desde el apartado en que estás, sin la portada, que es solo para leer. Al terminar cada apartado, baja sola al siguiente. Si bajas o subes por tu cuenta, la voz salta a ese apartado.
  - Con los MP3 en `audio/<lugar>/01.mp3`…`07.mp3` suena esa voz. Se crean con doble clic en `herramienta-voz/voz-gratis.bat`: es gratis, con la voz de Álvaro, y hace falta Python.
  - Sin MP3, usa la voz del propio móvil u ordenador.
- **Música:** suena el archivo `audio/<lugar>/musica.mp3` en bucle, con su crédito en el pie, que se pone en `musica` dentro de `lugares.js`. Para Getsemaní es «Light of Gethsemane», de TokyoRifft (Pixabay, licencia gratuita de Pixabay). Si falta el archivo, suena una música serena generada en el propio navegador.
- **Audio y Música a la vez:** la música baja de volumen mientras habla la voz y vuelve a subir en los silencios.

El texto se ve siempre. Audio y Música empiezan siempre apagadas, porque los navegadores no dejan sonar nada sin que se pulse antes.

## Diseño

La web sigue la variante **pastoral** de las especificaciones Awwwards: «noche, oro y silencio».

- **Fuentes:** dos familias, Cormorant Garamond para los titulares y Source Serif 4 para el texto.
- **Color:** un solo acento oro (`#C9A35B`) sobre noche (`#0B0A08`).
- **Apartados:** cada uno lleva número romano, título que se revela línea a línea, cita bíblica en versalitas y capitular en oro.
- **Valores:** todos salen de las variables de `:root` en `estilo.css`.
