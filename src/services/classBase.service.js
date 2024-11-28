const httpStatus = require('http-status');
const { ClassBase } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a classBase
 * @param {Object} classBaseBody
 * @returns {Promise<ClassBase>}
 */
const create = async (classBaseBody) => {
  if (await ClassBase.isNameTaken(classBaseBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  return ClassBase.create(classBaseBody);
};


/**
 * Get classBase by id
 * @param {ObjectId} id
 * @returns {Promise<ClassBase>}
 */
const getClassBaseById = async (id) => {
  return ClassBase.findById(id);
};

/**
 * Get classBase by name
 * @param {string} name
 * @returns {Promise<ClassBase>}
 */
const getClassBaseByName = async (name) => {
  return ClassBase.findOne({ name });
};

/**
 * Update classBase by id
 * @param {ObjectId} classBaseId
 * @param {Object} updateBody
 * @returns {Promise<ClassBase>}
 */
const update = async (classBaseId, updateBody) => {
  const classBase = await getClassBaseById(classBaseId);
  if (!classBase) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ClassBase not found');
  }
  if (updateBody.name && (await ClassBase.isNameTaken(updateBody.name, classBaseId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  Object.assign(classBase, updateBody);
  await classBase.save();
  return classBase;
};

/**
 * Delete classBase by id
 * @param {ObjectId} classBaseId
 * @returns {Promise<ClassBase>}
 */
const destroy = async (classBaseId) => {
  const classBase = await getClassBaseById(classBaseId);
  if (!classBase) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ClassBase not found');
  }
  await classBase.remove();
  return classBase;
};

/**
 * Query for classBases
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryClassBases = async (filter, options) => {
  const classBases = await ClassBase.paginate(filter, options);
  return classBases;
};

module.exports = {
  create,
  update,
  destroy,
  queryClassBases,
  getClassBaseById,
  getClassBaseByName,
};