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
	 		{
	 			if(ret.parent)
	 			{
	 				$("#listeMusiques").empty()
	 				$("#listeMusiques").append("<h2>Parent</h2>")
	 				for(var i in ret.parent)
	 				{
	 					if(ret.parent[i].substring(ret.parent[i].length - 4, ret.parent[i].length) == ".mp3")
	 					{
	 						$("#listeMusiques").append("<p>" + ret.parent[i].substring(0, ret.parent[i].length - 4) + "</p>")
	 					}
	 					else if(ret.parent[i])
	 					{
	 						$("#listeMusiques").append("<p>" + ret.parent[i] + "</p>")
	 					}
	 					
	 					if(ret.sousDossier)
		 				{
	 						for(var ii in ret.sousDossier[i])
		 					{	
	 							if(ret.sousDossier[i][ii].substring(ret.sousDossier[i][ii].length - 4, ret.sousDossier[i][ii].length) == ".mp3")
	 							{
		 							$("#listeMusiques").append("<p>&nbsp;&nbsp;&nbsp;&nbsp;" + ret.sousDossier[i][ii].substring(0, ret.sousDossier[i][ii].length - 4) + "</p>")
		 						}
	 							else if(ret.sousDossier[i][ii])
	 							{
		 							$("#listeMusiques").append("<p>&nbsp;&nbsp;&nbsp;&nbsp;" + ret.sousDossier[i][ii] + "</p>")
		 						}
	 							
	 							if(ret.sousSousDossier)
		 						{
		 							for(var iii in ret.sousSousDossier[i][ii])
		 							{
			 							if(ret.sousSousDossier[i][ii][iii].substring(ret.sousSousDossier[i][ii][iii].length - 4, ret.sousSousDossier[i][ii][iii].length) == ".mp3")
			 							{
				 							$("#listeMusiques").append("<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + ret.sousSousDossier[i][ii][iii].substring(0, ret.sousSousDossier[i][ii][iii].length - 4) + "</p>")
				 						}
			 							else if(ret.sousSousDossier[i][ii][iii])
			 							{
				 							$("#listeMusiques").append("<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + ret.sousSousDossier[i][ii][iii] + "</p>")
				 						}
		 							}
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