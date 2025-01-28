
exports.up = function(knex) {
  return knex.schema.createTable('tokens', function(table) {
    table.increments('id');
    table.text('token').unique().notNullable();
    table.integer('userId').references('id').inTable('users');
  });
};

exports.down = function(knex) {
  
};
