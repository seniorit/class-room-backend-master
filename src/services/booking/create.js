const BookingModel = require("../../models/booking.model");
const ApiError = require("../../utils/ApiError");

module.exports = async (newBooking) => {
  try {
    const booking = new BookingModel(newBooking);
    await booking.save();

    return booking;
  } catch (error) {
    throw new ApiError(500);
  }
};
