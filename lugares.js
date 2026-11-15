// Peregrinar por dentro · datos de cada lugar
// ---------------------------------------------------------------
// PARA AÑADIR UN LUGAR NUEVO: copia el bloque de Getsemaní entero
// (desde la llave { hasta la llave } con coma), pégalo debajo y cambia
// los textos y las coordenadas. El número 1, 2, 3… marca el orden.
//
// publicar: día en que sale el lugar (AAAA-MM-DD). Antes no se ve; para revisarlo, ?l=<id>&previa
// activo:   true = se ve (a partir de su fecha) · false = retirado de la web, aunque haya llegado la fecha
// whatsapp: una sola frase impactante (con el nombre del lugar entre *asteriscos*) que invita a abrir el enlace.
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
    whatsapp: `*Getsemaní* · ¿Has rezado y el miedo seguía ahí? Jesús también pasó por esa noche.`
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
    whatsapp: `*Emaús* · Jesús camina contigo, aunque todavía no lo reconozcas.`
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
    whatsapp: `*Nazaret* · Puedes decir sí a Dios sin conocer todavía todo el camino.`
  },
  {
    id: 'templo',
    numero: 4,
    publicar: '2026-11-08',
    activo: true,
    nombre: 'El Templo de Jerusalén',
    titulo: 'Cuando tu generosidad pasa inadvertida',
    entradilla: 'Dios conoce la historia que hay detrás de un gesto sencillo.',
    ubicacion: 'Explanada del Templo · Jerusalén',
    coord: [31.7781, 35.2354],
    // entrega 25 del documento «Tierra Santa · 40 entregas»
    secciones: [
      {
        id: 'intro-templo',
        cita: 'Mc 12,41',
        parrafos: [
          'Hay aportaciones que llaman la atención y otras que casi nadie ve. Una persona hace una donación importante; otra acompaña fielmente a un vecino. Alguien organiza un gran encuentro; otro se ocupa cada semana de una tarea pequeña.',
          'Cuando nuestra aportación parece modesta, podemos sentir que apenas cuenta. El episodio de la viuda en el Templo nos invita a revisar esa medida y a cuidar la dignidad de quienes dan.'
        ]
      },
      {
        id: 'templo-1',
        cita: 'Mc 12,38-44',
        titulo: 'Jesús se fija en una viuda',
        parrafos: [
          'Marcos cuenta que Jesús observa las ofrendas en el Templo de Jerusalén. Una viuda pobre deposita dos pequeñas monedas. Jesús llama la atención de sus discípulos sobre lo que ese gesto representa en su situación. Justo antes, el evangelista recoge la denuncia de Jesús contra quienes devoran los bienes de las viudas y aparentan piedad (Mc 12,38-44).',
          'Leer ambas escenas juntas nos ayuda a contemplar la entrega de la mujer y a escuchar la denuncia de la explotación.'
        ]
      },
      {
        id: 'templo-2',
        cita: 'Mc 12,43-44',
        titulo: 'Mirar más allá de la cantidad',
        parrafos: [
          'Una misma cantidad de dinero puede tener un significado muy diferente según las circunstancias de quien la ofrece. Algo parecido sucede con el tiempo, las fuerzas o la disponibilidad.',
          'Por eso conviene evitar comparaciones apresuradas. Una persona con responsabilidades de cuidado quizá solo puede participar de vez en cuando. Otra puede dedicar varias horas. Ambas merecen ser escuchadas y encontrar un lugar real en la comunidad.',
          'Agradecer con justicia requiere atención a las personas, especialmente a aquellas cuyos esfuerzos suelen permanecer ocultos. No siempre sabremos todo lo que cuesta un gesto; podemos recibirlo con respeto.'
        ]
      },
      {
        id: 'templo-3',
        cita: 'Mc 12,38-40',
        titulo: 'La generosidad necesita libertad',
        parrafos: [
          'Este pasaje no debe utilizarse para presionar a quien tiene pocos recursos ni para pedir que descuide su alimentación, su vivienda o sus responsabilidades familiares. La denuncia que lo precede nos obliga a tomar en serio ese riesgo.',
          'Una comunidad responsable explica con claridad sus necesidades, administra con transparencia y respeta la libertad de dar. También reconoce cuándo una persona necesita recibir apoyo.',
          'Quien ofrece tiempo merece el mismo respeto. Poder decir «hasta aquí puedo» ayuda a sostener el compromiso y evita que la generosidad se convierta en una exigencia silenciosa.'
        ]
      },
      {
        id: 'templo-4',
        cita: 'Mc 12,44',
        titulo: 'Dar sin convertirlo todo en reconocimiento',
        parrafos: [
          'Es humano agradecer que alguien vea nuestro esfuerzo. Podemos expresar esa necesidad y hablar cuando existe una falta continuada de consideración.',
          'Al mismo tiempo, la fe nos invita a confiar en que el valor de un gesto no desaparece porque pase inadvertido. Podemos ofrecerlo al Señor sin llevar una cuenta permanente de aplausos.',
          'Esa libertad se aprende despacio. Quizá hoy consista en hacer un bien sencillo y en reconocer el bien que otra persona lleva tiempo realizando. Cuando agradecemos con atención, ayudamos a construir una comunidad donde nadie sea tratado como una función anónima.'
        ]
      },
      {
        id: 'vida-templo',
        cita: 'Mc 12,42',
        titulo: 'Llevar el Templo a nuestra vida',
        parrafos: [
          'Agradece una aportación que suele pasar desapercibida. Si deseas colaborar con dinero o tiempo, decide una cantidad o dedicación que sea libre y responsable. Si necesitas ayuda, permite que la comunidad lo sepa.'
        ]
      }
    ],
    guardar: 'La generosidad florece cuando hay libertad, gratitud y cuidado de las personas.',
    // música de fondo: archivo audio/templo/musica.mp3 (serie «Sounds of the Eternal Land»)
    musica: { version: 1, volumen: 0.9, titulo: 'Shadows of the Temple Mount', autor: 'jakob_welik', url: 'https://pixabay.com/music/world-eretz-gedolahsounds-of-the-eternal-land-shadows-of-the-temple-mount-411195/' },
    oracion: [
      'Señor,',
      'recibe nuestros pequeños gestos.',
      'Enséñanos a dar con libertad,',
      'a agradecer con atención',
      'y a proteger a quienes son vulnerables.',
      'Que nadie quede olvidado en nuestra comunidad.',
      'Amén.'
    ],
    lectura: { cita: 'Marcos 12,38-44', url: 'https://www.ewtn.com/es/biblia/53-marcos/12' },
    whatsapp: `*El Templo de Jerusalén* · Lo que das en silencio, Dios lo ve.`
  },
  {
    id: 'dominus-flevit',
    numero: 5,
    publicar: '2026-11-15',
    activo: true,
    nombre: 'Dominus Flevit',
    titulo: 'Cuando el dolor del mundo te deja sin palabras',
    entradilla: 'La compasión puede encontrar un gesto incluso cuando faltan las palabras.',
    ubicacion: 'Monte de los Olivos · Jerusalén',
    coord: [31.7786, 35.2425],
    // entrega 22 del documento «Tierra Santa · 40 entregas»
    secciones: [
      {
        id: 'intro-dominus-flevit',
        cita: 'Lc 19,41',
        parrafos: [
          'Hay noticias que nos dejan inmóviles. Vemos sufrimiento y sentimos una mezcla de tristeza, rabia e impotencia. Después llegan otras imágenes, otras conversaciones y la obligación de continuar con nuestro día.',
          '¿Cómo mantener un corazón sensible sin quedar desbordados? ¿Cómo rezar cuando no sabemos qué decir? El santuario de Dominus Flevit nos acerca a una escena en la que Jesús también llora.'
        ]
      },
      {
        id: 'dominus-flevit-1',
        cita: 'Lc 19,41-44',
        titulo: 'Jesús contempla Jerusalén',
        parrafos: [
          'Dominus Flevit, cuyo nombre significa «el Señor lloró», se encuentra en el monte de los Olivos. Conmemora el llanto de Jesús sobre Jerusalén. Lucas cuenta que, al acercarse y ver la ciudad, Jesús llora por ella y lamenta que no haya reconocido el camino de la paz (Lc 19,41-44).',
          'Podemos detenernos ante esa escena y confiar al Señor el dolor que nos cuesta expresar.'
        ]
      },
      {
        id: 'dominus-flevit-2',
        cita: 'Lc 19,41',
        titulo: 'Las lágrimas tienen lugar en la oración',
        parrafos: [
          'A veces creemos que para rezar debemos encontrar enseguida una frase de esperanza. Pero hay momentos en los que solo podemos nombrar a una persona o permanecer en silencio. También podemos llevar ante Dios nuestras preguntas.',
          'Llorar no nos excluye de la fe. El dolor necesita espacio, tiempo y compañía. Si una noticia toca una herida propia, hablar con alguien cercano puede ayudarnos a reconocer qué está ocurriendo dentro de nosotros.',
          'Podemos orar con una petición sencilla por quienes sufren, por quienes los cuidan y por quienes tienen responsabilidad para detener el daño. No necesitamos explicar todo el sufrimiento para acercarnos a Dios.'
        ]
      },
      {
        id: 'dominus-flevit-3',
        cita: 'Lc 19,42',
        titulo: 'Cuidar la forma de informarnos',
        parrafos: [
          'Seguir una noticia constantemente puede aumentar nuestra angustia sin mejorar nuestra capacidad de ayudar. Conviene elegir fuentes fiables, evitar difundir imágenes o rumores sin comprobar y reservar momentos de descanso.',
          'Ese cuidado puede permitirnos mantener una atención más constante. También podemos escuchar a quienes conocen de cerca la situación y aprender qué apoyo resulta realmente útil.',
          'Las personas que sufren tienen historias, relaciones y una dignidad que merece respeto. Al hablar de ellas, podemos evitar convertir su dolor en una discusión donde lo único que buscamos sea imponernos.'
        ]
      },
      {
        id: 'dominus-flevit-4',
        cita: 'Lc 19,42',
        titulo: 'Dar forma a la compasión',
        parrafos: [
          'Quizá puedas colaborar con una entidad seria, acompañar a alguien afectado o participar en una iniciativa de ayuda. Otras veces tu gesto será escribir una palabra de cercanía y sostener una oración fiel.',
          'Conviene elegir algo proporcionado a nuestras posibilidades. No podemos responder a todas las necesidades, pero sí comprometernos con alguna de manera responsable.',
          'La paz también pide revisar nuestro modo de hablar en lo cercano. Humillar, extender rumores o alimentar desprecio deteriora las relaciones. Podemos defender una convicción con firmeza y conservar el respeto debido a las personas.'
        ]
      },
      {
        id: 'vida-dominus-flevit',
        cita: 'Lc 19,41',
        titulo: 'Llevar Dominus Flevit a nuestra vida',
        parrafos: [
          'Elige una preocupación que te esté pesando. Dedica un momento a rezar por las personas afectadas. Después identifica una acción útil a tu alcance y un límite saludable en tu consumo de noticias.'
        ]
      }
    ],
    guardar: 'La compasión se vuelve fecunda cuando encuentra una forma concreta de cuidar.',
    // música de fondo: archivo audio/dominus-flevit/musica.mp3 (serie «Sounds of the Eternal Land»)
    musica: { version: 1, volumen: 0.85, titulo: 'The Silence of Jerusalem at Night', autor: 'jakob_welik', url: 'https://pixabay.com/music/world-eg-sounds-of-the-eternal-land-the-silence-of-jerusalem-at-night-411194/' },
    oracion: [
      'Señor Jesús,',
      'recibe nuestro dolor por el mundo.',
      'Protege a quienes sufren,',
      'fortalece a quienes los cuidan',
      'y guía a quienes pueden construir la paz.',
      'Muéstranos qué gesto podemos ofrecer hoy.',
      'Amén.'
    ],
    lectura: { cita: 'Lucas 19,41-44', url: 'https://www.ewtn.com/es/biblia/51-lucas/19' },
    whatsapp: `*Dominus Flevit* · Jesús también lloró ante el dolor del mundo.`
  },
  {
    id: 'siquen',
    numero: 6,
    publicar: '2026-11-22',
    activo: true,
    nombre: 'Siquén',
    titulo: 'Cuando necesitas renovar tu decisión de seguir a Dios',
    entradilla: 'Una decisión de fe puede renovarse en la vida que tienes hoy.',
    ubicacion: 'Tell Balata · Samaría',
    coord: [32.2133, 35.2817],
    // entrega 40 del documento «Tierra Santa · 40 entregas»
    secciones: [
      {
        id: 'intro-siquen',
        cita: 'Jos 24,1',
        parrafos: [
          'Hay palabras que dijimos con mucha convicción y que después quedaron cubiertas por la costumbre. Seguimos adelante, pero apenas nos detenemos a preguntar qué lugar ocupa Dios en nuestras decisiones. La rutina puede sostener lo bueno y también ocultar una relación que necesita atención.',
          'Siquén nos invita a recordar el bien recibido y a responder de nuevo. Esta última parada de la recopilación abre una pregunta que puede acompañarnos más allá del documento: cómo queremos seguir caminando con el Señor.'
        ]
      },
      {
        id: 'siquen-1',
        cita: 'Jos 24,1-28',
        titulo: 'Una asamblea para renovar la alianza',
        parrafos: [
          'Josué reúne a las tribus de Israel en Siquén, también escrito Siquem. Recuerda la acción de Dios en su historia y llama al pueblo a servir al Señor con fidelidad, abandonando otros dioses. El pueblo expresa su decisión de continuar en la alianza (Jos 24,1-28).',
          'El relato pertenece a la historia de Israel. Los cristianos podemos leerlo con respeto y preguntarnos cómo renovar nuestra respuesta al Dios que se nos da a conocer en Jesucristo.'
        ]
      },
      {
        id: 'siquen-2',
        cita: 'Jos 24,2-13',
        titulo: 'Recordar antes de prometer',
        parrafos: [
          'A veces comenzamos una renovación haciendo una lista de obligaciones. Pero puede ser más fecundo detenernos primero en lo que hemos recibido: personas que nos acompañaron, una reconciliación o una palabra que sostuvo nuestra esperanza.',
          'La gratitud ayuda a que nuestra respuesta nazca de una relación. Podemos reconocer también las heridas y preguntas que siguen abiertas. Recordar la fidelidad de Dios no exige presentar nuestra historia como si todo hubiera sido fácil.',
          'Una oración sencilla puede reunir ambas cosas: agradecer un bien concreto y confiar al Señor una dificultad que continúa.'
        ]
      },
      {
        id: 'siquen-3',
        cita: 'Jos 24,14-15',
        titulo: 'Revisar qué dirige nuestras decisiones',
        parrafos: [
          'Podemos afirmar que Dios es importante y, sin darnos cuenta, dejar que otras cosas gobiernen nuestras elecciones. La aprobación de los demás, el deseo de control o la comodidad pueden ocupar un lugar excesivo.',
          'Conviene mirar situaciones concretas. ¿Qué nos lleva a callar una verdad necesaria? ¿Qué nos impide compartir? ¿Qué estamos defendiendo cuando reaccionamos con tanta dureza?',
          'Estas preguntas no buscan alimentar una culpa permanente. Pueden ayudarnos a reconocer una necesidad de conversión y a pedir la gracia para actuar de otra manera. El sacramento de la reconciliación ofrece un espacio para volver al Señor y recibir su perdón.'
        ]
      },
      {
        id: 'siquen-4',
        cita: 'Jos 24,24-25',
        titulo: 'Una respuesta que pueda vivirse',
        parrafos: [
          'Renovar la fe no requiere prometer muchos cambios de golpe. Podemos elegir un compromiso concreto que cuide nuestra relación con Dios y con los demás: un tiempo de oración, una participación más consciente en la Eucaristía o una reconciliación que necesite preparación.',
          'Después conviene revisar cómo va, con humildad. Si tropezamos, podemos reconocerlo, buscar ayuda y retomar el camino. La perseverancia crece cuando dejamos de depender únicamente del entusiasmo inicial.',
          'La comunidad nos recuerda que nuestra respuesta personal forma parte de una historia compartida. Seguimos aprendiendo a creer, celebrar y amar junto a otros.'
        ]
      },
      {
        id: 'vida-siquen',
        cita: 'Jos 24,15',
        titulo: 'Llevar Siquén a nuestra vida',
        parrafos: [
          'Agradece un don recibido, reconoce algo que necesite cambiar y elige un compromiso posible para el próximo mes. Escribe cuándo lo revisarás y con quién podrías compartir el camino.'
        ]
      }
    ],
    guardar: 'Volver a elegir a Dios puede empezar por un sí pequeño que se convierte en vida.',
    // música de fondo: archivo audio/siquen/musica.mp3 (serie «Sounds of the Eternal Land»)
    musica: { version: 1, volumen: 0.7, titulo: 'The Great Promise', autor: 'jakob_welik', url: 'https://pixabay.com/music/world-eretz-gedolah-sounds-of-the-eternal-land-the-great-promise-411188/' },
    oracion: [
      'Señor,',
      'gracias por caminar con nosotros.',
      'Renueva nuestra fe,',
      'ordena nuestros deseos',
      'y ayúdanos a responder con libertad.',
      'Que el camino recorrido dé fruto en una vida que ama.',
      'Amén.'
    ],
    lectura: { cita: 'Josué 24,1-28', url: 'https://www.ewtn.com/es/biblia/45-josue/24' },
    whatsapp: `*Siquén* · Hoy puedes volver a elegir a Dios.`
  },
  {
    id: 'carmelo',
    numero: 7,
    publicar: '2026-11-29',
    activo: true,
    nombre: 'El monte Carmelo',
    titulo: 'Cuando necesitas detenerte para volver a escuchar',
    entradilla: 'Un tiempo de recogimiento puede ayudarte a reconocer qué merece tu atención.',
    ubicacion: 'El Muhraqa · Monte Carmelo',
    coord: [32.6625, 35.0855],
    // entrega 37 del documento «Tierra Santa · 40 entregas»
    secciones: [
      {
        id: 'intro-carmelo',
        cita: '1 Re 18,42',
        parrafos: [
          'El día puede llenarse de conversaciones, noticias y asuntos pendientes. Incluso cuando todo queda en silencio, la cabeza sigue repasando lo que falta. Nos cuesta detenernos porque sentimos que siempre deberíamos estar resolviendo algo.',
          'El monte Carmelo nos acerca a Elías en oración y en espera. Su actitud nos invita a reservar un espacio para volver a Dios y mirar con mayor atención lo que sucede.'
        ]
      },
      {
        id: 'carmelo-1',
        cita: '1 Re 18,41-46',
        titulo: 'Elías espera la lluvia',
        parrafos: [
          'En el primer libro de los Reyes, Elías sube al Carmelo, se inclina hacia tierra y envía repetidamente a su criado a mirar hacia el mar. Finalmente aparece una nube pequeña, y después llega la lluvia (1 Re 18,41-46).',
          'Esta escena pertenece al Carmelo. El encuentro de Elías con Dios en el susurro de una brisa suave se sitúa en el Horeb, en otro capítulo. Conviene distinguir ambos relatos al hablar de la oración del profeta.'
        ]
      },
      {
        id: 'carmelo-2',
        cita: '1 Re 18,42',
        titulo: 'Hacer un lugar para detenerse',
        parrafos: [
          'Podemos comenzar con un tiempo breve y concreto. Elegir una silla, dejar el teléfono fuera de alcance y leer unas líneas de la Escritura ayuda a dar forma a ese momento.',
          'No es necesario conseguir una mente vacía. Cuando aparezca una preocupación, podemos reconocerla, presentarla a Dios y regresar con suavidad al texto o a una oración sencilla.',
          'Algunos días habrá serenidad; otros, distracción. La práctica puede ayudarnos a descubrir qué ocupa nuestra atención y qué necesitamos ordenar, sin convertir cada momento de oración en un examen de rendimiento.'
        ]
      },
      {
        id: 'carmelo-3',
        cita: '1 Re 18,43',
        titulo: 'Escuchar con los pies en la tierra',
        parrafos: [
          'La oración no nos separa de nuestras responsabilidades. Puede ayudarnos a distinguir entre lo urgente, lo importante y aquello que estamos intentando controlar sin que dependa de nosotros.',
          'Después de rezar, quizá convenga hacer una llamada, pedir perdón o descansar. Un paso concreto permite que el recogimiento continúe dando fruto en la vida cotidiana.',
          'Tampoco necesitamos interpretar cualquier detalle como una señal divina. El discernimiento pide prudencia, coherencia con la Escritura y, cuando haga falta, consejo. Escuchar a Dios incluye reconocer nuestras limitaciones para comprenderlo todo.'
        ]
      },
      {
        id: 'carmelo-4',
        cita: '1 Re 18,44',
        titulo: 'Reconocer lo pequeño sin forzarlo',
        parrafos: [
          'En el relato aparece una nube pequeña antes de la lluvia. Podemos recibir esa imagen como una invitación a prestar atención a los comienzos discretos: una conversación más sincera, un deseo de reconciliación o una nueva disponibilidad para servir.',
          'Son experiencias que merecen cuidado, aunque no permitan predecir el futuro. Podemos agradecerlas y colaborar con el bien que hacen posible.',
          'Para los cristianos, escuchar la Palabra encuentra su centro en Jesucristo. Volver al Evangelio y compartir la oración de la Iglesia nos ayuda a que el silencio tenga una orientación y alimente el amor.'
        ]
      },
      {
        id: 'vida-carmelo',
        cita: '1 Re 18,44',
        titulo: 'Llevar el Carmelo a nuestra vida',
        parrafos: [
          'Reserva cinco minutos para leer y rezar sin pantallas. Al terminar, escribe una sola cosa que necesite tu atención y elige un paso sencillo para cuidarla.'
        ]
      }
    ],
    guardar: 'Detenernos ante Dios puede ayudarnos a volver a la vida con una atención más libre.',
    // música de fondo: archivo audio/carmelo/musica.mp3 (serie «Sounds of the Eternal Land»)
    musica: { version: 1, volumen: 0.85, titulo: 'Mount Carmel at Dusk', autor: 'jakob_welik', url: 'https://pixabay.com/music/world-eretz-gedolah-sounds-of-the-eternal-land-mount-carmel-at-dusk-411193/' },
    oracion: [
      'Señor,',
      'recibe el ruido que llevo dentro.',
      'Ayúdame a escuchar tu Palabra,',
      'a reconocer mis límites',
      'y a cuidar los pequeños comienzos del bien.',
      'Que mi oración dé fruto en el amor cotidiano.',
      'Amén.'
    ],
    lectura: { cita: '1 Reyes 18,41-46', url: 'https://www.ewtn.com/es/biblia/4-1-reyes/18' },
    whatsapp: `*El monte Carmelo* · Una nube pequeña anunció la lluvia. Detente y escucha.`
  },
  {
    id: 'sinai',
    numero: 8,
    publicar: '2026-12-06',
    activo: true,
    nombre: 'El desierto del Sinaí',
    titulo: 'Cuando la libertad da miedo y añoras lo conocido',
    entradilla: 'Aprender a vivir de otra manera requiere apoyo, decisiones y tiempo.',
    ubicacion: 'Monte Sinaí · Península del Sinaí',
    coord: [28.5394, 33.9753],
    // entrega 39 del documento «Tierra Santa · 40 entregas»
    secciones: [
      {
        id: 'intro-sinai',
        cita: 'Éx 16,3',
        parrafos: [
          'Has dejado atrás una situación que te hacía daño o una costumbre que limitaba tu vida. Al principio sentiste alivio. Después llegaron dificultades nuevas, y lo conocido empezó a parecer más sencillo de lo que realmente había sido.',
          'A veces la memoria selecciona los momentos cómodos y borra el precio que pagábamos por ellos. El camino de Israel por el desierto nos permite reconocer esa tensión entre la libertad recibida y el aprendizaje que todavía queda por hacer.'
        ]
      },
      {
        id: 'sinai-1',
        cita: 'Éx 16,1-18',
        titulo: 'Un pueblo aprende a caminar',
        parrafos: [
          'En Éxodo 16, el pueblo siente hambre y añora el alimento de Egipto. Dios le da el maná y le enseña a recogerlo según sus indicaciones. El episodio se sitúa en el desierto de Sin, entre Elín y Sinaí. Más adelante, Israel llega al desierto del Sinaí y recibe la propuesta de la alianza (Ex 19,1-8).',
          'Distinguimos ambos lugares: el relato del maná ocurre durante el camino hacia el Sinaí. Esta entrega contempla ese recorrido por las tierras bíblicas.'
        ]
      },
      {
        id: 'sinai-2',
        cita: 'Éx 16,2-4',
        titulo: 'Escuchar la necesidad real',
        parrafos: [
          'El pueblo tiene hambre. Reconocer la necesidad concreta impide reducir toda dificultad a una falta de confianza. También nosotros necesitamos medios para sostener un cambio: apoyo, organización y unas condiciones posibles.',
          'Si una decisión buena nos está resultando difícil, podemos preguntar qué falta. Quizá necesitamos aprender algo, repartir una carga o encontrar un recurso que todavía desconocemos.',
          'Pedir esa ayuda forma parte del camino. La libertad se fortalece cuando contamos con relaciones que respetan nuestras decisiones y nos permiten afrontar la realidad sin volver a una dependencia dañina.'
        ]
      },
      {
        id: 'sinai-3',
        cita: 'Éx 16,3',
        titulo: 'Revisar la nostalgia',
        parrafos: [
          'Recordar el pasado puede dar consuelo, pero conviene mirarlo completo. Podemos escribir qué echamos de menos y qué nos hizo decidir el cambio. Ambas cosas pertenecen a nuestra historia.',
          'La dificultad presente no demuestra por sí sola que la decisión fuera equivocada. Tampoco debemos sostener una elección sin revisarla cuando aparecen datos importantes. Discernir requiere atender a la verdad de la situación y buscar consejo prudente.',
          'Podemos preguntarnos qué paso nos acerca hoy a una vida más responsable, libre y capaz de amar. A veces será perseverar; otras, ajustar el camino o pedir una ayuda distinta.'
        ]
      },
      {
        id: 'sinai-4',
        cita: 'Éx 19,1-8',
        titulo: 'La libertad aprende a cuidar',
        parrafos: [
          'La alianza del Sinaí une al pueblo con Dios y orienta su vida compartida. Esa dimensión nos recuerda que la libertad tiene consecuencias en las relaciones: cómo tratamos a otros, qué acuerdos respetamos y qué responsabilidades asumimos.',
          'Desde la fe cristiana, miramos a Jesús para aprender una libertad que se entrega en el amor. El padrenuestro nos enseña además a pedir el pan de cada día: podemos confiar lo necesario a Dios y colaborar para que llegue a todos.',
          'No necesitamos resolver todo el futuro hoy. Sí podemos cuidar la decisión concreta que tenemos delante.'
        ]
      },
      {
        id: 'vida-sinai',
        cita: 'Éx 16,4',
        titulo: 'Llevar el Sinaí a nuestra vida',
        parrafos: [
          'Piensa en un cambio que estés atravesando. Escribe qué apoyo necesitas para sostenerlo y qué parte del pasado conviene recordar con más verdad. Elige un paso posible para esta semana.'
        ]
      }
    ],
    guardar: 'La libertad crece cuando aprendemos a cuidar el paso de hoy.',
    oracion: [
      'Dios que acompañas a tu pueblo,',
      'sostén nuestros caminos de libertad.',
      'Ayúdanos a reconocer lo que necesitamos,',
      'a pedir apoyo',
      'y a decidir con verdad.',
      'Danos hoy el pan y la confianza para seguir.',
      'Amén.'
    ],
    lectura: { cita: 'Éxodo 16,1-18 y 19,1-8', url: 'https://www.vatican.va/content/bibbia/es/antico-testamento/pentateuco/esodo/capitolo-16.index.html' },
    whatsapp: `*El desierto del Sinaí* · La libertad también se aprende. Cuida el paso de hoy.`
  },
  {
    id: 'ain-karem',
    numero: 9,
    publicar: '2026-12-13',
    activo: true,
    nombre: 'Ain Karem',
    titulo: 'Cuando te cuesta alegrarte por lo bueno que les pasa a otros',
    entradilla: 'La alegría de otra persona también puede ensanchar tu corazón.',
    ubicacion: 'Iglesia de la Visitación · Montaña de Judá',
    coord: [31.7645, 35.1583],
    // entrega 15 del documento «Tierra Santa · 40 entregas»
    secciones: [
      {
        id: 'intro-ain-karem',
        cita: 'Lc 1,39',
        parrafos: [
          'Alguien cuenta una buena noticia y tú sonríes. Sin embargo, por dentro aparece una punzada. Esa reconciliación, ese nacimiento o esa compañía te recuerda algo que tú sigues esperando. Puedes alegrarte por el otro y sentir tristeza por ti al mismo tiempo.',
          'Reconocerlo con sinceridad ayuda más que castigarte. El corazón necesita aprender a recibir el bien sin convertir cada historia en una comparación. La visita de María a Isabel nos ofrece una escena para empezar ese aprendizaje.'
        ]
      },
      {
        id: 'ain-karem-1',
        cita: 'Lc 1,39-56',
        titulo: 'Una casa donde se reconoce el don',
        parrafos: [
          'Ain Karem está vinculado por la tradición cristiana a la Visitación. Lucas habla de una población de la montaña de Judá, sin nombrarla. María entra en casa de Zacarías y saluda a Isabel. Esta reconoce, movida por el Espíritu, la bendición que María lleva consigo. María responde alabando a Dios (Lc 1,39-56).',
          'El encuentro permite que cada una reconozca la acción de Dios en la vida de la otra. La conversación se convierte en gratitud.'
        ]
      },
      {
        id: 'ain-karem-2',
        cita: 'Lc 1,40-41',
        titulo: 'Escuchar sin llevarlo todo a nuestra historia',
        parrafos: [
          'A veces, cuando alguien comparte algo importante, respondemos contando enseguida lo que nos pasó a nosotros. No siempre lo hacemos por egoísmo. Quizá queremos demostrar que comprendemos. Pero la otra persona puede quedarse sin espacio para terminar.',
          'Podemos aprender a preguntar, a dejar un silencio y a escuchar hasta el final. Una visita se vuelve un regalo cuando quien nos recibe siente que su vida merece atención.',
          'También conviene preguntar antes de aconsejar. Hay noticias que necesitan una celebración tranquila; otras piden simplemente compañía. No tenemos que ocupar el centro de todos los encuentros para ser queridos.'
        ]
      },
      {
        id: 'ain-karem-3',
        cita: 'Lc 1,42-45',
        titulo: 'La comparación estrecha la mirada',
        parrafos: [
          'La vida ajena suele mostrarnos una parte de su historia. Desconocemos muchas de sus noches, esfuerzos y heridas. Compararla con toda nuestra vida resulta injusto para ambos.',
          'Si una buena noticia te duele, puedes poner ese dolor ante Dios sin avergonzarte. Después, cuando puedas, ofrecer una palabra sincera: «Me alegro de que estés acompañado» o «Gracias por contármelo». No hace falta exagerar el entusiasmo ni negar lo que estás viviendo.',
          'La gratitud puede crecer despacio. Quizá hoy solo puedas reconocer que el bien recibido por otro merece ser cuidado. Ese pequeño reconocimiento ya abre una puerta.'
        ]
      },
      {
        id: 'ain-karem-4',
        cita: 'Lc 1,56',
        titulo: 'Visitar también es dejarse encontrar',
        parrafos: [
          'En una comunidad cristiana todos necesitamos dar y recibir. Quien suele acompañar puede necesitar que alguien lo escuche. Quien está pasando una dificultad sigue teniendo cosas valiosas que compartir.',
          'Una llamada, una conversación después de misa o una visita acordada pueden ayudarnos a salir del aislamiento. Lo importante es acercarnos con respeto, sin imponer horarios ni exigir confidencias. La cercanía nace cuando hay libertad para abrir la puerta y también para decir que hoy hace falta descansar.'
        ]
      },
      {
        id: 'vida-ain-karem',
        cita: 'Lc 1,46-47',
        titulo: 'Llevar Ain Karem a nuestra vida',
        parrafos: [
          'Piensa en alguien que haya recibido una buena noticia. Escríbele una frase concreta de alegría o agradecimiento. Si también hay tristeza en ti, reserva otro momento para hablar de ella con una persona de confianza.'
        ]
      }
    ],
    guardar: 'Celebrar el bien de otro puede enseñarnos a reconocer los dones de Dios.',
    oracion: [
      'Señor,',
      'libera mi mirada de la comparación.',
      'Enséñame a escuchar con atención,',
      'a compartir la alegría',
      'y a confiarte lo que todavía me duele.',
      'Haz de mis visitas un lugar de encuentro.',
      'Amén.'
    ],
    lectura: { cita: 'Lucas 1,39-56', url: 'https://www.ewtn.com/es/biblia/51-lucas/1' },
    whatsapp: `*Ain Karem* · María e Isabel se alegran la una por la otra. Celebra hoy el bien ajeno.`
  },
  {
    id: 'betesda',
    numero: 10,
    publicar: '2026-12-20',
    activo: true,
    nombre: 'Betesda',
    titulo: 'Cuando llevas demasiado tiempo esperando',
    entradilla: 'Tu vida merece atención también cuando la dificultad se prolonga.',
    ubicacion: 'Piscina de Betesda · Jerusalén',
    coord: [31.7813, 35.2366],
    // entrega 13 del documento «Tierra Santa · 40 entregas»
    secciones: [
      {
        id: 'intro-betesda',
        cita: 'Jn 5,5',
        parrafos: [
          'Al principio, todos preguntaban. Había llamadas, ofrecimientos y palabras de ánimo. Pero pasan los meses, la situación continúa y las conversaciones se hacen más cortas.',
          'Quizá tú mismo has dejado de contar cómo estás. Te parece que repites siempre lo mismo o temes cansar a los demás.',
          'En Jerusalén, junto a la piscina de Betesda, el Evangelio nos presenta a un hombre cuya enfermedad llevaba mucho tiempo acompañándolo.'
        ]
      },
      {
        id: 'betesda-1',
        cita: 'Jn 5,1-9',
        titulo: 'Jesús se acerca a una espera larga',
        parrafos: [
          'Juan sitúa la escena junto a la Puerta de las Ovejas, en una piscina con cinco soportales. Allí había muchos enfermos. Uno de ellos llevaba treinta y ocho años enfermo.',
          'Jesús lo ve, conoce la duración de su situación y le pregunta si quiere quedar sano. El hombre responde explicando que no tiene a nadie que lo introduzca en la piscina. Jesús le manda levantarse, tomar su camilla y caminar; el relato narra su curación (Jn 5,1-9).',
          'La escena permite detenernos en una necesidad que el hombre expresa: le falta quien lo ayude.'
        ]
      },
      {
        id: 'betesda-2',
        cita: 'Jn 5,5-6',
        titulo: 'El tiempo no hace menos importante a una persona',
        parrafos: [
          'Cuando una situación dura mucho, podemos acostumbrarnos a ella. Corremos el riesgo de dejar de percibir lo que cuesta a quien la vive.',
          'La enfermedad prolongada, la dependencia o la soledad requieren una atención que se renueve. La persona sigue teniendo algo que decir, aunque su dificultad se parezca a la del mes pasado.',
          'Podemos preguntar cómo está hoy, qué ha cambiado y qué necesita. Escuchar de nuevo es reconocer que su vida continúa siendo importante para nosotros.'
        ]
      },
      {
        id: 'betesda-3',
        cita: 'Jn 5,6',
        titulo: 'Ayudar sin convertirlo todo en una exigencia',
        parrafos: [
          'La pregunta de Jesús no debe utilizarse para culpar a quien sigue enfermo. El relato anuncia una acción suya, no una técnica que podamos reproducir mediante suficiente voluntad.',
          'A veces hacemos daño con frases como «tienes que poner más de tu parte», sin conocer el esfuerzo que ya realiza la otra persona.',
          'Acompañar pide escuchar sus posibilidades reales, respetar sus decisiones y colaborar en lo que necesite. Puede ser una visita, un traslado, una gestión o una ayuda profesional adecuada.',
          'La oración puede acompañar esos cuidados y sostenernos en ellos.'
        ]
      },
      {
        id: 'betesda-4',
        cita: 'Jn 5,7',
        titulo: 'Cuidar sin prometer lo que no sabemos',
        parrafos: [
          'El Evangelio narra una curación. Nuestra responsabilidad al acompañar a alguien incluye no prometerle que su situación tendrá el mismo desenlace.',
          'Podemos comprometernos con algo verdadero: llamar, regresar, escuchar o ayudar a buscar recursos.',
          'También quienes cuidan necesitan apoyo. Repartir las tareas y reconocer el agotamiento favorece una presencia más estable y respetuosa.',
          'La fidelidad se construye con compromisos posibles, no con ofrecimientos que después no podemos mantener.'
        ]
      },
      {
        id: 'vida-betesda',
        cita: 'Jn 5,8',
        titulo: 'Llevar Betesda a nuestra vida',
        parrafos: [
          'Piensa en alguien cuya dificultad se haya prolongado. Puedes contactar con esa persona y preguntarle qué le ayudaría esta semana.',
          'Si eres tú quien está esperando, intenta nombrar una necesidad concreta ante alguien de confianza.',
          'También puedes rezar con estas palabras: «Señor, sigo aquí. Ayúdame a encontrar compañía para este tramo».'
        ]
      }
    ],
    guardar: 'El tiempo que llevas sufriendo no disminuye el valor de tu vida.',
    oracion: [
      'Señor Jesús,',
      'mira a quienes esperan desde hace tiempo.',
      'Ayúdanos a escuchar',
      'sin cansarnos de la fragilidad.',
      'Danos constancia para acompañar',
      'y humildad para pedir apoyo.',
      'Que nadie se sienta olvidado',
      'porque su dificultad todavía no termina.',
      'Amén.'
    ],
    lectura: { cita: 'Juan 5,1-9', url: 'https://www.ewtn.com/es/biblia/43-juan/5' },
    whatsapp: `*Betesda* · Treinta y ocho años esperando, y Jesús se detuvo ante él.`
  },
  {
    id: 'belen',
    numero: 11,
    publicar: '2026-12-25',
    activo: true,
    nombre: 'Belén',
    titulo: 'Cuando piensas que lo que haces es demasiado pequeño',
    entradilla: 'Hay gestos de amor que sostienen una vida sin que casi nadie los vea.',
    ubicacion: 'Basílica de la Natividad · Belén',
    coord: [31.7043, 35.2075],
    // entrega 11 del documento «Tierra Santa · 40 entregas»
    secciones: [
      {
        id: 'intro-belen',
        cita: 'Lc 2,7',
        parrafos: [
          'Preparar una comida. Acompañar a alguien a una consulta. Cambiar unas sábanas. Volver a llamar a quien ayer no tenía ganas de hablar.',
          'Muchas de las cosas que más cuidan a las personas apenas reciben atención. A veces, después de un día lleno de estas tareas, nos preguntamos si hemos hecho algo importante.',
          'Belén nos invita a mirar de nuevo lo pequeño.'
        ]
      },
      {
        id: 'belen-1',
        cita: 'Lc 2,1-20',
        titulo: 'Un niño que necesita cuidados',
        parrafos: [
          'Lucas cuenta que María y José fueron a Belén y que allí nació Jesús. María lo envolvió en pañales y lo acostó en un pesebre. Unos pastores recibieron el anuncio de su nacimiento y acudieron a verlo. Después compartieron lo que habían escuchado y regresaron alabando a Dios (Lc 2,1-20).',
          'La señal que encuentran es un niño. El Evangelio nos sitúa ante una vida que necesita ser acogida y cuidada.'
        ]
      },
      {
        id: 'belen-2',
        cita: 'Lc 2,7',
        titulo: 'Dios se acerca a nuestra fragilidad',
        parrafos: [
          'La fe cristiana reconoce en Jesús al Hijo de Dios hecho hombre. Al contemplar su nacimiento, podemos detenernos ante la profundidad de esa cercanía: Dios entra en nuestra historia compartiendo una vida humana real.',
          'Por eso, los cuidados cotidianos merecen nuestra atención. Dar de comer, abrigar y acompañar son gestos que responden a necesidades verdaderas.',
          'También quien necesita recibirlos conserva toda su dignidad. Depender de otros no disminuye el valor de una persona.',
          'Belén puede enseñarnos a tratar con más delicadeza tanto la fragilidad ajena como la propia.'
        ]
      },
      {
        id: 'belen-3',
        cita: 'Lc 2,12',
        titulo: 'Lo pequeño merece hacerse con amor',
        parrafos: [
          'Quizá tu vida de ahora tiene menos actividad que antes. Tal vez ya no puedes asumir las mismas tareas o desplazarte con facilidad.',
          'Puedes preguntarte qué forma puede tomar hoy tu cariño. Escuchar a alguien, agradecer un cuidado, recordar a una persona en la oración o compartir una experiencia puede ser valioso.',
          'No necesitas comparar tu aportación con la de quien tiene otras fuerzas y posibilidades.',
          'Tampoco es justo pedir a una persona agotada que dé siempre un poco más. El cuidado necesita descanso, apoyo y responsabilidades compartidas.'
        ]
      },
      {
        id: 'belen-4',
        cita: 'Lc 2,16-19',
        titulo: 'Aprender a mirar despacio',
        parrafos: [
          'Los pastores se acercan y encuentran a la familia. María guarda lo sucedido y lo medita en su corazón.',
          'La escena nos invita a prestar atención antes de pasar a otra cosa. A veces vivimos con tanta prisa que dejamos de percibir el bien que recibimos y el que podemos ofrecer.',
          'Una mirada agradecida puede reconocer el esfuerzo de quien prepara nuestra comida, limpia un espacio común o permanece disponible cuando necesitamos compañía.',
          'Decir gracias también es una forma de cuidar.'
        ]
      },
      {
        id: 'vida-belen',
        cita: 'Lc 2,19',
        titulo: 'Llevar Belén a nuestra vida',
        parrafos: [
          'Elige un gesto cotidiano que suelas dar por supuesto. Hoy puedes hacerlo con más atención o agradecer a la persona que lo realiza.',
          'Y si eres tú quien necesita ayuda, procura recibirla sin pedir perdón por existir. También tu vida merece tiempo, ternura y cuidado.'
        ]
      }
    ],
    guardar: 'El amor de cada día tiene valor, aunque casi nadie lo vea.',
    oracion: [
      'Jesús, nacido en Belén,',
      'enséñame a reconocer el valor',
      'de los gestos sencillos.',
      'Dame ternura para cuidar,',
      'gratitud para recibir',
      'y respeto por la fragilidad.',
      'Que nadie a mi lado',
      'se sienta una carga.',
      'Amén.'
    ],
    lectura: { cita: 'Lucas 2,1-20', url: 'https://www.ewtn.com/es/biblia/51-lucas/2' },
    whatsapp: `*Belén* · Un niño envuelto en pañales. Lo pequeño también sostiene la vida.`
  }
];
