const express = require('express');
const router = express.Router();
const { crearRol, obtenerRoles, obtenerRolPorId, actualizarRol, eliminarRol } = require('../controllers/rol.controllers');
const { validateRol } = require('../middlewares/validateFields');

router.post('/', validateRol, async (req, res, next) => {
  try {
    const rol = await crearRol(req.body);
    res.status(201).json(rol);
  } catch (err) { next(err); }
});

router.get('/', async (req, res, next) => {
  try {
    res.json(await obtenerRoles());
  } catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const rol = await obtenerRolPorId(req.params.id);
    if (!rol) return res.status(404).json({ message: 'Rol no encontrado' });
    res.json(rol);
  } catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updated = await actualizarRol(req.params.id, req.body);
    res.json({ updated });
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await eliminarRol(req.params.id);
    res.json({ deleted });
  } catch (err) { next(err); }
});

module.exports = router;
