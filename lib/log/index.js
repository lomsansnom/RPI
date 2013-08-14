var fs = require ( 'fs' )

exports.consolelog = consolelog

//
//(private) format number to 2 digits
//
function format2(mdata){
    var tmpx=('00'+mdata)
    return tmpx.substring(tmpx.length-2, tmpx.length)
}

exports.get_date_format = get_date_format 
function get_date_format (date, dateyn, timeyn){
    var tmp=''
    if (dateyn) tmp = format2(date.getMonth ( ) + 1) + '-' + format2(date.getDate ( )) + '-' + date.getFullYear ( )
    if (timeyn) {
        if (tmp!='') tmp += ' '
        tmp += format2(date.getHours ( )) + ':'
	        + format2(date.getMinutes ( )) + ':'
	        + format2(date.getSeconds ( )) + '.'
	        + date.getMilliseconds ( )
    }
    return tmp
}


//
//(private)write log
//
function logger( content, url, method ) {
	var today = new Date ( ), 
	    filename = get_date_format(today, true), 
	    timeEvent = get_date_format(today, false , true) + ' '; 
	
	fd = fs.openSync ('./public/logs/' + filename, 'a', 0666 );
	var prepend = ( ( typeof url !== "undefined" ) ? url + ' ' : '' )
	        + ( ( typeof method !== "undefined" ) ? method + ' ' : '' );

    fs.writeSync ( fd, prepend + timeEvent + ' ' + content + '\n' );
	fs.closeSync ( fd );
};

//
//(private) write log
//
function consolelog (log){
    var tmpmem = '['+ JSON.stringify( process.memoryUsage() ) +'] '
    console.log(tmpmem+log)
    logger(log, '[console]'+tmpmem)
    
}

//
//(private) get json object
//
function _getobj(json){
    try{
        return JSON.parse(json)
    }catch(e){
        return {'OK':false}         
    }
}

//
//(private) get time statistic key value
//
function get(name){
	   return mtimes[name]
}

//
//(private) set time statistic
//
function set(name, value){
 mtimes[name] = value
}