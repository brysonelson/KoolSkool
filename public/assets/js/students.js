/******************************************************************************
 *
 * Summary:
 *  This file contains the primary front-end java script functions and logic
 *  for creating and managing student records
 *
 *****************************************************************************/

$(function() {
  // Get references to page elements
  var $first_name = $("#first_name");
  var $middle_name = $("#middle_name");
  var $last_name = $("#last_name");
  var $name_suffix = $("#name_suffix");
  var $nickname = $("#nickname");
  var $birthdate = $("#birthdate");
  var $gender = $("#gender");
  var $photo = $("#photo");
  var $form_student_add = $("#form_student_add");
  //var $submit_student = $("#submit_student");

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

  //This function is used to convert values from empty strings to null
  function emptyStringsToNull(object) {
    for (var key in object) {
      if (object[key] === "") {
        object[key] = null;
      }
    }
    return object;
  }

  // handleFormSubmit is called whenever we submit a new record
  var handleFormSubmit = function() {
    //get values from radio buttons
    $gender = $("input[name='gender']:checked").val();

    //get values from selects and if not answered convert to empty string
    if (!$("#name_suffix").val()) {
      $name_suffix = "";
    } else {
      $name_suffix = $name_suffix.val();
    }

    //Construct the object of values to save
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

    //replace any empty strings with null values to work around sequelize validations on empty strings
    emptyStringsToNull(student);

    //confirm required fields have values
    if (!(student.first_name && student.last_name)) {
      alert("You must enter a first and last name!");
      return;
    }

    //call api route to save the data
    API.saveStudent(student).then(function() {
      console.log("Something is happening!");
      //refreshStudent();
    });
  };

  //event listeners to form and submit button(s)
  $form_student_add.on("submit", function(event) {
    event.preventDefault();
    handleFormSubmit();
  });
});
