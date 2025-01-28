
exports.up = function(knex) {
    return knex.schema.createTable('todos', function(table) {
        table.increments('id');
        table.string('title').notNullable();
        table.string('status').defaultTo('backlog');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('todos');
};