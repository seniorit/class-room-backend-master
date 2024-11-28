const CoachModel = require("../../models/coachProfile.model");

module.exports = async (coach) => {
  try {
    return await CoachModel.create(coach);
  } catch (error) {
    throw new Error(error);
  }
};
