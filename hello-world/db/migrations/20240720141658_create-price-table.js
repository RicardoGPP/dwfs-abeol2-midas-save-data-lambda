exports.up = function(knex) {
    return knex.schema.createTable('price', table => {
        table.mediumint('supermarket_id');
        table.mediumint('product_id');
        table.timestamp('date');
        table.decimal('price', 10, 2).notNullable();
        table.primary(['supermarket_id', 'product_id', 'date']);
        table.foreign('supermarket_id').references('supermarket.id');
        table.foreign('product_id').references('product.id');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('price');
};