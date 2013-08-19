//Fonctions qui renvoie l'état de l'ensemble des GPIOs
function getEtatGpios()
{
	$.post("/getEtatGpios", function(ret){
		for(var i in ret)
		{
			var key = i
			if(ret[i] == 0)
			{
				$("#" + ret[key].toLowerCase()).css("color", "black")
			}
			else if(ret[i] == 1)
			{
				$("#" + ret[key].toLowerCase()).css("color", "red")
			}
			else
			{
				alert("Erreur lors de l'obtention de l'état du gpio " + key)
			}
		}
	})
}