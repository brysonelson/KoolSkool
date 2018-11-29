/******************************************************************************
 *
 * Summary:
 *  This file contains the primary front-end java script functions and logic
 *  for creating and managing student records
 *
 *****************************************************************************/

$(function() {
  // Get references to page elements
  var $first_name = $("#first_name");
  var $middle_name = $("#middle_name");
  var $last_name = $("#last_name");
  var $name_suffix = $("#name_suffix");
  var $nickname = $("#nickname");
  var $birthdate = $("#birthdate");
  var $gender = $("#gender");
  var $photo = $("#photo");
  var $parent_id = "";
  var $student_id = "";
  var $form_parent_add = $("#form_parent_add");
  var $form_student_add = $("#form_student_add");

  // The API object contains methods for each kind of request we'll make
  var API = {
    saveStudent: function(student) {
      console.log(student);
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/students",
        data: JSON.stringify(student)
      });
    },
    getStudent: function() {
      return $.ajax({
        url: "api/students",
        type: "GET"
      });
    },
    deleteStudent: function(id) {
      return $.ajax({
        url: "api/students/" + id,
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
    },
    getParent: function() {
      return $.ajax({
        url: "api/allparents",
        type: "GET"
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

  // handleFormSubmit is called whenever we submit a new record
  var handleStudentFormSubmit = function() {
    //get values from radio buttons
    $gender = $("input[name='gender']:checked").val();

    //get values from selects and if not answered convert to empty string
    if (!$("#name_suffix").val()) {
      $name_suffix = "";
    } else {
      $name_suffix = $name_suffix.val();
    }

    //Construct the object of values to save
    var student = {
      first_name: $first_name.val().trim(),
      middle_name: $middle_name.val().trim(),
      last_name: $last_name.val().trim(),
      name_suffix: $name_suffix,
      nickname: $nickname.val().trim(),
      birthdate: $birthdate.val().trim(),
      gender: $gender,
      photo: $photo.val().trim()
    };

    //replace any empty strings with null values to work around sequelize validations on empty strings
    emptyStringsToNull(student);

    //confirm required fields have values
    if (!(student.first_name && student.last_name)) {
      alert("You must enter a first and last name!");
      return;
    }

    //call api route to save the data
    API.saveStudent(student).then(function(response) {
      //response returns the record just added
      //translate nulls to empty strings for display
      nullToEmptyStrings(response);
      console.log(response);

      //save the parent id to global variable
      $student_id = response.id;

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

      //parse response into html
      var $nameDiv = $("<div>").attr("data-id", response.id);
      $nameDiv.appendTo(".card-left");

      var $nameDivFormat = $("<strong>").text($name);
      $nameDivFormat.appendTo($nameDiv);

      var $nicknameDiv = $("<div>")
        .text("Nickname: " + response.nickname)
        .attr("data-id", response.id);
      $nicknameDiv.appendTo(".card-left");

      var $birthdate = moment(response.birthdate).format("MMMM D, YYYY");
      var $age = moment().diff(response.birthdate, "years");

      var $birthdateDiv = $("<div>")
        .text("Birthdate: " + $birthdate)
        .attr("data-id", response.id);
      $birthdateDiv.appendTo(".card-left");

      var $ageDiv = $("<div>")
        .text("Age: " + $age)
        .attr("data-id", response.id);
      $ageDiv.appendTo(".card-left");

      switch (response.gender) {
        case "1":
          $gender = "Gender: Not Provided";
          break;
        case "2":
          $gender = "Gender: Male";
          break;
        case "3":
          $gender = "Gender: Female";
          break;
        default:
          $gender = "Gender: Not Provided";
      }

      var $genderDiv = $("<div>")
        .text($gender)
        .attr("data-id", response.id);
      $genderDiv.appendTo(".card-left");

      var $photoDiv = $("<div>")
        .text(response.photo)
        .attr("data-id", response.id);
      $photoDiv.appendTo(".card-left");

      var $studentIDDiv = $("<div>");
      $studentIDDiv.appendTo(".card-right");

      var $studentIDFormat = $("<small>")
        .text("Student ID: " + response.id)
        .attr("data-id", response.id);
      $studentIDFormat.appendTo($studentIDDiv);

      //Hide data entry grid
      $("#form_student_add").addClass("d-none");
      //reveal div to display the data just added
      $("#student_card").removeClass("d-none");
      //refreshstudents();
    });
  };

  // handleFormSubmit for the data that gets written to the ParentChildMap
  var handleMapFormSubmit = function() {
    console.log("I'm Adding to the database now");
    //How many parents were added?
    console.log(countExtraParent + "Were Added To Form");

    //Iterate over the form using the data attributes & insert into the map array
    var map = [];

    for (var i = 1; i <= countExtraParent; i++) {
      map[i - 1] = {
        // eslint-disable-next-line prettier/prettier
        relationship: $relationship = $("[data-relationship=\""+i+"\"]").val().trim(),
        // eslint-disable-next-line prettier/prettier
        contact_sequence: $contact_sequence = $("[data-contact_sequence=\""+i+"\"]").val().trim(),
        // eslint-disable-next-line prettier/prettier
        parent_id: $("[data-parents_select=\""+i+"\"]").val(),  
        student_id: $student_id
      };
    }

    //separate each item in the array by a comma
    API.saveParentChild(map).then(function() {
      console.log("The Parent Child Map Saved!");

      API.getParentChild($parent_id).then(function(response) {
        console.log("Done!");
        //WHY does this return html???
        console.log(response);
      });

      //Get Child Info and display it on the Parent Card.

      //Hide the data entry entry grid
      $("#form_parent_add").addClass("d-none");
      $("#student_card").addClass("d-none");
      //reveal div to display success
      $("#success_card").removeClass("d-none");
    });
  };

  // Handle adding a new row to put a second parent
  var extraParent = function(countExtraParent) {
    //create the new parent row
    // eslint-disable-next-line prettier/prettier
    var $newParentRow_e1 = $("<div class=\"form-group col-md-6\">");
    $newParentRow_e1.appendTo("#extra_parent_div");
    var $select = $("<select>")
      // eslint-disable-next-line prettier/prettier
      .attr("class", "form-control btn-outline-secondary w-100")
      .attr("data-parents_select", countExtraParent);
    $select.appendTo($newParentRow_e1);
    var $label = $("<label>")
      .attr("class", "form-label")
      .text("Parents");
    $label.insertBefore($select);
    var $title = $("<option>")
      .text("-- Choose one parent from the list --")
      .attr("value", 0)
      .attr("disabled", true)
      .attr("selected", true);
    $title.appendTo($select);

    // eslint-disable-next-line prettier/prettier
    var $newParentRow_e2 = $("<div class=\"form-group col-md-4\">");
    $newParentRow_e2.appendTo("#extra_parent_div");
    var $inputTxt = $("<input>")
      .attr("type", "text")
      .attr("class", "form-control relationship")
      .attr("maxlength", "35")
      .attr("data-relationship", countExtraParent);

    $inputTxt.appendTo($newParentRow_e2);
    var $label_e2 = $("<label>")
      .attr("class", "form-label")
      .text("Relationship");
    $label_e2.insertBefore($inputTxt);

    // eslint-disable-next-line prettier/prettier
    var $newParentRow_e3 = $("<div class=\"form-group col-md-2\">");
    $newParentRow_e3.appendTo("#extra_parent_div");
    var $inputNum = $("<input>")
      .attr("type", "number")
      .attr("class", "form-control contact_sequence")
      .attr("min", "1")
      .attr("step", "1")
      .attr("data-contact_sequence", countExtraParent);
    $inputNum.appendTo($newParentRow_e3);

    var $label_e3 = $("<label>")
      .attr("class", "form-label")
      .text("Contact Order");
    $label_e3.insertBefore($inputNum);

    API.getParent().then(function(data) {
      data.map(function(parent) {
        //loop through the data and construct a list of the parents to append into the dropdown
        var $option = $("<option>")
          .attr("value", parent.id)
          .text(parent.last_name + ", " + parent.first_name);
        $option.appendTo($select);
      });
    });
  };

  //event listeners to form and submit button(s)
  $form_student_add.on("submit", function(event) {
    event.preventDefault();
    handleStudentFormSubmit();
  });

  //event listeners to form and submit button(s)
  $form_parent_add.on("submit", function(event) {
    console.log("Adding Parents to Map:");
    event.preventDefault();
    handleMapFormSubmit();
  });

  //event listeners to button
  $("#add_parent").click(function() {
    $("#form_parent_add").removeClass("d-none");
  });

  //event listeners to button
  var countExtraParent = 1;
  $("#btn_extra_parent").click(function() {
    //How Many Times Have I clicked This Button?
    countExtraParent++;
    extraParent(countExtraParent);
  });
});
