const ScheduleModel = require("../../models/classSchedule.model");
const getActivityById = require("../activitys/getById.js");
const coachService = require("../coach");
const { ApiError } = require("../../utils/ApiError");

module.exports = async (filter, options) => {
    const result = await ScheduleModel.paginate(filter, options);
    
    if (!result || !result.results) {
      throw new ApiError(404, 'pagionation not found');
    }

    const results = result.results;

    const schedules = await Promise.all(
      results.map(async (schedule) => {
        try {
          const coaches = schedule.coaches;
          
          if (!schedule.classActivity) {
            throw new ApiError(400, 'classActivity not found');
          }

          const activity = await getActivityById(schedule.classActivity);
          
          if (!activity) {
            throw new ApiError(404, `classActivity not found with ID: ${schedule.classActivity}`);
          }

          schedule.classActivity = activity;
          
          return schedule;
        } catch (error) {
          console.error(`Error to get schedule: ${schedule._id}`, error);
          throw error;
        }
      })
    );

    result.results = schedules;
    return result;
};
