var db = require("../models");
var bCrypt = require("bcrypt-nodejs");
var authMiddleware = require("../middleware/authMiddleware.js");

module.exports = function(app) {
  //only admin
  // Load cms splash page
  app.get("/cms", authMiddleware.adminAuth(), function(req, res) {
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
    res.render("cms", {
      msg: "Welcome " + req.user.first_name + " " + req.user.last_name + "!",
      nav: true,
      navLogo: logoHref,
      use_mode: use_mode_obj
    });
  });

  // load in-progress pages for nav-bar
  app.get("/reports", function(req, res) {
    res.render("wip", {
      nav: false
    });
  });

  // Load parents data entry page (note: only dropdowns are populated)
  app.get("/cms/parents", authMiddleware.adminAuth(), function(req, res) {
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

    db.Students.findAll({
      attributes: { include: ["last_name", "first_name"] },
      order: [["last_name", "ASC"], ["first_name", "ASC"]]
    }).then(function(dbStudents) {
      res.render("parents", {
        nav: true,
        students: dbStudents,
        navLogo: logoHref,
        use_mode: use_mode_obj
      });
    });
  });

  // Create a new parent record
  app.post("/cms/api/parents", function(req, res) {
    db.Parents.create(req.body).then(function(dbParents) {
      res.json(dbParents);
    });
  });

  // Create the bulk records in the parent_child_map
  app.post("/cms/api/parentchild", function(req, res) {
    db.parent_child_map.bulkCreate(req.body).then(function(dbparent_child_map) {
      res.json(dbparent_child_map);
    });
  });

  //get the parentChild records  --DOESN'T WORK!
  // eslint-disable-next-line no-unused-vars
  app.get("/cms/api/parentchild/:id", function(req, res) {
    db.parent_child_map
      .findAll({ where: { parent_id: req.params.id } })
      .then(function(dbparent_child_map) {
        console.log(dbparent_child_map);
      });
  });

  // Load personnel data entry page
  app.get("/cms/personnel", authMiddleware.adminAuth(), function(req, res) {
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

    res.render("personnel", {
      nav: true,
      navLogo: logoHref,
      use_mode: use_mode_obj
    });
  });

  // Create a new person in personnel table
  app.post("/cms/api/personnel", function(req, res) {
    db.Personnel.create(req.body).then(function(dbPersonnel) {
      res.json(dbPersonnel);
      console.log(res);
    });
  });

  // Load parents data entry page (note: only dropdowns are populated)
  app.get("/cms/students", authMiddleware.adminAuth(), function(req, res) {
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
    db.Parents.findAll({
      attributes: { include: ["last_name", "first_name"] },
      order: [["last_name", "ASC"], ["first_name", "ASC"]]
    }).then(function(dbParents) {
      res.render("students", {
        nav: true,
        parents: dbParents,
        navLogo: logoHref,
        use_mode: use_mode_obj
      });
    });
  });

  // Get all examples
  app.get("/cms/api/allparents", function(req, res) {
    db.Parents.findAll({
      attributes: { include: ["last_name", "first_name"] },
      order: [["last_name", "ASC"], ["first_name", "ASC"]]
    }).then(function(dbParents) {
      res.json(dbParents);
    });
  });

  // Create a new person in students table
  app.post("/cms/api/students", function(req, res) {
    db.Students.create(req.body).then(function(dbStudents) {
      res.json(dbStudents);
    });
  });

  // Load students data entry page
  app.get("/cms/courses", authMiddleware.adminAuth(), function(req, res) {
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

    res.render("courses", {
      nav: true,
      navLogo: logoHref,
      use_mode: use_mode_obj
    });
  });

  // Create a new record in course table
  app.post("/cms/api/courses", function(req, res) {
    db.Course.create(req.body).then(function(dbCourse) {
      res.json(dbCourse);
    });
  });

  // Load students data entry page
  app.get("/cms/classrooms", authMiddleware.adminAuth(), function(req, res) {
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

    res.render("classrooms", {
      nav: true,
      navLogo: logoHref,
      use_mode: use_mode_obj
    });
  });

  // Create a new record in course table
  app.post("/cms/api/classrooms", function(req, res) {
    db.Classrooms.create(req.body).then(function(dbClassrooms) {
      res.json(dbClassrooms);
    });
  });

  // Load Roster data entry page (note: only dropdowns are populated)
  app.get("/cms/roster", authMiddleware.adminAuth(), function(req, res) {
    db.Students.findAll({
      attributes: ["id", "last_name", "first_name"],
      order: [["last_name", "ASC"], ["first_name", "ASC"]]
    }).then(function(dbStudents) {
      db.Personnel.findAll({
        attributes: ["id", "last_name", "first_name"],
        where: { position_descr: "Teacher" },
        order: [["last_name", "ASC"], ["first_name", "ASC"]]
      }).then(function(dbTeachers) {
        db.Personnel.findAll({
          attributes: ["id", "last_name", "first_name"],
          where: { position_descr: "TA" },
          order: [["last_name", "ASC"], ["first_name", "ASC"]]
        }).then(function(dbTAs) {
          db.Classrooms.findAll({
            attributes: ["id", "location_descr", "room_num"]
          }).then(function(dbClassrooms) {
            db.Course.findAll({
              attributes: ["id", "course_descr"],
              order: [["course_descr", "ASC"]]
            }).then(function(dbCourses) {
              //console.log(JSON.stringify(dbCourses));
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
              res.render("roster", {
                nav: true,
                courses: dbCourses,
                classrooms: dbClassrooms,
                tas: dbTAs,
                teachers: dbTeachers,
                student: dbStudents,
                navLogo: logoHref,
                use_mode: use_mode_obj
              });
            });
          });
        });
      });
    });
  });

  // Create the bulk records in the student_course_map
  app.post("/cms/api/studentcourse", function(req, res) {
    db.student_course_map
      .bulkCreate(req.body)
      .then(function(dbstudent_course_map) {
        res.json(dbstudent_course_map);
      });
  });

  // Create a new record in course table
  app.post("/cms/api/teachercourse", function(req, res) {
    db.teacher_course_map
      .bulkCreate(req.body)
      .then(function(dbteacher_course_map) {
        res.json(dbteacher_course_map);
      });
  });

  // Create a new record in course table
  app.get("/cms/manageusers", authMiddleware.adminAuth(), function(req, res) {
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

    res.render("manageusers", {
      nav: true,
      navLogo: logoHref,
      use_mode: use_mode_obj
    });
  });

  // Update a new record in users table
  app.post("/cms/api/users", authMiddleware.adminAuth(), function(req, res) {
    var user_id_split = req.body.user_select.split(/(\d+)/);
    var userId = parseInt(user_id_split[1]);
    //function to hash the users password
    var generateHash = function(password) {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    };

    //store the users hashed password
    var password = generateHash(req.body.password);

    // eslint-disable-next-line prettier/prettier
    db.user.findOne({where: {id: userId}}).then(function(dbUser) {
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
      
      dbUser.updateAttributes({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: password,
        use_mode: req.body.use_mode
      });
      res.render("manageusers", {
        nav: true,
        navLogo: logoHref,
        use_mode: use_mode_obj
      });
    });
  });
};
