$(document).ready(function(){
	getListeDD()
	
	$("#torrentOk").on('click', function(){
		var data = '{"repertoire" : "' + $("[name='selDD']:checked").val() + '"}' 
		isMounted(data)
	})
})