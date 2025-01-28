const projectService = require('../services/projectService.js');
const todoService = require('../services/todoService.js');
const projectTodoService = require('../services/projectTodoService.js');
const ApiError = require('../utils/apiError.js');

async function getAllByProjectId(req, res) {
  const { projectId } = req.params;

  if (!projectId) {
    throw ApiError.invalidPayload('Project ID is required');
  }

  const project = await projectService.getById(projectId);

  if (!project) {
    throw ApiError.notFound('Project not found');
  }

  const projectTodos = await projectTodoService.getAllByProjectId(projectId);

  res.send({
    success: true,
    data: {
      projectTodos,
    },
  });
}

async function create(req, res) {
  const { projectId, todoId } = req.body;

  if (!projectId || !todoId) {
    throw ApiError.invalidPayload('Project ID and Todo ID are required');
  }

  const project = await projectService.getById(projectId);

  if (!project) {
    throw ApiError.notFound('Project not found');
  }

  const todo = await todoService.getById(todoId);

  if (!todo) {
    throw ApiError.notFound('Todo not found');
  }

  const existingProjectTodo = await projectTodoService.getByProjectIdAndTodoId(projectId, todoId);

  if (existingProjectTodo) {
    throw ApiError.invalidPayload('Project Todo already exists');
  }

  const projectTodo = await projectTodoService.create(projectId, todoId);

  res.send({
    success: true,
    data: {
      projectTodo,
    },
  });
}

async function remove(req, res) {
  const { id } = req.params;

  if (!id) {
    throw ApiError.invalidPayload('Project Todo ID is required');
  }

  await projectTodoService.remove(id);

  res.send({
    success: true,
  });
}

module.exports = {
  getAllByProjectId,
  create,
  remove,
};