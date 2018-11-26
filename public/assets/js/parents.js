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

  var text_max_zip_code = 10;
  $("#feedback_zip_code").html(text_max_zip_code + " characters remain");
  $("#zip_code").bind("input change paste keyup mouseup", function() {
    var text_max_zip_code = 10;
    var text_length_zip_code = $("#zip_code").val().length;
    var text_remaining_zip_code = text_max_zip_code - text_length_zip_code;
    $("#feedback_zip_code").html(
      text_remaining_zip_code + " characters remain"
    );
    $(this).after(
      $("#feedback_zip_code").html(
        text_remaining_zip_code + " characters remain"
      )
    );
  });
  $("#zip_code").keyup();

  var text_max_phone_num_primary = 14;
  $("#feedback_phone_num_primary").html(
    text_max_phone_num_primary + " characters remain"
  );
  $("#phone_num_primary").bind("input change paste keyup mouseup", function() {
    var text_max_phone_num_primary = 14;
    var text_length_phone_num_primary = $("#phone_num_primary").val().length;
    var text_remaining_phone_num_primary = text_max_phone_num_primary - text_length_phone_num_primary;
    $("#feedback_phone_num_primary").html(
      text_remaining_phone_num_primary + " characters remain"
    );
    $(this).after(
      $("#feedback_phone").html(
        text_remaining_phone_num_primary + " characters remain"
      )
    );
  });
  $("#phone_num_primary").keyup();

  var text_max_phone_num_alt = 14;
  $("#feedback_phone_num_alt").html(
    text_max_phone_num_alt + " characters remain"
  );
  $("#phone_num_alt").bind("input change paste keyup mouseup", function() {
    var text_max_phone_num_alt = 14;
    var text_length_phone_num_alt = $("#phone_num_alt").val().length;
    var text_remaining_phone_num_alt = text_max_phone_num_alt - text_length_phone_num_alt;
    $("#feedback_phone_num_alt").html(
      text_remaining_phone_num_alt + " characters remain"
    );
    $(this).after(
      $("#feedback_phone_num_alt").html(
        text_remaining_phone_num_alt + " characters remain"
      )
    );
  });
  $("#phone_num_alt").keyup();

  var text_max_email_address = 50;
  $("#feedback_email_address").html(
    text_max_email_address + " characters remain"
  );
  $("#email_address").bind("input change paste keyup mouseup", function() {
    var text_max_email_address = 50;
    var text_length_email_address = $("#email_address").val().length;
    var text_remaining_email_address = text_max_email_address - text_length_email_address;
    $("#feedback_email_address").html(
      text_remaining_email_address + " characters remain"
    );
    $(this).after(
      $("#feedback_email_address").html(
        text_remaining_email_address + " characters remain"
      )
    );
  });
  $("#email_address").keyup();

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
  var $name_suffix = $("#name_suffix");
  var $address1 = $("#address1");
  var $address2 = $("#address2");
  var $city = $("#city");
  var $postal_code = $("#postal_code");
  var $zip_code = $("#zip_code");
  var $phone_num_primary = $("#phone_num_primary");
  var $phone_num_alt = $("#phone_num_alt");
  var $email_address = $("#email_address");
  var $remarks = $("#remarks");
  var $submit_parent = $("#submit_parent");

  // The API object contains methods for each kind of request we'll make
  var API = {
    saveParent: function(parent) {
      console.log(parent);
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/parents",
        data: JSON.stringify(parent)
      });
    },
    getParents: function() {
      return $.ajax({
        url: "api/parents",
        type: "GET"
      });
    },
    deleteParents: function(id) {
      return $.ajax({
        url: "api/parents/" + id,
        type: "DELETE"
      });
    }
  };

  // handleFormSubmit is called whenever we submit a new record
  // Save the new example to the db and refresh the list
  var handleFormSubmit = function(event) {
    event.preventDefault();

    var parent = {
      first_name: $first_name.val().trim(),
      middle_name: $middle_name.val().trim(),
      last_name: $last_name.val().trim(),
      name_suffix: $name_suffix.val().trim(),
      address1: $address1.val().trim(),
      address2: $address2.val().trim(),
      city: $city.val().trim(),
      postal_code: $postal_code.val().trim(),
      zip_code: $zip_code.val().trim(),
      phone_num_primary: $phone_num_primary.val().trim(),
      phone_num_alt: $phone_num_alt.val().trim(),
      email_address: $email_address.val().trim(),
      remarks: $remarks.val().trim()
    };

    if (!(parent.first_name && parent.last_name)) {
      alert("You must enter a first and last name!");
      return;
    }

    API.saveParent(parent).then(function() {
      console.log("Something is happening!");
//      refreshParents();
    });

    //$first_name.val("");
    //$last_name.val("");
  };

  // Add event listeners to the submit and delete buttons
  $submit_parent.on("click", handleFormSubmit);
});
