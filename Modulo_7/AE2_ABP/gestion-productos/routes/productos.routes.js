const express = require('express');
const router = express.Router();
const { 
  obtenerProductos, 
  obtenerProductoPorId, 
  crearProducto, 
  eliminarProducto, 
  obtenerProductosCursor 
} = require('../models/productos');

// agregar producto
router.get('/agregar', (req, res) => {
  res.render('agregar_producto', { layout: 'layouts/main' });
});

// guardar nuevo producto
router.post('/agregar', async (req, res) => {
  try {
    const { nombre, precio, categoria, stock } = req.body;
    await crearProducto({ nombre, precio, categoria, stock });
    res.redirect('/productos');
  } catch (error) {
    console.error('Error al crear producto:', error.message);
    res.status(400).send(error.message);
  }
});

// Ver productos con cursor
router.get('/consultar-cursor', async (req, res) => {
  try {
    const productos = await obtenerProductosCursor();
    res.render('productos_cursor', { layout: 'layouts/main', productos });
  } catch (error) {
    console.error('Error al usar cursor:', error.message);
    res.status(500).send('Error al procesar datos con cursor');
  }
});

// Eliminar producto
router.get('/eliminar/:id', async (req, res) => {
  try {
    await eliminarProducto(req.params.id);
    res.redirect('/productos');
  } catch (error) {
    console.error('Error al eliminar producto:', error.message);
    res.status(400).send(error.message);
  }
});

// Listar productos
router.get('/', async (req, res) => {
  const productos = await obtenerProductos();
  res.render('productos', { layout: 'layouts/main', productos });
});

// Ver producto por ID
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const producto = await obtenerProductoPorId(id);
    res.render('producto', { layout: 'layouts/main', producto });
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});

module.exports = router;
