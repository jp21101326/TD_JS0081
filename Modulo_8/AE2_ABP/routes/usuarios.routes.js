const router = require('express').Router();
const controller = require('../controllers/usuarios.controller');

// Parte 1: rutas básicas solicitadas
router.get('/saludo', controller.saludo);
router.post('/usuario', controller.crearUsuario);
router.put('/usuario/:id', controller.actualizarUsuario);
router.delete('/usuario/:id', controller.eliminarUsuario);

// Parte 2: ejemplos con parámetros y query
router.get('/parametros/:nombre/:edad', controller.mostrarParametros);
router.get('/busqueda', controller.mostrarQuery);

module.exports = router;
