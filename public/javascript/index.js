function demandeLogin()
{
	 $.ajax({async : false, 
		 	url : '/login',
		 	type : 'POST',
		 	contentType : 'application/json', 
		 	data : '{"username" : "' + $("#username").val() + '", "password" : "' + $("#password").val() + '"}',
		 	success : function(ret){
		 		if(ret.ok)
		 		{
		 			$("#main").append("Vous êtes maintenant connecté, la page va se recharger automatiquement dans 3 secondes")
		 			setTimeout(function(){$(location).attr('href','/');},3000);
		 		}
		 		else
		 		{
		 			alert(ret.erreur)
		 		}
		 	},
		 	error: function(ret){
		 		alert(ret.erreur)
		 	}
	 	 })
}

function demandeLogout()
{
	 $.ajax({async : false, 
		 	url : '/logout',
		 	type : 'POST',
		 	contentType : 'application/json', 
		 	data : '{"username" : "' + $("#username").val() + '", "password" : "' + $("#password").val() + '"}',
		 	success : function(){
		 		$("#main").append("Vous êtes maintenant déconnecté, la page ve se recharger automatiquement dans 3 secondes")
	 			setTimeout(function(){$(location).attr('href','/');},3000);
		 	}
	 })
}