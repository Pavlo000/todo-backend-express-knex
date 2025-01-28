const express = require('express');
const todoController = require('../controllers/todoController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const errorCatch = require('../utils/errorCatch.js');
const router = express.Router();

router.get('/', errorCatch(authMiddleware), errorCatch(todoController.getAll));
router.get('/:id', errorCatch(authMiddleware), errorCatch(todoController.getById));
router.post('/', errorCatch(authMiddleware), errorCatch(todoController.create));
router.patch('/:id', errorCatch(authMiddleware), errorCatch(todoController.update));
router.delete('/:id', errorCatch(authMiddleware), errorCatch(todoController.remove));

module.exports = router;