const { Rol } = require('../models/tables');

const createRolSeeds = async () => {
    await Rol.bulkCreate([
        { nombre: 'Admin' },
        { nombre: 'Editor' },
        { nombre: 'Invitado' }
    ]);
};

module.exports = createRolSeeds;