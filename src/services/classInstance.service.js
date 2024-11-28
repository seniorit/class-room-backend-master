const httpStatus = require('http-status')
const { ClassInstance } = require('../models')
const ApiError = require('../utils/ApiError')

/**
 * Query for get All classInstances
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAll = async (filter, options) => {
  const classInstances = await ClassInstance.paginate(filter, options)
  return classInstances
}

/**
 * Get classInstance by id
 * @param {ObjectId} id
 * @returns {Promise<ClassInstance>}
 */
const getById = async id => {
  return ClassInstance.findById(id)
}

/**
 * Create a classInstance
 * @param {Object} body
 * @returns {Promise<ClassInstance>}
 */
const create = async body => {
  return ClassInstance.create(body)
}

/**
 * Update classInstance by id
 * @param {ObjectId} classInstanceId
 * @param {Object} body
 * @returns {Promise<ClassInstance>}
 */
const update = async (classInstanceId, body) => {
  const classInstance = await getById(classInstanceId);
  if (!classInstance) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ClassInstance not found');
  }
  Object.assign(classInstance, body);
  await classInstance.save();
  return classInstance;
};

/**
 * Delete classInstance by id
 * @param {ObjectId} classInstanceId
 * @returns {Promise<ClassInstance>}
 */
const destroy = async (classInstanceId) => {
  const classInstance = await getById(classInstanceId);
  if (!classInstance) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ClassInstance not found');
  }
  await classInstance.remove();
  return classInstance;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroy
}
