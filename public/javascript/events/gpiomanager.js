$(document).ready(function(){
	
	getEtatGpios()
	
	$("[id^='pin']").on('click', function(){
		alert("Veuillez utiliser les pins repr�sent�es en vertes")
	});
	
	$("[id^='gpio']").on('click', function(){
		$.post('/changerEtatGpio', {"numero" : $(this).attr('id').substring(4), "mode" : "out"}, function(ret){
			if(ret['etat'] == 0)
				$("#" + ret['numero'].toLowerCase()).css("color", "black")
			else if(ret['etat'] == 1)
				$("#" + ret['numero'].toLowerCase()).css("color", "red")
		})
	}); 
})