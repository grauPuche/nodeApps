'use strict';

var video = document.getElementById('video');
var socket = io.connect();

socket.on('connect', function () {
  console.log("Connected");
});

var peer = new Peer({key: 'gx953psgv62prpb9'});

var constraints = {
  audio: false,
  video: true
};

function handleSuccess(stream) {
  window.stream = stream; // make stream available to browser console
  video.srcObject = stream;
}

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}

navigator.mediaDevices.getUserMedia(constraints).
then(handleSuccess).catch(handleError);

var socket = io();

socket.on('new guess', function (guess) {
  console.log(guess);
  $('.givenGuess').css('display', 'inline')
  $('.givenGuess').html(guess)
});

peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
  socket.emit('id', id)
  });
  var conn = peer.connect('dest-peer-id');
