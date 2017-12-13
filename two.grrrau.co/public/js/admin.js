var socket = io();

function slider(){
	var wordNum = document.getElementById("wordSlider").value;
	socket.emit('n', wordNum);
	console.log(wordNum);
};