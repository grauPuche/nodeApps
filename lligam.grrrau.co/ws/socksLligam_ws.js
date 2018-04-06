var WebSocketServer = require("websocket").server;
var http = require("http");
var colors = require("colors/safe");

var server = http.createServer(function(request, response) {
  // process HTTP request. Since we're writing just WebSockets
  // server we don't have to implement anything.
});
server.listen(7013, function() {
  console.log(new Date() + " Server is listening on port 7013");
});

// create the server
wsServer = new WebSocketServer({
  httpServer: server
});

var provisionalValueForX = 125;
var values = [];
var butt = false;
var xaxis = 0;
var yaxix = 0;

// WebSocket server
wsServer.on("request", function(request) {
  console.log((new Date()) + ' connection from origin '
      + request.origin + '.')
  var connection = request.accept(null, request.origin);

  console.log("client " + colors.green("connected"));
  console.log(" ");

  connection.on("message", function(message) {
    // console.log("new message: " + colors.yellow(message.utf8Data));
    values = message.utf8Data.split(",");
    console.log(
      colors.blue("X" + provisionalValueForX) +
        colors.green(" Y" + values[0]) +
        colors.red(" K" + values[1])
    );
    // console.log(colors.yellow(Object.keys(values)))

    yaxix = parseInt(values[0],10);

    if (values[1] === '0') {
      butt = true;
    } else {
      butt = false;
    }

    console.log(
      JSON.stringify({ x: provisionalValueForX, y: yaxix, k: butt })
    );
    console.log(" ");


  });

  connection.on("close", function(connection) {
    // close user connection
    console.log("client " + colors.red("disconnected"));
  });
});
