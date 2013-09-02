$(document).ready(function() {
	$("#btnLogin").on('click', function(){
		demandeLogin()
	})
	
	$("#btnDeconnexion").on('click', function(){
		demandeLogout()
	})
});
