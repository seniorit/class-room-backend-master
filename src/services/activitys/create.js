const httpStatus = require("http-status");
const ActivityModel = require("../../models/classActivity.model");
const ZoneService = require("../zone");
const StripeService = require("../stripe");

module.exports = async (activity) => {
  console.log("create activity");
  const zoneId = activity.zone;
  const zone = await ZoneService.findById(zoneId);

  if (!zone) {
    throw new ApiError(httpStatus.NOT_FOUND, "Zone NOT FOUND");
  }

  try {
    const stripeProduct = await StripeService.createProduct(activity);

    activity.stripe = stripeProduct;

    const activityCreated = await ActivityModel.create(activity);

    return activityCreated;
  } catch (error) {
    throw new Error("Can't create the activity, check the name be unique");
  }
};
