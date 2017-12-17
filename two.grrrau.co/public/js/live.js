
'use strict';

var video = document.getElementById('remote');

var socket = io.connect();

function handleSuccess(LOCAL) {
  window.LOCAL = LOCAL; // make stream available to browser console
  //video.srcObject = LOCAL;
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
// var peer = new Peer('remote',{host: 'localhost', port: 9000, path: '/peer'});

//online 

// var peer = new Peer({
// 	key: 'gx953psgv62prpb9',
// 	secure:true,
// 	debug:3,
// });

var peer = new Peer('local',{host: 'one.grrrau.co', port: 443, secure:true, path: '/peer' });

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
  call.on('stream', function (stream) {
    // `stream` is the MediaStream of the remote peer.
    // Here you'd add it to an HTML video/canvas element.
    video.srcObject = stream;
  });
});

socket.on('isItRight',function(isItRight){
	if(isItRight == true){
		console.log('YES!! RIGHT ANSWER!!')
		$('.bigMsg').addClass('right');
		// $('.bigMsg').removeClass('#right');
	} else {
		console.log('NO!! YOU FUCKED UP!!')
		$('.bigMsg').addClass('wrong');
	}
})
