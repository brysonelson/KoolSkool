$(Document).ready(function() {
  $("#user-logout").click(function() {
    $.get("/logout", function() {
      console.log("logged out!");
    });
  });
});
