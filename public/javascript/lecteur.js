function getListeMusiques(chemin)
{
	data = '{"chemin" : "' + chemin + '"}'
	$.ajax({async : false, 
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
	 				for(var i in ret.parent)
	 				{
	 					if(ret.parent[i].substring(ret.parent[i].length - 4, ret.parent[i].length) == ".mp3")
	 					{
	 						$("#listeMusiques").append('<span class="cliquable" id="' + ret.parent[i] + '">' + ret.parent[i].substring(0, ret.parent[i].length - 4) + '</span><br />')
	 					}
	 					else if(ret.parent[i])
	 					{
	 						$("#listeMusiques").append(ret.parent[i] + "<br />")
	 					}
	 					
	 					if(ret.sousDossier)
		 				{
	 						for(var ii in ret.sousDossier[i])
		 					{	
	 							if(ret.sousDossier[i][ii].substring(ret.sousDossier[i][ii].length - 4, ret.sousDossier[i][ii].length) == ".mp3")
	 							{
		 							$("#listeMusiques").append('<span class="cliquable" id="' + ret.parent[i] + '/' + ret.sousDossier[i][ii] + '">' + ret.sousDossier[i][ii].substring(0, ret.sousDossier[i][ii].length - 4) + '</span> <br />')
		 						}
	 							else if(ret.sousDossier[i][ii])
	 							{
		 							$("#listeMusiques").append(ret.sousDossier[i][ii] + "<br />")
		 						}
	 							
	 							if(ret.sousSousDossier)
		 						{
		 							for(var iii in ret.sousSousDossier[i][ii])
		 							{
			 							if(ret.sousSousDossier[i][ii][iii].substring(ret.sousSousDossier[i][ii][iii].length - 4, ret.sousSousDossier[i][ii][iii].length) == ".mp3")
			 							{
				 							$("#listeMusiques").append('<span class="cliquable" id="' + ret.parent[i] + '/' + ret.sousDossier[i][ii] + '/' + ret.sousSousDossier[i][ii][iii] + '">' + ret.sousSousDossier[i][ii][iii].substring(0, ret.sousSousDossier[i][ii][iii].length - 4) + '</span> <br />')
				 						}
			 							else if(ret.sousSousDossier[i][ii][iii])
			 							{
				 							$("#listeMusiques").append(ret.sousSousDossier[i][ii][iii] + "<br />")
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

function getMusique(data)
{
	$.ajax({async : true, 
	 	url : '/getMusique',
	 	type : 'POST',
	 	contentType : 'application/json', 
	 	data : data,
	 	success : function(ret){
	 		alert("ok")
	 	}
	})
}
	
	
	
	
	
	