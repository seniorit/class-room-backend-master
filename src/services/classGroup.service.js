const httpStatus = require('http-status')
const { ClassGroup } = require('../models')
const ApiError = require('../utils/ApiError')


/**
 * Query for class group
 */
const getAll = async (filter, options) => {
  const group = await ClassGroup.paginate(filter, options)
  return group
}

/**
 *
 * @param {*} filter : ;
 * @param {*} options
 * @returns
 */
const getActive = async (filter, options) => {
  const groups = await ClassGroup.paginate(filter, options)
  if (!groups) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Groups not avilable')
  }
  return groups
}

/**
 * Get group by id
 */
const getById = async id => {
  const group = await ClassGroup.findById(id)
  if (!group) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Group not avilable')
  }
  return group
}

/**
 * Create a product
 * @param {Object} product
 * @returns {Promise<product>}
 */
const create = async group => {
  const groupName = await ClassGroup.isNameTaken(group.name)
  if (groupName) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken')
  }
  return ClassGroup.create(group)
}


/**
 * Update group by id
 */
const update = async (groupID, updateBody) => {
  const group = await getById(groupID)
  if (!group) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Group not found')
  }
  if (
    updateBody.name &&
    (await ClassGroup.isNameTaken(updateBody.name, groupID))
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Code already taken')
  }
  Object.assign(group, updateBody)
  await group.save()
  return group
}

/**
 * Delete group by id
 */
const destroy = async id => {
  const group = await getById(id)
  if (!group) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Group not avilable')
  }
  await group.remove()
  return group
}

module.exports = {
  getAll,
  getById,
  getActive,
  create,
  update,
  destroy
}
