
const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const classEnrollmentSchema = mongoose.Schema(
  {
    student: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Student",
      index: false
    },
    classSchedule: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "ClassSchedule",
      index: false
    },
    enrollmentDate: {
      type: Date,
      default: Date.now
    },
    attendanceSheets: [
      {
        _id: false,
        date: {
          type: Date,
          required: true,
        },
        attendanceSheet: { type: Boolean },
      },
    ],
    recoveryTokens: [
      {
        _id: false,
        date: {
          type: Date,
        },
        token: {
          type: String,
        },
        status: {
          type: String,
          enum: ["use", "waiting"],
          default: "waiting",
        },
      },
    ],
    status: {
      type: String,
      enum: ["active", "cancelled", "paid", "pause", "waiting"],
      default: "waiting",
    },
    order: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Order",
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

classEnrollmentSchema.plugin(toJSON);
classEnrollmentSchema.plugin(paginate);

/**
 * @typedef ClassEnrollment
 */
const ClassEnrollment = mongoose.model(
  "ClassEnrollment",
  classEnrollmentSchema
);

module.exports = ClassEnrollment;
