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
}; //end module.exports
