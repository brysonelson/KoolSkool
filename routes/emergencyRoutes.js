var db = require("../models");
var moment = require("moment");
var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
var client = require("twilio")(accountSid, authToken);

module.exports = function(app) {
  app.get("/emergency", function(req, res) {
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
    // console.log(req);
    res.render("emergency", {
      messageSent: "No Messages Sent Yet",
      nav: true,
      navLogo: logoHref
    });
  });

  //app.post("/api/emergency", authMiddleware.adminAuth(), function(req, res) {
  app.post("/api/emergency", function(req, res) {
    console.log(req.body);
    var msgTimestamp = moment().format("MM-DD-YY h:mm:ss a");
    console.log(msgTimestamp);
    db.Parents.findAll({
      where: { emergency: true },
      attributes: ["phone_num_primary", "phone_num_alt"]
    }).then(function(dbParents) {
      for (var i = 0; i < dbParents.length; i++) {
        client.messages
          .create({
            body: req.body.emergencyMsg,
            from: "+18582408765",
            to: dbParents[0].phone_num_primary
          })
          .then(function(message) {
            console.log(message.sid);
          })
          .done();
      }

      client.messages
        .create({
          body: req.body.emergencyMsg,
          from: "+18582408765",
          to: dbParents[0].phone_num_alt
        })
        .then(function(message) {
          console.log(message.sid);
        })
        .done();
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
            to: dbPersonnel[0].phone_num_primary
          })
          .then(function(message) {
            console.log(message.sid);
          })
          .done();
      }

      client.messages
        .create({
          body: req.body.emergencyMsg,
          from: "+18582408765",
          to: dbPersonnel[0].phone_num_alt
        })
        .then(function(message) {
          console.log(message.sid);
        })
        .done();
    });
    res.json({ messageSent: msgTimestamp });
  });
};
