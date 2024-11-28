const StudentModel = require("../../models/student.model");

module.exports = async (student) => {
  try {
    return await StudentModel.create(student);
  } catch (error) {
    throw new Error(error.message);
  }
};
