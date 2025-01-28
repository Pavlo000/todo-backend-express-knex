
exports.up = function(knex) {
  return knex.schema.createTable('projectTodos', (table) => {
    table.increments('id');
    table.integer('projectId').references('id').inTable('projects');
    table.integer('todoId').references('id').inTable('todos');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('projectTodos');
};
