const httpStatus = require('http-status')
const { Classification } = require('../models')
const ApiError = require('../utils/ApiError')

/**
 * Create a classification
 * @param {Object} classification
 * @returns {Promise<classification>}
 */
const create = async classification => {
  const classificationName = await Classification.isNameTaken(
    classification.name
  )
  if (classificationName) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken')
  }
  return Classification.create(classification)
}

/**
 * select all Clasification
 */
const getAll = async (filter, options) => {
  const classification = await Classification.paginate(filter, options)
  return classification
}

/**
 * Get Classification by id
 */
const getById = async id => {
  const classification = await Classification.findById(id)
  if (!classification) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Classification not avilable')
  }
  return classification
}

/**
 * Update Classification
 */
const update = async (id, updateBody) => {
  const classification = await getById(id)
  if (!classification) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Classification not found')
  }
  if (
    updateBody.name &&
    (await Classification.isNameTaken(updateBody.name, id))
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Classification already taken')
  }
  Object.assign(classification, updateBody)
  await classification.save()
  return classification
}

/**
 * Delete Classification
 */
const destroy = async id => {
  const classification = await getById(id)
  if (!classification) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Classification not avilable')
  }
  await classification.remove()
  return classification
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroy
}
