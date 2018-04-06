var WebSocketServer = require('websocket').server;
var http = require('http');
var colors = require('colors/safe');

var server = http.createServer(function (request, response) {
  // process HTTP request. Since we're writing just WebSockets
  // server we don't have to implement anything.
});
server.listen(7013, function () {
  console.log((new Date()) + " Server is listening on port 7013");
});

// create the server
wsServer = new WebSocketServer({
  httpServer: server
});

// WebSocket server
wsServer.on('request', function (request) {
  var connection = request.accept(null, request.origin);

  console.log("client " + colors.green ('connected'))

  // This is the most important callback for us, we'll handle
  // all messages from users here.
  connection.on('message', function (message) {

    //if (message.type === 'utf8') {
      // process WebSocket message
      console.log(' ')
      // console.log('NEW MESSAGE')
      // console.log('======')
      // console.log(Object.keys(message))
      console.log('new message: ' + colors.yellow(message.utf8Data) )
      // console.log('======')
      console.log(' ')
    //}

  });

  connection.on('close', function (connection) {
    // close user connection
    console.log("client " + colors.red ('disconnected'))
  });
});