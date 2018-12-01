var authController = require("../controllers/authController.js");
// eslint-disable-next-line no-unused-vars
var ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;
var authMiddleware = require("../middleware/authMiddleware.js");
// var db = require("../models");

module.exports = function(app, passport) {
  app.get("/signup", authController.signup);

  // app.post("/signup", (req, res) => {
  //   res.json({body:req.body});
  // })

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/cms",
      failureRedirect: "/signup"
    })
  );

  //app.get("/cms", ensureLoggedIn("/login"), authController.cms);

  app.get("/admin", authMiddleware.adminAuth(), authController.admin);

  app.get("/logout", authController.logout);

  app.get("/login", authController.login);

  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/cms",
      failureRedirect: "/login"
    })
  );
};
