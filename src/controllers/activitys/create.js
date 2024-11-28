const ActivityServices = require("../../services/activitys");
const httpStatus = require("http-status");
const { createdMessage } = require("../../utils/defaultMessages");
const ActivityValidate = require("./validate");

module.exports = async (req, res) => {
  let status = httpStatus.CREATED;
  const result = { success: true, message: createdMessage, data: null };
  
  if (!Object.prototype.hasOwnProperty.call(req.body, "activity")) {
    status = httpStatus.NOT_FOUND;
    result.message = "OBJECT ACTIVITY NOT FOUND";
    result.success = false;
    return res.status(status).json(result);
  }

  if (req.files.length === 0) {
    status = httpStatus.NOT_FOUND;
    result.message = "PICTURES NOT FOUND";
    result.success = false;
    return res.status(status).json(result);
  }

  const filesPath = req.files.map((file) => file.imgPath);
  const activityJsonParse = JSON.parse(req.body.activity);
  activityJsonParse.activityPicture = filesPath;

  const { error, value: activity } =
    ActivityValidate.create.validate(activityJsonParse);
  if (error) {
    status = httpStatus.BAD_REQUEST;
    result.message = error.details[0].message;
    result.success = false;
    return res.status(status).json(result);
  }

  result.data = await ActivityServices.create(activity);

  res.status(status).json(result);
};
