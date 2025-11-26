// routes/libros.routes.js (CommonJS porque tu server usa require)
const express = require('express');
const router = express.Router();

const {
  listarLibros,
  crearLibro,
  obtenerLibro,
  actualizarLibro,
  eliminarLibro
} = require('../controllers/libros.controller.js');

// rutas render (GET /libros)
router.get('/libros', listarLibros);

// API CRUD libros
router.post('/api/libros', crearLibro);
router.get('/api/libros/:id', obtenerLibro);
router.put('/api/libros/:id', actualizarLibro);
router.delete('/api/libros/:id', eliminarLibro);

module.exports = router;
