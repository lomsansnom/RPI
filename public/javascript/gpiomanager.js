//Fonctions qui renvoie l'�tat de l'ensemble des GPIOs
function getEtatGpios()
{
	$.post("/getEtatGpios", function(ret){
		alert(ret)
	})
}