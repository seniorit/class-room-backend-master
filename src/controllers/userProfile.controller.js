const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userProfileService } = require('../services');
const { createdMessage, updatedMessage, deletedMessage } = require('../utils/defaultMessages');


const getUserProfiles = async (req, res) => {
  const filter = pick(req.query, ['user', 'firstName', 'lastName', 'birthDay', 'postalCode', 'phone', 'gender']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await userProfileService.queryUserProfiles(filter, options);
  res.send(result);
}

const getUserProfile = async (req, res) => {
  const userProfile = await userProfileService.getUserProfileById(req.params.userProfileId);
  if (!userProfile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'UserProfile not found');
  }
  res.send(userProfile);
}

const getUserProfileByUserId = async (req, res) => {
  const userProfile = await userProfileService.getUserProfileByUserId(req.params.userId);
  if (!userProfile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'UserProfile not found');
  }
  res.send(userProfile);
}

const createUserProfile = async (req, res) => {
  let status = httpStatus.CREATED;
  const result = { success: true, message: createdMessage, data: null };
  try {
    const userProfile = await userProfileService.createUserProfile(req.body);
    result.data = userProfile;
  } catch (error) {
    status = error.statusCode;
    result.message = error.message;
    result.success = false;
  }
  res.status(status).json(result);
}

const updateUserProfile = async (req, res) => {

  let status = httpStatus.OK;
  const result = { success: true, message: updatedMessage, data: null };
  try {
    const userProfile = await userProfileService.updateUserProfileById(req.params.userProfileId, req.body);
    result.data = userProfile;
  } catch (error) {
    status = error.statusCode;
    result.message = error.message;
    result.success = false;
  }
  res.status(status).json(result);
}

const deleteUserProfile = async (req, res) => {
  let status = httpStatus.OK;
  const result = { success: true, message: deletedMessage };
  try {
    await userProfileService.deleteUserProfileById(req.params.userProfileId);
  } catch (error) {
    status = error.statusCode;
    result.message = error.message;
    result.success = false;
  }
  res.status(status).json(result);
}


module.exports = {
  createUserProfile,
  getUserProfiles,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  getUserProfileByUserId,
};
