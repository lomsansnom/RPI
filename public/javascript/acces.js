function ajouterMembre()
{
	$.ajax({async : false, 
	 	url : '/ajouterMembre',
	 	type : 'POST',
	 	contentType : 'application/json', 
	 	data : '{"username" : "' + $("#username").val() + '", "password" : "' + $("#password").val() + '"}',
	 	success : function(ret){
	 		if(ret.OK)
	 		{
	 			$("#main").append("Votre compte a bien été ajouté, vous allez être redirigé vers la page d'accueil")
	 			setTimeout(function(){$(location).attr('href','/');},3000);
	 		}
	 		else
	 		{
	 			alert(ret.Erreur)
	 		}
	 	},
		error : function(ret){
			alert(ret.erreur)
		}
 })
}