$(document).ready(function(){
	getListeDD()
	
	$("#torrentOk").on('click', function(){
		var data = '{"repertoire" : "' + $("[name='selDD']:checked").val() + '"}' 
		$.ajax({url : 'http://192.168.1.45:8080/downloadTorrent',
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
		})
	})
})