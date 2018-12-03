//public/assets/js/emergency.js   
//1.  twilio on submit send to all, personell, or parents
//2.  also the attendence records for the whole school 
//3.  accounting/check boxes next to each student to show if student accounted for
//4.  check boxes to show if student picked up and a note box with whom.

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

  // grab default message from handlebars html and then POST to emergency route
  $(".emergency-msg-form").on("submit", function(event) {
    // preventDefault on a submit event.
    event.preventDefault();

    var newMsg = {
      // get default message, and any modfications
      emergencyMsg: $("#emergency-msg").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/emergency", {
      type: "POST",
      data: newMsg
    }).then(function(data) {
      console.log("created newMsg");
      console.log(data);


        // Reload the page in case another message desired
        //location.reload();  //~ steven said not needed when using ajax
        //location.reload(data);  //~ steven said not needed when using ajax
      }
    );
  });


  // grab custom message from handlebars html and POST to emergency route
  $(".emergency-cstm-msg-form").on("submit", function(event) {
    // preventDefault on a submit event.
    event.preventDefault();

    var newMsg = {
      //get default message, and any modfications
      emergencyMsg: $("#emergency-cstm-msg").val().trim()
    };

    // Send the POST request. 
    $.ajax("/api/emergency", {
      type: "POST",
      data: newMsg
    }).then(function(data) {
        console.log("created newMsg");
        //console.log(data);  //returns nothing in Inspector
    
        // Reload the page in case another message desired
        //location.reload(data);
        //This is what I am trying to re-render: res.render("emergency", {
          //messageSent: data,
          //nav: false

  
        //});
        
      }
    );
  });

});

