const express = require("express");

const config = require("../../config/config");

const router = express.Router();

const catchAsync = require('../../utils/catchAsync')


const applyCatchAsync = (route) => {
  const wrappedRouter = express.Router();

  route.stack.forEach((layer) => {
    const { route } = layer;
    if (route) {
      route.stack.forEach((handlerLayer) => {
        handlerLayer.handle = catchAsync(handlerLayer.handle);
      });
    }
  });

  wrappedRouter.use(route);
  return wrappedRouter;
};

const defaultRoutes = [
  { path: "/auth", router: require("./auth.routes.js") },
  { path: "/userRoles", router: require("./userRole.routes.js") },
  { path: "/userProfiles", router: require("./userProfile.routes.js") },
  { path: "/users", router: require("./user.routes.js") },
  { path: "/students", router: require("./student.routes.js") },
  { path: "/classifications", router: require("./classification.routes.js") },
  { path: "/coachProfiles", router: require("./coachProfile.routes.js") },
  { path: "/classGroups", router: require("./classGroup.routes.js") },
  { path: "/classActivitys", router: require("./classActivity.routes.js") },
  { path: "/classSchedules", router: require("./classSchedule.routes.js") },
  { path: "/classZones", router: require("./classZone.routes.js") },
  { path: "/classEnrollment", router: require("./classEnrollmen.routes.js") },
  { path: "/classInstances", router: require("./classInstance.routes.js") },
  { path: "/bookings", router: require("./booking.routes.js") },
  { path: "/product", router: require("./product.routes.js") },
  { path: "/theme", router: require("./theme.routes.js") },
  { path: "/news", router: require("./news.routes.js") },
  { path: "/payments", router: require("./payment.routes.js") },
  { path: "/analytics", router: require("./analytics.routes.js") },
  { path: "/cart", router: require("./cart.js") },
  { path: "/preOrders", router: require("./preOrder.js") },
  { path: "/orders", router: require("./order.js") },
];

const devRoutes = [{ path: "/docs", route: require("./docs.routes") }];


defaultRoutes.forEach((route) => {
  router.use(route.path, applyCatchAsync(route.router));
});


if (config.env === "development") {
  devRoutes.forEach((route) => {
    router.use(route.path, applyCatchAsync(route.route));
  });
}

module.exports = router;
