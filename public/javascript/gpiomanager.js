//Fonctions qui renvoie l'�tat de l'ensemble des GPIOs
function getEtatGpios()
{
	$.post("/getEtatGpios", function(ret){
		var numeroGpio = ["onze", "douze", "treize", "quinze", "seize", "dixhuit", "vingtdeux", "sept"]
		for(var i in ret)
		{
			if(ret[i] == 0)
			{
				$("#" + i.toLowerCase()).css("background-color", "white")
			}
			else if(ret[i] == 1)
			{
				$("#" + i.toLowerCase()).css("background-color", "red")
			}
			else
			{
				alert("Erreur lors de l'obtention de l'�tat du gpio " + key)
			}
		}
	})
}