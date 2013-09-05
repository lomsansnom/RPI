$(document).ready(function() {
	$("#btn").on('click', function(){
		if($("#username").val() != "" && $("#password").val() != "")
		{
			demandeLogin()
		}
		else
		{
			alert("Veuillez remplir tous les champs")
		}
	})
});
