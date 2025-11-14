const {
  listarProductos,
  buscarProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} = require('../models/productos.models');

// GET /api/v1/productos
const getProductos = (req, res) => {
  try {
    const { stock_minimo } = req.query;
    const productos = listarProductos();

    if (stock_minimo && !isNaN(parseInt(stock_minimo))) {
      const minimo = parseInt(stock_minimo);
      const filtrados = productos.filter(p => (p.stock || 0) >= minimo);
      return res.status(200).json({
        mensaje: `Lista de productos con stock >= ${minimo}`,
        productos: filtrados
      });
    }

    res.status(200).json({
      mensaje: 'Lista de productos obtenida correctamente',
      productos
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

// GET /api/v1/productos/:id
const getProductoPorId = (req, res) => {
  try {
    const { id } = req.params;
    const producto = buscarProductoPorId(id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json({
      mensaje: `Producto con ID ${id} encontrado`,
      producto
    });
  } catch {
    res.status(500).json({ error: 'Error al buscar el producto' });
  }
};

// POST /api/v1/productos
const postProducto = (req, res) => {
  try {
    const { nombre, precio, stock } = req.body;

    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({ error: 'El nombre del producto es obligatorio' });
    }
    if (precio === undefined || isNaN(precio) || Number(precio) <= 0) {
      return res.status(400).json({ error: 'El precio debe ser un número positivo' });
    }

    const nuevo = crearProducto({
      nombre: nombre.trim(),
      precio: Number(precio),
      stock: stock ? Number(stock) : 0
    });

    res.status(201).json({
      mensaje: 'Producto creado exitosamente',
      producto: nuevo
    });
  } catch {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

// PUT /api/v1/productos/:id
const putProducto = (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;
    const actualizado = actualizarProducto(id, datos);
    if (!actualizado) {
      return res.status(404).json({ error: 'Producto no encontrado para actualizar' });
    }
    res.status(200).json({
      mensaje: `Producto con ID ${id} actualizado correctamente`,
      producto: actualizado
    });
  } catch {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

// DELETE /api/v1/productos/:id
const deleteProducto = (req, res) => {
  try {
    const { id } = req.params;
    if (id === 'critical') {
      return res.status(500).json({ error: 'Error interno simulado: no se pudo eliminar el producto' });
    }

    const eliminado = eliminarProducto(id);
    if (!eliminado) {
      return res.status(404).json({ error: 'Producto no encontrado para eliminar' });
    }
    res.status(200).json({ mensaje: `Producto con ID ${id} eliminado correctamente` });
  } catch {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

module.exports = {
  getProductos,
  getProductoPorId,
  postProducto,
  putProducto,
  deleteProducto
};
