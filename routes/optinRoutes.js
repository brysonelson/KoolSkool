var db = require("../models");
//var bCrypt = require("bcrypt-nodejs");
//var authMiddleware = require("../middleware/authMiddleware.js");

module.exports = function(app) {
  //only admin
  // Load optIn splash page
  app.get("/optin", function(req, res) {
    res.render("optin", {
      nav: false,
    });
  });

  // Create a new parent record
  app.post("/api/optin", function(req, res) {
    db.Parents.create(req.body).then(function(dbParents) {
      res.json(dbParents);
      //console.log(res);
    });
  });
};
