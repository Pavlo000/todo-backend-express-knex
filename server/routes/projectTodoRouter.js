const express = require('express');
const router = express.Router();
const projectTodoController = require('../controllers/projectTodoController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const errorCatch = require('../utils/errorCatch.js');

router.get('/project/:projectId', errorCatch(authMiddleware), errorCatch(projectTodoController.getAllByProjectId));
router.post('/', errorCatch(authMiddleware), errorCatch(projectTodoController.create));
router.delete('/:id', errorCatch(authMiddleware), errorCatch(projectTodoController.remove));

module.exports = router;