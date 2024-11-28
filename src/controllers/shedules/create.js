const ScheduleService = require("../../services/schedules");
const CoachService = require("../../services/coach");
const ActivityService = require("../../services/activitys");
const { createdMessage } = require("../../utils/defaultMessages");
const httpStatus = require("http-status");

module.exports = async (req, res) => {
  let status = httpStatus.CREATED;
  const result = { success: true, message: createdMessage, data: null };
  try {
    const { coaches, classActivity } = req.body;
    for (const coachId of coaches) {
      const coach = await CoachService.findById(coachId);
      if (!coach) {
        status = httpStatus.NOT_FOUND;
        result.message = "ONE COACH NOT FOUND";
        result.success = false;
        return res.status(status).json(result);
      }
    }
    const activity = await ActivityService.findById(classActivity);

    if (!activity) {
      status = httpStatus.NOT_FOUND;
      result.message = "ACTIVITY NOT FOUND";
      result.success = false;
      return res.status(status).json(result);
    }

    const classSchedule = await ScheduleService.create(req.body);
    if (!classSchedule) {
      status = httpStatus.BAD_REQUEST;
      result.message = "CAN'T CREATE SCHEDULE";
      result.success = false;
      return res.status(status).json(result);
    }
    result.data = classSchedule;
  } catch (error) {
    status = error.statusCode;
    result.message = error.message;
    result.success = false;
  }
  res.status(status).json(result);
};
