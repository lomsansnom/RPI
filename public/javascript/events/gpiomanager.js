$(document).ready(function(){
	$("[id^='pin']").on('click', function(){
		alert("Veuillez utiliser les pins repr�sent�es en vertes")
	});
	
	$("[id^='gpio']").on('click', function(){
		$.post('/changerEtatGpio', {"numero" : $(this).attr('id').substring(4), "mode" : "out"}, function(ret){
			alert("numero : " + ret['numero'])
			alert("etat : " + ret['etat'])
			if(ret['etat'] == 0)
				$("#" + toLowerCase(ret['numero'])).css("color", "black")
			else if(ret['etat'] == 1)
				$("#" + toLowerCase(ret['numero'])).css("color", "red")
		})
	}); 
})