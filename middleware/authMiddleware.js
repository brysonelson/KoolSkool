var ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;

var exports = (module.exports = {});

exports.adminAuth = function() {
  return [
    ensureLoggedIn("/login"),
    function(req, res, next) {
      if (
        req.user.use_mode === "admin" ||
        req.user.use_mode === "super_admin"
      ) {
        next();
      } else {
        res.render("login");
      }
    }
  ];
};

exports.teacherAuth = function() {
  return [
    ensureLoggedIn("/login"),
    function(req, res, next) {
      if (
        req.user.use_mode === "teacher" ||
        req.user.use_mode === "admin" ||
        req.user.use_mode === "super_admin"
      ) {
        next();
      } else {
        res.render("login");
      }
    }
  ];
};

exports.parentAuth = function() {
  return [
    ensureLoggedIn("/login"),
    function(req, res, next) {
      if (
        req.user.use_mode === "parent" ||
        req.user.use_mode === "teacher" ||
        req.user.use_mode === "super_admin" ||
        req.user.use_mode === "teacher"
      ) {
        next();
      } else {
        // eslint-disable-next-line no-unused-vars
        res.render("login");
      }
    }
  ];
};

exports.studentAuth = function() {
  return [
    ensureLoggedIn("/login"),
    function(req, res, next) {
      if (req.user && req.user.use_mode === "student") {
        next();
      } else {
        res.render("login");
      }
    }
  ];
};

exports.emergencyAuth = function() {
  return [
    ensureLoggedIn("/login"),
    function(req, res, next) {
      if (req.user && req.user.use_mode === "super_admin") {
        next();
      } else {
        res.render("login");
      }
    }
  ];
};
