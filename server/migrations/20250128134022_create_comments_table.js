
exports.up = function(knex) {
  return knex.schema.createTable('comments', (table) => {
    table.increments('id');
    table.text('content');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('comments');
};
