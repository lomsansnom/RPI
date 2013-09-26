$(document).ready(function() {
	$("#btn").on('click', function(){
		ajouterMembre()
	})
	
	$.post('/test', function(ret){
		alert(JSON.stringify(ret))
	})
});
