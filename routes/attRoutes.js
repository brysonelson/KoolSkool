//attendence files
var db = require("../models");
module.exports = function(app) {
  app.get("/att", function(req, res) {
    res.render("att", {
      nav: true
    });
  });
  app.get("/photo-attendence", function(req, res) {
    res.render("photo-attendence", {
      nav: true
    });
  });

  //USING THIS TO RENDER COURSE NAMES ONTO THE FILE
  app.get("/teachers/attendence", function(req, res) {
    db.Course.findAll({
      include: [
        {
          model: db.Students,
          as: "course_students",
          through: "student_course_map",
          foreignKey: "student_id"
        }
      ]
    }).then(function(dbCourse) {
      res.render("attendence", {
        nav: true,
        course: dbCourse
      });
    });
  });

  // Create the bulk records in the attendence api
  app.post("/teachers/api/attendence", function(req, res) {
    db.Attendence.bulkCreate(req.body).then(function(dbattendence) {
      res.json(dbattendence);
    });
  });
}; //end module.exports
