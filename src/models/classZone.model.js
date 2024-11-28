const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')

const classZoneSchema = mongoose.Schema(
  {
    zone: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

// add plugin that converts mongoose to json
classZoneSchema.plugin(toJSON)
classZoneSchema.plugin(paginate)

/**
 * @typedef ClassZone
 */
const ClassZone = mongoose.model("ClassZone", classZoneSchema);

module.exports = ClassZone;
