var socket = io();

socket.on('new guess', function(guess){
	console.log(guess);	
	$('.bigMsg').attr('class','smallMsg');
	$('.bigBox').attr('class','smallBox');

	$('.smallBox').first().remove();
	
	$('.sentMsgs').append("<div class='bigBox'><div class='bigMsg'>"+guess+"</div></div>");
	$('.sentMsgs').attr('style','')
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
