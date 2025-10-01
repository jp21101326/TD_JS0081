# M6_AE5_ABP - Ejercicio Individual: Gestor de Tareas en Node.js

## Contexto
Este ejercicio consiste en desarrollar una pequeña aplicación en **Node.js** que permita gestionar tareas de manera sencilla, almacenándolas en archivos JSON. La aplicación permitirá **crear, leer, modificar y eliminar tareas** sin usar bases de datos, utilizando únicamente archivos de texto plano para la persistencia de datos.

---

## Tecnologías Utilizadas
- **Node.js**: entorno de ejecución de JavaScript del lado del servidor.
- **Express**: framework web para montar el servidor y gestionar rutas.
- **fs**: módulo nativo de Node.js para manejar el sistema de archivos y la persistencia en `tasks.json`.

---

## Configuración del Proyecto
1. Inicializar el proyecto con npm:
   npm init -y
   
2. Instalar las dependencias:
   npm install express

3. Crear la estructura de archivos:

/M6_AE5_ABP
├─ server.js
├─ fileUtils.js
├─ tasks.json
└─ package.json

   tasks.json: archivo donde se almacenarán las tareas en formato JSON. Contenido inicial:

## Funcionalidad
1. Crear una tarea
   Ruta: POST /tasks
   Descripción: Permite enviar una tarea en formato JSON con propiedades id, title y completed.

    Ejemplo de body:

    json
    Copiar código
    {
    "id": 1,
    "title": "Comprar leche",
    "completed": false
    }

2. Obtener todas las tareas
   Ruta: GET /tasks
   Descripción: Devuelve todas las tareas almacenadas en tasks.json.

3. Modificar una tarea
   Ruta: PUT /tasks/:id
   Descripción: Actualiza una tarea específica según su id. Se puede modificar title o completed.

    Ejemplo de body:
    {
    "title": "Comprar leche y pan",
    "completed": true
    }

4. Eliminar una tarea
   Ruta: DELETE /tasks/:id
   Descripción: Elimina una tarea específica según su id.

## Persistencia con el Sistema de Archivos
Se utiliza el módulo fs de Node.js para manejar el archivo tasks.json:

1. Escribir datos:
   fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));

2. Leer datos:
   const tasks = JSON.parse(fs.readFileSync('tasks.json', 'utf-8'));

## Modularización del Código
La lógica de lectura, escritura y eliminación de datos se encuentra en fileUtils.js. Este archivo exporta funciones reutilizables para interactuar con tasks.json.

    Ejemplo de uso en server.js:

    const { getTasks, saveTask, updateTask, deleteTask } = require('./fileUtils');

    app.get('/tasks', (req, res) => {
        const tasks = getTasks();
        res.json(tasks);
    });

## Ejecución del Proyecto
1. Iniciar el servidor:
   node server.js

2. Probar las rutas usando Postman o curl:
   GET /tasks
   POST /tasks
   PUT /tasks/:id
   DELETE /tasks/:id

