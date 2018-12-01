module.exports = function(app) {
  // Load parents splash page
  app.get("/parents", function(req, res) {
    res.render("wip", {
      nav: false
    });
  });
};
