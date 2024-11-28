const httpStatus = require('http-status');
const { CoachProfile } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a coachProfile
 * @param {Object} coachProfileBody
 * @returns {Promise<coachProfile>}
 */
const createCoachProfile = async (coachProfileBody) => {
  return CoachProfile.create(coachProfileBody);
};

/**
 * Query for coachProfiles
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCoachProfiles = async (filter, options) => {
  const coachProfiles = await CoachProfile.paginate(filter, options);
  return coachProfiles;
};

/**
 * Get coachProfile by id
 * @param {ObjectId} id
 * @returns {Promise<CoachProfile>}
 */
const getCoachProfileById = async (id) => {
  return CoachProfile.findById(id);
};

/**
 * Update coachProfile by id
 * @param {ObjectId} coachProfileId
 * @param {Object} updateBody
 * @returns {Promise<CoachProfile>}
 */
const updateCoachProfileById = async (coachProfileId, updateBody) => {
  const coachProfile = await getCoachProfileById(coachProfileId);
  if (!coachProfile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Coach Profile not found');
  }
  Object.assign(coachProfile, updateBody);
  await coachProfile.save();
  return coachProfile;
};

/**
 * Delete coachProfile by id
 * @param {ObjectId} coachProfileId
 * @returns {Promise<CoachProfile>}
 */
const deleteCoachProfileById = async (coachProfileId) => {
  const coachProfile = await getCoachProfileById(coachProfileId);
  if (!coachProfile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Coach Profile not found');
  }
  await coachProfile.remove();
  return coachProfile;
};

module.exports = {
  createCoachProfile,
  queryCoachProfiles,
  getCoachProfileById,
  updateCoachProfileById,
  deleteCoachProfileById,
};
