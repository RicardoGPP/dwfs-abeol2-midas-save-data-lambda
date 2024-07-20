const table = 'product';

/**
 * Product repository for database interactions.
 */
class ProductRepository {

    /**
     * Creates a product repository.
     * 
     * @param {Object} conn The database connection.
     */
    constructor(conn) {
        this.conn = conn;
    }

    /**
     * Updates or inserts a product.
     * 
     * @param {Object} product The product to be upserted.
     * @returns A promise that resolves to the upserted product.
     */
    upsert(product) {
        return this.conn(table)
            .insert(product)
            .onConflict('code')
            .merge()
            .then(() => this.conn(table)
                .select('*')
                .where({code: product.code})
                .first()
            );
    }
}

module.exports = ProductRepository;