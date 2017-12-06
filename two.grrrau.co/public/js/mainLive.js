'use strict';

var video = document.getElementById('video1');
var video = document.getElementById('video1');

var socket = io.connect();

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
	console.log('liveID is: ' + lID);
	socket.emit('liveID', lID)
	console.log('liveID send!')
});

socket.on('mirrorID', function (mID) {
	console.log('mirrorID is ' + mID)
	var call = peer.call(mID, stream);
	console.log('mirrorID connected!')
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