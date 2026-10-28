// Peregrinar por dentro · datos de cada lugar
// ---------------------------------------------------------------
// PARA AÑADIR UN LUGAR NUEVO: copia el bloque de Getsemaní entero
// (desde la llave { hasta la llave } con coma), pégalo debajo y cambia
// los textos y las coordenadas. El número 1, 2, 3… marca el orden.
//
// coord:   latitud y longitud del punto principal (Google Maps u OpenStreetMap → clic
//          derecho sobre el lugar → copiar las dos cifras).
// altura:  metros sobre el nivel del mar del suelo en ese punto.
// vista:   cómo mira la cámara en cada apartado:
//            rumbo   0 = mirando al norte, 90 = este, 180 = sur, 270 = oeste
//            incl    inclinación hacia abajo (-10 casi horizontal, -60 muy cenital)
//            dist    distancia en metros al punto
// cita:    referencia bíblica de cada apartado (sale en versalitas bajo el título)
//            gira    true = vuelo de dron en círculo alrededor del lugar
//            vel     velocidad del giro en grados por segundo (4 = una vuelta cada 90 s)
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
    altura: 700,
    vistaInicio: { rumbo: 95, incl: -11, dist: 110, gira: true, vel: 4 },
    secciones: [
      {
        id: 'pregunta',
        cita: 'Mc 14,34',
        vista: { rumbo: 70, incl: -22, dist: 320 },
        parrafos: [
          '¿Alguna vez has rezado y el miedo seguía ahí? Has pedido por alguien, por una situación que no sabes resolver, por una noticia que temes recibir. Y, al terminar, la preocupación continuaba.',
          'Quizá entonces te preguntaste si estabas rezando mal.',
          'Getsemaní nos invita a mirar esa experiencia junto a Jesús.'
        ]
      },
      {
        id: 'lugar',
        cita: 'Mc 14,32-42',
        titulo: 'Un lugar real y una experiencia cercana',
        vista: { rumbo: 100, incl: -8, dist: 80, gira: true, vel: 3 },
        parrafos: [
          'Al pie del monte de los Olivos, en Jerusalén, el huerto de Getsemaní y la basílica de la Agonía recuerdan la oración de Jesús antes de su pasión. La basílica también recibe el nombre de iglesia de las Naciones. Es uno de los lugares donde el peregrino puede detenerse a contemplar la humanidad de Jesús.',
          'Allí, el Evangelio de Marcos muestra a Jesús angustiado. Busca la compañía de Pedro, Santiago y Juan, les pide que permanezcan despiertos y se dirige al Padre. Desea que se aparte de él aquella hora y, al mismo tiempo, se entrega a su voluntad (Mc 14,32-42).'
        ]
      },
      {
        id: 'tal-como-estas',
        cita: 'Mc 14,36',
        titulo: 'Puedes acercarte a Dios tal como estás',
        vista: { rumbo: 150, incl: -28, dist: 110 },
        parrafos: [
          'Al contemplar esta escena, podemos reconocer algo que consuela: sentir miedo no significa haber perdido la fe.',
          'Podemos rezar con la voz temblando. Podemos estar cansados, tener preguntas y desear que las cosas sean distintas. La oración puede comenzar precisamente ahí, donde ya no sabemos qué decir.',
          'No necesitas ordenar primero todo lo que llevas dentro para presentarte ante Dios. Puedes empezar con una frase sencilla: «Esto es lo que me pasa. Esto es lo que me duele».'
        ]
      },
      {
        id: 'compania',
        cita: 'Mc 14,33-34',
        titulo: 'También necesitamos compañía',
        vista: { rumbo: 30, incl: -14, dist: 200 },
        parrafos: [
          'Jesús pide a sus amigos que permanezcan cerca. Ese gesto nos recuerda que necesitar a los demás forma parte de nuestra humanidad.',
          'A veces, acompañar a quien sufre consiste en sentarse a su lado, escuchar sin apresurarse a dar respuestas o llamar cuando han pasado los primeros días y casi todos han vuelto a sus ocupaciones.',
          'La fe también se hace visible en esa presencia discreta.'
        ]
      },
      {
        id: 'vida',
        cita: 'Mc 14,41-42',
        titulo: 'Llevar Getsemaní a nuestra vida',
        // desde el huerto, mirando hacia la ciudad vieja
        vista: { rumbo: 255, incl: -14, dist: 260 },
        parrafos: [
          'Quizá hoy tu oración no termine con una gran sensación de paz. Puedes, aun así, haber dado un paso de confianza al compartir con Dios lo que te pesa.',
          'Confiar también puede tomar la forma de pedir ayuda, aceptar compañía y dejarte cuidar.'
        ]
      }
    ],
    guardar: 'Puedes tener miedo y seguir confiando en Dios.',
    vistaGuardar: { rumbo: 95, incl: -10, dist: 260, gira: true, vel: 2 },
    oracion: [
      'Padre, tú conoces lo que hoy me preocupa.',
      'Ayúdame a hablarte con sinceridad,',
      'a pedir ayuda cuando la necesite',
      'y a estar cerca de quien se siente solo.',
      'Enséñame a confiar en ti, paso a paso.',
      'Amén.'
    ],
    lectura: { cita: 'Marcos 14,32-42', url: 'https://www.ewtn.com/es/biblia/53-marcos/14' },
    whatsapp: `Una mirada a Tierra Santa: Getsemaní

¿Has rezado alguna vez y seguías preocupado?

La oración de Jesús en Getsemaní nos invita a acercarnos a Dios con lo que sentimos, también con nuestros miedos.

Puedes tener miedo y seguir confiando en Dios.

Hoy puedes decirle:
«Padre, esto es lo que me preocupa. Ayúdame a confiar en ti y a dejarme acompañar».

Y si conoces a alguien que está pasando una noche difícil, quizá una llamada tuya le ayude a sentirse menos solo.

Marcos 14,32-42.`
  }
];
