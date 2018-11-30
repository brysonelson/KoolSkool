$(document).ready(function() {
  //store input from html
  var userFn = $("#first-name");
  var userLn = $("#last-name");
  var userEmail = $("#email");
  var userPass = $("#input-password");
  var userAuth = $("#authorization");

  $("#submit-btn").click(function() {
    event.preventDefault();
    console.log(userEmail.val());
    console.log(userPass.val());

    loginUser();
  });

  function loginUser(event) {
    // event.preventDefault();

    var newUser = {
      first_name: userFn.val().trim(),
      last_name: userLn.val().trim(),
      email: userEmail.val().trim(),
      password: userPass.val().trim(),
      useMode: userAuth.val().trim()
    };

    $.post("/signup", newUser, function() {
      console.log("success");
      // window.localStorage.setItem("token", token);
      // console.log(token);
    });
  }
});
