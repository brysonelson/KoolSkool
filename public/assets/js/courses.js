/******************************************************************************
 *
 * Summary:
 *  This file contains the primary front-end java script functions and logic
 *  for creating and managing course records
 *
 *****************************************************************************/

$(function() {
  // Get references to page elements
  var $course_descr = $("#course_descr");
  var $form_course_add = $("#form_course_add");
  //var $submit_course = $("#submit_course");

  // The API object contains methods for each kind of request we'll make
  var API = {
    saveCourse: function(course) {
      console.log(course);
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/courses",
        data: JSON.stringify(course)
      });
    },
    getCourse: function() {
      return $.ajax({
        url: "api/courses",
        type: "GET"
      });
    },
    deleteCourse: function(id) {
      return $.ajax({
        url: "api/courses/" + id,
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
    var course = {
      course_descr: $course_descr.val().trim()
    };

    //replace any empty strings with null values to work around sequelize validations on empty strings
    emptyStringsToNull(course);

    //confirm required fields have values
    if (!course.course_descr) {
      alert("You must enter a course description!");
      return;
    }

    //call api route to save the data
    API.saveCourse(course).then(function() {
      console.log("Something is happening!");
      //refreshCourse();
    });
  };

  //event listeners to form and submit button(s)
  $form_course_add.on("submit", function(event) {
    console.log("I've been clicked");
    event.preventDefault();
    handleFormSubmit();
  });
});
