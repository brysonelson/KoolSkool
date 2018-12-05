var ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;

var exports = (module.exports = {});

exports.adminAuth = function() {
  return [
    ensureLoggedIn("/login"),
    function(req, res, next) {
      if (req.user && req.user.use_mode === "admin") {
        next();
      } else {
        res.send(401, "Unauthorized");
      }
    }
  ];
};

exports.teacherAuth = function() {
  return [
    ensureLoggedIn("/login"),
    function(req, res, next) {
      if (req.user && req.user.use_mode === "teacher") {
        next();
      } else {
        res.send(401, "Unauthorized");
      }
    }
  ];
};

exports.parentAuth = function() {
  return [
    ensureLoggedIn("/login"),
    function(req, res, next) {
      if (req.user && req.user.use_mode === "parent") {
        next();
      } else {
        // eslint-disable-next-line no-unused-vars
        var newLocal = res.send(401, "Unauthorized");
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
        res.send(401, "Unauthorized");
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
        res.send(401, "Unauthorized");
      }
    }
  ];
};
