$(document).ready(function(){
	$("#sendChemin").on("click", function(){
		getListeMusiques($("#cheminMusiques").val())
	})
	
})

$(document).on("click", ".cliquable", function(){
	data = '{"musique" : "' + $("#cheminMusiques").val() + '/' + $(this).attr('id') + '"}'
	getMusique(data)
})