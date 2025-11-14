const { Usuario, Pedido } = require('../models/tables');
//const sequelize = require('../config/db');

const createUsuario = async (data) => {
  try {
    return await Usuario.create(data);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
};

const getAllUsuarios = async () => {
  try {
    return await Usuario.findAll({ include: { model: Pedido, as: 'pedidos' } });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

const getUsuarioById = async (id) => {
  try {
    return await Usuario.findByPk(id, { include: { model: Pedido, as: 'pedidos' } });
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    throw error;
  }
};

const updateUsuario = async (id, data) => {
  try {
    const [rowsUpdated] = await Usuario.update(data, { where: { id } });
    return rowsUpdated;
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    throw error;
  }
};

const deleteUsuario = async (id) => {
  try {
    return await Usuario.destroy({ where: { id } });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    throw error;
  }
};

module.exports = {
  createUsuario,
  getAllUsuarios,
  getUsuarioById,
  updateUsuario,
  deleteUsuario
};
