$(document).ready(function(){
	$("[id^='pin']").on('click', function(){
		alert("Veuillez utiliser les pins représentées en vertes")
	});
	
	$("[id^='gpio']").on('click', function(){
		$.post('/changerEtatGpio', {"numero" : $(this).attr('id').substring(4)})
	}); 
})