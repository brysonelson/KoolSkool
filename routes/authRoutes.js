var authController = require("../controllers/authcontroller.js");
var ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;
var authMiddleware = require("../middleware/authMiddleware.js");
// var db = require("../models");

module.exports = function(app, passport) {

  app.get("/signup", authController.signup);

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/dashboard",
      failureRedirect: "/signup"
    })
  );

  app.get("/dashboard", ensureLoggedIn("/login"), authController.dashboard);

  app.get("/admin", authMiddleware.adminAuth(), authController.admin);

  app.get("/logout", authController.logout);

  app.get("/login", authController.login);

  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/dashboard",
      failureRedirect: "/login"
    })
  );
};
