const knex = require('../database/connection.js');

function getAllByUserId(userId) {
  return knex('todoUsers').where({ userId });
}

function getAllByTodoId(todoId) {
  return knex('todoUsers').where({ todoId });
}

function getByTodoIdAndUserId(todoId, userId) {
  return knex('todoUsers').where({ todoId, userId }).returning('*').then(([todoUser]) => todoUser);
}

function create(todoId, userId) {
  return knex('todoUsers').insert({ todoId, userId }).returning('*').then(([todoUser]) => todoUser);
}

function remove(id) {
  return knex('todoUsers').where({ id }).del();
}

module.exports = {
  getAllByUserId,
  getAllByTodoId,
  getByTodoIdAndUserId,
  create,
  remove,
};
