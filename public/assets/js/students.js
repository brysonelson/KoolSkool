/******************************************************************************
 *
 * Summary:
 *  This file contains the primary front-end java script functions and logic
 *  for creating and managing student records
 *
 *****************************************************************************/

$(function() {
  /******************************************************************************
   *Upon page load Initialize bootstrap 4 tooltips
   *
   *****************************************************************************/
  $("[data-toggle='tooltip']").tooltip();

  // Get references to page elements
  var $first_name = $("#first_name");
  var $middle_name = $("#middle_name");
  var $last_name = $("#last_name");
  var $name_suffix = $("#name_suffix");
  var $nickname = $("#nickname");
  var $birthdate = $("#birthdate");
  var $gender = $("#gender");
  var $photo = $("#photo");
  var $submit_student = $("#submit_student");

  // The API object contains methods for each kind of request we'll make
  var API = {
    saveStudent: function(student) {
      console.log(student);
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/students",
        data: JSON.stringify(student)
      });
    },
    getStudent: function() {
      return $.ajax({
        url: "api/students",
        type: "GET"
      });
    },
    deleteStudent: function(id) {
      return $.ajax({
        url: "api/students/" + id,
        type: "DELETE"
      });
    }
  };

  // handleFormSubmit is called whenever we submit a new record
  // Save the new example to the db and refresh the list
  var handleFormSubmit = function(event) {
    event.preventDefault();

    $gender = $("input[name='gender']:checked").val();

    if ( !$('#name_suffix').val() ) {
      $name_suffix = "";
    } else {
      $name_suffix = $name_suffix.val();
    }

    var student = {
      first_name: $first_name.val().trim(),
      middle_name: $middle_name.val().trim(),
      last_name: $last_name.val().trim(),
      name_suffix: $name_suffix,
      nickname: $nickname.val().trim(),
      birthdate: $birthdate.val().trim(),
      gender: $gender,
      photo: $photo.val().trim()
    };
    if (!(student.first_name && student.last_name)) {
      alert("You must enter a first and last name!");
      return;
    }

    API.saveStudent(student).then(function() {
      console.log("Something is happening!");
      //refreshStudent();
    });

    //$first_name.val("");
    //$last_name.val("");
  };

  // Add event listeners to the submit and delete buttons
  $submit_student.on("click", handleFormSubmit);
});
