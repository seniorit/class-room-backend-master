const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const { Order } = require('../models')
const { classBaseService } = require('.')

/**
 * Query for get All Orders
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAll = async (filter, options) => {
  const orders = await Order.paginate(filter, options)
  return orders
}

const getAllByUserId = async (userId, status) => {
  if (!status) {
    const orders = await Order.find({ userId })
    return orders
  } else {
    const orders = await Order.find({ userId, status })
    return orders
  }
}

const createOrUpdateOrder = async (userId, itemId, quantity) => {
  let existingOrder = await Order.findOne({ userId, status: 'pending' })

  if (!existingOrder) {
    /**
     * If there is no order with a pending status, a new one will be created
     */
    const classBase = await classBaseService.getClassBaseById(itemId)
    const itemObject = {
      itemId: classBase.id,
      itemName: classBase.name,
      itemPrice: classBase.price,
      quantity
    }
    existingOrder = await Order.create({
      userId,
      items: [itemObject],
      status: 'pending'
    })
  } else {
    /**
     * If there is a pending order, add or update the items
     */
    const existingItem = existingOrder.items.find(
      item => item.itemId === itemId
    )

    if (existingItem) {
      // If the item already exists in the order, update its quantity
      existingItem.quantity += quantity
    } else {
      // If the item does not exist in the order, add it
      const classBase = await classBaseService.getClassBaseById(itemId)
      const itemObject = {
        itemId: classBase.id,
        itemName: classBase.name,
        itemPrice: classBase.price,
        quantity
      }
      existingOrder.items.push(itemObject)
    }

    // Save updated order
    await existingOrder.save()
  }
  return existingOrder
}

const removeItemFromOrder = async (userId, itemId) => {
  let existingOrder = await Order.findOne({ userId, status: 'pending' })
  if (!existingOrder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found')
  }

  const existingItem = existingOrder.items.find(item => item.itemId === itemId)

  if (existingItem) {
    if (existingItem.quantity > 1) {
      existingItem.quantity -= 1
    } else {
      // Find the index of the item you want to delete
      const itemIndex = existingOrder.items.findIndex(
        item => item.itemId === itemId
      )
      existingOrder.items.splice(itemIndex, 1)

      // Save of orden updated
      await existingOrder.save()
      return existingOrder
    }
    // Save updated order
    await existingOrder.save()
    return existingOrder
  }

  return existingOrder
}

const getOrderActive = async userId => {
  // Search the order by userId and status "pending"
  const order = await Order.findOne({ userId: userId, status: 'pending' })

  if (!order) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'No pending order found for this user'
    )
  }
  return order
}

/**
 * Get userProfile by user id
 * @param {ObjectId} userId
 * @returns {Promise<UserProfile>}
 */
const getByUserId = async (userId, status = 'pending') => {
  const order = await Order.findOne({ userId, status })
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found')
  }
  return order
}

/**
 * Get Order by id
 * @param {ObjectId} id
 * @returns {Promise<ClassBase>}
 */
const getId = async orderId => {
  return Order.findById(orderId)
}

const process = async body => {
  const order = await Order.findOne({ userId: body.userId, status: 'pending' })
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found')
  }
  Object.assign(order, body)
  await order.save()
  return order
}

const revoke = async orderId => {
  const order = await Order.findOne({ _id: orderId, status: 'filled' });
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }

  // Remove the 'paymentDate' field from the order document
  order.paymentDate = null;

  // Update the status to 'pending'
  order.status = 'pending';

  await order.save();
  return order;
}

/**
 * Delete Order
 * @param {ObjectId} orderId
 * @returns {Promise<New>}
 */
const destroy = async orderId => {
  const order = await Order.findOne({ orderId, status: 'pending' })
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order Not Found')
  }
  await order.remove()
  return order
}

module.exports = {
  getAll,
  createOrUpdateOrder,
  getByUserId,
  getAllByUserId,
  getId,
  getOrderActive,
  removeItemFromOrder,
  process,
  revoke,
  destroy
}
