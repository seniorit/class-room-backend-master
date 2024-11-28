const ScheduleModel = require("../../models/classSchedule.model");
const pick = require("../../utils/pick");

module.exports = async (filter, options) => {
  const { month, day } = pick(filter, ["month", "day"]);
  const { sortBy, limit, page } = pick(options, ["sortBy", "limit", "page"]);

  const query = {};
  if (month) {
    const startDate = new Date(month);
    const endDate = new Date(month);
    endDate.setMonth(endDate.getMonth() + 1);
    query["validityTime.startDate"] = { $gte: startDate };
    query["validityTime.endDate"] = { $lt: endDate };
  }
  if (day) {
    const startDate = new Date(day);
    const endDate = new Date(day);
    endDate.setDate(endDate.getDate() + 1);
    query["validityTime.startDate"] = { $gte: startDate };
    query["validityTime.endDate"] = { $lt: endDate };
  }

  const result = await ScheduleModel.find(query)
    .populate('classActivity')
    .populate('classZone')
    .populate('coaches')
    .sort(sortBy)
    .skip((page - 1) * limit)
    .limit(limit);

  return { success: true, data: result };
};
