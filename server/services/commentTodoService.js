const knex = require('../database/connection.js');

function create(commentTodo) {
  return knex('commentTodos').insert(commentTodo).returning('*').then(([commentTodo]) => commentTodo);
}

function getAllByTodoId(todoId) {
  return knex('commentTodos').where({ todoId });
}

function remove(id) {
  return knex('commentTodos').where({ id }).del();
}

module.exports = {
  getAllByTodoId,
  create,
  remove,
};
