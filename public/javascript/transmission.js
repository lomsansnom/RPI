function getListeDD()
{
	$.post('/getListeDD', function(ret){
		for(var i in ret)
		{
			("#selDD").after('<p> <input type="radio" name="selDD" value="rpi" />' + ret[i] + '</p>')
		}
	})
}