// services/Enrollment.service.js
const httpStatus = require("http-status");
const { ClassEnrollment } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Get All ClassEnrollment
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAll = async (filter, options) => {
  const classEnrollment = await ClassEnrollment.paginate(filter, options);
  return classEnrollment;
};

/**
 * Get ClassEnrollment by id
 * @param {ObjectId} classEnrollmentId
 * @returns {Promise<ClassEnrollment>}
 */
const getById = async (classEnrollmentId) => {
  const classEnrollment = await ClassEnrollment.findById(classEnrollmentId);
  if (!classEnrollment) {
    throw new ApiError(httpStatus.NOT_FOUND, "Class Enrollment not avilable");
  }
  return classEnrollment;
};

/**
 * Create a new classEnrollment
 * @param {Object} classEnrollment- Data for creating the ClassEnrollment
 * @returns {Promise<ClassEnrollment>}
 */
const create = async (classEnrollment) => {
  
};

/**
 * Update ClassEnrollment by id
 * @param {ObjectId} classEnrollmentId - ID of the ClassEnrollment to update
 * @param {Object} updateBody - Updated data for the ClassEnrollment
 * @returns {Promise<ClassEnrollment>}
 */
/**
 * Update ClassEnrollment by id
 * @param {ObjectId} classEnrollmentId - ID of the ClassEnrollment to update
 * @param {Object} updateBody - Updated data for the ClassEnrollment
 * @returns {Promise<ClassEnrollment>}
 */
const update = async (classEnrollmentId, updateBody) => {
  const classEnrollment = await getById(classEnrollmentId);

  const isDuplicate = await ClassEnrollment.isDuplicateEnrollment(
    classEnrollment.student,
    classEnrollment.classSchedule,
    updateBody.activityDates.date
  );

  if (isDuplicate) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Student is already enrolled for the date ${updateBody.activityDates.date}`
    );
  }

  Object.assign(classEnrollment, updateBody);
  await classEnrollment.save();
  return classEnrollment;
};

/**
 * Delete ClassEnrollment by id
 * @param {ObjectId} classEnrollmentId
 * @returns {Promise<ClassEnrollment>}
 */
const destroy = async (classEnrollmentId) => {
  const classEnrollment = await getById(classEnrollmentId);

  if (!classEnrollment) {
    throw new ApiError(httpStatus.NOT_FOUND, "Class Enrollment not found");
  }
  await classEnrollment.remove();
  return classEnrollment;
};

/**
 * Auxiliary Methods by ClassEnrollment
 */

/**
 * Update the attendance status of an enrollment
 * @param {ObjectId} enrollmentId
 * @param {Date} activityDate
 * @param {String} newStatus
 * @returns {Promise<ClassEnrollment>}
 */
const updateAttendance = async (enrollmentId, activityDate, newStatus) => {
  const enrollment = await ClassEnrollment.findById(enrollmentId);
  if (!enrollment) {
    throw new Error("Enrollment not found");
  }

  const dateEntry = enrollment.activityDates.find(
    (entry) => entry.date.toISOString() === new Date(activityDate).toISOString()
  );
  if (!dateEntry) {
    throw new Error("Activity date not found in enrollment");
  }

  dateEntry.status = newStatus;
  await enrollment.save();
  return enrollment;
};

/**
 * Get enrollments by student
 * @param {ObjectId} studentId
 * @returns {Promise<Array<ClassEnrollment>>}
 */
const getEnrollmentsByStudent = async (studentId) => {
  const enrollments = await ClassEnrollment.find({
    student: studentId,
  }).populate("classSchedule");
  return enrollments;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroy,
  updateAttendance,
  getEnrollmentsByStudent,
};
