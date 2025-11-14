const router = require('express').Router();
const FilesCtrl = require('../controllers/files.controller');
const auth = require('../middleware/auth');

router.get('/', auth.verifyToken, FilesCtrl.listUploads);
router.post('/upload', auth.verifyToken, FilesCtrl.uploadFile);
router.delete('/:filename', auth.verifyToken, FilesCtrl.deleteFile);

module.exports = router;