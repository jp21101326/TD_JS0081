// routes/cart.routes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// Ver carrito del usuario (protección JWT)
router.get('/carrito', verifyToken, cartController.verCarrito);

// Agregar item al carrito { libroId, cantidad }
router.post('/carrito/add', verifyToken, cartController.agregarAlCarrito);

// Eliminar item del carrito { libroId }
router.post('/carrito/remove', verifyToken, cartController.quitarDelCarrito);

// Checkout / pagar (procesa carrito, valida stock, genera ticket)
router.post('/carrito/checkout', verifyToken, cartController.checkout);

module.exports = router;

