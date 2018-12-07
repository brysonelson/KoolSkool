module.exports = function(app) {
  // Load parents splash page
  app.get("/studentinfo", function(req, res) {
    res.render("parent", {
      nav: true
    });
  });
};
