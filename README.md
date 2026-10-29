# Peregrinar por dentro

Una serie para rezar desde los lugares de Tierra Santa.
Cada lugar se recorre con imágenes creadas con IA, una por apartado, con movimiento de cine lento, y la reflexión al ritmo del scroll.

- Web: https://fjpereirag.github.io/peregrinar-por-dentro/
- Un lugar concreto: `…/peregrinar-por-dentro/?l=emaus`. Sin `?l=`, se abre el último lugar publicado.
- Enlace para compartir cada lugar: `…/peregrinar-por-dentro/emaus/` o `…/getsemani/`. Es una página corta que da a WhatsApp la vista previa de ese lugar (título e imagen `og-<lugar>.jpg`) y lleva enseguida a la web.

Lugares preparados: **I · Getsemaní**, **II · Emaús** (El Qubeibeh, el santuario franciscano de la Custodia), **III · Nazaret** (1 nov), **IV · El Templo de Jerusalén** (8 nov), **V · Dominus Flevit** (15 nov), **VI · Siquén** (22 nov) y **VII · El monte Carmelo** (29 nov). Las fechas siguen `calendario.md`.

## Qué lugares se ven (lo decides tú)

En `lugares.js`, cada lugar tiene dos interruptores:

- `activo: true` lo deja ver a partir de su fecha; `activo: false` lo retira de la web, aunque ya haya salido.
- `publicar: '2026-11-01'` es el día en que sale.

## Un lugar nuevo cada semana

El orden y las fechas de los 40 lugares están en `calendario.md`, siguiendo el año litúrgico.

En la portada y en «Otros lugares» se indica el próximo lugar y su fecha («Próximo lugar: Nazaret, el domingo 1 de noviembre»). Solo aparece si ese lugar ya está en `lugares.js`.

Si alguien abre el enlace de un lugar que todavía no ha salido, la web le avisa («Nazaret se publica el domingo 1 de noviembre») y le muestra el lugar actual.

Cada lugar lleva en `lugares.js` su fecha de salida: `publicar: '2026-11-01'` (año-mes-día).

- Antes de esa fecha, el lugar no aparece: ni en la portada, ni en la serie, ni en el mapa.
- Ese día, la portada abre sola el lugar nuevo. Los anteriores quedan en «Otros lugares».
- Así puedes subir a GitHub varias semanas por adelantado.
- Para revisar un lugar antes de que salga, abre `…/peregrinar-por-dentro/?l=nazaret&previa`.
- La fecha se cuenta en el reloj del móvil u ordenador de quien lo abre: sale a medianoche de cada país.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Estructura de la página (no hace falta tocarlo) |
| `estilo.css` | Aspecto visual |
| `app.js` | Imágenes y su movimiento, mapa de situación, menú y botones |
| `calendario.md` | Orden y fechas de publicación de los 40 lugares |
| `lugares.js` | **Los textos de cada lugar**: aquí se añade el lugar de cada día |
| `img/<lugar>/` | Las imágenes de cada apartado (00.webp … 07.webp) |
| `voz.js` | Cómo se reparte el texto en audios y dónde van las pausas |
| `audio/<lugar>/` | (opcional) Voz en MP3 `01.mp3`…`07.mp3` y música de fondo `musica.mp3` |
| `herramienta-voz/` | Para crear los MP3 de la voz en tu ordenador (`voz-gratis.bat`, gratis) |
| `logo-revista-tierra-santa.png` | Logotipo de la Revista Tierra Santa (portada, «Sigue peregrinando» y pie) |
| `favicon.svg`, `og.jpg`, `404.html` | Icono, imagen al compartir la web de la serie (1200×630) y página de error con el mismo estilo |
| `<lugar>/index.html`, `og-<lugar>.jpg` | Página para compartir cada lugar y su imagen de vista previa |
| `herramienta-imagenes/` | Prompts para generar las imágenes y conversor a WebP (`preparar-imagenes.bat`) |

## Añadir un lugar nuevo

1. Abre `lugares.js`.
2. Copia el bloque de Getsemaní entero, desde `{` hasta `},`, y pégalo debajo.
3. Cambia `id` (sin espacios ni tildes, por ejemplo `belen`), `numero`, `publicar`, los textos, las citas y `coord`. Para sacar las coordenadas, haz clic derecho sobre el lugar en Google Maps o en OpenStreetMap y copia las dos cifras.
4. Prepara sus imágenes (apartado de abajo). Hay una por apartado; después van la frase y la oración. Con 5 apartados son `06` y `07`; con 6, `07` y `08`.
5. Crea la página para compartir: copia la carpeta `emaus/` con el nombre del `id` nuevo y cambia dentro el nombre, el título, la descripción y `emaus` por el `id`. Hace falta también su imagen `og-<id>.jpg` (1200×630); pídemela y te la preparo.
6. Para la voz, crea `herramienta-voz/guion-<id>.json` con `generar-voz.html` (o pídemelo) y luego doble clic en `voz-gratis.bat`.
7. Sube a GitHub `lugares.js`, la carpeta `img/<id>`, la carpeta `<id>/` y `og-<id>.jpg`.

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
- **Música:** suena el archivo `audio/<lugar>/musica.mp3` en bucle, con su crédito en el pie, que se pone en `musica` dentro de `lugares.js`. Para Getsemaní es «Light of Gethsemane», de TokyoRifft, para Emaús «Emmaus – Did not our heart burn within us?», de Misselle, y para Nazaret «The Day the Angels Greeted Mary», de TokyoRifft (todas de Pixabay, con su licencia gratuita). Con `volumen` en `musica` se ajusta cada pieza: 1 es lo normal y 0.7, más baja. Si falta el archivo, suena una música serena generada en el propio navegador. **Si cambias `musica.mp3`, sube el número de `version` en `musica`** (2, 3, 4…); si no, los móviles pueden seguir usando la música antigua.
- **Audio y Música a la vez:** la música baja de volumen mientras habla la voz y vuelve a subir en los silencios.

El texto se ve siempre. Audio y Música empiezan siempre apagadas, porque los navegadores no dejan sonar nada sin que se pulse antes.

## Ver mejor las imágenes en el móvil

En el móvil, cada apartado y la oración tienen arriba a la derecha el botón **Ver la imagen**. Al pulsarlo se recogen los textos de todos los apartados y solo quedan el número, el título y la cita, para que se vea la imagen. Con **Leer el texto** vuelven a salir enteros. El texto nunca se quita.

## Diseño

La web sigue la variante **pastoral** de las especificaciones Awwwards: «noche, oro y silencio».

- **Fuentes:** dos familias, Cormorant Garamond para los titulares y Source Serif 4 para el texto.
- **Color:** un solo acento oro (`#C9A35B`) sobre noche (`#0B0A08`).
- **Apartados:** cada uno lleva número romano, título que se revela línea a línea, cita bíblica en versalitas y capitular en oro.
- **Valores:** todos salen de las variables de `:root` en `estilo.css`.
