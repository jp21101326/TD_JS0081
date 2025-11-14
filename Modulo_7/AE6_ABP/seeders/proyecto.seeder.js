const { Proyecto } = require('../models/tables');

const createProyectoSeeds = async () => {
  await Proyecto.bulkCreate([
    { nombre: 'Proyecto Seminario', descripcion: 'Proyecto ejemplo A', fecha_inicio: '2025-01-01', fecha_fin: '2025-06-30' },
    { nombre: 'Proyecto Mecanica', descripcion: 'Proyecto ejemplo B', fecha_inicio: '2025-02-01' },
    { nombre: 'Proyecto SQL', descripcion: 'Proyecto ejemplo C', fecha_inicio: '2025-03-01', fecha_fin: '2025-12-31' },
  ]);
};

module.exports = createProyectoSeeds;
