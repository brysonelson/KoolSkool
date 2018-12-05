var authController = require("../controllers/authController.js");
var authMiddleware = require("../middleware/authMiddleware.js");
var ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;
var crypto = require("crypto");
var async = require("async");
var db = require("../models");
var sgMail = require("@sendgrid/mail");
var bCrypt = require("bcrypt-nodejs");

//export all of our routes
module.exports = function(app, passport) {
  //route to get the sign up page
  app.get("/signup", authMiddleware.adminAuth(), authController.signup);

  // Update a new record in users table
  app.post("/signup", authMiddleware.adminAuth(), function(req, res) {
    // var user_id_split = req.body.user_select.split(/(\d+)/);
    // var userId = parseInt(user_id_split[1]);
    //function to hash the users password
    var generateHash = function(password) {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    };

    //store the users hashed password
    var password = generateHash(req.body.password);

    //look for any users that already have that email
    db.user.findOne({ where: { email: req.body.email } }).then(function(user) {
      // if there is a user with that email, tell them the email is taken
      if (user) {
        console.log("That email is already taken");
      }
      //otherwise we will create the user in our db
      else {
        // var userPassword = generateHash(password);
        // console.log("REQ: " + req.body.personnel_select);
        var personnel_id_split = req.body.personnel_select.split(/(\d+)/);
        var personnelId = parseInt(personnel_id_split[1]);
        console.log(personnel_id_split);
        var data = {
          email: req.body.email,
          password: password,
          first_name: req.body["first-name"],
          last_name: req.body["last-name"],
          use_mode: req.body.use_mode,
          personnel_id: personnelId
        };

        db.user.create(data).then(function(newUser) {
          var logoHref = {
            route: null
          };
          if (req.user.use_mode === "student") {
            logoHref.route = "/login";
          } else if (req.user.use_mode === "parent") {
            logoHref.route = "/parents";
          } else if (req.user.use_mode === "teacher") {
            logoHref.route = "/teachers";
          } else if (req.user.use_mode === "admin") {
            logoHref.route = "/cms";
          }

          if (!newUser) {
            // return done(null, false);
            console.log("No New User Created");
          } else {
            res.render("manageusers", {
              nav: true,
              navLogo: logoHref
            });
          }
        });
      }
    });
  });

  //log the user out and send them back to the homepage
  app.get("/logout", authController.logout);

  //route to get the login screen
  app.get("/login", authController.login);

  //route to sign the user in
  app.post("/login", passport.authenticate("local-login"), function(req, res) {
    //if statements to check the users use_mode and then redirect them to the right page
    if (req.user.use_mode === "student") {
      res.json({ url: "/login" });
    } else if (req.user.use_mode === "parent") {
      res.json({ url: "/parents" });
    } else if (req.user.use_mode === "teacher") {
      res.json({ url: "/teachers" });
    } else if (req.user.use_mode === "admin") {
      res.json({ url: "/cms" });
    } else if (req.user.use_mode === "super_admin") {
      res.json({ url: "/emergency" });
    }
  });

  //when the user submits a password reset request
  app.post("/forgot", function(req, res) {
    //do this async so we dont have so many callbacks
    async.waterfall([
      function(done) {
        //create a random token to give the user so they can reset their password
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString("hex");
          done(err, token);
        });
      },
      function(token, done) {
        var email = req.body.email;
        console.log(email);
        //find the user in the db by their email
        db.user.findOne({ where: { email: email } }).then(function(dbResult) {
          //let the user know if there are no accounts with that email
          if (!dbResult) {
            req.flash("error", "No account with that email address exists.");
            return res.redirect("/login");
          }

          //set the token to the user object and make it expire in 1 hour
          dbResult.resetPasswordToken = token;
          dbResult.resetPasswordExpires = Date.now() + 3600000;

          // eslint-disable-next-line no-unused-vars
          dbResult.save(function(err) {
            // done(err, token, user);
          });
          //call the next function
          sendEmail(token, dbResult, done);
        });
      }
    ]);

    //this is the function to send mail with SendGrid
    function sendEmail(token, user, done) {
      //set our API key
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      //create our message content
      var msg = {
        to: user.email,
        from: "koolskooltool@gmail.com",
        subject: "Kool Skool Tool Password Reset",
        text:
          "You are receiving this because you (or someone else) have requested the reset of the password for your Kool Skool Tool account.\n\n" +
          "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
          //this is creating the url with the users token to reset their password
          "http://" +
          req.headers.host +
          "/reset/" +
          token +
          "\n\n" +
          "If you did not request this, please ignore this email and your password will remain unchanged.\n"
      };
      //send the email with the above message
      sgMail.send(msg, function(err) {
        if (err) {
          return console.log(err);
        }

        done(err, "done");
      });
    }
  });

  //get the proper page for the specified user to reset their password
  app.get("/reset/:token", function(req, res) {
    //find the user in the database based on their token and only if it is not expired
    db.user
      .findOne({
        where: {
          resetPasswordToken: req.params.token,
          resetPasswordExpires: { $gt: Date.now() }
        }
      })
      //then if there is no user, let the person know
      .then(function(user) {
        if (!user) {
          console.log(
            "error",
            "Password reset token is invalid or has expired."
          );
          return res.redirect("/forgot");
        }
        //now show the reset page with the users name
        res.render("reset", {
          user: user
        });
      });
  });

  //when the user submits their new password
  app.post("/reset", function(req, res) {
    //find the user based off the email they provided
    db.user
      .findOne({ where: { email: req.body.reset_pass_email } })
      //then store their new password in a hash
      .then(function(dbUser) {
        var generateHash = function(password) {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };
        //store the hashed pass in a variable
        var updatedPass = generateHash(req.body.reset_password);
        //if there is no user with the provided email, let the user know
        if (!dbUser) {
          console.log("No User Found");
        } else {
          //otherwise update their password with the new password
          dbUser.updateAttributes({
            password: updatedPass
          });
          //take the user to the login page once pass is updated.
          res.render("login");
        }
      });
  });

  //route to get the users profile
  app.get("/profile", ensureLoggedIn("/login"), function(req, res) {
    var logoHref = {
      route: null
    };
    if (req.user.use_mode === "student") {
      logoHref.route = "/login";
    } else if (req.user.use_mode === "parent") {
      logoHref.route = "/parents";
    } else if (req.user.use_mode === "teacher") {
      logoHref.route = "/teachers";
    } else if (req.user.use_mode === "admin") {
      logoHref.route = "/cms";
    } else if (req.user.use_mode === "super_admin") {
      logoHref.route = "/cms";
    }
    //render the profile page with the nav bar and pass in the users info to hbs
    res.render("profile", {
      nav: true,
      user: req.user,
      navLogo: logoHref
    });
  });

  //route to update the users profile
  app.post("/update", ensureLoggedIn("/login"), function(req, res) {
    //find the user in the db by their email
    db.user
      .findOne({ where: { email: req.user.email } })
      //then...
      .then(function(dbUser) {
        //if there is no user, let them know
        if (!dbUser) {
          console.log("No User Found.");
        } else {
          //function to hash the users password
          var generateHash = function(password) {
            return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
          };

          //store the users hashed password
          var password = generateHash(req.body.password);

          //update the db with the new values
          dbUser.updateAttributes({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: password
          });

          var logoHref = {
            route: null
          };
          if (req.user.use_mode === "student") {
            logoHref.route = "/login";
          } else if (req.user.use_mode === "parent") {
            logoHref.route = "/parents";
          } else if (req.user.use_mode === "teacher") {
            logoHref.route = "/teachers";
          } else if (req.user.use_mode === "admin") {
            logoHref.route = "/cms";
          } else if (req.user.use_mode === "super_admin") {
            logoHref.route = "/cms";
          }
          //render the profile page again with nav and the users updated info
          res.render("profile", {
            nav: true,
            user: req.user,
            navLogo: logoHref
          });
        }
      });
  });
};
