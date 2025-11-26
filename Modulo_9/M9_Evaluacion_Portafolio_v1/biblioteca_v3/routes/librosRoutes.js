const express = require('express');
const router = express.Router();
const librosController = require('../controllers/librosController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', librosController.getAll);
router.get('/:id', librosController.getById);
router.post('/:id/comprar', authMiddleware, librosController.comprar);
router.post('/admin/import-json', authMiddleware, librosController.importJsonToPostgres);

module.exports = router;