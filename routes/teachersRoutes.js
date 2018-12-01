module.exports = function(app) {
  // Load parents splash page
  app.get("/teachers", function(req, res) {
    res.render("wip", {
      nav: false
    });
  });
};
