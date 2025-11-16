const router = require('express').Router();
const UsuariosCtrl = require('../controllers/usuarios.controller');
const auth = require('../middleware/auth');

router.post('/', UsuariosCtrl.crear);
router.get('/:id', auth.verifyToken, UsuariosCtrl.obtener);
router.put('/:id', auth.verifyToken, UsuariosCtrl.actualizar);
router.delete('/:id', auth.verifyToken, UsuariosCtrl.eliminar);
router.post('/:id/imagen', auth.verifyToken, UsuariosCtrl.subirImagen);

module.exports = router;

