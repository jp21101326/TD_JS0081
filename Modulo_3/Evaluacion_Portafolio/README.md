--------------------------------------------------------------------------------------
# Aplicación Lista de Tareas (To-Do List) - Evaluación de Portafolio
--------------------------------------------------------------------------------------
 Este proyecto es una aplicación web interactiva desarrollada como parte de una evaluación de portafolio.
 Su objetivo principal es demostrar las funcionalidades que JavaScript puede ofrecer en el desarrollo web moderno,
 especialmente en la manipulación del DOM y la interacción con el usuario en tiempo real.

--------------------------------------------------------------------------------------
## Explicar las caracteristicas fundamentales de JavaScript para el desarrollo web
--------------------------------------------------------------------------------------

1.- Qué es JavaScript y su rol en el desarrollo de aplicaciones web.
    JavaScript es un lenguaje de programación interpretado, orientado a objetos y basado en eventos.
	Permite crear funcionalidades dinámicas e interactivas en páginas web, como validaciones, animaciones,
	interacción con el usuario y modificación del DOM sin recargar la página.
	
2.- Las ventajas de usar JavaScript para crear aplicaciones interactivas en el navegador.
    - Manipulación dinámica del DOM: 
      Permite modificar elementos HTML y estilos CSS en tiempo real, lo que facilita interfaces interactivas.

    - Captura de eventos del usuario:
      Puede detectar y responder a eventos como clics, movimientos del mouse, teclas presionadas, scroll, etc.

    - Comunicación con servidores sin recargar la página:
      Usando tecnologías como AJAX o Fetch API, es posible enviar/recibir datos en segundo plano (ideal para SPAs y apps reactivas).

    - Almacenamiento local:
      Ofrece mecanismos como localStorage y sessionStorage para guardar datos en el navegador del usuario sin necesidad de una base de datos.
	  
3.- Ejemplos de funcionalidades que solo pueden ser posibles gracias al uso de JavaScript (como la interactividad en formularios, listas dinámicas, validación en tiempo real, etc.).

    a. Validación de formularios en tiempo real
       - Mostrar mensajes de error mientras el usuario escribe.
       - Verificar formatos (como correos o contraseñas seguras) sin esperar a enviar el formulario.

         <input type="email" oninput="validarCorreo(this.value)">
         <span id="mensaje"></span>
	   
    b. Listas o campos dinámicos
       - Agregar o eliminar campos de un formulario sin recargar la página.
       - Ejemplo: añadir más participantes o productos en una compra.

         document.getElementById("agregarCampo").addEventListener("click", () => {
             const nuevoInput = document.createElement("input");
             document.getElementById("contenedor").appendChild(nuevoInput);
         });
		 
    c. Mostrar u ocultar contenido dinámicamente
       - Acordeones, pestañas, menús desplegables.
       - Control total de visibilidad sin recargar la página.

         menu.style.display = (menu.style.display === "none") ? "block" : "none";
		 
    d. Efectos visuales y animaciones controladas
       - Transiciones personalizadas al hacer scroll, al hacer hover, etc.
       - Ejemplo: sliders de imágenes, modales, pop-ups, parallax.

    e. Actualización de datos sin recargar la página
       - Tablas o gráficos que cambian en tiempo real (como dashboards o apps de monitoreo).
       - Se usa setInterval(), WebSockets o fetch() en bucles.

    f. Notificaciones en el navegador
       - Solicitar permiso y mostrar mensajes incluso si el usuario está en otra pestaña.

	 alert("Este navegador no soporta notificaciones.");
		 
    g. Juegos interactivos o simulaciones
       - Juegos tipo quiz, puzzles, o físicos con interacción en tiempo real (usando canvas o motores como Phaser.js).

--------------------------------------------------------------------------------------
## Estructura del Proyecto
--------------------------------------------------------------------------------------

- index.html
  Página principal de la aplicación. Contiene la interfaz para agregar, mostrar y eliminar tareas. Incluye componentes como:
  - Campo de entrada de texto.
  - Lista visual de tareas con IDs, fechas y botones de eliminación.
  - Uso de Bootstrap e íconos para estilo y estructura.

- definiciones.html 
  Página informativa que explica el rol de JavaScript, sus ventajas y funcionalidades prácticas en desarrollo web.
  Utiliza diseño responsivo y estructura semántica.

- script.js
  Archivo JavaScript principal que contiene la lógica de la aplicación:
  - Agregado dinámico de tareas.
  - Validación de entradas.
  - Eliminación y renderizado de tareas.
  - Manejo de fecha actual.
  - Cambios de vista entre secciones usando eventos.
  - Avisos visuales con diferentes tipos de mensajes ('success', 'warning', etc.).

- style.css
  Archivo de estilos personalizados ubicado en 'assets/css/'. Aporta diseño visual adicional a la aplicación, incluyendo clases como:
  - '.mensaje.success', '.mensaje.warning' para los mensajes de estado.
  - Estilos adaptativos para tareas, botones y secciones vacías.
  - Espaciado, colores y ajustes responsivos.
  
--------------------------------------------------------------------------------------
## Tecnologías utilizadas
--------------------------------------------------------------------------------------

- HTML5
- CSS  
- JavaScript 
- Bootstrap 5
- Bootstrap Icons 
- jQuery (para efectos básicos de mostrar/ocultar)

--------------------------------------------------------------------------------------
## Descripción del Proyecto
--------------------------------------------------------------------------------------

La aplicación lista de tareas (To-Do List) que permite al usuario:
- Escribir nuevas tareas mediante un campo de entrada.
- Agregarlas a una lista visual con identificación y fecha.
- Eliminar tareas con un solo clic.
- Visualizar retroalimentación inmediata sobre acciones realizadas.
- Conmutar entre la sección de proyecto y la sección teórica de definiciones.

--------------------------------------------------------------------------------------
## Skillnest 2025 - Evaluación de Portafolio [Actividad evaluada]
--------------------------------------------------------------------------------------