const BaseModel = require("../../models/classBase.model");

module.exports = async (id) => {
  try {
    return await BaseModel.findById(id);
  } catch (error) {
    console.log(error);
  }
};
