function getListeDD()
{
	$.post('/getListeDD', function(ret){
		for(var i in ret)
		{
			$("#selDD").after('<p> <input type="radio" name="selDD" value="' + ret[i].split(" ")[0] + '" />' + ret[i] + '</p>')
			//cat /etc/mtab pour avoir la liste des périph montés
		}
	})
}