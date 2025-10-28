const express = require('express');
const router = express.Router();
const { crearRol, obtenerRoles, obtenerRolPorId, actualizarRol, eliminarRol } = require('../controllers/rol.controllers');

router.post('/', async (req, res) => res.json(await crearRol(req.body)));
router.get('/', async (req, res) => res.json(await obtenerRoles()));
router.get('/:id', async (req, res) => res.json(await obtenerRolPorId(req.params.id)));
router.put('/:id', async (req, res) => res.json(await actualizarRol(req.params.id, req.body)));
router.delete('/:id', async (req, res) => res.json({ deleted: await eliminarRol(req.params.id) }));

module.exports = router;
