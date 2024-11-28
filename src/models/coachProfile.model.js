const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')

const coachProfileSchema = mongoose.Schema(
  {
    User: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "User",
    },
    ssn: {
      type: Number,
      required: true,
      unique: true,
    },
    educationLevel: {
      type: String,
      required: true,
    },
    languages: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// add plugin that converts mongoose to json
coachProfileSchema.plugin(toJSON)
coachProfileSchema.plugin(paginate)

/**
 * @typedef CoachProfile
 */
const CoachProfile = mongoose.model('CoachProfile', coachProfileSchema)

module.exports = CoachProfile
