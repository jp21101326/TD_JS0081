const express = require('express');
const router = express.Router();
const {
  createUsuario,
  getAllUsuarios,
  getUsuarioById,
  updateUsuario,
  deleteUsuario
} = require('../controllers/usuario.controller');

const { getPedidosByUsuario } = require('../controllers/pedido.controller');

//crear un nuevo usuario
router.post('/', async (req, res, next) => {
  try {
    const usuario = await createUsuario(req.body);
    res.status(201).json(usuario);
  } catch (err) { next(err); }
});

//listar todos los usuarios
router.get('/', async (req, res, next) => {
  try {
    const usuarios = await getAllUsuarios();
    res.json(usuarios);
  } catch (err) { next(err); }
});

//obtener usuario por id
router.get('/:id', async (req, res, next) => {
  try {
    const usuario = await getUsuarioById(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (err) { next(err); }
});

//actualizar usuario
router.put('/:id', async (req, res, next) => {
  try {
    const updated = await updateUsuario(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ message: 'Usuario actualizado correctamente' });
  } catch (err) { next(err); }
});

//eliminar usuario
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await deleteUsuario(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (err) { next(err); }
});

//obtener pedidos de un usuario
router.get('/:id/pedidos', async (req, res, next) => {
  try {
    const pedidos = await getPedidosByUsuario(req.params.id);
    res.json(pedidos);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
