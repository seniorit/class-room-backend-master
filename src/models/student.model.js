const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const studentSchema = mongoose.Schema(
  {
    guard: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "User",
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    note: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["male", "female", "other"],
    },
    picture: {
      type: String,
    },
    classifications: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Classification",
      },
    ],
    enrollments: [
      { type: mongoose.SchemaTypes.ObjectId, ref: "ClassEnrollment" },
    ],
    orders: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Order"
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// add plugin that converts mongoose to json
studentSchema.plugin(toJSON);
studentSchema.plugin(paginate);

/**
 * @typedef Student
 */
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
