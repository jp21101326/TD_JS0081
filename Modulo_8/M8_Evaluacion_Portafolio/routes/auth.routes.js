const router = require('express').Router();
const AuthCtrl = require('../controllers/auth.controller');

router.post('/register', AuthCtrl.register);
router.post('/login', AuthCtrl.login);
router.post('/refresh', AuthCtrl.refresh);
router.post('/logout', AuthCtrl.logout);

module.exports = router;
