const express = require('express');
const commentController = require('../controllers/commentController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const errorCatch = require('../utils/errorCatch.js');
const router = express.Router();

router.get('/project/:projectId', errorCatch(authMiddleware), errorCatch(commentController.getAllByProjectId));
router.get('/todo/:todoId', errorCatch(authMiddleware), errorCatch(commentController.getByTodoId));
router.post('/project/:projectId', errorCatch(authMiddleware), errorCatch(commentController.createByProjectId));
router.post('/todo/:todoId', errorCatch(authMiddleware), errorCatch(commentController.createByTodoId));
router.delete('/:id', errorCatch(authMiddleware), errorCatch(commentController.remove));

module.exports = router;
