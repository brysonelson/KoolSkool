/******************************************************************************
 *
 * Summary:
 *  This file contains the primary front-end java script functions and logic
 *  for creating and managing parent records
 *
 *****************************************************************************/

$(function() {
  /******************************************************************************
   *Upon page load Initialize bootstrap 4 tooltips
   *
   *****************************************************************************/
  $("[data-toggle='tooltip']").tooltip();

  /******************************************************************************
   * Feedback Functions Specific To Contact Add and Edit Form
   * This function calculates and shows the number of characters remaining for 
   * every input
   *****************************************************************************/
  var text_max_firstname = 35;
  $("#feedback_firstname").html(text_max_firstname + " characters remain");
  $("#firstname").bind("input change paste keyup mouseup", function() {
    var text_max_firstname = 35;
    var text_length_firstname = $("#firstname").val().length;
    var text_remaining_firstname = text_max_firstname - text_length_firstname;
    $("#feedback_firstname").html(
      text_remaining_firstname + " characters remain"
    );
    $(this).after(
      $("#feedback_firstname").html(
        text_remaining_firstname + " characters remain"
      )
    );
  });
  $("#firstname").keyup();

  var text_max_middleint = 25;
  $("#feedback_middleint").html(text_max_middleint + " characters remain");
  $("#middleint").bind("input change paste keyup mouseup", function() {
    var text_max_middleint = 25;
    var text_length_middleint = $("#middleint").val().length;
    var text_remaining_middleint = text_max_middleint - text_length_middleint;
    $("#feedback_middleint").html(
      text_remaining_middleint + " characters remain"
    );
    $(this).after(
      $("#feedback_middleint").html(
        text_remaining_middleint + " characters remain"
      )
    );
  });
  $("#middleint").keyup();

  var text_max_lastname = 60;
  $("#feedback_lastname").html(text_max_lastname + " characters remain");
  $("#lastname").bind("input change paste keyup mouseup", function() {
    var text_max_lastname = 60;
    var text_length_lastname = $("#lastname").val().length;
    var text_remaining_lastname = text_max_lastname - text_length_lastname;
    $("#feedback_lastname").html(
      text_remaining_lastname + " characters remain"
    );
    $(this).after(
      $("#feedback_lastname").html(
        text_remaining_lastname + " characters remain"
      )
    );
  });
  $("#lastname").keyup();

  var text_max_address1 = 100;
  $("#feedback_address1").html(text_max_address1 + " characters remain");
  $("#address1").bind("input change paste keyup mouseup", function() {
    var text_max_address1 = 100;
    var text_length_address1 = $("#address1").val().length;
    var text_remaining_address1 = text_max_address1 - text_length_address1;
    $("#feedback_address1").html(
      text_remaining_address1 + " characters remain"
    );
    $(this).after(
      $("#feedback_address1").html(
        text_remaining_address1 + " characters remain"
      )
    );
  });
  $("#address1").keyup();

  var text_max_address2 = 60;
  $("#feedback_address2").html(text_max_address2 + " characters remain");
  $("#address2").bind("input change paste keyup mouseup", function() {
    var text_max_address2 = 60;
    var text_length_address2 = $("#address2").val().length;
    var text_remaining_address2 = text_max_address2 - text_length_address2;
    $("#feedback_address2").html(
      text_remaining_address2 + " characters remain"
    );
    $(this).after(
      $("#feedback_address2").html(
        text_remaining_address2 + " characters remain"
      )
    );
  });
  $("#address2").keyup();

  var text_max_city = 50;
  $("#feedback_city").html(text_max_city + " characters remain");
  $("#city").bind("input change paste keyup mouseup", function() {
    var text_max_city = 50;
    var text_length_city = $('#city').val().length;
    var text_remaining_city = text_max_city - text_length_city;
    $("#feedback_city").html(text_remaining_city + " characters remain");
    $(this).after(
      $("#feedback_city").html(text_remaining_city + " characters remain")
    );
  });
  $("#city").keyup();

  var text_max_zip = 10;
  $("#feedback_zip").html(text_max_zip + " characters remain");
  $("#zip").bind("input change paste keyup mouseup", function() {
    var text_max_zip = 10;
    var text_length_zip = $("#zip").val().length;
    var text_remaining_zip = text_max_zip - text_length_zip;
    $("#feedback_zip").html(text_remaining_zip + " characters remain");
    $(this).after(
      $("#feedback_zip").html(text_remaining_zip + " characters remain")
    );
  });
  $("#zip").keyup();

  var text_max_phone = 14;
  $("#feedback_phone").html(text_max_phone + " characters remain");
  $("#phone").bind("input change paste keyup mouseup", function() {
    var text_max_phone = 14;
    var text_length_phone = $("#phone").val().length;
    var text_remaining_phone = text_max_phone - text_length_phone;
    $("#feedback_phone").html(text_remaining_phone + " characters remain");
    $(this).after(
      $("#feedback_phone").html(text_remaining_phone + " characters remain")
    );
  });
  $("#phone").keyup();

  var text_max_otherphone = 14;
  $("#feedback_otherphone").html(text_max_otherphone + " characters remain");
  $("#otherphone").bind("input change paste keyup mouseup", function() {
    var text_max_otherphone = 14;
    var text_length_otherphone = $("#otherphone").val().length;
    var text_remaining_otherphone = text_max_otherphone - text_length_otherphone;
    $("#feedback_otherphone").html(
      text_remaining_otherphone + " characters remain"
    );
    $(this).after(
      $("#feedback_otherphone").html(
        text_remaining_otherphone + " characters remain"
      )
    );
  });
  $("#otherphone").keyup();

  var text_max_email1 = 50;
  $("#feedback_email1").html(text_max_email1 + " characters remain");
  $("#email1").bind("input change paste keyup mouseup", function() {
    var text_max_email1 = 50;
    var text_length_email1 = $("#email1").val().length;
    var text_remaining_email1 = text_max_email1 - text_length_email1;
    $("#feedback_email1").html(text_remaining_email1 + " characters remain");
    $(this).after(
      $("#feedback_email1").html(text_remaining_email1 + " characters remain")
    );
  });
  $("#email1").keyup();

  var text_max_remarks = 4000;
  $("#feedback_remarks").html(text_max_remarks + " characters remain");
  $("#remarks").bind("input change paste keyup mouseup", function() {
    var text_max_remarks = 4000;
    var text_length_remarks = $("#remarks").val().length;
    var text_remaining_remarks = text_max_remarks - text_length_remarks;
    $("#feedback_remarks").html(text_remaining_remarks + " characters remain");
    $(this).after(
      $("#feedback_remarks").html(text_remaining_remarks + " characters remain")
    );
  });
  $("#remarks").keyup();

});
