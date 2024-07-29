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
        latitude: data.address.latitude,
        longitude: data.address.longitude
    };
};

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

export { toSupermarket, toProduct, toPrice };