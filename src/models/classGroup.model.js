const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')

const classGroupSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String
    },
    public: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

// add plugin that converts mongoose to json
classGroupSchema.plugin(toJSON)
classGroupSchema.plugin(paginate)

/**
 * Check if name is taken
 * @param {string} name - The group's name
 * @param {ObjectId} [excludeGroupId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
classGroupSchema.statics.isNameTaken = async function (name, excludeGroupId) {
  const group = await this.findOne({ name, _id: { $ne: excludeGroupId } })
  return !!group
}

/**
 * @typedef classGroup
 */
const classGroup = mongoose.model('ClassGroup', classGroupSchema)

module.exports = classGroup
