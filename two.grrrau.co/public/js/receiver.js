var socket = io();

var words;
var response;
var n = 0

var objDiv = document;
objDiv.scrollTop = objDiv.scrollHeight;

$.ajax({
	url: 'assets/wordList.json',
	dataType: 'json',
	type: 'get',
	cache: false,
	success: function API(word) {
		// $(word.list).each(function(index,value) {
		// 	console.log(value.word)
		// })
		console.log(word.list[n].word);
		words = word
	}
})

socket.on('new guess', function(guess){
	console.log(guess);	
	$('.bigMsg').attr('class','smallMsg');
	$('.bigBox').attr('class','smallBox');

	$('.smallBox').first().remove();
	
	$('.sentMsgs').append("<div class='bigBox'><div class='bigMsg'>"+guess+"</div></div>");
	$('.sentMsgs').attr('style','')
	$(document).scrollTop($(document).height());
	
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

socket.on('response',function(response){
	$('.sentMsgs').append("<div class='smallBox'><div class='receivedBox'><div class='received'><img src='"+words.list[response].gifs+"' alt=''></div></div></div><div class='smallBox'><div class='receivedBox'><div class='receivedTxt'>"+words.list[response].pun+"</div></div></div>");
	// $(body).scrollTop($(body).height());	
	//window.scrollTo(0,document.body.scrollHeight + 100);
	$('html,body').animate({
        scrollTop: $("#empty").offset().top},
        'slow');
})