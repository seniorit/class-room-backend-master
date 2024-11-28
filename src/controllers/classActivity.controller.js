const httpStatus = require('http-status')
const pick = require('../utils/pick')
const { classActivityService } = require('../services')
const {
  createdMessage,
  updatedMessage,
  deletedMessage
} = require('../utils/defaultMessages')

const getAll = async (req, res) => {
  const filter = pick(req.query, ['name', 'public', 'active', 'location'])
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate'])
  const result = await classActivityService.getAll(filter, options)
  res.send(result)
}

const getId = async (req, res) => {
  const classactivity = await classActivityService.getById(
    req.params.classActivityId
  )
  if (!classactivity) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found')
  }
  res.send(classactivity)
}

const create = async (req, res) => {
  let status = httpStatus.CREATED
  const result = { success: true, message: createdMessage, data: null }

  try {
    result.data = await classActivityService.create(req.body)
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
    const skill = await classActivityService.update(
      req.params.classActivityId,
      req.body
    )
    result.data = skill
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
    await classActivityService.destroy(req.params.classActivityId)
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
