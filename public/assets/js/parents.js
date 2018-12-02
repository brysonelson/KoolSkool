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
  var $student_ids = [];
  var $student_id = "";
  var $relationship = $("#relationship");
  var $contact_sequence = $("#contact_sequence");
  var $parent_id = "";
  var $form_parent_add = $("#form_parent_add");
  var $form_student_add = $("#form_student_add");

  // The API object contains methods for each kind of request we'll make
  var API = {
    saveParent: function(parent) {
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
    },
    //Doesn't work!!!
    getParentChild: function(id) {
      return $.ajax({
        url: "api/parentchild" + id,
        type: "GET"
      });
    },
    saveParentChild: function(parentChild) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/parentchild",
        data: JSON.stringify(parentChild)
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

  //This function is used to convert values from empty strings to null
  function nullToEmptyStrings(object) {
    for (var key in object) {
      if (object[key] === null) {
        object[key] = "";
      }
    }
    return object;
  }

  // handleFormSubmit is called whenever we submit a new record for the data that gets written to the Parent table
  var handleParentFormSubmit = function() {
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
      phone_num_primary: $phone_num_primary,
      phone_num_alt: $phone_num_alt,
      email_address: $email_address.val().trim(),
      remarks: $remarks.val().trim()
    };

    //replace any empty strings with null values to work around sequelize validations on empty strings
    emptyStringsToNull(parent);

    if (!(parent.first_name && parent.last_name)) {
      alert("You must enter a first and last name!");
      return;
    }

    API.saveParent(parent).then(function(response) {
      //response returns the record just added
      //translate nulls to empty strings for display
      nullToEmptyStrings(response);

      //save the parent id to global variable
      $parent_id = response.id;

      //create name
      if (!response.middle_name) {
        $name = response.first_name + " " + response.last_name;
      } else {
        $name =
          response.first_name +
          " " +
          response.middle_name +
          " " +
          response.last_name;
      }

      //create phone
      $phone = "Phone: " + response.phone_num_primary;
      if (response.phone_num_alt) {
        $phone = $phone + " / " + response.phone_num_alt;
      }

      //create city State Zip row
      $address3 = response.city;
      if (response.postal_code) {
        $address3 = $address3 + ", " + response.postal_code;
      }
      if (response.zip_code) {
        $address3 = $address3 + " " + response.zip_code;
      }

      //parse response into html
      var $nameDiv = $("<div>").attr("data-id", response.id);
      $nameDiv.appendTo(".card-left");

      var $nameDivFormat = $("<strong>").text($name);
      $nameDivFormat.appendTo($nameDiv);

      var $address1Div = $("<div>")
        .text(response.address1)
        .attr("data-id", response.id);
      $address1Div.appendTo(".card-left");

      var $address2Div = $("<div>")
        .text(response.address2)
        .attr("data-id", response.id);
      $address2Div.appendTo(".card-left");

      var $address3Div = $("<div>")
        .text($address3)
        .attr("data-id", response.id);
      $address3Div.appendTo(".card-left");

      var $emailDiv = $("<div>")
        .text("Email: " + response.email_address)
        .attr("data-id", response.id);
      $emailDiv.appendTo(".card-left");

      var $phonesDiv = $("<div>")
        .text($phone)
        .attr("data-id", response.id);
      $phonesDiv.appendTo(".card-left");

      var $remarksDiv = $("<div>")
        .text("Remarks: " + response.remarks)
        .attr("data-id", response.id);
      $remarksDiv.appendTo(".card-right");

      var $parentIDDiv = $("<div>");
      $parentIDDiv.appendTo(".card-right");

      var $parentIDFormat = $("<small>")
        .text("Parent ID: " + response.id)
        .attr("data-id", response.id);
      $parentIDFormat.appendTo($parentIDDiv);

      //Hide data entry grid
      $("#form_parent_add").addClass("d-none");
      //reveal div to display the data just added
      $("#parent_card").removeClass("d-none");
      //refreshParents();
    });
  };

  // handleFormSubmit for the data that gets written to the ParentChildMap
  var handleMapFormSubmit = function() {
    $student_ids = $("#students_select").val();

    var map = [];

    for (var i = 0; i < $student_ids.length; i++) {
      $student_id = $student_ids[i];
      map[i] = {
        relationship: $relationship.val().trim(),
        contact_sequence: $contact_sequence.val().trim(),
        parent_id: $parent_id,
        student_id: $student_id
      };
    }

    //separate each item in the array by a comma
    console.log(map);
    API.saveParentChild(map).then(function() {
      console.log("The Parent Child Map Saved!");

      API.getParentChild($parent_id).then(function(response) {
        console.log("Done!");
        //WHY does this return html???
        console.log(response);
      });

      //Get Child Info and display it on the Parent Card.

      //Hide the child entry grid
      $("#form_student_add").addClass("d-none");
      $("#parent_card").addClass("d-none");
      //reveal div to display success
      $("#success_card").removeClass("d-none");
    });
  };

  //event listeners to form and submit button(s)
  $form_parent_add.on("submit", function(event) {
    event.preventDefault();
    //console.log("Get Parent Info!");
    handleParentFormSubmit();
  });

  //event listeners to form and submit button(s)
  $form_student_add.on("submit", function(event) {
    event.preventDefault();
    handleMapFormSubmit();
  });

  //event listeners to button
  $("#add_children").click(function() {
    $("#form_student_add").removeClass("d-none");
  });
});
