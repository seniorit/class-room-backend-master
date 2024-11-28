const ZoneModel = require("../../models/classZone.model");

module.exports = async (id) => {
  return await ZoneModel.findById(id);
};
