const ApiError = require('../utils/apiError.js');
const todoService = require('../services/todoService.js');
async function getAll(req, res) {
  const todos = await todoService.getAll();

  res.json({
    success: true,
    data: {
      todos,
    },
  });
}

async function getById(req, res) {
  const todoId = req.params.id;

  if (!todoId) {
    throw ApiError.invalidPayload('Todo ID is required');
  }

  if (isNaN(todoId)) {
    throw ApiError.invalidPayload('Todo ID must be a number');
  }

  const todo = await todoService.getById(todoId);

  if (!todo) {
    throw ApiError.notFound('Todo not found');
  }

  res.json({
    success: true,
    data: {
      todo,
    },
  });
}

async function create(req, res) {
  const { title, status } = req.body;

  if (!title || !status) {
    throw ApiError.invalidPayload('Title and status are required');
  }

  const todo = await todoService.create({ title, status });

  res.send({
    success: true,
    data: {
      todo,
    },
  });
}

async function update(req, res) {
  const todoId = req.params.id;
  const { title, status } = req.body;

  if (!todoId || !title || !status) {
    throw ApiError.invalidPayload('Todo ID, title, and status are required');
  }

  if (isNaN(todoId)) {
    throw ApiError.invalidPayload('Todo ID must be a number');
  }

  const todo = await todoService.update(todoId, { title, status });

  res.send({
    success: true,
    data: {
      todo,
    },
  });
}

async function remove(req, res) {
  const todoId = req.params.id;

  if (!todoId) {
    throw ApiError.invalidPayload('Todo ID is required');
  }

  if (isNaN(todoId)) {
    throw ApiError.invalidPayload('Todo ID must be a number');
  }

  await todoService.remove(todoId);

  res.send({
    success: true,
  });
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};