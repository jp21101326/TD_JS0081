const Usuario = require('./usuario');
const Pedido = require('./pedido');

Usuario.hasMany(Pedido, {
  as: 'pedidos',
  foreignKey: 'usuarioId',
  onDelete: 'CASCADE'
});

Pedido.belongsTo(Usuario, {
  as: 'usuario',
  foreignKey: 'usuarioId'
});

module.exports = { Usuario, Pedido };
