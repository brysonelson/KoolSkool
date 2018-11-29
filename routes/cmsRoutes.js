var db = require("../models");

module.exports = function(app) {
  // Load cms splash page
  app.get("/cms", function(req, res) {
    res.render("cms", {
      msg: "Welcome Professor Plum!",
      nav: true
    });
  });

  // Load parents data entry page (note: only dropdowns are populated)
  app.get("/cms/parents", function(req, res) {
    db.Students.findAll({
      attributes: { include: ["last_name", "first_name"] },
      order: [["last_name", "ASC"], ["first_name", "ASC"]]
    }).then(function(dbStudents) {
      res.render("parents", {
        nav: true,
        students: dbStudents
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
  app.get("/cms/api/parentchild/:id", function(req, res) {
    db.parent_child_map
      .findAll({ where: { parent_id: req.params.id } })
      .then(function(dbparent_child_map) {
        console.log(dbparent_child_map);
      });
  });

  // Load personnel data entry page
  app.get("/cms/personnel", function(req, res) {
    res.render("personnel", {
      nav: true
    });
  });

  // Create a new person in personnel table
  app.post("/cms/api/personnel", function(req, res) {
    db.Personnel.create(req.body).then(function(dbPersonnel) {
      res.json(dbPersonnel);
      console.log(res);
    });
  });

  // Load students data entry page
  app.get("/cms/students", function(req, res) {
    res.render("students", {
      nav: true
    });
  });

  // Create a new person in students table
  app.post("/cms/api/students", function(req, res) {
    db.Students.create(req.body).then(function(dbStudents) {
      res.json(dbStudents);
    });
  });

  // Load students data entry page
  app.get("/cms/courses", function(req, res) {
    res.render("courses", {
      nav: true
    });
  });

  // Create a new record in course table
  app.post("/cms/api/courses", function(req, res) {
    db.Course.create(req.body).then(function(dbCourse) {
      res.json(dbCourse);
    });
  });

  // Load students data entry page
  app.get("/cms/classrooms", function(req, res) {
    res.render("classrooms", {
      nav: true
    });
  });

  // Create a new record in course table
  app.post("/cms/api/classrooms", function(req, res) {
    db.Classrooms.create(req.body).then(function(dbClassrooms) {
      res.json(dbClassrooms);
    });
  });
};
