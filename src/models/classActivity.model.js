const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')

const classActivitySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    activityPicture: [
      {
        type: String,
        required: false,
      },
    ],
    public: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    zone: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "ClassZone",
    },
    price: {
      type: Number,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    stripe: {
      type: {}
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// add plugin that converts mongoose to json
classActivitySchema.plugin(toJSON)
classActivitySchema.plugin(paginate)

/**
 * Check if name is taken
 * @param {string} name - The user's name
 * @param {ObjectId} [excludeActivityId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
classActivitySchema.statics.isNameTaken = async function (
  name,
  excludeActivityId
) {
  const activity = await this.findOne({ name, _id: { $ne: excludeActivityId } })
  return !!activity
}

/**
 * @typedef ClassActivity
 */
const classActivity = mongoose.model('ClassActivity', classActivitySchema)

module.exports = classActivity
