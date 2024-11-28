const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')

// Subdocuments
const enrolledStudent = mongoose.Schema({
  student: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'Student'
  },
  attended: {
    type: Boolean,
    default: false
  },
  note: {
    type: String
  }
})

const classInstanceSchema = mongoose.Schema(
  {
    zone: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'ClassZone'
    },
    slots: {
      type: Number,
      required: true
    },
    scheduledStartDate: {
      type: Date,
      required: true
    },
    scheduledEndDate: {
      type: Date,
      required: true
    },
    started: {
      type: Boolean,
      default: false
    },
    startDate: {
      type: Date
    },
    finished: {
      type: Boolean,
      default: false
    },
    finishedDate: {
      type: Date
    },
    students: [enrolledStudent]
  },
  {
    timestamps: true,
    versionKey: false
  }
)

// add plugin that converts mongoose to json
classInstanceSchema.plugin(toJSON)
classInstanceSchema.plugin(paginate)

/**
 * @typedef ClassInstance
 */
const ClassInstance = mongoose.model('ClassInstance', classInstanceSchema)

module.exports = ClassInstance
