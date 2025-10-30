const express = require('express');
const router = express.Router();
const { createPedido, getPedidosByUsuario } = require('../controllers/pedido.controller');

//crear pedido
router.post('/', async (req, res, next) => {
  try {
    const pedido = await createPedido(req.body);
    res.status(201).json(pedido);
  } catch (err) { next(err); }
});

//obtener pedidos de un usuario
// router.get('/usuarios/:usuarioId/pedidos', async (req, res, next) => {
//   try {
//     const pedidos = await getPedidosByUsuario(req.params.usuarioId);
//     res.json(pedidos);
//   } catch (err) { next(err); }
// });

//obteniendo pedidos usuario
router.get('/usuario/:usuarioId', async (req, res, next) => {
  try {
    const pedidos = await getPedidosByUsuario(req.params.usuarioId);
    res.json(pedidos);
  } catch (err) { next(err); }
});

module.exports = router;
