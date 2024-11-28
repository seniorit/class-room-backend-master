const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')

const userRoleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    permissions: [
      {
        type: String
      }
    ],
    isAdmin: {
      type: Boolean,
      default: false
    },
    isDefault: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

//
userRoleSchema.index(
  { isDefault: 1 },
  { unique: true, partialFilterExpression: { isDefault: true } }
)

// add plugin that converts mongoose to json
userRoleSchema.plugin(toJSON)
userRoleSchema.plugin(paginate)

/**
 * @typedef User
 */
const UserRole = mongoose.model('UserRole', userRoleSchema)

module.exports = UserRole
