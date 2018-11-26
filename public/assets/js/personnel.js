/******************************************************************************
 *
 * Summary:
 *  This file contains the primary front-end java script functions and logic
 *  for creating and managing personnel records
 *
 *****************************************************************************/

$(function() {
  /******************************************************************************
   *Upon page load Initialize bootstrap 4 tooltips
   *
   *****************************************************************************/
  $("[data-toggle='tooltip']").tooltip();

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
  var $submit_personnel = $("#submit_personnel");

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

  // handleFormSubmit is called whenever we submit a new record
  // Save the new example to the db and refresh the list
  var handleFormSubmit = function(event) {
    event.preventDefault();

    var personnel = {
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
      position_descr: $position_descr.val().trim(),
      reports_to_id: $reports_to_id.val().trim(),
      remarks: $remarks.val().trim()
    };

    if (!(personnel.first_name && personnel.last_name)) {
      alert("You must enter a first and last name!");
      return;
    }

    API.savePersonnel(personnel).then(function() {
      console.log("Something is happening!");
      //refreshPersonnel();
    });

    //$first_name.val("");
    //$last_name.val("");
  };

  // Add event listeners to the submit and delete buttons
  $submit_personnel.on("click", handleFormSubmit);
});
