const knex = require('../database/connection.js');

function create(username, password) {
  return knex('users').insert({
    username,
    password,
  }).returning('*').then(([user]) => user);
}

function getByUsername(username) {
  return knex('users').where({ username }).then(([user]) => user);
}

function getById(id) {
  return knex('users').where({ id }).then(([user]) => user);
}

module.exports = {
  create,
  getByUsername,
  getById,
};
