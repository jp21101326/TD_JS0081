const { Tarea, Proyecto } = require('../models/tables');

const createTareaSeeds = async () => {
  const p1 = await Proyecto.findOne({ where: { nombre: 'Proyecto Seminario' } });
  const p2 = await Proyecto.findOne({ where: { nombre: 'Proyecto Mecanica' } });
  const p3 = await Proyecto.findOne({ where: { nombre: 'Proyecto SQL' } });
  if (!p1 || !p2 || !p3) return;

  await Tarea.bulkCreate([
    { titulo: 'Analizar requisitos', descripcion: 'Levantar información con stakeholders', estado: 'pendiente', fecha_vencimiento: '2025-03-01', proyectoId: p1.id },
    { titulo: 'Diseñar prototipo', descripcion: 'Mockups iniciales', estado: 'pendiente', fecha_vencimiento: '2025-04-01', proyectoId: p1.id },
    { titulo: 'Implementar funcionalidades', descripcion: 'Desarrollo de las características principales', estado: 'pendiente', fecha_vencimiento: '2025-05-01', proyectoId: p1.id },
    { titulo: 'Investigar materiales', descripcion: 'Buscar materiales adecuados para el proyecto', estado: 'pendiente', fecha_vencimiento: '2025-03-15', proyectoId: p2.id },
    { titulo: 'Construir prototipo', descripcion: 'Montaje del prototipo físico', estado: 'pendiente', fecha_vencimiento: '2025-04-15', proyectoId: p2.id },
    { titulo: 'Realizar pruebas', descripcion: 'Testeo del prototipo y ajustes necesarios', estado: 'pendiente', fecha_vencimiento: '2025-05-15', proyectoId: p2.id },
    { titulo: 'Diseñar base de datos', descripcion: 'Modelo entidad-relación y normalización', estado: 'pendiente', fecha_vencimiento: '2025-03-10', proyectoId: p3.id },
    { titulo: 'Implementar base de datos', descripcion: 'Creación de tablas y relaciones en SQL', estado: 'pendiente', fecha_vencimiento: '2025-04-10', proyectoId: p3.id },
    { titulo: 'Optimizar consultas', descripcion: 'Mejorar el rendimiento de las consultas SQL', estado: 'pendiente', fecha_vencimiento: '2025-05-10', proyectoId: p3.id },
  ]);
};

module.exports = createTareaSeeds;
