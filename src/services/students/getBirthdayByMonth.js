
const StudentsModel = require("../../models/student.model");

module.exports = async (options) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const filter = { $expr: { $eq: [{ $month: "$birthday" }, currentMonth] } };
  const studentsResults = await StudentsModel.paginate(filter, options);

  return studentsResults;
};