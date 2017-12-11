// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 7002;



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
	socket.on('liveID', function(id){
		
		io.emit('liveID', id);
		console.log('liveID is '+ id);
	});
	socket.on('mirrorID', function(id){
		
		io.emit('mirrorID', id);
		console.log('id is '+ id);
	});
	socket.on('isItRight', function(isItRight){
		io.emit('isItRight', isItRight);
		console.log('is the answer right? ' + isItRight);
	})
});
