const httpStatus = require('http-status')
const pick = require('../utils/pick')
const ApiError = require('../utils/ApiError')
const { bookingService } = require('../services')
const {
  updatedMessage,
  createdMessage,
  deletedMessage
} = require('../utils/defaultMessages')

const getAll = async (req, res) => {
  const filter = pick(req.query, [
    'student',
    'classActivity',
    'completed',
    'cancelled',
    'attended',
    'refunded'
  ])
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate'])
  const result = await bookingService.getAll(filter, options)
  res.send(result)
}

const getId = async (req, res) => {
  const booking = await bookingService.getById(req.params.bookingId)
  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found')
  }
  res.send(booking)
}

const create = async (req, res) => {
  let status = httpStatus.CREATED
  const result = { success: true, message: createdMessage, data: null }
  try {
    const booking = await bookingService.create(req.body)
    result.data = booking
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
    const booking = await bookingService.update(req.params.bookingId, req.body)
    result.data = booking
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
    await bookingService.destroy(req.params.bookingId)
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
