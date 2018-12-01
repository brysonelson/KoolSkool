$(document).ready(function() {
  $("#user-logout").click(function() {
    $.get("/logout", function() {
      console.log("logged out!");
    });
  });

  $(".form-login").on("submit", function(event) {
    event.preventDefault();
    $.post("/login", {
      email: $("#email").val(),
      password: $("#password").val()
    }).then(function(data) {
      window.location.replace(data.url);
    });
  });

  $("#signup-auth").change(function() {
    var authMode = $("#signup-auth").val();
    console.log("test");
    $.get("/api/personnel", function(req, res) {
      console.log("===============REQ: " + req);
      console.log("===============RES: " + res);
    });
  });
});
