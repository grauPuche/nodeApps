$(function() {

  var butt = false;
  var xaxis = 0;
  var yaxix = 0;

  // if user is running mozilla then use it's built-in WebSocket
  window.WebSocket = window.WebSocket || window.MozWebSocket;

  var connection = new WebSocket("ws://mitjons.grrrau.co");

  connection.onopen = function() {
    // connection is opened and ready to use
    console.log("YAY! connection established");
    connection.send("~WEB~");
    $("#serverStatus").html("offline");
  };

  connection.onerror = function(error) {
    // an error occurred when sending/receiving data
    console.log("connection error ma boi");
  };

  connection.onmessage = function(message) {
    // try to decode json (I assume that each message from server is json)
    try {
      var json = JSON.parse(message.data);
      console.log(message.data);
    } catch (e) {
      console.log("This doesn't look like a valid JSON: ", message.data);
      return;
    }

    if (json.x) {
      xaxis = json.x;
      $("#x strong").html(xaxis);
      yaxis = json.y;
      $("#y strong").html(yaxis);
      butt = json.k;
      $("#k strong").html(butt);
    } else {
      console.log("Hmm..., I've never seen JSON like this:", json);
    }
  };
});
