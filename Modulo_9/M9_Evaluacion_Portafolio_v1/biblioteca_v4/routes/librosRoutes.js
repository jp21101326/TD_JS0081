const express = require('express');
const router = express.Router();
const librosController = require('../controllers/librosController');
const authMiddleware = require('../middleware/authMiddleware');

// IMPORTANTE: Rutas específicas ANTES de rutas con parámetros
// Ruta de administrador (debe ir PRIMERO)
router.post('/admin/import-json', authMiddleware, librosController.importJsonToPostgres);

// Rutas públicas
router.get('/', librosController.getAll);

// Rutas protegidas (requieren autenticación)
router.post('/', authMiddleware, librosController.create);

// Rutas con parámetros (deben ir AL FINAL)
router.get('/:id', librosController.getById);
router.put('/:id', authMiddleware, librosController.update);
router.delete('/:id', authMiddleware, librosController.delete);
router.post('/:id/comprar', authMiddleware, librosController.comprar);

module.exports = router;