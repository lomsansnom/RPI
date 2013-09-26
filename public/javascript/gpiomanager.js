//Fonctions qui renvoie l'état de l'ensemble des GPIOs
function getEtatGpios()
{
	$.post("/getEtatGpios", function(ret){
		for(var i in ret)
		{
			if(ret[i] == 0)
			{
				$("#" + i.toLowerCase()).css("background-color", "white")
			}
			else if(ret[i] == 1)
			{
				$("#" + i.toLowerCase()).css("background-color", "#75a928")
			}
			else
			{
				alert("Erreur lors de l'obtention de l'état du gpio " + key)
			}
		}
	})
}