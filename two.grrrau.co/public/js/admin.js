var socket = io();

var n = 0;
var NEXT = 0;
var words;
var nextNEXT = 0;
var newWordNum = 0;

function slider() {
	var wordNum = document.getElementById("wordSlider").value;
	socket.emit('n', wordNum);
	console.log(wordNum);
	$('#current').html(words.list[wordNum].word)
};
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
	}
})

socket.on('response', function (response) {
	NEXT = (response + 1)
	console.log('the current word is ~ ' + NEXT)
	$('#current').html(words.list[NEXT].word)

})

function tooHard() {
	nextNEXT = (NEXT + 1)
  socket.emit('n', nextNEXT)
  console.log('the current word value ~ ' + nextNEXT);  
  console.log('the NEXT value is ~ ' + nextNEXT);
  $('#current').html(words.list[nextNEXT].word)
};

function goodEnough(){
	socket.emit('response', NEXT)
	nextNEXT = (NEXT + 1)
	socket.emit('n', nextNEXT)
	var isItRight = true;
	socket.emit('isItRight', isItRight);
}

socket.on('n', function(newWordNum){
	NEXT = newWordNum;
	$('#current').html(words.list[newWordNum].word)
})