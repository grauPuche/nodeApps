'use strict';

var video = document.getElementById('video');

var socket = io.connect();

function handleSuccess(LOCAL) {
	window.LOCAL = LOCAL; // make stream available to browser console
	video.srcObject = LOCAL;
}

var constraints = {
	audio: false,
	video: true
};

navigator.mediaDevices.getUserMedia(constraints).
then(handleSuccess).catch(handleError);

function handleError(error) {
	console.log('navigator.getUserMedia error: ', error);
}

socket.on('connect', function () {
	console.log("socket connected");
});

//local
var peer = new Peer('local',{host: 'localhost', port: 9000, path: '/peer'});
//online 
//var peer = new Peer('local',{host: 'two.grrrau.co', port: 9000, path: '/peer'});

peer.on('open', function (lID) {
	console.log('liveID is: ' + lID);
	socket.emit('liveID', lID)
	console.log('liveID send!')
});

socket.on('mirrorID', function (mID) {
	console.log('mirrorID is ' + mID)
	var call = peer.call(mID, LOCAL);
	console.log('mirrorID connected!')
});

// peer.on('call', function (call) {
// 	// Answer the call automatically (instead of prompting user) for demo purposes
// 	call.answer(window.localStream);
// 	console.log('answered!')
// });

// call.on('stream', function (stream) {
// 	// `stream` is the MediaStream of the remote peer.
// 	// Here you'd add it to an HTML video/canvas element.
// 	video.srcObject = stream;
// });

peer.on('call', function (call) {
	// Answer the call automatically (instead of prompting user) for demo purposes
	call.answer(window.localStream);
  console.log('answered!')
  call.on('stream', function (stream) {
    // `stream` is the MediaStream of the remote peer.
    // Here you'd add it to an HTML video/canvas element.
    video.srcObject = stream;
  });
});

var socket = io();

socket.on('new guess', function (guess) {
  console.log(guess);
  $('.givenGuess').css('display', 'inline')
  $('.givenGuess').html(guess)
});