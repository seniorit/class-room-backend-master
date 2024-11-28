const httpStatus = require('http-status')
const pick = require('../utils/pick')
const catchAsync = require('../utils/catchAsync')
const { classGroupService } = require('../services')
const {
  createdMessage,
  updatedMessage,
  deletedMessage
} = require('../utils/defaultMessages')

const getAll = async (req, res) => {
  const filter = pick(req.query, ['name', 'public'])
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate'])
  const result = await classGroupService.getAll(filter, options)
  res.send(result)
}

const getId = async (req, res) => {
  const group = await classGroupService.getById(req.params.groupId)
  if (!group) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ClassAvtivity not found')
  }
  res.send(group)
}

const create = async (req, res) => {
  let status = httpStatus.CREATED
  const result = { success: true, message: createdMessage, data: null }

  try {
    result.data = await classGroupService.create(req.body)
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
    const group = await classGroupService.update(req.params.groupId, req.body)
    result.data = group
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
    await classGroupService.destroy(req.params.groupId)
  } catch (error) {
    status = error.statusCode
    result.message = error.message
    result.success = false
  }
  res.status(status).json(result)
}

/**
 * funcion para lista de store para el rol cliente
 */
const getOnlyActive = async (req, res) => {
  let status = httpStatus.OK
  const result = {
    success: true,
    message: 'List classifications succesfully',
    data: null
  }
  const filter = { public: true }
  const options = pick(req.body, ['sortBy', 'limit', 'page', 'populate'])

  try {
    const groups = await classGroupService.getActive(filter, options)
    result.data = groups
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
  getOnlyActive,
  create,
  update,
  destroy
}
