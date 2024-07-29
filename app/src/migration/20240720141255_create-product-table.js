exports.up = function(knex) {
    return knex.schema.createTable('product', table => {
        table.increments('id');
        table.string('code', 50).unique().notNullable();
        table.string('name', 255).notNullable();
        table.string('unit', 10).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('product');
};