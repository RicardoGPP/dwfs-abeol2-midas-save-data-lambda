exports.up = function(knex) {
    return knex.schema.createTable('supermarket', table => {
        table.increments('id');
        table.string('cnpj', 18).unique().notNullable();
        table.string('name', 255).notNullable();
        table.string('street', 255);
        table.string('number', 50);
        table.string('neighborhood', 255);
        table.string('zip_code', 20);
        table.string('city', 255);
        table.string('state', 2);
        table.decimal('latitude', 9, 6);
        table.decimal('longitude', 9, 6);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('supermarket');
};