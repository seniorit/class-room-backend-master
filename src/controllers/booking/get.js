const httpStatus = require('http-status');
const BookingService = require('../../services/booking');
const pick = require('../../utils/pick');

module.exports = async (req, res) => {

  const filter = pick(req.query, ['classSchedule']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  

  if (req.query.ageRangeMin) {
    filter.ageRangeMin = { $gte: parseInt(req.query.ageRangeMin) };
  }
  if (req.query.ageRangeMax) {
    filter.ageRangeMax = { $lte: parseInt(req.query.ageRangeMax) };
  }
  if (req.query.skills) {
    filter.skills = req.query.skills;
  }
  if (req.query.classSchedule) {
    filter.classSchedule = req.query.classSchedule;
  }


  const result = await BookingService.getAll(filter, options);

  res.status(httpStatus.OK).json(result);
};
