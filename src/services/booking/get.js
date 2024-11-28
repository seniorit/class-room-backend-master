const BookingModel = require('../../models/booking.model');

module.exports = async (filter, options) => {
  try {
    const bookings = await BookingModel.paginate(filter, options);
    return bookings;
  } catch (err) {
    console.log(err);
    throw new Error("Can't find the bookings, check the queries");
  }
};
