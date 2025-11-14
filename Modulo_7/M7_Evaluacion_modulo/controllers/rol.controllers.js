const { Rol, Usuario } = require('../models/tables');
const sequelize = require('../config/db');

const crearRol = async (data) => {
    try {
        const rol = await Rol.create(data);
        return rol;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const obtenerRoles = async () => {
    return await Rol.findAll({ include: 'usuarios' });
};

const obtenerRolPorId = async (id) => {
    return await Rol.findByPk(id, { include: 'usuarios' });
};

const actualizarRol = async (id, data) => {
    return await Rol.update(data, { where: { id } });
};

const eliminarRol = async (id) => {
    try {
        const rol = await Rol.findByPk(id);
        if (!rol) throw new Error('Rol no encontrado');
  
        await rol.setUsuarios([]);
        await Rol.destroy({ where: { id } });

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};


module.exports = { 
    crearRol, 
    obtenerRoles, 
    obtenerRolPorId, 
    actualizarRol, 
    eliminarRol 
};