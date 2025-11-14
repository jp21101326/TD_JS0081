//Importaciones
const express = require('express');
const { leerTareas, escribirTareas } = require('./fileUtils.js'); 

const app = express();
const PORT = 8080;

//middleware para parsear el body de las peticiones
app.use(express.json());

// --------------------------------------------------------------------------
// A. Crear una tarea: 
//    - Crea una ruta POST /tasks para permitir que el usuario envíe una tarea en formato JSON (con propiedades como id, title, completed)
//    - La tarea debe guardarse en el archivo tasks.json.
// --------------------------------------------------------------------------
app.post('/tasks', (req, res) => {
    const tareas = leerTareas();
    const { title, completed } = req.body;

    // Validación básica
    if (!title) {
        return res.status(400).json({ message: "El título de la tarea es obligatorio." });
    }

    // 2. Crear el objeto de la nueva tarea con un ID único
    const nuevaTarea = {
         id: tareas.length > 0 ? Math.max(...tareas.map(t => t.id)) + 1 : 1, 
        title: title,
        completed: completed !== undefined ? Boolean(completed) : false // Por defecto, es false
    };

    tareas.push(nuevaTarea); // Agregar la nueva tarea a la lista
    escribirTareas(tareas); // Guardar la lista actualizada en el archivo
    res.status(201).json(nuevaTarea); // Responder con la nueva tarea creada
});

// --------------------------------------------------------------------------
// B. Obtener todas las tareas:
//    - Crea una ruta GET /tasks que lea el archivo tasks.json y devuelva todas las tareas en formato JSON.
// --------------------------------------------------------------------------
app.get('/tasks', (req, res) => {
    const tareas = leerTareas();
    res.json(tareas);
});

// --------------------------------------------------------------------------
// C. Modificar una tarea:
//    - Crea una ruta PUT /tasks/:id para actualizar una tarea específica. Los datos que se actualizarán pueden ser el title o el estado de completed.
// --------------------------------------------------------------------------
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id); 
    const tareas = leerTareas();
    const taskIndex = tareas.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).json({ message: "Tarea no encontrada." });
    }

    // Aplicar las actualizaciones
    const tareaAActualizar = tareas[taskIndex];
    if (req.body.title !== undefined) {
        tareaAActualizar.title = req.body.title;
    }
    if (req.body.completed !== undefined) {
        tareaAActualizar.completed = Boolean(req.body.completed);
    }
    
    escribirTareas(tareas); //guardar los cambios
    res.json(tareaAActualizar); //enviar la tarea actualizada
});

// --------------------------------------------------------------------------
// D. Eliminar una tarea:
//    - Crea una ruta DELETE /tasks/:id para eliminar una tarea según su id.
// --------------------------------------------------------------------------
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id); 
    let tareas = leerTareas();
    const initialLength = tareas.length;

    tareas = tareas.filter(t => t.id !== taskId);
    if (tareas.length === initialLength) {
        return res.status(404).json({ message: "Tarea no encontrada." });
    }

    escribirTareas(tareas);  //guardar los cambios
    res.status(204).send();  //enviar respuesta de éxito sin contenido
});

// --------------------------------------------------------------------------
// Iniciar el servidor
// --------------------------------------------------------------------------
app.listen(PORT, () => {
    console.log(`Servidor de tareas ejecutándose en http://localhost:${PORT}`);
});