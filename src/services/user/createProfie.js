const UserProfileModel = require("../../models/userProfile.model");
const findProfileByPhone = require("./findProfileByPhone.js");

module.exports = async (profile) => {
  const userProfile = await findProfileByPhone(profile.phone.number);
  if (userProfile) {
    throw new Error(
      `User profile with phone number ${profile.phone.number} already exists`
    );
  }
    
  return await UserProfileModel.create(profile);
};
