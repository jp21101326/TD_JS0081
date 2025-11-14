const { Tarea, Proyecto, Empleado } = require('../models/tables');

const createTarea = async (proyectoId, data) => {
  try {
    const proyecto = await Proyecto.findByPk(proyectoId);
    if (!proyecto) throw new Error('Proyecto no existe');
    const tarea = await Tarea.create({ ...data, proyectoId });
    return tarea;
  } catch (error) {
    console.error('Error en Creación de tarea:', error);
    throw error;
  }
};

const updateTarea = async (id, data) => {
  try {
    const tarea = await Tarea.findByPk(id);
    if (!tarea) throw new Error('Tarea no encontrada');

    // Solo permitir cambios válidos en estado: validación redundante
    if (data.estado && !['pendiente','en progreso','completada'].includes(data.estado)) {
      throw new Error('Estado inválido');
    }

    await tarea.update(data);
    return tarea;
  } catch (error) {
    console.error('Error en Actualización de tarea:', error);
    throw error;
  }
};

const assignEmpleadosToTarea = async (tareaId, empleadoIds = []) => {
  try {
    const tarea = await Tarea.findByPk(tareaId);
    if (!tarea) throw new Error('Tarea no encontrada');

    // buscar empleados existentes
    const empleados = await Empleado.findAll({ where: { id: empleadoIds } });
    if (empleados.length !== empleadoIds.length) throw new Error('Algún empleado no existe');

    await tarea.addEmpleados(empleados); // método generado por belongsToMany: addEmpleados
    return await tarea.reload({ include: 'empleados' });
  } catch (error) {
    console.error('Error en Asignación de empleados a tarea:', error);
    throw error;
  }
};

const deleteTarea = async (id) => {
  try {
    const tarea = await Tarea.findByPk(id);
    if (!tarea) throw new Error('Tarea no encontrada');
    await tarea.destroy();
    return true;
  } catch (error) {
    console.error('Error en Eliminación de tarea:', error);
    throw error;
  }
};

module.exports = {
  createTarea,
  updateTarea,
  assignEmpleadosToTarea,
  deleteTarea
};
