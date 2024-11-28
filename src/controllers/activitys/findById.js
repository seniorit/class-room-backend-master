const httpStatus = require("http-status");
const ActivityService = require("../../services/activitys");

module.exports = async (req, res) => {
  if (!Object.prototype.hasOwnProperty.call(req.params, "id")) {
    return res
      .status(httpStatus.NOT_FOUND)
      .json({
        message: "you need add the id into de url like this: /getId/activityId",
      });
  }
    
  const result = await ActivityService.findById(req.params.id);

  res.status(httpStatus.OK).json(result);
};
