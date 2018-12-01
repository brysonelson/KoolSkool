var authController = require("../controllers/authController.js");
var authMiddleware = require("../middleware/authMiddleware.js");

module.exports = function(app, passport) {
  app.get("/signup", authController.signup);

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/cms",
      failureRedirect: "/signup"
    })
  );
  
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
