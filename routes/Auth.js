const express = require('express');
const { login, checkAuth, logout, register, checkEmail } = require('../controllers/auth/authController');
const router = express.Router();

router.post('/login', login);

router.get('/checkAuth', checkAuth);

router.post('/logout', logout);

router.post('/register', register);

router.post('/check-email', checkEmail);

module.exports = router;