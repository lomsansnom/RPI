function getListeDD()
{
	$.post('/getListeDD', function(ret){
		alert(ret)
	})
}