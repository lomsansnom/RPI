function ajouterMembre()
{
	$.ajax({async : false, 
	 	url : '/ajouterMembre',
	 	type : 'POST',
	 	contentType : 'application/json', 
	 	data : '{"username" : "' + $("#username").val() + '", "password" : "' + $("#password").val() + '"}',
	 	success : function(){
	 		$(location).attr('href','/');
	 	},
		error : function(){
			alert("erreur")
		}
 })
}