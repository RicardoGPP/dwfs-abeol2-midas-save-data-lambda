import SupermarketRepository from './repository/supermarket-repository.js';
import ProductRepository from './repository/product-repository.js';
import PriceRepository from './repository/price-repository.js';
import knexconfig from './knexfile.js';
import knex from 'knex';

/**
 * Creates a success responde with status 200 (OK).
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
 * Creates a failure responde with status 500 (Internal Server Error).
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
 * Converts the message data into a supermarket.
 * 
 * @param {Object} data The message data to be converted.
 * @returns The converted supermarket.
 */
const toSupermarket = (data) => {
    return {
        cnpj: data.cnpj,
        name: data.companyName,
        street: data.address.street,
        number: data.address.number,
        neighborhood: data.address.neighborhood,
        zipCode: data.address.zipCode,
        city: data.address.city,
        state: data.address.state,
        latitude: data.address.lat,
        longitude: data.address.lng
    };
}

/**
 * Converts the message data item into a product.
 * 
 * @param {Object} item The message data item to be converted.
 * @returns The converted product.
 */
const toProduct = (item) => {
    return {
        code: item.code,
        name: item.product,
        unit: item.unit
    };
};

/**
 * Converts the supermarket, product and message data item into a price.
 * 
 * @param {Object} supermarket The supermarket to be converted.
 * @param {Object} product The product to be converted.
 * @param {Object} item The message data item to be converted.
 * @returns The converted price.
 */
const toPrice = (supermarket, product, item) => {
    return {
        supermarketId: supermarket.id,
        productId: product.id,
        date: new Date().toISOString(),
        price: item.price
    };
};

/**
 * Handles a save-data event.
 * 
 * @param {Object} event The event to be handled.
 * @returns A HTTP-prepared response.
 */
export const lambdaHandler = async (event) => {
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

        const supermarket = await supermarketRepository.upsert(toSupermarket(data));
        for (let item of data.products) {
            const product = await productRepository.upsert(toProduct(item));
            await priceRepository.upsert(toPrice(supermarket, product, item));
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