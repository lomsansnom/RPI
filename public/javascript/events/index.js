$(document).ready(function() {
	$("#btn").on('click', function(){
		//if notLogin
		demandeLogin()
		//créer session
		//else
		//demandeLogout()
		//détruire session
	})
});

$(window).unload(function(){
	alert("Vous quittez la page")
})
