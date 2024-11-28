const UserProfileModel = require("../../models/userProfile.model");

module.exports = async (phoneNumber) => {
    
    return await UserProfileModel.findOne({"phone.number": phoneNumber}).populate('User').exec()
}