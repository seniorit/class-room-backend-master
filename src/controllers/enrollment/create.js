const EnrollmentService = require("../../services/enrollment");
const ScheduleService = require("../../services/schedules");
const StudentService = require("../../services/students");
const httpStatus = require("http-status");
const { createdMessage } = require("../../utils/defaultMessages");

module.exports = async (req, res) => {
  let status = httpStatus.CREATED;
  const result = { success: true, message: createdMessage, data: null };
  const { students, classSchedule: schedule } = req.body;
  for (const student of students) {
    console.log(student)
  
  }
  
  const enrollmentCreated = await EnrollmentService.create(req.body);
  result.data = enrollmentCreated;


  await StudentService.addEnrollment(enrollmentCreated.id, student);
  
  await ScheduleService.addEnrollment(enrollmentCreated.id, schedule);

  res.status(status).json(result);
};
