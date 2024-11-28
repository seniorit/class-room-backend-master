const ScheduleService = require("../../services/schedules");
const pick = require("../../utils/pick");

module.exports = async (req, res) => {
  const filter = pick(req.query, [
    "classActivity",
    "public",
    "slots",
    "recurring",
    "scheduled",
  ]);
  const options = pick(req.query, ["sortBy", "limit", "page", "populate"]);
  // const result = { success: true, message: "", data: null };

  const result = await ScheduleService.getAll(filter, options);
  console.log(result);

  res.json({ ...result });
};
