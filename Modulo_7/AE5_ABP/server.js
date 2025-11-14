const sequelize = require('./config/db');
const {
  createLibro,
  getAllLibros,
  getLibroById,
  updateLibro,
  deleteLibro
} = require('./controllers/libro.controllers');

const main = async () => {
  try {
    await sequelize.sync({ /* force: true, alter: true */ });
    console.log('📚 Todos los modelos fueron sincronizados correctamente.');

    const result = await createLibro({
      titulo: 'El Principito',
      autor: 'Antoine de Saint-Exupéry',
      anioPublicacion: 1943,
      isbn: '9780156012195'
    });
    console.log('✅ Libro de prueba creado:', result.toJSON());

    console.log('📘 Todos los libros:', await getAllLibros());
    console.log('🔍 Buscar libro por ID:', await getLibroById(1));

    await updateLibro(1, { anioPublicacion: 1950 });
    console.log('✏️ Libro actualizado correctamente.');

    await deleteLibro(2);
    console.log('🗑️ Libro eliminado.');

  } catch (error) {
    console.error('💥 Error general:', error.message);
  }
};

main();
