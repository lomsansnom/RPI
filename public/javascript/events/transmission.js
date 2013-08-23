$(document).ready(function(){
	getListeDD()
	
	$("#torrentOk").on('click', function(){
		$.post("/downloadTorrent", {'"repertoire" : "' + $("[name='selDD']:checked").val() + '"'})
	})
})