const httpStatus = require('http-status');
const { ClassActivity } = require('../models');
const ApiError = require('../utils/ApiError');



/**
 * select all
 */
const getAll = async (filter, options) => {
  const activitys = await ClassActivity.paginate(filter, options);
  return activitys;
};

/**
 * Get activity by id
 */
const getById = async (id) => {
  const activity = await ClassActivity.findById(id);
  if (!activity) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Activity not avilable');
  }
  return activity;
};

/**
 * Create a activity
 * @param {Object} activity
 * @returns {Promise<activity>}
 */
const create = async (body) => {
  const activityName = await ClassActivity.isNameTaken(body.name);
  if (activityName) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'this Name already taken');
  }
  return ClassActivity.create(body);
};

/**
 * Update activity by id
 */
const update = async (activityId, body) => {
  const activity = await getById(activityId);
  if (!activity) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Activity not found');
  }
  const activityName = await ClassActivity.isNameTaken(body.name);
  if (activityName) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'this Name already taken');
  }
  Object.assign(activity, body);
  await activity.save();
  return activity;
};


/**
 * Delete activity by id
 */
const destroy = async (id) => {
  const activity = await getById(id);
  if (!activity) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Activity not avilable');
  }
  await activity.remove();
  return activity;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroy
};
