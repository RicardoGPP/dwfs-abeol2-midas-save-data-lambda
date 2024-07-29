exports.up = function(knex) {
    return knex.schema.createTable('price', table => {
        table.mediumint('supermarketId');
        table.mediumint('productId');
        table.timestamp('date');
        table.decimal('price', 10, 2).notNullable();
        table.primary(['supermarketId', 'productId', 'date']);
        table.foreign('supermarketId').references('supermarket.id');
        table.foreign('productId').references('product.id');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('price');
};