const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { classZoneService } = require("../services");
const {
  createdMessage,
  updatedMessage,
  deletedMessage,
} = require("../utils/defaultMessages");

const getAll = async (req, res) => {
  const filter = pick(req.query, ["zone"]);
  const options = pick(req.query, ["sortBy", "limit", "page", 'populate']);
  const result = await classZoneService.getAll(filter, options);
  res.send(result);
}

const getId = async (req, res) => {
  const classZone = await classZoneService.getById(req.params.classZoneId);
  if (!classZone) {
    throw new ApiError(httpStatus.NOT_FOUND, "class location not found");
  }
  res.send(classZone);
}

const create = async (req, res) => {
  let status = httpStatus.CREATED;
  const result = { success: true, message: createdMessage, data: null };
  try {
    const newZone = await classZoneService.create(req.body);
    result.data = newZone;
  } catch (error) {
    status = error.statusCode;
    result.message = error.message;
    result.success = false;
  }
  res.status(status).json(result);
}

const update = async (req, res) => {
  let status = httpStatus.OK;
  const result = { success: true, message: updatedMessage, data: null };
  try {
    const classZone = await classZoneService.update(
      req.params.classZoneId,
      req.body
    );
    result.data = classZone;
  } catch (error) {
    status = error.statusCode;
    result.message = error.message;
    result.success = false;
  }
  res.status(status).json(result);
}

const destroy = async (req, res) => {
  let status = httpStatus.OK;
  const result = { success: true, message: deletedMessage };
  try {
    await classZoneService.destroy(req.params.classZoneId);
  } catch (error) {
    status = error.statusCode;
    result.message = error.message;
    result.success = false;
  }
  res.status(status).json(result);
}

module.exports = {
  getAll,
  getId,
  create,
  update,
  destroy,
};
