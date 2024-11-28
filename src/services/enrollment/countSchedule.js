const EnrollmentModel = require("../../models/classEnrollment.model");
const ScheduleModel = require("../../models/classSchedule.model");
const ActivityModel = require("../../models/classActivity.model");

module.exports = async () => {
  try {
    const aggregationResult = await ScheduleModel.aggregate([
      {
        $lookup: {
          from: ActivityModel.collection.name,
          localField: "classActivity",
          foreignField: "_id",
          as: "activity_info",
        },
      },
      { $unwind: "$activity_info" },
      {
        $lookup: {
          from: EnrollmentModel.collection.name,
          localField: "_id",
          foreignField: "classSchedule",
          as: "enrollments",
        },
      },
      {
        $project: {
          _id: 1,
          activityName: "$activity_info.name",
          enrollmentCount: { $size: "$enrollments" },
        },
      },
      { $sort: { enrollmentCount: -1 } },
    ]);

    const [highestEnrollment, ...rest] = aggregationResult;
    const lowestEnrollment = rest[rest.length - 1];

    return {
      countSchedule: {
        highestEnrollment,
        lowestEnrollment,
      },
    };
  } catch (error) {
    console.error("Error during aggregation:", error);
    throw new Error('Could not retrieve student count by schedule.');
  }
};
