const httpStatus = require('http-status')
const pick = require('../utils/pick')
const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
const { classificationService } = require('../services')
const {
  createdMessage,
  updatedMessage,
  deletedMessage
} = require('../utils/defaultMessages')

/**
 * Method Listed Found All Classifications
 */
const getAll = async (req, res) => {
  const filter = pick(req.query, ['name'])
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate'])
  const result = await classificationService.getAll(filter, options)
  res.send(result)
}

/**
 * Method Listed Found Classification By Id
 */
const getById = async (req, res) => {
  const classification = await classificationService.getById(
    req.params.classificationId
  )
  if (!classification) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Classification not found')
  }
  res.send(classification)
}

const create = async (req, res) => {
  let status = httpStatus.CREATED
  const result = { success: true, message: createdMessage, data: null }
  try {
    result.data = await classificationService.create(req.body)
  } catch (error) {
    status = error.statusCode
    result.message = error.message
    result.success = false
  }

  res.status(status).json(result)
}

const update = async (req, res) => {
  let status = httpStatus.OK
  const result = { success: true, message: updatedMessage, data: null }
  try {
    const classification = await classificationService.update(
      req.params.classificationId,
      req.body
    )
    result.data = classification
  } catch (error) {
    status = error.statusCode
    result.message = error.message
    result.success = false
  }
  res.status(status).json(result)
}

const destroy = async (req, res) => {
  let status = httpStatus.OK
  const result = { success: true, message: deletedMessage }
  try {
    await classificationService.destroy(req.params.classificationId)
  } catch (error) {
    status = error.statusCode
    result.message = error.message
    result.success = false
  }
  res.status(status).json(result)
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  destroy
}
