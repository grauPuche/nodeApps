// 'use strict';

// var video = document.getElementById('video');
// var socket = io.connect();

// socket.on('connect', function () {
//   console.log("socket connected");
// });

// var peer = new Peer({
//   key: 'gx953psgv62prpb9'
// });

// var constraints = {
//   audio: false,
//   video: true
// };

// function handleSuccess(stream) {
//   window.stream = stream; // make stream available to browser console
//   video.srcObject = stream;
// }

// navigator.mediaDevices.getUserMedia(constraints).
// then(handleSuccess).catch(handleError);

// socket.on('mirrorID', function (id) {
// 	console.log('mirrorID is ' + id)
// 	var call = peer.call(id,stream);
// 	console.log('mirrorID connected!')
// });

// peer.on('open', function (id) {
// 	console.log('peerId is: ' + id);
// 	socket.emit('peerId', id)
// 	console.log('peerId send!')
//   });

// function handleError(error) {
//   console.log('navigator.getUserMedia error: ', error);
// }


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

var peer = new Peer({
	key: 'gx953psgv62prpb9'
});

peer.on('open', function (lID) {
	console.log('mirrorID is: ' + lID);
	socket.emit('mirrorID', lID)
	console.log('mirrorID send!')
});

socket.on('liveID', function (mID) {
	console.log('liveID is ' + mID)
	var call = peer.call(mID, stream);
	console.log('liveID connected!')
});

peer.on('call', function (call) {
	// Answer the call automatically (instead of prompting user) for demo purposes
	call.answer(window.localStream);
	console.log('answered!')
});

call.on('stream', function (stream) {
	// `stream` is the MediaStream of the remote peer.
	// Here you'd add it to an HTML video/canvas element.
	video.srcObject = stream;

});
var socket = io();

socket.on('new guess', function (guess) {
  console.log(guess);
  $('.givenGuess').css('display', 'inline')
  $('.givenGuess').html(guess)
});