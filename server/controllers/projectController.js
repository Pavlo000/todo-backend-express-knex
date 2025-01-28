const projectService = require('../services/projectService.js');
const ApiError = require('../utils/apiError.js');

async function getAll(req, res) {
  const projects = await projectService.getAll();

  res.send({
    success: true,
    data: {
      projects,
    },
  });
}

async function getById(req, res) {
  const { id } = req.params;

  if (!id) {
    throw ApiError.invalidPayload('Project ID is required');
  }

  if (isNaN(id)) {
    throw ApiError.invalidPayload('Project ID is not a number');
  }

  const project = await projectService.getById(id);

  if (!project) {
    throw ApiError.notFound('Project not found');
  }

  res.send({
    success: true,
    data: {
      project,
    },
  });
}

async function create(req, res) {
  const { title } = req.body;

  if (!title) {
    throw ApiError.invalidPayload('Title is required');
  }

  const project = await projectService.create({ title });

  res.send({
    success: true,
    data: {
      project,
    },
  });
}

async function update(req, res) {
  const { id } = req.params;
  const { title } = req.body;

  if (!id || !title) {
    throw ApiError.invalidPayload('Project ID and title are required');
  }

  if (isNaN(id)) {
    throw ApiError.invalidPayload('Project ID is not a number');
  }

  const existingProject = await projectService.getById(id);

  if (!existingProject) {
    throw ApiError.notFound('Project not found');
  }

  const project = await projectService.update(id, { title });

  res.send({
    success: true,
    data: {
      project,
    },
  });
}

async function remove(req, res) {
  const { id } = req.params;

  if (!id) {
    throw ApiError.invalidPayload('Project ID is required');
  }

  if (isNaN(id)) {
    throw ApiError.invalidPayload('Project ID is not a number');
  }

  await projectService.remove(id);

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