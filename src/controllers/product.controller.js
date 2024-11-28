const httpStatus = require('http-status')
const pick = require('../utils/pick')
const ApiError = require('../utils/ApiError')
const { productService } = require('../services')
const {
  createdMessage,
  updatedMessage,
  deletedMessage
} = require('../utils/defaultMessages')

const getAll = async (req, res) => {
  const filter = pick(req.query, [
    'name',
    'code',
    'brand',
    'description',
    'public',
    'price'
  ])
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate'])
  const result = await productService.getAll(filter, options)
  res.send(result)
}

const getId = async (req, res) => {
  const productc = await productService.getById(req.params.productId)
  if (!productc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
  }
  res.send(productc)
}

const create = async (req, res) => {
  let status = httpStatus.CREATED
  const result = { success: true, message: createdMessage, data: null }
  try {
    const product = await productService.create(req.body)
    result.data = product
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
  // console.log(req.params.productId)
  // console.log(req.body)
  try {
    const product = await productService.update(req.params.productId, req.body)
    result.data = product
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
    await productService.destroy(req.params.productId)
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
