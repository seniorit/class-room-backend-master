const UserService = require("../user");
const coachModel = require("../../models/coachProfile.model");

module.exports = async (id) => {
  const coacheProfile = await coachModel.findById(id).populate('User').exec();


  return coacheProfile;
};
