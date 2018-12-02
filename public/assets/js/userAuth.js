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
    }).then(function(personnel) {
      console.log("personnel " + personnel);

      for (var i = 0; i < personnel.length; i++) {
        console.log(personnel[i].first_name);
        console.log(personnel[i]);

        var personnelSelector = $("#personnel_select");

        // var option = $("<li><a role='option' class='dropdown-item' aria-disabled='false' tabindex='0' aria-selected='false'><span class='text>" + personnel[i].first_name + "</span></a></li>")
        // .appendTo(personnelSelector);
        var option = $("<option>");
        option.attr("value", personnel[i].id);
        option.text(
          "ID: " +
            personnel[i].id +
            " - " +
            personnel[i].first_name +
            " " +
            personnel[i].last_name
        );
        option.appendTo(personnelSelector);
        $(".selectpicker").selectpicker("refresh");
      }
    });
  });
});
