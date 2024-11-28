const httpStatus = require('http-status')
const pick = require('../utils/pick')
const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
const { userRoleService } = require('../services')
const { createdMessage, updatedMessage, deletedMessage } = require('../utils/defaultMessages')

const getuserRoles = async (req, res) => {
  const filter = pick(req.query, ['name', 'isAdmin', 'isDefault'])
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate'])
  const result = await userRoleService.queryUserRoles(filter, options)
  res.send(result)
}

const getUserRoleById = async (req, res) => {
  const userRole = await userRoleService.getUserRoleById(req.params.userRoleId)
  if (!userRole) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Role not found')
  }
  res.send(userRole)
}

const createUserRole = async (req, res) => {
  let status = httpStatus.CREATED

  const result = {
    success: true,
    message: createdMessage,
    data: null
  }
  try {
    result.data = await userRoleService.createUserRole(req.body)
  } catch (error) {
    status = error.statusCode
    result.message = error.message
    result.success = false
  }
  res.status(status).json(result)
}

const updateUserRole = async (req, res) => {
  let status = httpStatus.OK
  const result = { success: true, message: updatedMessage, data: null }
  try {
    const UserRole = await userRoleService.updateUserRoleById(req.body)
    result.data = UserRole
  } catch (error) {
    status = error.statusCode
    result.message = error.message
    result.success = false
  }
  res.status(status).json(result)
}

const deleteUserRole = async (req, res) => {
  let status = httpStatus.OK
  const result = { success: true, message: deletedMessage }
  try {
    await userRoleService.deleteUserRoleById(req.params.userRoleId)
  } catch (error) {
    status = error.statusCode
    result.message = error.message
    result.success = false
  }
  res.status(status).json(result)
}

module.exports = {
  createUserRole,
  getuserRoles,
  getUserRoleById,
  updateUserRole,
  deleteUserRole
}
