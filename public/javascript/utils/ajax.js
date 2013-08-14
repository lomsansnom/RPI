/**
 * Send a request to the server.
 * 
 * @param is_async {Boolean} Allow user to chose synchronous request or not
 * @param http_type {String} HTTP request type
 * @param url {String} URL requesting service
 * @param data {JSON String} Request content
 * @param callback {Function} Function used to handle the success case
 */
function callAjax( is_async, http_type, url, data, callback, contentType, notimeout ) {
	if (url==null) return
	if ( http_type == 'GET' ) {
		get (is_async, url, callback, notimeout );
	} else {
		//data = string
		//parse it & add session
		var xret = data
		var xobj = JSON.parse(xret)
		//if not session send, sent it
		xobj.session = _get_action_sequence(url, xobj['List Name'])
		xret = JSON.stringify(xobj)
		//
		_aborting_calls.push( $.ajax ( {
			async : is_async,
			type : http_type,
			timeout: 1000 * 5,
			url : getServerURL ( ) + url,
			contentType : contentType || 'application/json',
			data : xret,
			success : function(ret, ret1){
				var yobj = null
				var yret=false
				try{
					yobj=JSON.parse(ret)
					//if object has .session back
					if (yobj.session)
					{
						//has to match with
						//type: 001_sequence
						//data: 0011,0012,00113
						//localstrage[001_sequence]= 00112
						if (yobj.session == localStorage[yobj.session[0]+
						                                 yobj.session[1]+
						                                 yobj.session[2]+'_sequence'])
						{
							yret = true
						}
					}else{
						//if no return as normal
						yret = true
					}
				}catch(e){
					yobj={}
				}
				if (yret) callback(ret, ret1)
			},
			error : function ( jqXHR, textStatus ) {
				callback('{}')
			}
		} ) )
	}
}

var _aborting_calls=[]
//
//clear all
function abort_all_call(){
  while (_aborting_calls.length > 0)
  {
      _aborting_calls.pop().abort()
  }
}

//
//sequence manage
//- remove previous action, prevent the wrong order of result 
//- from client, send counter to server, server once response send back
//  client check that it's the same number, if not skip result
//
//    if (data.session)
//    {
//        //has action define
//        if (data.session[0]!='0')
//        {
//            //if action.sequence != last sequence of this action, do nothing
//            if (data.session != (data.session[0]+localStorage[data.session[0]+'_sequence'])) return
//        }
//    }
//
function _prefix_3(value){
    var tmp='000'+value
    return tmp.substring(tmp.length-3, tmp.length)
}

//
function _get_action_sequence(url, listname){
    if (!localStorage['action_sequence']) localStorage['action_sequence'] =0
    localStorage['action_sequence']++ 
    //manage type
    //type sequence
    if (!localStorage['type_sequence']) localStorage['type_sequence'] = 0
    var postfix=''
    if (url.substring(1)=='getListCount') postfix = listname.replace(/[^aA-zZ]/i,'.')
    //remove /
    if (!localStorage[url.substring(1)+postfix]) {
        //prefix nnn
        localStorage[url.substring(1)+postfix] = _prefix_3(localStorage['type_sequence'])
        localStorage['type_sequence']++
    }
    //return
    //type + action_sequence
    //001_seq = 0011
    var retseq = localStorage[url.substring(1)+postfix]+'_sequence'
    localStorage[retseq] = localStorage[url.substring(1)+postfix]+localStorage['action_sequence']
    return localStorage[retseq]
}

function ajax ( url, data, callback, isAsync, type, failureCallback, notimeout ) {        
	 var optionss = {
		async: isAsync,
		type: type || 'POST',
        timeout: 1000 * 5,
		url: getServerURL ( ) + url,
		contentType: 'application/json',
		data: data,
		success: callback,
		error: failureCallback || function ( ) {
            //callback('{}')
			alert("error")
            }
	}
    if (notimeout!=true) optionss['timeout'] = 1000 * 5
    $.ajax ( optionss );
}

function get ( is_async, url, callback, notimeout ) {	
	var optionss = 
	{
			async : is_async,
			type : 'GET',
			url : getServerURL () + url,
			success : callback ,
			error : function ( jqXHR, textStatus ) {
				callback(JSON.stringify({'OK':false,'Error':textStatus}))
			}
	} 
	if (notimeout!=true) optionss['timeout'] = 1000 * 5
	$.ajax ( optionss );
}

function getServerURL ( ) {
	return 'http://' + $ ( '#address' ).val ( ) + ':' + $ ( '#port' ).val ( );
}


