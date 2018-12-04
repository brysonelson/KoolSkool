$(function() {
  var emergencyAudio = new Audio("assets/audio/ems.wav");

  // grab default message from handlebars html and then POST to emergency route
  $(".emergency-msg-form").on("submit", function(event) {
    // preventDefault on a submit event.
    event.preventDefault();

    var newMsg = {
      // get default message, and any modfications
      emergencyMsg: $("#emergency-msg")
        .val()
        .trim()
    };

    // Send the POST request.
    $.ajax("/api/emergency", {
      type: "POST",
      data: newMsg
    }).then(function(data) {
      console.log("created newMsg");
      console.log(data);
      $("#messageSent").text(
        "Last Emergency Message Sent: " + data.messageSent
      );
      emergencyAudio.play();
    });
  });

  // grab custom message from handlebars html and POST to emergency route
  $(".emergency-cstm-msg-form").on("submit", function(event) {
    // preventDefault on a submit event.
    event.preventDefault();

    var newMsg = {
      //get default message, and any modfications
      emergencyMsg: $("#emergency-cstm-msg")
        .val()
        .trim()
    };

    // Send the POST request.
    $.ajax("/api/emergency", {
      type: "POST",
      data: newMsg
    }).then(function(data) {
      console.log("created newMsg");
      console.log(data);
      $("#messageSent").text(
        "Last Emergency Message Sent: " + data.messageSent
      );
      emergencyAudio.play();
    });
  });
});
