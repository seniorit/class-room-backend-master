const { UserRole } = require('../models')
const { User } = require('../models')
const { UserProfile } = require('../models')
const logger = require('./logger')
const { ADMIN, USER } = require('./roles')

async function mongooseInit () {
  logger.info('Checking mongoose defaults')

  let userRole = await UserRole.findOne({ name: USER })
  if (!userRole) {
    userRole = await UserRole.create({
      name: USER,
      isDefault: true,
      permissions: [
        'userRegistered'
      ]
    })
    logger.info(`Default role ${USER} created`)
  }

  let adminRole = await UserRole.findOne({ name: ADMIN })
  if (!adminRole) {
    adminRole = await UserRole.create({ name: ADMIN, isAdmin: true })
    logger.info(`Default role ${ADMIN} created`)
  }

  const adminUser = await User.findOne({ email: 'admin@admin.com' })
  const adminUserProfile =
    adminUser && (await UserProfile.findOne({ user: adminUser.id }))
  if (!adminUser && !adminUserProfile) {
    const user = await User.create({
      email: 'admin@admin.com',
      password: 'admin123',
      role: adminRole
    })
    await UserProfile.create({
      user,
      firstname: 'Weebo',
      lastname: 'Project',
      birthday: Date.now(),
      gender: 'other',
      address: 'Texas, US.',
      postalCode: '76650',
      phone: {
        number: '7623459431',
        countryCode: '+1'
      }
    })
    logger.info('Default user "admin@admin.com" created')
  }
}

module.exports = { mongooseInit }
