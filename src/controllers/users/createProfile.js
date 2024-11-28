const UserServices = require("../../services/user");
const httpStatus = require("http-status");
const { createdMessage } = require("../../utils/defaultMessages");

module.exports = async (req, res) => {
    let status = httpStatus.CREATED;
    const result = { success: true, message: createdMessage, data: null };

    const profile = JSON.parse(req.body.profile)

    const user = await UserServices.findById(profile.user)

    if (!user) {
        status = httpStatus.NOT_FOUND;
        result.message = 'USER NOT FOUND';
        result.success = false;

        return res.status(status).json(result)
    }

    profile.picture = req.file.imgPath;

    const userProfileCreated = await UserServices.createProfile(profile);

    if (!userProfileCreated) {
        status = httpStatus.BAD_REQUEST;
        result.message = "FAIL TO CREATE USER PROFILE";
        result.success = false;

        return res.status(status).json(result);

    }
        result.data = userProfileCreated;
        
        res.status(status).json(result);
};
