const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { coachProfileService } = require('../services');
const { createdMessage, updatedMessage, deletedMessage } = require('../utils/defaultMessages');

const getCoachProfiles = async (req, res) => {
  const filter = pick(req.query, ['User','ssn']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await coachProfileService.queryCoachProfiles(filter, options);
  res.send(result);
}

const getCoachProfile = async (req, res) => {
  const coachProfile = await coachProfileService.getCoachProfileById(req.params.coachProfileId);
  if (!coachProfile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Coach Profile not found');
  }
  res.send(coachProfile);
}

const createCoachProfile = async (req, res) => {
  let status = httpStatus.CREATED;
  const result = { success: true, message: createdMessage, data: null };
  try {
    const coachProfile = await coachProfileService.createCoachProfile(req.body);
    result.data = coachProfile;
  } catch (error) {
    status = error.statusCode;
    result.message = error.message;
    result.success = false;
  }
  res.status(status).json(result);
}

const updateCoachProfile = async (req, res) => {
  let status = httpStatus.OK;
  const result = { success: true, message: updatedMessage, data: null };
  try {
    const coachProfile = await coachProfileService.updateCoachProfileById(req.params.coachProfileId, req.body);
    result.data = coachProfile;
  } catch (error) {
    status = error.statusCode;
    result.message = error.message;
    result.success = false;
  }
  res.status(status).json(result);
}

const deleteCoachProfile = async (req, res) => {
  let status = httpStatus.OK;
  const result = { success: true, message: deletedMessage };
  try {
    await coachProfileService.deleteCoachProfileById(req.params.coachProfileId);
  } catch (error) {
    status = error.statusCode;
    result.message = error.message;
    result.success = false;
  }
  res.status(status).json(result);
}

module.exports = {
  createCoachProfile,
  getCoachProfiles,
  getCoachProfile,
  updateCoachProfile,
  deleteCoachProfile,
};
