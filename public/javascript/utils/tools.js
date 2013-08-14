//
//format date from dd-mm-yyyy to Unix timestamp
//
function dd_mm_yyyyToTimestamp(ddmmyyyy, separator){
    if (ddmmyyyy==null) return ''
    if (ddmmyyyy=='') return ''
    if (separator==null) separator = '-'
    ddmmyyyy = ddmmyyyy.split(separator)
    ddmmyyyy[0] = (parseInt(ddmmyyyy[0])+1).toString()
    ddmmyyyy[1] = (parseInt(ddmmyyyy[1])-1).toString()
    date = new Date(ddmmyyyy[2], ddmmyyyy[1], ddmmyyyy[0]).getTime()
    date = Math.round(date/1000)
    return date
}

//
//format date from Unix timestamp to dd-mm-yyyy
//
function timestampTodd_mm_yyyy(timestamp, separator){
    if (timestamp==null) return ''
    if (timestamp=='') return ''
    if (separator==null) separator = '-'
	localTime = new Date().getTimezoneOffset()*60000 + timestamp*1000
	date = new Date(localTime)
    date = date.getDate() + separator + (date.getMonth()+1) + separator + date.getFullYear()
    return date
}

//
function getReturnObject(retstring){
    try{
      return JSON.parse(retstring)
    }catch(e){
      return {"OK":false}  
    }
}

function trim (myString)
{
	return myString.replace(/^\s+/g,'').replace(/\s+$/g,'')
} 

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 
