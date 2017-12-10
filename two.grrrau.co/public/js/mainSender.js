
var connected = false;
var typing = false;
var word;

var socket = io();



// $.getJSON("assets/wordList.json",function(word){
// 	console.log(word);
// });
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
	}

})
function search(ele) {
	if (event.keyCode == 13) {

		var guess = ele.value
		socket.emit('new guess', guess);

		console.log(word.list[0].word)

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