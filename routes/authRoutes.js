var authController = require("../controllers/authController.js");
// eslint-disable-next-line no-unused-vars
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

  // req.get("/login", function(req, res) {
  //   if (req.user.use_mode === "student") {
  //     res.redirect("/login");
  //   } else if (req.user.use_mode === "parent"){
  //     res.redirect("/login");
  //   } else if (req.user.use_mode === "teacher") {
  //     res.redirect("/login");
  //   } else if (req.user.use_mode === "admin") {
  //     res.redirect("/cms");
  //   }
  // });

  app.post("/login", passport.authenticate("local-login"), function(req, res) {
    if (req.user.use_mode === "student") {
      res.json({ url: "/login" });
    } else if (req.user.use_mode === "parent"){
      res.json({ url: "/signup" });
    } else if (req.user.use_mode === "teacher") {
      res.json({ url: "/login" });
    } else if (req.user.use_mode === "admin") {
      res.json({ url: "/cms" });
    }
  });
};
