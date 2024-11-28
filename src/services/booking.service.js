const httpStatus = require('http-status');
const { Booking } = require('../models');
const ApiError = require('../utils/ApiError');


/**
 * Query for get All bookings
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAll = async (filter, options) => {
  const bookings = await Booking.paginate(filter, options);
  return bookings;
};

/**
 * Get booking by id
 * @param {ObjectId} id
 * @returns {Promise<Booking>}
 */
const getById = async (id) => {
  return Booking.findById(id);
};


/**
 * Create a booking
 * @param {Object} body
 * @returns {Promise<Booking>}
 */
const create = async (body) => {
 return Booking.create(body);
};

/**
 * Update Booking by id
 * @param {ObjectId} bookingId
 * @param {Object} body
 * @returns {Promise<Booking>}
 */
const update = async (bookingId, body) => {
  const booking = await getById(bookingId);
  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }
  Object.assign(booking, body);
  await booking.save();
  return booking;
};

/**
 * Delete booking by id
 * @param {ObjectId} bookingId
 * @returns {Promise<Booking>}
 */
const destroy = async (bookingId) => {
  const booking = await getById(bookingId);
  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }
  await booking.remove();
  return booking;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroy,
};
