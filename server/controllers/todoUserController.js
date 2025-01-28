const ApiError = require('../utils/apiError.js');
const todoService = require('../services/todoService.js');
const userService = require('../services/userService.js');
const todoUserService = require('../services/todoUserService.js');

async function getAllByUserId(req, res) {
  const userId = req.params.userId;

  if (!userId) {
    throw ApiError.invalidPayload('User ID is required');
  }

  if (isNaN(userId)) {
    throw ApiError.invalidPayload('User ID must be a number');
  }

  const existingUser = await userService.getById(userId);

  if (!existingUser) {
    throw ApiError.notFound('User not found');
  }

  const todos = await todoUserService.getAllByUserId(userId);

  res.json({
    success: true,
    data: {
      todos,
    },
  });
}

async function getAllByTodoId(req, res) {
  const todoId = req.params.todoId;

  if (!todoId) {
    throw ApiError.invalidPayload('Todo ID is required');
  }

  if (isNaN(todoId)) {
    throw ApiError.invalidPayload('Todo ID must be a number');
  }

  const existingTodo = await todoService.getById(todoId);

  if (!existingTodo) {
    throw ApiError.notFound('Todo not found');
  }

  const todo = await todoUserService.getAllByTodoId(todoId);

  res.json({
    success: true,
    data: {
      todo,
    },
  });
}

async function create(req, res) {
  const { todoId, userId } = req.body;

  if (!todoId || !userId) {
    throw ApiError.invalidPayload('Todo ID and User ID are required');
  }

  if (isNaN(todoId) || isNaN(userId)) {
    throw ApiError.invalidPayload('Todo ID and User ID must be numbers');
  }

  const existingTodo = await todoService.getById(todoId);
  const existingUser = await userService.getById(userId);
  const existingTodoUser = await todoUserService.getByTodoIdAndUserId(todoId, userId);

  if (!existingTodo) {
    throw ApiError.notFound('Todo not found');
  }

  if (!existingUser) {
    throw ApiError.notFound('User not found');
  }

  if (existingTodoUser) {
    throw ApiError.invalidPayload('Todo user already exists');
  }

  const todoUser = await todoUserService.create(todoId, userId);

  res.json({
    success: true,
    data: {
      todoUser,
    },
  });
}

async function remove(req, res) {
  const id = req.params.id;

  if (!id) {
    throw ApiError.invalidPayload('Todo user ID is required');
  }

  if (isNaN(id)) {
    throw ApiError.invalidPayload('Todo user ID must be a number');
  }

  await todoUserService.remove(id);

  res.send({
    success: true,
  });
}


module.exports = {
  getAllByUserId,
  getAllByTodoId,
  create,
  remove,
};
