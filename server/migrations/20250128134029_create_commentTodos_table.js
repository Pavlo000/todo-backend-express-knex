
exports.up = function(knex) {
  return knex.schema.createTable('commentTodos', (table) => {
    table.increments('id');
    table.integer('commentId').references('id').inTable('comments');
    table.integer('todoId').references('id').inTable('todos');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('commentTodos');
};
