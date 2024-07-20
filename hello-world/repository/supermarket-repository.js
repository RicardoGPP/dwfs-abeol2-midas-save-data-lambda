const knexconfig = require('./../knexfile');
const knex = require('knex')(knexconfig);
const table = 'supermarket';

/**
 * Supermarket repository for database interactions.
 */
class SupermarketRepository {

    /**
     * Updates or inserts a supermarket.
     * 
     * @param {Object} supermarket The supermarket to be upserted.
     * @returns A promise that resolves to the upserted supermarket.
     */
    upsert(supermarket) {
        return knex(table)
            .insert(supermarket)
            .onConflict('cnpj')
            .merge()
            .then(() => knex(table)
                .select('*')
                .where({cnpj: supermarket.cnpj})
                .first()
            );
    }
}

module.exports = SupermarketRepository;