'use strict';

// Put variables in global scope to make them available to the browser console.
var video = document.getElementById('video');
var socket = io.connect();

// var img = $('<img>',{id:n});

var button = document.getElementById('localVideo');

socket.on('connect', function() {
  console.log("Connected");
});

socket.on('image', function (data) {
console.log("Got image");
$('<img>').attr('src', data).appendTo('#mosaic');
});

// button.onclick = function () {
//   console.log('local click')
//   var clr = document.getElementById('picker').value;
//   console.log(clr)
//   canvas.getContext('2d').globalAlpha=1;
//   canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)  
//   canvas.getContext('2d').globalAlpha=0.2;
//   canvas.getContext('2d').fillStyle = '#' + clr;
//   canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height)
//   $('body').css('background-color', '#' + clr )
//   var dataUrl = canvas.toDataURL('image/webp', 1);
//   document.getElementById('localPhoto').src = dataUrl;
//   socket.emit('image', dataUrl);
// }

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
