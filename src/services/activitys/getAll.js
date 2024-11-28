const ActivityModel = require("../../models/classActivity.model");

module.exports = async (filter, options) => {
  try {
    const activity = await ActivityModel.paginate(filter, options);
    return activity;
  } catch (err) {
      console.log(err)
    throw new Error("Can't Found the Activitis check the querys");
    
  }
};
