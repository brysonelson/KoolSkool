/******************************************************************************
 *
 * Summary:
 *  This file contains the primary front-end java script functions and logic
 *  for creating and managing classroom records
 *
 *****************************************************************************/

$(function() {
  // Get references to page elements
  var $location_descr = $("#location_descr");
  var $room_num = $("#room_num");
  var $form_classroom_add = $("#form_classroom_add");
  //var $submit_classroom = $("#submit_classroom");

  // The API object contains methods for each kind of request we'll make
  var API = {
    saveClassroom: function(classroom) {
      console.log(classroom);
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/classrooms",
        data: JSON.stringify(classroom)
      });
    },
    getClassroom: function() {
      return $.ajax({
        url: "api/classrooms",
        type: "GET"
      });
    },
    deleteClassroom: function(id) {
      return $.ajax({
        url: "api/classrooms/" + id,
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
    //Construct the object of values to save
    var classroom = {
      location_descr: $location_descr.val().trim(),
      room_num: $room_num.val().trim()
    };

    //replace any empty strings with null values to work around sequelize validations on empty strings
    emptyStringsToNull(classroom);

    //confirm required fields have values
    if (!classroom.location_descr) {
      alert("You must enter a classroom description!");
      return;
    }

    //call api route to save the data
    API.saveClassroom(classroom).then(function() {
      console.log("Something is happening!");
      //refreshClassroom();
    });
  };

  //event listeners to form and submit button(s)
  $form_classroom_add.on("submit", function(event) {
    event.preventDefault();
    handleFormSubmit();
  });
});
