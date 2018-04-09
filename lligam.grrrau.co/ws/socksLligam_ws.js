var WebSocketServer = require("websocket").server;
var http = require("http");
var colors = require("colors/safe");
var port = 7013;

var server = http.createServer(function(request, response) {
  // process HTTP request. Since we're writing just WebSockets
  // server we don't have to implement anything.
});

server.listen(port, function() {
  console.log(
    new Date() + " Server is listening on port " + colors.yellow(port)
  );
  console.log(' ');
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

var clients = [];

// WebSocket server
wsServer.on("request", function(request) {
  console.log("connection from " + request.origin);
  var connection = request.accept(null, request.origin);

  var index = clients.push(connection) - 1;
  var clientName = false;

  // console.log(colors.yellow("new client"));

  connection.on("message", function(message) {
    if (message.type === "utf8") {
      if (clientName === false) {
        clientName = message.utf8Data;
        console.log(colors.magenta(clientName) + colors.green(' connected') + ', clients array is ' + colors.yellow(Object.keys(clients)));
        console.log(" ");
      } else if (clients[1] !== 1 ){
        // console.log("new message: " + colors.yellow(message.utf8Data));
        values = message.utf8Data.split(",");
        console.log(
          colors.blue("X" + provisionalValueForX) +
            colors.green(" Y" + values[0]) +
            colors.red(" K" + values[1])
        );
        console.log(" ");

        // console.log(colors.yellow(Object.keys(values)))

        yaxix = parseInt(values[0], 10);

        if (values[1] === "0") {
          butt = true;
        } else {
          butt = false;
        }

        var allValues = JSON.stringify({
          x: provisionalValueForX,
          y: yaxix,
          k: butt
        });

        clients[1].sendUTF(allValues);

        // console.log("just send: " + colors.yellow(allValues));
        // console.log(" ");
      }
    }
  });

  connection.on("close", function(connection) {
    if (clientName !== false) {
      console.log(colors.magenta(clientName) + colors.red(" disconnected"));
      console.log(" ");
      // remove client from the list of connected clients
      clients.splice(index, 1);
    }
  });
});
