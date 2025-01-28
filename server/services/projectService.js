const knex = require('../database/connection.js');

function getAll() {
  return knex('projects');
}

function getById(id) {
  return knex('projects').where({ id }).then(([project]) => project);
}

function create(project) {
  return knex('projects').insert(project).returning('*').then(([project]) => project);
}

function update(id, project) {
  return knex('projects').where({ id }).update(project).returning('*').then(([project]) => project);
}

function remove(id) {
  return knex('projects').where({ id }).del();
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};