const { Pedido, Usuario } = require('../models/tables');
//const sequelize = require('../config/db');

const createPedido = async (pedidoData) => {
  const usuario = await Usuario.findByPk(pedidoData.usuarioId);
  if (!usuario) throw { status: 404, message: 'Usuario no encontrado' };

  const pedido = await Pedido.create({
    producto: pedidoData.producto,
    cantidad: pedidoData.cantidad,
    usuarioId: pedidoData.usuarioId
  });

  return pedido;
};

const getPedidosByUsuario = async (usuarioId) => {
  try {
    return await Pedido.findAll({ where: { usuarioId } });
  } catch (error) {
    console.error('Error al obtener pedidos por usuario:', error);
    throw error;
  }
};

module.exports = {
  createPedido,
  getPedidosByUsuario
};
