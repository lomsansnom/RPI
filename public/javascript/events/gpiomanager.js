$(document).ready(function(){
	
	getEtatGpios()
	
	$("[id^='pin']").on('click', function(){
		alert("Veuillez utiliser les pins repr�sent�es en vertes")
	});
	
	$("[id^='gpio']").on('click', function(){
		$.post('/changerEtatGpio', {"numGpio" : $(this).attr('id').substring(4), "mode" : "out"}, function(ret){
			if(ret.OK)
			{
				if(ret['etat'] == 0)
					$("#" + ret['numGpio'].toLowerCase()).css("background-color", "white")
				else if(ret['etat'] == 1)
					$("#" + ret['numGpio'].toLowerCase()).css("background-color", "#75a928")
			}
			else
			{
				alert(ret.Erreur)
			}
		})
	}); 
})