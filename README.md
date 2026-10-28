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
| `herramienta-voz/generar-voz.html` | Herramienta para crear los MP3 con ElevenLabs (se usa en tu ordenador) |

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
- **Edificios en volumen:** OpenStreetMap, a través de OpenFreeMap (si no hay token de Cesium).
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

## La voz (ElevenLabs)

1. Abre `herramienta-voz/generar-voz.html` en tu ordenador, con doble clic, dentro de esta misma carpeta.
2. Pega tu clave de ElevenLabs. Está en elevenlabs.io → tu perfil → API Keys.
3. Elige el lugar y busca una voz: «Buscar voces de España» muestra hombres de edad madura o mayor. Escucha las muestras y pulsa «Elegir».
4. Ajusta el ritmo y pulsa «Probar». Cuando te guste, pulsa «Generar todos los apartados» y luego «Descargar ZIP».
5. Descomprime el ZIP en esta carpeta, se crea `audio/<lugar>/`, y arrastra la carpeta `audio` a GitHub.

En cuanto los MP3 están subidos, la web muestra sola el botón «Escuchar todo» en la portada y «Escuchar» en cada tarjeta. Mientras no los subas, no aparecen.
