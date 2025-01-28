const commentService = require('../services/commentService.js');
const commentProjectService = require('../services/commentProjectService.js');
const projectService = require('../services/projectService.js');
const commentTodoService = require('../services/commentTodoService.js');
const todoService = require('../services/todoService.js');
const ApiError = require('../utils/apiError.js');

async function getAllByProjectId(req, res, next) {
  const { projectId } = req.params;

  if (!projectId) {
    throw ApiError.invalidPayload('Project ID is required');
  }

  if (isNaN(projectId)) {
    throw ApiError.invalidPayload('Project ID is not a number');
  }

  const project = await projectService.getById(projectId);

  if (!project) {
    throw ApiError.notFound('Project not found');
  }

  const commentProjects = await commentProjectService.getAllByProjectId(projectId);

  const comments = await Promise.all(commentProjects.map(async (commentProject) => {
    const comment = await commentService.getById(commentProject.commentId);
    
    return {
      comment,
      commentProject,
    };
  }));
  
  res.json({
    success: true,
    data: {
      comments,
    },
  });
}

async function getByTodoId(req, res, next) {
  const { todoId } = req.params;

  if (!todoId) {
    throw ApiError.invalidPayload('Todo ID is required');
  }

  if (isNaN(todoId)) {
    throw ApiError.invalidPayload('Todo ID is not a number');
  }

  const todo = await todoService.getById(todoId);

  if (!todo) {
    throw ApiError.notFound('Todo not found');
  }

  const commentTodos = await commentTodoService.getAllByTodoId(todoId);

  const comments = await Promise.all(commentTodos.map(async (commentTodo) => {
    const comment = await commentService.getById(commentTodo.commentId);

    return {
      comment,
      commentTodo,
    };
  }));

  res.json({
    success: true,
    data: {
      comments,
    },
  });
}

async function createByProjectId(req, res, next) {
  const { projectId } = req.params;
  const { content } = req.body;

  if (!projectId || !content) {
    throw ApiError.invalidPayload('Project ID and content are required');
  }

  if (isNaN(projectId)) {
    throw ApiError.invalidPayload('Project ID is not a number');
  }

  const project = await projectService.getById(projectId);

  if (!project) {
    throw ApiError.notFound('Project not found');
  }

  const comment = await commentService.create({ content });

  const commentProject = await commentProjectService.create({ projectId, commentId: comment.id });

  res.json({
    success: true,
    data: {
      comment,
      commentProject,
    },
  });
}

async function createByTodoId(req, res, next) {
  const { todoId } = req.params;
  const { content } = req.body;

  if (!todoId || !content) {
    throw ApiError.invalidPayload('Todo ID and content are required');
  }

  if (isNaN(todoId)) {
    throw ApiError.invalidPayload('Todo ID is not a number');
  }

  const todo = await todoService.getById(todoId);

  if (!todo) {
    throw ApiError.notFound('Todo not found');
  }

  const comment = await commentService.create({ content });

  const commentTodo = await commentTodoService.create({ todoId, commentId: comment.id });

  res.json({
    success: true,
    data: {
      comment,
      commentTodo,
    },
  });
}

async function remove(req, res, next) {
  const { id } = req.params;

  if (!id) {
    throw ApiError.invalidPayload('Comment ID is required');
  }

  if (isNaN(id)) {
    throw ApiError.invalidPayload('Comment ID is not a number');
  }

  await commentTodoService.remove(id);
  await commentProjectService.remove(id);
  await commentService.remove(id);

  res.send({
    success: true,
  });
}

module.exports = {
  getAllByProjectId,
  getByTodoId,
  createByProjectId,
  createByTodoId,
  remove,
};
