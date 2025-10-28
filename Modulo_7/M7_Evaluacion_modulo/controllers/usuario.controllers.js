const { Usuario, Rol } = require('../models/tables');
const sequelize = require('../config/db');

const crearUsuario = async (data) => {
    try {
        const usuario = await Usuario.create(data);
        return usuario;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const obtenerUsuarios = async () => {
    return await Usuario.findAll({ include: 'roles' });
};

const obtenerUsuarioPorId = async (id) => {
    return await Usuario.findByPk(id, { include: 'roles' });
};

const actualizarUsuario = async (id, data) => {
    return await Usuario.update(data, { where: { id } });
};

const eliminarUsuario = async (id) => {
    return await Usuario.destroy({ where: { id } });
};

// NUEVO: agregar roles a un usuario
const agregarRolesAUsuario = async (usuarioId, rolesIds) => {
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) return null;

    await usuario.addRoles(rolesIds); // Puede ser un solo id o un array de ids
    return await Usuario.findByPk(usuarioId, { include: 'roles' });
};

// NUEVO: quitar roles a un usuario
const quitarRolesDeUsuario = async (usuarioId, rolesIds) => {
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) return null;

    await usuario.removeRoles(rolesIds);
    return await Usuario.findByPk(usuarioId, { include: 'roles' });
};

module.exports = { 
    crearUsuario, 
    obtenerUsuarios, 
    obtenerUsuarioPorId, 
    actualizarUsuario, 
    eliminarUsuario,
    agregarRolesAUsuario,
    quitarRolesDeUsuario
};
