//Fonctions qui renvoie l'état de l'ensemble des GPIOs
function getEtatGpios()
{
	$.post("/getEtatGpios", function(ret){
		alert(ret)
	})
}