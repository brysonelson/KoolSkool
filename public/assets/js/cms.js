$(function() {
  setFooterStyle();
  window.onresize = setFooterStyle;

  function setFooterStyle() {
    var docHeight = $(window).height();
    var footerHeight = $("#footer").outerHeight();
    var footerTop = $("#footer").position().top + footerHeight;
    if (footerTop < docHeight) {
      $("#footer").css("margin-top", docHeight - footerTop + "px");
    } else {
      $("#footer").css("margin-top", "");
    }
    $("#footer").removeClass("invisible");
  }

  //code for multi-select
  $(".selectpicker").selectpicker();

  //Initialize bootstrap 4 tooltips
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
    var text_remaining_first_name =
      text_max_first_name - text_length_first_name;
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
    var text_remaining_middle_name =
      text_max_middle_name - text_length_middle_name;
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
    var text_length_city = $("#city").val().length;
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
    var text_remaining_phone_num_primary =
      text_max_phone_num_primary - text_length_phone_num_primary;
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
    var text_remaining_phone_num_alt =
      text_max_phone_num_alt - text_length_phone_num_alt;
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
    var text_remaining_email_address =
      text_max_email_address - text_length_email_address;
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

  var text_max_position_descr = 4000;
  $("#feedback_position_descr").html(
    text_max_position_descr + " characters remain"
  );
  $("#position_descr").bind("input change paste keyup mouseup", function() {
    var text_max_position_descr = 4000;
    var text_length_position_descr = $("#position_descr").val().length;
    var text_remaining_position_descr =
      text_max_position_descr - text_length_position_descr;
    $("#feedback_position_descr").html(
      text_remaining_position_descr + " characters remain"
    );
    $(this).after(
      $("#feedback_position_descr").html(
        text_remaining_position_descr + " characters remain"
      )
    );
  });
  $("#position_descr").keyup();

  var text_max_nickname = 35;
  $("#feedback_nickname").html(text_max_nickname + " characters remain");
  $("#nickname").bind("input change paste keyup mouseup", function() {
    var text_max_nickname = 35;
    var text_length_nickname = $("#nickname").val().length;
    var text_remaining_nickname = text_max_nickname - text_length_nickname;
    $("#feedback_nickname").html(
      text_remaining_nickname + " characters remain"
    );
    $(this).after(
      $("#feedback_nickname").html(
        text_remaining_nickname + " characters remain"
      )
    );
  });
  $("#nickname").keyup();

  var text_max_course_descr = 35;
  $("#feedback_course_descr").html(
    text_max_course_descr + " characters remain"
  );
  $("#course_descr").bind("input change paste keyup mouseup", function() {
    var text_max_course_descr = 35;
    var text_length_course_descr = $("#course_descr").val().length;
    var text_remaining_course_descr =
      text_max_course_descr - text_length_course_descr;
    $("#feedback_course_descr").html(
      text_remaining_course_descr + " characters remain"
    );
    $(this).after(
      $("#feedback_course_descr").html(
        text_remaining_course_descr + " characters remain"
      )
    );
  });
  $("#course_descr").keyup();

  var text_max_location_descr = 50;
  $("#feedback_location_descr").html(
    text_max_location_descr + " characters remain"
  );
  $("#location_descr").bind("input change paste keyup mouseup", function() {
    var text_max_location_descr = 50;
    var text_length_location_descr = $("#location_descr").val().length;
    var text_remaining_location_descr =
      text_max_location_descr - text_length_location_descr;
    $("#feedback_location_descr").html(
      text_remaining_location_descr + " characters remain"
    );
    $(this).after(
      $("#feedback_location_descr").html(
        text_remaining_location_descr + " characters remain"
      )
    );
  });
  $("#location_descr").keyup();

  var text_max_room_num = 50;
  $("#feedback_room_num").html(text_max_room_num + " characters remain");
  $("#room_num").bind("input change paste keyup mouseup", function() {
    var text_max_room_num = 50;
    var text_length_room_num = $("#room_num").val().length;
    var text_remaining_room_num = text_max_room_num - text_length_room_num;
    $("#feedback_room_num").html(
      text_remaining_room_num + " characters remain"
    );
    $(this).after(
      $("#feedback_room_num").html(
        text_remaining_room_num + " characters remain"
      )
    );
  });
  $("#room_num").keyup();

  var text_max_relationship = 35;
  $("#feedback_relationship").html(
    text_max_relationship + " characters remain"
  );
  $("#relationship").bind("input change paste keyup mouseup", function() {
    var text_max_relationship = 35;
    var text_length_relationship = $("#relationship").val().length;
    var text_remaining_relationship =
      text_max_relationship - text_length_relationship;
    $("#feedback_relationship").html(
      text_remaining_relationship + " characters remain"
    );
    $(this).after(
      $("#feedback_relationship").html(
        text_remaining_relationship + " characters remain"
      )
    );
  });
  $("#relationship").keyup();
});

// $(document).ready(function() {
//   $.get("/cms")
//   $(".skool-logo").attr("href", req.user.)
// });
