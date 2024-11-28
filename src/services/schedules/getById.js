const ScheduleModel = require("../../models/classSchedule.model");

module.exports = async (id) => {

  return await ScheduleModel.findById(id).populate("classActivity").lean();
};
