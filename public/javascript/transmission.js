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
					 	data : '{"repertoire" : "' + ret['monteSur'] + '", "torrent" : "' + $("#lienTorrent").val() + '"}',
					 	success : function(rett){
					 		alert(rett)
					 	}
				 })
			  }
		   },
		   error : function(ret){
			   alert(JSON.stringify(ret))
			   alert('erreur lors de l\'appel de /downloadTorrent')
		   }
	})	
}