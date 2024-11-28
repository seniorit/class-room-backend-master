const httpStatus = require('http-status')
const {
  ClassSchedule,
  ClassActivity,
  ClassZone
} = require('../models')
const ApiError = require('../utils/ApiError')

/**
 * Query for All ClassSchedules
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAll = async (filter,options) => {
  const result = await ClassSchedule.paginate(filter, options)

  const classSchedules = await Promise.all(
    result.results.map(async schedule => {
      const classActivity = await ClassActivity.findById(
        schedule.classActivity,
        'name'
      )
      const classZone = await ClassZone.findById(
        schedule.classZone,
        'zone'
      )

      return {
        classActivity,
        classZone,
        ...result
      }
    })
  )

  return {
    ...result,
    results: classSchedules
  }
}

// const getAll0 = async (filter, options) => {
//   const classSchedules = await ClassSchedule.find().populate([
//     'classActivity',
//     'classZone'
//   ])
//   return classSchedules
// }

/**
 * Get classSchedule by id
 * @param {ObjectId} id
 * @returns {Promise<ClassSchedule>}
 */
const getById = async id => {
  return ClassSchedule.findById(id)
}

/**
 * Create a classSchedule
 * @param {Object} classScheduleBody
 * @returns {Promise<ClassSchedule>}
 */
const create = async classScheduleBody => {
  return ClassSchedule.create(classScheduleBody)
}

/**
 * Update classSchedule by id
 * @param {ObjectId} classScheduleId
 * @param {Object} updateBody
 * @returns {Promise<ClassSchedule>}
 */
const update = async (classScheduleId, updateBody) => {
  const classSchedule = await getById(classScheduleId)
  if (!classSchedule) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class schedule not found')
  }
  Object.assign(classSchedule, updateBody)
  await classSchedule.save()
  return classSchedule
}

/**
 * Delete classSchedule by id
 * @param {ObjectId} classScheduleId
 * @returns {Promise<ClassSchedule>}
 */
const destroy = async classScheduleId => {
  const classSchedule = await getById(classScheduleId)
  if (!classSchedule) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class schedule not found')
  }
  await classSchedule.remove()
  return classSchedule
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  destroy
}
