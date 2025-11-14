const express = require('express');
const router = express.Router();
const {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
  agregarRolesAUsuario,
  quitarRolesDeUsuario
} = require('../controllers/usuario.controllers');

const { validateUsuario } = require('../middlewares/validateFields');

router.post('/', validateUsuario, async (req, res, next) => {
  try {
    const usuario = await crearUsuario(req.body);
    res.status(201).json(usuario);
  } catch (err) { next(err); }
});

router.get('/', async (req, res, next) => {
  try {
    res.json(await obtenerUsuarios());
  } catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const usuario = await obtenerUsuarioPorId(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updated = await actualizarUsuario(req.params.id, req.body);
    res.json({ updated });
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await eliminarUsuario(req.params.id);
    res.json({ deleted });
  } catch (err) { next(err); }
});

router.post('/:id/roles', async (req, res, next) => {
  try {
    const result = await agregarRolesAUsuario(req.params.id, req.body.roles);
    res.json(result);
  } catch (err) { next(err); }
});

router.delete('/:id/roles', async (req, res, next) => {
  try {
    const result = await quitarRolesDeUsuario(req.params.id, req.body.roles);
    res.json(result);
  } catch (err) { next(err); }
});

module.exports = router;
