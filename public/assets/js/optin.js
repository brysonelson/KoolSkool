/******************************************************************************
 *
 * Summary:
 *  This file contains the primary front-end java script functions and logic
 *  for creating a new record for purposes of text messaging
 *
 *****************************************************************************/

$(function() {
  // Get references to page elements
  var $first_name = $("#first_name");
  var $last_name = $("#last_name");
  var $phone_num_primary = $("#phone_num_primary");
  var $optIn = $("#optinchk");
  var $close = $("#optIn_submit");
  var $form_optIn_add = $("#form_optIn_add");

  // The API object contains methods for each kind of request we'll make
  var API = {
    saveOptIn: function(optIn) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/optIn",
        data: JSON.stringify(optIn)
      });
    },
    getOptIn: function() {
      return $.ajax({
        url: "api/optIn",
        type: "GET"
      });
    },
    deleteOptIn: function(id) {
      return $.ajax({
        url: "api/optIn/" + id,
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

    //get values from checkbox
    if ($(optinchk).is(":checked")) {
      $optIn = true;
    } else {
      $optIn = false;
    }

    //trim the 1st digit off phone number if it is a 1
    $phone_num_primary = $phone_num_primary.val().trim();
    if ($phone_num_primary.charAt(0) === "1") {
      $phone_num_primary = $phone_num_primary.substring(1);
    }
    //replace all non digits of the phone number
    $phone_num_primary = $phone_num_primary.replace(/\D/g, "");

    //if less than 10 chars, won't pass validation, so change to blank
    //TODO!! RETURN MESSAGE TO USER TO REENTER PHONE NUMBER
    if ($phone_num_primary.length !== 10) {
      $phone_num_primary = "9999999999";
    }

    var optIn = {
      first_name: $first_name.val().trim(),
      last_name: $last_name.val().trim(),
      phone_num_primary: $phone_num_primary,
      emergency: $optIn
    };

    //replace any empty strings with null values to work around sequelize validations on empty strings
    emptyStringsToNull(optIn);

    if (
      !(optIn.first_name && optIn.last_name && optIn.phone_num_primary)
    ) {
      alert("Oops!  You forgot to enter some information.  All fields are required.");
      return;
    }

    API.saveOptIn(optIn).then(function() {
      console.log("Something is happening!");

      //Hide the child entry grid
      $("#form_optIn_add").addClass("d-none");
      //reveal div to display success
      $("#success_card").removeClass("d-none");

    });
  };

  //event listeners to form and submit button(s)
  $form_optIn_add.on("submit", function(event) {
    event.preventDefault();
    handleFormSubmit();
  });
});
