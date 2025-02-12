
exports.up = function(knex) {
  return knex.schema.createTable('projects', (table) => {
    table.increments('id');
    table.string('title').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('projects');
};
