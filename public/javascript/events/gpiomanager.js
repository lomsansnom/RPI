$(document).ready(function(){
	$("[id^='pin']").on('click', function(){
		alert("Veuillez utiliser les pins repr�sent�es en vertes")
	});
	
	$("[id^='gpio']").on('click', function(){
		data = '{"numero" : "' + $(this).attr('id').substring(4) + '"}'
		success = function(){
			alert("ok")
		}
		
		$.ajax({
		  type: "POST",
		  url: '/changerEtatGpio',
		  data: data,
		  success: success,
		});
	}); 
})