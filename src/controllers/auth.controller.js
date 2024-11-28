const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const {
  authService,
  userService,
  userRoleService,
  userProfileService,
  tokenService,
  emailService
} = require('../services')

const register = async (req, res) => {
  const defRole = await userRoleService.getDefaultRole()

  if (!defRole) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Default role has not been set')
  }
  const user = await userService.createUser({
    email: req.body.email,
    password: req.body.password,
    role: defRole
  })
  try {
    const profile = await userProfileService.createUserProfile({
      user,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      birthday: req.body.birthday,
      gender: req.body.gender,
      address: req.body.address,
      postalCode: req.body.postalCode,
      phone: req.body.phone
    })

    const tokens = await tokenService.generateAuthTokens(user)
    res.status(httpStatus.CREATED).json({ profile, tokens })
  } catch (error) {
    await userService.deleteUserById(user.id)
    throw new ApiError(httpStatus.BAD_REQUEST, error)
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await authService.loginUserWithEmailAndPassword(email, password)
  const profile = await userProfileService.getUserProfileByUserId(user.id)
  const isAdmin = user.role.isAdmin
  const tokens = await tokenService.generateAuthTokens(user, isAdmin)
  res.send({ user, profile, tokens })
}

const logout = async(req, res) => {
  await authService.logout(req.body.access)
  res.status(httpStatus.OK).send({
    success: true,
    message: 'Logout Session'
  })
}

const refreshTokens = async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken)
  res.send({ ...tokens })
}

const forgotPassword = async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(
    req.body.email
  )
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken)
  res.status(httpStatus.OK).send({
    success: true,
    message: 'Email sent'
  })
}

const resetPassword = async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password)
  res.status(httpStatus.NO_CONTENT).send()
}

const sendVerificationEmail = async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user)
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken)
  res.status(httpStatus.NO_CONTENT).send()
}

const verifyEmail = async (req, res) => {
  await authService.verifyEmail(req.query.token)
  res.status(httpStatus.NO_CONTENT).send()
}

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail
}
