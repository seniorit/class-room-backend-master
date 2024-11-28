const app = require("./app");
const configVars = require("./config/config");
const mongoose = require("mongoose");
const logger = require("./config/logger");
const { mongooseInit } = require("./config/mongoose");
const { initService } = require("./services/email.service");

mongoose
  .connect(configVars.mongoose.url, configVars.mongoose.options)
  .then(() => {
    logger.info("Connected to MongoDB");

    app.listen(configVars.port, () => {
      console.info(`Listening to port ${configVars.port}`);
      initService();
    });
    mongooseInit();
  });
