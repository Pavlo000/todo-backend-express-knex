const knex = require('../database/connection.js');

function save(token, userId) {
  return knex('tokens').insert({
    token,
    userId,
  }).returning('*').then(([token]) => token);
}

function remove(userId) {
  return knex('tokens').where({ userId }).del();
}

module.exports = {
  save,
  remove,
};