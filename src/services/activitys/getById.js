const ActivityModel = require("../../models/classActivity.model");

module.exports = async (id) => {
  console.log(id);
  try {
    const activity = await ActivityModel.findById(id).populate('zone').exec();
    return activity
  } catch (err) {
    console.log(err);
    throw new Error("Can't find the  Activity check the id");
    
  }
};
