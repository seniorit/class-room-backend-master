const httpStatus = require('http-status')
const { UserRole } = require('../models')
const ApiError = require('../utils/ApiError')

/**
 * Create a userRole
 * @param {Object} userRoleBody
 * @returns {Promise<userRole>}
 */
const createUserRole = async userRoleBody => {
  return UserRole.create(userRoleBody)
}

/**
 * Query for userRoles
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUserRoles = async (filter, options) => {
  const userRoles = await UserRole.paginate(filter, options)
  return userRoles
}

/**
 * Get userRole by id
 * @param {ObjectId} id
 * @returns {Promise<userRole>}
 */
const getUserRoleById = async id => {
  return UserRole.findById(id)
}

/**
 * Get default userRole
 * @returns {Promise<userRole>}
 */
const getDefaultRole = async () => {
  return UserRole.findOne({ isDefault: true })
}

/**
 * Update userRole by id
 * @param {ObjectId} userRoleId
 * @param {Object} updateBody
 * @returns {Promise<userRole>}
 */
const updateUserRoleById = async updateBody => {
  const userRole = await getUserRoleById(updateBody.userRoleId)
  if (!userRole) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user Role not found')
  }
  Object.assign(userRole, updateBody)
  await userRole.save()
  return userRole
}

/**
 * Delete userRole by id
 * @param {ObjectId} userRoleId
 * @returns {Promise<userRole>}
 */
const deleteUserRoleById = async userRoleId => {
  const userRole = await getUserRoleById(userRoleId)
  if (!userRole) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user Role not found')
  }
  await userRole.remove()
  return userRole
}

module.exports = {
  createUserRole,
  queryUserRoles,
  getUserRoleById,
  getDefaultRole,
  updateUserRoleById,
  deleteUserRoleById
}
