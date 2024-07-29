const table = 'supermarket';

/**
 * Supermarket repository for database interactions.
 */
class SupermarketRepository {

    /**
     * Creates a supermarket repository.
     * 
     * @param {Object} conn The database connection.
     */
    constructor(conn) {
        this.conn = conn;
    }

    /**
     * Updates or inserts a supermarket.
     * 
     * @param {Object} supermarket The supermarket to be upserted.
     * @returns A promise that resolves to the upserted supermarket.
     */
    upsert(supermarket) {
        return this.conn(table)
            .insert(supermarket)
            .onConflict('cnpj')
            .merge()
            .then(() => this.conn(table)
                .select('*')
                .where({cnpj: supermarket.cnpj})
                .first()
            );
    }
}

export default SupermarketRepository;