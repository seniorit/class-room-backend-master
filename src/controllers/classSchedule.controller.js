const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { classScheduleService } = require("../services");
const {
  createdMessage,
  deletedMessage,
  updatedMessage,
} = require("../utils/defaultMessages");
const ScheduleService = require("../services/schedules");

const getAll = async (req, res) => {


  const filter = pick(req.query, [
    "classActivity",
    "classZone",
    "public",
    "slots",
    "recurring",
    "scheduled",
  ]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  // const result = { success: true, message: "", data: null };

  const result = await ScheduleService.getAll(filter, options);
  console.log(result);

  res.json({ ...result });
}

const getId = async (req, res) => {
  const classSchedule = await classScheduleService.getById(
    req.params.classScheduleId
  );
  if (!classSchedule) {
    throw new ApiError(httpStatus.NOT_FOUND, "class Schedule not found");
  }
  res.send(classSchedule);
}

const create = async (req, res) => {
  let status = httpStatus.CREATED;
  const result = { success: true, message: createdMessage, data: null };
  try {
    const {
   
      classZone,
      classActivity,
      coaches,
      public,
      slots,
      recurring,
      scheduled,
      validityTime,
    } = req.body;
    const schedule = {

      classZone,
      classActivity,
      coaches,
      public,
      slots,
      recurring,
      scheduled,
      validityTime,
    };
    const classSchedule = await classScheduleService.create(schedule);
    result.data = classSchedule;
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
    const classSchedule = await classScheduleService.update(
      req.params.classScheduleId,
      req.body
    );
    result.data = classSchedule;
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
    await classScheduleService.destroy(req.params.classScheduleId);
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
