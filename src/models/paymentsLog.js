const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const paymentsLog = mongoose.Schema(
    {
        log: {
            type: {}
        }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// add plugin that converts mongoose to json
paymentsLog.plugin(toJSON);
paymentsLog.plugin(paginate);


module.exports = mongoose.model("paymentsLog", paymentsLog);
