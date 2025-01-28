const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const errorCatch = require('../utils/errorCatch.js');

router.post('/register', errorCatch(authController.register));
router.post('/login', errorCatch(authController.login));
router.get('/refresh', errorCatch(authController.refresh));
router.post('/logout', errorCatch(authController.logout));

module.exports = router;
