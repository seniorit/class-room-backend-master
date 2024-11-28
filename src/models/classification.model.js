const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')

const classificationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

// add plugin that converts mongoose to json
classificationSchema.plugin(toJSON)
classificationSchema.plugin(paginate)

/**
 * Check if name is taken
 * @param {string} name - The theme's name
 * @param {ObjectId} [excludeGroupId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
classificationSchema.statics.isNameTaken = async function (name, excludeClassificationId) {
  const classification = await this.findOne({ name, _id: { $ne: excludeClassificationId } });
  return !!classification;
};

/**
 * @typedef Classification
 */
const Classification = mongoose.model('Classification', classificationSchema)

module.exports = Classification
