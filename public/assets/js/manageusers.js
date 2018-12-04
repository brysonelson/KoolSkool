$(document).ready(function() {
  // eslint-disable-next-line no-unused-vars
  $.get("/api/users", function(req, res) {
    console.log(req.body);
  }).then(function(users) {
    for (var i = 0; i < users.length; i++) {
      console.log(users[i].first_name);
      console.log(users[i]);

      var userSelector = $("#user_select");

      // var option = $("<li><a role='option' class='dropdown-item' aria-disabled='false' tabindex='0' aria-selected='false'><span class='text>" + personnel[i].first_name + "</span></a></li>")
      // .appendTo(personnelSelector);
      var option = $("<option>");
      option.attr("value", users[i].id);
      option.text(
        "ID: " +
          users[i].id +
          " - " +
          users[i].first_name +
          " " +
          users[i].last_name
      );
      option.appendTo(userSelector);
      $(".selectpicker").selectpicker("refresh");
    }
  });
});
