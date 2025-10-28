const Usuario = require('./usuario');
const Rol = require('./rol');

// Relación muchos a muchos: Usuario <-> Rol
Usuario.belongsToMany(Rol, { through: 'UsuarioRol', as: 'roles', foreignKey: 'usuarioId' });
Rol.belongsToMany(Usuario, { through: 'UsuarioRol', as: 'usuarios', foreignKey: 'rolId' });

module.exports = { Usuario, Rol };
