const StudentsService = require("../../services/students");
const { createdMessage } = require("../../utils/defaultMessages");
const httpStatus = require("http-status");
const studentValidation = require("./validate");

module.exports = async (req, res) => {
  let status = httpStatus.CREATED;
  const result = { success: true, message: createdMessage, data: null };

  const picture = req.file;
  if (!picture) {
    status = httpStatus.NOT_FOUND;
    result.message = "PICTURE NOT FOUND";
    result.success = false;
    return res.status(status).json(result);
  }
  if (!Object.prototype.hasOwnProperty.call(req.body, "student")) {
    status = httpStatus.NOT_FOUND;
    result.message = "OBJECT STUDENT NOT FOUND";
    result.success = false;
    return res.status(status).json(result);
  }

  const studentJsonParse = JSON.parse(req.body.student);
  studentJsonParse.picture = picture.imgPath;

  const { error, value: student } =
    studentValidation.create.validate(studentJsonParse);

  if (error) {
    status = httpStatus.BAD_REQUEST;
    result.message = error.details[0].message;
    result.success = false;
    return res.status(status).json(result);
  }

  const studentCreated = await StudentsService.create(student);
  result.data = studentCreated;

  res.status(status).json(result);
};
