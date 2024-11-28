const httpStatus = require("http-status");
const { ClassZoneModel } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Query for classZones
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAll = async (filter, options) => {
  const classZones = await ClassZoneModel.paginate(filter, options);
  return classZones;
};

/**
 * Get classZone by id
 * @param {ObjectId} id
 * @returns {Promise<ClassZone>}
 */
const getById = async (id) => {
  return ClassZoneModel.findById(id);
};

/**
 * Create a classZone
 * @param {Object} body
 * @returns {Promise<ClassZone>}
 */
const create = async (zone) => {
  try {
    return await ClassZoneModel.create(zone);
  } catch (error) {
    console.log(error);
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
};

/**
 * Update classZone by id
 * @param {ObjectId} classZoneId
 * @param {Object} body
 * @returns {Promise<ClassZone>}
 */
const update = async (classZoneId, body) => {
  const classZone = await getById(classZoneId);
  if (!classZone) {
    throw new ApiError(httpStatus.NOT_FOUND, "Class Location not found");
  }
  Object.assign(classZone, body);
  await classZone.save();
  return classZone;
};

/**
 * Delete classZone by id
 * @param {ObjectId} classZoneId
 * @returns {Promise<ClassZone>}
 */
const destroy = async (classZoneId) => {
  const classZone = await getById(classZoneId);
  if (!classZone) {
    throw new ApiError(httpStatus.NOT_FOUND, "Class Location not found");
  }
  await classZone.remove();
  return classZone;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroy,
};
