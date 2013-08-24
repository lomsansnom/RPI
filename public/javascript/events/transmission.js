$(document).ready(function(){
	getListeDD()
	
	$("#torrentOk").on('click', function(){
		var data = '{"repertoire" : "' + $("[name='selDD']:checked").val() + '"}' 
		$.ajax(url : '/downloadTorrent',
			   type : 'POST',
			   contentType : 'application/json',
			   data : data,
			   success : function(){
				   alert('success')
			   },
			   error : function(){
				   alert('error')
			   }
		)
	})
})