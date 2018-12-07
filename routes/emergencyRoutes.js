var db = require("../models");
var moment = require("moment");
var authMiddleware = require("../middleware/authMiddleware.js");
var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
var client = require("twilio")(accountSid, authToken);

module.exports = function(app) {
  app.get("/emergency", authMiddleware.emergencyAuth(), function(req, res) {
    var logoHref = {
      route: null
    };

    var use_mode_obj = {
      studentVal: false,
      parentVal: false,
      teacherVal: false,
      adminVal: false
    };
    if (req.user.use_mode === "student") {
      logoHref.route = "/login";
      use_mode_obj.studentVal = true;
    } else if (req.user.use_mode === "parent") {
      logoHref.route = "/studentinfo";
      use_mode_obj.parentVal = true;
    } else if (req.user.use_mode === "teacher") {
      logoHref.route = "/teachers/attendence";
      use_mode_obj.teacherVal = true;
      use_mode_obj.parentVal = true;
      use_mode_obj.studentVal = true;
    } else if (req.user.use_mode === "admin") {
      logoHref.route = "/cms";
      use_mode_obj.adminVal = true;
      use_mode_obj.teacherVal = true;
      use_mode_obj.parentVal = true;
      use_mode_obj.studentVal = true;
    } else if (req.user.use_mode === "super_admin") {
      logoHref.route = "/cms";
      use_mode_obj.adminVal = true;
      use_mode_obj.teacherVal = true;
      use_mode_obj.parentVal = true;
      use_mode_obj.studentVal = true;
    }

    res.render("emergency", {
      messageSent: "No Messages Sent Yet",
      nav: true,
      navLogo: logoHref,
      use_mode: use_mode_obj
    });
  });

  //app.post("/api/emergency", authMiddleware.adminAuth(), function(req, res) {
  // eslint-disable-next-line prettier/prettier
  app.post("/api/emergency", authMiddleware.emergencyAuth(), function(req, res) {
    console.log(req.body);
    var msgTimestamp = moment().format("MM-DD-YY h:mm:ss a");
    console.log(msgTimestamp);
    db.Parents.findAll({
      where: { emergency: true },
      attributes: ["phone_num_primary", "phone_num_alt"]
    }).then(function(dbParents) {
      for (var i = 0; i < dbParents.length; i++) {
        client.messages //
          .create({
            body: req.body.emergencyMsg,
            from: "+18582408765",
            to: dbParents[i].phone_num_primary
          })
          .then(function(message) {
            console.log(message.sid);
          })
          .done();

        client.messages
          .create({
            body: req.body.emergencyMsg,
            from: "+18582408765",
            to: dbParents[i].phone_num_alt
          })
          .then(function(message) {
            console.log(message.sid);
          })
          .done();
      }
    });

    db.Personnel.findAll({
      where: { emergency: true },
      attributes: ["phone_num_primary", "phone_num_alt"]
    }).then(function(dbPersonnel) {
      for (var i = 0; i < dbPersonnel.length; i++) {
        client.messages
          .create({
            body: req.body.emergencyMsg,
            from: "+18582408765",
            to: dbPersonnel[i].phone_num_primary
          })
          .then(function(message) {
            console.log(message.sid);
          })
          .done();
        client.messages
          .create({
            body: req.body.emergencyMsg,
            from: "+18582408765",
            to: dbPersonnel[i].phone_num_alt
          })
          .then(function(message) {
            console.log(message.sid);
          })
          .done();
      }
    });
    res.json({ messageSent: msgTimestamp });
  });
};
