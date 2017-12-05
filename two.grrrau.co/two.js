// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 7002;

var Peer = require('simple-peer')
var peer = new Peer({
	initiator: location.hash === '#init'
});

server.listen(port, function () {
	console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function (socket) {
	console.log('a user connected');

	socket.on('disconnect', function () {
		console.log('user disconnected');
	});

	socket.on('new guess', function (guess) {
		console.log('new guess: '+ guess);
		io.emit('new guess', guess);
	});
});

peer.on('signal', function (data) {
	document.getElementById('yourId').value = JSON.stringify(data)
})