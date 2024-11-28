const UserModel = require('../../models/user.model')

module.exports = async (id) => {
    return await UserModel.findById(id)
}