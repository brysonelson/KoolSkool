var db = require("../models");

module.exports = function(app) {
  // Render parents page for any unmatched routes
  app.get("/parents", function(req, res) {
    res.render("wip");
  });

  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function() {
      res.render("login");
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
