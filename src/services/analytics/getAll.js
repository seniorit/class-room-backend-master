const EnrollementService = require("../enrollment");

module.exports = async () => {
    const countSchedule = await EnrollementService.countSchedule()
  return { countSchedule };
};
