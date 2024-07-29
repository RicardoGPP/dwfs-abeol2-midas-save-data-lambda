const table = 'price';

/**
 * Price repository for database interactions.
 */
class PriceRepository {

    /**
     * Creates a price repository.
     * 
     * @param {Object} conn The database connection.
     */
    constructor(conn) {
        this.conn = conn;
    }

    /**
     * Updates or inserts a price.
     * 
     * @param {Object} price The price to be upserted.
     * @returns A promise that resolves to the upserted price.
     */
    upsert(price) {
        return this.conn(table)
            .insert(price)
            .onConflict(['supermarketId', 'productId', 'date'])
            .merge()
            .then(() => this.conn(table)
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

export default PriceRepository;