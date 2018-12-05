//attendence files
var db = require("../models");
var moment = require("moment");
module.exports = function (app) {
  app.get("/att", function (req, res) {
    res.render("att", {
      nav: true
    });
  });
  app.get("/photo-attendence", function (req, res) {
    res.render("photo-attendence", {
      nav: true
    });
  });

  //USING THIS TO RENDER COURSE NAMES ONTO THE FILE
  app.get("/teachers/attendence", function (req, res) {
    db.Course.findAll({
      include: [
        {
          model: db.Students,
          as: "course_students",
          through: "student_course_map",
          foreignKey: "student_id"
        }
      ]
    }).then(function (dbCourse) {
      res.render("attendence", {
        nav: true,
        course: dbCourse
      });
    });
  });

  // Create the bulk records in the attendence api
  app.post("/teachers/api/attendance", function (req, res) {
    db.Attendence.bulkCreate(req.body).then(function (dbattendence) {
      res.json(dbattendence);
    });
  });

  var $today = moment().format("YYYY-MM-DD");
  $today = '2018-12-02';

  app.get("/api/viewAttendance1", function (req, res) {
    db.sequelize
      .query(
        "Select DISTINCT c.course_descr, c.id, s.first_name, s.last_name, a.absent from courses c inner join student_course_map m on c.id = m.course_id inner join students s on m.student_id = s.id inner join attendence a on m.student_id = a.student_id and m.course_id = a.course_id Where a.attendence_dt = '" + $today + "'",
        {
          type: db.sequelize.QueryTypes.SELECT
        }
      )
      .then(function (result) {
        res.json(result);
      });
  });

  app.get("/teachers/reattendence", function (req, res) {
    db.sequelize
      .query(
        "Select DISTINCT c.course_descr, c.course_id, s.first_name, s.last_name, a.absent from courses c inner join student_course_map m on c.id = m.course_id inner join students s on m.student_id = s.id inner join attendence a on m.student_id = a.student_id and m.course_id = a.course_id Where a.attendence_dt = '" +
        $today +
        "'",
        {
          type: db.sequelize.QueryTypes.SELECT
        }
      )
      .then(function (result) {
        res.render("reattendence", {
          nav: true,
          reattendence: result
        });
      });
  });
}; //end module.exports
