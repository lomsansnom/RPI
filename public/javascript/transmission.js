function getListeDD()
{
	$.post('/getListeDD', function(ret){
		for(var i in ret)
		{
			$("#selDD").after('<p> <input type="radio" name="selDD" value="' + ret[i].split(" ")[0] + '" />' + ret[i] + '</p>')
		}
	})
}

function isMounted(data)
{
	$.ajax({async : false,
		   url : '/isMounted',
		   type : 'POST',
		   contentType : 'application/json',
		   data : data,
		   success : function(ret){
			  if(ret['monte'])
			  {
				 $.ajax({async : true, 
					 	url : '/downloadTorrent',
					 	type : 'POST',
					 	contentType : 'application/json', 
					 	data : '{"repertoire" : "' + ret['monteSur'] + '", "torrent" : "' + $("#lienTorrent").val().replace('"', '\"') + '"}',
					 	success : function(rett){
					 		alert(rett)
					 	}
				 })
			  }
			  else
			  {
				  monteSur = mountDD()
				  if(monteSur != "erreur")
				  {
					  $.ajax({async : true, 
						 	url : '/downloadTorrent',
						 	type : 'POST',
						 	contentType : 'application/json', 
						 	data : '{"repertoire" : "' + monteSur + '", "torrent" : "' + $("#lienTorrent").val().replace('"', '\"') + '"}',
						 	success : function(rett){
						 		alert(rett)
						 	}
					  })
				  }
			  }
		   },
		   error : function(ret){
			   alert(JSON.stringify(ret))
			   alert("erreur lors de l'appel de /isMounted")
		   }
	})	
}

function mountDD(chemin)
{
	var monteSur = ""
	$.ajax({async : false,
			url : '/mountDD',
			type : 'POST',
			contentType : 'application/json',
			data : '{"chemin" : "' + chemin '"}',
			success : function(mountOk){
				if(mountOk['ok'])
					monteSur = mountOk['monteSur']
			},
			error : function(mountOk){
				   alert(JSON.stringify(mountOk))
				   alert("erreur lors de l'appel de /mountDD")
				   monteSur = "erreur"
			}
	})
	return monteSur
}