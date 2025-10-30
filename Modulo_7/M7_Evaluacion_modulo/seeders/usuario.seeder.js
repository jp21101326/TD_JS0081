const { Usuario, Rol } = require('../models/tables');

const createUsuarioSeeds = async () => {

    const juan = await Usuario.create({ nombre: 'Juan López', correo: 'juan@mail.com', contraseña: '123456' });
    const maria = await Usuario.create({ nombre: 'María López', correo: 'maria@mail.com', contraseña: '123456' });

    // Obtener roles
    const admin = await Rol.findOne({ where: { nombre: 'Admin' } });
    const editor = await Rol.findOne({ where: { nombre: 'Editor' } });

    // Asignar roles a usuarios
    await juan.addRoles([admin.id, editor.id]); 
    await maria.addRole(editor.id);             
};


module.exports = createUsuarioSeeds;