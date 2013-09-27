function demandeLogin()
{
	 $.ajax({async : false, 
		 	url : '/login',
		 	type : 'POST',
		 	contentType : 'application/json', 
		 	data : '{"username" : "' + $("#username").val() + '", "password" : "' + CryptoJS.MD5($("#password").val()).toString() + '"}',
		 	success : function(ret){
		 		if(ret.OK)
		 		{
		 			$("#main").append("Vous êtes maintenant connecté, la page va se recharger automatiquement dans 3 secondes")
		 			setTimeout(function(){$(location).attr('href','/');},3000);
		 		}
		 		else
		 		{
		 			alert(ret.Erreur)
		 			$('#password').val('')
		 		}
		 	},
		 	error: function(ret){
		 		alert(ret.Erreur)
		 	}
	 	 })
}