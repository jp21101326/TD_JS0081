const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/login', authController.showLogin);
router.get('/register', authController.showRegister);

router.post('/login', authController.login);
router.post('/register', authController.registro);

router.get('/logout', authController.logout);

module.exports = router;
