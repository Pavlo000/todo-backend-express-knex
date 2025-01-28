const knex = require('../database/connection.js');

function create(comment) {
  return knex('comments').insert(comment).returning('*').then(([comment]) => comment);
}

function remove(id) {
  return knex('comments').where({ id }).del();
}

function getById(id) {
  return knex('comments').where({ id }).then(([user]) => user);
}

module.exports = {
  remove,
  create,
  getById,
};
