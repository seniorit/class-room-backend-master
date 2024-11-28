const CoachModel = require("../../models/coachProfile.model");

module.exports = async (id) => {
  try {
    return await CoachModel.findById(id).populate('User').exec();
  } catch (error) {
    throw new Error(error);
    
  }
};
