/******************************************************************************
 *
 * Summary:
 *  This file contains the primary front-end java script functions and logic
 *  for creating and managing parent records
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
  var $remarks = $("#remarks");
  var $form_parent_add = $("#form_parent_add");
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
      $postal_code = $postal_code.val();
    }

    var parent = {
      first_name: $first_name.val().trim(),
      middle_name: $middle_name.val().trim(),
      last_name: $last_name.val().trim(),
      name_suffix: $name_suffix,
      address1: $address1.val().trim(),
      address2: $address2.val().trim(),
      city: $city.val().trim(),
      postal_code: $postal_code,
      zip_code: $zip_code.val().trim(),
      phone_num_primary: $phone_num_primary.val().trim(),
      phone_num_alt: $phone_num_alt.val().trim(),
      email_address: $email_address.val().trim(),
      remarks: $remarks.val().trim()
    };

    //replace any empty strings with null values to work around sequelize validations on empty strings
    emptyStringsToNull(parent);

    if (!(parent.first_name && parent.last_name)) {
      alert("You must enter a first and last name!");
      return;
    }

    API.saveParent(parent).then(function() {
      console.log("Something is happening!");
      //refreshParents();
    });
  };

  //event listeners to form and submit button(s)
  $form_parent_add.on("submit", function(event) {
    event.preventDefault();
    handleFormSubmit();
  });
});
