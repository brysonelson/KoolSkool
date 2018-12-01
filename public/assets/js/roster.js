/******************************************************************************
 *
 * Summary:
 *  This file contains the primary front-end java script functions and logic
 *  for creating and managing roster assignments.
 *  This input screen affects Teacher_Course_Map and Student_Course_Map
 *  It is potentially extendable to the Schedules Table in the future.
 *****************************************************************************/

$(function() {
  // Get references to page elements
  var $course_select = $("#course_select");
  var $classroom_select = $("#classroom_select");
  var $teacher_select = $("#teacher_select");
  var $ta_ids = $("#ta_select");
  var $ta_id = "";
  var $student_ids = $("#student_select");
  var $student_id = "";
  var $form_roster_add = $("#form_parent_add");

  // The API object contains methods for each kind of request we'll make
  var API = {
    saveStudentCourseMap: function(student_course_map) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/studentcourse",
        data: JSON.stringify(student_course_map)
      });
    },
    saveTeacherCourseMap: function(teacher_course_map) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/teachercourse",
        data: JSON.stringify(teacher_course_map)
      });
    }
  };

  // handleFormSubmit for the data that gets written to the Map
  var handleFormSubmit = function() {
    //get values from selects and if not answered convert to empty string
    if (!$("#course_select").val()) {
      $course_id = "";
    } else {
      $course_id = $course_select.val();
    }

    if (!$("#classroom_select").val()) {
      $classroom_id = "";
    } else {
      $classroom_id = $classroom_select.val();
    }

    if (!$("#teacher_select").val()) {
      $teacher_id = "";
    } else {
      $teacher_id = $teacher_select.val();
    }

    if (!$("#ta_select").val()) {
      $ta_ids = "";
    } else {
      $ta_ids = $ta_ids.val();
    }

    if (!$("#student_select").val()) {
      $student_ids = "";
    } else {
      $student_ids = $student_ids.val();
    }

    //construct the Student Course Map
    var student_course_map = [];

    for (var i = 0; i < $student_ids.length; i++) {
      $student_id = $student_ids[i];
      student_course_map[i] = {
        status: "active",
        student_id: $student_id,
        course_id: $course_id
      };
    }

    //construct the TA Course Map
    var ta_course_map = [];

    for (var i = 0; i < $ta_ids.length; i++) {
      $ta_id = $ta_ids[i];
      ta_course_map[i] = {
        teacher_type_descr: "TA",
        status: "active",
        personnel_id: $ta_id,
        course_id: $course_id
      };
    }

    //construct the Teacher Course Map
    var teacher_course_map = [
      {
        teacher_type_descr: "Teacher",
        status: "active",
        personnel_id: $teacher_id,
        course_id: $course_id
      }
    ];

    //call api route to save the data.  There are 3 api routes for this page
    // eslint-disable-next-line no-unused-vars
    API.saveStudentCourseMap(student_course_map).then(function(res1) {
      // eslint-disable-next-line no-unused-vars
      API.saveTeacherCourseMap(teacher_course_map).then(function(res2) {
        // eslint-disable-next-line no-unused-vars
        API.saveTeacherCourseMap(ta_course_map).then(function(res3) {
          //Hide the entry grid
          $("#form_roster_add").addClass("d-none");
          //reveal div to display success
          $("#success_card").removeClass("d-none");

          //Do Dom Stuff Here like parse the response or maybe refresh
          //refreshRoster();
        });
      });
    });
  };

  //event listeners to button
  $("#submit_roster").click(function() {
    handleFormSubmit();
  });

  //event listeners to form and submit button(s)
  //Why Isn't This Working??
  $form_roster_add.on("submit", function(event) {
    event.preventDefault();
    handleFormSubmit();
  });
});
