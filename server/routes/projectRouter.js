const express = require('express');
const projectController = require('../controllers/projectController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const errorCatch = require('../utils/errorCatch.js');
const router = express.Router();

router.get('/', errorCatch(authMiddleware), errorCatch(projectController.getAll));
router.get('/:id', errorCatch(authMiddleware), errorCatch(projectController.getById));
router.post('/', errorCatch(authMiddleware), errorCatch(projectController.create));
router.patch('/:id', errorCatch(authMiddleware), errorCatch(projectController.update));
router.delete('/:id', errorCatch(authMiddleware), errorCatch(projectController.remove));

module.exports = router;