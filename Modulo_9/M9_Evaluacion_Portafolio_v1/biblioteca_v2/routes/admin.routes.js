// routes/admin.routes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const requireAdmin = require('../middlewares/admin.middleware');

// Listado de libros (vista admin)
router.get('/admin/libros', verifyToken, requireAdmin, adminController.listarLibrosAdmin);

// Form para crear libro (vista)
router.get('/admin/libros/nuevo', verifyToken, requireAdmin, adminController.formNuevoLibro);

// Crear libro
router.post('/admin/libros', verifyToken, requireAdmin, adminController.crearLibro);

// Form editar
router.get('/admin/libros/:id/editar', verifyToken, requireAdmin, adminController.formEditarLibro);

// Editar libro
router.post('/admin/libros/:id/editar', verifyToken, requireAdmin, adminController.editarLibro);

// Eliminar libro
router.post('/admin/libros/:id/eliminar', verifyToken, requireAdmin, adminController.eliminarLibro);

module.exports = router;
