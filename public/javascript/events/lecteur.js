$(document).ready(function(){
	$("#sendChemin").on("click", function(){
		getListeMusiques($("#cheminMusiques").val())
	})
	
})

$(".cliquable").on("click", function(){
	data = '{"musique" : "' + $("#cheminMusiques").val() + '/' + $(this).attr('id') + '"}'
	getMusique(data)
})