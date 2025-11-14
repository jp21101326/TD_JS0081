# 🛍️ M7_AE2_ABP - Gestión de Productos

## 📘 Descripción del Proyecto

Este proyecto consiste en desarrollar una aplicación en Node.js que
permite gestionar productos de una tienda, utilizando una base de datos
PostgreSQL.\
Cada producto tiene los siguientes atributos: nombre, precio, categoría
y stock.

La aplicación implementa operaciones CRUD (Crear, Leer, Actualizar,
Eliminar) utilizando el paquete pg y siguiendo buenas prácticas de
seguridad y desarrollo, como: - Uso de consultas parametrizadas
(prevención de SQL Injection) - Validación de parámetros - Consultas
asíncronas con async/await - Implementación de pool de conexiones -
Configuración de variables de entorno

------------------------------------------------------------------------

## ⚙️ Tecnologías Utilizadas

-   Node.js (entorno de ejecución)
-   Express (framework web)
-   pg (conexión a PostgreSQL)
-   dotenv (manejo de variables de entorno)
-   PostgreSQL (base de datos relacional)

------------------------------------------------------------------------

## 📁 Estructura del Proyecto

La aplicación se organiza de manera modular, separando la configuración
de la base de datos, las rutas y el servidor principal para mantener un
código limpio y escalable.

------------------------------------------------------------------------

## 🚀 Instalación y Configuración

1️⃣ Crear una carpeta llamada **gestion-productos** y acceder a ella.\
2️⃣ Inicializar el proyecto con npm init -y.\
3️⃣ Instalar las dependencias necesarias: express, pg y dotenv.\
4️⃣ Crear el archivo **.env** con las variables de conexión a la base de
datos (usuario, contraseña, host, puerto y nombre de la base).\
5️⃣ Configurar la base de datos PostgreSQL creando la base **tienda_db**
y la tabla **productos** con los campos requeridos.\
6️⃣ Implementar un pool de conexiones y las rutas para realizar
operaciones CRUD sobre los productos.\
7️⃣ Ejecutar el servidor y probar las rutas desde un cliente como Postman
o el navegador.

------------------------------------------------------------------------

## 🧪 Ejecución del Proyecto

Una vez configurado todo, se inicia el servidor y se puede acceder a los
endpoints para gestionar los productos: listar, agregar, modificar o
eliminar.

------------------------------------------------------------------------

## ✅ Puntos Relevantes Tratados

-   Creación de estructura de proyecto Node.js.
-   Configuración del paquete pg y manejo de conexiones.
-   Uso del pool de conexiones a PostgreSQL.
-   Manejo de variables de entorno con dotenv.
-   Implementación de consultas parametrizadas (prevención de SQL
    Injection).
-   Uso de async/await para consultas asíncronas.
-   Validación y manejo de errores.
-   CRUD completo de productos.
-   Buenas prácticas de modularización y estructura de código.


