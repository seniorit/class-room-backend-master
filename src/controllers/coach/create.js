const UserService = require("../../services/user");
const CoachService = require("../../services/coach");
const { createdMessage } = require("../../utils/defaultMessages");
const httpStatus = require("http-status");
const coachValidation = require("./validate")

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

  if (!Object.prototype.hasOwnProperty.call(req.body, "coach")) {
    status = httpStatus.NOT_FOUND;
    result.message = "OBJECT COACH NOT FOUND";
    result.success = false;
    return res.status(status).json(result);
  }
  const coachJsonParse  = JSON.parse(req.body.coach)
  
  coachJsonParse.picture = picture.imgPath;

    const { error, value: coach } =
      coachValidation.create.validate(coachJsonParse);

    if (error) {
      status = httpStatus.BAD_REQUEST;
      result.message = error.details[0].message;
      result.success = false;
      return res.status(status).json(result);
    }


  const user = await UserService.findById(coach.User);

  if (!user) {
    status = httpStatus.NOT_FOUND;
    result.message = "USER NOT FOUND";
    result.success = false;
    return res.status(status).json(result);
  }

  const coachProfile = await CoachService.create(coach);

  if (!coachProfile) {
    status = httpStatus.NOT_FOUND;
    result.message = "CAN'T CREATE COACH PROFILE";
    result.success = false;
    return res.status(status).json(result);
  }
  result.data = coachProfile;

  res.status(status).json(result);
};
