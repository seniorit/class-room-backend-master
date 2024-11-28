const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const classScheduleSchema = mongoose.Schema(
  {
    classActivity: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "ClassActivity",
    },
    coaches: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "CoachProfile",
      },
    ],
    public: {
      type: Boolean,
      default: false,
    },
    slots: {
      type: Number,
      required: true,
    },
    recurring: {
      type: Boolean,
      required: true,
    },
    scheduled: [
      {
        day: {
          type: String, //Emuns week today
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
        },
        startTime: {
          type: String, // Or 0 this Date
          required: true,
        },
        endTime: {
          type: String, // Or 0 this Date
          required: true,
        },
      },
    ],
    validityTime: {
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
    },
    enrollments: [
      { type: mongoose.SchemaTypes.ObjectId, ref: "ClassEnrollment" },
    ],
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// add plugin that converts mongoose to json
classScheduleSchema.plugin(toJSON);
classScheduleSchema.plugin(paginate);

/**
 * @typedef ClassSchedule
 */
const ClassSchedule = mongoose.model("ClassSchedule", classScheduleSchema);

module.exports = ClassSchedule;
