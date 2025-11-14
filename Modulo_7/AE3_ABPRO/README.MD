# M7_AE3_ABPRO - Gestión de Datos con Node.js y PostgreSQL

## Descripción del Proyecto

Este proyecto grupal tiene como propósito aplicar los conocimientos
adquiridos sobre la manipulación de bases de datos **PostgreSQL** desde
**Node.js**, utilizando el paquete **pg**.\
El trabajo consiste en implementar rutas que permitan realizar
operaciones **CRUD parciales** (Insertar, Actualizar y Eliminar) sobre
una tabla definida por el equipo, haciendo uso de **consultas
parametrizadas**, **async/await**, y un **manejo adecuado de errores**.

------------------------------------------------------------------------

## Objetivo General

Desarrollar en equipo una aplicación Node.js que se conecte a una base
de datos PostgreSQL y permita gestionar datos de una tabla mediante
rutas API, asegurando buenas prácticas en el uso de parámetros,
validaciones y manejo de respuestas.

------------------------------------------------------------------------

## Tecnologías Utilizadas

-  **Node.js** -- entorno de ejecución JavaScript.\
-  **Express** -- framework para crear rutas y manejar peticiones
    HTTP.\
-  **pg** -- cliente para conectarse a bases de datos PostgreSQL.\
-  **dotenv** -- manejo de variables de entorno.\
-  **PostgreSQL** -- sistema de gestión de base de datos relacional.

------------------------------------------------------------------------

## Estructura del Proyecto

La aplicación sigue una estructura modular que incluye: - **server.js**:
archivo principal que levanta el servidor Express.\
- **db/pool.js**: configuración del pool de conexiones a PostgreSQL.\
- **routes/items.js**: rutas para las operaciones de inserción,
actualización y eliminación.\
- **.env**: archivo con variables de entorno para la conexión a la base
de datos.

Esta organización permite un mantenimiento más claro y un desarrollo
colaborativo más fluido.

------------------------------------------------------------------------

## Diseño de la Tabla

Cada equipo define su propio dominio (por ejemplo: productos, películas,
usuarios, servicios, etc.), pero la tabla debe incluir los siguientes
campos mínimos:

  Campo         Tipo de Dato         Descripción
  ------------- -------------------- ----------------------------------
  id            SERIAL PRIMARY KEY   Identificador único del registro
  nombre        TEXT                 Nombre del elemento
  descripcion   TEXT                 Breve descripción
  precio        NUMERIC              Valor o costo del elemento
  disponible    BOOLEAN              Estado de disponibilidad

------------------------------------------------------------------------

## Funcionalidades Principales

### 1️⃣ Inserción de Registros (POST /items)

-   Recibe los datos por `req.body`.
-   Inserta un nuevo registro usando **parámetros** para evitar SQL
    Injection.\
-   Devuelve el **ID del nuevo registro** (`RETURNING id`) y el **conteo
    de registros insertados** (`rowCount`).

### 2️⃣ Actualización de Registros (PUT /items/:id)

-   Recibe el **ID** por `req.params` y los datos actualizados por
    `req.body`.\
-   Actualiza el registro correspondiente de forma parametrizada.\
-   Devuelve la **cantidad de registros modificados** (`rowCount`).

### 3️⃣ Eliminación de Registros (DELETE /items/:id)

-   Recibe el **ID** por `req.params`.\
-   Elimina el registro asociado.\
-   Devuelve la **cantidad de registros eliminados** (`rowCount`).

------------------------------------------------------------------------

##  Buenas Prácticas Implementadas

-   Uso de **consultas parametrizadas** con `pool.query()` para evitar
    inyección SQL.\
-   Implementación de **async/await** en todas las operaciones para un
    control asíncrono claro.\
-   Uso de **bloques try/catch** para manejo seguro de errores.\
-   Respuestas estandarizadas con **mensajes JSON claros** y códigos de
    estado HTTP apropiados.\
-   Reporte de **código de error (err.code)** y **mensaje descriptivo**
    ante fallas.

------------------------------------------------------------------------

##  Ejecución del Proyecto

1️⃣ Clonar o descargar el repositorio del proyecto.\
2️⃣ Crear el archivo **.env** con las variables de conexión a la base de
datos.\
3️⃣ Ejecutar la base de datos PostgreSQL y crear la tabla definida por el
equipo.\
4️⃣ Instalar dependencias con:

    npm install

5️⃣ Iniciar el servidor con:

    node server.js

6️⃣ Probar las rutas mediante **Postman**, **Insomnia** u otra
herramienta de pruebas HTTP.

------------------------------------------------------------------------

## Dinámica de Trabajo Grupal

Cada equipo trabajó colaborativamente en las siguientes etapas: - Diseño
de la estructura de la base de datos.\
- Implementación de las rutas CRUD parciales.\
- Pruebas y validaciones de las operaciones.\
- Manejo y presentación de errores.\
- Documentación conjunta y entrega final del proyecto.

------------------------------------------------------------------------

## Autores

**Equipo de Desarrollo:** SALA 1\
**Asignatura:** Módulo 7 - AE3_ABPRO\
**Proyecto:** Gestión de datos con Node.js y PostgreSQL

------------------------------------------------------------------------
