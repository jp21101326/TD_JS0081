const { Proyecto, Tarea } = require('../models/tables');

const createProyecto = async (data) => {
  try {
    const proyecto = await Proyecto.create(data);
    return proyecto;
  } catch (error) {
    console.error('Error en Creación de proyecto:', error);
    throw error;
  }
};

const getAllProyectos = async () => {
  try {
    const proyectos = await Proyecto.findAll({ include: { model: Tarea, as: 'tareas' } });
    return proyectos;
  } catch (error) {
    console.error('Error en Obtención de proyectos:', error);
    throw error;
  }
};

const getProyectoById = async (id) => {
  try {
    const proyecto = await Proyecto.findByPk(id, { include: { model: Tarea, as: 'tareas' } });
    if (!proyecto) throw new Error('Proyecto no encontrado');
    return proyecto;
  } catch (error) {
    console.error('Error en Obtención de proyecto por ID:', error);
    throw error;
  }
};

const deleteProyecto = async (id) => {
  try {
    const proyecto = await Proyecto.findByPk(id);
    if (!proyecto) throw new Error('Proyecto no encontrado');
    await proyecto.destroy(); // tasks cascadas por onDelete: 'CASCADE'
    return true;
  } catch (error) {
    console.error('Error en Eliminación de proyecto:', error);
    throw error;
  }
};

module.exports = {
  createProyecto,
  getAllProyectos,
  getProyectoById,
  deleteProyecto
};
