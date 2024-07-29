import { toSupermarket, toProduct, toPrice } from './src/mapper/data-mapper.mjs';
import SupermarketRepository from './src/repository/supermarket-repository.mjs';
import ProductRepository from './src/repository/product-repository.mjs';
import PriceRepository from './src/repository/price-repository.mjs';
import knexconfig from './knexfile.js';
import knex from 'knex';

/**
 * Creates a success response with status 200 (OK).
 * 
 * @param {String} message A message describing the execution result.
 * @returns A HTTP-prepared response.
 */
const success = (message) => {
    return {
        statusCode: 200,
        body: JSON.stringify({ message })
    };
};

/**
 * Creates a failure response with status 500 (Internal Server Error).
 * 
 * @param {Object} error The error thrown during the execution.
 * @returns A HTTP-prepared response.
 */
const failure = (error) => {
    console.error('Message process failure: ', error);
    return {
        statusCode: 500,
        body: JSON.stringify({
            message: 'Message process failed.',
            error: error.message
        })
    };
};

/**
 * Handles a save-data event.
 * 
 * @param {Object} event The event to be handled.
 * @returns A HTTP-prepared response.
 */
const lambdaHandler = async (event) => {
    let conn = null;

    try {
        const records = event.Records || [];

        if (records.length === 0) {
            return success('There are no records to process.');
        }

        const message = JSON.parse(records[0].body).Message;

        if (!message) {
            return success('Message has no content.');
        }

        const data = JSON.parse(message);

        conn = knex(knexconfig);
        const productRepository = new ProductRepository(conn);
        const priceRepository = new PriceRepository(conn);
        const supermarketRepository = new SupermarketRepository(conn);

        let supermarket = toSupermarket(data);
        supermarket = await supermarketRepository.upsert(supermarket);

        for (let item of data.products) {
            let product = toProduct(item);
            product = await productRepository.upsert(product);

            let price = toPrice(supermarket, product, item);
            await priceRepository.upsert(price);
        }

        return success('The message has been successfully processed!');
    } catch (e) {
        return failure(e);
    } finally {
        if (conn) {
            conn.destroy();
        }
    }
};

export { lambdaHandler };