--------------------------------------------------------------------------------------
# Aplicaci�n Lista de Tareas (To-Do List) - Evaluaci�n de Portafolio
--------------------------------------------------------------------------------------
 Este proyecto es una aplicaci�n web interactiva desarrollada como parte de una evaluaci�n de portafolio.
 Su objetivo principal es demostrar las funcionalidades que JavaScript puede ofrecer en el desarrollo web moderno,
 especialmente en la manipulaci�n del DOM y la interacci�n con el usuario en tiempo real.

--------------------------------------------------------------------------------------
## Explicar las caracteristicas fundamentales de JavaScript para el desarrollo web
--------------------------------------------------------------------------------------

1.- Qu� es JavaScript y su rol en el desarrollo de aplicaciones web.
    JavaScript es un lenguaje de programaci�n interpretado, orientado a objetos y basado en eventos.
	Permite crear funcionalidades din�micas e interactivas en p�ginas web, como validaciones, animaciones,
	interacci�n con el usuario y modificaci�n del DOM sin recargar la p�gina.
	
2.- Las ventajas de usar JavaScript para crear aplicaciones interactivas en el navegador.
    - Manipulaci�n din�mica del DOM: 
      Permite modificar elementos HTML y estilos CSS en tiempo real, lo que facilita interfaces interactivas.

    - Captura de eventos del usuario:
      Puede detectar y responder a eventos como clics, movimientos del mouse, teclas presionadas, scroll, etc.

    - Comunicaci�n con servidores sin recargar la p�gina:
      Usando tecnolog�as como AJAX o Fetch API, es posible enviar/recibir datos en segundo plano (ideal para SPAs y apps reactivas).

    - Almacenamiento local:
      Ofrece mecanismos como localStorage y sessionStorage para guardar datos en el navegador del usuario sin necesidad de una base de datos.
	  
3.- Ejemplos de funcionalidades que solo pueden ser posibles gracias al uso de JavaScript (como la interactividad en formularios, listas din�micas, validaci�n en tiempo real, etc.).

    a. Validaci�n de formularios en tiempo real
       - Mostrar mensajes de error mientras el usuario escribe.
       - Verificar formatos (como correos o contrase�as seguras) sin esperar a enviar el formulario.

         <input type="email" oninput="validarCorreo(this.value)">
         <span id="mensaje"></span>
	   
    b. Listas o campos din�micos
       - Agregar o eliminar campos de un formulario sin recargar la p�gina.
       - Ejemplo: a�adir m�s participantes o productos en una compra.

         document.getElementById("agregarCampo").addEventListener("click", () => {
             const nuevoInput = document.createElement("input");
             document.getElementById("contenedor").appendChild(nuevoInput);
         });
		 
    c. Mostrar u ocultar contenido din�micamente
       - Acordeones, pesta�as, men�s desplegables.
       - Control total de visibilidad sin recargar la p�gina.

         menu.style.display = (menu.style.display === "none") ? "block" : "none";
		 
    d. Efectos visuales y animaciones controladas
       - Transiciones personalizadas al hacer scroll, al hacer hover, etc.
       - Ejemplo: sliders de im�genes, modales, pop-ups, parallax.

    e. Actualizaci�n de datos sin recargar la p�gina
       - Tablas o gr�ficos que cambian en tiempo real (como dashboards o apps de monitoreo).
       - Se usa setInterval(), WebSockets o fetch() en bucles.

    f. Notificaciones en el navegador
       - Solicitar permiso y mostrar mensajes incluso si el usuario est� en otra pesta�a.

	 alert("Este navegador no soporta notificaciones.");
		 
    g. Juegos interactivos o simulaciones
       - Juegos tipo quiz, puzzles, o f�sicos con interacci�n en tiempo real (usando canvas o motores como Phaser.js).

--------------------------------------------------------------------------------------
## Estructura del Proyecto
--------------------------------------------------------------------------------------

- index.html
  P�gina principal de la aplicaci�n. Contiene la interfaz para agregar, mostrar y eliminar tareas. Incluye componentes como:
  - Campo de entrada de texto.
  - Lista visual de tareas con IDs, fechas y botones de eliminaci�n.
  - Uso de Bootstrap e �conos para estilo y estructura.

- definiciones.html 
  P�gina informativa que explica el rol de JavaScript, sus ventajas y funcionalidades pr�cticas en desarrollo web.
  Utiliza dise�o responsivo y estructura sem�ntica.

- script.js
  Archivo JavaScript principal que contiene la l�gica de la aplicaci�n:
  - Agregado din�mico de tareas.
  - Validaci�n de entradas.
  - Eliminaci�n y renderizado de tareas.
  - Manejo de fecha actual.
  - Cambios de vista entre secciones usando eventos.
  - Avisos visuales con diferentes tipos de mensajes ('success', 'warning', etc.).

- style.css
  Archivo de estilos personalizados ubicado en 'assets/css/'. Aporta dise�o visual adicional a la aplicaci�n, incluyendo clases como:
  - '.mensaje.success', '.mensaje.warning' para los mensajes de estado.
  - Estilos adaptativos para tareas, botones y secciones vac�as.
  - Espaciado, colores y ajustes responsivos.
  
--------------------------------------------------------------------------------------
## Tecnolog�as utilizadas
--------------------------------------------------------------------------------------

- HTML5
- CSS  
- JavaScript 
- Bootstrap 5
- Bootstrap Icons 
- jQuery (para efectos b�sicos de mostrar/ocultar)

--------------------------------------------------------------------------------------
## Descripci�n del Proyecto
--------------------------------------------------------------------------------------

La aplicaci�n lista de tareas (To-Do List) que permite al usuario:
- Escribir nuevas tareas mediante un campo de entrada.
- Agregarlas a una lista visual con identificaci�n y fecha.
- Eliminar tareas con un solo clic.
- Visualizar retroalimentaci�n inmediata sobre acciones realizadas.
- Conmutar entre la secci�n de proyecto y la secci�n te�rica de definiciones.

--------------------------------------------------------------------------------------
## Skillnest 2025 - Evaluaci�n de Portafolio [Actividad evaluada]
--------------------------------------------------------------------------------------