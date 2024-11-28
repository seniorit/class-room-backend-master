const httpStatus = require("http-status");
const catchAsync = require("../../utils/catchAsync");
const bookingService = require("../../services/booking");
const { createdMessage } = require("../../utils/defaultMessages");

const createBooking = catchAsync(async (req, res) => {
  let status = httpStatus.CREATED;
  const result = { success: true, message: createdMessage, data: null };
  result.data = await bookingService.create(req.body);
  res.status(status).json(result);
});

module.exports = createBooking;
