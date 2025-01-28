
exports.up = function(knex) {
  return knex.schema.createTable('todoUsers', (table) => {
    table.increments('id');
    table.integer('todoId').references('id').inTable('todos');
    table.integer('userId').references('id').inTable('users');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('todoUsers');
};
