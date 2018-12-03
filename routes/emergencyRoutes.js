var db = require("../models");
var moment = require('moment');
const accountSid = process.env.TWILIO_ACCOUNT_SID;    
const authToken = process.env.TWILIO_AUTH_TOKEN; 
const client = require('twilio')(accountSid, authToken); 



module.exports = function(app) {

  app.get("/emergency", function(req, res) {
    // console.log(req);
    res.render("emergency", {
      messageSent: "No Messages Sent Yet",
      nav: false
    });
  });

  /* Get all Personnel, Parents, and Attendance records
  app.get("/emergency/", function(req, res) {
    db.Emergency.findAll({
      include: [db.Personnel, db.Parents, db.Attendence]
    }).then(function(dbEmergency) {
      var hbsObject = {
        Post : dbEmergency
      };
      console.log (hbsObject);
      res.render("emergency", hbsObject);
    });
  });
*/
  
//app.post("/api/emergency", authMiddleware.adminAuth(), function(req, res) {
  app.post("/api/emergency", function(req, res) {
    console.log(req.body);
    var confirmMsg = "Last Emergency Message Sent: " + moment().format("MM-DD-YY h:mm:ss a");
    console.log(confirmMsg);
  db.Parents.findAll({
    where : {emergency: true},
    attributes: ["phone_num_primary", "phone_num_alt"]
    
  }).then(function(dbParents) {
    
 // let primaryNumber = [];
  // let alternateNumber = []; 
   
    //let array = ["8586926920" ,"4422910744", "7604020898", "5417784167"]
    for(var i = 0; i < dbParents.length; i++){
    client.messages 
          .create({ 
             body: req.body.emergencyMsg, 
             from: '+18582408765',       
             to: '8586926920'//dbParents[0].phone_num_primary //dbParents phone numbers dbParents[i].unshift();
           }) 
          .then(message => console.log(message.sid)) 
          .done();}

          client.messages 
          .create({ 
             body: req.body.emergencyMsg, 
             from: '+18582408765',       
             to: '8586926920'//dbParents[0].phone_num_alt //dbParents phone numbers dbParents[i].unshift();
           }) 
          .then(message => console.log(message.sid)) 
          .done();})


//------------------------------//
/*
db.Personnel.findAll({
  where : {emergency : true},
  attributes: ["phone_num_primary", "phone_num_alt"]
  
}).then(function(dbPersonnel) {
  
 
  //let array = ["8586926920" ,"4422910744", "7604020898", "5417784167"]
  for(var i = 0; i < dbPersonnel.length; i++){
  client.messages 
        .create({ 
           body: req.body.emergencyMsg, 
           from: '+18582408765',       
           to: '8586926920'//dbPersonnel[0].phone_num_primary //dbParents phone numbers dbParents[i].unshift();
         }) 
        .then(message => console.log(message.sid)) 
        .done();}

        client.messages 
        .create({ 
           body: req.body.emergencyMsg, 
           from: '+18582408765',       
           to: '8586926920'//dbPersonnel[0].phone_num_alt //dbParents phone numbers dbParents[i].unshift();
         }) 
        .then(message => console.log(message.sid)) 
        .done();})
*/



          
/*
    for (var i = 0, i < dbParents.length, i++) {
    client.messages 
      .create({ 
         body: req.body, 
         from: '+18582408765',       
         to: '+13235056338' //dbParents phone numbers dbParents[i].unshift();
       }) 
      .then(message => console.log(message.sid)) 
      .done();
      }
  */     
    //res.status(200).end;
    res.json({messageSent: "test confirmMsg"});
  });
};



//bryson:  login   user routes  / models / publicjs
//miranda:  attendence front end and back end   attendence routes  / models / publicjs
//kamran:  emergency front end and back end and twilio api  /emergency routes  / models / publicjs
//sue:  already set up DB structure and sequelize, so QA of all 3   cms/user routes/input routes  /models /publicjs



//120118 -   iterate through array, json to array vs. array with object. 
//sue db phone num string vs. integer, 
//+1
//make emergency re-attendance based on miranda's attendance.
//  javascript enter button~
// make sure you have correct auth for all pages.
// make pretty and css


//do I have to send any response
//array.length