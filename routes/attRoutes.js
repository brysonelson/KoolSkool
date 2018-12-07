//attendence files
var db = require("../models");
var authMiddleware = require("../middleware/authMiddleware.js");

module.exports = function(app) {
  app.get("/att", authMiddleware.teacherAuth(), function(req, res) {

    //the following logic is for dynamically updating the handlebars nav
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
      logoHref.route = "/parents";
      use_mode_obj.parentVal = true;
    } else if (req.user.use_mode === "teacher") {
      logoHref.route = "/teachers";
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
    res.render("att", {
      nav: true,
      navLogo: logoHref,
      use_mode: use_mode_obj
      
    });
  });
  app.get("/photo-attendence", authMiddleware.teacherAuth(), function(req, res) {
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
      logoHref.route = "/parents";
      use_mode_obj.parentVal = true;
    } else if (req.user.use_mode === "teacher") {
      logoHref.route = "/teachers";
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
    res.render("photo-attendence", {
      nav: true,
      navLogo: logoHref,
      use_mode: use_mode_obj
    });
  });

  //USING THIS TO RENDER COURSE NAMES ONTO THE FILE
  app.get("/teachers/attendence", authMiddleware.teacherAuth(), function(req, res) {
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
        logoHref.route = "/parents";
        use_mode_obj.parentVal = true;
      } else if (req.user.use_mode === "teacher") {
        logoHref.route = "/teachers";
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

      res.render("attendence", {
        nav: true,
        course: dbCourse,
        navLogo: logoHref,
        use_mode: use_mode_obj
      });
    });
  });

  // Create the bulk records in the attendence api
  app.post("/teachers/api/attendence", authMiddleware.teacherAuth(), function(req, res) {
    db.Attendence.bulkCreate(req.body).then(function(dbattendence) {
      res.json(dbattendence);
    });
  });

  var $today = moment().format("YYYY-MM-DD");
  app.get("/teachers/reattendence", function(req, res) {
    db.Students.findAll({
      include: [
        {
          model: db.Course,
          as: "course_enrolled",
          through: "student_course_map",
          foreignKey: "course_id"
        }
      ]
    }).then(function(dbCourse) {
      //  start of raw query
      db.sequelize
        .query(
          "Select DISTINCT c.course_descr, c.id, s.first_name, s.last_name, m.student_id, a.absent from courses c inner join student_course_map m  on c.id = m.course_id inner join students s on m.student_id = s.id inner join attendence a on m.student_id = a.student_id and m.course_id = a.course_id Where a.attendence_dt = '" +
            $today +
            "'",
          {
            type: db.sequelize.QueryTypes.SELECT
          }
        )
        .then(function(results) {
          // console.log(JSON.stringify(dbCourse, null, 2));
          console.log(results);
          // begin function map - itterate and restructure
          function combine(results) {
            // establish empty var to ensure items are combined
            var combinedResults = [];
            // lastCourseID sets up -1 so next course pushed
            var lastCourseId = -1;
            var course = {};
            var Stringy = JSON.stringify(results);
            console.log(Stringy);
            // for each result...
            JSON.parse(Stringy).forEach(function(result) {
              // combine courses
              // combinedResults.push(course);
              // if the last course id =/= the previous id then...
              if (result.id !== lastCourseId) {
                if (lastCourseId !== -1) {
                  // combine student data together
                  combinedResults.push(course);
                }
                course = {
                  course_descr: result.course_descr,
                  id: result.id,
                  attendence: []
                };
                lastCourseId = result.id;
              }
              student = {
                first_name: result.first_name,
                last_name: result.last_name,
                student_id: result.student_id,
                absent: result.absent
              };
              course.attendence.push(student);
            });
            combinedResults.push(course);
            return combinedResults;
          }
          //call function
          var combined = combine(results);
          console.log("why???", combined);
          res.render("reattendence", {
            nav: true,
            courses: combined
          });
        });
    });
  });

  // app.post("/teachers/api/reattendence", function(req, res) {
  //   db.Attendence.bulkCreate(req.body).then(function(dbattendence) {
  //     res.json(dbattendence);
  //   });
  // });
}; //end module.exports
