/******************************************************************************
 *
 * Summary:
 *  This file contains the primary front-end java script functions and logic
 *  for creating and managing personnel records
 *
 *****************************************************************************/

$(function() {
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
  var $position_descr = $("#position_descr");
  var $reports_to_id = $("#reports_to_id");
  var $remarks = $("#remarks");
  var $form_personnel_add = $("#form_personnel_add");
//  var $submit_personnel = $("#submit_personnel");

  // The API object contains methods for each kind of request we'll make
  var API = {
    savePersonnel: function(personnel) {
      console.log(personnel);
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/personnel",
        data: JSON.stringify(personnel)
      });
    },
    getPersonnel: function() {
      return $.ajax({
        url: "api/personnel",
        type: "GET"
      });
    },
    deletePersonnel: function(id) {
      return $.ajax({
        url: "api/personnel/" + id,
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

    //get values from selects and if not answered convert to empty string
    if (!$("#name_suffix").val()) {
      $name_suffix = "";
    } else {
      $name_suffix = $name_suffix.val();
    }
    if (!$("#postal_code").val()) {
      $postal_code = "";
    } else {
      $postal_code = $("#postal_code").val();
    }
    if (!$("#reports_to_id").val()) {
      $reports_to_id = "";
    } else {
      $reports_to_id = $reports_to_id.val();
    }

    //trim the 1st digit off phone number if it is a 1
    $phone_num_primary = $phone_num_primary.val().trim();
    if ($phone_num_primary.charAt(0) === "1") {
      $phone_num_primary = $phone_num_primary.substring(1);
    }
    $phone_num_alt = $phone_num_alt.val().trim();
    if ($phone_num_alt.charAt(0) === "1") {
      $phone_num_alt = $phone_num_alt.substring(1);
    }
    //replace all non digits of the phone number
    $phone_num_primary = $phone_num_primary.replace(/\D/g, "");
    $phone_num_alt = $phone_num_alt.replace(/\D/g, "");

    //if less than 10 chars, won't pass validation, so change to blank
    //TODO!! RETURN MESSAGE TO USER TO REENTER PHONE NUMBER
    if ($phone_num_primary.length !== 10) {
      $phone_num_primary = "";
    }
    if ($phone_num_alt.length !== 10) {
      $phone_num_alt = "";
    }

    var personnel = {
      first_name: $first_name.val().trim(),
      middle_name: $middle_name.val().trim(),
      last_name: $last_name.val().trim(),
      name_suffix: $name_suffix,
      address1: $address1.val().trim(),
      address2: $address2.val().trim(),
      city: $city.val().trim(),
      postal_code: $postal_code,
      zip_code: $zip_code.val().trim(),
      phone_num_primary: $phone_num_primary,
      phone_num_alt: $phone_num_alt,
      email_address: $email_address.val().trim(),
      position_descr: $position_descr.val().trim(),
      reports_to_id: $reports_to_id,
      remarks: $remarks.val().trim()
    };

    //replace any empty strings with null values to work around sequelize validations on empty strings
    emptyStringsToNull(personnel);

    if (
      !(personnel.first_name && personnel.last_name && personnel.position_descr)
    ) {
      alert("You must enter a position, first and last name!");
      return;
    }

    API.savePersonnel(personnel).then(function() {
      console.log("Something is happening!");
      //refreshPersonnel();

      //Hide the child entry grid
      $("#form_personnel_add").addClass("d-none");
      //reveal div to display success
      $("#success_card").removeClass("d-none");


    });
  };

  //event listeners to form and submit button(s)
  $form_personnel_add.on("submit", function(event) {
    event.preventDefault();
    handleFormSubmit();
  });
});
