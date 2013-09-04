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