const httpStatus = require("http-status");
const ActivityService = require("../../services/activitys");
const pick = require("../../utils/pick");

module.exports = async (req, res) => {
  const filter = pick(req.query, ["name", "public", "active", "location"]);
  const options = pick(req.query, ["sortBy", "limit", "page", "populate"]);

  const result = await ActivityService.getAll(filter, options);

  res.status(httpStatus.OK).json(result);
};
