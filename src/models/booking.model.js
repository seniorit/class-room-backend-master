const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const bookingSchema = mongoose.Schema(
  {
    ageRangeMin: {
      type: Number,
    },
    ageRangeMax: {
      type: Number,
    },
    skills: {
      type: [String],
    },
    classSchedule: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'ClassSchedule',
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// add plugin that converts mongoose to json
bookingSchema.plugin(toJSON);
bookingSchema.plugin(paginate);

/**
 * @typedef Booking
 */
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
