$(document).ready(function(){
	$("[id^='pin']").on('click', function(){
		alert("Veuillez utiliser les pins repr�sent�es en vertes")
	});
	
	$("[id^='gpio']").on('click', function(){
		$.post('/changerEtatGpio', {"numero" : $(this).attr('id').substring(4), "mode" : "out"}, function(rett){
			var ret = JSON.parse(rett)
			alert("numero : " + ret['numero'])
			alert("etat : " + ret['etat'])
		})
	}); 
})