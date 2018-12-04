var db = require("../models");
// eslint-disable-next-line no-unused-vars
var authMiddleware = require("../middleware/authMiddleware.js");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Get all parents
  app.get("/api/parents", function(req, res) {
    db.Parents.findAll({}).then(function(dbParents) {
      res.json(dbParents);
    });
  });

  // Get all students
  app.get("/api/students", function(req, res) {
    db.Students.findAll({}).then(function(dbStudents) {
      res.json(dbStudents);
    });
  });

  // Get parent_child_map
  app.get("/api/parent_child_map", function(req, res) {
    db.parent_child_map.findAll({}).then(function(dbparent_child_map) {
      res.json(dbparent_child_map);
    });
  });

  // get students and the list of their parents, include the relationship from the parent_child_map
  app.get("/api/students_parents", function(req, res) {
    db.Students.findAll({
      include: [
        {
          model: db.Parents,
          as: "parents",
          through: "parent_child_map",
          foreignKey: "student_id"
        }
      ]
    }).then(function(result) {
      res.json(result);
    });
  });

  // get parents and the list of their children, include the relationship from the parent_child_map
  app.get("/api/parents_children", function(req, res) {
    db.Parents.findAll({
      include: [
        {
          model: db.Students,
          as: "children",
          through: "parent_child_map",
          foreignKey: "parent_id"
        }
      ]
    }).then(function(result) {
      res.json(result);
    });
  });

  // Get all personnel
  app.get("/api/personnel", function(req, res) {
    db.Personnel.findAll({}).then(function(dbPersonnel) {
      res.json(dbPersonnel);
    });
  });

  // Get all courses
  app.get("/api/course", function(req, res) {
    db.Course.findAll({}).then(function(dbCourse) {
      res.json(dbCourse);
    });
  });

  // Get all classrooms
  app.get("/api/classrooms", function(req, res) {
    db.Classrooms.findAll({}).then(function(dbClassrooms) {
      res.json(dbClassrooms);
    });
  });

  // Get all schedules
  app.get("/api/schedules", function(req, res) {
    db.Schedule.findAll({}).then(function(dbSchedule) {
      res.json(dbSchedule);
    });
  });

  // Get all schedules, the Course details and the assigned Classrooms
  app.get("/api/course_schedules", function(req, res) {
    db.Schedule.findAll({
      include: [db.Course, db.Classrooms]
    }).then(function(dbCourse_Schedules) {
      res.json(dbCourse_Schedules);
    });
  });

  // Get teacher_course_map
  app.get("/api/teacher_course_map", function(req, res) {
    db.teacher_course_map.findAll({}).then(function(dbteacher_course_map) {
      res.json(dbteacher_course_map);
    });
  });

  // get teachers and courses they teach
  app.get("/api/teacher_courses", function(req, res) {
    db.Personnel.findAll({
      include: [
        {
          model: db.Course,
          as: "course_taught",
          through: "teacher_course_map",
          foreignKey: "course_id"
        }
      ]
    }).then(function(result) {
      res.json(result);
    });
  });

  // get courses and personnel that teach the courses
  app.get("/api/courses_teachers", function(req, res) {
    db.Course.findAll({
      include: [
        {
          model: db.Personnel,
          as: "teachers",
          through: "teacher_course_map",
          foreignKey: "personnel_id"
        }
      ]
    }).then(function(result) {
      res.json(result);
    });
  });

  // Get student_course_map
  app.get("/api/student_course_map", function(req, res) {
    db.student_course_map.findAll({}).then(function(dbstudent_course_map) {
      res.json(dbstudent_course_map);
    });
  });

  // get students and courses they enrolled in
  app.get("/api/student_courses", function(req, res) {
    db.Students.findAll({
      include: [
        {
          model: db.Course,
          as: "course_enrolled",
          through: "student_course_map",
          foreignKey: "course_id"
        }
      ]
    }).then(function(result) {
      res.json(result);
    });
  });

  // get courses and students enrolled in courses
  app.get("/api/course_students", function(req, res) {
    db.Course.findAll({
      include: [
        {
          model: db.Students,
          as: "course_students",
          through: "student_course_map",
          foreignKey: "student_id"
        }
      ]
    }).then(function(result) {
      res.json(result);
    });
  });

  // Get attendence
  app.get("/api/attendence", function(req, res) {
    db.Attendence.findAll({}).then(function(dbAttendence) {
      res.json(dbAttendence);
    });
  });

  // Get all attendence and the student records
  app.get("/api/attendence_students", function(req, res) {
    db.Attendence.findAll({
      include: [db.Students, db.Course]
    }).then(function(dbAttendence_Student) {
      res.json(dbAttendence_Student);
    });
  });

  // Get all students and the classes they attended
  app.get("/api/student_attendence", function(req, res) {
    db.Students.findAll({
      include: [
        {
          model: db.Attendence,
          as: "student_attendence",
          include: [
            {
              model: db.Course
            }
          ]
        }
      ]
    }).then(function(result) {
      res.json(result);
    });
  });

  // Get users
  app.get("/api/users", function(req, res) {
    db.user.findAll({}).then(function(dbUser) {
      res.json(dbUser);
    });
  });
};
