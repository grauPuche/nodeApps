var connected = false;
var typing = false;
var words;
var response;
var n = 0;
var socket = io();



$.getJSON("assets/wordList.json",function(word){
	console.log(word);
});
$.ajax({
	url: 'assets/wordList.json',
	dataType: 'json',
	type: 'get',
	cache: false,
	success: function API(word){
		// $(word.list).each(function(index,value) {
		// 	console.log(value.word)
		// })
		console.log(word.list[0].word);
		words = word
	}
})
function search(ele) {
	if (event.keyCode == 13) {

		var guess = ele.value
		socket.emit('new guess', guess);

		// console.log(words.list[0].word)

		// alert(ele.value);
		$('.bigMsg').attr('class', 'smallMsg');
		$('.bigBox').attr('class', 'smallBox');

		$('.smallBox').first().remove();

		$('.sentMsgs').append("<div class='bigBox'><div class='bigMsg'>" + ele.value + "</div></div>");
		$('.sentMsgs').attr('style', '')
		ele.value = "";
		$('html,body').animate({
				scrollTop: $("#empty").offset().top
			},
			'slow');
	}
}

socket.on('new guess', function (guess) {
	console.log(guess);
});

socket.on('isItRight', function (isItRight) {
	if (isItRight == true) {
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