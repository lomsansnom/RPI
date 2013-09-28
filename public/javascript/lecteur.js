function getListeMusiques(chemin)
{
	data = '{"chemin" : "' + chemin + '"}'
	$.ajax({async : true, 
	 	url : '/getListeMusiques',
	 	type : 'POST',
	 	contentType : 'application/json', 
	 	data : data,
	 	success : function(ret){
	 		if(ret.OK)
	 			alert(JSON.stringify(ret))
	 		else
	 			alert(ret.Erreur)
	 	}
	})
}