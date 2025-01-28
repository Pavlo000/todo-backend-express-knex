const knex = require('../database/connection.js');

function getAllByProjectId(projectId) {
  return knex('commentProjects').where({ projectId });
}

function create(commentProject) {
  return knex('commentProjects').insert(commentProject).returning('*').then(([commentProject]) => commentProject);
}

function remove(id) {
  return knex('commentProjects').where({ id }).del();
}

module.exports = {
  getAllByProjectId,
  create,
  remove,
};
