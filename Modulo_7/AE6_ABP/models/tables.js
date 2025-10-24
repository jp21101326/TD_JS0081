// models/tables.js
const Proyecto = require('./proyecto');
const Tarea = require('./tarea');
const Empleado = require('./empleado');

// 1:N Proyecto -> Tarea
Proyecto.hasMany(Tarea, { as: 'tareas', foreignKey: 'proyectoId', onDelete: 'CASCADE', hooks: true });
Tarea.belongsTo(Proyecto, { as: 'proyecto', foreignKey: 'proyectoId' });

// N:M Tarea <-> Empleado a través tabla intermedia 'TareasEmpleados'
Tarea.belongsToMany(Empleado, { through: 'TareasEmpleados', as: 'empleados', foreignKey: 'tareaId' });
Empleado.belongsToMany(Tarea, { through: 'TareasEmpleados', as: 'tareas', foreignKey: 'empleadoId' });

module.exports = {
  Proyecto,
  Tarea,
  Empleado
};
