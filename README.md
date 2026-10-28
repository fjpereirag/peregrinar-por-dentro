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
- **Edificios en volumen:** OpenStreetMap, a través de OpenFreeMap.
- **Motor 3D:** MapLibre GL JS, de código abierto.

Si un equipo no puede mostrar 3D, la web enseña el mapa plano de OpenStreetMap. Las autorías salen siempre en la esquina inferior derecha y en el pie de página.
