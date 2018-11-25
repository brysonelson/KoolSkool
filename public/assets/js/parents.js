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
  var text_max_first_name = 35;
  $("#feedback_first_name").html(text_max_first_name + " characters remain");
  $("#first_name").bind("input change paste keyup mouseup", function() {
    var text_max_first_name = 35;
    var text_length_first_name = $("#first_name").val().length;
    var text_remaining_first_name = text_max_first_name - text_length_first_name;
    $("#feedback_first_name").html(
      text_remaining_first_name + " characters remain"
    );
    $(this).after(
      $("#feedback_first_name").html(
        text_remaining_first_name + " characters remain"
      )
    );
  });
  $("#first_name").keyup();

  var text_max_middle_name = 25;
  $("#feedback_middle_name").html(text_max_middle_name + " characters remain");
  $("#middle_name").bind("input change paste keyup mouseup", function() {
    var text_max_middle_name = 25;
    var text_length_middle_name = $("#middle_name").val().length;
    var text_remaining_middle_name = text_max_middle_name - text_length_middle_name;
    $("#feedback_middle_name").html(
      text_remaining_middle_name + " characters remain"
    );
    $(this).after(
      $("#feedback_middle_name").html(
        text_remaining_middle_name + " characters remain"
      )
    );
  });
  $("#middle_name").keyup();

  var text_max_last_name = 60;
  $("#feedback_last_name").html(text_max_last_name + " characters remain");
  $("#last_name").bind("input change paste keyup mouseup", function() {
    var text_max_last_name = 60;
    var text_length_last_name = $("#last_name").val().length;
    var text_remaining_last_name = text_max_last_name - text_length_last_name;
    $("#feedback_last_name").html(
      text_remaining_last_name + " characters remain"
    );
    $(this).after(
      $("#feedback_last_name").html(
        text_remaining_last_name + " characters remain"
      )
    );
  });
  $("#last_name").keyup();

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

  // Get references to page elements
  var $first_name = $("#first_name");
  var $middle_name = $("#middle_name");
  var $last_name = $("#last_name");
  var $submit_parent = $("#submit_parent");

  // The API object contains methods for each kind of request we'll make
  var API = {
    saveParent: function(parent) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "/api/parents",
        data: JSON.stringify(parent)
      });
    }
  };

  // handleFormSubmit is called whenever we submit a new record
  // Save the new example to the db and refresh the list
  var handleFormSubmit = function(event) {
    event.preventDefault();

    var parents = {
      first_name: $first_name.val().trim(),
      middle_name: $middle_name.val().trim(),
      last_name: $last_name.val().trim()
    };

    console.log(parent);

    if (!(parents.first_name && parent.last_name)) {
      alert("You must enter a first and last name!");
      return;
    }

    API.saveParent(parent).then(function() {
      console.log("Testing!");
      refreshParents();
    });

    $first_name.val("");
    $last_name.val("");
  };

  // Add event listeners to the submit and delete buttons
  $submit_parent.on("click", handleFormSubmit);
});
