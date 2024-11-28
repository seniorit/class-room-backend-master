const httpStatus = require('http-status')
const pick = require('../utils/pick')
const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
const { studentService } = require('../services')
const {
  createdMessage,
  updatedMessage,
  deletedMessage
} = require('../utils/defaultMessages')

const getAll = async (req, res) => {
  const filter = pick(req.query, [
    'guard',
    'firstName',
    'lastName',
    'birthday',
    'gender'
  ])
  const options = pick(req.query, ['sortBy', 'limit', 'page','populate'])
  const result = await studentService.getAll(filter, options)
  res.send(result)
}

const getById = async (req, res) => {
  const student = await studentService.getById(req.params.studentId)
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found')
  }
  res.send(student)
}

const getByGuardId = async (req, res) => {
  const student = await studentService.getByGuardId(req.params.guardId)
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found')
  }
  res.send(student)
}

const getByClassificationId = async (req, res) => {
  const filter = pick(req.query, [
    'guard',
    'firstName',
    'lastName',
    'birthday',
    'gender'
  ])
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate'])
  const student = await studentService.getByClassificationId(
    req.params.classificationId,
    filter,
    options
  )
  if (!student) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Student not found by Classification'
    )
  }
  res.send(student)
}

const create = async (req, res) => {
  let status = httpStatus.CREATED
  const result = { success: true, message: createdMessage, data: null }
  try {
    const student = await studentService.create(req.body)
    result.data = student
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
    const student = await studentService.update(req.params.studentId, req.body)
    result.data = student
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
    await studentService.destroy(req.params.studentId)
  } catch (error) {
    status = error.statusCode
    result.message = error.message
    result.success = false
  }
  res.status(status).json(result)
}

module.exports = {
  getAll,
  getById,
  getByGuardId,
  getByClassificationId,
  create,
  update,
  destroy
}
