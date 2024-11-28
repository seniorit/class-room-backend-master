const AnalyticsService = require("../../services/analytics/");

module.exports = async (req, res) => {
  const analytics = await AnalyticsService.getClass();
  res.status(200).json(analytics);
};
