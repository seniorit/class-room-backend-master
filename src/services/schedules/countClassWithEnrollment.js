const EnrollmentModel = require("../../models/classEnrollment.model");
const ScheduleModel = require("../../models/classSchedule.model");
const ActivityModel = require("../../models/classActivity.model");

module.exports = async () => {
  try {
    const scheduleResult = await ScheduleModel.find({
      enrollments: { $not: { $size: 0 } },
    })
      .populate("classActivity", "name")
      .exec();

    const classes = scheduleResult.map((schedule) => ({
      classActivityName: schedule.classActivity.name,
      enrollmentCount: schedule.enrollments.length,
    }));
    classes.sort((a, b) => b.enrollmentCount - a.enrollmentCount);

    const total = {
      maxEnrollment : Math.max(...classes.map((clase) => clase.enrollmentCount)),
      minEnrollment: Math.min(...classes.map((clase) => clase.enrollmentCount)),
    };

    const result = {
      classes,
      total,
    };

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


