const knexconfig = require('../knexfile');
const knex = require('knex')(knexconfig);
const table = 'product';

/**
 * Product repository for database interactions.
 */
class ProductRepository {

    /**
     * Updates or inserts a product.
     * 
     * @param {Object} product The product to be upserted.
     * @returns A promise that resolves to the upserted product.
     */
    upsert(product) {
        return knex(table)
            .insert(product)
            .onConflict('code')
            .merge()
            .then(() => knex(table)
                .select('*')
                .where({code: product.code})
                .first()
            );
    }
}

module.exports = ProductRepository;