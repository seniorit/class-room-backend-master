const httpStatus = require('http-status')
const pick = require('../utils/pick')
const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
const { classBaseService } = require('../services')
const { createdMessage, updatedMessage, deletedMessage } = require('../utils/defaultMessages');

const getAll = async (req, res) => {
  const filter = pick(req.query, ['name', 'public', 'price'])
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate'])
  const result = await classBaseService.queryClassBases(filter, options)
  res.send(result)
}

const getId = async (req, res) => {
  const classBase = await classBaseService.getClassBaseById(
    req.params.classBaseId
  )
  if (!classBase) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ClassBase not found')
  }
  res.send(classBase)
}

const create = async (req, res) => {
  let status = httpStatus.CREATED
  const result = { success: true, message: createdMessage, data: null }
  try {
    const classBase = await classBaseService.create(req.body)
    result.data = classBase
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
    const classBase = await classBaseService.update(
      req.params.classBaseId,
      req.body
    )
    result.data = classBase
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
    await classBaseService.destroy(req.params.classBaseId)
  } catch (error) {
    status = error.statusCode
    result.message = error.message
    result.success = false
  }
  res.status(status).json(result)
}

module.exports = {
  getAll,
  getId,
  create,
  update,
  destroy
}
