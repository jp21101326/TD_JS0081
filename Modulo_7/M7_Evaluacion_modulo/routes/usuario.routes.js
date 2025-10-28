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

router.post('/', async (req, res) => res.json(await crearUsuario(req.body)));
router.get('/', async (req, res) => res.json(await obtenerUsuarios()));
router.get('/:id', async (req, res) => res.json(await obtenerUsuarioPorId(req.params.id)));
router.put('/:id', async (req, res) => res.json(await actualizarUsuario(req.params.id, req.body)));
router.delete('/:id', async (req, res) => res.json({ deleted: await eliminarUsuario(req.params.id) }));

router.post('/:id/roles', async (req, res) => {
    const result = await agregarRolesAUsuario(req.params.id, req.body.roles);
    res.json(result);
});

router.delete('/:id/roles', async (req, res) => {
    const result = await quitarRolesDeUsuario(req.params.id, req.body.roles);
    res.json(result);
});

module.exports = router;
