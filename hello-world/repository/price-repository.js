const knexconfig = require('../knexfile');
const knex = require('knex')(knexconfig);
const table = 'price';

/**
 * Price repository for database interactions.
 */
class PriceRepository {

    /**
     * Updates or inserts a price.
     * 
     * @param {Object} price The price to be upserted.
     * @returns A promise that resolves to the upserted price.
     */
    upsert(price) {
        return knex(table)
            .insert(price)
            .onConflict(['supermarketId', 'productId', 'date'])
            .merge()
            .then(() => knex(table)
                .select('*')
                .where({
                    supermarketId: price.supermarketId,
                    productId: price.productId,
                    date: price.date
                })
                .first()
            );
    }
}

module.exports = PriceRepository;