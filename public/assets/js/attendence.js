/******************************************************************************
 *
 * Summary:
 *  This file contains the primary front-end java script functions and logic
 *  for pushing student attendence data into the attendence table
 *
 *****************************************************************************/
$(function() {
  var $attendence_dt = moment().format("YYYY-MM-DD");
  var $person_id = "";
  $person_id = 7;
  var $student_id = "";
  var $course_id = "";

  var API = {
    saveAttendence: function(attendence) {
      console.log("******************************************");
      console.log(attendence);
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/attendence",
        data: JSON.stringify(attendence)
      }); //end ajax return
    } //end save att
  }; //end var API

  // all present
  $(".all-present").click(function() {
    $course_id = $(this).attr("data-courseid");
    if ($(this).is(":checked")) {
      //check all boxes
      $("input[type='checkbox']").attr("checked", "checked");
    } else {
      //uncheck all boxes
      $("input[type='checkbox']").removeAttr("checked");
    }
  });

  // on click event
  $(".submit").click(function() {
    $course_id = $(this).attr("data-courseid");
    var i = 0;
    var att = [];
    //loop through the students to get checks and IDs
    $(".absentcheck-" + $course_id).each(function() {
      $student_id = $(this).attr("data-student_id");
      console.log($student_id);
      if ($(this).is(":checked")) {
        $absent = false;
      } else {
        $absent = true;
      }
      console.log($absent);

      att[i] = {
        // field names   :   values
        attendence_dt: $attendence_dt,
        absent: $absent,
        person_id: $person_id,
        student_id: $student_id,
        course_id: $course_id
      };
      i++;
    }); //end absent check
    i = 0;
    // console log of array
    API.saveAttendence(att).then(function() {
      console.log("att saved");
      $("#submit-" + $course_id).text("Saved!");
      alert("Hello!");
      alert("Attendence for course #" + $course_id + " has been submitted!");
    });
  }); //end submit
});
