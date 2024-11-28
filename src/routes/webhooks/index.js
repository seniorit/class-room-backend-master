const express = require("express");

const stripeRoute = require("./stripe");

const config = require("../../config/config");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/stripe",
    route: stripeRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  // {
  //     path: '/docs',
  //     route: docsRoute,
  // },
];

defaultRoutes.forEach((route) => {
  // Add the middleware here, only for the stripe route
  if (route.path === "/stripe") {
    router.use(route.path, express.raw({ type: "application/json" }));
  }
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === "development") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
