const PreOrderModel = require("../../models/preOrder");

module.exports = async (filter, options) => {
    const results = await PreOrderModel.paginate(filter, options);
    return results;
};