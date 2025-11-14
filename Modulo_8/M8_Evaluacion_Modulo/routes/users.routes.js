const router = require('express').Router();
const UsersCtrl = require('../controllers/users.controller');
const auth = require('../middleware/auth');


router.post('/register', UsersCtrl.register);
router.post('/login', UsersCtrl.login);
router.get('/me', auth.verifyToken, UsersCtrl.profile);


module.exports = router;