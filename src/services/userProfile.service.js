const httpStatus = require('http-status');
const { UserProfile } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a userProfile
 * @param {Object} userProfileBody
 * @returns {Promise<UserProfile>}
 */
const createUserProfile = async (userProfileBody) => {
  if (await UserProfile.isPhoneTaken(userProfileBody.phone)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Phone already taken');
  }
  return UserProfile.create(userProfileBody);
};

/**
 * Query for userProfiles
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUserProfiles = async (filter, options) => {
  const userProfiles = await UserProfile.paginate(filter, options);
  return userProfiles;
};

/**
 * Get userProfile by user id
 * @param {ObjectId} userId
 * @returns {Promise<UserProfile>}
 */
const getUserProfileByUserId = async (userId) => {
  return UserProfile.findOne({ user: userId });
};

/**
 * Get userProfile by id
 * @param {ObjectId} id
 * @returns {Promise<UserProfile>}
 */
const getUserProfileById = async (id) => {
  return UserProfile.findById(id).populate("User").exec();
};

/**
 * Get userProfile by email
 * @param {string} email
 * @returns {Promise<UserProfile>}
 */
const getUserProfileByPhone = async (phone) => {
  return UserProfile.findOne({ phone });
};

/**
 * Update userProfile by id
 * @param {ObjectId} userProfileId
 * @param {Object} updateBody
 * @returns {Promise<UserProfile>}
 */
const updateUserProfileById = async (userProfileId, updateBody) => {
  const userProfile = await getUserProfileById(userProfileId);
  if (!userProfile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'UserProfile not found');
  }
  if (updateBody.email && (await UserProfile.isPhoneTaken(updateBody.phone, userProfileId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Phone already taken');
  }
  Object.assign(userProfile, updateBody);
  await userProfile.save();
  return userProfile;
};

/**
 * Delete userProfile by id
 * @param {ObjectId} userProfileId
 * @returns {Promise<UserProfile>}
 */
const deleteUserProfileById = async (userProfileId) => {
  const userProfile = await getUserProfileById(userProfileId);
  if (!userProfile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'UserProfile not found');
  }
  await userProfile.remove();
  return userProfile;
};

module.exports = {
  createUserProfile,
  queryUserProfiles,
  getUserProfileByUserId,
  getUserProfileById,
  getUserProfileByPhone,
  updateUserProfileById,
  deleteUserProfileById,
};
