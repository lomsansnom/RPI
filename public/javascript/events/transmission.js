$(document).ready(function(){
	getListeDD()
	
	$("#btn").on('click', function(){
		if($("[name='selDD']:checked").val() != 'rpi')
		{
			var data = '{"repertoire" : "' + $("[name='selDD']:checked").val() + '"}' 
			isMounted(data)
		}
		else
		{
			 $.ajax({async : true, 
				 	url : '/downloadTorrent',
				 	type : 'POST',
				 	contentType : 'application/json', 
				 	data : '{"repertoire" : "/home/pi/torrents", "torrent" : "' + $("#lienTorrent").val() + '"}',
				 	success : function(rett){
				 		if(!rett.OK)
				 			alert(rett.Erreur)
				 	}
			 })
		}
	})
})