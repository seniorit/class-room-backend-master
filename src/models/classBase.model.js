const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const classBaseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    public: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// add plugin that converts mongoose to json
classBaseSchema.plugin(toJSON);
classBaseSchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} name - The user's name
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
classBaseSchema.statics.isNameTaken = async function (name, excludeUserId) {
  const user = await this.findOne({ name, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * @typedef ClassBase
 */
const ClassBase = mongoose.model('ClassBase', classBaseSchema);

module.exports = ClassBase;
