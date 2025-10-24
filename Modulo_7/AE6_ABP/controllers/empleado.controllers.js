const { Empleado, Tarea } = require('../models/tables');

const createEmpleado = async (data) => {
  try {
    const empleado = await Empleado.create(data);
    return empleado;
  } catch (error) {
    console.error('Error en Creación de empleado:', error);
    throw error;
  }
};

const getEmpleadoById = async (id) => {
  try {
    const emp = await Empleado.findByPk(id, { include: { model: Tarea, as: 'tareas' } });
    if (!emp) throw new Error('Empleado no encontrado');
    return emp;
  } catch (error) {
    console.error('Error en Obtención de empleado por ID:', error);
    throw error;
  }
};

module.exports = { createEmpleado, getEmpleadoById };
