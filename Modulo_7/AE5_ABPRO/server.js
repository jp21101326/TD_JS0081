const sequelize = require('./config/db');
const {
  createProducto,
  getAllProductos,
  getProductoById,
  updateProducto,
  deleteProducto
} = require('./controllers/product.controllers');

const main = async () => {
  try {
    await sequelize.sync({ force: true }); // Reiniciar Tabla Productos en cada ejecución, solo para pruebas
    console.log('Base de datos sincronizada correctamente.');

    // Crear producto de prueba 1
    await createProducto({
      nombre: 'Monitor LG',
      descripcion: 'Monitor LED 32" QHD',
      precio: 230000,
      cantidad: 40
    });

    // Crear producto de prueba 2
    await createProducto({
      nombre: 'Monitor Asus',
      descripcion: 'Monitor OLED 50" UHD',
      precio: 500000,
      cantidad: 5
    });

    // Crear producto de prueba 3
    const nuevo = await createProducto({
      nombre: 'Monitor Samsung',
      descripcion: 'Monitor LED 27" Full HD',
      precio: 180000,
      cantidad: 15
    });

    // Mostrar el último producto creado
    console.log("\nCreación Producto'\n================================");
    console.log('Producto creado:', nuevo.toJSON());

    // Leer todos
    console.log("\nListado de Productos\n================================");
    console.log(await getAllProductos());
    // Buscar por ID
    console.log("\nBuscar Producto Id(1)\n================================");
    console.log(await getProductoById(1));
    // Actualizar producto
    console.log("\nProducto Actualizado:\n================================");
    const [filasActualizadas, productoActualizado] = await updateProducto(1, { precio: 200000, cantidad: 20 });
    console.log("Filas Actualizadas: ", filasActualizadas);
    console.log(productoActualizado);
    // Eliminar producto
    console.log("\nProducto Eliminado:'\n================================");
    const [filasEliminadas, productoEliminado] = await deleteProducto(2);
    console.log("Filas Eliminadas: ", filasEliminadas);
    console.log(productoEliminado);

  } catch (error) {
    console.error('Error general:', error);
  }
};

main();