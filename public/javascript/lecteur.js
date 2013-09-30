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
	 			if(ret.parent)
	 			{
	 				$("#listeMusiques").append("<h2>Parent</h2>")
	 				for(var i in ret.parent)
	 				{
	 					if(ret.parent[i].substring(ret.parent[i].length() - 4; ret.parent[i].length()) == ".mp3")
	 					{
	 						$("#listeMusiques").append("<p>" + ret.parent[i].substring(ret.parent[i].length() - 4) + "</p>")
	 					}
	 				}
	 				if(ret.sousDossier)
	 				{
	 					$("#listeMusiques").append("<h2>SousDossier</h2>")
	 					for(var i in ret.parent)
		 				{
	 						for(var ii in ret.sousDossier)
		 					{	
	 							if(ret.sousDossier[i][ii].substring(ret.sousDossier[i][ii].length() - 4; ret.sousDossier[i][ii].length()) == ".mp3")
	 							{
		 							$("#listeMusiques").append("<p>" + ret.sousDossier[i][ii].substring(ret.sousDossier[i][ii].length() - 4) + "</p>")
		 						}
		 					}
		 				}
	 					if(ret.sousSousDossier)
 						{
	 						$("#listeMusiques").append("<h2>SousSousDossier</h2>")
	 						for(var i in ret.parent)
			 				{
		 						for(var ii in ret.sousDossier)
			 					{
		 							for(var iii in ret.sousSousDossier)
			 							if(ret.sousSousDossier[i][ii][iii].substring(ret.sousSousDossier[i][ii][iii].length() - 4; ret.sousSousDossier[i][ii][iii].length()) == ".mp3")
			 							{
				 							$("#listeMusiques").append("<p>" + ret.sousSousDossier[i][ii][iii].substring(ret.sousSousDossier[i][ii][iii].length() - 4) + "</p>")
				 						}
			 					}
			 				}
 						}
	 				}
	 			}
	 		else
	 			alert(ret.Erreur)
	 	}
	})
}