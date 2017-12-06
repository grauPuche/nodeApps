'use strict';

var video = document.getElementById('video');
var socket = io.connect();

socket.on('connect', function () {
  console.log("socket connected");
});

var peer = new Peer({
  key: 'gx953psgv62prpb9'
});

var constraints = {
  audio: false,
  video: true
};

function handleSuccess(stream) {
  window.stream = stream; // make stream available to browser console
  video.srcObject = stream;
}

navigator.mediaDevices.getUserMedia(constraints).
then(handleSuccess).catch(handleError);

socket.on('mirrorID', function (id) {
	console.log('mirrorID is ' + id)
	var call = peer.call(id,stream);
	console.log('mirrorID connected!')
});

peer.on('open', function (id) {
	console.log('peerId is: ' + id);
	socket.emit('peerId', id)
	console.log('peerId send!')
  });

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}

var socket = io();

socket.on('new guess', function (guess) {
  console.log(guess);
  $('.givenGuess').css('display', 'inline')
  $('.givenGuess').html(guess)
});