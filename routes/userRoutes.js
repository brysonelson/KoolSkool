//============================= REQUIREMENTS ================================//
var db = require("../models");
var bcrypt = require("bcryptjs");

//============================= USER ROUTES =================================//
module.exports = function(app) {
  //post to the database
  app.post("/signup", function(req, res) {
    //encript the users password with 10 salt
    bcrypt.hash(req.body.password, 10, function(err, hash) {
      //return any errors
      if (err) {
        return res.status(500).json({
          error: err
        });
      }
      //otherwise find or create the user
      else {
        db.User.findOrCreate({
          where: { email: req.body.email },
          defaults: {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hash
          }
        }).then(function(dbUser) {
          console.log(dbUser);
          res.json(dbUser);
        });
      }
    });

    console.log(req.body.email);
  });
};
