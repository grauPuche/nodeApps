'use strict';

var video = document.getElementById('video');
var socket = io.connect();

socket.on('connect', function () {
  console.log("Connected");
});

socket.on('image', function (data) {
  console.log("Got image");
  $('<img>').attr('src', data).appendTo('#mosaic');
});

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


