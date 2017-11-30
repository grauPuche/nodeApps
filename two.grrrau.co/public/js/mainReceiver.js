var socket = io();

socket.on('new guess', function(guess){
	console.log(guess);	
	$('.bigMsg').attr('class','smallMsg');
	$('.bigBox').attr('class','smallBox');

	$('.smallBox').first().remove();
	
	$('.sentMsgs').append("<div class='bigBox'><div class='bigMsg'>"+guess+"</div></div>");
	$('.sentMsgs').attr('style','')
});