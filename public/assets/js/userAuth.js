//once the document is loaded
$(document).ready(function() {
  //when you click the logout button
  $("#user-logout").click(function() {
    //get the logout page
    $.get("/logout", function() {
      //let the user know if there are errors
      if (err) {
        throw err;
      }
    });
  });

  //when the login form is submitted
  $("#login_form").on("submit", function(event) {
    //prevent the default
    event.preventDefault();
    //post the request to the login route
    $.post("/login", {
      email: $("#email").val(),
      password: $("#password").val()
    }).then(function(data) {
      //then load the relevant page the user should be sent to
      window.location.replace(data.url);
    });
  });

  //when the signup auth drop down changes on the sign up page
  $("#signup-auth").change(function() {
      //store the users auth mode
    // eslint-disable-next-line no-unused-vars
    var authMode = $("#signup-auth").val();
    // eslint-disable-next-line no-unused-vars
    $.get("/api/personnel", function(req, res) {
      if (err) {
        throw err;
      }
    }).then(function(personnel) {

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

$("#myModal").on("shown.bs.modal", function() {
  $("#myInput").trigger("focus");
});

$("#reset-email-btn").click(function() {
  var email = $("#forgot-email").val();

  $.post("/forgot", { email: email }).then(function() {
    console.log("Logged in");
    alert("sent!");
  });
});
