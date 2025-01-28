const knex = require('../database/connection.js');

function getAll() {
  return knex('todos');
}

function getById(id) {
  return knex('todos').where({ id }).then(([todo]) => todo);
}

function create(todo) {
  return knex('todos').insert(todo).returning('*').then(([todo]) => todo);
}

function update(id, todo) {
  return knex('todos').where({ id }).update(todo).returning('*').then(([todo]) => todo);
}

function remove(id) {
  return knex('todos').where({ id }).del();
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};