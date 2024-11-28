const ScheduleService = require("../schedules/");

module.exports = async () => {
    const result = await ScheduleService.countClassWithEnrollment();
    return result;
}