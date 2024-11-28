const httpStatus = require('http-status')
const pick = require('../utils/pick')
const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
const { orderService } = require('../services')
const {
  createdMessage,
  updatedMessage,
  deletedMessage
} = require('../utils/defaultMessages')

const getAll = async (req, res) => {
  const filter = pick(req.query, [
    'oderId',
    'userId',
    'status',
    'registrationDate',
    'paymentDate'
  ])
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate'])
  const result = await orderService.getAll(filter, options)
  res.send(result)
}

const addItem = async (req, res) => {
  let status = httpStatus.CREATED
  const result = { success: true, message: createdMessage, data: null }
  try {
    const order = await orderService.createOrUpdateOrder(
      req.body.userId,
      req.body.itemId,
      req.body.quantity
    )

    if (!order) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Register not found')
    }

    const orderList = await orderBody(order)
    result.data = orderList
  } catch (error) {
    status = error.statusCode
    result.message = error.message
    result.success = false
  }
  res.status(status).json(result)
}

const removeItem = async (req, res) => {
  let status = httpStatus.OK
  const result = { success: true, message: updatedMessage, data: null }
  try {
    const order = await orderService.removeItemFromOrder(
      req.body.userId,
      req.body.itemId
    )

    if (!order) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Register not found')
    }

    const orderList = await orderBody(order)
    result.data = orderList
  } catch (error) {
    status = error.statusCode
    result.message = error.message
    result.success = false
  }
  res.status(status).json(result)
}

const getId = async (req, res) => {
  const order = await orderService.getId(req.params.orderId)
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Register not found')
  }
  const resposeObject = await orderBody(order)

  res.json(resposeObject)
}

const getByUserId = async (req, res) => {
  const order = await orderService.getByUserId(
    req.params.userId,
    req.query.status
  )
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Register not found')
  }
  const resposeObject = await orderBody(order)

  res.json(resposeObject)
}

const getAllByUserId = async (req, res) => {
  const order = await orderService.getAllByUserId(
    req.params.userId,
    req.query.status
  )
  res.json(order)
}

const process = async (req, res) => {
  let status = httpStatus.OK
  const result = { success: true, message: updatedMessage, data: null }
  try {
    const order = await orderService.process(req.body)
    result.data = await orderBody(order)
  } catch (error) {
    status = error.statusCode
    result.message = error.message
    result.success = false
  }
  res.status(status).json(result)
}

const revoke = async (req, res) => {
  let status = httpStatus.OK
  const result = {
    success: true,
    message: 'Order reversed successfully',
    data: null
  }
  try {
    const order = await orderService.revoke(req.params.orderId)
    result.data = await orderBody(order)
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
    await orderService.destroy(req.params.orderId)
  } catch (error) {
    status = error.statusCode
    result.message = error.message
    result.success = false
  }
  res.status(status).json(result)
}

const orderBody = async order => {
  // Calculate the sum of the number of items
  const totalQuantity = order.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  )

  // Calcular la suma de la cantidad de items
  const totalPrice = order.items.reduce(
    (acc, item) => acc + item.itemPrice * item.quantity,
    0
  )

  const totalPriceFixed = parseFloat(totalPrice.toFixed(2))
  const totalQuantityFixed = parseFloat(totalQuantity.toFixed(2))

  return {
    id: order.id,
    userId: order.userId,
    status: order.status,
    registrationDate: order.registrationDate,
    paymentDate: order.paymentDate ?? null,
    items: order.items,
    totalPrice: totalPriceFixed,
    totalQuantity: totalQuantityFixed
  }
}

module.exports = {
  getAll,
  getId,
  addItem,
  removeItem,
  process,
  revoke,
  getByUserId,
  getAllByUserId,
  destroy
}
