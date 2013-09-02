function demandeLogin()
{
	 $.ajax({async : false, 
		 	url : '/login',
		 	type : 'POST',
		 	contentType : 'application/json', 
		 	data : '{"username" : "' + $("#username").val() + '", "password" : "' + $("#password").val() + '"}',
		 	success : function(){
		 		$(location).attr('href','/');
		 	}
	 })
}