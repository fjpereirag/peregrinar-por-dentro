// Peregrinar por dentro · datos de cada lugar
// ---------------------------------------------------------------
// PARA AÑADIR UN LUGAR NUEVO: copia el bloque de Getsemaní entero
// (desde la llave { hasta la llave } con coma), pégalo debajo y cambia
// los textos y las coordenadas. El número 1, 2, 3… marca el orden.
//
// publicar: día en que sale el lugar (AAAA-MM-DD). Antes no se ve; para revisarlo, ?l=<id>&previa
// activo:   true = se ve (a partir de su fecha) · false = retirado de la web, aunque haya llegado la fecha
// whatsapp: invitación breve (2-3 líneas) que se envía junto al enlace del lugar.
// coord:   latitud y longitud del lugar, para el mapa de situación de la portada
//          (Google Maps u OpenStreetMap → clic derecho sobre el lugar → copiar las dos cifras).
// cita:    referencia bíblica de cada apartado (sale en versalitas bajo el título).
// IMÁGENES: van en img/<id>/ con estos nombres (los mismos que los audios):
//            00 portada · 01, 02… un número por apartado · después, la frase final y la oración
//            (Getsemaní, 5 apartados: 06 frase, 07 oración · Emaús, 6 apartados: 07 frase, 08 oración)
//          00.webp (horizontal, 16:9) y, si quieres, 00-movil.webp (vertical, 9:16).
// imagenes: (opcional) ajuste de cada imagen:
//            foco   qué punto se mantiene a la vista al recortar y hacia dónde se acerca ('50% 50%' = centro)
//            zoom   cuánto se acerca el movimiento lento (1.12 = un 12 %)
// ---------------------------------------------------------------
window.LUGARES = [
  {
    id: 'getsemani',
    numero: 1,
    publicar: '2026-10-28',
    activo: true,
    nombre: 'Getsemaní',
    titulo: 'Cuando rezar no significa dejar de tener miedo',
    entradilla: 'Hay noches en las que la fe apenas consigue pronunciar una frase: «Padre, estoy aquí».',
    ubicacion: 'Monte de los Olivos · Jerusalén',
    coord: [31.77945, 35.23975],
    secciones: [
      {
        id: 'pregunta',
        cita: 'Mc 14,34',
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
        parrafos: [
          'Al pie del monte de los Olivos, en Jerusalén, el huerto de Getsemaní y la basílica de la Agonía recuerdan la oración de Jesús antes de su pasión. La basílica también recibe el nombre de iglesia de las Naciones. Es uno de los lugares donde el peregrino puede detenerse a contemplar la humanidad de Jesús.',
          'Allí, el Evangelio de Marcos muestra a Jesús angustiado. Busca la compañía de Pedro, Santiago y Juan, les pide que permanezcan despiertos y se dirige al Padre. Desea que se aparte de él aquella hora y, al mismo tiempo, se entrega a su voluntad (Mc 14,32-42).'
        ]
      },
      {
        id: 'tal-como-estas',
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
    // version: súbela (2, 3, 4…) cada vez que cambies musica.mp3, para que los móviles no usen la antigua
    musica: { version: 2, titulo: 'Light of Gethsemane', autor: 'TokyoRifft', url: 'https://pixabay.com/music/ambient-light-of-gethsemane-470042/' },
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
  },
  {
    id: 'emaus',
    numero: 2,
    publicar: '2026-10-29',
    activo: true,
    nombre: 'Emaús',
    titulo: 'Cuando te cuesta reconocer que Dios camina contigo',
    entradilla: 'Hay días en los que seguimos caminando, pero hemos perdido la ilusión.',
    ubicacion: 'El Qubeibeh · Camino de Jerusalén',
    coord: [31.8439, 35.1353],
    secciones: [
      {
        id: 'ilusion',
        cita: 'Lc 24,21',
        parrafos: [
          'Habías puesto mucho cariño en algo. Una relación, un proyecto, una tarea en la parroquia, una esperanza para tu familia. Pensabas que las cosas acabarían de otra manera.',
          'Y ahora te sorprendes diciendo: «Yo esperaba…».',
          'Así comienza también el camino interior de los discípulos de Emaús.'
        ]
      },
      {
        id: 'camino',
        cita: 'Lc 24,13-35',
        titulo: 'Un camino marcado por la decepción',
        parrafos: [
          'El Evangelio de Lucas cuenta que dos discípulos se alejaban de Jerusalén después de la muerte de Jesús. Mientras caminaban, hablaban de lo sucedido. Jesús se acercó y comenzó a caminar con ellos, pero no lo reconocieron.',
          'Él les preguntó de qué hablaban. Y ellos pudieron expresar su tristeza y aquella esperanza que parecía haberse roto: habían esperado que Jesús liberara a Israel (Lc 24,13-35).',
          'A veces, también nosotros miramos nuestra vida desde lo que no llegó a ser.'
        ]
      },
      {
        id: 'se-acerca',
        cita: 'Lc 24,15-16',
        titulo: 'Jesús se acerca antes de que lo reconozcan',
        parrafos: [
          'Hay un detalle que puede ayudarnos mucho: Jesús ya caminaba con ellos cuando todavía eran incapaces de reconocerlo.',
          'Podemos contemplar esa escena cuando sentimos a Dios lejos. Nuestra dificultad para percibir su presencia no tiene por qué ser la última palabra sobre nuestra relación con él.',
          'Hay etapas en las que rezamos sin entusiasmo, vamos a misa con el corazón cansado o seguimos ayudando a los demás sin encontrar consuelo. Podemos llevar también ese cansancio a la oración.',
          'El camino de Emaús nos invita a dejar abierta una posibilidad: quizá todavía no hemos comprendido todo lo que está sucediendo.'
        ]
      },
      {
        id: 'escucha',
        cita: 'Lc 24,17-27',
        titulo: 'Dios también escucha nuestras decepciones',
        parrafos: [
          'Jesús deja que los discípulos cuenten lo que llevan dentro. Después les ayuda a comprender las Escrituras y a mirar su historia desde una luz nueva.',
          'También nosotros necesitamos ese espacio para hablar con sinceridad.',
          'Podemos decirle a Dios: «Yo esperaba otra cosa». Esperaba que aquella persona mejorara. Que mi familia estuviera más unida. Que mi esfuerzo diera fruto. Que creer fuera más fácil.',
          'Nombrar una decepción puede ser el comienzo de una oración sincera.'
        ]
      },
      {
        id: 'mesa',
        cita: 'Lc 24,28-35',
        titulo: 'Una mesa en medio del camino',
        parrafos: [
          'Al llegar a la aldea, los discípulos invitan a Jesús a quedarse. Cuando se sienta con ellos, toma el pan, pronuncia la bendición, lo parte y se lo da. Entonces lo reconocen.',
          'La escena tiene una resonancia especial para nuestra vida eucarística: nos invita a acercarnos a la mesa del Señor con nuestra historia real, con lo que entendemos y con lo que todavía nos cuesta aceptar.',
          'Después del encuentro, los discípulos regresan a Jerusalén. Tienen algo que compartir. El camino que habían recorrido tristes se convierte en un camino de vuelta hacia los demás.'
        ]
      },
      {
        id: 'vida-emaus',
        cita: 'Lc 24,29',
        titulo: 'Llevar Emaús a nuestra vida',
        parrafos: [
          'Quizá hoy necesites hablar con alguien que sepa escucharte. Leer despacio este Evangelio. Acercarte a la Eucaristía con una decepción que llevas guardada desde hace tiempo.',
          'No hace falta fingir entusiasmo. Puedes empezar con una petición sencilla: «Señor, quédate conmigo. Ayúdame a reconocer tu presencia».'
        ]
      }
    ],
    guardar: 'Aunque hoy te cueste reconocerlo, puedes pedirle a Jesús que siga caminando contigo.',
    // música de fondo: archivo audio/emaus/musica.mp3 (si no está, suena la música generada)
    // volumen: 0.7 porque esta pieza tiene más ritmo y brillo; súbelo a 1 si la quieres más presente
    musica: { version: 1, volumen: 0.7, titulo: 'Emmaus – Did not our heart burn within us? (Luke 24) [Instrumental]', autor: 'Misselle', url: 'https://pixabay.com/music/modern-country-emmaus-did-not-our-heart-burn-within-us-luke-24-instrumental-498105/' },
    oracion: [
      'Señor Jesús,',
      'tú conoces mis esperanzas y mis decepciones.',
      'Escucha lo que todavía me cuesta expresar.',
      'Abre mi corazón a tu Palabra',
      'y mis ojos a tu presencia.',
      'Quédate conmigo',
      'y ayúdame a volver al encuentro de los demás.',
      'Amén.'
    ],
    lectura: { cita: 'Lucas 24,13-35', url: 'https://www.ewtn.com/es/biblia/51-lucas/24' },
    whatsapp: `Una mirada a Tierra Santa: *el camino de Emaús*

«Yo esperaba que las cosas fueran de otra manera…».
Te invito a leer esta breve reflexión: Jesús camina con nosotros antes de que lo reconozcamos.`
  },
  {
    id: 'nazaret',
    numero: 3,
    publicar: '2026-11-01',
    activo: true,
    nombre: 'Nazaret',
    titulo: 'Cuando la vida te pide un paso que no habías previsto',
    entradilla: 'Puedes responder a Dios sin tener resueltas todas tus preguntas.',
    ubicacion: 'Basílica de la Anunciación · Galilea',
    coord: [32.7022, 35.2977],
    secciones: [
      {
        id: 'imprevisto',
        cita: 'Lc 1,34',
        parrafos: [
          'Tenías una idea de cómo iban a ser las cosas. Habías organizado tu tiempo y aprendido a moverte dentro de lo conocido. Entonces llegó una noticia, una responsabilidad o una decisión que cambió tus planes.',
          'Lo primero que apareció quizá fue una pregunta: «¿Cómo voy a hacerlo?».',
          'En Nazaret, el Evangelio nos acerca a María en un momento que transforma su vida. Su respuesta puede acompañarnos cuando necesitamos discernir un paso nuevo.'
        ]
      },
      {
        id: 'anuncio',
        cita: 'Lc 1,26-38',
        titulo: 'Un anuncio en medio de la vida',
        parrafos: [
          'Lucas sitúa la anunciación en Nazaret, una ciudad de Galilea. Gabriel es enviado a María, desposada con José. El saludo la turba; escucha el anuncio del nacimiento de Jesús y pregunta cómo sucederá. El ángel le habla de la acción del Espíritu Santo y María expresa su disponibilidad a la palabra de Dios (Lc 1,26-38).',
          'Su pregunta forma parte del encuentro. El relato permite contemplar una confianza que escucha y responde.'
        ]
      },
      {
        id: 'preguntas',
        cita: 'Lc 1,34',
        titulo: 'Hacer preguntas también es tomarse algo en serio',
        parrafos: [
          'A veces confundimos confiar con no preguntar. Por eso nos sentimos culpables cuando una decisión nos inquieta o necesitamos comprender mejor lo que se nos propone.',
          'La pregunta de María nos invita a expresar con sinceridad lo que no entendemos.',
          'Podemos rezar: «Señor, ayúdame a ver qué me estás pidiendo». También podemos pedir consejo, reunir información y reconocer nuestras posibilidades reales. La prudencia y la oración pueden ayudarse mutuamente.',
          'No todo lo inesperado debe interpretarse como una orden de Dios. Discernir requiere tiempo, libertad y atención a las consecuencias de nuestras decisiones.'
        ]
      },
      {
        id: 'confianza',
        cita: 'Lc 1,38',
        titulo: 'La confianza se concreta',
        parrafos: [
          'María ofrece una respuesta personal. Su disponibilidad tiene rostro, nombre y una vida concreta en la que habrá de desarrollarse.',
          'También nuestra respuesta a Dios toma forma en circunstancias precisas: cómo cuidamos a alguien, cómo asumimos una responsabilidad, cómo decimos una verdad difícil o cómo reconocemos que necesitamos ayuda.',
          'No siempre veremos el camino entero. Podemos intentar distinguir cuál es el siguiente paso bueno y posible.',
          'Ese paso puede ser aceptar una tarea. En otras ocasiones será poner un límite, compartir una carga o esperar hasta comprender mejor la situación.'
        ]
      },
      {
        id: 'recibir',
        cita: 'Lc 1,28',
        titulo: 'Recibir antes de responder',
        parrafos: [
          'El anuncio a María comienza con la iniciativa de Dios y con su cercanía. Al contemplarlo, podemos recordar que la vida cristiana nace de un don que recibimos.',
          'Antes de preguntarnos cuánto somos capaces de hacer, podemos detenernos a escuchar la Palabra y dejarnos acompañar por la comunidad.',
          'La oración nos ofrece ese espacio para descansar de la exigencia de resolverlo todo solos. Podemos reconocer el miedo y pedir luz sin apresurarnos a dar una respuesta que todavía no podemos sostener.'
        ]
      },
      {
        id: 'vida-nazaret',
        cita: 'Lc 1,37',
        titulo: 'Llevar Nazaret a nuestra vida',
        parrafos: [
          'Piensa en una decisión que tengas pendiente. Escribe qué te preocupa, qué información te falta y con quién podrías hablar.',
          'Después, pide al Señor claridad para elegir con libertad y amor. Un sí sincero necesita verdad; también necesita reconocer los propios límites.'
        ]
      }
    ],
    guardar: 'Puedes dar un paso de confianza sin conocer todavía todo el camino.',
    // música de fondo: archivo audio/nazaret/musica.mp3 · volumen 0.85 porque tiene momentos que crecen
    musica: { version: 1, volumen: 0.85, titulo: 'The Day the Angels Greeted Mary', autor: 'TokyoRifft', url: 'https://pixabay.com/music/ambient-the-day-the-angels-greeted-mary-460026/' },
    oracion: [
      'Señor,',
      'cuando mis planes cambien,',
      'ayúdame a escucharte.',
      'Dame libertad para preguntar,',
      'prudencia para discernir',
      'y valor para responder con amor.',
      'Que no me falten personas',
      'con quienes buscar tu voluntad.',
      'Amén.'
    ],
    lectura: { cita: 'Lucas 1,26-38', url: 'https://www.ewtn.com/es/biblia/51-lucas/1' },
    whatsapp: `Una mirada a Tierra Santa: *Nazaret*

¿Tienes una decisión pendiente que no esperabas?
Te invito a leer esta breve reflexión: puedes dar un paso de confianza sin conocer todavía todo el camino.`
  }
];
