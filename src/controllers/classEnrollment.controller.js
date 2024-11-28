const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const { classEnrollmentService } = require("../services");
const {
  createdMessage,
  updatedMessage,
  deletedMessage,
} = require("../utils/defaultMessages");

const getAll = async (req, res) => {
  const filter = pick(req.query, [
    "student",
    "classSchedule",
    "enrollmentDat",
    "activityDate",
    "activitySatete",
    "status",
  ]);
  const options = pick(req.query, ["sortBy", "limit", "page", "populate"]);
  const result = await classEnrollmentService.getAll(filter, options);
  res.send(result);
}

const getId = async (req, res) => {
  const classEnrollment = await classEnrollmentService.getById(
    req.params.classEnrollmentId
  );
  if (!classEnrollment) {
    throw new ApiError(httpStatus.NOT_FOUND, "Class Enrollment not found");
  }
  res.send(classEnrollment);
}

const create = async (req, res) => {
  let status = httpStatus.CREATED;
  const result = { success: true, message: createdMessage, data: null };
  const classEnrollmentCreated = await classEnrollmentService.create(req.body);


  result.data = classEnrollmentCreated;

  res.status(status).json(result);
}

const update = async (req, res) => {
  let status = httpStatus.OK;
  const result = { success: true, message: updatedMessage, data: null };
  try {
    const classenrollment = await classEnrollmentService.update(
      req.params.classEnrollmentId,
      req.body
    );
    result.data = classenrollment;
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
    await classEnrollmentService.destroy(req.params.classEnrollmentId);
  } catch (error) {
    status = error.statusCode;
    result.message = error.message;
    result.success = false;
  }
  res.status(status).json(result);
}

const getByStudent = async (req, res) => {
  const classEnrollment = await classEnrollmentService.getEnrollmentsByStudent(
    req.params.studentId
  );
  if (!classEnrollment) {
    throw new ApiError(httpStatus.NOT_FOUND, "Student Enrollment not found");
  }
  res.send(classEnrollment);
}

const updateAttendance = async (req, res) => {
  const classEnrollment = await classEnrollmentService.updateAttendance(
    req.params.classEnrollmentId,
    req.params.activityDate,
    req.status
  );
  if (!classEnrollment) {
    throw new ApiError(httpStatus.NOT_FOUND, "Student Enrollment not found");
  }
  res.send(classEnrollment);
}

module.exports = {
  getAll,
  getId,
  create,
  update,
  destroy,
  getByStudent,
  updateAttendance
};
