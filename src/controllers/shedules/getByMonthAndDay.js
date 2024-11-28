const ScheduleService = require("../../services/schedules");
const pick = require("../../utils/pick");

module.exports = async (req, res) => {
  const filter = pick(req.query, ["month", "day"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);

  // Get the current month and day if not provided
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-based
  const currentDay = currentDate.getDate();

  if (!filter.month) {
    filter.month = currentMonth;
  }
  if (!filter.day) {
    filter.day = currentDay;
  }

  const result = await ScheduleService.getByMonthAndDay(filter, options);
  res.json({ ...result });
};
