## Proyecto: Aplicación de Gestión de Productos en un E-Commerce

Este proyecto es parte de una evaluación de portafolio y tiene como objetivo el desarrollo de una aplicación básica de gestión de productos para un e-commerce. 

La aplicación se construyó utilizando JavaScript moderno (ES6+), aplicando conceptos de Programación Orientada a Objetos (OOP), manipulación del DOM, y el consumo de una API externa de productos.  

## Objetivos del Proyecto

	Poner en práctica los fundamentos de la OOP en JavaScript.
	Implementar funcionalidades modernas de ES6+ (clases, funciones flecha, desestructuración, template literals).  
	Manipular dinámicamente el **DOM** para mostrar productos y gestionar un carro de compras.  
	Trabajar con programación asincrónica usando fetch y async/await para obtener datos de una API externa.  
	Implementar un manejo básico de errores en peticiones HTTP.  


## Características Implementadas

	Clase Producto con las propiedades esenciales (id, nombre, precio, categoría, descripción, imagen). 
	Método para mostrar la información del producto en un formato legible. 
	Interfaz HTML5 con una lista de productos y un carro de compras.
	Estilos CSS para una presentación clara y minimalista. 
	Manipulación del DOM para renderizar productos dinámicamente.
	Eventos de usuario: botón para agregar productos al carro.
	Consumo de API externa para obtener productos y mostrarlos en la interfaz. 
	Manejo de errores al consultar la API (por ejemplo, cuando no hay conexión o la respuesta falla).  


## Tecnologías Utilizadas

	HTML5, Estructura de la interfaz.
	CSS3, Estilos básicos para una experiencia limpia.
	JavaScript (ES6+), Lógica de la aplicación:
	Clases y objetos.
	Funciones flecha.
	Desestructuración.
	Template literals.
	Fetch API y async/await.
	Manejo de eventos y manipulación del DOM.


## Ejemplo de Flujo de Uso

	Al cargar la aplicación, se realiza una petición fetch a una API externa para traer productos.
	Los productos se muestran de manera dinámica en la página.
	Cada producto cuenta con un botón de "Agregar al carro".
	El usuario puede ver en tiempo real los productos seleccionados en su carro.
	En caso de error con la API, la interfaz muestra un mensaje informativo en lugar de fallar silenciosamente.


## Estructura Esperada del Proyecto

M4_Evaluación de portafolio
 ┣ 📂 assets
 ┃        ┣ 📂 css
 ┃        ┃ ┗ styles.css
 ┃        ┣ 📂 js
 ┃             ┗ script.css
 ┣ 📂 crud
 ┃ ┗ productos.html
 ┃ ┣ styles.css
 ┃ ┗ script.j
 ┃
 ┣ index.html
 ┗ README.md


## Consideraciones
Al iniciar index.html  a través de visual studio code u otra aplicación se debe anteponer en el browser LOCALHOST para poder visualizar las imágenes obtenidas de la API https://api.escuelajs.co/api/v1/products

Ejemplo: 

http://127.0.0.1:3000/Modulo_4/portafolio/index.html

Debe quedar:

http://localho

En el footer se encuentra botón de acceso a panel de administración:
Clave de acceso : 12345