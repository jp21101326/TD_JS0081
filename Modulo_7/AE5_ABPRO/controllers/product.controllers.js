const Producto = require('../models/producto');

// Crear producto
const createProducto = async (data) => {
  try {
    const newProducto = await Producto.create(data);
    return newProducto;
  } catch (error) {
    console.error('Error al crear producto:', error);
    return false;
  }
};

// Obtener todos
const getAllProductos = async () => {
  try {
    let productos =await Producto.findAll();
    productos = productos.map(producto => producto.toJSON());
    return productos;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return false;
  }
};

// Obtener por ID
const getProductoById = async (id) => {
  try {
    const producto = await Producto.findByPk(id);
    if (!producto) console.log(`Producto con ID ${id} no encontrado`);
    return producto?.toJSON();
  } catch (error) {
    console.error('Error al buscar producto:', error);
    return false;
  }
};

// Actualizar
const updateProducto = async (id, data) => {
  try {
    const [filasActualizadas, productosActualizados] = await Producto.update(data, { where: { id }, returning: true });
    
    if (filasActualizadas[0] === 0){
      console.log('No se actualizó ningún producto.');
    }

    return [filasActualizadas, productosActualizados[0]?.toJSON()];
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    return false;
  }
};

// Eliminar
const deleteProducto = async (id) => {
  try {
    const productoPorEliminar = await getProductoById(id);
    const filasEliminadas = await Producto.destroy({ where: { id } });
    
    if (filasEliminadas === 0){
      console.log('No se encontró el producto para eliminar.');
    }

    return [filasEliminadas, productoPorEliminar];
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    return false;
  }
};

module.exports = {
  createProducto,
  getAllProductos,
  getProductoById,
  updateProducto,
  deleteProducto
};
