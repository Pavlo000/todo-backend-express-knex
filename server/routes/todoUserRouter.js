const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware.js');
const errorCatch = require('../utils/errorCatch.js');
const todoUserController = require('../controllers/todoUserController.js');
const router = express.Router();

router.get('/todo/:todoId', errorCatch(authMiddleware), errorCatch(todoUserController.getAllByTodoId));
router.get('/user/:userId', errorCatch(authMiddleware), errorCatch(todoUserController.getAllByUserId));
router.post('/', errorCatch(authMiddleware), errorCatch(todoUserController.create));
router.delete('/:id', errorCatch(authMiddleware), errorCatch(todoUserController.remove));

module.exports = router;