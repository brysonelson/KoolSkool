var db = require("../models");
var moment = require("moment");
// eslint-disable-next-line no-unused-vars
//var ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;
// eslint-disable-next-line no-unused-vars
//var authMiddleware = require("../middleware/authMiddleware.js");

module.exports = function(app) {
  // Load parents splash page
  app.get("/teachers", function(req, res) {
    res.render("wip", {
      nav: false
    });
  });

  //get statement to create the attendence form
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

  // Create the bulk records in the attendence table
  app.post("/teachers/api/attendence", function(req, res) {
    db.Attendence.bulkCreate(req.body).then(function(dbattendence) {
      res.json(dbattendence);
    });
  });


  // Get TODAY'S attendence and the student records
  //variable today
  var $today = moment().format('YYYY-MM-DD');

  //The json api version:
  //get statement to create the attendence form
  // get courses and students enrolled in courses and the attendence dates
  app.get("/api/viewAttendence", function(req, res) {
    db.Course.findAll({
      include: [
        {
          model: db.Students,
          as: "course_students",
          through: "student_course_map",
          foreignKey: "student_id"
        },
        {
          model: db.Attendence,
          as: "course_attendence",
          where: { attendence_dt: $today }
        }
      ]
    }).then(function(result) {
      res.json(result);
    });
  });

  //The res/render version:
  //get statement to create the attendence form
  // get courses and students enrolled in courses and the attendence dates
  app.get("/teachers/viewAttendence", function(req, res) {
    db.Course.findAll({
      include: [
        {
          model: db.Students,
          as: "course_students",
          through: "student_course_map",
          foreignKey: "student_id"
        },
        {
          model: db.Attendence,
          as: "course_attendence",
          where: { attendence_dt: $today }
        }
      ]
    }).then(function(dbAttendence) {
      res.render("viewAttendence", {
        nav: true,
        today: $today,
        students: dbAttendence,
        course: dbAttendence,
        attendence: dbAttendence
      });
    });
  });

  /*********does  not work*/
  //The json api version:
  //get statement to create the attendence form
  // get courses and students enrolled in courses and the attendence dates
  app.get("/api/viewAttendence2", function(req, res) {
    db.sequelize.query("Select DISTINCT c.course_descr, s.first_name, s.last_name, a.absent from courses c inner join student_course_map m on c.id = m.course_id inner join students s on m.student_id = s.id inner join attendence a on m.student_id = a.student_id and m.course_id = a.course_id Where a.attendence_dt = '2018-12-02'", 
    {type: db.sequelize.QueryTypes.SELECT}
  ).then(function(result) {
      res.json(result);
    });
  });

 

  //The json api version:
  //get statement to create the attendence form
  // get courses and students enrolled in courses and the attendence dates
  app.get("/api/viewAttendence1", function(req, res) {
    db.Course.findAll({
      include: [
        {
          model: db.Students,
          as: "course_students",
          through: "student_course_map",
          foreignKey: "student_id"
        },
        {
          model: db.Attendence,
          as: "course_attendence",
          where: { attendence_dt: $today }
        }
      ]
    }).then(function(dbCourse) {
      db.Attendence.findAll({
        where: { attendence_dt: $today }
      }).then(function(dbAttendence) {
        res.render("viewAttendence", {
          nav: true,
          today: $today,
          course: dbCourse,
          attendence: dbAttendence
        });
      });
  }); 
});

};
