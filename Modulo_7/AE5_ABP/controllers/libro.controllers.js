const Libro = require('../models/libro');

const createLibro = async (data) => {
  try {
    const newLibro = await Libro.create(data);
    return newLibro;
  } catch (error) {
    console.error('❌ Error al crear libro:', error.message);
    return false;
  }
};

const getAllLibros = async () => {
  try {
    return await Libro.findAll();
  } catch (error) {
    console.error('❌ Error al listar libros:', error.message);
    return false;
  }
};

const getLibroById = async (id) => {
  try {
    return await Libro.findByPk(id);
  } catch (error) {
    console.error('❌ Error al buscar libro:', error.message);
    return false;
  }
};

const updateLibro = async (id, data) => {
  try {
    return await Libro.update(data, { where: { id } });
  } catch (error) {
    console.error('❌ Error al actualizar libro:', error.message);
    return false;
  }
};

const deleteLibro = async (id) => {
  try {
    return await Libro.destroy({ where: { id } });
  } catch (error) {
    console.error('❌ Error al eliminar libro:', error.message);
    return false;
  }
};

module.exports = {
  createLibro,
  getAllLibros,
  getLibroById,
  updateLibro,
  deleteLibro,
};
