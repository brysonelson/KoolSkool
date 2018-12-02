var authController = require("../controllers/authController.js");
// eslint-disable-next-line no-unused-vars
var authMiddleware = require("../middleware/authMiddleware.js");
var crypto = require("crypto");
var async = require("async");
var nodemailer = require("nodemailer");
var db = require("../models");

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

  app.post("/login", passport.authenticate("local-login"), function(req, res) {
    console.log(req.user.use_mode);
    if (req.user.use_mode === "student") {
      res.json({ url: "/login" });
    } else if (req.user.use_mode === "parent") {
      res.json({ url: "/parents" });
    } else if (req.user.use_mode === "teacher") {
      res.json({ url: "/teachers" });
    } else if (req.user.use_mode === "admin") {
      res.json({ url: "/cms" });
    }
  });

  app.post("/forgot", function(req, res, next) {
    console.log("Posting!!! ========================================");
    // db.user.findOne({where: {email: req.body.email}}).then(function(result) {console.log(result)});
    // console.log(req.body.email);
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

          console.log("Found User! ============================");
          //set the token to the user object and make it expire in 1 hour
          dbResult.resetPasswordToken = token;
          dbResult.resetPasswordExpires = Date.now() + 3600000;

          dbResult.save(function(err) {
            // done(err, token, user);
          });
          callNext(token, dbResult, done);
        });
      }
    ]);

    function callNext(token, user, done) {
      console.log("Sending Mail! ===============================");
      var transporter = nodemailer.createTransport({
        host: "smtp.sendgrid.net",
        port: 25587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SENDGRID_USERNAME, // generated ethereal user
            pass: process.env.SENDGRID_PASSWORD // generated ethereal password
        }
    });

    console.log(user.email);

      console.log(user);
      var mailOptions = {
        to: user.email,
        from: "koolskooltool@gmail.com",
        subject: "Kool Skool Tool Password Reset",
        text:
          "You are receiving this because you (or someone else) have requested the reset of the password for your Kool Skool Tool account.\n\n" +
          "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
          "http://" +
          req.headers.host +
          "/reset/" +
          token +
          "\n\n" +
          "If you did not request this, please ignore this email and your password will remain unchanged.\n"
      };
      transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
          return console.log(err);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        done(err, "done");
        console.log("this happened");
      });

      
    }
  });
};
