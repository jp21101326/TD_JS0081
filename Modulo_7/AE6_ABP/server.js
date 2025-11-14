// server.js
const sequelize = require('./config/db');
const { Proyecto, Tarea, Empleado } = require('./models/tables');
const createProyectoSeeds = require('./seeders/proyecto.seeder');
const createTareaSeeds = require('./seeders/tarea.seeder');
const createEmpleadoSeeds = require('./seeders/empleado.seeder');

const {
  createProyecto, getAllProyectos, getProyectoById, deleteProyecto
} = require('./controllers/proyecto.controllers');

const {
  createTarea, updateTarea, assignEmpleadosToTarea
} = require('./controllers/tarea.controllers');

const { createEmpleado } = require('./controllers/empleado.controllers');

const main = async () => {
  try {
    // WARNING: force: true borra datos. Usar sólo en desarrollo/seed.
    await sequelize.sync({ force: true });

    // Seeders (opcional)
    await createProyectoSeeds();
    await createEmpleadoSeeds();
    await createTareaSeeds();

    // Ejemplos de uso:

    // 1. Crear un proyecto
    const nuevoProyecto = await createProyecto({
      nombre: 'Proyecto Gamma',
      descripcion: 'Proyecto creado desde controller',
      fecha_inicio: new Date()
    });
    console.log('Proyecto creado:', nuevoProyecto.toJSON());

    // 2. Crear una tarea en un proyecto
    const nuevaTarea = await createTarea(nuevoProyecto.id, {
      titulo: 'Tarea inicial',
      descripcion: 'Descripción tarea',
      estado: 'pendiente'
    });
    console.log('Tarea creada:', nuevaTarea.toJSON());

    // 3. Crear empleado y asignarlo a la tarea
    const emp = await createEmpleado({ nombre: 'Luis', email: 'luis@ejemplo.cl' });
    const tareaConEmps = await assignEmpleadosToTarea(nuevaTarea.id, [emp.id]);
    console.log('Tarea con empleados:', JSON.stringify(tareaConEmps, null, 2));

    // 4. Leer proyectos con tareas
    const proyectos = await getAllProyectos();
    console.log('Proyectos con tareas:', JSON.stringify(proyectos, null, 2));

    // 5. Actualizar tarea (estado)
    const tareaActualizada = await updateTarea(nuevaTarea.id, { estado: 'en progreso' });
    console.log('Tarea actualizada:', tareaActualizada.toJSON());

    // 6. Borrar proyecto (y tareas por cascade)
    // await deleteProyecto(nuevoProyecto.id);
    // console.log('Proyecto borrado');

    return;
  } catch (error) {
    console.error('Error en main:', error);
  } finally {
    await sequelize.close();
  }
};

main();
