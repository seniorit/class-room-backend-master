const httpStatus = require('http-status');
const { Product } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a product
 * @param {Object} product
 * @returns {Promise<product>}
 */
const create = async (product) => {
  const produc = await Product.isCodeTakenSave(product.code);
  if (produc) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Code already taken');
  }
  return Product.create(product);
};

/**
 * Query for ClassSchedules
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAll = async (filter, options) => {
  const product = await Product.paginate(filter, options);
  return product;
};

/**
 * Get product by id
 * @param {productID} id
 * @returns {Promise<Product>}
 */
const getById = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not avilable');
  }
  return product;
};

/**
 * Update product by id
 * @param {productId} productId
 * @param {product} updateBody
 * @returns {Promise<product>}
 */
const update = async (productID, updateBody) => {
  const product = await getById(productID);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  if (updateBody.name && (await Product.isCodeTaken(updateBody.code, productID))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Code already taken');
  }
  Object.assign(product, updateBody);
  await product.save();
  return product;
};

/**
 * Delete product by id
 * @param {productID} product
 * @returns {Promise<Product>}
 */
const destroy = async (productID) => {
  const product = await getById(productID);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not avilable');
  }
  await product.remove();
  return product;
};

const getListForStore = async (filter, options) => {
  const products = await Product.paginate(filter, options);
  if (!products) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Products not avilable');
  }
  return products;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  destroy,
  getListForStore,
};
