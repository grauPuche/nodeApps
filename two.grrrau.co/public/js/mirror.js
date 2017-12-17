'use strict';

var video = document.getElementById('video');

var socket = io.connect();

var isItRight = false;

var timer;

var x = 0;

var guess;
var words;
var n = 0;
var wordNum;
var response;

$.ajax({
	url: 'assets/wordList.json',
	dataType: 'json',
	type: 'get',
	cache: false,
	success: function API(word) {
		// $(word.list).each(function(index,value) {
		// 	console.log(value.word)
		// })
		console.log(word.list[0].word);
		words = word
		wordToGuess()
	}
})

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
// var peer = new Peer('local', {
// 	host: 'localhost',
// 	port: 9000,
// 	path: '/peer'
// });

//online 
var peer = new Peer({key: 'gx953psgv62prpb9',secure: 'true'});
// var peer = new Peer('local',{host: 'two.grrrau.co', port: 9000, path: '/peer'});

peer.on('open', function(id) {
	console.log('My peer ID is: ' + id);
  });

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

socket.on('n', function (wordNum) {
	console.log('the # received is ~ ' + wordNum)
	n = wordNum;
	console.log('n now is ~ ' + n)
	document.getElementById("word2guess").style.display = "none";
	document.getElementById("hidden").style.display = "block";
	setTimeout(function () {
			document.getElementById("hidden").style.display = "none";
			document.getElementById("word2guess").style.display = "block";
		},
		timePeriodInMs);
	$('#word2guess').html(words.list[n].word);
	console.log('next word is ~ ' + words.list[n].word);
});

socket.on('new guess', function (guess) {
	console.log('the guess is ~ ' + guess);
	clearTimeout(timer);
	// $('.givenGuess').css('display', 'inline')
	$('.givenGuess').remove();
	x++;
	$('.guesses').append('<div class="givenGuess" id="'+ x +'">'+guess+'</div>')
	timer = setTimeout(function () {
			$('#'+x).remove();
			console.log("deleted " + x );
		},
		4000);
	if (guess == words.list[n].word) {
		isItRight = true;
		socket.emit('isItRight', isItRight);
		response = n;
		socket.emit('response', response);
		console.log('YAY!');
		n++;
		if (n > 150) {
			n = 1;
		}
		document.getElementById("word2guess").style.display = "none";
		document.getElementById("hidden").style.display = "block";
		setTimeout(function () {
				document.getElementById("hidden").style.display = "none";
				document.getElementById("word2guess").style.display = "block";
			},
			timePeriodInMs);
		$('#word2guess').html(words.list[n].word);
		console.log('next word is ~ ' + words.list[n].word);
	} else {
		isItRight = false;
		socket.emit('isItRight', isItRight);
	}
});

socket.on('isItRight', function (isItRight) {
	if (isItRight == true) {
		console.log('YES!! RIGHT ANSWER!!')
		// $('.givenGuess').css('display', 'none')
		// $('.givenGuess').css('display', 'inline')
		// $('.givenGuess').removeClass('right');
		// $('.givenGuess').removeClass('wrong');
		$('.givenGuess').addClass('right');
	} else {
		console.log('NO!! YOU FUCKED UP!!')
		// $('.givenGuess').css('display', 'none')
		// $('.givenGuess').css('display', 'inline')
		// $('.givenGuess').removeClass('right');
		// $('.givenGuess').removeClass('wrong');
		$('.givenGuess').addClass('wrong');
	}
})

function wordToGuess() {

	// $('.bigMsg').click(function(){
	// 	$('#word2guess').html(words.list[n].word);
	// 	console.log(words.list[n].word);
	// 	n++;
	// 	if(n>150){
	// 		n=1;
	// 	}
	// });
};


var timePeriodInMs = 4000;