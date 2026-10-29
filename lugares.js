// Peregrinar por dentro · datos de cada lugar
// ---------------------------------------------------------------
// PARA AÑADIR UN LUGAR NUEVO: copia el bloque de Getsemaní entero
// (desde la llave { hasta la llave } con coma), pégalo debajo y cambia
// los textos y las coordenadas. El número 1, 2, 3… marca el orden.
//
// whatsapp: invitación breve (2-3 líneas) que se envía junto al enlace del lugar.
// coord:   latitud y longitud del lugar, para el mapa de situación de la portada
//          (Google Maps u OpenStreetMap → clic derecho sobre el lugar → copiar las dos cifras).
// frase:   la frase más importante de cada apartado; se ve cuando se desmarca «Texto».
// cita:    referencia bíblica de cada apartado (sale en versalitas bajo el título).
// IMÁGENES: van en img/<id>/ con estos nombres (los mismos que los audios):
//            00 portada · 01…05 apartados · 06 frase final · 07 oración
//          00.webp (horizontal, 16:9) y, si quieres, 00-movil.webp (vertical, 9:16).
// imagenes: (opcional) ajuste de cada imagen:
//            foco   qué punto se mantiene a la vista al recortar y hacia dónde se acerca ('50% 50%' = centro)
//            zoom   cuánto se acerca el movimiento lento (1.12 = un 12 %)
// ---------------------------------------------------------------
window.LUGARES = [
  {
    id: 'getsemani',
    numero: 1,
    nombre: 'Getsemaní',
    titulo: 'Cuando rezar no significa dejar de tener miedo',
    entradilla: 'Hay noches en las que la fe apenas consigue pronunciar una frase: «Padre, estoy aquí».',
    ubicacion: 'Monte de los Olivos · Jerusalén',
    coord: [31.77945, 35.23975],
    secciones: [
      {
        id: 'pregunta',
        frase: '¿Alguna vez has rezado y el miedo seguía ahí?',
        cita: 'Mc 14,34',
        parrafos: [
          '¿Alguna vez has rezado y el miedo seguía ahí? Has pedido por alguien, por una situación que no sabes resolver, por una noticia que temes recibir. Y, al terminar, la preocupación continuaba.',
          'Quizá entonces te preguntaste si estabas rezando mal.',
          'Getsemaní nos invita a mirar esa experiencia junto a Jesús.'
        ]
      },
      {
        id: 'lugar',
        frase: 'Desea que se aparte de él aquella hora y, al mismo tiempo, se entrega a su voluntad.',
        cita: 'Mc 14,32-42',
        titulo: 'Un lugar real y una experiencia cercana',
        parrafos: [
          'Al pie del monte de los Olivos, en Jerusalén, el huerto de Getsemaní y la basílica de la Agonía recuerdan la oración de Jesús antes de su pasión. La basílica también recibe el nombre de iglesia de las Naciones. Es uno de los lugares donde el peregrino puede detenerse a contemplar la humanidad de Jesús.',
          'Allí, el Evangelio de Marcos muestra a Jesús angustiado. Busca la compañía de Pedro, Santiago y Juan, les pide que permanezcan despiertos y se dirige al Padre. Desea que se aparte de él aquella hora y, al mismo tiempo, se entrega a su voluntad (Mc 14,32-42).'
        ]
      },
      {
        id: 'tal-como-estas',
        frase: 'Sentir miedo no significa haber perdido la fe.',
        cita: 'Mc 14,36',
        titulo: 'Puedes acercarte a Dios tal como estás',
        parrafos: [
          'Al contemplar esta escena, podemos reconocer algo que consuela: sentir miedo no significa haber perdido la fe.',
          'Podemos rezar con la voz temblando. Podemos estar cansados, tener preguntas y desear que las cosas sean distintas. La oración puede comenzar precisamente ahí, donde ya no sabemos qué decir.',
          'No necesitas ordenar primero todo lo que llevas dentro para presentarte ante Dios. Puedes empezar con una frase sencilla: «Esto es lo que me pasa. Esto es lo que me duele».'
        ]
      },
      {
        id: 'compania',
        frase: 'La fe también se hace visible en esa presencia discreta.',
        cita: 'Mc 14,33-34',
        titulo: 'También necesitamos compañía',
        parrafos: [
          'Jesús pide a sus amigos que permanezcan cerca. Ese gesto nos recuerda que necesitar a los demás forma parte de nuestra humanidad.',
          'A veces, acompañar a quien sufre consiste en sentarse a su lado, escuchar sin apresurarse a dar respuestas o llamar cuando han pasado los primeros días y casi todos han vuelto a sus ocupaciones.',
          'La fe también se hace visible en esa presencia discreta.'
        ]
      },
      {
        id: 'vida',
        frase: 'Confiar también puede tomar la forma de pedir ayuda, aceptar compañía y dejarte cuidar.',
        cita: 'Mc 14,41-42',
        titulo: 'Llevar Getsemaní a nuestra vida',
        parrafos: [
          'Quizá hoy tu oración no termine con una gran sensación de paz. Puedes, aun así, haber dado un paso de confianza al compartir con Dios lo que te pesa.',
          'Confiar también puede tomar la forma de pedir ayuda, aceptar compañía y dejarte cuidar.'
        ]
      }
    ],
    guardar: 'Puedes tener miedo y seguir confiando en Dios.',
    // música de fondo: archivo audio/getsemani/musica.mp3 (si no está, suena la música generada)
    musica: { titulo: 'Light of Gethsemane', autor: 'TokyoRifft', url: 'https://pixabay.com/music/ambient-light-of-gethsemane-470042/' },
    imagenes: {
      '00': { foco: '50% 55%', zoom: 1.12 },
      '02': { foco: '50% 40%', zoom: 1.10 },
      '05': { foco: '60% 45%', zoom: 1.10 }
    },
    oracion: [
      'Padre, tú conoces lo que hoy me preocupa.',
      'Ayúdame a hablarte con sinceridad,',
      'a pedir ayuda cuando la necesite',
      'y a estar cerca de quien se siente solo.',
      'Enséñame a confiar en ti, paso a paso.',
      'Amén.'
    ],
    lectura: { cita: 'Marcos 14,32-42', url: 'https://www.ewtn.com/es/biblia/53-marcos/14' },
    whatsapp: `Una mirada a Tierra Santa: *Getsemaní*

¿Has rezado alguna vez y seguías preocupado?
Te invito a leer esta breve reflexión desde el huerto de los Olivos.`
  }
];
