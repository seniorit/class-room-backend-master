const StudentModel = require("../../models/student.model");

module.exports = async (enrollment, id) => {
  return await StudentModel.updateOne(
    { _id: id },
    { $push: { enrollments: enrollment } }
  );

};
