
var connected = false;
var typing = false;

var socket = io();

function search(ele) {
	if (event.keyCode == 13) {

		var guess = ele.value
		socket.emit('new guess', guess);

		// alert(ele.value);
		$('.bigMsg').attr('class','smallMsg');
		$('.bigBox').attr('class','smallBox');

		$('.smallBox').first().remove();
		
		$('.sentMsgs').append("<div class='bigBox'><div class='bigMsg'>"+ele.value+"</div></div>");
		$('.sentMsgs').attr('style','')

		ele.value = "";
	}
}

socket.on('new guess', function(guess){
	console.log(guess);	
});