
exports.up = function(knex) {
  return knex.schema.createTable('commentProjects', (table) => {
    table.increments('id');
    table.integer('projectId').references('id').inTable('projects');
    table.integer('commentId').references('id').inTable('comments');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('commentProjects');
};
