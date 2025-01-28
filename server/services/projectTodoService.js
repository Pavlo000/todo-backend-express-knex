const knex = require('../database/connection.js');

function getAllByProjectId(projectId) {
  return knex('projectTodos').where({ projectId });
}

function getByProjectIdAndTodoId(projectId, todoId) {
  return knex('projectTodos').where({ projectId, todoId }).then(([projectTodo]) => projectTodo);
}

function create(projectId, todoId) {
  return knex('projectTodos').insert({ projectId, todoId }).returning('*').then(([projectTodo]) => projectTodo);
}

function remove(id) {
  return knex('projectTodos').where({ id }).del();
}

module.exports = {
  getAllByProjectId,
  getByProjectIdAndTodoId,
  create,
  remove,
};