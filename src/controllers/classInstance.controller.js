const httpStatus = require('http-status')
const pick = require('../utils/pick')
const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
const { classInstanceService } = require('../services')
const { createdMessage, updatedMessage, deletedMessage } = require('../utils/defaultMessages')

const getAll = async (req, res) => {
  const filter = pick(req.query, ['zone', 'slots', 'started', 'finished'])
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate'])
  const result = await classInstanceService.getAll(filter, options)
  res.send(result)
}

const getId = async (req, res) => {
  const classInstance = await classInstanceService.getById(
    req.params.classInstanceId
  )
  if (!classInstance) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ClassInstance not found')
  }
  res.send(classInstance)
}

const create = async (req, res) => {
  let status = httpStatus.CREATED
  const result = { success: true, message: createdMessage, data: null }
  try {
    const classInstance = await classInstanceService.create(req.body)
    result.data = classInstance
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
    const classInstance = await classInstanceService.update(
      req.params.classInstanceId,
      req.body
    )
    result.data = classInstance
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
    await classInstanceService.destroy(req.params.classInstanceId)
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
  getId,
  update,
  destroy
}
