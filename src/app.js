const express = require("express");
const cors = require("cors");
const compression = require("compression");
const config = require("./config/config");
const morgan = require("./config/morgan");
const helmet = require("helmet");
const passport = require("passport");
const xss = require("xss-purge");
const mongoSanitize = require("express-mongo-sanitize");
const httpStatus = require("http-status");
const { jwtStrategy } = require("./config/passport");
const { authLimiter } = require("./middlewares/rateLimiter");
const routes = require("./routes/v1");
const { errorConverter, errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");
const routesWebhooks = require("./routes/webhooks");

const path = require("path");

const app = express();

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.use(express.static(path.resolve("public")));

// limit repeated failed requests to auth endpoints
if (config.env === "production") {
  app.use("/v1/auth", authLimiter);
}

//webhooks route
app.use("/webhook", routesWebhooks);
//v1 api routes
app.use("/v1", express.urlencoded({ extended: true }), express.json(), routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
