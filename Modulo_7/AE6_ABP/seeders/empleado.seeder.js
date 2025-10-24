const { Empleado } = require('../models/tables');

const createEmpleadoSeeds = async () => {
  await Empleado.bulkCreate([
    { nombre: 'luis troncoso Perez', email: 'luis.troncoso@ejemplo.cl' },
    { nombre: 'pablo  Soto perez', email: 'pablo.soto@ejemplo.cl' },
    { nombre: 'ana gonzalez ramirez', email: 'ana.gonzalez@ejemplo.cl' }
  ]);
};

module.exports = createEmpleadoSeeds;
