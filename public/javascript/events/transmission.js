$(document).ready(function(){
	getListeDD()
	
	$("#torrentOk").on('click', function(){
		/*var data = '{"repertoire" : "' + $("[name='selDD']:checked").val() + '"}' 
		$.ajax({async : false,
			   url : '/downloadTorrent',
			   type : 'POST',
			   contentType : 'application/json',
			   data : data,
			   success : function(ret){
				   alert(JSON.stringify(ret))
			   },
			   error : function(ret){
				   alert(JSON.stringify(ret))
				   alert('erreur lors de l\'appel de /downloadTorrent')
			   }
		})*/
		var data = '{"repertoire" : "' + $("[name='selDD']:checked").val() + '"}'
		$.post('/downloadTorrent', data, function(ret){
			   alert(JSON.stringify(ret))
		})
	})
})